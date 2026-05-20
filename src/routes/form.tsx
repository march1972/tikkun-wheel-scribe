import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SkyShell } from "@/components/landing/SkyShell";
import { PrimaryCTA } from "@/components/landing/PrimaryCTA";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_DAWN, C_RULE,
} from "@/lib/landing-style";
import { submitLead } from "@/lib/lead.functions";

export const Route = createFileRoute("/form")({
  component: FormPage,
  head: () => ({ meta: [{ title: "See your actual Tikkun" }] }),
});

const inputStyle: React.CSSProperties = {
  fontFamily: BODY,
  color: C_INK,
  background: "rgba(10,14,28,0.45)",
  border: `1px solid ${C_RULE}`,
  borderRadius: 2,
  padding: "14px 16px",
  fontSize: "15px",
  width: "100%",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontFamily: BODY,
  color: C_INK_SOFT,
  fontSize: "11px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  fontWeight: 600,
  display: "block",
  marginBottom: "8px",
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
      <section className="relative mx-auto flex max-w-md flex-col items-center px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,5vh,4rem)] pb-[clamp(3rem,6vh,5rem)] text-center">
        <div className="flex w-full items-center gap-3">
          <span className="h-px flex-1" style={{ background: C_RULE }} />
          <span
            style={{
              fontFamily: BODY, color: C_INK_SOFT, fontSize: "11px",
              letterSpacing: "0.36em", textTransform: "uppercase", fontWeight: 600,
            }}
          >
            Kabbalah Astrology
          </span>
          <span className="h-px flex-1" style={{ background: C_RULE }} />
        </div>

        <h1
          className="mt-[clamp(1.75rem,4vh,2.75rem)]"
          style={{
            fontFamily: HEAD, color: C_INK, fontWeight: 500,
            fontSize: "clamp(28px, 5vw, 44px)", lineHeight: 1.12,
            letterSpacing: "-0.02em",
          }}
        >
          See your actual{" "}
          <span style={{ color: C_DAWN, fontStyle: "italic", fontWeight: 400 }}>Tikkun</span>
        </h1>

        <p
          className="mt-[clamp(0.75rem,2vh,1.25rem)] font-mono font-thin"
          style={{ color: C_INK_SOFT, fontSize: "13px", maxWidth: "26rem", lineHeight: 1.55 }}
        >
          Your personal reading + a free 10-page{" "}
          <span style={{ color: C_GOLD, fontStyle: "italic" }}>Tikkun Workbook</span>, emailed instantly.
        </p>

        <ul
          className="mt-[clamp(1rem,2vh,1.5rem)] flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono"
          style={{ color: C_MUTED, fontSize: "11px", letterSpacing: "0.08em" }}
        >
          <li>✓ 60-second reading</li>
          <li>✓ Free workbook</li>
          <li>✓ No spam</li>
        </ul>

        <form onSubmit={onSubmit} className="mt-[clamp(1.5rem,3vh,2.25rem)] flex w-full flex-col gap-5 text-left">
          <div>
            <label style={labelStyle} htmlFor="name">Your Name <span style={{ opacity: 0.5, letterSpacing: "0.12em" }}>(optional)</span></label>
            <input
              id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
              autoComplete="name" maxLength={120} style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="dob">Date of Birth *</label>
            <input
              id="dob" type="date" required value={dob} onChange={(e) => setDob(e.target.value)}
              min="1901-01-22" max={today} style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="email">Email *</label>
            <input
              id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              autoComplete="email" maxLength={255} style={inputStyle}
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

          <div className="mt-2 flex justify-center">
            <PrimaryCTA type="submit" label={busy ? "Revealing…" : "Reveal my Tikkun"} disabled={busy} />
          </div>
        </form>

        <p
          className="mt-[clamp(1.25rem,2.5vh,1.75rem)] font-mono italic"
          style={{ color: C_MUTED, fontSize: "11px", maxWidth: "24rem" }}
        >
          Only used for your reading and free Workbook. Unsubscribe anytime.
        </p>
      </section>
    </SkyShell>
  );
}
