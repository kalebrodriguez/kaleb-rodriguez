import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, Download } from 'lucide-react'
import { ProjectCover } from './ProjectCover'
import { profile, projects } from '../data/content'
import { ease } from './motion'
import { useDetail } from './DetailDrawer'

export function Hero() {
  const reduce = useReducedMotion()
  const { openDetail } = useDetail()
  const featured = projects.find((p) => p.featured) ?? projects[0]
  const [first, ...rest] = profile.name.split(' ')
  const last = rest.join(' ')

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-end gap-10 px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:grid-cols-[1fr_1.05fr] lg:items-end lg:gap-14">
        <div className="pb-2">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="eyebrow mb-6"
          >
            {profile.location} · Neuroscience × Software
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.04 }}
            className="font-display text-[clamp(3.5rem,11vw,7.5rem)] font-[800] leading-[0.86] tracking-tight"
          >
            <span className="block">{first}</span>
            <span className="block">{last}</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: 0.1 }}
            className="mt-8 max-w-md text-lg leading-relaxed text-muted sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: 0.16 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href="#projects" className="btn-primary">
              View projects
              <ArrowDownRight size={16} />
            </a>
            <a href={profile.resume} className="btn-ghost" download>
              <Download size={16} /> Resume
            </a>
          </motion.div>
        </div>

        <motion.button
          type="button"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.12 }}
          onClick={() =>
            openDetail({
              kind: 'project',
              title: featured.name,
              eyebrow: featured.kind,
              status: featured.status,
              summary: featured.summary,
              detail: featured.detail,
              highlights: featured.highlights,
              stack: featured.stack,
              links: featured.links,
              coverId: featured.id,
            })
          }
          className="hero-frame group"
        >
          <div className="project-media !aspect-[5/4] !border-0 sm:!aspect-[16/11]">
            <ProjectCover id={featured.id} />
          </div>
          <div className="flex items-end justify-between gap-4 border-t border-line p-5 sm:p-6">
            <div>
              <p className="eyebrow mb-2">Featured</p>
              <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {featured.name}
              </p>
              <p className="mt-1 text-sm text-muted">{featured.kind}</p>
            </div>
            <span className="shrink-0 text-sm text-signal group-hover:underline">Open →</span>
          </div>
        </motion.button>
      </div>
    </section>
  )
}
