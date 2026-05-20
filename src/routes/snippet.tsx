import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SkyShell } from "@/components/landing/SkyShell";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_DAWN, C_RULE,
} from "@/lib/landing-style";
import { signById, randomTikkunSign, STATIC_COPY, type TikkunSign } from "@/lib/tikkun-data";
import { MAX_SPINS, getCurrentSpinNumber, setCurrentSpinNumber } from "@/lib/spinAttempts";

export const Route = createFileRoute("/snippet")({
  component: Snippet,
  head: () => ({ meta: [{ title: "Your Tikkun teaser" }] }),
});

function Snippet() {
  const navigate = useNavigate();
  const [sign, setSign] = useState<TikkunSign | null>(null);
  const [spinNumber, setSpinNumber] = useState(1);

  useEffect(() => {
    const key = sessionStorage.getItem("tikkun_target_sign");
    const s = signById(key);
    if (!s) {
      navigate({ to: "/" });
      return;
    }
    setSign(s);
    setSpinNumber(Math.min(MAX_SPINS, Math.max(1, getCurrentSpinNumber())));
  }, [navigate]);

  const handleSpinAgain = () => {
    const next = spinNumber + 1;
    if (next > MAX_SPINS) {
      navigate({ to: "/maxspins" });
      return;
    }
    setCurrentSpinNumber(next);
    const target = randomTikkunSign(sign?.id ?? null);
    sessionStorage.setItem("tikkun_target_sign", target.id);
    navigate({ to: "/spinning" });
  };

  if (!sign) return null;
  const canSpinAgain = spinNumber < MAX_SPINS;
  const copy = STATIC_COPY.screen3;

  return (
    <SkyShell starDensity={200}>
      <section className="relative mx-auto flex max-w-2xl flex-col items-center px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,5vh,4rem)] pb-[clamp(3rem,6vh,5rem)] text-center">
        {/* Eyebrow: Does this sound like you? */}
        <div className="flex w-full items-center gap-3">
          <span className="h-px flex-1" style={{ background: C_RULE }} />
          <span
            style={{
              fontFamily: BODY, color: C_INK_SOFT, fontSize: "11px",
              letterSpacing: "0.36em", textTransform: "uppercase", fontWeight: 600,
            }}
          >
            {copy.prompt}
          </span>
          <span className="h-px flex-1" style={{ background: C_RULE }} />
        </div>

        {/* Sign + snippet block — visibly contained */}
        <div
          className="mt-[clamp(1.5rem,3vh,2.25rem)] w-full"
          style={{
            background: "rgba(15, 23, 41, 0.55)",
            border: `1px solid ${C_RULE}`,
            borderRadius: "4px",
            padding: "clamp(1.5rem,4vw,2.5rem)",
            boxShadow: "0 20px 60px -20px rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="flex items-baseline justify-center gap-[clamp(12px,2.5vw,24px)]">
            <span
              style={{
                fontFamily: HEAD, color: C_DAWN, fontSize: "clamp(56px, 12vw, 110px)",
                lineHeight: 1, textShadow: `0 0 24px ${C_DAWN}55`,
              }}
            >
              {sign.hebrewLetter}
            </span>
            <span
              style={{
                fontFamily: HEAD, color: C_INK, fontStyle: "italic", fontWeight: 400,
                fontSize: "clamp(28px, 6vw, 56px)",
              }}
            >
              {sign.sign}
            </span>
          </div>

          <p
            className="mt-[clamp(1.25rem,2.5vh,1.75rem)] font-mono font-thin"
            style={{
              color: C_INK, lineHeight: 1.6, fontSize: "clamp(14px, 1.7vw, 17px)",
            }}
          >
            {sign.screen3.spinSnippet}
          </p>
        </div>

        {/* Spin again */}
        {canSpinAgain ? (
          <button
            type="button"
            onClick={handleSpinAgain}
            className="mt-[clamp(1rem,2.5vh,1.5rem)] uppercase transition-opacity hover:opacity-70"
            style={{
              fontFamily: BODY, letterSpacing: "0.24em", color: C_INK_SOFT,
              background: "transparent", border: `1px solid ${C_RULE}`,
              padding: "10px 22px", borderRadius: "999px", fontSize: "11px",
            }}
          >
            Not quite — spin again ({spinNumber} of {MAX_SPINS})
          </button>
        ) : (
          <p
            className="mt-[clamp(1.5rem,3vh,2rem)] max-w-xs italic font-mono"
            style={{ color: C_MUTED, fontSize: "12px" }}
          >
            {MAX_SPINS} of {MAX_SPINS} reached. Your real Tikkun awaits.
          </p>
        )}

        {/* CTA — red dawn accent */}
        <button
          type="button"
          onClick={() => navigate({ to: "/interstitial" })}
          className="group mt-[clamp(1.25rem,3vh,2rem)] inline-flex items-center gap-3 uppercase transition-all duration-300 hover:scale-[1.04] hover:brightness-110 hover:gap-5"
          style={{
            background: `linear-gradient(135deg, ${C_DAWN} 0%, #b73a1d 100%)`,
            color: C_INK,
            fontFamily: BODY,
            fontWeight: 700,
            letterSpacing: "0.28em",
            fontSize: "clamp(11px, 1.2vw, 13px)",
            padding: "clamp(14px, 1.9vh, 20px) clamp(24px, 4vw, 44px)",
            borderRadius: "0px",
            boxShadow: `0 10px 40px -10px ${C_DAWN}aa`,
          }}
        >
          <span>{copy.primaryButton}</span>
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" style={{ fontWeight: 800 }}>
            →
          </span>
        </button>
        <p
          className="mt-3 italic font-mono"
          style={{ color: C_MUTED, fontSize: "clamp(11px, 1.2vw, 13px)" }}
        >
          {copy.reassurance}
        </p>
      </section>
    </SkyShell>
  );
}

