import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, Download } from 'lucide-react'
import { Connectome } from './Connectome'
import { profile } from '../data/content'
import { ease } from './motion'

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <Connectome />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 30%, var(--bg) 92%), radial-gradient(80% 60% at 70% 20%, color-mix(in srgb, var(--signal) 8%, transparent), transparent 60%)',
        }}
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="mb-5 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-signal"
        >
          {profile.location} · Neuroscience × Software
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.05 }}
          className="font-display max-w-4xl text-[clamp(2.8rem,10vw,6.5rem)] font-600 leading-[0.95] tracking-tight"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.12 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.18 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a href="#projects" className="btn-primary group">
            View projects
            <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </a>
          <a href={profile.resume} className="btn-ghost" download>
            <Download size={16} /> Resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}
