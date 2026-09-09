import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from './useTheme'
import { profile } from '../data/content'

const links = [
  ['About', '#about'],
  ['Research', '#research'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
] as const

export function Nav() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = links
      .map(([, href]) => document.getElementById(href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) setActive(`#${visible[0].target.id}`)
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.15, 0.4] },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? 'border-b border-line' : ''}`}
      style={
        scrolled
          ? {
              backgroundColor: 'color-mix(in srgb, var(--bg) 90%, transparent)',
              backdropFilter: 'blur(12px)',
            }
          : { backgroundColor: 'transparent' }
      }
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          KR<span className="text-signal">.</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`text-sm ${active === href ? 'text-app' : 'text-muted hover:text-app'}`}
            >
              {label}
            </a>
          ))}
          <a href={profile.resume} download className="text-sm font-medium text-signal hover:underline">
            Resume
          </a>
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="p-1.5 text-muted hover:text-app"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button onClick={toggle} aria-label="Toggle theme" className="p-2 text-muted">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="p-2 text-muted"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-app md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`py-3 text-base ${active === href ? 'text-signal' : 'text-muted'}`}
              >
                {label}
              </a>
            ))}
            <a href={profile.resume} download className="py-3 text-signal" onClick={() => setOpen(false)}>
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
