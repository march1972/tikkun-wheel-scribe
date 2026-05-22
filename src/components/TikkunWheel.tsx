import { useEffect, useId, useRef, useState, useCallback } from "react";

// Order matches the original prototype data.js: TIKKUN_LETTERS
const LETTERS = ["ה", "ו", "ז", "ח", "ט", "י", "ל", "נ", "ס", "ע", "צ", "ק"];
const NAMES: Record<string, string> = {
  "ה": "Hei", "ו": "Vav", "ז": "Zayin", "ח": "Chet", "ט": "Tet", "י": "Yud",
  "ל": "Lamed", "נ": "Nun", "ס": "Samekh", "ע": "Ayin", "צ": "Tsadi", "ק": "Qof",
};

const SIGN_KEY_TO_INDEX: Record<string, number> = {
  aries: 0, taurus: 1, gemini: 2, cancer: 3, leo: 4, virgo: 5,
  libra: 6, scorpio: 7, sagittarius: 8, capricorn: 9, aquarius: 10, pisces: 11,
};

// All geometry below uses a fixed 1000x1000 viewBox so SSR and CSR agree
// on every numeric SVG attribute. The container scales via CSS.
const VB = 1000;
const CX = 500;
const CY = 500;
const RING_R = 464;
const LETTER_R = 393;
const ALEPH_R = 100;
const LETTER_FS = 75;

// Round helper to keep SVG attribute strings byte-identical between SSR/CSR.
const r2 = (n: number) => Math.round(n * 100) / 100;

// Fixed sparkle positions inside the wheel — polar (angle deg, radius fraction of RING_R, dot radius units).
const SPARKLES: Array<[number, number, number]> = [
  [22, 0.78, 6],
  [108, 0.6, 5],
  [165, 0.82, 7],
  [248, 0.55, 4],
  [312, 0.74, 6],
];

interface TikkunWheelProps {
  /** Optional pixel size. When omitted, the wheel fills its parent (parent must size it). */
  size?: number;
  state?: "idle" | "spinning" | "stopped";
  targetKey?: string | null;
  targetIndex?: number | null;
  highlightLetter?: string | null;
  onClick?: () => void;
  onSettle?: (letter: { glyph: string; name: string }) => void;
}

// Inject the wheel stylesheet once per page. Animations use fixed numbers
// (the viewBox is constant), so there is nothing dynamic to template.
let stylesInjected = false;
function ensureStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  stylesInjected = true;
  const css = `
    .tk-wheel { user-select: none; -webkit-tap-highlight-color: transparent; outline: none; transition: transform 320ms ease; display: inline-block; }
    .tk-wheel:hover { transform: scale(1.02); }
    .tk-wheel:focus-visible { box-shadow: 0 0 0 2px #f0c868, 0 0 0 8px rgba(240,200,104,0.22); border-radius: 9999px; }
    .tk-wheel svg { display: block; overflow: visible; width: 100%; height: 100%; }

    @keyframes tk-slow-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes tk-breath { 0%,100%{transform:scale(1);opacity:.95} 50%{transform:scale(1.045);opacity:1} }
    @keyframes tk-halo { 0%,100%{opacity:.55;transform:scale(1)} 50%{opacity:.95;transform:scale(1.08)} }
    @keyframes tk-ripple { 0%{r:454;opacity:0;stroke-width:1.4} 15%{opacity:.55} 100%{r:612;opacity:0;stroke-width:.4} }
    @keyframes tk-twinkle { 0%,100%{opacity:.25} 50%{opacity:.95} }
    @keyframes tk-shine { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:.9;transform:scale(1.08)} }

    .tk-rot-idle { animation: tk-slow-spin 20s linear infinite; transform-origin: 500px 500px; }
    .tk-aleph-idle { transform-origin: 500px 500px; animation: tk-breath 2.4s ease-in-out infinite; }
    .tk-halo-idle { transform-origin: 500px 500px; animation: tk-halo 3.6s ease-in-out .6s infinite; }
    .tk-halo-static { transform-origin: 500px 500px; opacity: .7; }
    .tk-ripple { animation: tk-ripple 3.2s ease-out infinite; }
    .tk-ripple.d1 { animation-delay: .8s; }
    .tk-ripple.d2 { animation-delay: 1.6s; }
    .tk-ripple.d3 { animation-delay: 2.4s; }
    .tk-spark { animation: tk-twinkle 3.4s ease-in-out infinite; }
    .tk-shine { transform-origin: 500px 500px; animation: tk-shine 2.4s ease-in-out infinite; }
    .tk-wheel:hover .tk-cta-bg { filter: drop-shadow(0 0 32px rgba(255,252,235,1)) drop-shadow(0 0 60px rgba(255,246,214,.85)); transform: scale(1.06); transform-origin: 500px 500px; }
    .tk-cta-bg { transition: filter 220ms ease, transform 220ms ease; transform-origin: 500px 500px; filter: drop-shadow(0 0 16px rgba(255,252,235,.85)) drop-shadow(0 0 34px rgba(255,246,214,.55)); }

    @media (prefers-reduced-motion: reduce) {
      .tk-rot-idle, .tk-aleph-idle, .tk-halo-idle, .tk-ripple, .tk-spark, .tk-shine { animation: none !important; }
    }
  `;
  const tag = document.createElement("style");
  tag.setAttribute("data-tk", "wheel");
  tag.appendChild(document.createTextNode(css));
  document.head.appendChild(tag);
}

