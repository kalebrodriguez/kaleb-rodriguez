import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { StatusTag } from './StatusTag'
import { ProjectCover } from './ProjectCover'
import type { DetailLink } from '../data/content'
import { ease } from './motion'

export type DetailPayload = {
  kind: 'project' | 'research' | 'experience' | 'about'
  title: string
  eyebrow?: string
  status?: string
  summary: string
  detail: string
  highlights?: string[]
  stack?: string[]
  links?: DetailLink[]
  coverId?: string
}

type DetailContextValue = {
  openDetail: (payload: DetailPayload) => void
  closeDetail: () => void
}

const DetailContext = createContext<DetailContextValue | null>(null)

export function useDetail() {
  const ctx = useContext(DetailContext)
  if (!ctx) throw new Error('useDetail must be used within DetailProvider')
  return ctx
}

export function DetailProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<DetailPayload | null>(null)
  const openDetail = useCallback((next: DetailPayload) => setPayload(next), [])
  const closeDetail = useCallback(() => setPayload(null), [])
  const value = useMemo(() => ({ openDetail, closeDetail }), [openDetail, closeDetail])

  return (
    <DetailContext.Provider value={value}>
      {children}
      <DetailDrawer payload={payload} onClose={closeDetail} />
    </DetailContext.Provider>
  )
}

function DetailDrawer({
  payload,
  onClose,
}: {
  payload: DetailPayload | null
  onClose: () => void
}) {
  const reduce = useReducedMotion()
  const titleId = useId()

  useEffect(() => {
    if (!payload) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [payload, onClose])

  return (
    <AnimatePresence>
      {payload && (
        <div className="fixed inset-0 z-[70] flex justify-end" role="presentation">
          <motion.button
            type="button"
            aria-label="Close details"
            className="absolute inset-0 bg-[color-mix(in_srgb,var(--bg)_60%,transparent)]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex h-full w-full max-w-lg flex-col border-l border-line bg-app"
            initial={reduce ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="meta-signal">
                  {payload.kind === 'project' && 'Project'}
                  {payload.kind === 'research' && 'Research'}
                  {payload.kind === 'experience' && 'Experience'}
                  {payload.kind === 'about' && 'About'}
                </p>
                {payload.eyebrow && (
                  <p className="meta mt-2 normal-case tracking-normal">{payload.eyebrow}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-muted hover:text-app"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              {payload.coverId && (
                <div className="project-media mb-6">
                  <ProjectCover id={payload.coverId} />
                </div>
              )}
              {payload.status && (
                <div className="mb-3">
                  <StatusTag status={payload.status} />
                </div>
              )}
              <h2
                id={titleId}
                className="font-display text-2xl font-600 leading-tight tracking-tight sm:text-3xl"
              >
                {payload.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">{payload.summary}</p>
              <p className="mt-4 text-sm leading-relaxed text-app">{payload.detail}</p>

              {payload.highlights && payload.highlights.length > 0 && (
                <div className="mt-8">
                  <p className="meta-signal mb-3">Highlights</p>
                  <ul className="space-y-2.5">
                    {payload.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-[var(--signal)]"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {payload.stack && payload.stack.length > 0 && (
                <div className="mt-8">
                  <p className="meta-signal mb-3">Stack</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {payload.stack.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {payload.links && payload.links.length > 0 && (
              <div className="border-t border-line px-5 py-4 sm:px-6">
                <div className="flex flex-wrap gap-2">
                  {payload.links.map((l, i) => {
                    const internal = l.href.startsWith('#')
                    return (
                      <a
                        key={l.href + l.label}
                        href={l.href}
                        target={internal ? undefined : '_blank'}
                        rel={internal ? undefined : 'noopener noreferrer'}
                        className={i === 0 ? 'btn-primary' : 'btn-ghost'}
                        onClick={() => {
                          if (internal) onClose()
                        }}
                      >
                        {l.label}
                        <ArrowUpRight size={14} />
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
