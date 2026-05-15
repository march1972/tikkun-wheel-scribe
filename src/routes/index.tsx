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
      { title: "Tikkun — Discover Your Soul's Pattern of Correction" },
      {
        name: "description",
        content:
          "Spin the Tikkun wheel for a free Kabbalistic Astrology reading. Discover your soul's pattern of correction across love, money, and career.",
      },
      { property: "og:title", content: "Tikkun — Kabbalah Astrology" },
      {
        property: "og:description",
        content:
          "Spin the Tikkun wheel for a free Kabbalistic Astrology reading rooted in centuries-old tradition.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "Tikkun — Kabbalah Astrology" },
      {
        name: "twitter:description",
        content:
          "Spin the Tikkun wheel for a free Kabbalistic Astrology reading.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Tikkun",
          description:
            "Kabbalistic Astrology readings revealing your soul's pattern of correction.",
        }),
      },
    ],
  }),
});

function Landing() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState(0);
  const wheelSize = useResponsiveWheelSize(0.7, 220, 360);

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
      {/* HERO — top aligned so wheel + CTA fit above the fold */}
      <section className="relative flex min-h-[100svh] flex-col items-center px-[clamp(1rem,5vw,3rem)] pt-[clamp(1rem,3vh,2rem)] pb-[clamp(1.5rem,4vh,3rem)]">
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(216, 197, 153, 0.7)",
            fontWeight: 500,
            letterSpacing: "0.4em",
            fontSize: "clamp(8px, 1vw, 10px)",
          }}
        >
          Kabbalah Astrology
        </p>

        <h1
          className="mt-[clamp(0.5rem,1.5vh,1rem)] text-center leading-[1.02]"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
        >
          <span
            className="block italic"
            style={{ fontSize: "clamp(22px, 4.6vw, 42px)", color: "#f4ecdb" }}
          >
            Reveal Your
          </span>
          <span
            className="mt-1 block italic"
            style={{
              color: "#f0c868",
              fontSize: "clamp(40px, 9vw, 80px)",
              lineHeight: 1,
            }}
          >
            Tikkun
          </span>
        </h1>

        <p
          className="mt-[clamp(0.75rem,1.5vh,1.25rem)] text-center italic"
          style={{
            fontFamily: "var(--font-serif)",
            color: "#f0c868",
            fontSize: "clamp(13px, 1.5vw, 17px)",
          }}
        >
          Spin for your free 60-second reading.
        </p>

        <button
          type="button"
          onClick={handleSpin}
          aria-label="Spin the Tikkun wheel"
          className="group relative mt-[clamp(0.75rem,2vh,1.5rem)] cursor-pointer rounded-full transition-transform hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-bright)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--forest-deep)]"
        >
          <TikkunWheel size={wheelSize} state="idle" />
        </button>

        <p
          className="mt-[clamp(0.75rem,2vh,1.25rem)] inline-flex items-center gap-2 uppercase"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--gold-bright)",
            letterSpacing: "0.32em",
            fontSize: "clamp(10px, 1.2vw, 12px)",
            fontWeight: 600,
          }}
        >
          <span aria-hidden="true">↑</span>
          Tap the wheel to begin
        </p>

        {used > 0 && remaining > 0 && (
          <p
            className="mt-3 italic"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--cream-faint)",
              fontSize: "12px",
            }}
          >
            {remaining} free {remaining === 1 ? "spin" : "spins"} left
          </p>
        )}

        <p
          className="mt-[clamp(1rem,2vh,1.5rem)] text-center"
          style={{
            fontFamily: "var(--font-sans)",
            color: "#f6ecd0",
            fontWeight: 400,
            fontSize: "clamp(13px, 1.4vw, 16px)",
            lineHeight: 1.6,
            maxWidth: "min(92vw, 520px)",
          }}
        >
          Kabbalistic Astrology maps your <em>Tikkun</em>, the soul's pattern of
          correction that signals how to{" "}
          <span style={{ fontWeight: 700 }}>fulfill your life's potential</span>{" "}
          in relationships, finances, and career.
        </p>

        <ConstellationGlyph />
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-[color:var(--gold-deep)]/30 px-[clamp(1rem,5vw,3rem)] py-[clamp(2.5rem,7vh,5rem)]">
        <div className="mx-auto max-w-3xl">
          <p
            className="text-center uppercase"
            style={{
              fontFamily: "var(--font-sans)",
              color: "#d8c599",
              letterSpacing: "0.4em",
              fontSize: "clamp(10px, 1.1vw, 12px)",
              fontWeight: 600,
            }}
          >
            How It Works
          </p>
          <h2
            className="mt-3 text-center italic"
            style={{
              fontFamily: "var(--font-serif)",
              color: "#f4ecdb",
              fontWeight: 300,
              fontSize: "clamp(24px, 4vw, 38px)",
              lineHeight: 1.15,
            }}
          >
            Three turns of the wheel
          </h2>

          <ol className="mt-[clamp(1.5rem,4vh,3rem)] grid gap-[clamp(1rem,3vw,2rem)] sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "Spin the wheel",
                d: "Tap to set the Tikkun wheel in motion. Twelve sacred Hebrew letters await.",
              },
              {
                n: "02",
                t: "Receive your sign",
                d: "The wheel settles on the letter that maps to your current Kabbalistic sign.",
              },
              {
                n: "03",
                t: "Read your Tikkun",
                d: "Discover your soul's pattern of correction across love, money, and purpose.",
              },
            ].map((s) => (
              <li key={s.n} className="text-center">
                <p
                  className="italic"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "#f0c868",
                    fontSize: "clamp(28px, 4vw, 40px)",
                    fontWeight: 400,
                  }}
                >
                  {s.n}
                </p>
                <h3
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "#f4ecdb",
                    fontSize: "clamp(16px, 1.8vw, 20px)",
                    fontWeight: 500,
                  }}
                >
                  {s.t}
                </h3>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "#f6ecd0",
                    opacity: 0.85,
                    fontSize: "clamp(13px, 1.3vw, 15px)",
                    lineHeight: 1.6,
                  }}
                >
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TRADITION / TRUST */}
      <section className="border-t border-[color:var(--gold-deep)]/30 bg-[color:var(--forest-deepest)] px-[clamp(1rem,5vw,3rem)] py-[clamp(2.5rem,7vh,5rem)]">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="uppercase"
            style={{
              fontFamily: "var(--font-sans)",
              color: "#d8c599",
              letterSpacing: "0.4em",
              fontSize: "clamp(10px, 1.1vw, 12px)",
              fontWeight: 600,
            }}
          >
            Rooted in tradition
          </p>
          <p
            className="mt-4 italic"
            style={{
              fontFamily: "var(--font-serif)",
              color: "#f4ecdb",
              fontWeight: 300,
              fontSize: "clamp(20px, 3vw, 30px)",
              lineHeight: 1.4,
            }}
          >
            Two thousand years of Kabbalistic wisdom, distilled into a single
            sign for your soul.
          </p>
          <p
            className="mt-6"
            style={{
              fontFamily: "var(--font-sans)",
              color: "#f6ecd0",
              opacity: 0.8,
              fontSize: "clamp(13px, 1.3vw, 15px)",
              lineHeight: 1.7,
            }}
          >
            The Tikkun, drawn from the teachings of the Sefer Yetzirah and the
            Zohar, reveals the inner correction your soul came into this life
            to make. Each of the twelve letters is a doorway.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[color:var(--gold-deep)]/30 px-[clamp(1rem,5vw,3rem)] py-[clamp(2.5rem,7vh,5rem)]">
        <div className="mx-auto max-w-2xl">
          <p
            className="text-center uppercase"
            style={{
              fontFamily: "var(--font-sans)",
              color: "#d8c599",
              letterSpacing: "0.4em",
              fontSize: "clamp(10px, 1.1vw, 12px)",
              fontWeight: 600,
            }}
          >
            Questions
          </p>
          <h2
            className="mt-3 text-center italic"
            style={{
              fontFamily: "var(--font-serif)",
              color: "#f4ecdb",
              fontWeight: 300,
              fontSize: "clamp(24px, 4vw, 38px)",
            }}
          >
            What to know
          </h2>

          <dl className="mt-[clamp(1.5rem,4vh,3rem)] space-y-6">
            {[
              {
                q: "Is the reading really free?",
                a: "Yes. Each visitor gets up to three free spins of the Tikkun wheel and a full reading for the sign they land on.",
              },
              {
                q: "What is a Tikkun?",
                a: "A Tikkun (Hebrew: תיקון, 'correction') is the soul's specific work in this lifetime — the pattern it came to mend across relationships, finances, and purpose.",
              },
              {
                q: "Do I need to know Kabbalah?",
                a: "No prior knowledge is required. The reading speaks plainly about your strengths, your shadow, and the path forward.",
              },
              {
                q: "How is this different from Western astrology?",
                a: "Western astrology centers the natal chart. Kabbalistic Astrology centers the soul's correction — the work, not the personality.",
              },
            ].map((f) => (
              <div
                key={f.q}
                className="border-b border-[color:var(--gold-deep)]/20 pb-6 last:border-b-0"
              >
                <dt
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "#f4ecdb",
                    fontSize: "clamp(16px, 1.8vw, 20px)",
                    fontWeight: 500,
                  }}
                >
                  {f.q}
                </dt>
                <dd
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "#f6ecd0",
                    opacity: 0.85,
                    fontSize: "clamp(13px, 1.3vw, 15px)",
                    lineHeight: 1.65,
                  }}
                >
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* SECONDARY CTA */}
      <section className="border-t border-[color:var(--gold-deep)]/30 bg-[color:var(--forest-deepest)] px-[clamp(1rem,5vw,3rem)] py-[clamp(3rem,8vh,5rem)] text-center">
        <h2
          className="italic"
          style={{
            fontFamily: "var(--font-serif)",
            color: "#f0c868",
            fontWeight: 300,
            fontSize: "clamp(26px, 4.5vw, 44px)",
            lineHeight: 1.1,
          }}
        >
          What's your Tikkun?
        </h2>
        <button
          type="button"
          onClick={handleSpin}
          className="mt-6 inline-flex items-center gap-2 rounded-full font-semibold uppercase transition-opacity hover:opacity-90"
          style={{
            backgroundColor: "var(--gold-bright)",
            color: "var(--forest-deepest)",
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.28em",
            fontSize: "clamp(11px, 1.3vw, 14px)",
            padding: "clamp(12px, 1.6vh, 16px) clamp(24px, 3.5vw, 36px)",
          }}
        >
          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
            <path d="M6 1 L11 8 L1 8 Z" fill="currentColor" />
          </svg>
          Spin the wheel
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[color:var(--gold-deep)]/30 px-[clamp(1rem,5vw,3rem)] py-[clamp(1.5rem,3vh,2.5rem)] text-center">
        <p
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--cream-faint)",
            fontSize: "11px",
            letterSpacing: "0.2em",
          }}
        >
          © {new Date().getFullYear()} Tikkun — Kabbalah Astrology
        </p>
      </footer>
    </main>
  );
}
