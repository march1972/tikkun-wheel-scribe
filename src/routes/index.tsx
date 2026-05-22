import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { TikkunWheel } from "@/components/TikkunWheel";
import { SefirotTree } from "@/components/SefirotTree";
import { Reveal } from "@/components/landing/Reveal";
import { StarField } from "@/components/landing/StarField";
import { useResponsiveWheelSize } from "@/hooks/useResponsiveWheelSize";
import { randomTikkunSign } from "@/lib/tikkun-data";
import { resetAttempts, setCurrentSpinNumber } from "@/lib/spinAttempts";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Kabbalah Astrology — Reveal Your Tikkun" },
      {
        name: "description",
        content:
          "Kabbalah Astrology maps your Tikkun — the soul's pattern of correction that signals how to fulfill your life's purpose in relationships, finances, and career.",
      },
      { property: "og:title", content: "Kabbalah Astrology — Reveal Your Tikkun" },
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
  "radial-gradient(55% 35% at 88% 0%, rgba(245,207,122,0.22) 0%, rgba(245,207,122,0) 60%), radial-gradient(70% 45% at 10% 100%, rgba(120,150,190,0.22) 0%, rgba(120,150,190,0) 65%), radial-gradient(60% 50% at 50% 35%, rgba(120,150,200,0.18) 0%, rgba(10,14,28,0) 70%), linear-gradient(180deg, #0c1426 0%, #1b2540 28%, #233055 55%, #2a3a5e 80%, #324468 100%)";

// Bands deepen toward the middle of the page, then lift toward dawn at the bottom.
// Each band gets a soft radial highlight so the sky feels luminous, not flat.
const C_BAND_DEEP =
  "radial-gradient(70% 55% at 50% 40%, rgba(120,150,200,0.14) 0%, rgba(10,14,28,0) 70%), radial-gradient(40% 30% at 15% 85%, rgba(245,207,122,0.06) 0%, rgba(245,207,122,0) 70%), linear-gradient(180deg, #0a1020 0%, #060a18 50%, #0a1020 100%)";
const C_BAND_MID =
  "radial-gradient(75% 60% at 50% 30%, rgba(155,180,220,0.16) 0%, rgba(10,14,28,0) 70%), radial-gradient(45% 35% at 85% 90%, rgba(155,209,191,0.07) 0%, rgba(155,209,191,0) 70%), linear-gradient(180deg, #131c34 0%, #182142 50%, #131c34 100%)";
const C_BAND_LIFT =
  "radial-gradient(80% 60% at 50% 20%, rgba(255,220,180,0.14) 0%, rgba(10,14,28,0) 70%), radial-gradient(50% 40% at 20% 100%, rgba(245,207,122,0.10) 0%, rgba(245,207,122,0) 70%), linear-gradient(180deg, #1b2545 0%, #2a3a5e 55%, #38507a 100%)";

const C_INK = "#fdf6e6";            // moonlight cream
const C_INK_SOFT = "#ece3cf";
const C_MUTED = "rgba(236, 227, 207, 0.62)";
const C_GOLD = "#f0c868";           // wheel gold (matches TikkunWheel)
const C_GOLD_BRIGHT = "#FFE9B8";
const C_DAWN = "#e63946";           // visible red-orange accent
const C_SAGE = "#9bd1bf";           // sage mint — secondary accent
const C_DEEP = "#0f1729";           // near-black indigo
const C_RULE = "rgba(253, 246, 230, 0.20)";
const C_RULE_SOFT = "rgba(253, 246, 230, 0.10)";


