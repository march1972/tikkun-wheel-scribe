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
});

function Landing() {
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState(0);
  const wheelSize = useResponsiveWheelSize(0.8, 260, 420);

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

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-forest-deep px-[clamp(1rem,5vw,3rem)] py-[clamp(2rem,6vh,5rem)] text-cream">
      <p
        className="mb-6 font-semibold uppercase text-gold-bright"
        style={{
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.42em",
          fontSize: "clamp(10px, 1.4vw, 13px)",
        }}
      >
        Kabbalah Astrology
      </p>

      <h1
        className="text-center leading-[1.05] text-cream"
        style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
      >
        <span className="block" style={{ fontSize: "clamp(28px, 6vw, 56px)" }}>Reveal Your</span>
        <span
          className="mt-1 block italic"
          style={{ color: "var(--gold-bright)", fontSize: "clamp(32px, 7vw, 64px)" }}
        >
          Tikkun
        </span>
      </h1>

      <span
        aria-hidden="true"
        className="my-6 block h-px w-10"
        style={{ backgroundColor: "var(--gold-deep)" }}
      />

      <p
        className="text-center text-cream"
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          fontSize: "clamp(14px, 1.6vw, 18px)",
          lineHeight: 1.65,
          maxWidth: "min(92vw, 520px)",
        }}
      >
        Kabbalistic Astrology maps your <em>Tikkun</em>, the soul's pattern of
        correction that signals how to fulfill your life's potential in
        relationships, finances, and career.
      </p>

      <p
        className="mt-8 italic"
        style={{
          fontFamily: "var(--font-serif)",
          color: "var(--gold-bright)",
          fontWeight: 400,
          fontSize: "clamp(15px, 1.8vw, 20px)",
        }}
      >
        What's your Tikkun?
      </p>

      <div className="mt-8">
        <TikkunWheel size={wheelSize} state="idle" onClick={handleSpin} />
      </div>

      <button
        type="button"
        onClick={handleSpin}
        className="mt-8 inline-flex items-center gap-2 rounded-full font-semibold uppercase transition-opacity hover:opacity-90"
        style={{
          backgroundColor: "var(--gold-bright)",
          color: "var(--forest-deepest)",
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.28em",
          fontSize: "clamp(11px, 1.3vw, 14px)",
          padding: "clamp(10px, 1.4vh, 14px) clamp(20px, 3vw, 32px)",
        }}
      >
        <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
          <path d="M6 1 L11 8 L1 8 Z" fill="currentColor" />
        </svg>
        Tap to spin
      </button>

      {used > 0 && used < MAX_SPINS && (
        <p
          className="mt-4 text-[12px] italic"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--cream-faint)",
          }}
        >
          {used} of {MAX_SPINS} free spins used
        </p>
      )}

      <ConstellationGlyph />
    </main>
  );
}
