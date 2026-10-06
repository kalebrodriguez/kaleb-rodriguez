import { useMemo } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'

// A single, carefully drawn neuron: tapered branching dendrites, a myelinated
// axon and terminal boutons, lit with the site's signature gradient.
// `fire` (0 → 1) sends an action potential from the soma to the terminals.

type Seg = { d: string; w: number }

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

function dendrites(): Seg[] {
  const rand = seeded(23)
  const out: Seg[] = []
  const grow = (x: number, y: number, a: number, len: number, w: number, depth: number) => {
    if (depth === 0) return
    const bend = (rand() - 0.5) * 0.6
    const ex = x + Math.cos(a) * len
    const ey = y + Math.sin(a) * len
    const cx = x + Math.cos(a + bend) * len * 0.55
    const cy = y + Math.sin(a + bend) * len * 0.55
    out.push({ d: `M${x.toFixed(1)} ${y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`, w })
    const n = depth > 3 && rand() > 0.6 ? 3 : 2
    for (let k = 0; k < n; k++) {
      const spread = (k - (n - 1) / 2) * (0.5 + rand() * 0.25)
      grow(ex, ey, a + spread, len * (0.66 + rand() * 0.12), w * 0.66, depth - 1)
    }
  }
  // Dendrites radiate everywhere except toward the axon (to the right).
  const roots = [0.62, 0.86, 1.1, 1.34, 1.58, 1.82, -0.52, -0.3]
  roots.forEach((r, i) => grow(Math.cos(r * Math.PI) * 30, Math.sin(r * Math.PI) * 30, r * Math.PI, 64 + (i % 3) * 16, 6, 6))
  return out
}

const AXON = 'M30 6 C110 20 150 90 240 96 S400 60 470 110 S560 190 600 196'
const TERMINALS = ['M600 196 q30 -26 58 -30', 'M600 196 q38 2 66 14', 'M600 196 q24 30 44 52', 'M600 196 q6 36 -2 62']
const BOUTONS: [number, number][] = [
  [658, 166],
  [666, 210],
  [644, 248],
  [598, 258],
]
const MYELIN = [0.12, 0.26, 0.4, 0.54, 0.68, 0.82]

export function Neuron({ fire, glow }: { fire: MotionValue<number>; glow: MotionValue<number> }) {
  const segs = useMemo(dendrites, [])
  // The dash sits at position t along the axon when offset = -t; run t from
  // just before the soma (-0.1) to the terminals (1), visible only mid-flight.
  const spike = useTransform(fire, (v) => 0.1 - v * 1.1)
  const spikeO = useTransform(fire, (v) => (v > 0.001 && v < 0.999 ? 1 : 0))
  const soma = useTransform(fire, (v) => 0.55 + Math.sin(Math.min(1, v * 3) * Math.PI) * 0.45)
  const ring = useTransform(fire, (v) => 1 + Math.min(1, v * 3) * 2.4)
  const ringO = useTransform(fire, (v) => (v <= 0 ? 0 : Math.max(0, 0.8 - v * 2.6)))
  const tips = useTransform(fire, (v) => 0.35 + Math.max(0, (v - 0.75) * 4) * 0.65)

  return (
    <svg viewBox="-280 -260 980 560" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="n-grad" x1="-280" y1="0" x2="700" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-glow-1)" />
          <stop offset="45%" stopColor="var(--color-glow-2)" />
          <stop offset="78%" stopColor="var(--color-glow-3)" />
          <stop offset="100%" stopColor="var(--color-glow-4)" />
        </linearGradient>
        <radialGradient id="n-soma" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="40%" stopColor="#c9b8ff" />
          <stop offset="100%" stopColor="var(--color-glow-2)" />
        </radialGradient>
        <radialGradient id="n-halo">
          <stop offset="0%" stopColor="var(--color-glow-2)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-glow-2)" stopOpacity="0" />
        </radialGradient>
        <filter id="n-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <motion.g style={{ opacity: glow }}>
        {/* soft bloom layer */}
        <g filter="url(#n-blur)" opacity="0.7">
          {segs.map((s, i) => (
            <path key={i} d={s.d} stroke="url(#n-grad)" strokeWidth={s.w * 2.2} fill="none" strokeLinecap="round" />
          ))}
          <path d={AXON} stroke="url(#n-grad)" strokeWidth="9" fill="none" />
        </g>
        {/* crisp layer */}
        {segs.map((s, i) => (
          <path key={i} d={s.d} stroke="url(#n-grad)" strokeWidth={s.w * 0.8} fill="none" strokeLinecap="round" opacity="0.9" />
        ))}
        <path d={AXON} stroke="url(#n-grad)" strokeWidth="3" fill="none" strokeLinecap="round" />
        {MYELIN.map((t) => (
          <path key={t} d={AXON} pathLength={1} stroke="url(#n-grad)" strokeWidth="11" strokeLinecap="round" fill="none" strokeDasharray="0.065 1" strokeDashoffset={-t} opacity="0.75" />
        ))}
        {TERMINALS.map((d) => (
          <path key={d} d={d} stroke="var(--color-glow-4)" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.85" />
        ))}
        {BOUTONS.map(([x, y]) => (
          <motion.circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="var(--color-glow-4)" style={{ opacity: tips }} />
        ))}
      </motion.g>

      {/* action potential */}
      <motion.path
        d={AXON}
        pathLength={1}
        stroke="#fff"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="0.1 1.4"
        style={{ strokeDashoffset: spike, opacity: spikeO, filter: 'drop-shadow(0 0 8px #fff) drop-shadow(0 0 16px var(--color-glow-3))' }}
      />

      <motion.circle r="150" fill="url(#n-halo)" style={{ opacity: soma }} />
      <motion.circle r="34" fill="none" stroke="var(--color-glow-2)" strokeWidth="1.5" style={{ scale: ring, opacity: ringO }} />
      <circle r="34" fill="url(#n-soma)" />
      <circle cx="-6" cy="-5" r="11" fill="#fff" opacity="0.55" />
    </svg>
  )
}
