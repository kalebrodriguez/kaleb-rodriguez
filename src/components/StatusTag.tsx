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
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-widest">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span style={{ color }}>{statusLabels[status] ?? status}</span>
    </span>
  )
}
