import { useEffect, useState } from "react";

interface SefirotTreeProps {
  /** Optional fixed width in px. If omitted, the tree scales with viewport. */
  size?: number;
  /** Min width in px when auto-sizing. */
  min?: number;
  /** Max width in px when auto-sizing. */
  max?: number;
  /** Fraction of viewport width to target when auto-sizing. */
  vwFraction?: number;
}

// 10 sefirot in classic tree-of-life arrangement (3 pillars).
// x,y in a 100x150 viewBox.
const NODES: Array<{ x: number; y: number }> = [
  { x: 50, y: 8 },
  { x: 78, y: 28 },
  { x: 22, y: 28 },
  { x: 78, y: 60 },
  { x: 22, y: 60 },
  { x: 50, y: 78 },
  { x: 78, y: 100 },
  { x: 22, y: 100 },
  { x: 50, y: 118 },
  { x: 50, y: 142 },
];

const EDGES: Array<[number, number]> = [
  [0, 1], [0, 2], [1, 2],
  [1, 3], [2, 4], [3, 4],
  [3, 5], [4, 5], [1, 5], [2, 5],
  [3, 6], [4, 7], [5, 6], [5, 7],
  [6, 7], [6, 8], [7, 8], [5, 8],
  [8, 9], [6, 9], [7, 9],
];

function useResponsiveSize(vwFraction: number, min: number, max: number): number {
  const [size, setSize] = useState(max);
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Tree is 1.5x taller than wide; constrain by both dims so it never overflows.
      const byHeight = (vh * 0.22) * (100 / 150);
      const next = Math.min(vw * vwFraction, byHeight, max);
      setSize(Math.max(min, Math.round(next)));
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, [vwFraction, min, max]);
  return size;
}

export function SefirotTree({
  size,
  min = 64,
  max = 128,
  vwFraction = 0.22,
}: SefirotTreeProps) {
  const auto = useResponsiveSize(vwFraction, min, max);
  const width = size ?? auto;

  // Scale stroke and node radius proportionally to size for crisp visuals at any width.
  // Reference: at width 96 we want strokeWidth ~0.7 and node r ~3.6 in 100-unit viewBox.
  const t = Math.min(1.4, Math.max(0.7, width / 96));
  const edgeStroke = +(0.7 * t).toFixed(2);
  const nodeStroke = +(0.9 * t).toFixed(2);
  const nodeRadius = +(3.6 * Math.min(1.15, Math.max(0.9, t))).toFixed(2);

  return (
    <svg
      viewBox="0 0 100 150"
      width={width}
      height={(width * 150) / 100}
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
          strokeWidth={edgeStroke}
        />
      ))}
      {NODES.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={nodeRadius}
          fill="var(--gold)"
          stroke="var(--gold-bright)"
          strokeWidth={nodeStroke}
        />
      ))}
    </svg>
  );
}
