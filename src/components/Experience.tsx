import { Section } from './Section'
import { experience, leadership } from '../data/content'

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
          <ol className="relative border-l border-line pl-6">
            {experience.map((e) => (
              <li key={e.org} className="relative mb-8 last:mb-0">
                <span
                  className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: 'var(--signal)' }}
                />
                <div className="font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                  {e.period}
                </div>
                <div className="mt-1 font-display text-lg font-500">{e.org}</div>
                <div className="text-sm text-signal">{e.role}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.note}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="fig-label mb-6">Leadership & community</h3>
          <ol className="relative border-l border-line pl-6">
            {leadership.map((l) => (
              <li key={l.org} className="relative mb-8 last:mb-0">
                <span
                  className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: 'var(--stain)' }}
                />
                <div className="font-display text-lg font-500">{l.org}</div>
                <div className="text-sm text-signal">{l.role}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{l.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
