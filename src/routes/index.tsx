import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TikkunWheel } from "@/components/TikkunWheel";
import { useResponsiveWheelSize } from "@/hooks/useResponsiveWheelSize";
import { ConstellationGlyph } from "@/components/ConstellationGlyph";
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

// Lighter palette — twilight rather than midnight.
// Forest stays as anchor, but lifted with cool dawn-blue and star-field.
const HEAD = "var(--font-serif)";
const BODY = "var(--font-sans)";
const C_HEAD = "#f7efdc";
const C_BODY = "#ece4cf";
const C_GOLD = "#f0c868";
const C_GOLD_SOFT = "#e6c987";
const C_MUTED = "#b9b39a";
const C_RULE = "rgba(240, 200, 104, 0.22)";

/** Subtle scattered stars rendered as positioned dots so they stay round. */
function StarField({ density = 80, opacity = 0.55 }: { density?: number; opacity?: number }) {
  // deterministic pseudo-random positions to avoid hydration mismatch
  const stars = Array.from({ length: density }, (_, i) => {
    const a = ((i * 9301 + 49297) % 233280) / 233280;
    const b = (((i + 7) * 9301 + 49297) % 233280) / 233280;
    const c = (((i + 13) * 9301 + 49297) % 233280) / 233280;
    const d = (((i + 23) * 9301 + 49297) % 233280) / 233280;
    return {
      left: `${a * 100}%`,
      top: `${b * 100}%`,
      size: 1 + Math.round(c * 1.5), // 1–2px, stays round
      o: 0.25 + d * 0.6,
    };
  });
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ opacity }}
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            backgroundColor: "#f7efdc",
            opacity: s.o,
            boxShadow: s.size > 1 ? "0 0 2px rgba(247,239,220,0.6)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

