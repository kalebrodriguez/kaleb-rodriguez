/** Distinct cover diagrams for each project — not stock screenshots. */
export function ProjectCover({ id }: { id: string }) {
  const common = {
    className: 'h-full w-full',
    viewBox: '0 0 640 360',
    preserveAspectRatio: 'xMidYMid slice' as const,
    'aria-hidden': true as const,
  }

  switch (id) {
    case 'neuropd':
      return (
        <svg {...common}>
          <rect width="640" height="360" fill="var(--surface)" />
          <g stroke="var(--line)" strokeWidth="1" opacity="0.5">
            {[80, 160, 240, 320].map((y) => (
              <line key={y} x1="40" y1={y} x2="600" y2={y} />
            ))}
          </g>
          <path
            d="M40 260 C 120 240, 160 120, 240 150 S 360 280, 440 200 S 540 80, 600 110"
            fill="none"
            stroke="var(--signal)"
            strokeWidth="2.5"
          />
          <path
            d="M40 280 C 140 270, 180 190, 260 210 S 380 300, 460 250 S 560 160, 600 180"
            fill="none"
            stroke="var(--stain)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          {[
            [240, 150],
            [440, 200],
            [600, 110],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="var(--signal)" />
          ))}
        </svg>
      )
    case 'clearcredit':
      return (
        <svg {...common}>
          <rect width="640" height="360" fill="var(--surface)" />
          <rect x="48" y="48" width="220" height="264" rx="8" fill="var(--surface-2)" stroke="var(--line)" />
          <rect x="280" y="48" width="312" height="80" rx="8" fill="var(--surface-2)" stroke="var(--line)" />
          <rect x="280" y="148" width="148" height="164" rx="8" fill="var(--surface-2)" stroke="var(--line)" />
          <rect x="444" y="148" width="148" height="164" rx="8" fill="var(--surface-2)" stroke="var(--line)" />
          <rect x="68" y="72" width="120" height="10" rx="2" fill="var(--signal)" opacity="0.8" />
          <rect x="68" y="100" width="180" height="8" rx="2" fill="var(--line)" />
          <rect x="68" y="124" width="160" height="8" rx="2" fill="var(--line)" />
          <rect x="68" y="148" width="170" height="8" rx="2" fill="var(--line)" />
          <rect x="300" y="72" width="180" height="12" rx="2" fill="var(--signal)" opacity="0.55" />
          <rect x="300" y="100" width="240" height="8" rx="2" fill="var(--line)" />
          <circle cx="518" cy="230" r="42" fill="none" stroke="var(--stain)" strokeWidth="8" opacity="0.55" />
          <circle cx="518" cy="230" r="42" fill="none" stroke="var(--signal)" strokeWidth="8" strokeDasharray="80 200" />
        </svg>
      )
    case 'digitaltwin':
      return (
        <svg {...common}>
          <rect width="640" height="360" fill="var(--surface)" />
          <circle cx="220" cy="180" r="88" fill="none" stroke="var(--signal)" strokeWidth="1.5" opacity="0.45" />
          <circle cx="420" cy="180" r="88" fill="none" stroke="var(--stain)" strokeWidth="1.5" opacity="0.45" />
          <circle cx="220" cy="180" r="36" fill="color-mix(in srgb, var(--signal) 20%, transparent)" stroke="var(--signal)" />
          <circle cx="420" cy="180" r="36" fill="color-mix(in srgb, var(--stain) 18%, transparent)" stroke="var(--stain)" />
          <path d="M256 180 H384" stroke="var(--line)" strokeWidth="2" strokeDasharray="6 8" />
          <circle cx="320" cy="180" r="5" fill="var(--text)" opacity="0.7" />
        </svg>
      )
    case 'kora':
      return (
        <svg {...common}>
          <rect width="640" height="360" fill="var(--surface)" />
          <rect x="210" y="70" width="220" height="220" rx="16" fill="var(--surface-2)" stroke="var(--signal)" strokeWidth="2" />
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3, 4].map((col) => {
              const on = (row + col) % 2 === 0 || (row < 2 && col < 2)
              return (
                <rect
                  key={`${row}-${col}`}
                  x={236 + col * 34}
                  y={96 + row * 34}
                  width="22"
                  height="22"
                  fill={on ? 'var(--signal)' : 'transparent'}
                  opacity={on ? 0.85 : 0.2}
                  stroke="var(--line)"
                />
              )
            }),
          )}
        </svg>
      )
    case 'posture':
      return (
        <svg {...common}>
          <rect width="640" height="360" fill="var(--surface)" />
          <g fill="none" stroke="var(--signal)" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="320" cy="78" r="22" />
            <path d="M320 100 V190" />
            <path d="M320 130 L250 170" />
            <path d="M320 130 L390 170" />
            <path d="M320 190 L270 280" />
            <path d="M320 190 L370 280" />
          </g>
          <path d="M250 70 L250 300" stroke="var(--stain)" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.6" />
          <text x="400" y="90" fill="var(--signal)" fontFamily="monospace" fontSize="28">
            86
          </text>
        </svg>
      )
    case 'cramb':
      return (
        <svg {...common}>
          <rect width="640" height="360" fill="var(--surface)" />
          <rect x="70" y="60" width="300" height="240" rx="10" fill="var(--surface-2)" stroke="var(--line)" />
          <rect x="90" y="88" width="200" height="10" rx="2" fill="var(--line)" />
          <rect x="90" y="116" width="250" height="8" rx="2" fill="var(--line)" opacity="0.7" />
          <rect x="90" y="140" width="230" height="8" rx="2" fill="var(--line)" opacity="0.7" />
          <rect x="400" y="90" width="150" height="90" rx="8" fill="color-mix(in srgb, var(--signal) 16%, var(--surface-2))" stroke="var(--signal)" />
          <rect x="400" y="200" width="150" height="90" rx="8" fill="color-mix(in srgb, var(--stain) 14%, var(--surface-2))" stroke="var(--stain)" />
          <path d="M370 150 H400" stroke="var(--signal)" strokeWidth="2" markerEnd="url(#arrow)" />
        </svg>
      )
    case 'medalert':
      return (
        <svg {...common}>
          <rect width="640" height="360" fill="var(--surface)" />
          <rect x="230" y="40" width="180" height="280" rx="28" fill="var(--surface-2)" stroke="var(--line)" strokeWidth="2" />
          <rect x="250" y="80" width="140" height="200" rx="8" fill="var(--bg)" />
          <circle cx="320" cy="140" r="28" fill="none" stroke="var(--signal)" strokeWidth="6" strokeDasharray="120 40" />
          <rect x="275" y="190" width="90" height="10" rx="2" fill="var(--signal)" opacity="0.7" />
          <rect x="285" y="214" width="70" height="8" rx="2" fill="var(--line)" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <rect width="640" height="360" fill="var(--surface)" />
          <circle cx="320" cy="180" r="60" fill="none" stroke="var(--signal)" strokeWidth="2" />
        </svg>
      )
  }
}
