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
    <Section
      id="projects"
      fig="03 — Projects"
      title="Selected work — tools built for real users."
    >
      <motion.button
        type="button"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        onClick={() => open(featured)}
        className="group mb-10 grid w-full gap-6 text-left md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-10"
      >
        <div className="project-media transition-[border-color] duration-300 group-hover:border-[var(--signal-deep)]">
          <ProjectCover id={featured.id} />
        </div>
        <div>
          <p className="meta-signal mb-3">Featured</p>
          <h3 className="font-display text-3xl font-600 tracking-tight sm:text-4xl">
            {featured.name}
          </h3>
          <p className="mt-2 text-sm text-muted">{featured.kind}</p>
          <p className="prose-muted mt-4 text-base">{featured.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {featured.stack.slice(0, 4).map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
          <span className="mt-6 inline-flex items-center gap-1 text-sm text-signal">
            Open details
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </motion.button>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={reduce ? undefined : staggerContainer}
        className="grid gap-8 sm:grid-cols-2"
      >
        {rest.map((p) => (
          <motion.button
            key={p.id}
            type="button"
            variants={reduce ? undefined : staggerItem}
            onClick={() => open(p)}
            className="group text-left"
          >
            <div className="project-media mb-4 transition-[border-color] duration-300 group-hover:border-[var(--signal-deep)]">
              <ProjectCover id={p.id} />
            </div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-600 tracking-tight">{p.name}</h3>
              <ArrowUpRight
                size={16}
                className="mt-1 shrink-0 text-muted transition-colors group-hover:text-signal"
              />
            </div>
            <p className="mt-1 text-xs text-muted">{p.kind}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.summary}</p>
          </motion.button>
        ))}
      </motion.div>
    </Section>
  )
}
