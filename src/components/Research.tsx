import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { research, statusLabels } from '../data/content'
import { useDetail } from './DetailDrawer'
import { Rise, Stop } from './Stop'
import { statusTone } from './stops'

// Hippocampus: research as a circuit. An axon draws itself down the page as
// you scroll, and each project is a node it fires into.
export function Research() {
  const reduce = useReducedMotion()
  const { openDetail } = useDetail()
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Stop
      id="research"
      title={
        <>
          Research, <span className="text-spike">wired</span> together.
        </>
      }
      intro="Parkinson’s, dementia, learning, and the models that read them. Tap any node for the full story."
    >
      <ol ref={ref} className="relative space-y-6 pl-10 sm:pl-16">
        <span aria-hidden="true" className="absolute bottom-0 left-[11px] top-0 w-px bg-line sm:left-[19px]" />
        <motion.span
          aria-hidden="true"
          className="absolute left-[11px] top-0 h-full w-px origin-top bg-gradient-to-b from-spike via-synapse to-axon shadow-[0_0_12px_rgb(255_181_71/0.7)] sm:left-[19px]"
          style={reduce ? undefined : { scaleY: grow }}
        />
        {research.map((r, i) => (
          <li key={r.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-10 top-7 flex h-6 w-6 items-center justify-center rounded-full border border-spike/60 bg-ink sm:-left-16 sm:h-10 sm:w-10"
            >
              <span className="h-2 w-2 rounded-full bg-spike shadow-[0_0_14px_3px_rgb(255_181_71/0.8)] sm:h-2.5 sm:w-2.5" />
            </span>
            <Rise delay={i * 0.03}>
              <article className={`glass group grid gap-6 rounded-3xl p-6 transition-colors hover:border-spike/30 sm:p-8 ${
                  r.image ? 'md:grid-cols-[minmax(0,240px)_1fr_auto]' : 'md:grid-cols-[1fr_auto]'
                }`}>
                {r.image && (
                  <figure className="relative overflow-hidden rounded-2xl border border-line">
                    <img
                      src={r.image.src}
                      alt={r.image.alt}
                      loading="lazy"
                      className="aspect-[4/3] h-full w-full object-cover object-[45%_40%] transition-transform duration-700 group-hover:scale-105 md:aspect-[3/4]"
                    />
                    <figcaption className="readout absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/90 to-transparent px-3 pb-2.5 pt-8 !text-text">
                      Presenting at Penn
                    </figcaption>
                  </figure>
                )}
                <button
                  type="button"
                  className="text-left"
                  onClick={() =>
                    openDetail({
                      kind: 'research',
                      title: r.title,
                      eyebrow: r.meta,
                      status: r.status,
                      summary: r.plain,
                      detail: r.detail,
                      highlights: r.highlights,
                      links: r.links,
                      image: r.image,
                    })
                  }
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`readout rounded-full border px-2.5 py-1 ${statusTone[r.status]}`}>
                      {statusLabels[r.status]}
                    </span>
                    <span className="readout">{r.org}</span>
                  </div>
                  <h3 className="font-display mt-4 text-2xl font-medium leading-tight transition-colors group-hover:text-spike sm:text-3xl">
                    {r.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted">{r.plain}</p>
                  {r.meta && <p className="readout mt-4">{r.meta}</p>}
                </button>
                {r.link && (
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-line self-start whitespace-nowrap text-sm"
                  >
                    {r.linkLabel ?? 'Open'} <ArrowUpRight size={15} />
                  </a>
                )}
              </article>
            </Rise>
          </li>
        ))}
      </ol>
    </Stop>
  )
}
