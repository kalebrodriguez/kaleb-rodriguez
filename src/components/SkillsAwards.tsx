import { motion, useReducedMotion } from 'framer-motion'
import { Section } from './Section'
import { skills, awards, certifications } from '../data/content'
import { staggerContainer, staggerItem } from './motion'

export function SkillsAwards() {
  const reduce = useReducedMotion()

  return (
    <Section
      id="skills"
      fig="05 — Skills & Recognition"
      title="Toolkit, honors, and credentials."
      alt
      tight
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={reduce ? undefined : staggerContainer}
        className="grid gap-12 lg:grid-cols-[1fr_1fr]"
      >
        <motion.div variants={reduce ? undefined : staggerItem}>
          <p className="meta-signal mb-5">Skills</p>
          <dl className="space-y-5">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <dt className="mb-2 text-sm text-muted">{group}</dt>
                <dd className="flex flex-wrap gap-1.5">
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

        <div className="space-y-10">
          <motion.div variants={reduce ? undefined : staggerItem}>
            <p className="meta-signal mb-5">Honors</p>
            <ul className="space-y-3">
              {awards.map((a) => (
                <li key={a} className="border-b border-line pb-3 text-sm leading-relaxed text-muted last:border-0">
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={reduce ? undefined : staggerItem}>
            <p className="meta-signal mb-4">Certifications</p>
            <ul className="flex flex-wrap gap-1.5">
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
