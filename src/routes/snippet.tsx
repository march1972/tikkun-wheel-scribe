import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SkyShell } from "@/components/landing/SkyShell";
import { PrimaryCTA } from "@/components/landing/PrimaryCTA";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_DAWN, C_RULE,
} from "@/lib/landing-style";
import { signById, randomTikkunSign, STATIC_COPY, type TikkunSign } from "@/lib/tikkun-data";
import { MAX_SPINS, getAttempts, incrementAttempt } from "@/lib/spinAttempts";

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
    setSpinNumber(Math.min(MAX_SPINS, Math.max(1, getAttempts())));
  }, [navigate]);

  const handleSpinAgain = () => {
    const next = incrementAttempt();
    if (next > MAX_SPINS) {
      navigate({ to: "/maxspins" });
      return;
    }
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
        {/* Eyebrow */}
        <div className="flex w-full items-center gap-3">
          <span className="h-px flex-1" style={{ background: C_RULE }} />
          <span
            style={{
              fontFamily: BODY, color: C_INK_SOFT, fontSize: "11px",
              letterSpacing: "0.36em", textTransform: "uppercase", fontWeight: 600,
            }}
          >
            {copy.eyebrow}
          </span>
          <span className="h-px flex-1" style={{ background: C_RULE }} />
        </div>

        {/* Letter + sign */}
        <div className="mt-[clamp(1.5rem,3vh,2.25rem)] flex items-baseline gap-[clamp(12px,2.5vw,24px)]">
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

        {/* Snippet */}
        <p
          className="mt-[clamp(1.5rem,3vh,2rem)] font-mono font-thin"
          style={{
            color: C_INK_SOFT, lineHeight: 1.6, fontSize: "clamp(14px, 1.7vw, 17px)",
            maxWidth: "34rem",
          }}
        >
          <span style={{ color: C_INK }}>{sign.screen3.spinSnippet}</span>
        </p>

        {/* Prompt */}
        <p
          className="mt-[clamp(1.75rem,3.5vh,2.5rem)] italic"
          style={{
            fontFamily: HEAD, color: C_GOLD, fontSize: "clamp(17px, 2.2vw, 22px)",
          }}
        >
          {copy.prompt}
        </p>

        {/* CTA */}
        <div className="mt-[clamp(1.25rem,3vh,2rem)]">
          <PrimaryCTA label={copy.primaryButton} onClick={() => navigate({ to: "/interstitial" })} />
        </div>
        <p
          className="mt-3 italic font-mono"
          style={{ color: C_MUTED, fontSize: "clamp(11px, 1.2vw, 13px)" }}
        >
          {copy.reassurance}
        </p>

        {/* Spin again */}
        {remaining > 0 ? (
          <button
            type="button"
            onClick={handleSpinAgain}
            className="mt-[clamp(1.75rem,3.5vh,2.5rem)] uppercase transition-opacity hover:opacity-70"
            style={{
              fontFamily: BODY, letterSpacing: "0.24em", color: C_INK_SOFT,
              background: "transparent", border: `1px solid ${C_RULE}`,
              padding: "10px 22px", borderRadius: "999px", fontSize: "11px",
            }}
          >
            {copy.secondaryButton.replace("(N left)", `(${remaining} left)`)}
          </button>
        ) : usedAll ? (
          <p
            className="mt-[clamp(1.5rem,3vh,2rem)] max-w-xs italic font-mono"
            style={{ color: C_MUTED, fontSize: "12px" }}
          >
            You've used all 3 free spins. Your real Tikkun awaits.
          </p>
        ) : null}
      </section>
    </SkyShell>
  );
}
