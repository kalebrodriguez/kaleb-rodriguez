import { profile } from '../data/content'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-app-2/70">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--signal), var(--stain), transparent)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 specimen-grid opacity-25"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="font-display text-base">
          Kaleb<span className="status-pulse inline-block text-signal">.</span>Rodriguez
        </div>
        <p className="font-mono text-xs text-muted">
          {profile.location} · Built with React &amp; Tailwind · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
