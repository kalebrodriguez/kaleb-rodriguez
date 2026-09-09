import { useEffect, useMemo, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// Signature element: an abstract connectome — nodes (cell bodies) linked by
// edges (axonal connections). Deterministic layout, traveling signals, and a
// soft pointer-reactive field. Purely decorative, so hidden from AT.

type Node = { x: number; y: number; r: number; delay: number }
type Pulse = { edge: number; t: number; speed: number; dir: 1 | -1 }

const W = 1000
const H = 700

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

function buildGraph() {
  const rand = seeded(42)
  const count = 42
  const nodes: Node[] = Array.from({ length: count }, () => ({
    x: rand() * W,
    y: rand() * H,
    r: 1.3 + rand() * 3.4,
    delay: rand() * 4,
  }))

  const edges: [number, number][] = []
  nodes.forEach((a, i) => {
    const dists = nodes
      .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3)
    dists.forEach(({ j }) => {
      if (j > i) edges.push([i, j])
    })
  })

  const pulses: Pulse[] = Array.from({ length: 10 }, () => ({
    edge: Math.floor(rand() * edges.length),
    t: rand(),
    speed: 0.08 + rand() * 0.14,
    dir: rand() > 0.5 ? 1 : -1,
  }))

  return { nodes, edges, pulses }
}

export function Connectome() {
  const reduce = useReducedMotion()
  const rootRef = useRef<SVGSVGElement>(null)
  const pulseGroupRef = useRef<SVGGElement>(null)
  const nodeGroupRef = useRef<SVGGElement>(null)
  const edgeGroupRef = useRef<SVGGElement>(null)
  const pointer = useRef({ x: W * 0.55, y: H * 0.35 })
  const { nodes, edges, pulses: seedPulses } = useMemo(buildGraph, [])
  const pulsesRef = useRef(seedPulses.map((p) => ({ ...p })))

  useEffect(() => {
    if (reduce) return

    const onMove = (e: PointerEvent) => {
      const el = rootRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      pointer.current = {
        x: ((e.clientX - rect.left) / rect.width) * W,
        y: ((e.clientY - rect.top) / rect.height) * H,
      }
      const ox = (e.clientX / window.innerWidth - 0.5) * 18
      const oy = (e.clientY / window.innerHeight - 0.5) * 12
      el.style.transform = `translate(${ox}px, ${oy}px) scale(1.04)`
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce])

  useEffect(() => {
    if (reduce) return

    const pulseEls = pulseGroupRef.current
      ? Array.from(pulseGroupRef.current.querySelectorAll<SVGGElement>('[data-pulse]'))
      : []
    const nodeEls = nodeGroupRef.current
      ? Array.from(nodeGroupRef.current.querySelectorAll<SVGGElement>('[data-node]'))
      : []
    const edgeEls = edgeGroupRef.current
      ? Array.from(edgeGroupRef.current.querySelectorAll<SVGLineElement>('line'))
      : []

    let frame = 0
    let last = performance.now()

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const { x: px, y: py } = pointer.current

      for (let i = 0; i < pulsesRef.current.length; i++) {
        const p = pulsesRef.current[i]
        p.t += p.speed * p.dir * dt
        if (p.t > 1 || p.t < 0) {
          p.dir = (p.dir * -1) as 1 | -1
          p.t = Math.max(0, Math.min(1, p.t))
          if (Math.random() < 0.35) {
            p.edge = Math.floor(Math.random() * edges.length)
            p.t = p.dir === 1 ? 0 : 1
          }
        }
        const edge = edges[p.edge]
        if (!edge) continue
        const a = nodes[edge[0]]
        const b = nodes[edge[1]]
        const x = a.x + (b.x - a.x) * p.t
        const y = a.y + (b.y - a.y) * p.t
        const g = pulseEls[i]
        if (g) g.setAttribute('transform', `translate(${x} ${y})`)
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const d2 = (n.x - px) ** 2 + (n.y - py) ** 2
        const near = d2 < 160 ** 2
        const boost = near ? 1 + (1 - Math.sqrt(d2) / 160) * 1.35 : 1
        const g = nodeEls[i]
        if (!g) continue
        const core = g.querySelector('[data-core]') as SVGCircleElement | null
        const halo = g.querySelector('[data-halo]') as SVGCircleElement | null
        if (core) core.setAttribute('r', String(n.r * boost))
        if (halo) {
          halo.setAttribute('r', String(n.r * 6 * boost))
          halo.setAttribute('opacity', near ? '1' : '0')
        }
      }

      for (let i = 0; i < edges.length; i++) {
        const [ai, bi] = edges[i]
        const a = nodes[ai]
        const b = nodes[bi]
        const mx = (a.x + b.x) / 2
        const my = (a.y + b.y) / 2
        const near = (mx - px) ** 2 + (my - py) ** 2 < 140 ** 2
        const line = edgeEls[i]
        if (!line) continue
        line.setAttribute('stroke-width', near ? '1.35' : '0.75')
        line.setAttribute('opacity', near ? '0.95' : '0.7')
      }

      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [reduce, nodes, edges])

  return (
    <svg
      ref={rootRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full will-change-transform"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      style={reduce ? undefined : { transform: 'translate(0px, 0px) scale(1.04)' }}
    >
      <defs>
        <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g ref={edgeGroupRef}>
        {edges.map(([i, j], ei) => (
          <line
            key={ei}
            x1={nodes[i].x}
            y1={nodes[i].y}
            x2={nodes[j].x}
            y2={nodes[j].y}
            stroke="var(--edge)"
            strokeWidth={0.75}
            opacity={0.7}
          />
        ))}
      </g>

      <g ref={nodeGroupRef}>
        {nodes.map((n, i) => (
          <g key={i} data-node>
            <circle
              data-halo
              cx={n.x}
              cy={n.y}
              r={n.r * 6}
              fill="url(#node-glow)"
              opacity={0}
            />
            <circle
              data-core
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill="var(--node)"
              style={
                reduce
                  ? undefined
                  : {
                      animation: `pulse-node ${5 + (i % 4)}s ease-in-out ${n.delay}s infinite`,
                    }
              }
            />
          </g>
        ))}
      </g>

      {!reduce && (
        <g ref={pulseGroupRef}>
          {seedPulses.map((_, i) => (
            <g key={i} data-pulse transform="translate(-20 -20)">
              <circle cx={0} cy={0} r={7} fill="url(#node-glow)" />
              <circle cx={0} cy={0} r={2.1} fill="var(--signal)" opacity={0.95} />
            </g>
          ))}
        </g>
      )}
    </svg>
  )
}
