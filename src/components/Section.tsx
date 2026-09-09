import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease } from './motion'

type Props = {
  id: string
  fig: string
  title: string
  children: ReactNode
  alt?: boolean
  tight?: boolean
}

export function Section({ id, fig, title, children, alt, tight }: Props) {
  const reduce = useReducedMotion()

  return (
    <section id={id} className={`scroll-mt-24 ${alt ? 'bg-app-2' : ''}`}>
      <div
        className={`mx-auto max-w-6xl px-5 sm:px-8 ${
          tight ? 'py-16 sm:py-20' : 'py-20 sm:py-28'
        }`}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease }}
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="eyebrow">{fig}</span>
            <span className="rule max-w-16" aria-hidden="true" />
          </div>
          <h2 className="font-display mb-10 max-w-3xl text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight sm:mb-12">
            {title}
          </h2>
          {children}
        </motion.div>
      </div>
    </section>
  )
}