export function TikkunWheel({
  size,
  state = "idle",
  targetKey,
  targetIndex,
  highlightLetter = null,
  onClick,
  onSettle,
}: TikkunWheelProps) {
  ensureStyles();
  const uid = useId().replace(/[:]/g, "");
  const glowId = `g-${uid}`;
  const auraId = `a-${uid}`;
  const ringGradId = `rg-${uid}`;
  const alephId = `al-${uid}`;
  const alephHaloId = `ah-${uid}`;
  const letterGlowId = `lg-${uid}`;

  const accent = "#f0c868";
  const accentBright = "#FFE9B8";
  const text = "#f4ecdb";

  const resolvedTarget =
    typeof targetIndex === "number"
      ? targetIndex
      : targetKey && targetKey in SIGN_KEY_TO_INDEX
        ? SIGN_KEY_TO_INDEX[targetKey]
        : null;

  const [spinAngle, setSpinAngle] = useState(0);
  const settledRef = useRef(false);

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
  const isSpinning = state === "spinning";

  const rotStyle: React.CSSProperties = isSpinning
    ? {
        transform: `rotate(${spinAngle}deg)`,
        transition: "transform 2.5s cubic-bezier(0.17, 0.67, 0.16, 0.99)",
        transformOrigin: `${CX}px ${CY}px`,
      }
    : { transformOrigin: `${CX}px ${CY}px` };

  const containerStyle: React.CSSProperties = size
    ? { width: size, height: size }
    : { width: "100%", height: "100%" };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Tikkun wheel, press Enter to spin"
      onClick={handleActivate}
      onKeyDown={handleKey}
      className="tk-wheel"
      style={{
        ...containerStyle,
        position: "relative",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <svg viewBox={`0 0 ${VB} ${VB}`} preserveAspectRatio="xMidYMid meet">
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
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={CX} cy={CY} r={r2(RING_R * 1.18)} fill={`url(#${auraId})`} />

        {isIdle && (
          <>
            <circle className="tk-ripple" cx={CX} cy={CY} r={RING_R} fill="none" stroke={accentBright} strokeWidth={1.2} />
            <circle className="tk-ripple d1" cx={CX} cy={CY} r={RING_R} fill="none" stroke="#f4b5be" strokeWidth={1.2} />
            <circle className="tk-ripple d2" cx={CX} cy={CY} r={RING_R} fill="none" stroke={accent} strokeWidth={1.2} />
            <circle className="tk-ripple d3" cx={CX} cy={CY} r={RING_R} fill="none" stroke="#f4b5be" strokeWidth={1.2} />
          </>
        )}

        <circle cx={CX} cy={CY} r={300} fill={`url(#${glowId})`} />

        <circle cx={CX} cy={CY} r={RING_R} fill="none" stroke={`url(#${ringGradId})`} strokeWidth={11} />

        <g className={isIdle ? "tk-rot-idle" : ""} style={rotStyle}>
          <circle cx={CX} cy={CY} r={r2(RING_R * 0.28)} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.32} />
          <circle cx={CX} cy={CY} r={r2(RING_R * 0.42)} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.36} />
          <circle cx={CX} cy={CY} r={r2(RING_R * 0.56)} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.3} />
          <circle cx={CX} cy={CY} r={r2(RING_R * 0.72)} fill="none" stroke={accent} strokeWidth={0.5} opacity={0.24} />

          {LETTERS.map((_, i) => {
            const angleRad = (-90 + i * 30) * (Math.PI / 180);
            const x2 = r2(CX + RING_R * Math.cos(angleRad));
            const y2 = r2(CY + RING_R * Math.sin(angleRad));
            return (
              <line key={`spoke-${i}`} x1={CX} y1={CY} x2={x2} y2={y2} stroke={accent} strokeWidth={0.5} opacity={0.18} />
            );
          })}

          {SPARKLES.map(([deg, rFrac, dotR], i) => {
            const a = (deg - 90) * (Math.PI / 180);
            const sx = r2(CX + RING_R * rFrac * Math.cos(a));
            const sy = r2(CY + RING_R * rFrac * Math.sin(a));
            return (
              <circle
                key={`spark-${i}`}
                className={isIdle ? "tk-spark" : undefined}
                cx={sx}
                cy={sy}
                r={dotR}
                fill={accentBright}
                style={isIdle ? { animationDelay: `${i * 0.45}s` } : undefined}
                filter={`url(#${letterGlowId})`}
              />
            );
          })}

          {LETTERS.map((letter, i) => {
            const angleDeg = -90 + i * 30 + 15;
            const angleRad = angleDeg * (Math.PI / 180);
            const lx = r2(CX + LETTER_R * Math.cos(angleRad));
            const ly = r2(CY + LETTER_R * Math.sin(angleRad));
            const isHighlighted = highlightLetter === letter && state === "stopped";
            const isAccentSlot = i % 3 === 2;
            const baseColor = isAccentSlot ? accentBright : text;
            const rotation = r2(angleDeg + 90);
            return (
              <text
                key={`${letter}-${i}`}
                x={lx}
                y={ly}
                fill={isHighlighted ? accentBright : baseColor}
                fontSize={isHighlighted ? r2(LETTER_FS * 1.35) : LETTER_FS}
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

        <circle
          className={isIdle ? "tk-halo-idle" : "tk-halo-static"}
          cx={CX}
          cy={CY}
          r={r2(ALEPH_R * 1.55)}
          fill={`url(#${alephHaloId})`}
        />

        <g className={isIdle ? "tk-aleph-idle" : ""} style={{ cursor: "pointer", transformOrigin: `${CX}px ${CY}px` }}>
          {isIdle && (
            <circle
              className="tk-shine"
              cx={CX}
              cy={CY}
              r={r2(ALEPH_R * 1.4)}
              fill="none"
              stroke="rgba(255, 252, 235, 0.55)"
              strokeWidth={10}
              style={{ filter: "blur(3px)" }}
            />
          )}
          <circle className="tk-cta-bg" cx={CX} cy={CY} r={ALEPH_R} fill={`url(#${alephId})`} />
          <text
            x={CX}
            y={CY - 5}
            fill="#1b2540"
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
              fontWeight: 500,
              fontSize: "28px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
            textAnchor="middle"
            dominantBaseline="central"
          >
            enter
          </text>
          <text
            x={CX}
            y={CY + 32}
            fill="#1b2540"
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
              fontWeight: 500,
              fontSize: "22px",
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
