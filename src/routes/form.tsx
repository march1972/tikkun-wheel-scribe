import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SkyShell } from "@/components/landing/SkyShell";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_GOLD, C_DAWN, C_RULE,
} from "@/lib/landing-style";
import { signById, randomTikkunSign } from "@/lib/tikkun-data";

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

export const Route = createFileRoute("/form")({
  component: FormPage,
  head: () => ({ meta: [{ title: "Reveal your Tikkun" }] }),
});

function FormPage() {
  const navigate = useNavigate();
  const submit = useServerFn(submitLead);
  const [ready, setReady] = useState(false);

  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [name, setName] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Seed a sign for direct visits with no session.
    const key = sessionStorage.getItem("tikkun_target_sign");
    if (!signById(key)) {
      const seeded = randomTikkunSign(null).id;
      sessionStorage.setItem("tikkun_target_sign", seeded);
    }
    setReady(true);
  }, []);

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

  if (!ready) return null;
  const today = new Date().toISOString().slice(0, 10);

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
            style={{ fontFamily: BODY, color: C_INK, fontSize: "15px", letterSpacing: "0.03em", lineHeight: 1.7 }}
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
      </section>
    </SkyShell>
  );
}