// StarField now imported from "@/components/landing/StarField" (shared).

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
      className="group inline-flex items-center gap-3 uppercase transition-all duration-300 hover:scale-[1.04] hover:brightness-110 hover:gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e63946] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1b2540]"
      style={{
        background: `linear-gradient(135deg, ${C_DAWN} 0%, #c1121f 100%)`,
        color: C_INK,
        fontFamily: BODY,
        fontWeight: 700,
        letterSpacing: "0.28em",
        fontSize: "clamp(11px, 1.2vw, 13px)",
        padding: "clamp(16px, 1.9vh, 20px) clamp(28px, 4vw, 44px)",
        borderRadius: "0px",
        boxShadow: `0 10px 40px -10px ${C_DAWN}aa`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 18px 60px -10px ${C_DAWN}, 0 0 0 1px ${C_DAWN}99`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 10px 40px -10px ${C_DAWN}aa`;
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
  const wheelSize = useResponsiveWheelSize(0.85, 280, 440);
  const haloRef = useRef<HTMLDivElement | null>(null);

  // Reset spin counter on each fresh visit to the landing page.
  useEffect(() => {
    resetAttempts();
  }, []);

  // Scroll-linked halo drift behind the hero wheel (matches /history, /reading).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const el = haloRef.current;
        if (el) el.style.transform = `translate(-50%, calc(-50% - ${y * 0.3}px))`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);


  const [isStarting, setIsStarting] = useState(false);
  const handleSpin = () => {
    if (isStarting) return;
    setIsStarting(true);
    setCurrentSpinNumber(1);
    const target = randomTikkunSign();
    try {
      sessionStorage.setItem("tikkun_target_sign", target.id);
    } catch {}
    navigate({ to: "/spinning" });
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: C_SKY_GRAD, color: C_INK_SOFT }}
    >
      <StarField density={360} opacity={0.85} />

      <div className="relative">
        {/* ── TOP MARGIN HEADER ──────────────────────────────── */}
        <header className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1.25rem,2.5vh,2rem)]">
          <div className="mx-auto max-w-6xl flex justify-center">
            <Link
              to="/"
              className="transition-opacity duration-300 hover:opacity-100"
              style={{
                fontFamily: BODY,
                color: "rgba(241, 233, 213, 0.7)",
                fontSize: "clamp(11px, 1.1vw, 12px)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              Kabbalah Astrology
            </Link>
          </div>
        </header>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,4vh,3.5rem)] pb-[clamp(2rem,4vh,3.5rem)]">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <div
              ref={haloRef}
              aria-hidden
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "clamp(360px, 70vw, 680px)",
                height: "clamp(360px, 70vw, 680px)",
                background: `radial-gradient(circle, ${C_GOLD}33 0%, ${C_DAWN}1f 40%, transparent 70%)`,
                filter: "blur(10px)",
                pointerEvents: "none",
                willChange: "transform",
                zIndex: 0,
              }}
            />
            <h1
              className="relative"
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontWeight: 500,
                fontSize: "clamp(44px, 7.5vw, 96px)",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
              }}
            >
              Reveal your{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: C_DAWN,
                }}
              >
                Tikkun
              </span>
            </h1>

            <div className="relative mt-[clamp(1.5rem,3.5vh,2.5rem)]">
              <div
                className="group relative cursor-pointer rounded-full transition-transform duration-700 ease-out hover:scale-[1.015] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c868] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1b2540]"
                style={{
                  filter:
                    "drop-shadow(0 0 60px rgba(240,200,104,0.32)) drop-shadow(0 0 30px rgba(255,233,184,0.22))",
                }}
              >
                <TikkunWheel size={wheelSize} state="idle" onClick={handleSpin} />
              </div>
            </div>

            <p
              className="relative mt-[clamp(1.5rem,3vh,2.25rem)]"
              style={{
                fontFamily: BODY, color: C_INK_SOFT,
                lineHeight: 1.55,
                maxWidth: "42rem",
                fontSize: "clamp(20px, 2vw, 26px)",
              }}
            >
              Kabbalistic Astrology maps your{" "}
              <span style={{ color: C_DAWN, fontStyle: "italic" }}>Tikkun</span>
              : the soul's recurring pattern of correction that signals how to{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>
                fulfill your life's purpose
              </span>{" "}
              — in relationships, finances, and career.
            </p>

            <div className="relative mt-[clamp(1.5rem,3vh,2rem)] flex flex-col items-center gap-3">
              <PrimaryCTA onClick={handleSpin} />
              <p
                style={{
                  fontFamily: BODY,
                  color: C_MUTED,
                  fontSize: "10px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Free Tikkun Astrology Reading
              </p>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU RECEIVE ─────────────────────────────────── */}
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(6rem,12vh,9rem)]"
          style={{ background: "radial-gradient(70% 55% at 50% 25%, rgba(180,200,235,0.16) 0%, rgba(10,14,28,0) 70%), radial-gradient(45% 35% at 90% 100%, rgba(245,207,122,0.08) 0%, rgba(245,207,122,0) 70%), linear-gradient(180deg, #14203c 0%, #1c2848 40%, #22304f 70%, #1c2848 100%)" }}
        >
          <StarField density={140} opacity={0.5} seedOffset={2100} />
          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <h2
                style={{
                  fontFamily: HEAD, color: C_INK,
                  fontSize: "clamp(38px, 6.5vw, 76px)",
                  lineHeight: 1.1, letterSpacing: "-0.025em",
                }}
              >
                What you{" "}
                <span style={{ color: C_GOLD, fontStyle: "italic" }}>receive</span>.
              </h2>
            </Reveal>

            <ul
              className="mt-[clamp(2rem,4vh,3rem)] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)] text-left"
              style={{
                color: C_INK_SOFT,
                lineHeight: 1.65,
                fontSize: "clamp(17px, 1.7vw, 21px)",
                listStyle: "none",
                padding: 0,
              }}
            >
              {[
                { letter: "א", letterColor: C_DAWN, accent: C_GOLD, title: "Your Tikkun reading & archetype", body: "the soul's pattern of correction drawn from your lunar nodes.", tint: "rgba(240, 200, 104, 0.06)" },
                { letter: "מ", letterColor: C_DAWN, accent: C_GOLD, title: "Your Aramaic letter and emotion", body: "the sacred letter and inner quality assigned to your path.", tint: "rgba(240, 200, 104, 0.06)" },
                { letter: "ש", letterColor: C_DAWN, accent: C_GOLD, title: "A daily mantra and reflection",   body: "a verse to meditate on for personal change.", tint: "rgba(240, 200, 104, 0.06)" },
              ].map((item, idx) => {
                return (
                  <Reveal key={item.title} delay={120 * (idx + 1)}>
                    <li
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
                          color: item.letterColor,
                          fontSize: "clamp(32px, 4.5vw, 44px)",
                          textShadow: `0 0 14px ${item.letterColor}66`,
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
                  </Reveal>
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
          <StarField density={140} opacity={0.55} seedOffset={500} />
          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <h2
                style={{
                  fontFamily: HEAD, color: C_INK,
                  fontSize: "clamp(38px, 6.5vw, 76px)",
                  lineHeight: 1.1, letterSpacing: "-0.025em",
                }}
              >
                Ancient{" "}
                <span style={{ color: C_GOLD, fontStyle: "italic" }}>roots</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p
                className="mt-[clamp(1rem,2vh,1.5rem)] mx-auto"
                style={{
                  fontFamily: BODY, color: C_INK_SOFT,
                  lineHeight: 1.7,
                  maxWidth: "42rem",
                  fontSize: "clamp(18px, 1.9vw, 23px)",
                }}
              >
                Kabbalah Astrology dates back to <span style={{ color: C_DAWN, fontStyle: "italic" }}>Abraham</span> and many ancient texts — the Talmud (the Oral Torah), Sefer Yetzirah (Book of Formation), and Zohar (Book of Splendor).
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── FREE WILL ────────────────────────────────────────── */}
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(6rem,12vh,9rem)]"
          style={{ background: C_BAND_MID }}
        >
          <StarField density={160} opacity={0.5} seedOffset={900} />
          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <h2
                style={{
                  fontFamily: HEAD, color: C_INK,
                  fontSize: "clamp(38px, 6.5vw, 76px)",
                  lineHeight: 1.1, letterSpacing: "-0.025em",
                }}
              >
                <span style={{ color: C_GOLD, fontStyle: "italic" }}>Influence</span>, not prediction
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p
                className="mx-auto mt-[clamp(1rem,2vh,1.5rem)]"
                style={{
                  fontFamily: BODY, color: C_INK_SOFT,
                  lineHeight: 1.7,
                  maxWidth: "42rem",
                  fontSize: "clamp(18px, 1.9vw, 23px)",
                }}
              >
                Kabbalists accept the signals or influence of the celestial
                constellations ({" "}
                <span style={{ color: C_INK, fontStyle: "italic" }}>Mazalot</span>{" "}
                ), but reject astrology as fatalistic prediction. A person's{" "}
                <span style={{ color: C_DAWN, fontStyle: "italic" }}>free will</span>{" "}
                always overrides fate.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── TIKKUN OLAM + TREE ───────────────────────────────── */}
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(6rem,12vh,9rem)]"
          style={{ background: C_BAND_LIFT }}
        >
          <StarField density={120} opacity={0.5} seedOffset={1300} driftSeconds={140} />
          
          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <h2
                style={{
                  fontFamily: HEAD, color: C_INK,
                  fontSize: "clamp(38px, 6.5vw, 76px)",
                  lineHeight: 1.1, letterSpacing: "-0.025em",
                }}
              >
                A greater purpose.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p
                className="mt-[clamp(1rem,2vh,1.5rem)] mx-auto"
                style={{
                  fontFamily: BODY, color: C_INK_SOFT,
                  lineHeight: 1.7,
                  maxWidth: "42rem",
                  fontSize: "clamp(18px, 1.9vw, 23px)",
                }}
              >
                Fulfilling your{" "}
                <span style={{ color: C_DAWN, fontStyle: "italic" }}>Tikkun</span>{" "}
                serves a greater purpose —{" "}
                <span style={{ color: C_GOLD, fontStyle: "italic", fontSize: "1.25em", fontWeight: 500 }}>Tikkun Olam</span>{" "}
                — sharing your light to build a better world.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-[clamp(2.5rem,5vh,4rem)] flex justify-center">
                <SefirotTree min={120} max={200} vwFraction={0.32} />
              </div>
            </Reveal>
          </div>
        </section>


        {/* ── CLOSING CTA ──────────────────────────────────────── */}
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(5rem,10vh,8rem)] text-center"
        >
          <StarField density={120} opacity={0.55} seedOffset={1700} />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <h2
                style={{
                  fontFamily: HEAD,
                  color: C_INK,
                  fontWeight: 500,
                  fontSize: "clamp(48px, 9vw, 112px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.035em",
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
            </Reveal>
            <Reveal delay={140}>
              <p
                className="mx-auto mt-[clamp(1.25rem,2.5vh,1.75rem)]"
                style={{
                  fontFamily: BODY, color: C_INK_SOFT,
                  lineHeight: 1.7,
                  maxWidth: "42rem",
                  fontSize: "clamp(18px, 1.9vw, 23px)",
                }}
              >
                A free <span style={{ color: C_DAWN, fontStyle: "italic" }}>Tikkun</span> reading based on the lunar nodes at your date of birth. <br />You see&nbsp;<span style={{ color: C_GOLD, fontStyle: "italic" }}>your life's recurring purpose patterns</span>&nbsp;that influence your path in relationships, career, finances, and personal fulfilment.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <div className="mt-[clamp(1.5rem,3vh,2.25rem)] flex justify-center">
                <PrimaryCTA onClick={handleSpin} label="Receive your reading" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <footer
          className="px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(6rem,12vh,9rem)] pb-[clamp(1.5rem,3vh,2.5rem)]"
        >
          <div className="mx-auto max-w-6xl">
            <div style={{ borderTop: `1px solid ${C_RULE}` }} className="mb-[clamp(1.5rem,3vh,2.5rem)]" />
            <div className="flex justify-center">
              <div
                className="flex flex-col items-center gap-2 md:flex-row md:gap-0"
                style={{
                  fontFamily: BODY,
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  fontWeight: 500,
                }}
              >
                <Link to="/terms" style={{ color: C_INK_SOFT, textDecoration: "underline" }}>
                  Terms &amp; Conditions
                </Link>
                <span className="hidden md:inline" style={{ color: C_MUTED, margin: "0 8px" }}>·</span>
                <Link to="/privacy" style={{ color: C_INK_SOFT, textDecoration: "underline" }}>
                  Privacy
                </Link>
                <span className="hidden md:inline" style={{ color: C_MUTED, margin: "0 8px" }}>·</span>
                <span style={{ color: C_INK_SOFT }}>Kabbalah Astrology</span>
                <span className="hidden md:inline" style={{ color: C_MUTED, margin: "0 8px" }}>·</span>
                <span style={{ color: C_INK_SOFT }}>Kabbalah Circle © 2026</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
