import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TikkunWheel } from "@/components/TikkunWheel";
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
      { title: "Tikkun — Kabbalistic Astrology" },
      {
        name: "description",
        content:
          "A Kabbalistic Astrology reading drawn from the twelve letters of the Hebrew alphabet and the soul's pattern of correction. Turn the wheel to receive yours.",
      },
      { property: "og:title", content: "Tikkun — Kabbalistic Astrology" },
      {
        property: "og:description",
        content:
          "Twelve letters. One correction. A reading rooted in the Sefer Yetzirah and the Zohar.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

// Twilight palette — lifted, airy dark. Lighter than the original forest.
const HEAD = "var(--font-serif)";       // Fraunces
const BODY = "var(--font-sans)";        // General Sans

// Background gradient: dusty mauve-indigo at top → soft teal-forest below.
const C_BG_GRAD  =
  "radial-gradient(120% 70% at 50% 0%, rgba(196,184,214,0.35) 0%, rgba(196,184,214,0) 60%), linear-gradient(180deg, #3a4358 0%, #2c3f44 38%, #1f3a36 72%, #17302c 100%)";
const C_BG       = "#1f3a36";           // mid twilight forest
const C_BG_DEEP  = "rgba(10, 22, 20, 0.35)"; // translucent band over gradient
const C_INK      = "#f7efdc";           // warm cream (headlines)
const C_INK_SOFT = "#ece4cf";           // soft cream (body)
const C_MUTED    = "rgba(236, 228, 207, 0.62)";
const C_ACCENT   = "#f0c868";           // gold — the only accent
const C_RULE     = "rgba(247, 239, 220, 0.22)";
const C_RULE_SOFT= "rgba(247, 239, 220, 0.12)";

/** Faint scattered stars — small round dots, no streaks. */
function StarField({ density = 70, opacity = 0.5 }: { density?: number; opacity?: number }) {
  const stars = Array.from({ length: density }).map((_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const r = (n: number) => ((seed * (n + 1) * 1103515245 + 12345) % 2147483648) / 2147483648;
    const left = r(1) * 100;
    const top = r(2) * 100;
    const size = r(3) > 0.85 ? 2 : 1;
    const o = 0.35 + r(4) * 0.55;
    return (
      <span
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: "#f7efdc",
          opacity: o * opacity,
          boxShadow: size === 2 ? "0 0 4px rgba(247,239,220,0.45)" : undefined,
        }}
      />
    );
  });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars}
    </div>
  );
}

