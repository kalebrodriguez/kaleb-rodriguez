import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// The whole site is a dive into the brain. One fixed canvas renders it:
//  - At the top of the page the particles assemble into a side view of a
//    brain, wired to their nearest neighbours, with signals running along it.
//  - As you scroll the brain comes apart and the camera dives forward through
//    a field of neurons that keeps streaming past for the rest of the page.
// Every particle has a "brain" position and a "field" position; scroll blends
// between them. Decorative only.

type P = {
  bx: number // brain position, 0..1 inside the brain box
  by: number
  fx: number // field position, world units
  fy: number
  fz: number
  r: number
  color: string
  n: number[] // neighbour indices for wiring
}

type Pulse = { a: number; b: number; t: number; speed: number }

const COLORS = [
  { c: '239,234,246', w: 0.68 }, // text white-violet
  { c: '122,162,255', w: 0.15 }, // axon blue
  { c: '255,93,143', w: 0.11 }, // synapse rose
  { c: '255,181,71', w: 0.06 }, // spike amber
]

// Side view of a brain in a 400 x 300 box: cerebrum, cerebellum, brainstem.
const BRAIN =
  'M58,168 C36,118 70,58 140,42 C192,18 272,24 322,58 C368,86 384,140 362,180 C352,204 322,214 296,210 C284,232 248,240 226,226 C202,240 160,238 140,222 C108,232 68,214 58,168 Z ' +
  'M262,206 C286,196 336,198 348,224 C356,246 322,260 292,254 C268,250 252,232 262,206 Z ' +
  'M238,214 L266,214 L262,292 L244,292 Z'

// A few sulci drawn over the brain for definition.
const SULCI = [
  'M196,40 C206,80 186,110 214,150',
  'M110,170 C150,150 200,158 252,176',
  'M120,80 C140,98 130,124 152,140',
  'M286,72 C276,104 300,124 288,156',
]

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

function build(count: number): P[] {
  const rand = seeded(19)
  const test = document.createElement('canvas').getContext('2d')!
  const shape = new Path2D(BRAIN)
  const pts: P[] = []
  let guard = 0
  while (pts.length < count && guard++ < count * 40) {
    const x = rand() * 400
    const y = rand() * 300
    if (!test.isPointInPath(shape, x, y)) continue
    let roll = rand()
    let color = COLORS[0].c
    for (const c of COLORS) {
      if ((roll -= c.w) <= 0) {
        color = c.c
        break
      }
    }
    pts.push({
      bx: x / 400,
      by: y / 300,
      fx: (rand() - 0.5) * 14,
      fy: (rand() - 0.5) * 9,
      fz: 1 + rand() * 30,
      r: 0.6 + Math.pow(rand(), 3) * 2.6,
      color,
      n: [],
    })
  }
  // Wire each point to its two nearest neighbours (in brain space).
  for (let i = 0; i < pts.length; i++) {
    const best: { j: number; d: number }[] = []
    for (let j = 0; j < pts.length; j++) {
      if (i === j) continue
      const d = (pts[i].bx - pts[j].bx) ** 2 + ((pts[i].by - pts[j].by) * 0.75) ** 2
      if (best.length < 2) best.push({ j, d })
      else if (d < best[1].d) best[1] = { j, d }
      best.sort((a, b) => a.d - b.d)
    }
    pts[i].n = best.map((b) => b.j)
  }
  return pts
}

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))
const ease = (t: number) => t * t * (3 - 2 * t)

