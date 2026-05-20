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

const C_BAND_DEEP =
  "linear-gradient(180deg, #182240 0%, #1f2b48 50%, #182240 100%)";
const C_BAND_MID =
  "linear-gradient(180deg, #1f2b48 0%, #283759 50%, #1f2b48 100%)";

const C_INK = "#fdf6e6";            // moonlight cream
const C_INK_SOFT = "#ece3cf";
const C_MUTED = "rgba(236, 227, 207, 0.62)";
const C_GOLD = "#f0c868";           // wheel gold (matches TikkunWheel)
const C_GOLD_BRIGHT = "#FFE9B8";
const C_DAWN = "#ffb088";           // dawn coral — reserved for accents only
const C_DEEP = "#0f1729";           // near-black indigo
const C_RULE = "rgba(253, 246, 230, 0.20)";
const C_RULE_SOFT = "rgba(253, 246, 230, 0.10)";


/** Scattered stars with twinkle. */
function StarField({
  density = 90,
  opacity = 0.7,
  seedOffset = 0,
}: {
  density?: number;
  opacity?: number;
  seedOffset?: number;
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
    return (
      <span
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: "#fffdf3",
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
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {stars}
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
  label = "Receive your reading",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-3 uppercase transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c868] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1b2540]"
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
    >
      <span>{label}</span>
      <span aria-hidden="true" style={{ fontWeight: 800 }}>
        →
      </span>
    </button>
  );
}

