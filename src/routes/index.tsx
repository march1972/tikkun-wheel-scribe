import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TikkunWheel } from "@/components/TikkunWheel";
import { SefirotTree } from "@/components/SefirotTree";
import { useResponsiveWheelSize } from "@/hooks/useResponsiveWheelSize";
import { randomSign } from "@/lib/bundle";
import {
  MAX_SPINS,
  getAttempts,
  incrementAttempt,
} from "@/lib/spinAttempts";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Kabbalah Astrology — What's Your Tikkun?" },
      {
        name: "description",
        content:
          "Kabbalah Astrology maps your Tikkun — the soul's pattern of correction that signals how to fulfill your life's potential in relationships, finances, and career.",
      },
      { property: "og:title", content: "Kabbalah Astrology — What's Your Tikkun?" },
      {
        property: "og:description",
        content:
          "Map your Tikkun. A free reading rooted in the Sefer Yetzirah and the Zohar.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

// ── Night-into-dawn palette ──────────────────────────────────────
// Deep indigo / blue-grey body that harmonizes with the gold wheel.
// A small warm horizon glow at the very top corner hints at dawn
// without competing with the wheel's gold.
const HEAD = "var(--font-serif)";
const BODY = "var(--font-sans)";

const C_SKY_GRAD =
  "radial-gradient(55% 35% at 88% 0%, rgba(245,207,122,0.18) 0%, rgba(245,207,122,0) 60%), radial-gradient(70% 45% at 10% 100%, rgba(120,150,190,0.18) 0%, rgba(120,150,190,0) 65%), linear-gradient(180deg, #141d33 0%, #1b2540 28%, #233055 55%, #2a3a5e 80%, #324468 100%)";

// Bands deepen toward the middle of the page, then lift toward dawn at the bottom.
const C_BAND_DEEP =
  "linear-gradient(180deg, #131c34 0%, #0f1729 50%, #131c34 100%)";
const C_BAND_MID =
  "linear-gradient(180deg, #1a2440 0%, #1f2b48 50%, #1a2440 100%)";
const C_BAND_LIFT =
  "linear-gradient(180deg, #233055 0%, #2a3a5e 50%, #324468 100%)";

const C_INK = "#fdf6e6";            // moonlight cream
const C_INK_SOFT = "#ece3cf";
const C_MUTED = "rgba(236, 227, 207, 0.62)";
const C_GOLD = "#f0c868";           // wheel gold (matches TikkunWheel)
const C_GOLD_BRIGHT = "#FFE9B8";
const C_DAWN = "#ffb088";           // dawn coral — reserved for accents only
const C_SAGE = "#9bd1bf";           // sage mint — secondary accent
const C_DEEP = "#0f1729";           // near-black indigo
const C_RULE = "rgba(253, 246, 230, 0.20)";
const C_RULE_SOFT = "rgba(253, 246, 230, 0.10)";


/** Scattered stars with twinkle + slow parallax drift. */
function StarField({
  density = 90,
  opacity = 0.7,
  seedOffset = 0,
  driftSeconds = 90,
}: {
  density?: number;
  opacity?: number;
  seedOffset?: number;
  driftSeconds?: number;
}) {
  const stars = Array.from({ length: density }).map((_, i) => {
    const seed = ((i + seedOffset) * 9301 + 49297) % 233280;
    const r = (n: number) =>
      ((seed * (n + 1) * 1103515245 + 12345) % 2147483648) / 2147483648;
    const left = r(1) * 100;
    const top = r(2) * 100;
    const v = r(3);
    const big = v > 0.92;
    const mid = v > 0.78 && !big;
    const size = big ? 2.5 : mid ? 1.6 : 1;
    const o = 0.45 + r(4) * 0.55;
    const tint = r(5);
    const bg =
      tint > 0.93
        ? "#a8c8e8" // cool moonlight cyan
        : tint > 0.86
          ? "#ffd6b8" // dawn warmth
          : "#fffdf3";
    return (
      <span
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: bg,
          opacity: o * opacity,
          boxShadow: big
            ? "0 0 8px rgba(245,207,122,0.85), 0 0 14px rgba(255,176,136,0.4)"
            : mid
              ? "0 0 4px rgba(253,246,230,0.6)"
              : undefined,
        }}
      />
    );
  });
  const driftName = `tk-drift-${seedOffset}`;
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <style>{`
        @keyframes ${driftName} {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(-2%, -1.2%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
      <div
        className="absolute inset-0"
        style={{
          animation: `${driftName} ${driftSeconds}s ease-in-out infinite`,
          willChange: "transform",
        }}
      >
        {stars}
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1" style={{ background: C_RULE }} />
      <span
        style={{
          fontFamily: BODY,
          color: C_INK_SOFT,
          fontSize: "11px",
          letterSpacing: "0.36em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {children}
      </span>
      <span className="h-px flex-1" style={{ background: C_RULE }} />
    </div>
  );
}

function PrimaryCTA({
  onClick,
  label = "Who you are",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-3 uppercase transition-all duration-300 hover:scale-[1.04] hover:brightness-110 hover:gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c868] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1b2540]"
      style={{
        background: `linear-gradient(135deg, ${C_GOLD_BRIGHT} 0%, ${C_GOLD} 100%)`,
        color: C_DEEP,
        fontFamily: BODY,
        fontWeight: 700,
        letterSpacing: "0.28em",
        fontSize: "clamp(11px, 1.2vw, 13px)",
        padding: "clamp(16px, 1.9vh, 20px) clamp(28px, 4vw, 44px)",
        borderRadius: "0px",
        boxShadow: "0 10px 40px -10px rgba(240,200,104,0.55)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 18px 60px -10px rgba(240,200,104,0.85), 0 0 0 1px rgba(255,233,184,0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 10px 40px -10px rgba(240,200,104,0.55)";
      }}
    >
      <span>{label}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" style={{ fontWeight: 800 }}>
        →
      </span>
    </button>
  );
}

function Landing() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState(0);
  const wheelSize = useResponsiveWheelSize(1.1, 380, 760);

  useEffect(() => {
    setAttempts(getAttempts());
  }, []);

  const handleSpin = () => {
    const next = incrementAttempt();
    if (next > MAX_SPINS) {
      navigate({ to: "/maxspins" });
      return;
    }
    const target = randomSign();
    sessionStorage.setItem("tikkun_target_sign", target.key);
    navigate({ to: "/spinning" });
  };

  const used = Math.min(attempts, MAX_SPINS);
  const remaining = Math.max(0, MAX_SPINS - used);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: C_SKY_GRAD, color: C_INK_SOFT }}
    >
      <StarField density={180} opacity={0.85} />

      <div className="relative">
        {/* ── TOP MARGIN HEADER ──────────────────────────────── */}
        <header className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1rem,2vh,1.5rem)]">
          <div className="mx-auto max-w-6xl">
            <span
              style={{
                fontFamily: BODY,
                color: C_MUTED,
                fontSize: "10px",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Kabbalah Astrology
            </span>
          </div>
        </header>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,4vh,3.5rem)] pb-[clamp(3rem,6vh,5rem)]">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontWeight: 500,
                fontSize: "clamp(30px, 5vw, 56px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              What's your{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  background: `linear-gradient(135deg, ${C_GOLD_BRIGHT} 0%, ${C_GOLD} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Tikkun
              </span>
              <span style={{ color: C_GOLD }}>?</span>
            </h1>

            <div className="mt-[clamp(1.5rem,3.5vh,2.5rem)]">
              <button
                type="button"
                onClick={handleSpin}
                aria-label="Turn the Tikkun wheel"
                className="group relative cursor-pointer rounded-full transition-transform duration-700 ease-out hover:scale-[1.015] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c868] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1b2540]"
                style={{
                  filter:
                    "drop-shadow(0 0 60px rgba(240,200,104,0.32)) drop-shadow(0 0 30px rgba(255,233,184,0.22))",
                }}
              >
                <TikkunWheel size={wheelSize} state="idle" />
              </button>
            </div>

            <div className="mt-[clamp(1.75rem,3.5vh,2.5rem)] flex flex-col items-center gap-3">
              <PrimaryCTA onClick={handleSpin} />
              <p
                style={{
                  fontFamily: BODY,
                  color: C_MUTED,
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Free Tikkun Astrology Reading
              </p>
            </div>

            <p
              className="mt-[clamp(1.5rem,3vh,2rem)] font-mono font-thin text-sm"
              style={{
                color: C_INK_SOFT,
                lineHeight: 1.55,
                maxWidth: "34rem",
              }}
            >
              Kabbalistic Astrology uses lunar nodes to map your{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>Tikkun</span>
              : the soul's pattern of correction that signals how to{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>
                fulfill your life's potential
              </span>{" "}
              — in relationships, finances, and career.
            </p>
          </div>
        </section>

        {/* ── WHAT YOU RECEIVE ─────────────────────────────────── */}
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(6rem,12vh,9rem)]"
          style={{ background: "linear-gradient(180deg, #1c2848 0%, #22304f 50%, #283958 100%)" }}
        >
          <StarField density={60} opacity={0.5} seedOffset={2100} />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2
              className="font-mono font-thin text-2xl"
              style={{ color: C_INK }}
            >
              What you{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>receive</span>.
            </h2>

            <ul
              className="mt-[clamp(2rem,4vh,3rem)] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)] font-mono font-thin text-sm text-left"
              style={{
                color: C_INK_SOFT,
                lineHeight: 1.55,
                listStyle: "none",
                padding: 0,
              }}
            >
              {[
                { letter: "א", accent: "#c5a059", title: "Your Tikkun reading & archetype", body: "the soul's pattern of correction drawn from your lunar nodes.", tint: "rgba(197, 160, 89, 0.06)" },
                { letter: "מ", accent: C_SAGE,    title: "Your Aramaic letter and emotion", body: "the sacred letter and inner quality assigned to your path.", tint: "rgba(155, 209, 191, 0.06)" },
                { letter: "ש", accent: C_DAWN,    title: "A daily mantra and reflection",   body: "a verse to carry, and a prompt to sit with.", tint: "rgba(255, 176, 136, 0.06)" },
              ].map((item) => {
                return (
                  <li
                    key={item.title}
                    className="flex flex-col gap-3 p-[clamp(1.25rem,2.5vw,1.75rem)] h-full transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: item.tint,
                      border: `1px solid ${item.accent}33`,
                      borderRadius: 2,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="leading-none"
                      style={{
                        fontFamily: HEAD,
                        color: item.accent,
                        fontSize: "clamp(32px, 4.5vw, 44px)",
                        textShadow: `0 0 14px ${item.accent}66`,
                      }}
                    >
                      {item.letter}
                    </span>
                    <span>
                      <span style={{ color: item.accent, fontStyle: "italic" }}>
                        {item.title}
                      </span>{" "}
                      — {item.body}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ── ORIGINS ──────────────────────────────────────────── */}
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(6rem,12vh,9rem)]"
          style={{
            background: C_BAND_DEEP,
            borderTop: `1px solid ${C_RULE_SOFT}`,
            borderBottom: `1px solid ${C_RULE_SOFT}`,
          }}
        >
          <StarField density={60} opacity={0.55} seedOffset={500} />
          <div className="relative mx-auto max-w-2xl text-center">
            
            <h2
              className="mt-[clamp(1.25rem,2.5vh,1.75rem)] font-mono font-thin text-2xl"
              style={{ color: C_INK }}
            >
              Ancient roots.
            </h2>
            <p
              className="mt-[clamp(1rem,2vh,1.5rem)] mx-auto font-mono font-thin text-sm"
              style={{
                color: C_INK_SOFT,
                lineHeight: 1.55,
                maxWidth: "34rem",
              }}
            >
              Kabbalah Astrology dates back to{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>Abraham</span>{" "}
              and is found in many ancient texts and commentaries — the{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>Talmud</span>{" "}
              (the Oral Torah), the{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>Sefer Yetzirah</span>{" "}
              (Book of Formation), and the{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>Zohar</span>{" "}
              (Book of Splendor).
            </p>
          </div>
        </section>

        {/* ── FREE WILL ────────────────────────────────────────── */}
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(6rem,12vh,9rem)]"
          style={{ background: C_BAND_MID }}
        >
          <StarField density={70} opacity={0.5} seedOffset={900} />
          <div className="relative mx-auto max-w-3xl text-center">
            
            <h2
              className="mt-[clamp(1.25rem,2.5vh,1.75rem)] font-mono font-thin text-2xl"
              style={{ color: C_INK }}
            >
              Free will overrides{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>fate</span>.
            </h2>
            <p
              className="mx-auto mt-[clamp(1rem,2vh,1.5rem)] font-mono font-thin text-sm"
              style={{
                color: C_INK_SOFT,
                lineHeight: 1.55,
                maxWidth: "34rem",
              }}
            >
              Kabbalists accept the signals or influence of the celestial
              constellations ({" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>Mazalot</span>{" "}
              ), but reject astrology as fatalistic prediction. A person's free
              will always overrides fate.
            </p>
          </div>
        </section>

        {/* ── TIKKUN OLAM + TREE ───────────────────────────────── */}
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(6rem,12vh,9rem)]"
          style={{ background: C_BAND_LIFT }}
        >
          <StarField density={50} opacity={0.5} seedOffset={1300} driftSeconds={140} />
          
          <div className="relative mx-auto max-w-3xl text-center">
            
            
            <h2
              className="mt-[clamp(1.25rem,2.5vh,1.75rem)] font-mono font-thin text-2xl"
              style={{ color: C_INK }}
            >
              A greater purpose.
            </h2>
            <p
              className="mt-[clamp(1rem,2vh,1.5rem)] mx-auto font-mono font-thin text-sm"
              style={{
                color: C_INK_SOFT,
                lineHeight: 1.55,
                maxWidth: "34rem",
              }}
            >
              Fulfilling your{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>Tikkun</span>{" "}
              serves a greater purpose —{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>Tikkun Olam</span>{" "}
              — sharing your light to build a better world.
            </p>

            <div className="mt-[clamp(2.5rem,5vh,4rem)] flex justify-center">
              <SefirotTree min={120} max={200} vwFraction={0.32} />
            </div>
          </div>
        </section>


        {/* ── CLOSING CTA ──────────────────────────────────────── */}
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(5rem,10vh,8rem)] text-center"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, rgba(240,200,104,0.10) 0%, rgba(240,200,104,0) 60%), linear-gradient(180deg, #1b2540 0%, #233055 100%)",
          }}
        >
          <StarField density={50} opacity={0.55} seedOffset={1700} />
          <div className="relative mx-auto max-w-3xl">
            <h2
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontWeight: 500,
                fontSize: "clamp(30px, 5vw, 56px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              Who you<br />
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  background: `linear-gradient(135deg, ${C_GOLD_BRIGHT} 0%, ${C_GOLD} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                are
              </span>
              <span style={{ color: C_GOLD }}>.</span>
            </h2>
            <p
              className="mx-auto mt-[clamp(1.25rem,2.5vh,1.75rem)] font-mono font-thin text-sm"
              style={{
                color: C_INK_SOFT,
                lineHeight: 1.55,
                maxWidth: "34rem",
              }}
            >
              A free <span style={{ color: C_GOLD, fontStyle: "italic" }}>Tikkun</span> reading based on the lunar nodes on your birthdate.
            </p>
            <div className="mt-[clamp(2rem,4vh,2.75rem)] flex justify-center">
              <PrimaryCTA onClick={handleSpin} label="Receive your reading" />
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <footer
          className="px-[clamp(1.25rem,5vw,3rem)] py-[clamp(1.5rem,3vh,2.5rem)]"
          style={{
            background: "#1b2740",
            borderTop: `1px solid ${C_RULE}`,
          }}
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2">
            <p
              style={{
                fontFamily: BODY,
                color: C_MUTED,
                fontSize: "10px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              © {new Date().getFullYear()} · Kabbalah Astrology
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
