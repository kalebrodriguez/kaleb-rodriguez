/** Corner brackets like a microscope imaging frame. */
export function FieldReticle({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-[var(--signal)] opacity-50 sm:left-5 sm:top-5" />
      <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-[var(--signal)] opacity-50 sm:right-5 sm:top-5" />
      <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[var(--stain)] opacity-40 sm:bottom-5 sm:left-5" />
      <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[var(--stain)] opacity-40 sm:bottom-5 sm:right-5" />
      <span className="absolute left-1/2 top-3 h-2 w-px -translate-x-1/2 bg-[var(--signal)] opacity-30 sm:top-5" />
      <span className="absolute bottom-3 left-1/2 h-2 w-px -translate-x-1/2 bg-[var(--stain)] opacity-30 sm:bottom-5" />
    </div>
  )
}
