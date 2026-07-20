import { useReducedMotion } from 'framer-motion'

const TERMS = [
  'PINK1 / Parkin',
  'Mitophagy',
  'Neurodegeneration',
  'Protein language models',
  'Assistive software',
  'Biomarkers',
  'ELP fusion proteins',
  'Error-based learning',
  'Dementia care',
  'Bioinformatics',
  'Omics · GeneLab',
  'Medication adherence',
]

/** Infinite horizontal specimen label strip. */
export function KeywordMarquee() {
  const reduce = useReducedMotion()
  const row = [...TERMS, ...TERMS]

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-line bg-app-2/80"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, color-mix(in srgb, var(--signal) 50%, transparent), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
        style={{ background: 'linear-gradient(90deg, var(--bg-2), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
        style={{ background: 'linear-gradient(270deg, var(--bg-2), transparent)' }}
      />
      <div className={`flex w-max gap-10 py-3.5 ${reduce ? '' : 'marquee-track'}`}>
        {row.map((term, i) => (
          <span
            key={`${term}-${i}`}
            className="flex shrink-0 items-center gap-10 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted"
          >
            <span
              className="inline-block h-1.5 w-1.5 rotate-45"
              style={{
                backgroundColor: i % 3 === 0 ? 'var(--stain)' : 'var(--signal)',
                opacity: 0.85,
              }}
            />
            {term}
          </span>
        ))}
      </div>
    </div>
  )
}
