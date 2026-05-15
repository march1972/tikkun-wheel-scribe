import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ConstellationGlyph } from "@/components/ConstellationGlyph";
import { randomSign, signByKey, type Sign } from "@/lib/bundle";
import {
  MAX_SPINS,
  getAttempts,
  incrementAttempt,
  spinsRemaining,
} from "@/lib/spinAttempts";

export const Route = createFileRoute("/snippet")({
  component: Snippet,
});

function Snippet() {
  const navigate = useNavigate();
  const [sign, setSign] = useState<Sign | null>(null);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const key = sessionStorage.getItem("tikkun_target_sign");
    const s = signByKey(key);
    if (!s) {
      navigate({ to: "/" });
      return;
    }
    setSign(s);
    setRemaining(spinsRemaining());
  }, [navigate]);

  const handleSpinAgain = () => {
    const next = incrementAttempt();
    if (next > MAX_SPINS) {
      navigate({ to: "/maxspins" });
      return;
    }
    const target = randomSign();
    sessionStorage.setItem("tikkun_target_sign", target.key);
    navigate({ to: "/spinning" });
  };

  if (!sign) return null;

  const usedAll = getAttempts() >= MAX_SPINS;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-forest-deep px-[clamp(1rem,5vw,3rem)] py-[clamp(2rem,6vh,5rem)] text-cream">
      <div className="flex items-baseline gap-[clamp(12px,2vw,24px)]">
        <span
          style={{
            fontFamily: "var(--font-serif-2)",
            color: "var(--cream)",
            fontSize: "clamp(44px, 10vw, 88px)",
            lineHeight: 1,
          }}
        >
          {sign.letter}
        </span>
        <span
          className="italic"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--cream)",
            fontSize: "clamp(26px, 6vw, 52px)",
            fontWeight: 300,
          }}
        >
          {sign.signName}
        </span>
      </div>

      <span
        aria-hidden="true"
        className="my-5 block h-px w-10"
        style={{ backgroundColor: "var(--gold-deep)" }}
      />

      <div
        className="rounded-sm text-center"
        style={{
          backgroundColor: "var(--forest-mid)",
          border: "1px solid var(--gold-deep)",
          maxWidth: "min(92vw, 560px)",
          padding: "clamp(16px, 3vw, 28px) clamp(18px, 4vw, 32px)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--cream)",
            fontSize: "clamp(14px, 1.6vw, 18px)",
            lineHeight: 1.65,
          }}
        >
          You have a tendency to {sign.oneParagraph}
        </p>
      </div>

      <p
        className="mt-6 italic"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(15px, 2vw, 22px)",
          color: "#FFB347",
        }}
      >
        Does this sound like you?
      </p>

      <button
        type="button"
        onClick={() => navigate({ to: "/form" })}
        className="mt-5 rounded-full font-semibold uppercase transition-opacity hover:opacity-90"
        style={{
          backgroundColor: "var(--gold-bright)",
          color: "var(--forest-deepest)",
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.28em",
          fontSize: "clamp(11px, 1.3vw, 14px)",
          padding: "clamp(10px, 1.4vh, 14px) clamp(22px, 3.5vw, 36px)",
        }}
      >
        See My Real Tikkun
      </button>

      <p
        className="mt-3 italic"
        style={{
          fontFamily: "var(--font-serif)",
          color: "var(--cream-faint)",
          fontSize: "clamp(11px, 1.2vw, 14px)",
        }}
      >
        Your real reading takes 30 seconds.
      </p>

      {remaining > 0 ? (
        <button
          type="button"
          onClick={handleSpinAgain}
          className="mt-6 text-[12px] uppercase transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.24em",
            color: "var(--cream)",
            background: "transparent",
            border: "1px solid var(--gold-deep)",
            padding: "10px 20px",
            borderRadius: "999px",
          }}
        >
          Not quite — spin again ({remaining} left)
        </button>
      ) : usedAll ? (
        <p
          className="mt-6 max-w-[320px] text-center text-[12px] italic"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--cream-faint)",
          }}
        >
          You've used all 3 free spins. Your real Tikkun awaits.
        </p>
      ) : null}

      <ConstellationGlyph />
    </main>
  );
}
