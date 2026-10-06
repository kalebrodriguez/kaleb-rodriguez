import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion'
import {
  awards,
  experience,
  leadership,
  profile,
  projects,
  research,
  skills,
  statusLabels,
  updates,
  type ExperienceItem,
  type Project,
} from '../../data/content'

// Option E, "Kinetic": type-driven and interactive, in the spirit of
// award-winning studio sites. A name that stretches under the cursor, a photo
// that grows to full-bleed on scroll, a velocity-reactive marquee, counters,
// a hover-preview project index, and a giant email link.

const ease = [0.22, 1, 0.36, 1] as const
const PORTRAIT = `${import.meta.env.BASE_URL}kaleb-fountain.jpg`

function useMap(v: MotionValue<number>, from: number[], to: number[]) {
  return useTransform(v, (x) => {
    if (x <= from[0]) return to[0]
    for (let i = 1; i < from.length; i++) {
      if (x <= from[i]) return to[i - 1] + ((to[i] - to[i - 1]) * (x - from[i - 1])) / (from[i] - from[i - 1])
    }
    return to[to.length - 1]
  })
}

function Up({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`min-w-0 ${className ?? ''}`}
      initial={reduce ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="label flex items-center gap-4 border-t-2 border-coal pt-3">
      <span className="text-cobalt">{n}</span>
      <span>{children}</span>
    </div>
  )
}

export function Kinetic() {
  return (
    <>
      <TopBar />
      <main className="overflow-x-clip">
        <Hero />
        <Marquee />
        <Numbers />
        <WorkIndex />
        <Research />
        <Experience />
        <Toolkit />
        <Latest />
        <Contact />
      </main>
    </>
  )
}

/* ---------------- Top bar ---------------- */

function useTampaTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 30_000)
    return () => clearInterval(id)
  }, [])
  return t
}

function TopBar() {
  const time = useTampaTime()
  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-bone">
      <nav className="label flex h-14 items-center justify-between px-4 sm:px-8" aria-label="Primary">
        <a href="#top">Kaleb Rodriguez</a>
        <ul className="hidden gap-8 md:flex">
          <li><a href="#work" className="hover:underline">Work</a></li>
          <li><a href="#research" className="hover:underline">Research</a></li>
          <li><a href="#experience" className="hover:underline">Experience</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
        <span className="tabular-nums">Tampa {time}</span>
      </nav>
    </header>
  )
}

/* ---------------- Hero ---------------- */

