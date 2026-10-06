import { useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  awards,
  certifications,
  education,
  experience,
  leadership,
  profile,
  projects,
  research,
  skills,
  statusLabels,
  updates,
  type ExperienceItem,
} from '../../data/content'

// Option B: the site is Kaleb's lab notebook. Graph paper, taped polaroids,
// fountain-pen headings, pencil annotations, rubber stamps and sticky tabs.

const ease = [0.22, 1, 0.36, 1] as const

const tabs = [
  { id: 'about', label: 'About', color: 'var(--color-sticky)' },
  { id: 'research', label: 'Research', color: 'var(--color-sticky-pink)' },
  { id: 'projects', label: 'Projects', color: 'var(--color-sticky-blue)' },
  { id: 'log', label: 'Lab log', color: 'var(--color-sticky-green)' },
  { id: 'skills', label: 'Skills', color: 'var(--color-sticky)' },
  { id: 'latest', label: 'Latest', color: 'var(--color-sticky-pink)' },
  { id: 'contact', label: 'Contact', color: 'var(--color-sticky-blue)' },
]

const stampColor: Record<string, string> = {
  published: 'var(--color-red)',
  completed: 'var(--color-blue)',
  ongoing: '#2f7d4f',
  active: '#2f7d4f',
  shipped: 'var(--color-red)',
  prototype: 'var(--color-pencil)',
}

/* ---------- small hand-made pieces ---------- */

function PenUnderline({ className = '', color = 'var(--color-blue)' }: { className?: string; color?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  return (
    <svg ref={ref} viewBox="0 0 300 20" preserveAspectRatio="none" className={className} aria-hidden="true">
      <motion.path
        d="M3,13 C60,6 120,16 180,9 S270,7 297,11"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.9, ease }}
      />
    </svg>
  )
}

function Highlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <span ref={ref} className={`highlight ${inView ? 'on' : ''}`}>
      {children}
    </span>
  )
}

function Scribble({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <path
        d="M4,8 C30,4 70,10 92,34 M92,34 L80,32 M92,34 L90,22"
        fill="none"
        stroke="var(--color-pencil)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Drop({ children, rotate = 0, delay = 0, className = '' }: { children: ReactNode; rotate?: number; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30, rotate: rotate - 6 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease, delay }}
      style={reduce ? { rotate } : undefined}
    >
      {children}
    </motion.div>
  )
}

function Stamp({ status, rotate = -8 }: { status: string; rotate?: number }) {
  return (
    <span className="stamp text-xs" style={{ color: stampColor[status] ?? 'var(--color-pencil)', transform: `rotate(${rotate}deg)` }}>
      {statusLabels[status] ?? status}
    </span>
  )
}

function Entry({ id, n, title, note, children }: { id: string; n: number; title: string; note?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="relative scroll-mt-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:pl-24 sm:pr-10">
        <header className="mb-12">
          <div className="flex flex-wrap items-baseline gap-x-4 font-mono text-xs uppercase tracking-[0.18em] text-pencil">
            <span>Entry {String(n).padStart(2, '0')}</span>
            {note && <span className="hand text-xl normal-case tracking-normal text-blue">{note}</span>}
          </div>
          <h2 id={`${id}-h`} className="mt-2 text-5xl font-semibold tracking-tight sm:text-6xl" style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}>
            {title}
          </h2>
          <PenUnderline className="mt-1 h-4 w-56" />
        </header>
        {children}
      </div>
    </section>
  )
}

/* ---------- page ---------- */

