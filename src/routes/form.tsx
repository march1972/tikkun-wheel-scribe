import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SkyShell } from "@/components/landing/SkyShell";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_DAWN, C_RULE,
} from "@/lib/landing-style";
import { submitLead } from "@/lib/lead.functions";

export const Route = createFileRoute("/form")({
  component: FormPage,
  head: () => ({ meta: [{ title: "See your real Tikkun pattern" }] }),
});

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

function FormPage() {
  const navigate = useNavigate();
  const submit = useServerFn(submitLead);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [opt, setOpt] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!dob) return setErr("Please enter your date of birth.");
    if (!email) return setErr("Please enter your email.");
    setBusy(true);
    try {
      const res = await submit({ data: { name: name || undefined, dob, email, newsletterOptIn: opt } });
      if (!res.ok || !res.signId) {
        setErr(res.error ?? "Something went wrong.");
        setBusy(false);
        return;
      }
      sessionStorage.setItem("tikkun_real_sign", res.signId);
      navigate({ to: "/reading", search: { sign: res.signId } });
    } catch (e) {
      console.error(e);
      setErr("Could not submit. Please try again.");
      setBusy(false);
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <SkyShell starDensity={200}>
      <style>{`
        @keyframes cta-pulse-glow {
          0%, 100% { box-shadow: 0 10px 40px -10px #d62828aa; transform: scale(1); }
          50% { box-shadow: 0 14px 50px -8px #d62828cc, 0 0 25px -3px #d6282833; transform: scale(1.015); }
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

          <label
            className="flex items-start gap-3 mt-1 cursor-pointer"
            style={{ fontFamily: BODY, color: C_INK_SOFT, fontSize: "12px", lineHeight: 1.45 }}
          >
            <input
              type="checkbox" checked={opt} onChange={(e) => setOpt(e.target.checked)}
              style={{ marginTop: 3, accentColor: C_GOLD }}
            />
            <span>Send me The Kabbalah Letter — free weekly teachings on Kabbalah, Astrology, and the work of becoming.</span>
          </label>

          {err && (
            <p style={{ fontFamily: BODY, color: C_DAWN, fontSize: "12px" }}>{err}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="cta-pulse-glow group mt-2 inline-flex items-center justify-center gap-3 uppercase transition-all duration-300 hover:scale-[1.02] hover:brightness-110 disabled:opacity-60 disabled:animate-none"
            style={{
              background: `linear-gradient(135deg, ${C_DAWN} 0%, #a01e1e 100%)`,
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
