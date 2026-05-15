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

  const VB = 320;
  const C = VB / 2;
  const RING = 138;
  const LETTER_R = 112;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Tikkun wheel, press Enter to spin"
      onClick={handleActivate}
      onKeyDown={handleKey}
      className="group relative inline-block cursor-pointer rounded-full outline-none"
      style={{
        width: size,
        height: size,
      }}
    >
      <style>{`
        .tikkun-wheel-focus:focus-visible {
          box-shadow: 0 0 0 2px var(--gold-bright), 0 0 0 6px rgba(240,200,104,0.25);
        }
      `}</style>
      <div
        className="tikkun-wheel-focus absolute inset-0 rounded-full"
        aria-hidden="true"
      />
      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>

      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        width={size}
        height={size}
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient
            id="tw-ring-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--gold-bright)" />
            <stop offset="55%" stopColor="var(--gold)" />
            <stop offset="100%" stopColor="var(--gold-deep)" />
          </linearGradient>
          <radialGradient id="tw-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--gold-bright)" stopOpacity="0.55" />
            <stop offset="35%" stopColor="var(--oxblood)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--forest-deep)" stopOpacity="0" />
          </radialGradient>
          <filter id="tw-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft radial glow center */}
        <circle cx={C} cy={C} r={RING - 8} fill="url(#tw-core)" />

        {/* Faint inner rings */}
        <circle
          cx={C}
          cy={C}
          r={RING - 22}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="0.5"
          opacity="0.25"
        />
        <circle
          cx={C}
          cy={C}
          r={RING - 50}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="0.5"
          opacity="0.25"
        />
        <circle
          cx={C}
          cy={C}
          r={RING - 80}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="0.5"
          opacity="0.25"
        />

        {/* Rotating wheel group: spokes + letters */}
        <g transform={`rotate(${rotation} ${C} ${C})`}>
          {/* 12 spokes */}
          {LETTERS.map((_, i) => {
            const a = (i * SLICE_DEG - 90) * (Math.PI / 180);
            const x = C + Math.cos(a) * (RING - 4);
            const y = C + Math.sin(a) * (RING - 4);
            return (
              <line
                key={`spoke-${i}`}
                x1={C}
                y1={C}
                x2={x}
                y2={y}
                stroke="var(--gold)"
                strokeWidth="0.6"
                opacity="0.25"
              />
            );
          })}

          {/* Letters: counter-rotate each so it stays upright */}
          {LETTERS.map((l, i) => {
            const a = (i * SLICE_DEG - 90) * (Math.PI / 180);
            const x = C + Math.cos(a) * LETTER_R;
            const y = C + Math.sin(a) * LETTER_R;
            return (
              <text
                key={l.glyph + i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--gold-bright)"
                fontFamily="Frank Ruhl Libre, serif"
                fontSize="26"
                filter="url(#tw-glow)"
                transform={`rotate(${-rotation} ${x} ${y})`}
              >
                {l.glyph}
              </text>
            );
          })}
        </g>

        {/* Bright core dot */}
        <circle
          cx={C}
          cy={C}
          r="3"
          fill="var(--gold-bright)"
          filter="url(#tw-glow)"
        />

        {/* Outer ring with gold gradient (drawn last so it sits on top) */}
        <circle
          cx={C}
          cy={C}
          r={RING}
          fill="none"
          stroke="url(#tw-ring-gradient)"
          strokeWidth="1.6"
        />
        <circle
          cx={C}
          cy={C}
          r={RING + 6}
          fill="none"
          stroke="var(--gold-deep)"
          strokeWidth="0.5"
          opacity="0.6"
        />

        {/* Indicator notch at top */}
        <path
          d={`M ${C} ${C - RING - 10} L ${C - 7} ${C - RING + 2} L ${C + 7} ${C - RING + 2} Z`}
          fill="var(--gold-bright)"
          filter="url(#tw-glow)"
        />
      </svg>
    </div>
  );
}
