import { useEffect, useRef, useState, useCallback } from "react";

// Letters in order, starting at top, going clockwise.
const LETTERS: Array<{ glyph: string; name: string }> = [
  { glyph: "ה", name: "Hei" },
  { glyph: "ו", name: "Vav" },
  { glyph: "ז", name: "Zayin" },
  { glyph: "ח", name: "Chet" },
  { glyph: "ט", name: "Tet" },
  { glyph: "י", name: "Yud" },
  { glyph: "ל", name: "Lamed" },
  { glyph: "נ", name: "Nun" },
  { glyph: "ס", name: "Samekh" },
  { glyph: "ע", name: "Ayin" },
  { glyph: "צ", name: "Tsadi" },
  { glyph: "ק", name: "Qof" },
];

const SLICES = LETTERS.length;
const SLICE_DEG = 360 / SLICES;

// Slice 0 (Hei) sits at the top. Wheel rotation R degrees moves slice i to
// angle (i * SLICE_DEG + R) - 90 (SVG 0 = right). The pointer is at the top
// (angle -90). To land slice `targetIdx` under the pointer, we need the
// final rotation R such that: (targetIdx * SLICE_DEG + R) mod 360 === 0.
function rotationForTarget(targetIdx: number, currentR: number): number {
  const desired = -targetIdx * SLICE_DEG;
  // Choose the closest equivalent angle that is at least 5 full turns past
  // currentR (always spin forward).
  const minTarget = currentR + 360 * 5;
  const k = Math.ceil((minTarget - desired) / 360);
  return desired + k * 360;
}

// Cubic-bezier easing (.17, .67, .25, 1.0) implemented with the standard
// Newton-Raphson approach for parametric Bezier curves.
function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDerivX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  const solveT = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const xT = sampleX(t) - x;
      const d = sampleDerivX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= xT / d;
    }
    return Math.max(0, Math.min(1, t));
  };

  return (x: number) => sampleY(solveT(x));
}

const easeSpin = cubicBezier(0.17, 0.67, 0.25, 1.0);

const IDLE_PERIOD_MS = 45_000; // ~45s per revolution
const SPIN_DURATION_MS = 2_400;

interface TikkunWheelProps {
  size?: number;
  state?: "idle" | "spinning";
  targetKey?: string | null; // expects sign keys mapped to a letter index
  targetIndex?: number | null; // alternative explicit index 0..11
  onClick?: () => void;
  onSettle?: (letter: { glyph: string; name: string }) => void;
}

// Map zodiac sign keys (used elsewhere in the app) to wheel slice indices.
const SIGN_KEY_TO_INDEX: Record<string, number> = {
  aries: 0,
  taurus: 1,
  gemini: 2,
  cancer: 3,
  leo: 4,
  virgo: 5,
  libra: 6,
  scorpio: 7,
  sagittarius: 8,
  capricorn: 9,
  aquarius: 10,
  pisces: 11,
};