export function Tissue() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const small = window.matchMedia('(max-width: 640px)').matches
    const pts = build(small ? 380 : 720)
    const sulci = SULCI.map((d) => new Path2D(d))
    const rand = seeded(5)
    const pulses: Pulse[] = Array.from({ length: 14 }, () => {
      const a = Math.floor(rand() * pts.length)
      return { a, b: pts[a].n[0], t: rand(), speed: 0.5 + rand() * 0.9 }
    })

    let w = 0
    let h = 0
    let dpr = 1
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    let camZ = 0
    let frame = 0
    let last = performance.now()

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const y = window.scrollY
      // 1 = assembled brain, 0 = fully dived into the field.
      const b = ease(clamp(1 - y / (h * 1.05)))
      // The camera keeps diving for the whole page.
      const targetZ = y / (h * 0.32)
      camZ += (targetZ - camZ) * (reduce ? 1 : Math.min(1, dt * 6))
      mouse.x += (mouse.tx - mouse.x) * Math.min(1, dt * 3)
      mouse.y += (mouse.ty - mouse.y) * Math.min(1, dt * 3)

      ctx.clearRect(0, 0, w, h)

      // Brain box: right of centre on desktop, centred and behind the text on phones.
      const bw = small ? w * 1.05 : Math.min(w * 0.58, h * 1.15)
      const bh = bw * 0.75
      const bx0 = small ? (w - bw) / 2 : w * 0.62 - bw / 2
      const by0 = small ? h * 0.42 - bh / 2 : h * 0.5 - bh / 2
      const tilt = mouse.x * 0.04
      const f = Math.min(w, h) * 0.9
      const depth = 31

      const sx = new Float32Array(pts.length)
      const sy = new Float32Array(pts.length)
      const sr = new Float32Array(pts.length)
      const sa = new Float32Array(pts.length)

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        // Field position relative to the moving camera, wrapped in depth.
        let z = (p.fz - camZ) % depth
        if (z < 0.4) z += depth
        const fxs = w / 2 + (p.fx / z) * f + mouse.x * 30 / z
        const fys = h / 2 + (p.fy / z) * f + mouse.y * 20 / z
        const frs = clamp(p.r * (6 / z), 0.3, 7)
        const fa = clamp((depth - z) / depth) * clamp(z / 2)

        // Brain position with a slight mouse-driven turn.
        const ux = p.bx - 0.5
        const bxs = bx0 + (0.5 + ux * Math.cos(tilt)) * bw
        const bys = by0 + (p.by + mouse.y * 0.01 * ux) * bh
        sx[i] = fxs + (bxs - fxs) * b
        sy[i] = fys + (bys - fys) * b
        sr[i] = frs + (p.r - frs) * b
        sa[i] = fa + (0.9 - fa) * b
      }

      // Wiring: strong while the brain is assembled, a faint web in the field.
      ctx.lineWidth = 0.6
      for (let i = 0; i < pts.length; i++) {
        for (const j of pts[i].n) {
          const dx = sx[i] - sx[j]
          const dy = sy[i] - sy[j]
          const d2 = dx * dx + dy * dy
          const maxD = b > 0.5 ? 60 : 140
          if (d2 > maxD * maxD) continue
          const a = Math.min(sa[i], sa[j]) * (0.08 + b * 0.22) * (1 - Math.sqrt(d2) / maxD)
          if (a < 0.01) continue
          ctx.strokeStyle = `rgba(${pts[i].color},${a})`
          ctx.beginPath()
          ctx.moveTo(sx[i], sy[i])
          ctx.lineTo(sx[j], sy[j])
          ctx.stroke()
        }
      }

      // Sulci, only while the brain holds together.
      if (b > 0.05) {
        ctx.save()
        ctx.translate(bx0, by0)
        ctx.scale(bw / 400, bh / 300)
        ctx.strokeStyle = `rgba(239,234,246,${0.16 * b})`
        ctx.lineWidth = 1.4
        for (const s of sulci) ctx.stroke(s)
        ctx.restore()
      }

      // Neurons.
      for (let i = 0; i < pts.length; i++) {
        const a = sa[i]
        if (a < 0.02) continue
        const r = sr[i]
        ctx.fillStyle = `rgba(${pts[i].color},${a})`
        ctx.beginPath()
        ctx.arc(sx[i], sy[i], r, 0, Math.PI * 2)
        ctx.fill()
        // Close-up neurons in the field get a soft glow and dendrites.
        if (r > 2.6 && b < 0.6) {
          ctx.strokeStyle = `rgba(${pts[i].color},${a * 0.35})`
          ctx.lineWidth = Math.max(0.6, r * 0.18)
          for (let k = 0; k < 4; k++) {
            const ang = k * 1.7 + i
            ctx.beginPath()
            ctx.moveTo(sx[i], sy[i])
            ctx.quadraticCurveTo(
              sx[i] + Math.cos(ang + 0.4) * r * 3,
              sy[i] + Math.sin(ang + 0.4) * r * 3,
              sx[i] + Math.cos(ang) * r * 6,
              sy[i] + Math.sin(ang) * r * 6,
            )
            ctx.stroke()
          }
          const g = ctx.createRadialGradient(sx[i], sy[i], 0, sx[i], sy[i], r * 5)
          g.addColorStop(0, `rgba(${pts[i].color},${a * 0.35})`)
          g.addColorStop(1, `rgba(${pts[i].color},0)`)
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(sx[i], sy[i], r * 5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Signals running along the wiring.
      if (!reduce) {
        for (const pu of pulses) {
          pu.t += pu.speed * dt
          if (pu.t >= 1) {
            pu.a = pu.b
            pu.b = pts[pu.a].n[Math.floor(Math.random() * 2)]
            pu.t = 0
          }
          const x = sx[pu.a] + (sx[pu.b] - sx[pu.a]) * pu.t
          const yy = sy[pu.a] + (sy[pu.b] - sy[pu.a]) * pu.t
          const a = Math.min(sa[pu.a], sa[pu.b])
          const g = ctx.createRadialGradient(x, yy, 0, x, yy, 9)
          g.addColorStop(0, `rgba(255,181,71,${a})`)
          g.addColorStop(1, 'rgba(255,181,71,0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(x, yy, 9, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (!reduce) frame = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / w - 0.5
      mouse.ty = e.clientY / h - 0.5
    }
    const redraw = () => draw(performance.now())

    resize()
    window.addEventListener('resize', resize)
    if (reduce) {
      redraw()
      window.addEventListener('scroll', redraw, { passive: true })
      window.addEventListener('resize', redraw)
    } else {
      window.addEventListener('pointermove', onMove, { passive: true })
      frame = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden && !reduce) {
        last = performance.now()
        frame = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', redraw)
      window.removeEventListener('scroll', redraw)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
