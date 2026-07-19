import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

function getInitial(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const param = new URLSearchParams(window.location.search).get('theme')
  if (param === 'light' || param === 'dark') return param
  const stored = localStorage.getItem('theme') as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  // Dark is the designed default; light-preference users still get a tuned light theme.
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitial)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggle }
}
