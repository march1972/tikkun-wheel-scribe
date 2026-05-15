import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TikkunWheel } from "@/components/TikkunWheel";
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
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-forest-deep px-6 py-16 text-cream">
      <p
        className="mb-6 text-[11px] font-semibold uppercase text-gold-bright"
        style={{
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.42em",
        }}
      >
        Kabbalah Astrology
      </p>

      <h1
        className="text-center leading-[1.05] text-cream"
        style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
      >
        <span className="block text-[34px] md:text-[40px]">Reveal Your</span>
        <span
          className="mt-1 block text-[36px] italic md:text-[44px]"
          style={{ color: "var(--gold-bright)" }}
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
        className="max-w-[420px] text-center text-[15px] leading-relaxed text-cream"
        style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
      >
        Kabbalistic Astrology maps your <em>Tikkun</em>, the soul's pattern of
        correction that signals how to fulfill your life's potential in
        relationships, finances, and career.
      </p>

      <p
        className="mt-8 text-[16px] italic"
        style={{
          fontFamily: "var(--font-serif)",
          color: "var(--gold-bright)",
          fontWeight: 400,
        }}
      >
        What's your Tikkun?
      </p>

      <div className="mt-8">
        <TikkunWheel size={320} state="idle" onClick={handleSpin} />
      </div>

      <button
        type="button"
        onClick={handleSpin}
        className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] font-semibold uppercase transition-opacity hover:opacity-90"
        style={{
          backgroundColor: "var(--gold-bright)",
          color: "var(--forest-deepest)",
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.28em",
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
