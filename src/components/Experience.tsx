import { ArrowUpRight } from 'lucide-react'
import { experience, leadership, type ExperienceItem } from '../data/content'
import { useDetail } from './DetailDrawer'
import { Rise, Stop } from './Stop'

// Corpus callosum: the connections. Each column is a myelinated axon; every
// role is a node of Ranvier along it.
export function Experience() {
  return (
    <Stop
      id="experience"
      title={
        <>
          The <span className="text-axon">connections</span>.
        </>
      }
      intro="Labs, programs, and communities I’ve worked in, from MIT CSAIL to a hospital floor in Tampa."
    >
      <div className="grid gap-16 lg:grid-cols-2">
        <Axon title="Research & work" items={experience} color="var(--color-axon)" />
        <Axon title="Leadership & service" items={leadership} color="var(--color-synapse)" />
      </div>
    </Stop>
  )
}

function Axon({ title, items, color }: { title: string; items: ExperienceItem[]; color: string }) {
  const { openDetail } = useDetail()
  return (
    <div>
      <h3 className="readout mb-8">{title}</h3>
      <ol className="relative">
        {/* Myelin sheath segments */}
        <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 flex w-[3px] flex-col gap-2">
          {items.map((e) => (
            <span key={e.id} className="flex-1 rounded-full opacity-40" style={{ background: color }} />
          ))}
        </span>
        {items.map((e, i) => {
          const current = /present/i.test(e.period)
          return (
            <li key={e.id} className="relative pb-2 pl-10">
              <span
                aria-hidden="true"
                className="absolute left-0 top-6 h-[17px] w-[17px] rounded-full border-2 bg-ink"
                style={{ borderColor: color, boxShadow: current ? `0 0 14px ${color}` : undefined }}
              />
              <Rise delay={i * 0.03}>
                <button
                  type="button"
                  onClick={() =>
                    openDetail({
                      kind: 'experience',
                      title: e.role,
                      eyebrow: `${e.org} · ${e.period}`,
                      summary: e.note,
                      detail: e.detail,
                      highlights: e.highlights,
                      links: e.links,
                    })
                  }
                  className="group w-full rounded-2xl p-4 text-left transition-colors hover:bg-text/[0.04]"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="readout">{e.period}</span>
                    {current && <span className="readout !text-calcium">● Now</span>}
                  </div>
                  <div className="font-display mt-2 flex items-start justify-between gap-3 text-xl leading-snug">
                    {e.org}
                    <ArrowUpRight size={18} className="mt-1 shrink-0 text-muted transition-colors group-hover:text-spike" />
                  </div>
                  <div className="mt-1 text-sm" style={{ color }}>
                    {e.role}
                  </div>
                </button>
              </Rise>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
