import { motion, useReducedMotion } from 'framer-motion'
import { Section } from './Section'
import { profile, education, aboutFacts } from '../data/content'
import { staggerContainer, staggerItem } from './motion'
import { useDetail } from './DetailDrawer'

export function About() {
  const reduce = useReducedMotion()
  const { openDetail } = useDetail()

  return (
    <Section id="about" fig="01 — About" title="Between the lab bench and the build.">
      <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          <p className="max-w-2xl">{profile.intro}</p>
          <p className="max-w-2xl">
            The two halves of that work feed each other. Reading how a disease
            unravels a system tells me what a person will actually need; building
            the tool tells me which parts of the science matter in practice.
            Neurodegeneration is the throughline — from a published Parkinson’s
            scoping review to the wet bench — and assistive software is the answer
            I can ship today.
          </p>
          <p className="max-w-2xl text-base">{profile.path}</p>

          <div className="pt-4">
            <p className="meta-signal mb-4">Education</p>
            <ul className="border-t border-line">
              {education.map((e) => (
                <li
                  key={e.org}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-3"
                >
                  <div>
                    <span className="text-app">{e.org}</span>
                    <span className="text-muted"> · {e.detail}</span>
                  </div>
                  <span className="meta">{e.period}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={reduce ? undefined : staggerContainer}
          className="h-max border-t border-line"
        >
          {aboutFacts.map((f) => (
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
                      f.id === 'path' || f.id === 'studying'
                        ? [{ label: 'Download resume', href: profile.resume }]
                        : undefined,
                  })
                }
                className="row-link group w-full"
              >
                <p className="meta-signal">{f.label}</p>
                <p className="text-lg text-app">{f.value}</p>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  )
}