export function Notebook() {
  return (
    <>
      {/* red margin line */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 left-12 z-0 hidden w-px bg-margin sm:block" />
      <Tabs />
      <main className="relative z-10">
        <Cover />
        <About />
        <Research />
        <Projects />
        <Log />
        <Skills />
        <Latest />
        <Contact />
      </main>
      <footer className="relative z-10 mx-auto max-w-5xl px-5 pb-10 font-mono text-xs uppercase tracking-[0.18em] text-pencil sm:pl-24">
        Kaleb Rodriguez · Lab notebook, vol. 1 · Tampa, FL
      </footer>
    </>
  )
}

function Tabs() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <nav aria-label="Sections" className="fixed right-0 top-24 z-40 hidden flex-col gap-2 lg:flex">
        {tabs.map((t, i) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className="sticky-note hand block translate-x-6 rounded-l-md py-1.5 pl-4 pr-10 text-xl transition-transform hover:translate-x-1"
            style={{ background: t.color, rotate: `${(i % 2 ? 1 : -1) * 0.8}deg` }}
          >
            {t.label}
          </a>
        ))}
      </nav>
      <div className="fixed right-4 top-4 z-40 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="nb-menu"
          className="sticky-note hand rounded-md bg-sticky px-4 py-1.5 text-xl"
        >
          {open ? 'close' : 'contents'}
        </button>
        {open && (
          <ul id="nb-menu" className="sticky-note mt-2 rounded-md bg-sticky px-5 py-3">
            {tabs.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} onClick={() => setOpen(false)} className="hand block py-1 text-2xl">
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

function Cover() {
  const reduce = useReducedMotion()
  const rise = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease, delay: d } }
  return (
    <header id="top" className="relative">
      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-5 pb-16 pt-24 sm:pl-24 sm:pr-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.p {...rise(0)} className="font-mono text-xs uppercase tracking-[0.2em] text-pencil">
            Lab notebook · Vol. 01 · Property of
          </motion.p>
          <motion.h1
            {...rise(0.1)}
            className="mt-4 text-[17vw] font-semibold leading-[0.85] tracking-tight sm:text-8xl lg:text-[7.5rem]"
            style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1, 'opsz' 144" }}
          >
            Kaleb
            <br />
            Rodriguez
          </motion.h1>
          <PenUnderline className="mt-2 h-5 w-72" color="var(--color-red)" />
          <motion.p {...rise(0.25)} className="mt-6 max-w-lg text-xl leading-relaxed">
            High-school senior. I study <Highlight>neurodegeneration</Highlight> in the lab and build{' '}
            <Highlight>software people actually use</Highlight>.
          </motion.p>
          <motion.p {...rise(0.35)} className="hand mt-4 text-2xl text-blue">
            Tampa, FL · Class of 2027 · USF / HCC / UF dual enrollment
          </motion.p>
          <motion.div {...rise(0.45)} className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
            <a href="#research" className="rounded-md border-2 border-ink bg-ink px-4 py-2.5 text-paper transition-transform hover:-rotate-1">
              Read the research →
            </a>
            <a href="#contact" className="rounded-md border-2 border-ink px-4 py-2.5 transition-transform hover:rotate-1">
              Get in touch
            </a>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <Drop rotate={3} delay={0.3}>
            <figure className="polaroid relative">
              <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
              <img src={profile.photo.src} alt={profile.photo.alt} className="aspect-square w-full object-cover" />
              <figcaption className="hand absolute inset-x-0 bottom-2 text-center text-2xl">me ✦</figcaption>
            </figure>
          </Drop>
          <div className="pointer-events-none absolute -left-28 top-6 hidden xl:block">
            <span className="hand block -rotate-6 text-2xl text-pencil">that’s me</span>
            <Scribble className="ml-10 h-12 w-24" />
          </div>
        </div>
      </div>
    </header>
  )
}

