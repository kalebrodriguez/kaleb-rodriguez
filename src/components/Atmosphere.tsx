import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Site-wide atmosphere: film grain + slow drifting fluorescence washes.
 * Purely decorative — no copy.
 */
export function Atmosphere() {
  const reduce = useReducedMotion()
  const washRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce) return
    const el = washRef.current
    if (!el) return
    let frame = 0
    let t = 0
    const loop = () => {
      t += 0.004
      const x1 = 50 + Math.sin(t) * 18
      const y1 = 20 + Math.cos(t * 0.7) * 12
      const x2 = 20 + Math.cos(t * 0.9) * 16
      const y2 = 75 + Math.sin(t * 0.6) * 14
      el.style.background = `
        radial-gradient(55% 45% at ${x1}% ${y1}%, color-mix(in srgb, var(--signal) 11%, transparent), transparent 70%),
        radial-gradient(50% 40% at ${x2}% ${y2}%, color-mix(in srgb, var(--stain) 8%, transparent), transparent 70%)
      `
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [reduce])

  return (
    <>
      <div
        ref={washRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(55% 45% at 70% 15%, color-mix(in srgb, var(--signal) 11%, transparent), transparent 70%), radial-gradient(50% 40% at 15% 80%, color-mix(in srgb, var(--stain) 8%, transparent), transparent 70%)',
        }}
      />
      <div aria-hidden="true" className="film-grain pointer-events-none fixed inset-0 z-[2]" />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, color-mix(in srgb, var(--bg) 55%, transparent) 100%)',
        }}
      />
    </>
  )
}
