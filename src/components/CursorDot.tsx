import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, summary, .card-hover, .btn-primary, .btn-ghost, .chip'

/** Futuristic signal-dot cursor with a lagging ring. Desktop / fine pointer only. */
export function CursorDot() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: reduce ? 1000 : 280, damping: reduce ? 50 : 26, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: reduce ? 1000 : 280, damping: reduce ? 50 : 26, mass: 0.4 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('has-custom-cursor')
      return
    }
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const onEnter = () => setVisible(true)
    const onLeave = () => setVisible(false)

    const onOver = (e: MouseEvent) => {
      const t = e.target
      if (!(t instanceof Element)) return
      setActive(Boolean(t.closest(INTERACTIVE)))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerenter', onEnter)
    window.addEventListener('pointerleave', onLeave)
    document.addEventListener('mouseover', onOver)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerenter', onEnter)
      window.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('mouseover', onOver)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* lagging ring */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-[var(--signal)]"
        style={{
          x: ringX,
          y: ringY,
          width: active ? 44 : 28,
          height: active ? 44 : 28,
          marginLeft: active ? -22 : -14,
          marginTop: active ? -22 : -14,
          opacity: active ? 0.9 : 0.55,
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease, opacity 0.2s ease',
        }}
      />
      {/* core dot */}
      <motion.div
        className="absolute top-0 left-0 rounded-full"
        style={{
          x,
          y,
          width: active ? 6 : 8,
          height: active ? 6 : 8,
          marginLeft: active ? -3 : -4,
          marginTop: active ? -3 : -4,
          backgroundColor: 'var(--signal)',
          boxShadow: '0 0 14px color-mix(in srgb, var(--signal) 60%, transparent)',
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease',
        }}
      />
    </div>
  )
}
