import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SkyShell } from "@/components/landing/SkyShell";
import { PrimaryCTA } from "@/components/landing/PrimaryCTA";
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
  display: "block",
  boxSizing: "border-box",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  minHeight: "46px",
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
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
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
      const res = await submit({ data: { name: name || undefined, dob, email, newsletterOptIn } });
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
    <SkyShell starDensity={360}>
      <section className="relative mx-auto flex max-w-2xl flex-col items-center px-[clamp(1rem,5vw,3rem)] pt-[clamp(1rem,2.5vh,1.75rem)] pb-[clamp(3rem,6vh,5rem)] text-center">
        {!showForm && (
          <>
            <h2
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontSize: "clamp(38px, 6.5vw, 76px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Sound like{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>you?</span>
            </h2>

            <div
              className="w-full mt-[clamp(1.25rem,3vh,2rem)] mb-[clamp(1.25rem,3vh,2rem)]"
              style={{
                background: "rgba(220, 228, 240, 0.05)",
                border: "1px solid rgba(220, 228, 240, 0.28)",
                borderRadius: 2,
                padding: "clamp(1.75rem,3.5vw,2.5rem)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{
                  minHeight: "clamp(52px, 9.5vw, 88px)",
                  marginTop: "clamp(-10px, -1vh, -6px)",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    width: "clamp(72px, 12.5vw, 117px)",
                    height: "clamp(72px, 12.5vw, 117px)",
                    background: `radial-gradient(circle, ${C_GOLD}55 0%, ${C_DAWN}35 45%, transparent 72%)`,
                    filter: "blur(6px)",
                    pointerEvents: "none",
                  }}
                />
                <span
                  className="relative"
                  style={{
                    fontFamily: HEAD, color: C_DAWN, fontSize: "clamp(56px, 10vw, 92px)",
                    lineHeight: 1, textShadow: `0 0 24px ${C_DAWN}66`,
                  }}
                >
                  {sign.hebrewLetter}
                </span>
              </div>

              <p
                className="mt-[14px]"
                style={{
                  fontFamily: BODY,
                  fontStyle: "italic",
                  color: C_INK,
                  lineHeight: 1.6,
                  fontSize: "clamp(15px, 1.7vw, 18px)",
                  letterSpacing: "0.01em",
                  fontWeight: 400,
                }}
              >
                {sign.screen3.spinSnippet}
              </p>
            </div>
          </>
        )}



        {!showForm && (
          <>
            {/* CTA — gold, matches home page */}
            <div className="mt-[clamp(1.4rem,3.2vh,2rem)]">
              <PrimaryCTA
                onClick={() => {
                  setCurrentSpinNumber(FREE_SPINS_BEFORE_FORM + 1);
                  setSpinNumber(FREE_SPINS_BEFORE_FORM + 1);
                }}
                label="Reveal My Actual Chart"
              />
            </div>

            {/* Subline — value prop */}
            <p
              className="mt-3"
              style={{
                fontFamily: BODY,
                color: "rgba(240,200,104,0.78)",
                fontSize: "11px",
                letterSpacing: "0.22em",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              (Free Tikkun Birth Chart & Reading)
            </p>

            {/* OR / spin again */}
            {canSpinAgain && (
              <>
                <p
                  className="mt-5"
                  style={{
                    fontFamily: BODY,
                    color: C_MUTED,
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
                  or
                </p>
                <button
                  type="button"
                  onClick={handleSpinAgain}
                  className="mt-2 transition-opacity duration-200 hover:opacity-100"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: C_INK_SOFT,
                    fontFamily: BODY,
                    fontSize: "11px",
                    letterSpacing: "0.22em",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                    textDecorationColor: "rgba(236,227,207,0.35)",
                    cursor: "pointer",
                    padding: "4px 6px",
                  }}
                >
                  Spin again
                </button>
              </>
            )}
          </>
        )}


        {showForm && (
          <>
            <div
              className="w-full"
              style={{
                padding: "clamp(0.5rem,2vw,2.75rem)",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: HEAD, color: C_INK, fontWeight: 500,
                  fontSize: "clamp(34px, 6.2vw, 60px)", lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                }}
              >
                See your actual{" "}
                <span style={{ color: C_DAWN, fontStyle: "italic", fontWeight: 700, fontSize: "1.05em" }}>Tikkun</span>{" "}
                chart
              </h2>



              <div style={{ maxWidth: 380, margin: "0 auto", width: "100%" }}>
                <style>{`
                  #dob::-webkit-datetime-edit-text,
                  #dob::-webkit-datetime-edit-month-field,
                  #dob::-webkit-datetime-edit-day-field,
                  #dob::-webkit-datetime-edit-year-field { color: ${dob ? C_INK : "rgba(236,227,207,0.45)"}; }
                  #dob::-webkit-calendar-picker-indicator { filter: invert(0.7) opacity(0.55); cursor: pointer; }
                `}</style>
                <form onSubmit={onSubmit} className="mt-3 sm:mt-5 flex w-full flex-col gap-3 sm:gap-4 text-left">

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

                <label
                  htmlFor="newsletter"
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "10px",
                    fontFamily: BODY, color: C_INK, fontSize: "13px",
                    lineHeight: 1.4, cursor: "pointer", marginTop: "clamp(2px, 1vw, 8px)",
                  }}
                >
                  <input
                    id="newsletter" type="checkbox"
                    checked={newsletterOptIn}
                    onChange={(e) => setNewsletterOptIn(e.target.checked)}
                    style={{
                      marginTop: "2px", width: "16px", height: "16px",
                      accentColor: C_DAWN, flexShrink: 0, cursor: "pointer",
                    }}
                  />
                  <span>Add me to the Kabbalah Circle mailing list</span>
                </label>

                {err && (
                  <p style={{ fontFamily: BODY, color: C_DAWN, fontSize: "12px" }}>{err}</p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="group mt-5 sm:mt-6 flex w-full items-center justify-center gap-3 uppercase transition-all duration-300 ease-out hover:-translate-y-px disabled:opacity-60"
                  style={{
                    background: "#7a1f2b",
                    color: C_INK,
                    fontFamily: BODY,
                    fontWeight: 700,
                    letterSpacing: "0.28em",
                    fontSize: "12px",
                    padding: "20px 36px",
                    borderRadius: 0,
                    border: "none",
                    boxShadow: "0 8px 24px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    if (busy) return;
                    e.currentTarget.style.background = "#8a2533";
                    e.currentTarget.style.boxShadow = "0 12px 32px -12px rgba(155,40,55,0.55), inset 0 1px 0 rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#7a1f2b";
                    e.currentTarget.style.boxShadow = "0 8px 24px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)";
                  }}
                >
                  <span>{busy ? "Revealing…" : "Reveal my free Tikkun astrology reading"}</span>
                  {!busy && (
                    <span aria-hidden="true" style={{ fontWeight: 800 }}>→</span>
                  )}
                </button>
              </form>

                <p
                  className="footnote-text mt-3 text-center"
                  style={{ fontFamily: BODY, color: "rgba(236,227,207,0.70)", fontSize: "12px", letterSpacing: "0.03em", lineHeight: 1.6 }}
                >
                  Birth date and email for full Tikkun Birth Chart.{" "}
                  <a
                    href="/terms"
                    className="terms-link"
                    style={{ fontFamily: BODY, color: "rgba(236,227,207,0.85)", textDecoration: "underline", textDecorationColor: "rgba(236,227,207,0.85)", textUnderlineOffset: "3px", fontSize: "11px" }}
                  >
                    terms and conditions
                  </a>
                </p>
                <style>{`
                  @media (max-width: 640px) {
                    .footnote-text { color: rgba(236,227,207,0.80) !important; }
                    .terms-link { color: rgba(236,227,207,0.95) !important; text-decoration-color: rgba(236,227,207,0.95) !important; }
                  }
                `}</style>
              </div>


            </div>

          </>
        )}
      </section>
    </SkyShell>
  );
}



