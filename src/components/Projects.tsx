import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section } from './Section'
import { ProjectCover } from './ProjectCover'
import { projects } from '../data/content'
import { staggerContainer, staggerItem } from './motion'
import { useDetail } from './DetailDrawer'

export function Projects() {
  const reduce = useReducedMotion()
  const { openDetail } = useDetail()
  const featured = projects.find((p) => p.featured) ?? projects[0]
  const rest = projects.filter((p) => p.id !== featured.id)

  const open = (p: (typeof projects)[number]) =>
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
      coverId: p.id,
    })

  return (
    <Section id="projects" fig="03 — Projects" title="Selected work — tools built for real users.">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={reduce ? undefined : staggerContainer}
        className="space-y-16"
      >
        {rest.map((p, i) => {
          const flip = i % 2 === 1
          return (
            <motion.button
              key={p.id}
              type="button"
              variants={reduce ? undefined : staggerItem}
              onClick={() => open(p)}
              className="group grid w-full items-center gap-6 text-left md:grid-cols-2 md:gap-12"
            >
              <div
                className={`project-media transition-[border-color] duration-300 group-hover:border-[color-mix(in_srgb,var(--signal)_40%,var(--line))] ${
                  flip ? 'md:order-2' : ''
                }`}
              >
                <ProjectCover id={p.id} />
              </div>
              <div className={flip ? 'md:order-1' : ''}>
                <p className="eyebrow mb-3">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{p.kind}</p>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 4).map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1 text-sm text-signal">
                  Details
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </Section>
  )
}
