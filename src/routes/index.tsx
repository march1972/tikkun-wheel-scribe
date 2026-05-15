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
          "A Kabbalistic Astrology reading drawn from the twelve letters of the Hebrew alphabet and the soul's pattern of correction.",
      },
      { property: "og:title", content: "Tikkun — Kabbalistic Astrology" },
      {
        property: "og:description",
        content:
          "Twelve letters. One correction. A reading rooted in the Sefer Yetzirah.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Landing() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState(0);
  const wheelSize = useResponsiveWheelSize(0.72, 240, 380);

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
    <main className="relative flex min-h-[100svh] flex-col bg-forest-deep text-cream">
      {/* Eyebrow — small, present, recedes */}
      <header className="px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1.25rem,3vh,2rem)]">
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-sans)",
            color: "rgba(216, 197, 153, 0.55)",
            fontWeight: 500,
            letterSpacing: "0.42em",
            fontSize: "clamp(9px, 1vw, 11px)",
          }}
        >
          Kabbalistic Astrology
        </p>
      </header>

      {/* WHEEL — the page */}
      <section className="flex flex-1 flex-col items-center justify-center px-[clamp(1.25rem,5vw,3rem)] py-[clamp(1.5rem,4vh,3rem)]">
        <button
          type="button"
          onClick={handleSpin}
          aria-label="Turn the wheel"
          className="group relative cursor-pointer rounded-full transition-transform duration-700 ease-out hover:scale-[1.015] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold-bright)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--forest-deep)]"
        >
          <TikkunWheel size={wheelSize} state="idle" />
        </button>

        {used > 0 && remaining > 0 && (
          <p
            className="mt-[clamp(1rem,2vh,1.5rem)] italic"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--cream-faint)",
              fontSize: "12px",
              letterSpacing: "0.04em",
            }}
          >
            {remaining === 1 ? "one turn remaining" : `${remaining} turns remaining`}
          </p>
        )}
      </section>

      {/* TEACHING — a single passage, no CTA, no marketing */}
      <section className="px-[clamp(1.25rem,5vw,3rem)] pb-[clamp(2rem,5vh,4rem)]">
        <div className="mx-auto max-w-[34rem]">
          <p
            className="text-center"
            style={{
              fontFamily: "var(--font-serif)",
              color: "#f4ecdb",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(15px, 1.7vw, 19px)",
              lineHeight: 1.65,
              letterSpacing: "0.005em",
            }}
          >
            With twenty-two letters He engraved, hewed, weighed, and combined
            them, and out of them He formed all that was formed and all that
            will be formed.
          </p>
          <p
            className="mt-[clamp(1.25rem,2.5vh,1.75rem)] text-center"
            style={{
              fontFamily: "var(--font-sans)",
              color: "#d8c599",
              opacity: 0.75,
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

      {/* COLOPHON */}
      <footer className="px-[clamp(1.25rem,5vw,3rem)] pb-[clamp(1.25rem,3vh,2rem)]">
        <p
          className="text-center"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--cream-faint)",
            fontSize: "10px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Tikkun · תיקון
        </p>
      </footer>

      <ConstellationGlyph />
    </main>
  );
}
