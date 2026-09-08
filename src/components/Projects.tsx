import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section } from './Section'
import { StatusTag } from './StatusTag'
import { projects } from '../data/content'
import { staggerContainer, staggerItem } from './motion'
import { useDetail } from './DetailDrawer'

export function Projects() {
  const reduce = useReducedMotion()
  const { openDetail } = useDetail()

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
        {projects.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            variants={reduce ? undefined : staggerItem}
            onClick={() =>
              openDetail({
                kind: 'project',
                title: p.name,
                eyebrow: p.kind,
                status: p.status,
                summary: p.summary,
                detail: p.detail,
                highlights: p.highlights,
                stack: p.stack,
                links: p.links,
              })
            }
            className="card-hover panel group relative flex flex-col p-6 text-left"
          >
            <span className="accent-rail" aria-hidden="true" />
            <span aria-hidden="true" className="scan-sweep" />
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="index-mark">{String(i + 1).padStart(2, '0')}</span>
              <span className="inline-flex items-center gap-1 font-mono text-[0.65rem] uppercase tracking-widest text-signal opacity-80 transition-opacity group-hover:opacity-100">
                Details
                <ArrowUpRight size={14} />
              </span>
            </div>
            <h3 className="font-display text-2xl font-500">{p.name}</h3>
            <div className="mb-4 mt-3 flex flex-wrap items-center gap-3">
              {p.status !== 'active' && <StatusTag status={p.status} />}
              <span className="text-xs text-muted">
                {p.status !== 'active' ? '· ' : ''}
                {p.kind}
              </span>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </motion.button>
        ))}
      </motion.div>
    </Section>
  )
}
