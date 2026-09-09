import { motion, useReducedMotion } from 'framer-motion'
import { Section } from './Section'
import { profile, education, aboutFacts } from '../data/content'
import { staggerContainer, staggerItem } from './motion'
import { useDetail } from './DetailDrawer'

export function About() {
  const reduce = useReducedMotion()
  const { openDetail } = useDetail()

  return (
    <Section id="about" fig="Fig. 01 — About" title="Between the lab bench and the build.">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-muted">
          <p>{profile.intro}</p>
          <p>
            The two halves of that work feed each other. Reading how a disease
            unravels a system tells me what a person will actually need; building
            the tool tells me which parts of the science matter in practice.
            Neurodegeneration is the throughline — from a published Parkinson’s
            scoping review to the wet bench — and assistive software is the answer
            I can ship today.
          </p>
          <div>
            <div className="fig-label mb-4">Education</div>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              variants={reduce ? undefined : staggerContainer}
              className="list-stack space-y-px"
            >
              {education.map((e, i) => (
                <motion.li
                  key={e.org}
                  variants={reduce ? undefined : staggerItem}
                  className="group relative flex items-baseline justify-between gap-4 px-5 py-3 text-base"
                >
                  <span className="accent-rail" aria-hidden="true" />
                  <div className="flex items-baseline gap-3">
                    <span className="index-mark">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <span className="text-app">{e.org}</span>
                      <span className="text-muted"> · {e.detail}</span>
                    </div>
                  </div>
                  <span className="whitespace-nowrap font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                    {e.period}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={reduce ? undefined : staggerContainer}
          className="panel h-max !p-0"
        >
          {aboutFacts.map((f, i) => (
            <motion.li key={f.id} variants={reduce ? undefined : staggerItem}>
              <button
                type="button"
                onClick={() =>
                  openDetail({
                    kind: 'about',
                    title: f.label,
                    eyebrow: 'Profile',
                    summary: f.value,
                    detail: f.detail,
                    links:
                      f.id === 'studying'
                        ? [{ label: 'GitHub', href: profile.github }]
                        : undefined,
                  })
                }
                className="group/focus relative w-full border-b border-line px-5 py-4 text-left last:border-0"
              >
                <span className="accent-rail" aria-hidden="true" />
                <div className="mb-1 flex items-center justify-between">
                  <div className="font-mono text-[0.7rem] uppercase tracking-widest text-signal">
                    {f.label}
                  </div>
                  <span className="index-mark">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="text-app">{f.value}</div>
                <span className="mt-2 inline-block font-mono text-[0.62rem] uppercase tracking-widest text-muted transition-colors group-hover/focus:text-signal">
                  More →
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  )
}
