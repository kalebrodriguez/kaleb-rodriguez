import { ArrowUpRight, Mail } from 'lucide-react'
import { profile } from '../data/content'
import { GithubIcon, LinkedinIcon } from './icons'
import { stops } from './stops'
import { Rise } from './Stop'

// The synapse: the end of the dive, where one neuron hands off to the next.
export function Contact() {
  const index = stops.findIndex((s) => s.id === 'contact')
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-20 overflow-hidden py-32 sm:py-48">
      <Synapse />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Rise>
          <div className="readout flex items-center justify-center gap-3">
            <span className="text-spike">{String(index).padStart(2, '0')}</span>
            <span className="h-px w-10 bg-line" />
            Synapse
          </div>
          <h2 id="contact-title" className="font-display mt-6 text-6xl font-semibold leading-[0.9] sm:text-8xl">
            Let’s make a <span className="text-synapse">connection</span>.
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-muted">
            Open to research, collaboration, and mentorship in neuroscience, bioinformatics, and
            health tech.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-spike">
              <Mail size={17} /> {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-line">
              <LinkedinIcon size={16} /> LinkedIn <ArrowUpRight size={14} />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-line">
              <GithubIcon size={16} /> GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </Rise>
      </div>
    </section>
  )
}

// Two terminals facing each other with vesicles crossing the cleft.
function Synapse() {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="cleft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(255 93 143)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="rgb(255 93 143)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="600" cy="300" rx="380" ry="260" fill="url(#cleft)" />
      <path d="M-50,40 C250,60 430,170 470,300 C430,430 250,540 -50,560" fill="none" stroke="rgb(122 162 255 / 0.45)" strokeWidth="2" />
      <path d="M1250,40 C950,60 770,170 730,300 C770,430 950,540 1250,560" fill="none" stroke="rgb(255 181 71 / 0.45)" strokeWidth="2" />
      {Array.from({ length: 14 }, (_, i) => {
        const y = 170 + ((i * 53) % 260)
        const dur = 2.6 + (i % 5) * 0.5
        return (
          <circle key={i} r={3 + (i % 3)} fill="rgb(255 93 143)" opacity="0.8">
            <animate attributeName="cx" values="480;720" dur={`${dur}s`} begin={`${i * 0.37}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${y};${y + ((i % 2) * 2 - 1) * 20}`} dur={`${dur}s`} begin={`${i * 0.37}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0.9;0" dur={`${dur}s`} begin={`${i * 0.37}s`} repeatCount="indefinite" />
          </circle>
        )
      })}
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="font-display text-lg font-semibold">Kaleb Rodriguez</span>
        <span className="readout">Tampa, FL · Built from the cortex down</span>
      </div>
    </footer>
  )
}
