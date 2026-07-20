import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section } from './Section'
import { StatusTag } from './StatusTag'
import { projects } from '../data/content'
import { staggerContainer, staggerItem } from './motion'

export function Projects() {
  const reduce = useReducedMotion()

  return (
    <Section
      id="projects"
      fig="Fig. 03 — Projects"
      title="Selected work — tools built for real users."
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={reduce ? undefined : staggerContainer}
        className="grid gap-5 sm:grid-cols-2"
      >
        {projects.map((p) => (
          <motion.a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={reduce ? undefined : staggerItem}
            className="card-hover group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface p-6"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,var(--signal),transparent)] transition-transform duration-500 group-hover:scale-x-100"
            />
            <span aria-hidden="true" className="scan-sweep" />
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="font-display text-2xl font-500">{p.name}</h3>
              <ArrowUpRight
                size={18}
                className="text-muted transition-colors group-hover:text-signal"
              />
            </div>
            <div className="mb-4 flex items-center gap-3">
              {p.status !== 'active' && <StatusTag status={p.status} />}
              <span className="text-xs text-muted">
                {p.status !== 'active' ? '· ' : ''}
                {p.kind}
              </span>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="rounded border border-line px-2 py-1 font-mono text-[0.68rem] text-muted"
                >
                  {s}
                </li>
              ))}
            </ul>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  )
}
