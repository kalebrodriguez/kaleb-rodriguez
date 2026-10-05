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
import { statusLabels, type DetailLink } from '../data/content'
import { statusTone } from './stops'
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
  image?: { src: string; alt: string }
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
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex h-full w-full max-w-lg flex-col border-l border-line bg-ink-2 text-text shadow-[-24px_0_80px_-30px_rgba(255,181,71,0.25)]"
            initial={reduce ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <div className="readout !text-spike">Specimen · {payload.kind}</div>
                {payload.eyebrow && (
                  <p className="readout mt-2">
                    {payload.eyebrow}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line hover:border-spike"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
              {payload.image && (
                <img
                  src={payload.image.src}
                  alt={payload.image.alt}
                  className="mb-6 aspect-[4/3] w-full rounded-2xl object-cover object-[50%_35%]"
                />
              )}
              {payload.status && (
                <span className={`readout mb-4 inline-block rounded-full border px-2.5 py-1 ${statusTone[payload.status] ?? ''}`}>
                  {statusLabels[payload.status] ?? payload.status}
                </span>
              )}
              <h2
                id={titleId}
                className="font-display text-3xl font-semibold leading-tight sm:text-4xl"
              >
                {payload.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">{payload.summary}</p>
              <p className="mt-4 leading-relaxed text-text/85">{payload.detail}</p>

              {payload.highlights && payload.highlights.length > 0 && (
                <div className="mt-8">
                  <h3 className="readout mb-3">Highlights</h3>
                  <ul className="space-y-2">
                    {payload.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-spike"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {payload.stack && payload.stack.length > 0 && (
                <div className="mt-8">
                  <h3 className="readout mb-3">Stack</h3>
                  <ul className="flex flex-wrap gap-2">
                    {payload.stack.map((s) => (
                      <li key={s} className="rounded-full border border-line px-3 py-1 text-sm">
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
                        className={i === 0 ? 'btn btn-spike !py-2.5 text-sm' : 'btn btn-line !py-2.5 text-sm'}
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
