import { profile } from '../data/content'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-display text-sm font-600">
          {profile.name.split(' ')[0]}
          <span className="text-signal">.</span>
        </p>
        <p className="meta normal-case tracking-normal">
          {profile.location} · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
