import { motion, useReducedMotion } from 'framer-motion'
import { Section } from './Section'
import { experience, leadership } from '../data/content'
import { staggerContainer, staggerItem } from './motion'
import { useDetail } from './DetailDrawer'

function CompactList({
  items,
  label,
}: {
  items: typeof experience
  label: string
}) {
  const reduce = useReducedMotion()
  const { openDetail } = useDetail()

  return (
    <div>
      <p className="meta-signal mb-4">{label}</p>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={reduce ? undefined : staggerContainer}
        className="border-t border-line"
      >
        {items.map((e) => (
          <motion.button
            key={e.id}
            type="button"
            variants={reduce ? undefined : staggerItem}
            onClick={() =>
              openDetail({
                kind: 'experience',
                title: e.org,
                eyebrow: `${e.role} · ${e.period}`,
                summary: e.note,
                detail: e.detail,
                highlights: e.highlights,
                links: e.links,
              })
            }
            className="row-link group"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-base font-semibold tracking-tight sm:text-lg">
                {e.org}
              </h3>
              <span className="meta shrink-0">{e.period}</span>
            </div>
            <p className="text-sm text-signal">{e.role}</p>
            <p className="text-sm leading-relaxed text-muted">{e.note}</p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export function Experience() {
  return (
    <Section id="experience" fig="04 — Experience" title="Where I’ve worked and led.">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        <CompactList items={experience} label="Research & clinical" />
        <CompactList items={leadership} label="Leadership & community" />
      </div>
    </Section>
  )
}