export function TikkunWheel({
  size = 280,
  state = "idle",
  targetKey,
  targetIndex,
  onClick,
  onSettle,
}: TikkunWheelProps) {
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const spinRef = useRef<{
    start: number;
    from: number;
    to: number;
    duration: number;
  } | null>(null);
  const settledRef = useRef(false);

  const resolvedTarget =
    typeof targetIndex === "number"
      ? targetIndex
      : targetKey && targetKey in SIGN_KEY_TO_INDEX
        ? SIGN_KEY_TO_INDEX[targetKey]
        : null;

  const [announcement, setAnnouncement] = useState<string>(
    "Tikkun wheel, press Enter to spin"
  );

  // Animation loop: idle continuous spin OR spinning ease-out.
  useEffect(() => {
    let last = performance.now();
    settledRef.current = false;

    if (state === "spinning" && resolvedTarget !== null) {
      const from = rotationRef.current;
      const to = rotationForTarget(resolvedTarget, from);
      spinRef.current = {
        start: performance.now(),
        from,
        to,
        duration: SPIN_DURATION_MS,
      };
      setAnnouncement("spinning");
    } else {
      spinRef.current = null;
    }

    const tick = (now: number) => {
      const dt = now - last;
      last = now;

      const spin = spinRef.current;
      if (spin) {
        const t = Math.min(1, (now - spin.start) / spin.duration);
        const eased = easeSpin(t);
        rotationRef.current = spin.from + (spin.to - spin.from) * eased;
        setRotation(rotationRef.current);
        if (t >= 1 && !settledRef.current) {
          settledRef.current = true;
          const idx =
            ((Math.round(-rotationRef.current / SLICE_DEG) % SLICES) + SLICES) %
            SLICES;
          const landed = LETTERS[idx];
          setAnnouncement(`landed on ${landed.name}`);
          onSettle?.(landed);
          spinRef.current = null;
        }
      } else if (state === "idle") {
        rotationRef.current += (dt / IDLE_PERIOD_MS) * 360;
        setRotation(rotationRef.current);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [state, resolvedTarget, onSettle]);

  const handleActivate = useCallback(() => {
    if (state === "spinning") return;
    onClick?.();
  }, [state, onClick]);

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  };

  // 500x500 viewBox to match the relic prototype's coordinate space.
  const VB = 500;
  const C = VB / 2;
  const OUTER = 210; // dashed outer halo
  const RING = 185; // primary gold ring
  const INNER_HAIR = 180;
  const CORE_RING = 60;
  const LETTER_R = 155;

  const isSpinning = state === "spinning";
  // Pulse intensity for explosive idle feel.
  const pulse = 0.85 + 0.15 * Math.sin((rotation / 360) * Math.PI * 2);

  // Static constellation flecks (positioned outside the ring).
  const flecks = [
    { x: 60, y: 70, r: 1.4 },
    { x: 92, y: 48, r: 0.9 },
    { x: 432, y: 90, r: 1.1 },
    { x: 462, y: 168, r: 0.7 },
    { x: 50, y: 332, r: 1.2 },
    { x: 86, y: 412, r: 0.8 },
    { x: 442, y: 416, r: 1.5 },
    { x: 410, y: 460, r: 0.9 },
  ];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Tikkun wheel, press Enter to spin"
      onClick={handleActivate}
      onKeyDown={handleKey}
      className="group relative inline-block cursor-pointer rounded-full outline-none"
      style={{ width: size, height: size }}
    >
      <style>{`
        .tikkun-wheel-focus:focus-visible {
          box-shadow: 0 0 0 2px var(--gold-bright), 0 0 0 8px rgba(240,200,104,0.22);
        }
        @keyframes tikkun-aura-pulse {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.04); }
        }
        @keyframes tikkun-aura-pulse-spin {
          0%, 100% { opacity: 0.95; transform: scale(1.05); }
          50% { opacity: 1; transform: scale(1.12); }
        }
        .tikkun-aura {
          position: absolute;
          inset: -8%;
          border-radius: 9999px;
          background: radial-gradient(circle at 50% 50%, rgba(240,200,104,0.28) 0%, rgba(107,30,38,0.32) 32%, rgba(15,34,30,0) 70%);
          filter: blur(28px);
          animation: tikkun-aura-pulse 4.5s ease-in-out infinite;
          pointer-events: none;
        }
        .tikkun-aura.is-spinning { animation: tikkun-aura-pulse-spin 1.2s ease-in-out infinite; }
      `}</style>

      <div
        className="tikkun-wheel-focus absolute inset-0 rounded-full"
        aria-hidden="true"
      />
      <div
        className={`tikkun-aura ${isSpinning ? "is-spinning" : ""}`}
        aria-hidden="true"
      />
      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>

      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        width={size}
        height={size}
        style={{
          display: "block",
          overflow: "visible",
          filter: isSpinning
            ? "drop-shadow(0 0 28px rgba(240,200,104,0.45))"
            : "drop-shadow(0 0 18px rgba(107,30,38,0.45))",
          transition: "filter 0.4s ease",
        }}
      >
        <defs>
          <radialGradient id="tw-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--gold-bright)" stopOpacity="0.55" />
            <stop offset="38%" stopColor="var(--oxblood)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--forest-deep)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="tw-core-hot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--gold-bright)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--oxblood)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--forest-deep)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="tw-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--gold-bright)" />
            <stop offset="55%" stopColor="var(--gold)" />
            <stop offset="100%" stopColor="var(--gold-deep)" />
          </linearGradient>
          <filter id="tw-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
          <filter id="tw-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center radial glow, intensified */}
        <circle
          cx={C}
          cy={C}
          r={120}
          fill="url(#tw-core-glow)"
          opacity={pulse}
        />
        <circle
          cx={C}
          cy={C}
          r={64}
          fill="url(#tw-core-hot)"
          opacity={isSpinning ? 1 : pulse}
        />

        {/* Constellation accents outside the ring */}
        <g fill="var(--cream)" opacity="0.55">
          {flecks.map((f, i) => (
            <circle key={i} cx={f.x} cy={f.y} r={f.r} />
          ))}
          <path
            d="M60 70 L92 48 L120 64"
            fill="none"
            stroke="var(--cream)"
            strokeWidth="0.25"
            opacity="0.5"
          />
          <path
            d="M432 90 L462 168"
            fill="none"
            stroke="var(--cream)"
            strokeWidth="0.25"
            opacity="0.5"
          />
          <path
            d="M50 332 L86 412"
            fill="none"
            stroke="var(--cream)"
            strokeWidth="0.25"
            opacity="0.5"
          />
        </g>

        {/* Concentric sacred rings */}
        <circle
          cx={C}
          cy={C}
          r={OUTER}
          fill="none"
          stroke="var(--gold-deep)"
          strokeWidth="0.6"
          strokeDasharray="1 4"
          opacity="0.5"
        />
        <circle
          cx={C}
          cy={C}
          r={RING}
          fill="none"
          stroke="url(#tw-ring-gradient)"
          strokeWidth="1.6"
          opacity="0.9"
        />
        <circle
          cx={C}
          cy={C}
          r={INNER_HAIR}
          fill="none"
          stroke="var(--gold-deep)"
          strokeWidth="0.5"
          opacity="0.6"
        />
        <circle
          cx={C}
          cy={C}
          r={CORE_RING}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* Rotating wheel group: spokes + bold letters */}
        <g transform={`rotate(${rotation} ${C} ${C})`}>
          {/* Asymmetric short spokes for the relic feel */}
          {LETTERS.map((_, i) => {
            const a = (i * SLICE_DEG - 90) * (Math.PI / 180);
            const r1 = i % 2 === 0 ? CORE_RING + 5 : CORE_RING + 28;
            const r2 = LETTER_R - 22;
            const x1 = C + Math.cos(a) * r1;
            const y1 = C + Math.sin(a) * r1;
            const x2 = C + Math.cos(a) * r2;
            const y2 = C + Math.sin(a) * r2;
            return (
              <line
                key={`spoke-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--gold)"
                strokeWidth="0.4"
                opacity="0.22"
              />
            );
          })}

          {/* Bold Hebrew letters, counter-rotated to stay upright */}
          {LETTERS.map((l, i) => {
            const a = (i * SLICE_DEG - 90) * (Math.PI / 180);
            const x = C + Math.cos(a) * LETTER_R;
            const y = C + Math.sin(a) * LETTER_R;
            const isTop = i === 0;
            return (
              <text
                key={l.glyph + i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isTop ? "var(--gold-bright)" : "var(--cream-soft)"}
                fontFamily="Frank Ruhl Libre, serif"
                fontWeight={700}
                fontSize="36"
                filter={isTop ? "url(#tw-strong)" : "url(#tw-soft)"}
                transform={`rotate(${-rotation} ${x} ${y})`}
                style={{ letterSpacing: "0.02em" }}
              >
                {l.glyph}
              </text>
            );
          })}
        </g>

        {/* Bright pivot core */}
        <circle
          cx={C}
          cy={C}
          r="4"
          fill="var(--gold-bright)"
          filter="url(#tw-strong)"
        />
        <circle cx={C} cy={C} r="1.6" fill="var(--cream-soft)" />

        {/* Indicator notch — sits just inside the outer ring */}
        <path
          d={`M ${C - 9} ${C - RING - 4} L ${C + 9} ${C - RING - 4} L ${C} ${C - RING + 12} Z`}
          fill="var(--gold-bright)"
          filter="url(#tw-strong)"
        />
      </svg>
    </div>
  );
}