function About() {
  return (
    <Entry id="about" n={1} title="About" note="the short version">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <p className="text-xl leading-[1.75] sm:text-2xl sm:leading-[1.7]">{profile.intro}</p>
        <div className="index-card relative rounded-sm px-6 pb-6 pt-3" style={{ rotate: '1.2deg' }}>
          <h3 className="hand text-3xl leading-[44px]">Education</h3>
          <ul className="mt-1 text-base">
            {education.map((e) => (
              <li key={e.org} className="leading-[28px]">
                <span className="font-semibold">{e.org}</span>
                <span className="block font-mono text-xs leading-[28px] text-pencil">{e.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Entry>
  )
}

function Research() {
  return (
    <Entry id="research" n={2} title="Research" note="experiments, reviews & posters">
      <ol className="space-y-16">
        {research.map((r, i) => (
          <li key={r.id} className="relative grid gap-8 lg:grid-cols-[1fr_auto]">
            <Drop rotate={0} delay={0.05}>
              <article>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-pencil">
                    Exp. {String(i + 1).padStart(2, '0')} · {r.org}
                  </span>
                  <Stamp status={r.status} rotate={i % 2 ? 6 : -7} />
                </div>
                <h3 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{r.title}</h3>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed">{r.plain}</p>
                <ul className="hand mt-4 space-y-0.5 text-2xl text-blue">
                  {r.highlights.slice(0, 3).map((h) => (
                    <li key={h}>– {h}</li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
                  {r.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="underline decoration-red decoration-2 underline-offset-4 hover:text-red">
                      {l.label} ↗
                    </a>
                  ))}
                  {r.meta && <span className="text-pencil">{r.meta}</span>}
                </div>
              </article>
            </Drop>
            {r.image && (
              <Drop rotate={-3} delay={0.2} className="mx-auto w-64 lg:w-72">
                <figure className="polaroid relative">
                  <span className="tape -top-3 left-6 rotate-[-12deg]" />
                  <span className="tape -top-3 right-4 rotate-[10deg]" />
                  <img src={r.image.src} alt={r.image.alt} loading="lazy" className="aspect-[4/5] w-full object-cover object-[45%_40%]" />
                  <figcaption className="hand absolute inset-x-0 bottom-2 text-center text-2xl">presenting @ Penn!</figcaption>
                </figure>
              </Drop>
            )}
          </li>
        ))}
      </ol>
    </Entry>
  )
}

function Projects() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <Entry id="projects" n={3} title="Projects" note="things I built & shipped">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => {
          const rot = [-1.6, 1.2, -0.6, 1.8, -1.2, 0.8][i % 6]
          const isOpen = open === p.id
          return (
            <Drop key={p.id} rotate={rot} delay={(i % 3) * 0.06}>
              <article className="index-card group relative rounded-sm px-5 pb-5 pt-2 transition-transform duration-300 hover:-translate-y-1 hover:rotate-0">
                <div className="flex items-center justify-between gap-2" style={{ height: 44 }}>
                  <h3 className="hand truncate text-3xl font-bold">{p.name}</h3>
                  <Stamp status={p.status} rotate={rot * 3} />
                </div>
                <p className="font-mono text-[0.7rem] uppercase leading-[28px] tracking-wider text-pencil">{p.kind}</p>
                <p className="text-[0.98rem] leading-[28px]">{p.summary}</p>
                {isOpen && (
                  <ul className="hand mt-1 text-xl leading-[28px] text-blue">
                    {p.highlights.map((h) => (
                      <li key={h}>✓ {h}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-2 flex items-center justify-between font-mono text-xs leading-[28px]">
                  <button type="button" onClick={() => setOpen(isOpen ? null : p.id)} aria-expanded={isOpen} className="underline underline-offset-4">
                    {isOpen ? 'less' : 'notes'}
                  </button>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="font-medium text-red hover:underline">
                    open ↗
                  </a>
                </div>
              </article>
            </Drop>
          )
        })}
      </div>
    </Entry>
  )
}

function LogTable({ title, items }: { title: string; items: ExperienceItem[] }) {
  return (
    <div>
      <h3 className="hand mb-3 text-3xl text-blue">{title}</h3>
      <div className="overflow-hidden rounded-sm border-2 border-ink bg-[#fffdf7]">
        <table className="w-full text-left">
          <thead className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-pencil">
            <tr className="border-b-2 border-ink">
              <th scope="col" className="px-4 py-2 font-medium">When</th>
              <th scope="col" className="px-4 py-2 font-medium">Where · role</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.id} className="border-b border-grid align-top last:border-0">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-pencil">{e.period.replace(' — ', '–')}</td>
                <td className="px-4 py-3">
                  <span className="font-semibold">{e.org}</span>
                  <span className="block text-sm text-pencil">{e.role}</span>
                  <span className="hand block text-xl leading-snug text-blue">{e.note}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Log() {
  return (
    <Entry id="log" n={4} title="Lab log" note="where I’ve worked & led">
      <div className="grid gap-12 lg:grid-cols-2">
        <LogTable title="Research & work" items={experience} />
        <LogTable title="Leadership & service" items={leadership} />
      </div>
    </Entry>
  )
}

function Skills() {
  return (
    <Entry id="skills" n={5} title="Toolkit" note="skills, awards, certs">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <dl className="space-y-6">
          {Object.entries(skills).map(([group, list]) => (
            <div key={group}>
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-pencil">{group}</dt>
              <dd className="mt-1 text-2xl leading-relaxed">
                {list.map((s, i) => (
                  <span key={s}>
                    <Highlight>{s}</Highlight>
                    {i < list.length - 1 && <span className="text-pencil">, </span>}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
        <div className="space-y-10">
          <div>
            <h3 className="hand text-3xl text-red">Gold stars ★</h3>
            <ul className="mt-2 space-y-2 text-[1.02rem] leading-snug">
              {awards.map((a) => (
                <li key={a} className="flex gap-2">
                  <span aria-hidden="true" className="text-[#d4a017]">★</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="hand text-3xl text-blue">Certified in…</h3>
            <p className="mt-2 font-mono text-sm leading-relaxed text-pencil">{certifications.join(' · ')}</p>
          </div>
        </div>
      </div>
    </Entry>
  )
}

function Latest() {
  const colors = ['var(--color-sticky)', 'var(--color-sticky-pink)', 'var(--color-sticky-blue)', 'var(--color-sticky-green)']
  return (
    <Entry id="latest" n={6} title="Latest" note="stuck to the fridge">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {updates.map((u, i) => {
          const rot = [-2.5, 2, -1, 3, -3, 1.5][i % 6]
          const note = (
            <div className="sticky-note relative min-h-48 p-5" style={{ background: colors[i % 4] }}>
              <div className="font-mono text-xs uppercase tracking-[0.15em] text-ink/60">
                {u.date} · {u.source}
              </div>
              <p className="hand mt-2 text-[1.65rem] leading-[1.15]">{u.title}</p>
            </div>
          )
          return (
            <Drop key={u.id} rotate={rot} delay={(i % 3) * 0.06}>
              {u.href ? (
                <a href={u.href} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:-translate-y-1">
                  {note}
                </a>
              ) : (
                note
              )}
            </Drop>
          )
        })}
      </div>
    </Entry>
  )
}

function Contact() {
  return (
    <Entry id="contact" n={7} title="Contact" note="P.S.">
      <div className="max-w-2xl">
        <p className="hand text-4xl leading-tight text-blue sm:text-5xl">
          Working on something in neuroscience, bioinformatics, or health tech? I’d love to hear about it.
        </p>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-base">
          <a href={`mailto:${profile.email}`} className="underline decoration-red decoration-2 underline-offset-4 hover:text-red">
            {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="underline decoration-red decoration-2 underline-offset-4 hover:text-red">
            LinkedIn ↗
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="underline decoration-red decoration-2 underline-offset-4 hover:text-red">
            GitHub ↗
          </a>
        </div>
        <p className="hand mt-14 text-5xl">— Kaleb</p>
      </div>
    </Entry>
  )
}