// Each letter's width axis swells near the cursor and the rest squeeze to
// compensate, so the line stays the same overall length.
function StretchLine({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const root = ref.current
    if (!root) return
    const letters = Array.from(root.querySelectorAll<HTMLSpanElement>('[data-l]'))
    const cur = letters.map(() => 100)
    let target = letters.map(() => 100)
    let frame = 0
    const onMove = (e: PointerEvent) => {
      const raw = letters.map((el) => {
        const r = el.getBoundingClientRect()
        const d = (e.clientX - (r.left + r.width / 2)) / window.innerWidth
        const dy = Math.abs(e.clientY - (r.top + r.height / 2)) / window.innerHeight
        return 70 + 80 * Math.exp(-(d * d) / 0.012) * Math.max(0, 1 - dy * 1.2)
      })
      const mean = raw.reduce((a, b) => a + b, 0) / raw.length
      target = raw.map((v) => Math.min(125, Math.max(62, (v / mean) * 100)))
    }
    const onLeave = () => {
      target = letters.map(() => 100)
    }
    const loop = () => {
      letters.forEach((el, i) => {
        cur[i] += (target[i] - cur[i]) * 0.12
        el.style.fontVariationSettings = `'wdth' ${cur[i].toFixed(1)}`
      })
      frame = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce])

  return (
    <span ref={ref} aria-hidden="true" className={`flex justify-between whitespace-nowrap ${className ?? ''}`}>
      {text.split('').map((c, i) => (
        <span key={i} data-l className="inline-block">
          {c}
        </span>
      ))}
    </span>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const clip = useMap(p, [0, 0.6], [100, 0]) // 100 = small window, 0 = full-bleed
  const clipPath = useTransform(clip, (c) => {
    const x = 36 * (c / 100)
    const y = 26 * (c / 100)
    return `inset(${y}% ${x}% ${y}% ${x}% round ${(c / 100) * 18}px)`
  })
  const imgScale = useMap(p, [0, 0.6], [1.25, 1])
  const top = useMap(p, [0, 0.5], [0, -260])
  const bottom = useMap(p, [0, 0.5], [0, 260])
  const nameO = useMap(p, [0.1, 0.45], [1, 0])
  const capO = useMap(p, [0.62, 0.8], [0, 1])
  const capY = useMap(p, [0.62, 0.85], [40, 0])

  return (
    <section id="top" ref={ref} className={reduce ? 'relative' : 'relative h-[260vh]'}>
      <h1 className="sr-only">Kaleb Rodriguez</h1>
      <div className={reduce ? 'relative h-[100svh] overflow-hidden' : 'sticky top-0 h-[100svh] overflow-hidden'}>
        <motion.div className="absolute inset-0" style={reduce ? undefined : { clipPath }}>
          <motion.img
            src={PORTRAIT}
            alt={profile.photo.alt}
            className="h-full w-full object-cover object-[50%_60%]"
            style={reduce ? undefined : { scale: imgScale }}
          />
          <div className="absolute inset-0 bg-coal/25" />
        </motion.div>

        <div className="pointer-events-none relative flex h-full flex-col justify-between px-4 pb-6 pt-20 sm:px-8 sm:pb-8">
          <motion.div style={reduce ? undefined : { y: top, opacity: nameO }}>
            <StretchLine text="KALEB" className="text-[24vw] font-black leading-[0.8] tracking-tight sm:text-[19vw]" />
          </motion.div>

          <motion.div style={reduce ? undefined : { opacity: nameO }} className="label hidden justify-between sm:flex">
            <span>Neuroscience × Software</span>
            <span>Senior · Class of 2027 · Scroll ↓</span>
          </motion.div>

          <motion.div style={reduce ? undefined : { y: bottom, opacity: nameO }}>
            <StretchLine text="RODRIGUEZ" className="text-[13vw] font-black leading-[0.8] tracking-tight sm:text-[12.4vw]" />
          </motion.div>
        </div>

        <motion.div
          style={reduce ? { opacity: 0 } : { opacity: capO, y: capY }}
          className="absolute inset-x-0 bottom-0 px-4 pb-10 text-bone sm:px-8 sm:pb-14"
        >
          <p className="max-w-4xl text-4xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            I study neurodegeneration in the lab and build software people actually use.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- Marquee ---------------- */

function Marquee() {
  const { scrollY } = useScroll()
  const v = useVelocity(scrollY)
  const skew = useSpring(useTransform(v, [-3000, 0, 3000], [8, 0, -8]), { stiffness: 200, damping: 30 })
  const items = ['Researcher', 'Builder', 'Published at Penn', 'MHacks 2026', 'MIT CSAIL', 'USF Koria Lab', 'NASA GeneLab', '1st Place Amgen']
  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-6 text-5xl font-black uppercase tracking-tight sm:text-7xl">{t}</span>
          <span className="text-4xl sm:text-6xl" aria-hidden="true">✺</span>
        </span>
      ))}
    </span>
  )
  return (
    <section aria-label="Highlights" className="overflow-hidden bg-cobalt py-6 text-bone sm:py-8">
      <motion.div style={{ skewX: skew }}>
        <div className="flex w-max animate-[marquee_28s_linear_infinite]">
          {row}
          {row}
        </div>
      </motion.div>
    </section>
  )
}

/* ---------------- Numbers ---------------- */

