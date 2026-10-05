import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ease } from './motion'
import { stops } from './stops'

// One stop on the dive: a numbered region readout and a big title.
export function Stop({
  id,
  title,
  intro,
  children,
}: {
  id: string
  title: ReactNode
  intro?: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const index = stops.findIndex((s) => s.id === id)
  const region = stops[index]?.region

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative scroll-mt-20 py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="mb-14 sm:mb-20"
        >
          <div className="readout flex items-center gap-3">
            <span className="text-spike">{String(index).padStart(2, '0')}</span>
            <span className="h-px w-10 bg-line" />
            {region}
          </div>
          <h2 id={`${id}-title`} className="font-display mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] sm:text-7xl">
            {title}
          </h2>
          {intro && <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{intro}</p>}
        </motion.header>
        {children}
      </div>
    </section>
  )
}

export function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`min-w-0 ${className ?? ''}`}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  )
}
