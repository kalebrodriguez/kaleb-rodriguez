import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
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

// Option C: Kaleb as the cover story of a print magazine. A full-bleed cover
// that pulls back as you scroll, a contents page, an editor's letter, the NRCP
// review as the feature article, a sideways-scrolling projects spread, and a
// masthead for experience.

const ease = [0.22, 1, 0.36, 1] as const
const COVER = `${import.meta.env.BASE_URL}kaleb-fountain.jpg`

// Function-mapped scroll values (keeps opacity off ScrollTimeline, which
// mis-maps pinned sections).
function useMap(v: MotionValue<number>, from: number[], to: number[]) {
  return useTransform(v, (x) => {
    if (x <= from[0]) return to[0]
    for (let i = 1; i < from.length; i++) {
      if (x <= from[i]) {
        const t = (x - from[i - 1]) / (from[i] - from[i - 1])
        return to[i - 1] + (to[i] - to[i - 1]) * t
      }
    }
    return to[to.length - 1]
  })
}

function Rise({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`min-w-0 ${className ?? ''}`}
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionHead({ page, kicker, title }: { page: string; kicker: string; title: ReactNode }) {
  return (
    <div className="mb-12 border-t-[3px] border-rule pt-4 sm:mb-16">
      <div className="flex items-baseline justify-between">
        <span className="kicker text-red">{kicker}</span>
        <span className="kicker text-ink-soft">p. {page}</span>
      </div>
      <h2 className="serif mt-5 text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">{title}</h2>
    </div>
  )
}

export function Magazine() {
  return (
    <div className="grain">
      <Cover />
      <main>
        <Contents />
        <Letter />
        <Feature />
        <Spread />
        <Masthead />
        <IndexPage />
        <Briefs />
        <BackCover />
      </main>
    </div>
  )
}

/* ---------- Cover ---------- */

function Cover() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useMap(p, [0, 1], [1, 0.82])
  const radius = useMap(p, [0, 1], [0, 28])
  const lines = useMap(p, [0, 0.5], [1, 0])
  const photoScale = useMap(p, [0, 1], [1.08, 1])

  const lineup = [
    { k: 'Cover story', t: 'One Market: a million trading agents in one world, built at MHacks' },
    { k: 'Research', t: 'Inside Parkinson’s: the mitophagy review he presented at Penn' },
    { k: 'Profile', t: 'Senior year, from MIT CSAIL to the USF wet lab' },
  ]

  return (
    <header ref={ref} id="top" className={reduce ? 'relative' : 'relative h-[190vh]'}>
      <div className={reduce ? 'relative h-[100svh]' : 'sticky top-0 h-[100svh] overflow-hidden'}>
        <motion.div
          className="absolute inset-0 overflow-hidden bg-ink"
          style={reduce ? undefined : { scale, borderRadius: radius }}
        >
          <motion.img
            src={COVER}
            alt={profile.photo.alt}
            className="absolute inset-0 h-full w-full object-cover object-[50%_62%]"
            style={reduce ? undefined : { scale: photoScale }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-ink/70" />

          {/* Masthead */}
          <div className="absolute inset-x-0 top-0 px-4 pt-4 sm:px-8 sm:pt-6">
            <div className="flex items-baseline justify-between text-cream">
              <span className="kicker">Issue 01 · Fall 2026</span>
              <span className="kicker">Tampa, FL</span>
            </div>
            <h1
              className="serif mt-1 select-none text-center font-black uppercase leading-[0.8] text-red"
              style={{ fontSize: 'clamp(4.5rem, 22vw, 22rem)', letterSpacing: '-0.04em' }}
            >
              Kaleb
            </h1>
          </div>

          {/* Cover lines */}
          <motion.ul
            className="absolute bottom-24 left-4 max-w-[17rem] space-y-5 text-cream sm:bottom-16 sm:left-8 sm:max-w-xs"
            style={reduce ? undefined : { opacity: lines }}
          >
            {lineup.map((l) => (
              <li key={l.k}>
                <span className="kicker text-red">{l.k}</span>
                <p className="serif mt-1 text-xl font-semibold leading-tight sm:text-2xl">{l.t}</p>
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="absolute bottom-6 right-4 text-right text-cream sm:bottom-16 sm:right-8"
            style={reduce ? undefined : { opacity: lines }}
          >
            <p className="serif text-3xl italic sm:text-5xl">Kaleb Rodriguez</p>
            <p className="kicker mt-2">Researcher · Builder · Senior</p>
            <div aria-hidden="true" className="ml-auto mt-4 hidden h-10 w-32 bg-[repeating-linear-gradient(90deg,var(--color-cream)_0_2px,transparent_2px_4px,var(--color-cream)_4px_5px,transparent_5px_8px)] sm:block" />
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}

/* ---------- Contents ---------- */

function Contents() {
  const items = [
    { n: '04', t: 'From the editor', d: 'Who he is, in his own words', href: '#letter' },
    { n: '08', t: 'The feature', d: 'Nanoparticles, mitophagy & Parkinson’s', href: '#feature' },
    { n: '16', t: 'The projects spread', d: 'Eight things he built and shipped', href: '#projects' },
    { n: '28', t: 'Masthead', d: 'Labs, programs & leadership', href: '#masthead' },
    { n: '34', t: 'The index', d: 'Skills, awards & certifications', href: '#index' },
    { n: '38', t: 'Briefs', d: 'The latest news', href: '#briefs' },
  ]
  return (
    <section aria-labelledby="contents-h" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Rise>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <h2 id="contents-h" className="serif text-6xl font-bold italic leading-none sm:text-8xl">
            In this
            <br />
            issue
          </h2>
          <ol className="divide-y divide-ink/15 border-y-[3px] border-rule">
            {items.map((i) => (
              <li key={i.n}>
                <a href={i.href} className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 py-5">
                  <span className="serif text-3xl font-bold text-red">{i.n}</span>
                  <span>
                    <span className="serif block text-2xl font-semibold transition-colors group-hover:text-red sm:text-3xl">{i.t}</span>
                    <span className="mt-1 block text-ink-soft">{i.d}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </Rise>
    </section>
  )
}

/* ---------- Editor's letter (About) ---------- */

function Letter() {
  return (
    <section id="letter" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead page="04" kicker="From the editor" title={<>Between the lab bench <em className="text-red">and the build.</em></>} />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <Rise>
          <figure>
            <img src={profile.photo.src} alt={profile.photo.alt} loading="lazy" className="aspect-[4/5] w-full object-cover grayscale-[15%]" />
            <figcaption className="kicker mt-3 text-ink-soft">Kaleb Rodriguez, 2026</figcaption>
          </figure>
        </Rise>
        <Rise delay={0.1}>
          <p className="dropcap serif text-2xl leading-[1.55]">{profile.intro}</p>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/20 pt-6">
            {education.map((e) => (
              <div key={e.org}>
                <dt className="kicker text-red">{e.period}</dt>
                <dd className="mt-1 font-semibold">{e.org}</dd>
                <dd className="text-sm text-ink-soft">{e.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="serif mt-10 text-4xl italic">— Kaleb</p>
        </Rise>
      </div>
    </section>
  )
}

/* ---------- Feature (NRCP review) ---------- */

function Feature() {
  const lead = research.find((r) => r.image) ?? research[0]
  const rest = research.filter((r) => r.id !== lead.id)
  return (
    <section id="feature" className="scroll-mt-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHead page="08" kicker="The feature" title={<>Fixing the cell’s <em className="text-red">cleanup crew.</em></>} />
      </div>
      {lead.image && (
        <Rise>
          <figure className="relative mx-auto max-w-7xl px-0 sm:px-8">
            <img src={lead.image.src} alt={lead.image.alt} loading="lazy" className="max-h-[85svh] w-full object-cover object-[45%_40%]" />
            <figcaption className="kicker mx-5 mt-3 text-ink-soft sm:mx-0">
              Presenting at the National Research Conference at Penn, 2026
            </figcaption>
          </figure>
        </Rise>
      )}
      <div className="mx-auto mt-14 grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.5fr_1fr]">
        <Rise>
          <p className="kicker text-red">{lead.meta}</p>
          <h3 className="serif mt-3 text-3xl font-bold leading-tight sm:text-4xl">{lead.title}</h3>
          <p className="dropcap mt-6 text-lg leading-[1.8]">{lead.plain}</p>
          <p className="mt-5 text-lg leading-[1.8]">{lead.detail}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {lead.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`kicker px-5 py-3 transition-colors ${i === 0 ? 'bg-red text-cream hover:bg-ink' : 'border-2 border-ink hover:bg-ink hover:text-cream'}`}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </Rise>
        <Rise delay={0.15}>
          <blockquote className="serif border-y-[3px] border-rule py-8 text-3xl font-semibold italic leading-snug">
            “Could nanoparticles restore the quality-control system that fails in Parkinson’s?”
          </blockquote>
          <ul className="mt-8 space-y-3">
            {lead.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-ink-soft">
                <span className="text-red">■</span>
                {h}
              </li>
            ))}
          </ul>
        </Rise>
      </div>

      <div className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <h3 className="kicker border-t-[3px] border-rule pt-4 text-red">Also in research</h3>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {rest.map((r, i) => (
            <Rise key={r.id} delay={(i % 2) * 0.08}>
              <article className="border-t border-ink/20 pt-5">
                <div className="flex items-center justify-between">
                  <span className="kicker text-ink-soft">{r.org}</span>
                  <span className="kicker text-red">{statusLabels[r.status]}</span>
                </div>
                <h4 className="serif mt-3 text-2xl font-bold leading-tight">{r.title}</h4>
                <p className="mt-3 leading-relaxed text-ink-soft">{r.plain}</p>
                {r.link && (
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="kicker mt-4 inline-block underline decoration-red decoration-2 underline-offset-4">
                    {r.linkLabel ?? 'Read'} ↗
                  </a>
                )}
              </article>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Projects spread (horizontal scroll) ---------- */

function Spread() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Shift the track left by its overflow as you scroll down.
  const x = useTransform(scrollYProgress, (v) => {
    const el = track.current
    if (!el) return 0
    const overflow = el.scrollWidth - window.innerWidth
    return -Math.max(0, overflow) * v
  })

  const cards = projects.map((p, i) => (
    <article
      key={p.id}
      className={`flex w-[82vw] shrink-0 flex-col justify-between border-[3px] border-rule p-6 sm:w-[30rem] sm:p-8 ${i % 3 === 0 ? 'bg-ink text-cream' : 'bg-cream'}`}
    >
      <div>
        <div className="flex items-baseline justify-between">
          <span className="serif text-7xl font-black text-red">{String(i + 1).padStart(2, '0')}</span>
          <span className="kicker">{statusLabels[p.status]}</span>
        </div>
        <h3 className="serif mt-6 text-4xl font-bold leading-none sm:text-5xl">{p.name}</h3>
        <p className="kicker mt-3 opacity-70">{p.kind}</p>
        <p className="mt-5 text-lg leading-relaxed opacity-90">{p.summary}</p>
      </div>
      <div className="mt-8 flex items-end justify-between gap-4 border-t border-current/30 pt-4">
        <span className="kicker opacity-70">{p.stack.slice(0, 3).join(' · ')}</span>
        <a href={p.link} target="_blank" rel="noopener noreferrer" className="kicker shrink-0 text-red underline underline-offset-4">
          Open ↗
        </a>
      </div>
    </article>
  ))

  if (reduce) {
    return (
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-20 sm:px-8">
        <SectionHead page="16" kicker="The projects spread" title={<>Things he <em className="text-red">built.</em></>} />
        <div className="grid gap-6 md:grid-cols-2">{cards}</div>
      </section>
    )
  }

  return (
    <section id="projects" ref={ref} className="relative h-[420vh] scroll-mt-0">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="flex items-baseline justify-between border-t-[3px] border-rule pt-4">
            <span className="kicker text-red">The projects spread</span>
            <span className="kicker text-ink-soft">p. 16 · scroll →</span>
          </div>
          <h2 className="serif mt-4 text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            Things he <em className="text-red">built.</em>
          </h2>
        </div>
        <motion.div ref={track} style={{ x }} className="mt-10 flex gap-6 px-5 sm:px-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          {cards}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Masthead (experience) ---------- */

function Credits({ title, items }: { title: string; items: ExperienceItem[] }) {
  return (
    <div>
      <h3 className="kicker border-b-[3px] border-rule pb-3 text-red">{title}</h3>
      <dl>
        {items.map((e) => (
          <div key={e.id} className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-ink/15 py-4">
            <dt className="serif text-xl font-bold leading-snug">{e.org}</dt>
            <dd className="kicker self-start pt-1.5 text-ink-soft">{e.period.replace(' — ', '–')}</dd>
            <dd className="col-span-2 mt-1 italic text-ink-soft">{e.role}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function Masthead() {
  return (
    <section id="masthead" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead page="28" kicker="Masthead" title={<>Where he’s <em className="text-red">worked.</em></>} />
      <div className="grid gap-14 lg:grid-cols-2">
        <Rise>
          <Credits title="Research & work" items={experience} />
        </Rise>
        <Rise delay={0.1}>
          <Credits title="Leadership & service" items={leadership} />
        </Rise>
      </div>
    </section>
  )
}

/* ---------- Index (skills) ---------- */

function IndexPage() {
  return (
    <section id="index" className="scroll-mt-6 bg-ink py-20 text-cream sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-14 border-t-[3px] border-cream pt-4">
          <div className="flex items-baseline justify-between">
            <span className="kicker text-red">The index</span>
            <span className="kicker opacity-60">p. 34</span>
          </div>
          <h2 className="serif mt-5 text-5xl font-bold leading-[0.95] sm:text-7xl">
            What he <em className="text-red">knows.</em>
          </h2>
        </div>
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <Rise>
            <dl className="grid gap-8 sm:grid-cols-2">
              {Object.entries(skills).map(([g, list]) => (
                <div key={g}>
                  <dt className="kicker text-red">{g}</dt>
                  <dd className="serif mt-2 text-2xl leading-snug">{list.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </Rise>
          <Rise delay={0.1}>
            <h3 className="kicker text-red">Honors</h3>
            <ol className="mt-3 space-y-3">
              {awards.map((a, i) => (
                <li key={a} className="grid grid-cols-[2rem_1fr] gap-2 leading-snug">
                  <span className="serif text-red">{i + 1}.</span>
                  {a}
                </li>
              ))}
            </ol>
            <h3 className="kicker mt-10 text-red">Certified</h3>
            <p className="mt-3 text-sm leading-relaxed opacity-70">{certifications.join(' · ')}</p>
          </Rise>
        </div>
      </div>
    </section>
  )
}

/* ---------- Briefs (latest) ---------- */

function Briefs() {
  return (
    <section id="briefs" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHead page="38" kicker="Briefs" title={<>The <em className="text-red">latest.</em></>} />
      <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
        {updates.map((u, i) => {
          const body = (
            <article className="group border-t-[3px] border-rule pt-4">
              <p className="kicker text-red">
                {u.source} · {u.date}
              </p>
              <h3 className="serif mt-3 text-2xl font-bold leading-snug transition-colors group-hover:text-red">{u.title}</h3>
            </article>
          )
          return (
            <Rise key={u.id} delay={(i % 3) * 0.07}>
              {u.href ? (
                <a href={u.href} target="_blank" rel="noopener noreferrer">
                  {body}
                </a>
              ) : (
                body
              )}
            </Rise>
          )
        })}
      </div>
    </section>
  )
}

/* ---------- Back cover (contact) ---------- */

function BackCover() {
  return (
    <section id="contact" className="bg-red px-5 py-24 text-cream sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <p className="kicker">Back cover</p>
        <h2 className="serif mt-6 text-6xl font-black leading-[0.9] sm:text-[8rem]">
          Write to <em>the editor.</em>
        </h2>
        <p className="mt-8 max-w-lg text-xl leading-relaxed opacity-90">
          Open to research, collaboration, and mentorship in neuroscience, bioinformatics, and health tech.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <a href={`mailto:${profile.email}`} className="kicker bg-cream px-6 py-4 text-red transition-colors hover:bg-ink hover:text-cream">
            {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="kicker border-2 border-cream px-6 py-4 transition-colors hover:bg-cream hover:text-red">
            LinkedIn ↗
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="kicker border-2 border-cream px-6 py-4 transition-colors hover:bg-cream hover:text-red">
            GitHub ↗
          </a>
        </div>
        <p className="kicker mt-24 opacity-70">Kaleb Rodriguez · Issue 01 · Fall 2026 · Tampa, FL</p>
      </div>
    </section>
  )
}
