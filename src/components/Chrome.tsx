import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { stops } from './stops'


function useActiveStop() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.45
      let idx = 0
      stops.forEach((s, i) => {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= mid) idx = i
      })
      setActive(idx)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return active
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'border-b border-line bg-ink/60 backdrop-blur-xl' : ''
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Primary">
        <a href="#top" className="font-display text-lg font-semibold">
          Kaleb Rodriguez
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {stops.slice(1, -1).map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="readout !text-text/70 transition-colors hover:!text-spike">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn btn-spike !px-4 !py-2 text-sm">
              Get in touch
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-ink/95 px-5 pb-6 pt-2 backdrop-blur-xl md:hidden">
          <ul>
            {stops.slice(1).map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-line py-4"
                >
                  <span className="font-display text-2xl">{s.label}</span>
                  <span className="readout">{s.region}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

// Right-edge depth gauge: how far into the brain you are, and where.
export function DepthGauge() {
  const active = useActiveStop()
  const [depth, setDepth] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setDepth(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Roughly cortex-to-brainstem: ~6 cm.
  const microns = Math.round(depth * 60000)

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      <div className="text-right">
        <div className="readout">Depth</div>
        <div className="font-mono text-sm tabular-nums text-text">
          {microns.toLocaleString()} µm
        </div>
      </div>
      <div className="relative h-56 w-px bg-line">
        <div
          className="absolute left-0 top-0 w-px bg-spike shadow-[0_0_10px_rgb(255_181_71/0.8)]"
          style={{ height: `${depth * 100}%` }}
        />
        {stops.map((s, i) => (
          <span
            key={s.id}
            className={`absolute right-0 h-px transition-all duration-300 ${
              i === active ? 'w-4 bg-spike' : 'w-2 bg-muted/50'
            }`}
            style={{ top: `${(i / (stops.length - 1)) * 100}%` }}
          />
        ))}
      </div>
      <div className="text-right">
        <div className="readout">Region</div>
        <div className="font-display text-base text-spike">{stops[active].region}</div>
      </div>
    </aside>
  )
}

// Microscope crosshair that eases after the pointer and opens up over links.
export function Crosshair() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.documentElement.classList.add('crosshair')
    const el = ref.current
    if (!el) return
    const pos = { x: -100, y: -100, tx: -100, ty: -100 }
    let frame = 0
    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.3
      pos.y += (pos.ty - pos.y) * 0.3
      el.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      frame = requestAnimationFrame(loop)
    }
    const onMove = (e: PointerEvent) => {
      pos.tx = e.clientX
      pos.ty = e.clientY
      const t = e.target as HTMLElement | null
      el.dataset.hot = t?.closest('a, button, [role="tab"]') ? '1' : '0'
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.classList.remove('crosshair')
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-hot="0"
      className="group pointer-events-none fixed left-0 top-0 z-[90] hidden [@media(hover:hover)_and_(pointer:fine)]:block"
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spike" />
        <span className="block h-7 w-7 rounded-full border border-text/50 transition-all duration-200 group-data-[hot=1]:h-12 group-data-[hot=1]:w-12 group-data-[hot=1]:border-spike" />
        <span className="absolute left-1/2 top-[-6px] h-2 w-px -translate-x-1/2 bg-text/60" />
        <span className="absolute bottom-[-6px] left-1/2 h-2 w-px -translate-x-1/2 bg-text/60" />
        <span className="absolute left-[-6px] top-1/2 h-px w-2 -translate-y-1/2 bg-text/60" />
        <span className="absolute right-[-6px] top-1/2 h-px w-2 -translate-y-1/2 bg-text/60" />
      </div>
    </div>
  )
}
