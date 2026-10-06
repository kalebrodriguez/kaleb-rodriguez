import { useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import {
  awards,
  certifications,
  experience,
  leadership,
  profile,
  projects,
  research,
  skills,
  statusLabels,
  updates,
  type ExperienceItem,
} from './data/content'
import { Neuron } from './Neuron'

// Apple-style restraint. A dark, cinematic hero with
// one neuron that turns and fires as you scroll, then light, readable
// chapters, a highlights grid, photos as prints, and a few small playful
// touches.

const ease = [0.22, 1, 0.36, 1] as const

// Scroll value → number through a piecewise-linear map. Function transforms
// keep opacity off the browser ScrollTimeline path (which mis-maps pinned
// sections).
function useMap(v: MotionValue<number>, from: number[], to: number[]) {
  return useTransform(v, (x) => {
    if (x <= from[0]) return to[0]
    for (let i = 1; i < from.length; i++) {
      if (x <= from[i]) return to[i - 1] + ((to[i] - to[i - 1]) * (x - from[i - 1])) / (from[i] - from[i - 1])
    }
    return to[to.length - 1]
  })
}

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`min-w-0 ${className ?? ''}`}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

function Marker({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const on = useInView(ref, { once: true, margin: '-80px' })
  return (
    <span ref={ref} className={`marker ${on ? 'on' : ''}`}>
      {children}
    </span>
  )
}

function Chapter({ id, eyebrow, title, children, tone = 'snow' }: { id: string; eyebrow: string; title: ReactNode; children: ReactNode; tone?: 'snow' | 'mist' }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`scroll-mt-12 py-24 sm:py-36 ${tone === 'mist' ? 'bg-mist' : 'bg-snow'}`}>
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <Reveal>
          <p className="text-lg font-semibold text-gray sm:text-xl">{eyebrow}</p>
          <h2 id={`${id}-h`} className="display mt-2 max-w-3xl text-5xl sm:text-7xl">
            {title}
          </h2>
        </Reveal>
        <div className="mt-14 sm:mt-20">{children}</div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Highlights />
        <Feature />
        <MoreResearch />
        <Lineup />
        <Experience />
        <Toolkit />
        <WhatsNew />
        <Contact />
      </main>
      <footer className="bg-mist">
        <div className="mx-auto flex max-w-[1080px] flex-col justify-between gap-2 border-t border-line px-4 py-6 text-xs text-gray sm:flex-row sm:px-6">
          <span>Kaleb Rodriguez · Tampa, Florida</span>
          <span>© 2026 Kaleb Rodriguez</span>
        </div>
      </footer>
    </>
  )
}

/* ---------------- Nav ---------------- */