function Counter({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const start = performance.now()
    let f = 0
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 1600)
      setN(Math.round(to * (1 - Math.pow(1 - k, 4))))
      if (k < 1) f = requestAnimationFrame(tick)
    }
    f = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(f)
  }, [inView, reduce, to])
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  )
}

function Numbers() {
  const stats = [
    { to: 1000000, label: 'Trading actors in One Market', note: 'MHacks 2026' },
    { to: research.length, label: 'Research works', note: 'Published, presented & ongoing' },
    { to: projects.length, label: 'Projects shipped or in progress', note: 'Web, iOS, ML' },
    { to: 85, prefix: '~', label: 'College credits', note: 'USF · HCC · UF' },
  ]
  return (
    <section aria-label="By the numbers" className="px-4 py-24 sm:px-8 sm:py-32">
      <SectionLabel n="01">By the numbers</SectionLabel>
      <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {stats.map((s, i) => (
          <Up key={s.label} delay={(i % 2) * 0.08}>
            <p className="wide text-6xl font-black leading-none tracking-tight sm:text-8xl">
              <Counter to={s.to} prefix={s.prefix} />
            </p>
            <p className="mt-3 text-xl font-semibold">{s.label}</p>
            <p className="label mt-1 text-smoke">{s.note}</p>
          </Up>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Work index (hover preview) ---------------- */

const swatch: Record<string, string> = {
  'one-market': '#2b3cff',
  neuropd: '#7a3cff',
  clearcredit: '#14a86b',
  digitaltwin: '#ff4f81',
  kora: '#0e0e0e',
  posture: '#ff7a1a',
  cramb: '#d9a400',
  medalert: '#e0303b',
}

function WorkIndex() {
  const [active, setActive] = useState<Project | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const card = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    let frame = 0
    const pos = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e: PointerEvent) => {
      pos.tx = e.clientX
      pos.ty = e.clientY
    }
    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.18
      pos.y += (pos.ty - pos.y) * 0.18
      if (card.current) card.current.style.transform = `translate(${pos.x + 24}px, ${pos.y - 120}px)`
      frame = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <section id="work" aria-labelledby="work-h" className="scroll-mt-14 px-4 pb-24 sm:px-8 sm:pb-32">
      <SectionLabel n="02">Selected work</SectionLabel>
      <h2 id="work-h" className="narrow mt-6 text-[18vw] font-black uppercase leading-[0.82] tracking-tight sm:text-[11vw]">
        Things I built
      </h2>
      <ul className="mt-10 border-t-2 border-coal" onPointerLeave={() => setActive(null)}>
        {projects.map((p, i) => {
          const open = openId === p.id
          return (
            <li key={p.id} className="border-b-2 border-coal">
              <div
                onPointerEnter={() => setActive(p)}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 transition-colors hover:bg-coal hover:text-bone sm:grid-cols-[4rem_1fr_16rem_8rem] sm:py-7"
              >
                <span className="label pl-1 text-smoke group-hover:text-bone/60">{String(i + 1).padStart(2, '0')}</span>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : p.id)}
                  aria-expanded={open}
                  className="text-left text-3xl font-black uppercase tracking-tight transition-[font-variation-settings] duration-500 group-hover:[font-variation-settings:'wdth'_125] sm:text-6xl"
                >
                  {p.name}
                </button>
                <span className="label hidden text-smoke group-hover:text-bone/70 sm:block">{p.kind}</span>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label pr-2 text-right group-hover:text-bone"
                  aria-label={`Open ${p.name}`}
                >
                  {statusLabels[p.status]} ↗
                </a>
              </div>
              {open && (
                <div className="grid gap-4 pb-6 pl-[2.5rem] sm:grid-cols-[1fr_1fr] sm:pl-[4rem]">
                  <p className="text-lg leading-relaxed">{p.summary}</p>
                  <ul className="label space-y-2 text-smoke">
                    {p.highlights.map((h) => (
                      <li key={h}>→ {h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          )
        })}
      </ul>

      {/* Floating preview that follows the cursor (pointer devices only) */}
      <div
        ref={card}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-80 [@media(hover:hover)]:block"
      >
        <div
          className="p-6 text-bone shadow-2xl transition-[opacity,transform] duration-300"
          style={{
            background: active ? swatch[active.id] ?? '#0e0e0e' : '#0e0e0e',
            opacity: active ? 1 : 0,
            transform: active ? 'scale(1) rotate(-2deg)' : 'scale(0.85) rotate(-6deg)',
          }}
        >
          {active && (
            <>
              <p className="label opacity-70">{active.kind}</p>
              <p className="mt-2 text-3xl font-black uppercase leading-none">{active.name}</p>
              <p className="mt-4 text-sm leading-relaxed opacity-90">{active.summary}</p>
              <p className="label mt-5 opacity-70">{active.stack.join(' / ')}</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Research (sticky split) ---------------- */

function Research() {
  const lead = research.find((r) => r.image)
  return (
    <section id="research" aria-labelledby="research-h" className="scroll-mt-14 bg-coal px-4 py-24 text-bone sm:px-8 sm:py-32">
      <div className="label flex items-center gap-4 border-t-2 border-bone pt-3">
        <span className="text-cobalt-soft">03</span>
        <span>Research</span>
      </div>
      <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 id="research-h" className="narrow text-[18vw] font-black uppercase leading-[0.82] tracking-tight lg:text-[8.5vw]">
            Brains, mostly
          </h2>
          {lead?.image && (
            <figure className="mt-8">
              <img src={lead.image.src} alt={lead.image.alt} loading="lazy" className="aspect-[4/5] w-full max-w-md object-cover object-[45%_40%]" />
              <figcaption className="label mt-3 text-bone/60">Presenting at Penn, 2026</figcaption>
            </figure>
          )}
        </div>
        <ol className="space-y-px">
          {research.map((r, i) => (
            <Up key={r.id} delay={0.04}>
              <li className="border-t border-bone/25 py-8">
                <div className="label flex flex-wrap gap-x-6 gap-y-1 text-bone/60">
                  <span className="text-cobalt-soft">R{String(i + 1).padStart(2, '0')}</span>
                  <span>{r.org}</span>
                  <span>{statusLabels[r.status]}</span>
                </div>
                <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-4xl">{r.title}</h3>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-bone/75">{r.plain}</p>
                {r.link && (
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="label mt-5 inline-block border-b-2 border-cobalt-soft pb-1 hover:text-cobalt-soft">
                    {r.linkLabel ?? 'Read'} ↗
                  </a>
                )}
              </li>
            </Up>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------- Experience ---------------- */

function ExpList({ title, items }: { title: string; items: ExperienceItem[] }) {
  return (
    <div>
      <p className="label mb-3 text-smoke">{title}</p>
      <ul className="border-t-2 border-coal">
        {items.map((e) => (
          <li key={e.id} className="group border-b border-coal/30 px-2 py-4 transition-colors hover:bg-cobalt hover:text-bone">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-xl font-bold leading-tight">{e.org}</span>
              <span className="label shrink-0 text-smoke group-hover:text-bone/70">{e.period.replace(' — ', '–')}</span>
            </div>
            <span className="text-smoke group-hover:text-bone/80">{e.role}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-h" className="scroll-mt-14 px-4 py-24 sm:px-8 sm:py-32">
      <SectionLabel n="04">Experience</SectionLabel>
      <h2 id="exp-h" className="narrow mt-6 text-[18vw] font-black uppercase leading-[0.82] tracking-tight sm:text-[11vw]">
        Where I’ve been
      </h2>
      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <Up>
          <ExpList title="Research & work" items={experience} />
        </Up>
        <Up delay={0.08}>
          <ExpList title="Leadership & service" items={leadership} />
        </Up>
      </div>
    </section>
  )
}

/* ---------------- Toolkit ---------------- */

function Toolkit() {
  const all = Object.values(skills).flat()
  return (
    <section aria-labelledby="tk-h" className="bg-bone-2 px-4 py-24 sm:px-8 sm:py-32">
      <SectionLabel n="05">Toolkit</SectionLabel>
      <h2 id="tk-h" className="sr-only">Skills and awards</h2>
      <Up>
        <p className="mt-10 text-3xl font-bold leading-[1.2] tracking-tight sm:text-5xl">
          {all.map((s, i) => (
            <span key={s}>
              <span className="cursor-default transition-colors hover:text-cobalt">{s}</span>
              {i < all.length - 1 && <span className="px-2 text-smoke/50">/</span>}
            </span>
          ))}
        </p>
      </Up>
      <div className="mt-16 grid gap-x-10 gap-y-4 md:grid-cols-2">
        {awards.map((a) => (
          <Up key={a}>
            <p className="flex gap-3 border-t border-coal/30 pt-4 text-lg">
              <span className="text-cobalt" aria-hidden="true">✺</span>
              {a}
            </p>
          </Up>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Latest ---------------- */

function Latest() {
  return (
    <section aria-labelledby="latest-h" className="px-4 py-24 sm:px-8 sm:py-32">
      <SectionLabel n="06">Latest</SectionLabel>
      <h2 id="latest-h" className="sr-only">Latest news</h2>
      <ul className="mt-8">
        {updates.map((u) => {
          const row = (
            <div className="group grid grid-cols-[5.5rem_1fr] gap-4 border-b border-coal/30 py-5 sm:grid-cols-[8rem_12rem_1fr_2rem]">
              <span className="label pt-1 text-smoke">{u.date}</span>
              <span className="label hidden pt-1 text-cobalt sm:block">{u.source}</span>
              <span className="text-xl font-semibold leading-snug group-hover:text-cobalt">{u.title}</span>
              <span className="hidden text-right text-xl transition-transform group-hover:translate-x-1 sm:block">{u.href ? '↗' : ''}</span>
            </div>
          )
          return (
            <li key={u.id}>
              {u.href ? (
                <a href={u.href} target="_blank" rel="noopener noreferrer">
                  {row}
                </a>
              ) : (
                row
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* ---------------- Contact ---------------- */

function Contact() {
  const [user, domain] = profile.email.split('@')
  const time = useTampaTime()
  return (
    <section id="contact" aria-labelledby="contact-h" className="scroll-mt-14 bg-coal px-4 pb-8 pt-24 text-bone sm:px-8 sm:pt-32">
      <div className="label flex items-center gap-4 border-t-2 border-bone pt-3">
        <span className="text-cobalt-soft">07</span>
        <span id="contact-h">Let’s talk</span>
      </div>
      <a
        href={`mailto:${profile.email}`}
        className="group relative mt-10 block overflow-hidden"
        aria-label={`Email ${profile.email}`}
      >
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-cobalt transition-transform duration-500 group-hover:scale-y-100" />
        <span className="relative block whitespace-nowrap py-4 text-[10vw] font-black leading-[0.85] tracking-tight sm:text-[8.4vw]">
          {user}
          <br />
          <span className="text-bone/50 group-hover:text-bone">@{domain}</span>
        </span>
      </a>
      <div className="label mt-20 flex flex-wrap items-end justify-between gap-6 border-t border-bone/25 pt-6">
        <div className="flex gap-8">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cobalt-soft">
            LinkedIn ↗
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-cobalt-soft">
            GitHub ↗
          </a>
          <a href="#top" className="hover:text-cobalt-soft">
            Back to top ↑
          </a>
        </div>
        <span className="tabular-nums text-bone/60">Tampa, FL · {time}</span>
      </div>
    </section>
  )
}
