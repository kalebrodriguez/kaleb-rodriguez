import { statusLabels } from '../data/content'

const tone: Record<string, string> = {
  active: 'var(--signal)',
  shipped: 'var(--signal)',
  published: 'var(--signal)',
  ongoing: 'var(--stain)',
  prototype: 'var(--muted)',
  concept: 'var(--muted)',
  completed: 'var(--muted)',
}

export function StatusTag({ status }: { status: string }) {
  const color = tone[status] ?? 'var(--muted)'
  return (
    <span className="meta inline-flex items-center gap-1.5" style={{ color }}>
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      {statusLabels[status] ?? status}
    </span>
  )
}
