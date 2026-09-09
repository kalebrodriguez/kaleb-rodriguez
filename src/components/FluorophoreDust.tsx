import { useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type Speck = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  hue: 'signal' | 'stain'
  a: number
}

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 0xffffffff
  }
}

/** Soft floating fluorophore speckles — GFP cyan + stain magenta. */
export function FluorophoreDust({ density = 28 }: { density?: number }) {
  const reduce = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const specks = useMemo(() => {
    const rand = seeded(77)
    return Array.from({ length: density }, (): Speck => ({
      x: rand(),
      y: rand(),
      r: 0.6 + rand() * 1.8,
      vx: (rand() - 0.5) * 0.00012,
      vy: (rand() - 0.5) * 0.0001,
      hue: rand() > 0.62 ? 'stain' : 'signal',
      a: 0.18 + rand() * 0.45,
    }))
  }, [density])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const styles = getComputedStyle(document.documentElement)
    const signal = styles.getPropertyValue('--signal').trim() || '#38d6c4'
    const stain = styles.getPropertyValue('--stain').trim() || '#f0609b'

    if (reduce) {
      ctx.clearRect(0, 0, w, h)
      for (const s of specks) {
        ctx.beginPath()
        ctx.fillStyle = s.hue === 'stain' ? stain : signal
        ctx.globalAlpha = s.a * 0.7
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      return () => window.removeEventListener('resize', resize)
    }

    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      for (const s of specks) {
        s.x += s.vx
        s.y += s.vy
        if (s.x < -0.02) s.x = 1.02
        if (s.x > 1.02) s.x = -0.02
        if (s.y < -0.02) s.y = 1.02
        if (s.y > 1.02) s.y = -0.02

        const px = s.x * w
        const py = s.y * h
        const grad = ctx.createRadialGradient(px, py, 0, px, py, s.r * 4)
        const color = s.hue === 'stain' ? stain : signal
        grad.addColorStop(0, color)
        grad.addColorStop(1, 'transparent')
        ctx.globalAlpha = s.a
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, s.r * 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = Math.min(1, s.a + 0.25)
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [reduce, specks])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
