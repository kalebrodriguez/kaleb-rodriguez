import { motion, useReducedMotion } from 'framer-motion'
import { Award } from 'lucide-react'
import { Section } from './Section'
import { skills, awards, certifications } from '../data/content'
import { staggerContainer, staggerItem } from './motion'

export function SkillsAwards() {
  const reduce = useReducedMotion()

  return (
    <Section
      id="skills"
      fig="Fig. 05 — Skills & Recognition"
      title="Toolkit, honors, and credentials."
      alt
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={reduce ? undefined : staggerContainer}
        className="grid gap-5 md:grid-cols-2"
      >
        <motion.div variants={reduce ? undefined : staggerItem} className="panel p-6">
          <h3 className="fig-label mb-5">Skills</h3>
          <dl className="space-y-5">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <dt className="mb-2.5 font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                  {group}
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <div className="flex flex-col gap-5">
          <motion.div variants={reduce ? undefined : staggerItem} className="panel p-6">
            <h3 className="fig-label mb-5">Honors & awards</h3>
            <ul className="space-y-2">
              {awards.map((a, i) => (
                <li
                  key={a}
                  className="group flex gap-3 rounded-md border border-transparent px-2 py-2 text-sm leading-relaxed text-muted transition-colors hover:border-line hover:bg-surface-2"
                >
                  <Award
                    size={15}
                    className="mt-0.5 shrink-0 text-signal transition-transform group-hover:scale-110"
                  />
                  <span className="flex-1">{a}</span>
                  <span className="index-mark mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={reduce ? undefined : staggerItem} className="panel p-6">
            <h3 className="fig-label mb-4">Certifications</h3>
            <ul className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li key={c} className="chip">
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  )
}
