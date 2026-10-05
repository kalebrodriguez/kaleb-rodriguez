import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

// Opening sequence: a membrane potential charges from rest (-70 mV) to
// threshold (-55 mV) and fires an action potential (+40 mV). The site opens on
// the spike. Plays once per browser session.

const REST = -70
const THRESHOLD = -55
const PEAK = 40
const CHARGE_MS = 1500
const SPIKE_MS = 420

function seen() {
  try {
    return sessionStorage.getItem('kr-loaded') === '1'
  } catch {
    return false
  }
}

export function Loader() {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(() => reduce || seen())
  const [mv, setMv] = useState(REST)
  const [fired, setFired] = useState(false)

  useEffect(() => {
    if (done) return
    document.body.classList.add('is-loading')
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = now - start
      if (t < CHARGE_MS) {
        // Ease toward threshold with a little membrane noise.
        const k = 1 - Math.pow(1 - t / CHARGE_MS, 2.2)
        setMv(REST + (THRESHOLD - REST) * k + Math.sin(t / 37) * 0.6)
      } else if (t < CHARGE_MS + SPIKE_MS) {
        const k = (t - CHARGE_MS) / SPIKE_MS
        setMv(THRESHOLD + (PEAK - THRESHOLD) * Math.min(1, k * 2.4))
        setFired(true)
      } else {
        try {
          sessionStorage.setItem('kr-loaded', '1')
        } catch {
          /* private mode: just replay next time */
        }
        setDone(true)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [done])

  useEffect(() => {
    if (done) document.body.classList.remove('is-loading')
  }, [done])

  // Trace: flat at rest, rising slowly, then the spike and undershoot.
  const charge = Math.min(1, (mv - REST) / (THRESHOLD - REST))
  const trace = fired
    ? 'M0,70 L380,70 C440,70 470,58 500,52 L512,-40 L528,86 C560,96 600,74 640,70 L1000,70'
    : `M0,70 L380,70 C440,70 470,${70 - charge * 18} ${500},${70 - charge * 18}`

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink px-6"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          role="status"
          aria-label="Loading"
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: fired ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background:
                'radial-gradient(40% 40% at 50% 50%, rgb(255 181 71 / 0.35), transparent 70%)',
            }}
          />
          <div className="relative w-full max-w-xl">
            <div className="flex items-end justify-between">
              <span className="readout">Membrane potential</span>
              <span className="readout">{fired ? 'Action potential' : 'Charging'}</span>
            </div>
            <svg viewBox="0 -60 1000 170" className="mt-4 h-28 w-full overflow-visible" aria-hidden="true">
              <line x1="0" x2="1000" y1="52" y2="52" stroke="rgb(239 234 246 / 0.15)" strokeDasharray="4 8" />
              <path
                d={trace}
                fill="none"
                stroke={fired ? 'var(--color-spike)' : 'var(--color-text)'}
                strokeWidth="2.5"
                strokeLinejoin="round"
                style={{ filter: fired ? 'drop-shadow(0 0 8px rgb(255 181 71 / 0.8))' : undefined }}
              />
            </svg>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-display text-6xl font-semibold tabular-nums sm:text-7xl">
                {mv > 0 ? '+' : ''}
                {Math.round(mv)}
                <span className="ml-2 text-2xl text-muted">mV</span>
              </span>
              <span className="readout">Threshold −55 mV</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
