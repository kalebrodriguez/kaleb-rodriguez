/** Quiet site atmosphere — grain + soft vignette only. */
export function Atmosphere() {
  return (
    <>
      <div aria-hidden="true" className="film-grain pointer-events-none fixed inset-0 z-[2]" />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, color-mix(in srgb, var(--bg) 40%, transparent) 100%)',
        }}
      />
    </>
  )
}
