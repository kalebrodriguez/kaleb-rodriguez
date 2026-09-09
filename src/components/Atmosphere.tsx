/** Quiet dark field — grain + vignette, no connectome wallpaper. */
export function Atmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 80% -10%, color-mix(in srgb, var(--signal) 10%, transparent), transparent 55%),
            radial-gradient(ellipse 50% 40% at 0% 60%, color-mix(in srgb, var(--mark) 7%, transparent), transparent 50%),
            var(--bg)
          `,
        }}
      />
      <div className="film-grain absolute inset-0" />
    </div>
  )
}
