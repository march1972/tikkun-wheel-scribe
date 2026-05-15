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

interface TikkunWheelProps {
  size?: number;
  state?: "idle" | "spinning" | "stopped";
  targetKey?: string | null;
  targetIndex?: number | null;
  highlightLetter?: string | null;
  onClick?: () => void;
  onSettle?: (letter: { glyph: string; name: string }) => void;
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
  const ringGradId = `tk-ring-${uid}`;
  const alephId = `tk-aleph-${uid}`;

  const cx = size / 2;
  const cy = size / 2;
  const ringR = size * 0.464;
  const letterR = size * 0.393;
  const alephR = size * 0.143;
  const letterFontSize = size * 0.075;
  const alephFontSize = size * 0.125;

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
        ? { animation: `tk-slow-spin-${uid} 75s linear infinite` }
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
      }}
    >
      <style>{`
        @keyframes tk-slow-spin-${uid} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .tk-wheel:focus-visible {
          box-shadow: 0 0 0 2px ${accent}, 0 0 0 8px rgba(240,200,104,0.22);
          border-radius: 9999px;
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
            <stop offset="0%" stopColor={accentBright} stopOpacity="0.6" />
            <stop offset="50%" stopColor={accent} stopOpacity="0.2" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={ringGradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE9B8" />
            <stop offset="50%" stopColor={accent} />
            <stop offset="100%" stopColor="#C99245" />
          </linearGradient>
          <radialGradient id={alephId} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#6b1e26" />
            <stop offset="60%" stopColor="#3a1820" />
            <stop offset="100%" stopColor="#1f1014" />
          </radialGradient>
        </defs>

        {/* Central glow */}
        <circle cx={cx} cy={cy} r={size * 0.27} fill={`url(#${glowId})`} />

        {/* Outer gold ring (static, doesn't rotate) */}
        <circle
          cx={cx}
          cy={cy}
          r={ringR}
          fill="none"
          stroke={`url(#${ringGradId})`}
          strokeWidth={size * 0.011}
        />

        {/* Rotating group: inner rings, spokes, letters */}
        <g style={{ ...ringTransform, transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={ringR * 0.35} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.32} />
          <circle cx={cx} cy={cy} r={ringR * 0.5} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.26} />
          <circle cx={cx} cy={cy} r={ringR * 0.65} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.22} />

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

          {LETTERS.map((letter, i) => {
            const angleRad = (-90 + i * 30) * (Math.PI / 180);
            const lx = cx + letterR * Math.cos(angleRad);
            const ly = cy + letterR * Math.sin(angleRad);
            const isHighlighted = highlightLetter === letter && state === "stopped";
            const isAccentSlot = i % 3 === 2;
            const baseColor = isAccentSlot ? accentBright : text;
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
              >
                {letter}
              </text>
            );
          })}
        </g>

        {/* Central aleph medallion */}
        <circle
          cx={cx}
          cy={cy}
          r={alephR}
          fill={`url(#${alephId})`}
          stroke="rgb(243, 219, 157)"
          strokeWidth={size * 0.008}
        />
        <text
          x={cx}
          y={cy}
          fill={accentBright}
          fontSize={alephFontSize}
          fontFamily="'Fraunces', serif"
          fontStyle="italic"
          fontWeight={500}
          textAnchor="middle"
          dominantBaseline="central"
        >
          א
        </text>
      </svg>
    </div>
  );
}
