import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { profile } from '../data/content'
import { ease } from './motion'
import { SignalWave } from './SignalWave'
import { FluorophoreDust } from './FluorophoreDust'
import { FieldReticle } from './FieldReticle'

export function Contact() {
  const reduce = useReducedMotion()

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute inset-0 opacity-45">
        <FluorophoreDust density={26} />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 specimen-grid opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full field-drift"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--signal) 18%, transparent), transparent 68%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full field-drift"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--stain) 14%, transparent), transparent 70%)',
        }}
      />
      <FieldReticle />
      <SignalWave />
      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease }}
        >
          <span className="fig-label">Fig. 06 — Contact</span>
          <h2 className="font-display mt-6 max-w-3xl text-4xl font-500 leading-tight tracking-tight sm:text-6xl">
            Let’s talk about research or building something.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I’m always open to research, collaboration, and mentorship in
            neuroscience, bioinformatics, and health technology.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary group">
              <Mail size={16} /> {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <GithubIcon size={16} /> github.com/kalebrodriguez
              <ArrowUpRight size={14} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <LinkedinIcon size={16} /> LinkedIn
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