/** Hairline rule with optional centered eyebrow */
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
      className="group inline-flex items-center gap-3 uppercase transition-colors hover:bg-[#f0c868] hover:text-[#17302c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c868] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1f3a36]"
      style={{
        backgroundColor: C_INK,
        color: "#17302c",
        fontFamily: BODY,
        fontWeight: 600,
        letterSpacing: "0.28em",
        fontSize: "clamp(11px, 1.2vw, 13px)",
        padding: "clamp(16px, 1.9vh, 20px) clamp(28px, 4vw, 44px)",
        borderRadius: "0px",
      }}
    >
      <span>{label}</span>
      <span aria-hidden="true" style={{ color: C_ACCENT, fontWeight: 700 }}>
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
      className="relative min-h-screen"
      style={{
        background: C_BG_GRAD,
        color: C_INK_SOFT,
      }}
    >
      <StarField density={80} opacity={0.55} />
      <div className="relative">
      {/* ── TOP BAR ────────────────────────────────────────────── */}
      <header
        className="px-[clamp(1.25rem,5vw,3rem)] py-[clamp(1rem,2.5vh,1.5rem)]"
        style={{ borderBottom: `1px solid ${C_RULE}` }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div
            style={{
              fontFamily: HEAD,
              color: C_INK,
              fontWeight: 500,
              fontSize: "18px",
              letterSpacing: "0.04em",
            }}
          >
            Tikkun<span style={{ color: C_ACCENT }}>.</span>
          </div>
          <div
            style={{
              fontFamily: BODY,
              color: C_INK_SOFT,
              fontSize: "11px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Kabbalistic Astrology
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2.5rem,6vh,5rem)] pb-[clamp(2.5rem,5vh,4rem)]">
        <div className="mx-auto grid max-w-6xl items-center gap-[clamp(2rem,5vw,4rem)] md:grid-cols-[1.05fr_1fr]">
          {/* Copy column */}
          <div className="order-2 text-center md:order-1 md:text-left">
            <p
              style={{
                fontFamily: BODY,
                color: C_ACCENT,
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              A Reading · Free · No account
            </p>

            <h1
              className="mt-5"
              style={{
                fontFamily: HEAD,
                fontWeight: 500,
                fontSize: "clamp(44px, 8vw, 88px)",
                lineHeight: 0.98,
                color: C_INK,
                letterSpacing: "-0.025em",
              }}
            >
              The map<br />
              your soul<br />
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                was given<span style={{ color: C_ACCENT }}>.</span>
              </span>
            </h1>

            <p
              className="mx-auto mt-[clamp(1.25rem,2.5vh,1.75rem)] md:mx-0"
              style={{
                fontFamily: BODY,
                color: C_INK_SOFT,
                fontSize: "clamp(15px, 1.55vw, 18px)",
                lineHeight: 1.6,
                maxWidth: "30rem",
                fontWeight: 400,
              }}
            >
              Twelve letters. Twelve months. Twelve gates of the soul. Your
              chart in the Kabbalistic tradition is not a personality —
              it is the work you came to do.
            </p>

            <div className="mt-[clamp(1.75rem,3.5vh,2.5rem)] flex flex-col items-center gap-3 md:items-start">
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

          {/* Wheel column */}
          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <button
              type="button"
              onClick={handleSpin}
              aria-label="Turn the Tikkun wheel"
              className="group relative cursor-pointer rounded-full transition-transform duration-700 ease-out hover:scale-[1.015] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6b1e26] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f1ece1]"
            >
              <TikkunWheel size={wheelSize} state="idle" />
            </button>
          </div>
        </div>
      </section>

      {/* ── PASSAGE ────────────────────────────────────────────── */}
      <section
        className="px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3.5rem,7vh,5.5rem)]"
        style={{
          background: C_BG_DEEP,
          borderTop: `1px solid ${C_RULE_SOFT}`,
          borderBottom: `1px solid ${C_RULE_SOFT}`,
        }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Sefer Yetzirah · 2:2</Eyebrow>
          <blockquote
            className="mt-[clamp(1.5rem,3vh,2rem)]"
            style={{
              fontFamily: HEAD,
              color: C_INK,
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(22px, 3vw, 34px)",
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
            }}
          >
            "With twenty-two letters He engraved, hewed, weighed, and
            combined them, and out of them He formed all that was formed
            and all that will be formed."
          </blockquote>
        </div>
      </section>

      {/* ── THREE GATES ────────────────────────────────────────── */}
      <section className="px-[clamp(1.25rem,5vw,3rem)] py-[clamp(4rem,8vh,6rem)]">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>The reading</Eyebrow>
            <h2
              className="mt-6"
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontWeight: 500,
                fontSize: "clamp(32px, 5vw, 52px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              Three gates the<br />
              wheel opens<span style={{ color: C_ACCENT }}>.</span>
            </h2>
          </div>

          <div className="mt-[clamp(3rem,6vh,4.5rem)] grid gap-px md:grid-cols-3"
               style={{ background: C_RULE_SOFT }}>
            {[
              {
                num: "01",
                glyph: "א",
                t: "Your sign",
                d: "The Hebrew letter and month that govern your soul, drawn from the twelvefold scheme of the Sefer Yetzirah.",
              },
              {
                num: "02",
                glyph: "ב",
                t: "Your tikkun",
                d: "The correction your soul came to make — the work that defines the shape of this lifetime.",
              },
              {
                num: "03",
                glyph: "ג",
                t: "Your fields",
                d: "How the work expresses itself in love, livelihood, and your relationship to purpose.",
              },
            ].map((s) => (
              <div
                key={s.t}
                className="p-[clamp(1.5rem,3vw,2.25rem)]"
                style={{ background: C_BG }}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    style={{
                      fontFamily: BODY,
                      color: C_ACCENT,
                      fontSize: "12px",
                      letterSpacing: "0.2em",
                      fontWeight: 700,
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    style={{
                      fontFamily: HEAD,
                      color: C_INK,
                      fontSize: "clamp(40px, 5vw, 56px)",
                      lineHeight: 1,
                      fontWeight: 400,
                    }}
                  >
                    {s.glyph}
                  </span>
                </div>
                <h3
                  className="mt-[clamp(2rem,4vh,3rem)]"
                  style={{
                    fontFamily: HEAD,
                    color: C_INK,
                    fontWeight: 500,
                    fontSize: "clamp(22px, 2.4vw, 28px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.t}
                </h3>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: BODY,
                    color: C_INK_SOFT,
                    fontSize: "clamp(14px, 1.3vw, 15px)",
                    lineHeight: 1.65,
                  }}
                >
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRADITION ──────────────────────────────────────────── */}
      <section
        className="px-[clamp(1.25rem,5vw,3rem)] py-[clamp(4rem,8vh,6rem)]"
        style={{
          background: C_BG_DEEP,
          borderTop: `1px solid ${C_RULE_SOFT}`,
          borderBottom: `1px solid ${C_RULE_SOFT}`,
        }}
      >
        <div className="mx-auto grid max-w-6xl gap-[clamp(2rem,5vw,4rem)] md:grid-cols-[auto_1fr] md:items-start">
          <div>
            <Eyebrow>The tradition</Eyebrow>
          </div>
          <div className="max-w-2xl">
            <p
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontWeight: 500,
                fontSize: "clamp(22px, 2.8vw, 32px)",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
              }}
            >
              Kabbalistic Astrology is drawn from the{" "}
              <em style={{ fontWeight: 400 }}>Sefer Yetzirah</em>, the
              oldest extant work of Jewish mysticism, and elaborated in
              the <em style={{ fontWeight: 400 }}>Zohar</em>. It does not
              describe personality<span style={{ color: C_ACCENT }}>.</span>{" "}
              It describes work.
            </p>
            <p
              className="mt-6"
              style={{
                fontFamily: BODY,
                color: C_INK_SOFT,
                fontSize: "clamp(14px, 1.4vw, 16px)",
                lineHeight: 1.7,
              }}
            >
              Western astrology centers the natal chart and the personality
              it implies. The Kabbalistic reading centers the soul's
              correction — the pattern you came to mend, and the doorway
              through which you mend it.
            </p>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ────────────────────────────────────────── */}
      <section className="px-[clamp(1.25rem,5vw,3rem)] py-[clamp(5rem,10vh,8rem)] text-center">
        <div className="mx-auto max-w-3xl">
          <h2
            style={{
              fontFamily: HEAD,
              color: C_INK,
              fontWeight: 500,
              fontSize: "clamp(40px, 7vw, 80px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
            }}
          >
            Turn the<br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>
              wheel<span style={{ color: C_ACCENT }}>.</span>
            </span>
          </h2>
          <p
            className="mx-auto mt-[clamp(1.25rem,2.5vh,1.75rem)]"
            style={{
              fontFamily: BODY,
              color: C_INK_SOFT,
              fontSize: "clamp(15px, 1.5vw, 17px)",
              lineHeight: 1.6,
              maxWidth: "32rem",
            }}
          >
            A free reading drawn in the moment. No account, no email, no
            subscription.
          </p>
          <div className="mt-[clamp(2rem,4vh,2.75rem)] flex justify-center">
            <PrimaryCTA onClick={handleSpin} />
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer
        className="px-[clamp(1.25rem,5vw,3rem)] py-[clamp(1.5rem,3vh,2.5rem)]"
        style={{ borderTop: `1px solid ${C_RULE}` }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 md:flex-row">
          <p
            style={{
              fontFamily: HEAD,
              color: C_INK,
              fontWeight: 500,
              fontSize: "14px",
              letterSpacing: "0.04em",
            }}
          >
            Tikkun · <span style={{ fontFamily: HEAD }}>תיקון</span>
          </p>
          <p
            style={{
              fontFamily: BODY,
              color: C_MUTED,
              fontSize: "11px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            © {new Date().getFullYear()} · Kabbalistic Astrology
          </p>
        </div>
      </footer>
      </div>
    </main>
  );
}
