import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section } from './Section'
import { StatusTag } from './StatusTag'
import { research } from '../data/content'
import { staggerContainer, staggerItem } from './motion'

export function Research() {
  const reduce = useReducedMotion()

  return (
    <Section
      id="research"
      fig="Fig. 02 — Research"
      title="Questions I keep coming back to."
      alt
    >
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={reduce ? undefined : staggerContainer}
        className="list-stack space-y-px"
      >
        {research.map((r, i) => {
          const inner = (
            <>
              <span className="accent-rail" aria-hidden="true" />
              <span aria-hidden="true" className="scan-sweep" />
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="index-mark">{String(i + 1).padStart(2, '0')}</span>
                <StatusTag status={r.status} />
                <span className="font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                  {r.org}
                </span>
                {r.meta && (
                  <span className="font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                    · {r.meta}
                  </span>
                )}
              </div>
              <h3 className="font-display flex items-start gap-2 text-xl font-500 leading-snug">
                <span>{r.title}</span>
                {'link' in r && r.link && (
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-muted transition-colors group-hover:text-signal"
                  />
                )}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{r.plain}</p>
              {'link' in r && r.link && (
                <span className="mt-3 inline-block font-mono text-[0.68rem] uppercase tracking-widest text-signal">
                  {('linkLabel' in r && r.linkLabel) || 'Open'} →
                </span>
              )}
            </>
          )

          return (
            <motion.li
              key={r.title}
              variants={reduce ? undefined : staggerItem}
            >
              {'link' in r && r.link ? (
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-hover group relative block overflow-hidden p-6 sm:p-7"
                >
                  {inner}
                </a>
              ) : (
                <div className="group relative p-6 sm:p-7">{inner}</div>
              )}
            </motion.li>
          )
        })}
      </motion.ul>
      <p className="mt-6 max-w-2xl font-mono text-xs leading-relaxed text-muted">
        Note: ongoing work is described in general terms only. Unpublished data and
        confidential materials are intentionally omitted.
      </p>
    </Section>
  )
}
