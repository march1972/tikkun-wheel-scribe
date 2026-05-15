interface SefirotTreeProps {
  size?: number;
}

// 10 sefirot in classic tree-of-life arrangement (3 pillars).
// x,y in a 100x150 viewBox.
const NODES: Array<{ x: number; y: number }> = [
  { x: 50, y: 8 },   // 1 Keter
  { x: 78, y: 28 },  // 2 Chokmah (right pillar top)
  { x: 22, y: 28 },  // 3 Binah (left pillar top)
  { x: 78, y: 60 },  // 4 Chesed
  { x: 22, y: 60 },  // 5 Gevurah
  { x: 50, y: 78 },  // 6 Tiferet
  { x: 78, y: 100 }, // 7 Netzach
  { x: 22, y: 100 }, // 8 Hod
  { x: 50, y: 118 }, // 9 Yesod
  { x: 50, y: 142 }, // 10 Malkhut
];

const EDGES: Array<[number, number]> = [
  [0, 1], [0, 2], [1, 2],
  [1, 3], [2, 4], [3, 4],
  [3, 5], [4, 5], [1, 5], [2, 5],
  [3, 6], [4, 7], [5, 6], [5, 7],
  [6, 7], [6, 8], [7, 8], [5, 8],
  [8, 9], [6, 9], [7, 9],
];

export function SefirotTree({ size = 72 }: SefirotTreeProps) {
  return (
    <svg
      viewBox="0 0 100 150"
      width={size}
      height={(size * 150) / 100}
      aria-hidden="true"
    >
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="var(--gold-deep)"
          strokeWidth="0.7"
        />
      ))}
      {NODES.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="3.6"
          fill="var(--forest-mid)"
          stroke="var(--gold-bright)"
          strokeWidth="0.9"
        />
      ))}
    </svg>
  );
}
