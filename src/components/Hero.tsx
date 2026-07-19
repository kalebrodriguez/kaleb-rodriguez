import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { Connectome } from './Connectome'
import { profile, focusAreas } from '../data/content'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <Connectome />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, transparent 40%, var(--bg) 92%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-36 sm:px-8 sm:pb-24 sm:pt-44">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="fig-label mb-6"
        >
          Tampa, FL · Neuroscience × Software
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.05 }}
          className="font-display text-[2.55rem] font-500 leading-[1.02] tracking-tight break-words sm:text-[5.4rem]"
        >
          Kaleb Rodriguez
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.25 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-500 text-[var(--bg)] transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--signal)' }}
          >
            View projects
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-500 text-app transition-colors hover:border-[var(--signal-deep)]"
          >
            <GithubIcon size={16} /> GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-500 text-app transition-colors hover:border-[var(--signal-deep)]"
          >
            <LinkedinIcon size={16} /> LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-500 text-app transition-colors hover:border-[var(--signal-deep)]"
          >
            <Mail size={16} /> Email
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.35 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-[var(--line)] sm:grid-cols-4"
        >
          {focusAreas.map((f) => (
            <div key={f.label} className="bg-surface p-5">
              <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-signal">
                {f.label}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{f.detail}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
