import { motion, useReducedMotion } from 'framer-motion'
import { Download, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'
import { profile } from '../data/content'
import { ease } from './motion'

export function Contact() {
  const reduce = useReducedMotion()

  return (
    <section id="contact" className="relative border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="meta-signal mb-5">06 — Contact</p>
          <h2 className="font-display max-w-3xl text-4xl font-600 leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Let’s talk about research or building something.
          </h2>
          <p className="prose-muted mt-6 text-lg">
            Open to research, collaboration, and mentorship in neuroscience,
            bioinformatics, and health technology.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              <Mail size={16} /> {profile.email}
            </a>
            <a href={profile.resume} className="btn-ghost" download>
              <Download size={16} /> Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <GithubIcon size={16} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <LinkedinIcon size={16} /> LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
