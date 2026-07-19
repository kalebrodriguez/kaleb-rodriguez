import { Award } from 'lucide-react'
import { Section } from './Section'
import { skills, awards, certifications } from '../data/content'

export function SkillsAwards() {
  return (
    <Section
      id="skills"
      fig="Fig. 05 — Skills & Recognition"
      title="Toolkit, honors, and credentials."
      alt
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-surface p-6">
          <h3 className="fig-label mb-5">Skills</h3>
          <dl className="space-y-4">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group}>
                <dt className="mb-2 font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                  {group}
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-line px-2.5 py-1 text-xs text-app"
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-lg border border-line bg-surface p-6">
            <h3 className="fig-label mb-5">Honors & awards</h3>
            <ul className="space-y-3">
              {awards.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <Award size={15} className="mt-0.5 shrink-0 text-signal" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-surface p-6">
            <h3 className="fig-label mb-4">Certifications</h3>
            <ul className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li
                  key={c}
                  className="rounded border border-line px-2.5 py-1 font-mono text-[0.68rem] text-muted"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