const navLinks = [
  { href: '#highlights', label: 'Highlights' },
  { href: '#feature', label: 'Research' },
  { href: '#lineup', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[rgb(22_22_23/0.78)] text-[#e8e8ed] backdrop-blur-xl backdrop-saturate-150">
      <nav className="mx-auto flex h-12 max-w-[1080px] items-center justify-between px-4 sm:px-6" aria-label="Primary">
        <a href="#top" className="text-sm font-semibold tracking-tight text-white">
          Kaleb Rodriguez
        </a>
        <ul className="hidden items-center gap-8 text-xs md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="opacity-80 transition-opacity hover:opacity-100">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="text-xs md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="d-menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      {open && (
        <ul id="d-menu" className="px-6 pb-6 md:hidden">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-2xl font-semibold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

/* ---------------- Hero ---------------- */

const words = [
  { t: 'Researcher.', at: [0.22, 0.3, 0.38, 0.44] },
  { t: 'Builder.', at: [0.42, 0.5, 0.56, 0.62] },
  { t: 'Senior, class of 2027.', at: [0.6, 0.66, 0.72, 0.78] },
]

function Word({ p, t, at }: { p: MotionValue<number>; t: string; at: number[] }) {
  const opacity = useMap(p, at, [0, 1, 1, 0])
  const y = useMap(p, [at[0], at[1], at[2], at[3]], [40, 0, 0, -40])
  return (
    <motion.p style={{ opacity, y }} className="display absolute inset-x-0 text-center text-5xl text-white sm:text-8xl">
      {t}
    </motion.p>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const introO = useMap(p, [0, 0.14], [1, 0])
  const introY = useMap(p, [0, 0.18], [0, -60])
  const scale = useMap(p, [0, 0.7, 1], [0.62, 1.05, 1.2])
  const rotate = useMap(p, [0, 1], [-10, 6])
  const x = useMap(p, [0, 0.7], [0, -40])
  const glow = useMap(p, [0, 0.12, 0.85, 1], [0.55, 1, 1, 0.25])
  const fire = useMap(p, [0.48, 0.8], [0, 1])
  const finalO = useMap(p, [0.82, 0.92], [0, 1])
  const finalY = useMap(p, [0.82, 0.95], [30, 0])
  const bloom = useMap(p, [0.75, 1], [0, 1])
  const still = useMotionValue(1)
  const rest = useMotionValue(0)

  if (reduce) {
    return (
      <section id="top" className="bg-night px-4 pb-24 pt-32 text-white">
        <div className="mx-auto max-w-[1080px] text-center">
          <h1 className="display text-6xl sm:text-8xl">Kaleb Rodriguez.</h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-gray-dark">{profile.tagline}</p>
          <div className="mx-auto mt-10 aspect-[980/560] max-w-3xl">
            <Neuron fire={rest} glow={still} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="top" ref={ref} className="relative h-[340vh] bg-night">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            opacity: bloom,
            background:
              'radial-gradient(40% 35% at 50% 55%, rgb(163 92 255 / 0.35), transparent 70%), radial-gradient(50% 40% at 60% 65%, rgb(255 94 168 / 0.18), transparent 70%)',
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 aspect-[980/560] w-[min(150vw,1300px)] -translate-x-1/2 -translate-y-1/2"
          style={{ scale, rotate, x }}
        >
          <Neuron fire={fire} glow={glow} />
        </motion.div>

        <motion.div style={{ opacity: introO, y: introY }} className="relative flex h-full flex-col items-center justify-start px-4 pt-[18svh] text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease }}
            className="display text-6xl text-white sm:text-[7.5rem]"
          >
            Kaleb Rodriguez.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.25 }}
            className="mt-5 max-w-xl text-xl font-medium text-gray-dark sm:text-2xl"
          >
            Neuroscience researcher. Software builder. Tampa, Florida.
          </motion.p>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 text-xs font-medium uppercase tracking-[0.2em] text-gray"
          >
            Scroll
          </motion.span>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-[16svh]">
          {words.map((w) => (
            <Word key={w.t} p={p} t={w.t} at={w.at} />
          ))}
        </div>

        <motion.div style={{ opacity: finalO, y: finalY }} className="pointer-events-none absolute inset-x-0 bottom-[14svh] px-4 text-center">
          <p className="display text-4xl text-white sm:text-7xl">
            Studying the brain.
            <br />
            <span className="glow-text">Building for people.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- Highlights (bento) ---------------- */

function Highlights() {
  const om = projects.find((p) => p.id === 'one-market')
  const pub = research.find((r) => r.status === 'published')
  const labs = experience.filter((e) => /present/i.test(e.period) && /lab|csail|university/i.test(e.org))

  return (
    <Chapter id="highlights" eyebrow="Get the highlights." title="Fast facts, big moments." tone="mist">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Portrait */}
        <Reveal className="md:row-span-2">
          <div className="tile flex h-full flex-col items-center justify-between gap-8 bg-snow p-8">
            <figure className="print w-full max-w-[280px] rotate-[-2deg]">
              <img src={profile.photo.src} alt={profile.photo.alt} className="aspect-square w-full object-cover" />
              <figcaption className="pt-2 text-center font-hand text-2xl text-ink">Tampa → everywhere</figcaption>
            </figure>
            <p className="text-center text-lg leading-snug text-gray">
              Senior at Middleton High. Dual-enrolled at <span className="text-ink">USF, HCC & UF</span>.
            </p>
          </div>
        </Reveal>

        {/* 1M actors */}
        <Reveal className="md:col-span-2" delay={0.05}>
          <a href={om?.link} target="_blank" rel="noopener noreferrer" className="tile group block h-full bg-night p-8 text-white sm:p-10">
            <p className="text-sm font-semibold text-gray-dark">One Market · MHacks 2026</p>
            <p className="display glow-text mt-3 text-6xl sm:text-8xl">1,000,000</p>
            <p className="mt-2 max-w-md text-xl text-[#d2d2d7]">persistent trading actors in one live, shared world. 250,000 updates a second.</p>
            <p className="mt-8 text-link">See the project ›</p>
          </a>
        </Reveal>

        {/* Published */}
        <Reveal delay={0.1}>
          <a href={pub?.link} target="_blank" rel="noopener noreferrer" className="tile block h-full bg-snow p-8">
            <p className="text-sm font-semibold text-gray">Research</p>
            <p className="display mt-3 text-5xl">Published.</p>
            <p className="mt-3 text-lg leading-snug text-gray">PINK1/Parkin scoping review, presented at the National Research Conference at Penn.</p>
            <p className="mt-6 text-link">Read the preprint ›</p>
          </a>
        </Reveal>

        {/* MIT */}
        <Reveal delay={0.15}>
          <div className="tile h-full bg-snow p-8">
            <p className="text-sm font-semibold text-gray">Selected</p>
            <p className="display mt-3 text-5xl">MIT CSAIL.</p>
            <p className="mt-3 text-lg leading-snug text-gray">Mantis AI Rising Scholar under Prof. Manolis Kellis.</p>
          </div>
        </Reveal>

        {/* Amgen */}
        <Reveal delay={0.05}>
          <div className="tile h-full bg-gradient-to-br from-[#fff4e0] to-[#ffe2ef] p-8">
            <p className="text-sm font-semibold text-gray">DigitalTwin · Amgen 2026</p>
            <p className="display mt-3 text-5xl">1st Place.</p>
            <p className="mt-3 text-lg leading-snug text-gray">Plus Best Presenter at the STEM Entrepreneurship Camp pitch competition.</p>
          </div>
        </Reveal>

        {/* Labs */}
        <Reveal delay={0.1}>
          <div className="tile h-full bg-snow p-8">
            <p className="text-sm font-semibold text-gray">Current affiliations</p>
            <p className="display mt-3 text-5xl">{labs.length} labs.</p>
            <ul className="mt-3 space-y-1 text-lg text-gray">
              {labs.map((l) => (
                <li key={l.id}>{l.org.split(' — ')[0]}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Credits */}
        <Reveal delay={0.15}>
          <div className="tile h-full bg-gradient-to-br from-[#e8efff] to-[#f1e8ff] p-8">
            <p className="text-sm font-semibold text-gray">Dual enrollment</p>
            <p className="display mt-3 text-5xl">~85 credits.</p>
            <p className="mt-3 text-lg leading-snug text-gray">College coursework before graduating high school, with a ~4.0 at USF.</p>
          </div>
        </Reveal>
      </div>
    </Chapter>
  )
}

/* ---------------- Feature: NRCP ---------------- */

function Feature() {
  const lead = research.find((r) => r.image) ?? research[0]
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scale = useMap(scrollYProgress, [0, 1], [0.86, 1])
  const radius = useMap(scrollYProgress, [0, 1], [48, 28])
  const reduce = useReducedMotion()

  return (
    <section id="feature" aria-labelledby="feature-h" className="scroll-mt-12 bg-snow py-24 sm:py-36">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <Reveal>
          <p className="text-lg font-semibold text-gray sm:text-xl">Research</p>
          <h2 id="feature-h" className="display mt-2 text-5xl sm:text-7xl">
            Presented at <span className="glow-text">Penn.</span>
          </h2>
        </Reveal>
      </div>
      {lead.image && (
        <div ref={ref} className="mx-auto mt-14 max-w-[1280px] px-4 sm:px-6">
          <motion.figure style={reduce ? undefined : { scale, borderRadius: radius }} className="overflow-hidden rounded-[28px]">
            <img src={lead.image.src} alt={lead.image.alt} loading="lazy" className="max-h-[80svh] w-full object-cover object-[45%_40%]" />
          </motion.figure>
        </div>
      )}
      <div className="mx-auto mt-14 grid max-w-[1080px] gap-10 px-4 sm:px-6 md:grid-cols-2">
        <Reveal>
          <h3 className="text-2xl font-semibold leading-snug sm:text-3xl">{lead.title}</h3>
          <p className="mt-3 text-gray">{lead.meta}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl leading-relaxed text-gray">
            A scoping review of whether nanoparticles that target damaged mitochondria could{' '}
            <Marker>
              <span className="text-ink">restore the cell’s quality-control system</span>
            </Marker>{' '}
            that fails in Parkinson’s disease.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-lg">
            {lead.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
                {l.label} ›
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function MoreResearch() {
  const rest = research.filter((r) => !r.image)
  return (
    <section aria-label="More research" className="bg-snow pb-24 sm:pb-36">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        <h3 className="border-b border-line pb-4 text-2xl font-semibold">More research</h3>
        <ul>
          {rest.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.04}>
              <li className="grid gap-2 border-b border-line py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-10">
                <div>
                  <p className="text-sm font-semibold text-gray">
                    {r.org} · {statusLabels[r.status]}
                  </p>
                  <p className="mt-1 text-xl font-semibold leading-snug">{r.title}</p>
                  <p className="mt-2 max-w-2xl text-gray">{r.plain}</p>
                </div>
                {r.link && (
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap text-link hover:underline">
                    {r.linkLabel ?? 'Learn more'} ›
                  </a>
                )}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------- Lineup (projects carousel) ---------------- */

const tileTone: Record<string, string> = {
  'one-market': 'from-[#0b1a3a] to-[#1d3b8f] text-white',
  neuropd: 'from-[#2a1747] to-[#6a3fb5] text-white',
  clearcredit: 'from-[#e3fff3] to-[#bdf3dc] text-ink',
  digitaltwin: 'from-[#ffe5ef] to-[#ffc2d8] text-ink',
  kora: 'from-[#f1ebff] to-[#d9ccff] text-ink',
  posture: 'from-[#e6f3ff] to-[#c4e2ff] text-ink',
  cramb: 'from-[#fff3dc] to-[#ffe0a8] text-ink',
  medalert: 'from-[#1d1d1f] to-[#3a3a3c] text-white',
}

function Lineup() {
  const track = useRef<HTMLDivElement>(null)
  const scrollBy = (dir: number) => track.current?.scrollBy({ left: dir * 380, behavior: 'smooth' })

  return (
    <section id="lineup" aria-labelledby="lineup-h" className="scroll-mt-12 overflow-hidden bg-mist py-24 sm:py-36">
      <div className="mx-auto flex max-w-[1080px] items-end justify-between gap-6 px-4 sm:px-6">
        <Reveal>
          <p className="text-lg font-semibold text-gray sm:text-xl">Projects</p>
          <h2 id="lineup-h" className="display mt-2 text-5xl sm:text-7xl">
            Explore the lineup.
          </h2>
        </Reveal>
        <div className="hidden gap-3 sm:flex">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous projects" className="h-11 w-11 rounded-full bg-[#e3e3e8] text-xl text-ink transition-colors hover:bg-[#d2d2d7]">
            ‹
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Next projects" className="h-11 w-11 rounded-full bg-[#e3e3e8] text-xl text-ink transition-colors hover:bg-[#d2d2d7]">
            ›
          </button>
        </div>
      </div>
      <div
        ref={track}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-[max(1.5rem,calc((100vw-1080px)/2+1.5rem))]"
      >
        {projects.map((p) => (
          <article
            key={p.id}
            className={`tile flex min-h-[460px] w-[82vw] shrink-0 snap-start flex-col justify-between bg-gradient-to-br p-8 sm:w-[360px] ${tileTone[p.id] ?? 'from-snow to-mist text-ink'}`}
          >
            <div>
              <p className="text-sm font-semibold opacity-70">{statusLabels[p.status]}</p>
              <h3 className="display mt-2 text-4xl">{p.name}</h3>
              <p className="mt-2 text-sm font-medium opacity-70">{p.kind}</p>
              <p className="mt-6 text-lg leading-snug opacity-90">{p.summary}</p>
            </div>
            <div className="mt-8 flex items-end justify-between gap-4">
              <span className="text-xs font-medium opacity-60">{p.stack.slice(0, 3).join(' · ')}</span>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full bg-[#0071e3] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#0077ed]">
                Open
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Experience ---------------- */

function Rows({ title, items }: { title: string; items: ExperienceItem[] }) {
  return (
    <div>
      <h3 className="border-b border-line pb-4 text-2xl font-semibold">{title}</h3>
      <ul>
        {items.map((e) => (
          <li key={e.id} className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-line py-5">
            <span className="font-semibold">{e.org}</span>
            <span className="text-sm text-gray">{e.period.replace(' — ', '–')}</span>
            <span className="col-span-2 mt-1 text-gray">{e.role}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Experience() {
  return (
    <Chapter id="experience" eyebrow="Experience" title="Where I’ve worked and led.">
      <div className="grid gap-14 md:grid-cols-2">
        <Reveal>
          <Rows title="Research & work" items={experience} />
        </Reveal>
        <Reveal delay={0.1}>
          <Rows title="Leadership & service" items={leadership} />
        </Reveal>
      </div>
    </Chapter>
  )
}

/* ---------------- Toolkit ---------------- */

function Toolkit() {
  return (
    <Chapter id="toolkit" eyebrow="Skills & recognition" title="The toolkit." tone="mist">
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="tile h-full bg-snow p-8">
            <dl className="space-y-6">
              {Object.entries(skills).map(([g, list]) => (
                <div key={g}>
                  <dt className="text-sm font-semibold text-gray">{g}</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {list.map((s) => (
                      <span key={s} className="rounded-full bg-mist px-3 py-1 text-sm font-medium">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="tile h-full bg-snow p-8">
            <h3 className="text-sm font-semibold text-gray">Awards</h3>
            <ul className="mt-3 divide-y divide-line">
              {awards.map((a) => {
                const [name, rest] = a.split(' — ')
                return (
                  <li key={a} className="py-3">
                    <span className="font-semibold">{name}</span>
                    {rest && <span className="block text-sm text-gray">{rest}</span>}
                  </li>
                )
              })}
            </ul>
            <h3 className="mt-8 text-sm font-semibold text-gray">Certifications</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray">{certifications.join(' · ')}</p>
          </div>
        </Reveal>
      </div>
    </Chapter>
  )
}

/* ---------------- What's new ---------------- */

function WhatsNew() {
  return (
    <Chapter id="latest" eyebrow="Latest" title="What’s new.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {updates.map((u, i) => {
          const body = (
            <div className="tile h-full bg-mist p-7 transition-transform duration-500 hover:-translate-y-1">
              <p className="text-sm font-semibold text-gray">
                {u.date} · {u.source}
              </p>
              <p className="mt-3 text-xl font-semibold leading-snug">{u.title}</p>
            </div>
          )
          return (
            <Reveal key={u.id} delay={(i % 3) * 0.05}>
              {u.href ? (
                <a href={u.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {body}
                </a>
              ) : (
                body
              )}
            </Reveal>
          )
        })}
      </div>
    </Chapter>
  )
}

/* ---------------- Contact ---------------- */

function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const reduce = useReducedMotion()
  return (
    <section id="contact" aria-labelledby="contact-h" className="relative scroll-mt-12 overflow-hidden bg-night py-32 text-center text-white sm:py-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(45% 50% at 50% 100%, rgb(163 92 255 / 0.35), transparent 70%)' }}
      />
      <div ref={ref} className="relative mx-auto max-w-3xl px-4">
        <Reveal>
          <h2 id="contact-h" className="display text-5xl sm:text-8xl">
            Let’s build <span className="glow-text">something.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-xl text-gray-dark">
            Open to research, collaboration, and mentorship in neuroscience, bioinformatics, and health tech.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={`mailto:${profile.email}`} className="rounded-full bg-[#0071e3] px-7 py-3 text-lg font-medium text-white hover:bg-[#0077ed]">
              Email me
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#424245] px-7 py-3 text-lg font-medium hover:border-white">
              LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#424245] px-7 py-3 text-lg font-medium hover:border-white">
              GitHub
            </a>
          </div>
        </Reveal>
        <motion.p
          initial={reduce ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          animate={inView ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' } : undefined}
          transition={{ duration: 1.6, ease, delay: 0.4 }}
          className="glow-text mt-16 inline-block font-hand text-7xl"
        >
          Kaleb
        </motion.p>
      </div>
    </section>
  )
}
