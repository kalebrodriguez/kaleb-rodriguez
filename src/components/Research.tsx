import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section } from './Section'
import { StatusTag } from './StatusTag'
import { research } from '../data/content'
import { staggerContainer, staggerItem } from './motion'
import { useDetail } from './DetailDrawer'

export function Research() {
  const reduce = useReducedMotion()
  const { openDetail } = useDetail()

  return (
    <Section
      id="research"
      fig="02 — Research"
      title="Questions I keep coming back to."
      alt
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={reduce ? undefined : staggerContainer}
        className="border-t border-line"
      >
        {research.map((r, i) => (
          <motion.button
            key={r.id}
            type="button"
            variants={reduce ? undefined : staggerItem}
            onClick={() =>
              openDetail({
                kind: 'research',
                title: r.title,
                eyebrow: [r.org, r.meta].filter(Boolean).join(' · '),
                status: r.status,
                summary: r.plain,
                detail: r.detail,
                highlights: r.highlights,
                links: r.links.length
                  ? r.links
                  : r.link
                    ? [{ label: r.linkLabel || 'Open', href: r.link }]
                    : [],
              })
            }
            className="row-link group grid-cols-[3.25rem_1fr_auto] items-start"
          >
            <span className="pt-1 font-mono text-xs text-signal">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <StatusTag status={r.status} />
              </div>
              <h3 className="font-display text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                {r.title}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {r.org}
                {r.meta ? ` · ${r.meta}` : ''}
              </p>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted md:pr-8">
                {r.plain}
              </p>
            </div>
            <ArrowUpRight
              size={18}
              className="mt-1 hidden text-muted transition-colors group-hover:text-signal md:block"
            />
          </motion.button>
        ))}
      </motion.div>
      <p className="meta mt-8 max-w-2xl normal-case tracking-normal">
        Ongoing work is described in general terms only. Unpublished data and confidential
        materials are omitted.
      </p>
    </Section>
  )
}
