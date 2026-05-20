import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SkyShell } from "@/components/landing/SkyShell";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_GOLD_BRIGHT, C_DAWN, C_RULE,
} from "@/lib/landing-style";
import { signById, randomTikkunSign, STATIC_COPY, type TikkunSign } from "@/lib/tikkun-data";
import { MAX_SPINS, getCurrentSpinNumber, setCurrentSpinNumber } from "@/lib/spinAttempts";
import { submitLead } from "@/lib/lead.functions";

const inputStyle: React.CSSProperties = {
  fontFamily: BODY,
  color: C_INK,
  background: "rgba(10,14,28,0.45)",
  border: `1px solid ${C_RULE}`,
  borderRadius: 2,
  padding: "12px 14px",
  fontSize: "15px",
  width: "100%",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontFamily: BODY,
  color: C_INK_SOFT,
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  fontWeight: 600,
  display: "block",
  marginBottom: "6px",
};

export const Route = createFileRoute("/snippet")({
  component: Snippet,
  head: () => ({ meta: [{ title: "Your Tikkun teaser" }] }),
});

function Snippet() {
  const navigate = useNavigate();
  const submit = useServerFn(submitLead);
  const [sign, setSign] = useState<TikkunSign | null>(null);
  const [spinNumber, setSpinNumber] = useState(1);

  // Inline form state (used on final spin)
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

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
    if (next > MAX_SPINS) return;
    setCurrentSpinNumber(next);
    const target = randomTikkunSign(sign?.id ?? null);
    sessionStorage.setItem("tikkun_target_sign", target.id);
    navigate({ to: "/spinning" });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!dob) return setErr("Please enter your date of birth.");
    if (!email) return setErr("Please enter your email.");
    setBusy(true);
    try {
      const res = await submit({ data: { name: name || undefined, dob, email, newsletterOptIn: false } });
      if (!res.ok || !res.signId) {
        setErr(res.error ?? "Something went wrong.");
        setBusy(false);
        return;
      }
      sessionStorage.setItem("tikkun_real_sign", res.signId);
      navigate({ to: "/reading", search: { sign: res.signId } });
    } catch (e2) {
      console.error(e2);
      setErr("Could not submit. Please try again.");
      setBusy(false);
    }
  };

  if (!sign) return null;
  const canSpinAgain = spinNumber < MAX_SPINS;
  const copy = STATIC_COPY.screen3;
  const today = new Date().toISOString().slice(0, 10);

  // FINAL SPIN (3 of 3): inline signup form for max conversion.
  if (!canSpinAgain) {
    return (
      <SkyShell starDensity={200}>
        <style>{`
          @keyframes cta-pulse-glow {
            0%, 100% { box-shadow: 0 10px 40px -10px #e94e2baa; transform: scale(1); }
            50% { box-shadow: 0 14px 50px -8px #e94e2bcc, 0 0 25px -3px #e94e2b33; transform: scale(1.015); }
          }
          .cta-pulse-glow {
            animation: cta-pulse-glow 2.5s ease-in-out infinite;
          }
          .cta-pulse-glow:hover {
            animation: none;
          }
        `}</style>
        <section className="relative mx-auto flex max-w-md flex-col items-center px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1.5rem,4vh,3rem)] pb-[clamp(2.5rem,5vh,4rem)] text-center">
          <h1
            style={{
              fontFamily: HEAD, color: C_INK, fontWeight: 500,
              fontSize: "clamp(26px, 5vw, 42px)", lineHeight: 1.12,
              letterSpacing: "-0.02em",
            }}
          >
            See your real{" "}
            <span style={{ color: C_DAWN, fontStyle: "italic", fontWeight: 400 }}>Tikkun</span>{" "}
            pattern
          </h1>

          <p
            className="mt-3 font-mono font-thin"
            style={{ color: C_GOLD, fontSize: "13px", maxWidth: "24rem", lineHeight: 1.5 }}
          >
            Your free Tikkun birth chart + PDF workbook
          </p>

          <form onSubmit={onSubmit} className="mt-5 flex w-full flex-col gap-3 text-left">
            <div>
              <label style={labelStyle} htmlFor="name">Name (optional)</label>
              <input
                id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                autoComplete="given-name" maxLength={120} placeholder="Your name" style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="email">Email</label>
              <input
                id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                autoComplete="email" maxLength={255} placeholder="you@example.com" style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="dob">Date of Birth</label>
              <input
                id="dob" type="date" required value={dob} onChange={(e) => setDob(e.target.value)}
                min="1901-01-22" max={today} style={inputStyle}
              />
            </div>

            {err && (
              <p style={{ fontFamily: BODY, color: C_DAWN, fontSize: "12px" }}>{err}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="cta-pulse-glow group mt-2 inline-flex items-center justify-center gap-3 uppercase transition-all duration-300 hover:scale-[1.02] hover:brightness-110 disabled:opacity-60 disabled:animate-none"
              style={{
                background: `linear-gradient(135deg, ${C_DAWN} 0%, #b73a1d 100%)`,
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
              <span>{busy ? "Revealing…" : "Reveal my Tikkun"}</span>
              {!busy && (
                <span aria-hidden="true" style={{ fontWeight: 800 }}>→</span>
              )}
            </button>
          </form>

          <p
            className="mt-3 font-mono"
            style={{ color: C_MUTED, fontSize: "11px", letterSpacing: "0.04em" }}
          >
            Email only used for your reading + free workbook. Unsubscribe anytime.
          </p>
        </section>
      </SkyShell>
    );
  }

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

        {/* CTA — red dawn accent, direct to form */}
        <button
          type="button"
          onClick={() => navigate({ to: "/form" })}
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


