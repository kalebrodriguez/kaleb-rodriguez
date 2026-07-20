import { motion, useReducedMotion } from 'framer-motion'
import { Section } from './Section'
import { profile, education } from '../data/content'
import { staggerContainer, staggerItem } from './motion'

export function About() {
  const reduce = useReducedMotion()

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
              className="space-y-px overflow-hidden rounded-lg border border-line bg-[var(--line)]"
            >
              {education.map((e) => (
                <motion.li
                  key={e.org}
                  variants={reduce ? undefined : staggerItem}
                  className="flex items-baseline justify-between gap-4 bg-surface px-5 py-3 text-base"
                >
                  <div>
                    <span className="text-app">{e.org}</span>
                    <span className="text-muted"> · {e.detail}</span>
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
          className="h-max space-y-px overflow-hidden rounded-lg border border-line bg-[var(--line)]"
        >
          {[
            ['Based in', profile.location],
            ['Studying', 'Dual enrollment — USF, HCC & UF'],
            ['Graduating', 'High school, 2027'],
            ['Working in', 'Neurodegeneration & assistive tech'],
          ].map(([k, v]) => (
            <motion.li
              key={k}
              variants={reduce ? undefined : staggerItem}
              className="bg-surface px-5 py-4"
            >
              <div className="font-mono text-[0.7rem] uppercase tracking-widest text-signal">
                {k}
              </div>
              <div className="mt-1 text-app">{v}</div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  )
}
