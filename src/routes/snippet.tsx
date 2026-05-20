import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SkyShell } from "@/components/landing/SkyShell";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_GOLD_BRIGHT, C_DAWN, C_RULE,
} from "@/lib/landing-style";
import { signById, randomTikkunSign, STATIC_COPY, type TikkunSign } from "@/lib/tikkun-data";
import { MAX_SPINS, FREE_SPINS_BEFORE_FORM, getCurrentSpinNumber, setCurrentSpinNumber } from "@/lib/spinAttempts";
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
  const showForm = spinNumber > FREE_SPINS_BEFORE_FORM;
  const copy = STATIC_COPY.screen3;
  const today = new Date().toISOString().slice(0, 10);

  const spinAgainButton = canSpinAgain ? (
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
      <span>{showForm ? "Spin again" : "Not quite — spin again"}</span>
    </button>
  ) : null;

  return (
    <SkyShell starDensity={200}>
      <style>{`
        @keyframes cta-pulse-glow {
          0%, 100% { box-shadow: 0 10px 40px -10px #e94e2baa; transform: scale(1); }
          50% { box-shadow: 0 14px 50px -8px #e94e2bcc, 0 0 25px -3px #e94e2b33; transform: scale(1.015); }
        }
        .cta-pulse-glow { animation: cta-pulse-glow 2.5s ease-in-out infinite; }
        .cta-pulse-glow:hover { animation: none; }
      `}</style>
      <section className="relative mx-auto flex max-w-2xl flex-col items-center px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,5vh,4rem)] pb-[clamp(3rem,6vh,5rem)] text-center">
        {/* Sign + snippet block */}
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
            <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C_GOLD}55)` }} />
            <span
              style={{
                fontFamily: BODY,
                color: C_GOLD,
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Does this pattern sound like you?
            </span>
            <span style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${C_GOLD}55)` }} />
          </div>

          <div className="mt-[clamp(0.5rem,1vh,1rem)] flex items-center justify-center">
            <span
              style={{
                fontFamily: HEAD, color: C_DAWN, fontSize: "clamp(50px, 10vw, 90px)",
                lineHeight: 1, textShadow: `0 0 24px ${C_DAWN}55`,
              }}
            >
              {sign.hebrewLetter}
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

        {!showForm && (
          <>
            {/* Spin again — transparent, rounded, same width as CTA */}
            <div className="mt-[clamp(1.25rem,3vh,2rem)]">{spinAgainButton}</div>

            {/* CTA — rectangular red button */}
            <button
              type="button"
              onClick={() => navigate({ to: "/form" })}
              className="cta-pulse-glow group mt-[clamp(2rem,5vh,3.5rem)] inline-flex w-[280px] items-center justify-center gap-3 uppercase transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
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
              <span>{copy.primaryButton}</span>
              <span aria-hidden="true" style={{ fontWeight: 800 }}>→</span>
            </button>
            <p
              className="mt-3 font-mono"
              style={{ color: C_MUTED, fontSize: "clamp(12px, 1.3vw, 14px)", letterSpacing: "0.02em" }}
            >
              Free Full Birth Chart Reading
            </p>
          </>
        )}

        {showForm && (
          <>
            <div
              className="mt-[clamp(2rem,5vh,3.5rem)] w-full max-w-md"
              style={{
                background:
                  "linear-gradient(180deg, rgba(27, 37, 64, 0.65) 0%, rgba(15, 23, 41, 0.65) 100%)",
                border: `1px solid ${C_RULE}`,
                borderRadius: "14px",
                padding: "clamp(1.75rem,4.5vw,2.5rem)",
                boxShadow:
                  "0 30px 80px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
                backdropFilter: "blur(8px)",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: HEAD, color: C_INK, fontWeight: 500,
                  fontSize: "clamp(22px, 4vw, 32px)", lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                See your real{" "}
                <span style={{ color: C_DAWN, fontStyle: "italic", fontWeight: 400 }}>Tikkun</span>{" "}
                pattern
              </h2>
              <p
                className="mt-3 font-mono font-thin"
                style={{ color: C_GOLD, fontSize: "13px", lineHeight: 1.5 }}
              >
                Free Full Birth Chart Reading
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
            </div>

            {canSpinAgain && (
              <div className="mt-[clamp(2.5rem,6vh,4rem)] w-full max-w-md flex flex-col items-center text-center">
                <p
                  className="font-mono"
                  style={{
                    color: C_INK_SOFT, fontSize: "12px", letterSpacing: "0.04em",
                    lineHeight: 1.5, marginBottom: "1rem",
                  }}
                >
                  Curious about more Tikkun archetypes? Keep spinning to preview more Tikkun snippets.
                  <span style={{ color: C_MUTED, display: "block", marginTop: 4, fontSize: "11px" }}>
                    Spin no. {spinNumber}
                  </span>
                </p>
                {spinAgainButton}
              </div>
            )}
          </>
        )}
      </section>
    </SkyShell>
  );
}



