import { profile } from '../data/content'

export function Footer() {
  return (
    <footer className="border-t border-line bg-app-2">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="font-display text-base">
          Kaleb<span className="text-signal">.</span>Rodriguez
        </div>
        <p className="font-mono text-xs text-muted">
          {profile.location} · Built with React &amp; Tailwind · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
