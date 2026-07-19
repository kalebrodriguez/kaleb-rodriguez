import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  id: string
  fig: string
  title: string
  children: ReactNode
  alt?: boolean
}

export function Section({ id, fig, title, children, alt }: Props) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 border-t border-line ${alt ? 'bg-app-2' : ''}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-10 flex items-baseline gap-4">
            <span className="fig-label whitespace-nowrap">{fig}</span>
            <span className="hairline flex-1 translate-y-[-2px]" />
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
