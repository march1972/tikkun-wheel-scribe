import { useEffect, useId, useRef, useState, useCallback } from "react";

// Order matches the original prototype data.js: TIKKUN_LETTERS
const LETTERS = ["ה", "ו", "ז", "ח", "ט", "י", "ל", "נ", "ס", "ע", "צ", "ק"];
const NAMES: Record<string, string> = {
  "ה": "Hei", "ו": "Vav", "ז": "Zayin", "ח": "Chet", "ט": "Tet", "י": "Yud",
  "ל": "Lamed", "נ": "Nun", "ס": "Samekh", "ע": "Ayin", "צ": "Tsadi", "ק": "Qof",
};

// Sign keys map to a letter index (kept for the existing routes).
const SIGN_KEY_TO_INDEX: Record<string, number> = {
  aries: 0, taurus: 1, gemini: 2, cancer: 3, leo: 4, virgo: 5,
  libra: 6, scorpio: 7, sagittarius: 8, capricorn: 9, aquarius: 10, pisces: 11,
};

// Fixed sparkle positions inside the wheel — polar (angle deg, radius fraction of ringR).
const SPARKLES: Array<[number, number, number]> = [
  [22, 0.78, 1.4],
  [108, 0.6, 1.1],
  [165, 0.82, 1.6],
  [248, 0.55, 1.0],
  [312, 0.74, 1.3],
];

interface TikkunWheelProps {
  size?: number;
  state?: "idle" | "spinning" | "stopped";
  targetKey?: string | null;
  targetIndex?: number | null;
  highlightLetter?: string | null;
  onClick?: () => void;
  onSettle?: (letter: { glyph: string; name: string }) => void;
  hideCenterLabel?: boolean;
}

