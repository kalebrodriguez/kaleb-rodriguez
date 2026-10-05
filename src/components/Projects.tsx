import { ArrowUpRight } from 'lucide-react'
import { projects, statusLabels } from '../data/content'
import { useDetail } from './DetailDrawer'
import { Rise, Stop } from './Stop'
import { statusTone } from './stops'

// Basal ganglia: where actions get chosen. Each project is a living cell with
// its own color, membrane, nucleus and organelles.
const hue: Record<string, string> = {
  'one-market': '122,162,255',
  neuropd: '255,181,71',
  clearcredit: '108,240,194',
  digitaltwin: '255,93,143',
  kora: '180,140,255',
  posture: '108,240,194',
  cramb: '255,181,71',
  medalert: '255,93,143',
}

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

function Cell({ id, name, big }: { id: string; name: string; big?: boolean }) {
  const c = hue[id] ?? '239,234,246'
  const rand = seeded(id.length * 977 + id.charCodeAt(0))
  const organelles = Array.from({ length: big ? 14 : 9 }, () => ({
    x: 18 + rand() * 64,
    y: 22 + rand() * 56,
    s: 4 + rand() * 9,
    o: 0.25 + rand() * 0.5,
  }))
  return (
    <div className="relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-2xl bg-ink-2">
      <div
        aria-hidden="true"
        className="absolute h-[78%] w-[62%] transition-transform duration-700 group-hover:scale-110"
        style={{
          animation: `membrane ${9 + (id.length % 5)}s ease-in-out infinite`,
          background: `radial-gradient(circle at 40% 40%, rgba(${c},0.32), rgba(${c},0.08) 60%, rgba(${c},0.02))`,
          border: `1.5px solid rgba(${c},0.55)`,
          boxShadow: `0 0 60px -10px rgba(${c},0.5), inset 0 0 40px rgba(${c},0.15)`,
        }}
      >
        <span
          className="absolute left-[38%] top-[34%] h-[30%] w-[26%] rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 35%, rgba(${c},0.9), rgba(${c},0.35))`,
            boxShadow: `0 0 24px rgba(${c},0.6)`,
          }}
        />
        {organelles.map((o, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${o.x}%`,
              top: `${o.y}%`,
              width: o.s,
              height: o.s * 0.7,
              background: `rgba(${c},${o.o})`,
            }}
          />
        ))}
      </div>
      <span className={`font-display relative font-semibold drop-shadow-[0_2px_12px_rgba(7,6,12,0.9)] ${big ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}>
        {name}
      </span>
    </div>
  )
}

export function Projects() {
  const { openDetail } = useDetail()

  return (
    <Stop
      id="projects"
      title={
        <>
          Things I’ve <span className="text-calcium">grown</span>.
        </>
      }
      intro="From a million-actor market to a dementia companion. Every one of these is live, shipped, or in someone’s hands."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const big = i === 0
          return (
            <Rise key={p.id} delay={(i % 3) * 0.06} className={big ? 'md:col-span-2' : undefined}>
              <article className="glass group flex h-full flex-col rounded-3xl p-3 transition-colors hover:border-text/25">
                <button
                  type="button"
                  className="flex flex-1 flex-col text-left"
                  onClick={() =>
                    openDetail({
                      kind: 'project',
                      title: p.name,
                      eyebrow: p.kind,
                      status: p.status,
                      summary: p.summary,
                      detail: p.detail,
                      highlights: p.highlights,
                      stack: p.stack,
                      links: p.links,
                    })
                  }
                >
                  <Cell id={p.id} name={p.name} big={big} />
                  <div className="flex flex-1 flex-col px-3 pb-2 pt-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`readout rounded-full border px-2.5 py-1 ${statusTone[p.status]}`}>
                        {statusLabels[p.status]}
                      </span>
                      <span className="readout">{p.kind}</span>
                    </div>
                    <p className={`mt-3 leading-relaxed text-muted ${big ? 'text-lg' : 'line-clamp-3'}`}>{p.summary}</p>
                  </div>
                </button>
                <div className="flex items-center justify-between gap-3 border-t border-line px-3 pb-1 pt-4">
                  <span className="readout truncate">{p.stack.slice(0, 3).join(' · ')}</span>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-text hover:text-spike"
                    aria-label={`Open ${p.name}`}
                  >
                    Open <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            </Rise>
          )
        })}
      </div>
    </Stop>
  )
}
