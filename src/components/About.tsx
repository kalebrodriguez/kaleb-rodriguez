import { aboutFacts, education, profile } from '../data/content'
import { Rise, Stop } from './Stop'

// Cortex: who I am, with my portrait framed in a microscope eyepiece.
export function About() {
  return (
    <Stop id="about" title="Between the lab bench and the build.">
      <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        <Rise>
          <Eyepiece src={profile.photo.src} alt={profile.photo.alt} />
        </Rise>

        <div>
          <Rise>
            <p className="text-xl leading-relaxed text-text/90 sm:text-2xl sm:leading-relaxed">{profile.intro}</p>
          </Rise>
          <Rise delay={0.1}>
            <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {aboutFacts.map((f) => (
                <div key={f.id} className="bg-ink-2 p-5">
                  <dt className="readout">{f.label}</dt>
                  <dd className="mt-2 font-display text-lg leading-tight">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Rise>
          <Rise delay={0.2}>
            <h3 className="readout mt-12">Education</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {education.map((e) => (
                <li key={e.org} className="flex items-baseline justify-between gap-4 py-3.5">
                  <span>
                    <span className="font-medium">{e.org}</span>
                    <span className="block text-sm text-muted sm:inline sm:pl-3">{e.detail}</span>
                  </span>
                  <span className="readout shrink-0">{e.period}</span>
                </li>
              ))}
            </ul>
          </Rise>
        </div>
      </div>
    </Stop>
  )
}

function Eyepiece({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* Rotating graduated ring */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin-slow_80s_linear_infinite]" aria-hidden="true">
        <circle cx="100" cy="100" r="98" fill="none" stroke="rgb(239 234 246 / 0.15)" />
        {Array.from({ length: 72 }, (_, i) => {
          const a = (i / 72) * Math.PI * 2
          const long = i % 6 === 0
          const r1 = 98
          const r2 = long ? 92 : 95
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * r1}
              y1={100 + Math.sin(a) * r1}
              x2={100 + Math.cos(a) * r2}
              y2={100 + Math.sin(a) * r2}
              stroke={long ? 'var(--color-spike)' : 'rgb(239 234 246 / 0.3)'}
              strokeWidth={long ? 0.8 : 0.5}
            />
          )
        })}
      </svg>
      <div className="absolute inset-[7%] overflow-hidden rounded-full border border-line shadow-[0_0_80px_-10px_rgb(255_181_71/0.35)]">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
        {/* Lens vignette + crosshair */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_55%,rgb(7_6_12/0.75)_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[8%] h-[84%] w-px bg-text/20" />
        <div className="pointer-events-none absolute left-[8%] top-1/2 h-px w-[84%] bg-text/20" />
      </div>
      <figcaption className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap">
        <span className="h-px w-10 bg-spike" />
        <span className="readout">Obj 40× · Specimen: Kaleb</span>
      </figcaption>
    </figure>
  )
}
