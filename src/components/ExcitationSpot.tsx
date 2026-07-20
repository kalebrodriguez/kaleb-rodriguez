import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Soft radial follow-light, like a fluorescence excitation spot. */
export function ExcitationSpot() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      el.style.opacity = '1'
      el.style.background = `radial-gradient(420px circle at ${e.clientX}px ${e.clientY}px, color-mix(in srgb, var(--signal) 9%, transparent), transparent 55%)`
    }
    const onLeave = () => {
      el.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce])

  if (reduce) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[15] opacity-0 mix-blend-soft-light transition-opacity duration-500"
    />
  )
}
