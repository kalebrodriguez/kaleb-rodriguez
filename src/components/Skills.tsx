import { useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { awards, certifications, skills } from '../data/content'
import { Rise, Stop } from './Stop'

const groupColor: Record<string, string> = {
  Languages: 'var(--color-spike)',
  'Research & data': 'var(--color-axon)',
  'Wet lab': 'var(--color-synapse)',
  Tools: 'var(--color-calcium)',
  Spoken: 'var(--color-text)',
}

// Thalamus: the relay. Skills float on a slowly turning sphere you can drag.
export function Skills() {
  return (
    <Stop
      id="skills"
      title={
        <>
          What I <span className="text-synapse">work with</span>.
        </>
      }
    >
      <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_1fr]">
        <Rise>
          <Sphere />
          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {Object.keys(skills).map((g) => (
              <li key={g} className="readout flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: groupColor[g] }} />
                {g}
              </li>
            ))}
          </ul>
        </Rise>
        <div className="space-y-10">
          <Rise>
            <h3 className="readout mb-4">Awards</h3>
            <ul className="divide-y divide-line border-y border-line">
              {awards.map((a) => {
                const [name, rest] = a.split(' — ')
                return (
                  <li key={a} className="py-3.5">
                    <span className="font-medium">{name}</span>
                    {rest && <span className="block text-sm text-muted">{rest}</span>}
                  </li>
                )
              })}
            </ul>
          </Rise>
          <Rise delay={0.1}>
            <h3 className="readout mb-4">Certifications</h3>
            <ul className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li key={c} className="rounded-full border border-line px-3 py-1.5 text-sm text-muted">
                  {c}
                </li>
              ))}
            </ul>
          </Rise>
        </div>
      </div>
    </Stop>
  )
}

function Sphere() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const tags = useMemo(
    () => Object.entries(skills).flatMap(([g, list]) => list.map((s) => ({ s, color: groupColor[g] }))),
    [],
  )

  // Even spacing on a sphere (Fibonacci lattice).
  const base = useMemo(
    () =>
      tags.map((_, i) => {
        const y = 1 - (i / (tags.length - 1)) * 2
        const r = Math.sqrt(1 - y * y)
        const th = i * Math.PI * (3 - Math.sqrt(5))
        return [Math.cos(th) * r, y, Math.sin(th) * r] as const
      }),
    [tags],
  )

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-tag]'))
    let ax = 0.3
    let ay = 0
    let vx = 0.0018
    let vy = 0.0035
    let drag: { x: number; y: number } | null = null
    let frame = 0

    const place = () => {
      const R = root.clientWidth * 0.4
      const cx = Math.cos(ax)
      const sx = Math.sin(ax)
      const cy = Math.cos(ay)
      const sy = Math.sin(ay)
      base.forEach(([x, y, z], i) => {
        // rotate around Y then X
        const x1 = x * cy + z * sy
        const z1 = -x * sy + z * cy
        const y2 = y * cx - z1 * sx
        const z2 = y * sx + z1 * cx
        const s = (z2 + 2) / 3
        const el = els[i]
        el.style.transform = `translate(-50%, -50%) translate(${x1 * R}px, ${y2 * R}px) scale(${s})`
        el.style.opacity = String(0.25 + (z2 + 1) * 0.375)
        el.style.zIndex = String(Math.round((z2 + 1) * 100))
      })
    }

    const loop = () => {
      if (!drag) {
        ay += vy
        ax += vx
        vy += (0.0035 - vy) * 0.02
        vx += (0.0012 - vx) * 0.02
      }
      place()
      frame = requestAnimationFrame(loop)
    }

    const down = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY }
      root.setPointerCapture(e.pointerId)
    }
    const move = (e: PointerEvent) => {
      if (!drag) return
      const dx = e.clientX - drag.x
      const dy = e.clientY - drag.y
      ay += dx * 0.006
      ax += dy * 0.006
      vy = dx * 0.0015
      vx = dy * 0.0015
      drag = { x: e.clientX, y: e.clientY }
    }
    const up = () => {
      drag = null
    }

    place()
    if (!reduce) {
      frame = requestAnimationFrame(loop)
      root.addEventListener('pointerdown', down)
      root.addEventListener('pointermove', move)
      root.addEventListener('pointerup', up)
      root.addEventListener('pointercancel', up)
    }
    const ro = new ResizeObserver(place)
    ro.observe(root)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      root.removeEventListener('pointerdown', down)
      root.removeEventListener('pointermove', move)
      root.removeEventListener('pointerup', up)
      root.removeEventListener('pointercancel', up)
    }
  }, [base, reduce])

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[520px] touch-pan-y select-none"
      role="list"
      aria-label="Skills"
    >
      <div
        aria-hidden="true"
        className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgb(255_93_143/0.10),transparent_65%)]"
      />
      {tags.map((t) => (
        <span
          key={t.s}
          data-tag
          role="listitem"
          className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-line bg-ink/70 px-3 py-1 text-sm font-medium backdrop-blur"
          style={{ color: t.color }}
        >
          {t.s}
        </span>
      ))}
    </div>
  )
}
