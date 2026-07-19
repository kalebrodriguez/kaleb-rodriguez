import { Section } from './Section'
import { profile, education } from '../data/content'

export function About() {
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
            <ul className="space-y-px overflow-hidden rounded-lg border border-line bg-[var(--line)]">
              {education.map((e) => (
                <li
                  key={e.org}
                  className="flex items-baseline justify-between gap-4 bg-surface px-5 py-3 text-base"
                >
                  <div>
                    <span className="text-app">{e.org}</span>
                    <span className="text-muted"> · {e.detail}</span>
                  </div>
                  <span className="whitespace-nowrap font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                    {e.period}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="h-max space-y-px overflow-hidden rounded-lg border border-line bg-[var(--line)]">
          {[
            ['Based in', profile.location],
            ['Studying', 'Dual enrollment — USF, HCC & UF'],
            ['Graduating', 'High school, 2027'],
            ['Working in', 'Neurodegeneration & assistive tech'],
          ].map(([k, v]) => (
            <li key={k} className="bg-surface px-5 py-4">
              <div className="font-mono text-[0.7rem] uppercase tracking-widest text-signal">
                {k}
              </div>
              <div className="mt-1 text-app">{v}</div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
