import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease } from './motion'

type Props = {
  id: string
  fig: string
  title: string
  children: ReactNode
  alt?: boolean
}

export function Section({ id, fig, title, children, alt }: Props) {
  const reduce = useReducedMotion()
  const mark = fig.match(/\d+/)?.[0] ?? ''

  return (
    <section
      id={id}
      className={`relative scroll-mt-20 overflow-hidden border-t border-line ${alt ? 'bg-app-2/60' : ''}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 specimen-grid opacity-[0.4]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full opacity-40 field-drift"
        style={{
          background: alt
            ? 'radial-gradient(circle, color-mix(in srgb, var(--stain) 14%, transparent), transparent 70%)'
            : 'radial-gradient(circle, color-mix(in srgb, var(--signal) 12%, transparent), transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        {mark && (
          <span className="section-watermark" aria-hidden="true">
            {mark}
          </span>
        )}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease }}
          className="relative"
        >
          <div className="mb-10 flex items-baseline gap-4">
            <motion.span
              className="fig-label whitespace-nowrap"
              initial={reduce ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease }}
            >
              {fig}
            </motion.span>
            <motion.span
              className="hairline flex-1 translate-y-[-2px] origin-left"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
              aria-hidden="true"
            />
          </div>
          <h2 className="font-display mb-12 max-w-3xl text-3xl font-500 leading-tight tracking-tight sm:text-[2.6rem]">
            {title}
          </h2>
          {children}
        </motion.div>
      </div>
    </section>
  )
}
