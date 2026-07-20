import { useReducedMotion } from 'framer-motion'

/** Soft oscillating fluorescence waveform for the contact band. */
export function SignalWave() {
  const reduce = useReducedMotion()

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full opacity-40"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        className={reduce ? undefined : 'signal-wave'}
        d="M0 70 C 80 20, 160 120, 240 70 S 400 20, 480 70 S 640 120, 720 70 S 880 20, 960 70 S 1120 120, 1200 70"
        fill="none"
        stroke="var(--signal)"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        className={reduce ? undefined : 'signal-wave-delay'}
        d="M0 78 C 90 40, 170 110, 250 78 S 410 40, 490 78 S 650 110, 730 78 S 890 40, 970 78 S 1130 110, 1200 78"
        fill="none"
        stroke="var(--stain)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}