function Landing() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState(0);
  const wheelSize = useResponsiveWheelSize(0.78, 240, 420);

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
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,5vh,4rem)] pb-[clamp(3rem,6vh,5rem)]">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p
              style={{
                fontFamily: BODY,
                color: C_DAWN,
                fontSize: "clamp(10px, 1.05vw, 12px)",
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                fontWeight: 700,
                lineHeight: 1.5,
              }}
            >
              Kabbalah Astrology Reveals Your Tikkun
            </p>

            <div className="mt-[clamp(1.25rem,3vh,2rem)]">
              <button
                type="button"
                onClick={handleSpin}
                aria-label="Turn the Tikkun wheel"
                className="group relative cursor-pointer rounded-full transition-transform duration-700 ease-out hover:scale-[1.015] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb088] focus-visible:ring-offset-4 focus-visible:ring-offset-[#3d5170]"
                style={{
                  filter:
                    "drop-shadow(0 0 60px rgba(255,176,136,0.30)) drop-shadow(0 0 30px rgba(245,207,122,0.25))",
                }}
              >
                <TikkunWheel size={wheelSize} state="idle" />
              </button>
            </div>

            <p
              className="mt-[clamp(1.5rem,3vh,2rem)]"
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(17px, 2vw, 22px)",
                lineHeight: 1.55,
                maxWidth: "34rem",
                letterSpacing: "-0.005em",
              }}
            >
              Kabbalistic Astrology maps your{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>Tikkun</span>
              : the soul's pattern of correction that signals how to{" "}
              <span style={{ color: C_INK, fontStyle: "normal", fontWeight: 600 }}>
                fulfill your life's potential
              </span>{" "}
              — in relationships, finances, and career.
            </p>

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
                {remaining > 0
                  ? `${remaining} of ${MAX_SPINS} ${remaining === 1 ? "turn" : "turns"} remaining`
                  : "Three turns of the wheel"}
              </p>
            </div>
          </div>
        </section>

        {/* ── ORIGINS ──────────────────────────────────────────── */}
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3.5rem,7vh,5.5rem)]"
          style={{
            background: C_BAND_GRAD,
            borderTop: `1px solid ${C_RULE_SOFT}`,
            borderBottom: `1px solid ${C_RULE_SOFT}`,
          }}
        >
          <StarField density={60} opacity={0.55} seedOffset={500} />
          <div className="relative mx-auto max-w-2xl text-center">
            <Eyebrow>Origins</Eyebrow>
            <p
              className="mt-[clamp(1.5rem,3vh,2rem)]"
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontWeight: 400,
                fontSize: "clamp(20px, 2.4vw, 26px)",
                lineHeight: 1.5,
                letterSpacing: "-0.01em",
              }}
            >
              Kabbalah Astrology dates back to{" "}
              <em style={{ color: C_GOLD, fontStyle: "italic" }}>Abraham</em>{" "}
              and lives in the ancient texts — the{" "}
              <span style={{ color: C_INK }}>Talmud</span>, the{" "}
              <span style={{ color: C_INK }}>Sefer Yetzirah</span>, and the{" "}
              <span style={{ color: C_INK }}>Zohar</span>.
            </p>
          </div>
        </section>

        {/* ── FREE WILL ────────────────────────────────────────── */}
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(4rem,8vh,6rem)]"
          style={{
            background:
              "linear-gradient(180deg, #4a5f7e 0%, #5a7090 50%, #6e7d96 100%)",
          }}
        >
          <StarField density={70} opacity={0.5} seedOffset={900} />
          <div className="relative mx-auto max-w-3xl text-center">
            <Eyebrow>Mazalot · מזלות</Eyebrow>
            <h2
              className="mt-6"
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontWeight: 500,
                fontSize: "clamp(28px, 4.4vw, 44px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Free will always overrides
              <span style={{ color: C_DAWN }}> fate</span>.
            </h2>
            <p
              className="mx-auto mt-6"
              style={{
                fontFamily: BODY,
                color: C_INK_SOFT,
                fontSize: "clamp(15px, 1.5vw, 17px)",
                lineHeight: 1.7,
                maxWidth: "34rem",
              }}
            >
              Kabbalists accept the influence of the celestial constellations —
              the <em style={{ color: C_GOLD, fontStyle: "italic" }}>Mazalot</em> —
              but reject astrology as fatalistic prediction. The stars
              incline; they do not decide.
            </p>
          </div>
        </section>

        {/* ── TIKKUN OLAM ──────────────────────────────────────── */}
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(4rem,8vh,6rem)]"
          style={{
            background:
              "linear-gradient(180deg, #6e7d96 0%, #9c8678 50%, #c89070 100%)",
          }}
        >
          <div className="relative mx-auto max-w-3xl text-center">
            <Eyebrow>Tikkun Olam · תיקון עולם</Eyebrow>
            <p
              className="mt-[clamp(1.5rem,3vh,2rem)]"
              style={{
                fontFamily: HEAD,
                color: "#1b2740",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(22px, 3vw, 32px)",
                lineHeight: 1.4,
                letterSpacing: "-0.015em",
              }}
            >
              Fulfilling your Tikkun serves a greater purpose — sharing your
              light to build a better world.
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
              "linear-gradient(180deg, #c89070 0%, #e0a07c 55%, #f0b485 100%)",
          }}
        >
          <div className="mx-auto max-w-3xl">
            <h2
              style={{
                fontFamily: HEAD,
                color: "#1b2740",
                fontWeight: 500,
                fontSize: "clamp(36px, 6vw, 68px)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
              }}
            >
              Turn the<br />
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                wheel<span style={{ color: "#6b1e26" }}>.</span>
              </span>
            </h2>
            <p
              className="mx-auto mt-[clamp(1.25rem,2.5vh,1.75rem)]"
              style={{
                fontFamily: BODY,
                color: "rgba(27, 39, 64, 0.78)",
                fontSize: "clamp(15px, 1.5vw, 17px)",
                lineHeight: 1.6,
                maxWidth: "32rem",
                fontWeight: 500,
              }}
            >
              A free reading drawn in the moment. No account, no email.
            </p>
            <div className="mt-[clamp(2rem,4vh,2.75rem)] flex justify-center">
              <button
                type="button"
                onClick={handleSpin}
                className="group inline-flex items-center gap-3 uppercase transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b2740] focus-visible:ring-offset-4 focus-visible:ring-offset-[#e0a07c]"
                style={{
                  background: "#1b2740",
                  color: C_INK,
                  fontFamily: BODY,
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  fontSize: "clamp(11px, 1.2vw, 13px)",
                  padding:
                    "clamp(16px, 1.9vh, 20px) clamp(28px, 4vw, 44px)",
                  borderRadius: "0px",
                  boxShadow: "0 10px 40px -10px rgba(27,39,64,0.5)",
                }}
              >
                <span>Receive your reading</span>
                <span aria-hidden="true" style={{ color: C_DAWN, fontWeight: 800 }}>
                  →
                </span>
              </button>
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
