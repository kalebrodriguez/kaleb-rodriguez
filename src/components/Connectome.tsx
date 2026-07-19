import { useMemo } from 'react'

// Signature element: an abstract connectome — nodes (cell bodies) linked by
// edges (axonal connections). Deterministic layout, gentle per-node pulse.
// Purely decorative, so it is hidden from assistive tech.

type Node = { x: number; y: number; r: number; delay: number }

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

export function Connectome() {
  const { nodes, edges } = useMemo(() => {
    const rand = seeded(42)
    const W = 1000
    const H = 700
    const count = 34
    const nodes: Node[] = Array.from({ length: count }, () => ({
      x: rand() * W,
      y: rand() * H,
      r: 1.4 + rand() * 3.2,
      delay: rand() * 4,
    }))
    // connect each node to its 2 nearest neighbors
    const edges: [Node, Node][] = []
    nodes.forEach((a, i) => {
      const dists = nodes
        .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 }))
        .filter((o) => o.j !== i)
        .sort((p, q) => p.d - q.d)
        .slice(0, 2)
      dists.forEach(({ j }) => {
        if (j > i) edges.push([a, nodes[j]])
      })
    })
    return { nodes, edges }
  }, [])

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1000 700"
      preserveAspectRatio="xMidYMid slice"
    >
      <g>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="var(--edge)"
            strokeWidth={0.8}
          />
        ))}
      </g>
      <g>
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="var(--node)"
            style={{
              animation: `pulse-node ${5 + (i % 4)}s ease-in-out ${n.delay}s infinite`,
            }}
          />
        ))}
      </g>
    </svg>
  )
}