export function TikkunWheel({
  size = 240,
  state = "idle",
  targetKey,
  targetIndex,
  highlightLetter = null,
  onClick,
  onSettle,
}: TikkunWheelProps) {
  const uid = useId().replace(/[:]/g, "");
  const glowId = `tk-glow-${uid}`;
  const auraId = `tk-aura-${uid}`;
  const ringGradId = `tk-ring-${uid}`;
  const alephId = `tk-aleph-${uid}`;
  const alephHaloId = `tk-aleph-halo-${uid}`;
  const letterGlowId = `tk-letter-glow-${uid}`;

  const cx = size / 2;
  const cy = size / 2;
  const ringR = size * 0.464;
  const letterR = size * 0.393;
  const alephR = size * 0.10;
  const letterFontSize = size * 0.075;
  const alephFontSize = size * 0.042;

  // Brand palette (matches src/styles.css tokens).
  const accent = "#f0c868";       // gold-bright
  const accentBright = "#FFE9B8"; // soft gold highlight
  const text = "#f4ecdb";         // cream

  const resolvedTarget =
    typeof targetIndex === "number"
      ? targetIndex
      : targetKey && targetKey in SIGN_KEY_TO_INDEX
        ? SIGN_KEY_TO_INDEX[targetKey]
        : null;

  const [spinAngle, setSpinAngle] = useState(0);
  const settledRef = useRef(false);

  // Trigger the spin: rotate to target letter + 4 extra turns, ease-out.
  useEffect(() => {
    if (state !== "spinning" || resolvedTarget === null) return;
    settledRef.current = false;
    const targetOffset = -resolvedTarget * 30;
    const id = requestAnimationFrame(() => {
      setSpinAngle((a) => {
        const currentMod = ((a % 360) + 360) % 360;
        const desiredMod = ((targetOffset % 360) + 360) % 360;
        let delta = desiredMod - currentMod;
        if (delta <= 0) delta += 360;
        return a + delta + 360 * 4;
      });
    });
    const settleId = setTimeout(() => {
      if (settledRef.current) return;
      settledRef.current = true;
      const glyph = LETTERS[resolvedTarget];
      onSettle?.({ glyph, name: NAMES[glyph] });
    }, 2550);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(settleId);
    };
  }, [state, resolvedTarget, onSettle]);

  const ringTransform =
    state === "spinning"
      ? {
          transform: `rotate(${spinAngle}deg)`,
          transition: "transform 2.5s cubic-bezier(0.17, 0.67, 0.16, 0.99)",
        }
      : state === "idle"
        ? { animation: `tk-slow-spin-${uid} 20s linear infinite` }
        : {};

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

  const isIdle = state === "idle";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Tikkun wheel, press Enter to spin"
      onClick={handleActivate}
      onKeyDown={handleKey}
      className="tk-wheel"
      style={{
        width: size,
        height: size,
        position: "relative",
        userSelect: "none",
        cursor: onClick ? "pointer" : "default",
        WebkitTapHighlightColor: "transparent",
        outline: "none",
        transition: "transform 400ms ease",
      }}
    >
      <style>{`
        @keyframes tk-slow-spin-${uid} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes tk-breath-${uid} {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50%      { transform: scale(1.045); opacity: 1; }
        }
        @keyframes tk-halo-${uid} {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 0.95; transform: scale(1.08); }
        }
        @keyframes tk-ripple-${uid} {
          0%   { r: ${ringR * 0.98}; opacity: 0; stroke-width: 1.4; }
          15%  { opacity: 0.55; }
          100% { r: ${ringR * 1.32}; opacity: 0; stroke-width: 0.4; }
        }
        @keyframes tk-twinkle-${uid} {
          0%, 100% { opacity: 0.25; }
          50%      { opacity: 0.95; }
        }
        @keyframes tk-shine-${uid} {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%      { opacity: 0.9;  transform: scale(1.08); }
        }
        .tk-cta-shine-${uid} {
          transform-origin: ${cx}px ${cy}px;
          animation: tk-shine-${uid} 2.4s ease-in-out infinite;
        }
        .tk-wheel:hover { transform: scale(1.02); }
        .tk-wheel:hover .tk-cta-bg-${uid} {
          filter: drop-shadow(0 0 32px rgba(255,252,235,1)) drop-shadow(0 0 60px rgba(255,246,214,0.85));
          transform: scale(1.06);
          transform-origin: ${cx}px ${cy}px;
        }
        .tk-wheel:hover .tk-cta-shine-${uid} {
          opacity: 1 !important;
          transform: scale(1.15);
          transform-origin: ${cx}px ${cy}px;
        }
        .tk-cta-bg-${uid} { transition: filter 220ms ease, transform 220ms ease; transform-origin: ${cx}px ${cy}px; }
        .tk-wheel:focus-visible {
          box-shadow: 0 0 0 2px ${accent}, 0 0 0 8px rgba(240,200,104,0.22);
          border-radius: 9999px;
        }
        .tk-aleph-${uid} {
          transform-origin: ${cx}px ${cy}px;
          ${isIdle ? `animation: tk-breath-${uid} 2.4s ease-in-out infinite;` : ""}
        }
        .tk-aleph-halo-${uid} {
          transform-origin: ${cx}px ${cy}px;
          ${isIdle ? `animation: tk-halo-${uid} 3.6s ease-in-out 0.6s infinite;` : "opacity: 0.7;"}
        }
        .tk-ripple-${uid} {
          ${isIdle ? `animation: tk-ripple-${uid} 3.2s ease-out infinite;` : "opacity: 0;"}
        }
        .tk-ripple2-${uid} {
          ${isIdle ? `animation: tk-ripple-${uid} 3.2s ease-out 0.8s infinite;` : "opacity: 0;"}
        }
        .tk-ripple3-${uid} {
          ${isIdle ? `animation: tk-ripple-${uid} 3.2s ease-out 1.6s infinite;` : "opacity: 0;"}
        }
        .tk-ripple4-${uid} {
          ${isIdle ? `animation: tk-ripple-${uid} 3.2s ease-out 2.4s infinite;` : "opacity: 0;"}
        }
        .tk-spark-${uid} {
          ${isIdle ? `animation: tk-twinkle-${uid} 3.4s ease-in-out infinite;` : ""}
        }
      `}</style>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: "visible", display: "block" }}
      >
        <defs>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentBright} stopOpacity="0.7" />
            <stop offset="45%" stopColor={accent} stopOpacity="0.28" />
            <stop offset="100%" stopColor="#6b1e26" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={auraId} cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor={accent} stopOpacity="0" />
            <stop offset="82%" stopColor={accent} stopOpacity="0.18" />
            <stop offset="100%" stopColor="#6b1e26" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={alephHaloId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentBright} stopOpacity="0.85" />
            <stop offset="55%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={ringGradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE9B8" />
            <stop offset="50%" stopColor={accent} />
            <stop offset="100%" stopColor="#C99245" />
          </linearGradient>
          <radialGradient id={alephId} cx="50%" cy="38%" r="70%">
            <stop offset="0%" stopColor="#fdf6e6" />
            <stop offset="55%" stopColor="#f1e6c8" />
            <stop offset="100%" stopColor="#d8c79b" />
          </radialGradient>
          <filter id={letterGlowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={size * 0.006} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer aura outside the gold ring */}
        <circle cx={cx} cy={cy} r={ringR * 1.18} fill={`url(#${auraId})`} />

        {/* Tap-affordance ripples */}
        <circle
          className={`tk-ripple-${uid}`}
          cx={cx}
          cy={cy}
          r={ringR}
          fill="none"
          stroke={accentBright}
          strokeWidth={1.2}
        />
        <circle
          className={`tk-ripple2-${uid}`}
          cx={cx}
          cy={cy}
          r={ringR}
          fill="none"
          stroke="#f4b5be"
          strokeWidth={1.2}
        />
        <circle
          className={`tk-ripple3-${uid}`}
          cx={cx}
          cy={cy}
          r={ringR}
          fill="none"
          stroke={accent}
          strokeWidth={1.2}
        />
        <circle
          className={`tk-ripple4-${uid}`}
          cx={cx}
          cy={cy}
          r={ringR}
          fill="none"
          stroke="#f4b5be"
          strokeWidth={1.2}
        />

        {/* Central glow */}
        <circle cx={cx} cy={cy} r={size * 0.3} fill={`url(#${glowId})`} />

        {/* Outer gold ring (static, doesn't rotate) */}
        <circle
          cx={cx}
          cy={cy}
          r={ringR}
          fill="none"
          stroke={`url(#${ringGradId})`}
          strokeWidth={size * 0.011}
        />

        {/* Rotating group: inner rings, spokes, sparkles, letters */}
        <g style={{ ...ringTransform, transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={ringR * 0.28} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.32} />
          <circle cx={cx} cy={cy} r={ringR * 0.42} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.36} />
          <circle cx={cx} cy={cy} r={ringR * 0.56} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.3} />
          <circle cx={cx} cy={cy} r={ringR * 0.72} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.24} />

          {LETTERS.map((_, i) => {
            const angleRad = (-90 + i * 30) * (Math.PI / 180);
            const x2 = cx + ringR * Math.cos(angleRad);
            const y2 = cy + ringR * Math.sin(angleRad);
            return (
              <line
                key={`spoke-${i}`}
                x1={cx}
                y1={cy}
                x2={x2}
                y2={y2}
                stroke={accent}
                strokeWidth={0.5}
                opacity={0.18}
              />
            );
          })}

          {/* Mystical sparkles */}
          {SPARKLES.map(([deg, rFrac, dotR], i) => {
            const a = (deg - 90) * (Math.PI / 180);
            const sx = cx + ringR * rFrac * Math.cos(a);
            const sy = cy + ringR * rFrac * Math.sin(a);
            return (
              <circle
                key={`spark-${i}`}
                className={`tk-spark-${uid}`}
                cx={sx}
                cy={sy}
                r={dotR}
                fill={accentBright}
                style={{ animationDelay: `${i * 0.45}s` }}
                filter={`url(#${letterGlowId})`}
              />
            );
          })}

          {LETTERS.map((letter, i) => {
            const angleDeg = -90 + i * 30 + 15; // +15° centers letter between spokes
            const angleRad = angleDeg * (Math.PI / 180);
            const lx = cx + letterR * Math.cos(angleRad);
            const ly = cy + letterR * Math.sin(angleRad);
            const isHighlighted = highlightLetter === letter && state === "stopped";
            const isAccentSlot = i % 3 === 2;
            const baseColor = isAccentSlot ? accentBright : text;
            const rotation = angleDeg + 90; // top of letter points outward
            return (
              <text
                key={`${letter}-${i}`}
                x={lx}
                y={ly}
                fill={isHighlighted ? accentBright : baseColor}
                fontSize={isHighlighted ? letterFontSize * 1.35 : letterFontSize}
                fontFamily="'Frank Ruhl Libre', 'Fraunces', serif"
                fontWeight={isHighlighted ? 600 : isAccentSlot ? 500 : 400}
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${rotation} ${lx} ${ly})`}
                filter={isAccentSlot || isHighlighted ? `url(#${letterGlowId})` : undefined}
              >
                {letter}
              </text>
            );
          })}
        </g>

        {/* Aleph halo (pulses) */}
        <circle
          className={`tk-aleph-halo-${uid}`}
          cx={cx}
          cy={cy}
          r={alephR * 1.55}
          fill={`url(#${alephHaloId})`}
        />

        {/* Central CTA medallion (breathes) */}
        <g className={`tk-aleph-${uid} tk-cta-${uid}`} style={{ cursor: "pointer" }}>
          {/* Outer radiant glow — pulses like emanating white light */}
          <circle
            className={`tk-cta-shine-${uid}`}
            cx={cx}
            cy={cy}
            r={alephR * 1.4}
            fill="none"
            stroke="rgba(255, 252, 235, 0.55)"
            strokeWidth={size * 0.01}
            style={{ filter: "blur(3px)" }}
          />
          {/* Main medallion — soft moonlight white */}
          <circle
            className={`tk-cta-bg-${uid}`}
            cx={cx}
            cy={cy}
            r={alephR}
            fill={`url(#${alephId})`}
            stroke="none"
            style={{
              transition: "filter 200ms ease",
              filter: "drop-shadow(0 0 16px rgba(255,252,235,0.85)) drop-shadow(0 0 34px rgba(255,246,214,0.55))",
            }}
          />
          <text
            x={cx}
            y={cy - size * 0.005}
            fill="#1b2540"
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
              fontWeight: 500,
              fontSize: `${Math.max(9, Math.min(15, size * 0.028))}px`,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
            textAnchor="middle"
            dominantBaseline="central"
          >
            enter
          </text>
          <text
            x={cx}
            y={cy + size * 0.032}
            fill="#1b2540"
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
              fontWeight: 500,
              fontSize: `${Math.max(8, Math.min(12, size * 0.022))}px`,
              letterSpacing: "0.2em",
            }}
            textAnchor="middle"
            dominantBaseline="central"
          >
            ↓
          </text>
        </g>
      </svg>
    </div>
  );
}
