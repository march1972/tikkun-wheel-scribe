import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SkyShell } from "@/components/landing/SkyShell";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_DAWN, C_RULE,
} from "@/lib/landing-style";
import { signById, randomTikkunSign, STATIC_COPY, type TikkunSign } from "@/lib/tikkun-data";
import { MAX_SPINS, FREE_SPINS_BEFORE_FORM, getCurrentSpinNumber, setCurrentSpinNumber } from "@/lib/spinAttempts";

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
    const current = Math.min(MAX_SPINS, Math.max(1, getCurrentSpinNumber()));
    if (current > FREE_SPINS_BEFORE_FORM) {
      navigate({ to: "/form", replace: true });
      return;
    }
    setSign(s);
    setSpinNumber(current);
  }, [navigate]);

  const handleSpinAgain = () => {
    const next = spinNumber + 1;
    if (next > MAX_SPINS) return;
    setCurrentSpinNumber(next);
    const target = randomTikkunSign(sign?.id ?? null);
    sessionStorage.setItem("tikkun_target_sign", target.id);
    navigate({ to: "/spinning" });
  };

  const handleSeeReal = () => {
    setCurrentSpinNumber(FREE_SPINS_BEFORE_FORM + 1);
    navigate({ to: "/form" });
  };

  if (!sign) return null;
  const canSpinAgain = spinNumber < MAX_SPINS;
  const copy = STATIC_COPY.screen3;

  return (
    <SkyShell starDensity={200}>
      <style>{`
        @keyframes cta-pulse-glow {
          0%, 100% { box-shadow: 0 10px 40px -10px #e63946aa; transform: scale(1); }
          50% { box-shadow: 0 14px 50px -8px #e63946cc, 0 0 25px -3px #e6394633; transform: scale(1.015); }
        }
        .cta-pulse-glow { animation: cta-pulse-glow 2.5s ease-in-out infinite; }
        .cta-pulse-glow:hover { animation: none; }
      `}</style>
      <section className="relative mx-auto flex max-w-2xl flex-col items-center px-[clamp(1rem,5vw,3rem)] pt-[clamp(1.5rem,4vh,3rem)] pb-[clamp(3rem,6vh,5rem)] text-center">
        <div
          className="w-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(27, 37, 64, 0.55) 0%, rgba(15, 23, 41, 0.55) 100%)",
            border: `1px solid ${C_RULE}`,
            borderRadius: "14px",
            padding: "clamp(1.75rem,4.5vw,2.75rem)",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C_GOLD}55)`, minWidth: 12 }} />
            <span
              style={{
                fontFamily: BODY,
                color: C_GOLD,
                fontWeight: 600,
                fontSize: "clamp(10px, 2.6vw, 13px)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Sound like you?
            </span>
            <span style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${C_GOLD}55)`, minWidth: 12 }} />
          </div>

          <div className="mt-[clamp(0.5rem,1vh,1rem)] flex items-center justify-center">
            <span
              style={{
                fontFamily: HEAD, color: C_DAWN, fontSize: "clamp(72px, 13vw, 120px)",
                lineHeight: 1, textShadow: `0 0 24px ${C_DAWN}55`,
              }}
            >
              {sign.hebrewLetter}
            </span>
          </div>

          <p
            className="mt-0"
            style={{
              fontFamily: BODY, color: C_INK, lineHeight: 1.7,
              fontSize: "clamp(17px, 1.9vw, 21px)",
            }}
          >
            {sign.screen3.spinSnippet}
          </p>
        </div>

        {/* CTA — rectangular red button (above the fold) */}
        <button
          type="button"
          onClick={handleSeeReal}
          className="cta-pulse-glow group mt-[clamp(1.25rem,3vh,2rem)] inline-flex w-[280px] items-center justify-center gap-3 uppercase transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
          style={{
            background: `linear-gradient(135deg, ${C_DAWN} 0%, #c1121f 100%)`,
            color: C_INK,
            fontFamily: BODY,
            fontWeight: 700,
            letterSpacing: "0.24em",
            fontSize: "12px",
            padding: "18px 32px",
            borderRadius: "0px",
            boxShadow: `0 10px 40px -10px ${C_DAWN}aa`,
          }}
        >
          <span>{copy.primaryButton}</span>
          <span aria-hidden="true" style={{ fontWeight: 800 }}>→</span>
        </button>
        <p
          className="mt-3"
          style={{ fontFamily: BODY, color: C_MUTED, fontSize: "clamp(12px, 1.3vw, 14px)", letterSpacing: "0.02em" }}
        >
          Free Full Birth Chart Reading
        </p>

        {/* Spin again — transparent, rounded, secondary */}
        {canSpinAgain && (
          <div className="mt-[clamp(1.5rem,3.5vh,2.25rem)]">
            <button
              type="button"
              onClick={handleSpinAgain}
              className="group inline-flex w-[280px] items-center justify-center gap-3 uppercase transition-all duration-300 hover:scale-[1.02] hover:border-white/40"
              style={{
                background: "transparent",
                color: C_INK_SOFT,
                fontFamily: BODY,
                fontWeight: 600,
                letterSpacing: "0.22em",
                fontSize: "11px",
                padding: "16px 28px",
                borderRadius: "999px",
                border: `1px solid ${C_RULE}`,
              }}
            >
              <span>Not quite — spin again</span>
            </button>
          </div>
        )}
      </section>
    </SkyShell>
  );
}
