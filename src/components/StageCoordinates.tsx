import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Microscope-stage style coordinate readout that tracks the pointer. */
export function StageCoordinates() {
  const reduce = useReducedMotion()
  const [pos, setPos] = useState({ x: 0, y: 0, on: false })

  useEffect(() => {
    if (reduce) return
    const onMove = (e: PointerEvent) => {
      setPos({
        x: Math.round((e.clientX / window.innerWidth) * 1000),
        y: Math.round((e.clientY / window.innerHeight) * 1000),
        on: true,
      })
    }
    const onLeave = () => setPos((p) => ({ ...p, on: false }))
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
      aria-hidden="true"
      className="pointer-events-none fixed bottom-4 left-4 z-40 hidden font-mono text-[0.65rem] uppercase tracking-widest text-muted sm:block"
      style={{ opacity: pos.on ? 0.85 : 0.35 }}
    >
      <div className="rounded border border-line bg-app/70 px-3 py-2 backdrop-blur-sm">
        <div className="text-signal">Stage</div>
        <div className="mt-1 tabular-nums">
          X {String(pos.x).padStart(4, '0')} · Y {String(pos.y).padStart(4, '0')}
        </div>
      </div>
    </div>
  )
}
