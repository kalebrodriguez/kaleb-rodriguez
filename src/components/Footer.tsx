import { profile } from '../data/content'

export function Footer() {
  return (
    <footer className="border-t border-line bg-app">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-display text-sm font-bold tracking-tight">
          KR<span className="text-signal">.</span>
        </p>
        <p className="text-sm text-muted">
          {profile.location} · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
