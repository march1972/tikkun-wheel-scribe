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
    <SkyShell starDensity={200}>
      <style>{`
        @keyframes cta-pulse-glow {
          0%, 100% { box-shadow: 0 10px 40px -10px #e63946aa; transform: scale(1); }
          50% { box-shadow: 0 14px 50px -8px #e63946cc, 0 0 25px -3px #e6394633; transform: scale(1.015); }
        }
        .cta-pulse-glow { animation: cta-pulse-glow 2.5s ease-in-out infinite; }
        .cta-pulse-glow:hover { animation: none; }
      `}</style>
      <section className="relative mx-auto flex max-w-2xl flex-col items-center px-[clamp(1rem,5vw,3rem)] pt-[clamp(0.75rem,2vh,2rem)] pb-[clamp(3rem,6vh,5rem)] text-center">
        {!showForm && (
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
                  fontFamily: HEAD, color: C_DAWN, fontSize: "clamp(50px, 10vw, 90px)",
                  lineHeight: 1, textShadow: `0 0 24px ${C_DAWN}55`,
                }}
              >
                {sign.hebrewLetter}
              </span>
            </div>

            <p
              className="mt-[clamp(1.25rem,2.5vh,1.75rem)]"
              style={{
                fontFamily: BODY, color: C_INK, lineHeight: 1.6, fontSize: "clamp(14px, 1.7vw, 17px)",
              }}
            >
              {sign.screen3.spinSnippet}
            </p>
          </div>
        )}

        {!showForm && (
          <>
            {/* Spin again — transparent, rounded, same width as CTA */}
            <div className="mt-[clamp(1.25rem,3vh,2rem)]">{spinAgainButton}</div>

            {/* CTA — rectangular red button */}
            <button
              type="button"
              onClick={() => {
                setCurrentSpinNumber(FREE_SPINS_BEFORE_FORM + 1);
                setSpinNumber(FREE_SPINS_BEFORE_FORM + 1);
              }}
              className="cta-pulse-glow group mt-[clamp(2rem,5vh,3.5rem)] inline-flex w-[280px] items-center justify-center gap-3 uppercase transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
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
                  fontSize: "clamp(25px, 6.9vw, 37px)", lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                See your actual{" "}
                <span style={{ color: C_DAWN, fontStyle: "italic", fontWeight: 700, fontSize: "1.05em" }}>Tikkun</span>{" "}
                chart
              </h2>
              <p
                className="mt-3"
                style={{
                  fontFamily: BODY, color: "rgba(180,200,230,0.85)", fontWeight: 400,
                  fontSize: "12px", letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                (Free reading + workbook)
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

                <label
                  htmlFor="newsletter"
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "10px",
                    fontFamily: BODY, color: C_INK, fontSize: "13px",
                    lineHeight: 1.4, cursor: "pointer", marginTop: "4px",
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
                  className="cta-pulse-glow group mt-2 flex w-full items-center justify-center gap-3 uppercase transition-all duration-300 hover:scale-[1.02] hover:brightness-110 disabled:opacity-60 disabled:animate-none"
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
                  <span>{busy ? "Revealing…" : "Reveal my Tikkun"}</span>
                  {!busy && (
                    <span aria-hidden="true" style={{ fontWeight: 800 }}>→</span>
                  )}
                </button>
              </form>

              <p
                className="mt-3"
                style={{ fontFamily: BODY, color: C_INK, fontSize: "13px", letterSpacing: "0.03em", lineHeight: 1.5 }}
              >
                Email used to send you free Tikkun Workbook.{" "}
                <a
                  href="/terms"
                  style={{ color: C_GOLD, textDecoration: "underline" }}
                >
                  T&Cs
                </a>
              </p>
            </div>

          </>
        )}
      </section>
    </SkyShell>
  );
}



