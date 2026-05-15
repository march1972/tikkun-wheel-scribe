import { SIGNS } from "@/lib/bundle";

interface TikkunWheelProps {
  size?: number;
  state?: "idle" | "spinning";
  targetKey?: string | null;
  onClick?: () => void;
}

const RADIUS = 140;
const CENTER = 160;
const SLICES = 12;

export function TikkunWheel({
  size = 320,
  state = "idle",
  targetKey,
  onClick,
}: TikkunWheelProps) {
  const targetIdx = Math.max(
    0,
    SIGNS.findIndex((s) => s.key === targetKey)
  );

  // 5 full rotations + land slice center at top (-90deg).
  const sliceAngle = 360 / SLICES;
  const finalRotation =
    state === "spinning"
      ? 360 * 5 - (targetIdx * sliceAngle + sliceAngle / 2)
      : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Tikkun Wheel"
      className="group relative inline-flex items-center justify-center bg-transparent p-0"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 320 320"
        width={size}
        height={size}
        style={{
          transform: `rotate(${finalRotation}deg)`,
          transition:
            state === "spinning"
              ? "transform 2.4s cubic-bezier(0.22, 1, 0.36, 1)"
              : "transform 0.4s ease",
        }}
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS + 6}
          fill="none"
          stroke="var(--gold-deep)"
          strokeWidth="1"
          opacity="0.6"
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="var(--forest-mid)"
          stroke="var(--gold)"
          strokeWidth="0.8"
        />
        {SIGNS.map((sign, i) => {
          const angle = (i / SLICES) * 2 * Math.PI - Math.PI / 2;
          const x = CENTER + Math.cos(angle) * (RADIUS - 28);
          const y = CENTER + Math.sin(angle) * (RADIUS - 28);

          const tickStart = {
            x: CENTER + Math.cos(angle) * (RADIUS - 4),
            y: CENTER + Math.sin(angle) * (RADIUS - 4),
          };
          const tickEnd = {
            x: CENTER + Math.cos(angle) * RADIUS,
            y: CENTER + Math.sin(angle) * RADIUS,
          };
          return (
            <g key={sign.key}>
              <line
                x1={tickStart.x}
                y1={tickStart.y}
                x2={tickEnd.x}
                y2={tickEnd.y}
                stroke="var(--gold)"
                strokeWidth="0.8"
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--cream)"
                fontFamily="Frank Ruhl Libre, serif"
                fontSize="22"
                transform={`rotate(${(i / SLICES) * 360} ${x} ${y})`}
              >
                {sign.letter}
              </text>
            </g>
          );
        })}
        <circle cx={CENTER} cy={CENTER} r="4" fill="var(--gold-bright)" />
      </svg>
      {/* Pointer (stays fixed, does not rotate) */}
      <svg
        viewBox="0 0 20 16"
        className="pointer-events-none absolute"
        style={{ top: -2, width: 18, height: 14 }}
      >
        <path d="M10 16 L0 0 L20 0 Z" fill="var(--gold-bright)" />
      </svg>
    </button>
  );
}