/** Hairline rule with optional centered glyph */
function Rule({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1" style={{ background: C_RULE }} />
      {children ? (
        <span
          style={{
            fontFamily: HEAD,
            color: C_GOLD_SOFT,
            fontSize: "11px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          {children}
        </span>
      ) : null}
      <span className="h-px flex-1" style={{ background: C_RULE }} />
    </div>
  );
}

function Landing() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState(0);
  const wheelSize = useResponsiveWheelSize(0.78, 240, 380);

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
      className="relative min-h-screen text-cream"
      style={{
        // Twilight gradient — luminous indigo at top fading into the deep forest.
        // Gives the page air and an unmistakable celestial quality.
        background:
          "radial-gradient(120% 60% at 50% -10%, rgba(120, 138, 168, 0.28) 0%, rgba(50, 70, 92, 0.18) 28%, transparent 62%), linear-gradient(180deg, #15302a 0%, #0f221e 38%, #0a1816 100%)",
      }}
    >
      {/* Star field across the whole page, very faint */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <StarField density={90} opacity={0.45} />
      </div>

      <div className="relative">
        {/* ── FRAMING HEADER ───────────────────────────────────────── */}
        <header className="px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1.5rem,3.5vh,2.25rem)]">
          <div className="mx-auto max-w-5xl">
            <Rule>Kabbalistic Astrology · אסטרולוגיית הקבלה</Rule>
            <p
              className="mt-3 text-center"
              style={{
                fontFamily: HEAD,
                color: C_HEAD,
                fontWeight: 400,
                fontSize: "clamp(13px, 1.3vw, 15px)",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
              }}
            >
              Tikkun
            </p>
          </div>
        </header>

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1.75rem,4vh,3rem)] pb-[clamp(2rem,5vh,4rem)]">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              style={{
                fontFamily: HEAD,
                fontWeight: 300,
                fontSize: "clamp(34px, 7vw, 64px)",
                lineHeight: 1.05,
                color: C_HEAD,
                letterSpacing: "-0.01em",
              }}
            >
              The map your soul
              <br />
              <span style={{ fontStyle: "italic", color: C_GOLD }}>
                was given.
              </span>
            </h1>

            <p
              className="mx-auto mt-[clamp(1rem,2vh,1.5rem)]"
              style={{
                fontFamily: BODY,
                color: C_BODY,
                fontSize: "clamp(15px, 1.55vw, 18px)",
                lineHeight: 1.65,
                maxWidth: "32rem",
                fontWeight: 400,
              }}
            >
              Twelve letters. Twelve months. Twelve gates of the soul. Your
              chart in the Kabbalistic tradition is not a personality — it is
              the work you came to do.
            </p>

            {/* Wheel */}
            <div className="relative mt-[clamp(2rem,4vh,3rem)] flex justify-center">
              {/* halo */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute"
                style={{
                  width: wheelSize * 1.35,
                  height: wheelSize * 1.35,
                  background:
                    "radial-gradient(circle, rgba(240,200,104,0.18) 0%, rgba(240,200,104,0.06) 35%, transparent 65%)",
                  borderRadius: "9999px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <button
                type="button"
                onClick={handleSpin}
                aria-label="Turn the Tikkun wheel"
                className="group relative cursor-pointer rounded-full transition-transform duration-700 ease-out hover:scale-[1.015] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-bright)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--forest-deep)]"
              >
                <TikkunWheel size={wheelSize} state="idle" />
              </button>
            </div>

            {/* CTA */}
            <div className="mt-[clamp(2rem,4vh,2.75rem)] flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleSpin}
                className="inline-flex items-center gap-3 uppercase transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-bright)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--forest-deep)]"
                style={{
                  backgroundColor: C_GOLD,
                  color: "var(--forest-deepest)",
                  fontFamily: BODY,
                  fontWeight: 600,
                  letterSpacing: "0.28em",
                  fontSize: "clamp(11px, 1.2vw, 13px)",
                  padding: "clamp(14px, 1.8vh, 18px) clamp(28px, 4vw, 40px)",
                  borderRadius: "2px",
                }}
              >
                Receive your reading
              </button>
              <p
                style={{
                  fontFamily: BODY,
                  color: C_MUTED,
                  fontSize: "clamp(11px, 1.1vw, 12px)",
                  letterSpacing: "0.06em",
                }}
              >
                {remaining > 0
                  ? `Free reading · ${remaining} of ${MAX_SPINS} ${remaining === 1 ? "turn" : "turns"} remaining`
                  : "Free reading · Three turns of the wheel"}
              </p>
            </div>
          </div>
        </section>

        {/* ── PASSAGE ──────────────────────────────────────────────── */}
        <section className="px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3rem,7vh,5rem)]">
          <div className="mx-auto max-w-2xl">
            <Rule>Sefer Yetzirah · 2:2</Rule>
            <blockquote
              className="mt-[clamp(1.5rem,3vh,2rem)] text-center"
              style={{
                fontFamily: HEAD,
                color: C_HEAD,
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(18px, 2.4vw, 26px)",
                lineHeight: 1.55,
              }}
            >
              "With twenty-two letters He engraved, hewed, weighed, and
              combined them, and out of them He formed all that was formed and
              all that will be formed."
            </blockquote>
          </div>
        </section>

        {/* ── THE READING — three gates ────────────────────────────── */}
        <section className="px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3rem,7vh,5rem)]">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-2xl text-center">
              <Rule>The reading</Rule>
              <h2
                className="mt-4"
                style={{
                  fontFamily: HEAD,
                  color: C_HEAD,
                  fontWeight: 300,
                  fontSize: "clamp(26px, 4vw, 40px)",
                  lineHeight: 1.15,
                }}
              >
                Three gates the wheel opens
              </h2>
              <p
                className="mt-4"
                style={{
                  fontFamily: BODY,
                  color: C_BODY,
                  opacity: 0.9,
                  fontSize: "clamp(14px, 1.4vw, 16px)",
                  lineHeight: 1.65,
                }}
              >
                Each turn names the letter that governs your soul, the
                correction it asks of this lifetime, and the fields where the
                work shows itself.
              </p>
            </div>

            <div className="mt-[clamp(2.5rem,5vh,3.5rem)] grid gap-[clamp(1.75rem,3vw,2.5rem)] md:grid-cols-3">
              {[
                {
                  glyph: "א",
                  t: "Your sign",
                  d: "The Hebrew letter and month that govern your soul, drawn from the twelvefold scheme of the Sefer Yetzirah.",
                },
                {
                  glyph: "ב",
                  t: "Your tikkun",
                  d: "The correction your soul came to make — the work that defines the shape of this lifetime.",
                },
                {
                  glyph: "ג",
                  t: "Your fields",
                  d: "How the work expresses itself in love, livelihood, and your relationship to purpose.",
                },
              ].map((s) => (
                <div key={s.t} className="text-center md:text-left">
                  <div
                    style={{
                      fontFamily: HEAD,
                      color: C_GOLD,
                      fontSize: "clamp(36px, 4.5vw, 48px)",
                      lineHeight: 1,
                      fontWeight: 300,
                    }}
                  >
                    {s.glyph}
                  </div>
                  <h3
                    className="mt-3"
                    style={{
                      fontFamily: HEAD,
                      color: C_HEAD,
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "clamp(20px, 2.2vw, 24px)",
                    }}
                  >
                    {s.t}
                  </h3>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: BODY,
                      color: C_BODY,
                      opacity: 0.85,
                      fontSize: "clamp(13px, 1.3vw, 15px)",
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

        {/* ── TRADITION ────────────────────────────────────────────── */}
        <section className="px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3rem,7vh,5rem)]">
          <div className="mx-auto max-w-2xl text-center">
            <Rule>The tradition</Rule>
            <p
              className="mt-5"
              style={{
                fontFamily: HEAD,
                color: C_HEAD,
                fontWeight: 300,
                fontSize: "clamp(18px, 2.2vw, 24px)",
                lineHeight: 1.55,
              }}
            >
              Kabbalistic Astrology is drawn from the{" "}
              <em>Sefer Yetzirah</em>, the oldest extant work of Jewish
              mysticism, and elaborated in the <em>Zohar</em>. It does not
              describe personality. It describes work.
            </p>
            <p
              className="mt-5"
              style={{
                fontFamily: BODY,
                color: C_BODY,
                opacity: 0.85,
                fontSize: "clamp(13px, 1.3vw, 15px)",
                lineHeight: 1.7,
              }}
            >
              Western astrology centers the natal chart and the personality it
              implies. The Kabbalistic reading centers the soul's correction —
              the pattern you came to mend, and the doorway through which you
              mend it.
            </p>
          </div>
        </section>

        {/* ── SECONDARY CTA ────────────────────────────────────────── */}
        <section className="px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3rem,7vh,5rem)] text-center">
          <Rule>Begin</Rule>
          <h2
            className="mt-5"
            style={{
              fontFamily: HEAD,
              color: C_HEAD,
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(28px, 4.5vw, 44px)",
              lineHeight: 1.1,
            }}
          >
            Turn the wheel.
          </h2>
          <p
            className="mx-auto mt-4"
            style={{
              fontFamily: BODY,
              color: C_BODY,
              opacity: 0.85,
              fontSize: "clamp(14px, 1.4vw, 16px)",
              lineHeight: 1.6,
              maxWidth: "32rem",
            }}
          >
            A free reading drawn in the moment. No account, no email, no
            subscription.
          </p>
          <button
            type="button"
            onClick={handleSpin}
            className="mt-7 inline-flex items-center gap-3 uppercase transition-opacity hover:opacity-90"
            style={{
              backgroundColor: C_GOLD,
              color: "var(--forest-deepest)",
              fontFamily: BODY,
              fontWeight: 600,
              letterSpacing: "0.28em",
              fontSize: "clamp(11px, 1.2vw, 13px)",
              padding: "clamp(14px, 1.8vh, 18px) clamp(28px, 4vw, 40px)",
              borderRadius: "2px",
            }}
          >
            Receive your reading
          </button>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <footer className="px-[clamp(1.25rem,5vw,3rem)] py-[clamp(1.5rem,3vh,2.5rem)]">
          <div className="mx-auto max-w-5xl">
            <Rule />
            <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row">
              <p
                style={{
                  fontFamily: HEAD,
                  color: C_HEAD,
                  fontWeight: 400,
                  fontSize: "13px",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                }}
              >
                Tikkun · תיקון
              </p>
              <p
                style={{
                  fontFamily: BODY,
                  color: C_MUTED,
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                © {new Date().getFullYear()} · Kabbalistic Astrology
              </p>
            </div>
          </div>
        </footer>
      </div>

      <ConstellationGlyph />
    </main>
  );
}
