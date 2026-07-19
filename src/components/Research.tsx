import { Section } from './Section'
import { StatusTag } from './StatusTag'
import { research } from '../data/content'

export function Research() {
  return (
    <Section
      id="research"
      fig="Fig. 02 — Research"
      title="Questions I keep coming back to."
      alt
    >
      <ul className="space-y-px overflow-hidden rounded-lg border border-line bg-[var(--line)]">
        {research.map((r) => (
          <li key={r.title} className="bg-surface p-6 sm:p-7">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <StatusTag status={r.status} />
              <span className="font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                {r.org}
              </span>
              {r.meta && (
                <span className="font-mono text-[0.68rem] uppercase tracking-widest text-muted">
                  · {r.meta}
                </span>
              )}
            </div>
            <h3 className="font-display text-xl font-500 leading-snug">{r.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
              {r.plain}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-2xl font-mono text-xs leading-relaxed text-muted">
        Note: ongoing work is described in general terms only. Unpublished data and
        confidential materials are intentionally omitted.
      </p>
    </Section>
  )
}
