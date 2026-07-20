import { motion, useReducedMotion } from 'framer-motion'
import { Section } from './Section'
import { experience, leadership } from '../data/content'
import { ease, staggerContainer, staggerItem } from './motion'

function Timeline({
  items,
  accent,
}: {
  items: typeof experience
  accent: string
}) {
  const reduce = useReducedMotion()

  return (
    <div className="relative pl-6">
      <div className="absolute left-0 top-0 h-full w-px bg-[var(--line)]" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-px origin-top"
        style={{ backgroundColor: accent }}
        initial={reduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.1, ease }}
      />
      <motion.ol
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={reduce ? undefined : staggerContainer}
      >
        {items.map((e) => (
          <motion.li
            key={e.org + e.role}
            variants={reduce ? undefined : staggerItem}
            className="relative mb-8 last:mb-0"
          >
            <motion.span
              className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: accent }}
              initial={reduce ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            />
            <div className="font-mono text-[0.68rem] uppercase tracking-widest text-muted">
              {e.period}
            </div>
            <div className="mt-1 font-display text-lg font-500">{e.org}</div>
            <div className="text-sm text-signal">{e.role}</div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{e.note}</p>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  )
}

export function Experience() {
  return (
    <Section
      id="experience"
      fig="Fig. 04 — Experience"
      title="Where I’ve worked and led."
    >
      <div className="grid gap-14 md:grid-cols-2">
        <div>
          <h3 className="fig-label mb-6">Research & clinical</h3>
          <Timeline items={experience} accent="var(--signal)" />
        </div>
        <div>
          <h3 className="fig-label mb-6">Leadership & community</h3>
          <Timeline items={leadership} accent="var(--stain)" />
        </div>
      </div>
    </Section>
  )
}
