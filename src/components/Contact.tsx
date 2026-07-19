import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { GithubIcon } from './icons'
import { profile } from '../data/content'

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-500 text-[var(--bg)] transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--signal)' }}
            >
              <Mail size={16} /> {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-500 text-app transition-colors hover:border-[var(--signal-deep)]"
            >
              <GithubIcon size={16} /> github.com/kalebrodriguez
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
