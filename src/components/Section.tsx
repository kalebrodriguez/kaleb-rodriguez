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
    <section
      id={id}
      className={`relative scroll-mt-24 border-t border-line ${alt ? 'bg-app-2' : ''}`}
    >
      <div
        className={`relative mx-auto max-w-6xl px-5 sm:px-8 ${
          tight ? 'py-16 sm:py-20' : 'py-20 sm:py-28'
        }`}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease }}
        >
          <p className="meta-signal mb-4">{fig}</p>
          <h2 className="font-display mb-10 max-w-3xl text-[1.85rem] font-600 leading-[1.15] tracking-tight sm:mb-12 sm:text-[2.6rem]">
            {title}
          </h2>
          {children}
        </motion.div>
      </div>
    </section>
  )
}
