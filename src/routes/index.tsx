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

// Tokens tuned for serious, editorial restraint
const HEAD_FAMILY = "var(--font-serif)"; // Fraunces
const BODY_FAMILY = "var(--font-sans)"; // General Sans
const C_HEAD = "#f4ecdb"; // primary cream
const C_BODY = "#f6ecd0"; // body cream
const C_GOLD = "#f0c868"; // accent gold
const C_MUTED = "#d8c599"; // muted gold for eyebrows
const RULE = "border-[color:var(--gold-deep)]/25";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="uppercase"
      style={{
        fontFamily: BODY_FAMILY,
        color: C_MUTED,
        fontWeight: 500,
        letterSpacing: "0.42em",
        fontSize: "clamp(10px, 1vw, 11px)",
      }}
    >
      {children}
    </p>
  );
}

function Landing() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState(0);
  const wheelSize = useResponsiveWheelSize(0.7, 240, 360);

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
    <main className="relative bg-forest-deep text-cream">
      {/* HEADER — wordmark only, like kabbalah.com */}
      <header className="px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1.25rem,3vh,2rem)]">
        <p
          className="uppercase"
          style={{
            fontFamily: HEAD_FAMILY,
            color: C_HEAD,
            fontWeight: 400,
            letterSpacing: "0.32em",
            fontSize: "clamp(13px, 1.4vw, 16px)",
          }}
        >
          Tikkun
        </p>
      </header>

      {/* HERO */}
      <section className="px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1.5rem,4vh,3rem)] pb-[clamp(2rem,5vh,4rem)]">
        <div className="mx-auto grid max-w-6xl gap-[clamp(2rem,4vw,4rem)] md:grid-cols-2 md:items-center">
          {/* Left: copy (order-2 on mobile so wheel shows first) */}
          <div className="order-2 text-center md:order-1 md:text-left">
            <Eyebrow>Kabbalistic Astrology</Eyebrow>
            <h1
              className="mt-[clamp(0.75rem,1.5vh,1.25rem)] leading-[1.05]"
              style={{ fontFamily: HEAD_FAMILY, fontWeight: 300 }}
            >
              <span
                className="block"
                style={{
                  fontSize: "clamp(32px, 5.5vw, 56px)",
                  color: C_HEAD,
                }}
              >
                Ancient wisdom.
              </span>
              <span
                className="block italic"
                style={{
                  fontSize: "clamp(32px, 5.5vw, 56px)",
                  color: C_GOLD,
                }}
              >
                Your soul's correction.
              </span>
            </h1>

            <p
              className="mt-[clamp(1rem,2vh,1.5rem)] mx-auto md:mx-0"
              style={{
                fontFamily: BODY_FAMILY,
                color: C_BODY,
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.6,
                fontWeight: 400,
                maxWidth: "32rem",
              }}
            >
              Kabbalistic Astrology maps your <em>Tikkun</em> — the soul's
              pattern of correction and the work it came into this life to
              complete across{" "}
              <span style={{ fontWeight: 600, color: C_HEAD }}>
                relationships, finances, and vocation
              </span>
              .
            </p>

            {/* Benefit bullets */}
            <ul
              className="mt-[clamp(1.25rem,2.5vh,1.75rem)] space-y-3 text-left mx-auto md:mx-0"
              style={{ maxWidth: "30rem" }}
            >
              {[
                "The Hebrew letter that governs your soul",
                "The correction your relationships are asking of you",
                "The shape of your vocation and your shadow",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3"
                  style={{
                    fontFamily: BODY_FAMILY,
                    color: C_BODY,
                    fontSize: "clamp(14px, 1.4vw, 16px)",
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] inline-block h-px w-4 shrink-0"
                    style={{ backgroundColor: C_GOLD }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-[clamp(1.5rem,3vh,2rem)] flex flex-col items-center gap-3 md:items-start">
              <button
                type="button"
                onClick={handleSpin}
                className="inline-flex items-center gap-3 uppercase transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-bright)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--forest-deep)]"
                style={{
                  backgroundColor: C_GOLD,
                  color: "var(--forest-deepest)",
                  fontFamily: BODY_FAMILY,
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
                  fontFamily: BODY_FAMILY,
                  color: C_MUTED,
                  opacity: 0.85,
                  fontSize: "clamp(11px, 1.1vw, 12px)",
                  letterSpacing: "0.04em",
                }}
              >
                {remaining > 0
                  ? `Free reading. ${remaining} of ${MAX_SPINS} ${remaining === 1 ? "turn" : "turns"} remaining.`
                  : "Free reading. Three turns of the wheel."}
              </p>
            </div>
          </div>

          {/* Right: wheel (order-1 on mobile so it appears first) */}
          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <button
              type="button"
              onClick={handleSpin}
              aria-label="Turn the Tikkun wheel"
              className="group relative cursor-pointer rounded-full transition-transform duration-700 ease-out hover:scale-[1.015] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-bright)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--forest-deep)]"
            >
              <TikkunWheel size={wheelSize} state="idle" />
            </button>
          </div>
        </div>
      </section>

      {/* TEACHING — passage from Sefer Yetzirah */}
      <section className={`border-t ${RULE} bg-[color:var(--forest-deepest)] px-[clamp(1.25rem,5vw,3rem)] py-[clamp(2.5rem,6vh,4.5rem)]`}>
        <div className="mx-auto max-w-2xl text-center">
          <p
            style={{
              fontFamily: HEAD_FAMILY,
              color: C_HEAD,
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(18px, 2.2vw, 26px)",
              lineHeight: 1.55,
            }}
          >
            "With twenty-two letters He engraved, hewed, weighed, and combined
            them, and out of them He formed all that was formed and all that
            will be formed."
          </p>
          <p
            className="mt-[clamp(1rem,2vh,1.5rem)]"
            style={{
              fontFamily: BODY_FAMILY,
              color: C_MUTED,
              opacity: 0.8,
              fontSize: "clamp(11px, 1.1vw, 12px)",
              letterSpacing: "0.32em",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            Sefer Yetzirah · 2:2
          </p>
        </div>
      </section>

      {/* WHAT THE READING REVEALS */}
      <section className={`border-t ${RULE} px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3rem,7vh,5rem)]`}>
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Eyebrow>The reading</Eyebrow>
            <h2
              className="mt-3"
              style={{
                fontFamily: HEAD_FAMILY,
                color: C_HEAD,
                fontWeight: 300,
                fontSize: "clamp(26px, 3.8vw, 40px)",
                lineHeight: 1.15,
              }}
            >
              A structured map of the soul's work
            </h2>
            <p
              className="mt-4 mx-auto"
              style={{
                fontFamily: BODY_FAMILY,
                color: C_BODY,
                opacity: 0.9,
                fontSize: "clamp(14px, 1.4vw, 16px)",
                lineHeight: 1.65,
                maxWidth: "38rem",
              }}
            >
              The twelve letters of the Hebrew alphabet correspond to the
              twelve months, the twelve tribes, and the twelve gates of the
              soul. Each is a doorway into a particular correction.
            </p>
          </div>

          <div className="mt-[clamp(2rem,5vh,3.5rem)] grid gap-[clamp(1.5rem,3vw,2.5rem)] md:grid-cols-3">
            {[
              {
                t: "Your sign",
                d: "The Hebrew letter and month that govern your soul, drawn from the Sefer Yetzirah's twelvefold scheme.",
              },
              {
                t: "Your tikkun",
                d: "The specific correction your soul came to make — the work that defines this lifetime.",
              },
              {
                t: "Your fields",
                d: "How the correction expresses itself in love, livelihood, and your relationship to purpose.",
              },
            ].map((s) => (
              <div key={s.t}>
                <h3
                  style={{
                    fontFamily: HEAD_FAMILY,
                    color: C_GOLD,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(20px, 2.2vw, 26px)",
                  }}
                >
                  {s.t}
                </h3>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: BODY_FAMILY,
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

      {/* TRADITION */}
      <section className={`border-t ${RULE} bg-[color:var(--forest-deepest)] px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3rem,7vh,5rem)]`}>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>The tradition</Eyebrow>
          <p
            className="mt-4"
            style={{
              fontFamily: HEAD_FAMILY,
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
            className="mt-6"
            style={{
              fontFamily: BODY_FAMILY,
              color: C_BODY,
              opacity: 0.8,
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

      {/* SECONDARY CTA */}
      <section className={`border-t ${RULE} px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3rem,7vh,5rem)] text-center`}>
        <Eyebrow>Begin</Eyebrow>
        <h2
          className="mt-3"
          style={{
            fontFamily: HEAD_FAMILY,
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
          className="mt-4 mx-auto"
          style={{
            fontFamily: BODY_FAMILY,
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
            fontFamily: BODY_FAMILY,
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

      {/* FOOTER */}
      <footer className={`border-t ${RULE} px-[clamp(1.25rem,5vw,3rem)] py-[clamp(1.5rem,3vh,2.5rem)]`}>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 md:flex-row">
          <p
            style={{
              fontFamily: HEAD_FAMILY,
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
              fontFamily: BODY_FAMILY,
              color: "var(--cream-faint)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            © {new Date().getFullYear()} · Kabbalistic Astrology
          </p>
        </div>
      </footer>

      <ConstellationGlyph />
    </main>
  );
}
