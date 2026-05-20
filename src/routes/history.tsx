import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SkyShell } from "@/components/landing/SkyShell";
import { PrimaryCTA } from "@/components/landing/PrimaryCTA";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_DAWN, C_RULE, C_RULE_SOFT, C_BAND_DEEP, C_BAND_MID,
} from "@/lib/landing-style";
import { subscribeNewsletter } from "@/lib/lead.functions";

export const Route = createFileRoute("/history")({
  component: HistoryPage,
  head: () => ({ meta: [{ title: "Kabbalah Astrology — A Brief History" }] }),
});

function HistoryPage() {
  const subscribe = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!email) return;
    setState("busy");
    try {
      const res = await subscribe({ data: { email } });
      if (res.ok) { setState("done"); setEmail(""); }
      else { setState("error"); setErr(res.error); }
    } catch {
      setState("error");
      setErr("Could not subscribe — please try again.");
    }
  };

  return (
    <SkyShell starDensity={240}>
      <section className="relative mx-auto max-w-2xl px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,5vh,4rem)] pb-[clamp(3rem,6vh,5rem)] text-center">
        <div className="flex w-full items-center gap-3">
          <span className="h-px flex-1" style={{ background: C_RULE }} />
          <span
            style={{
              fontFamily: BODY, color: C_INK_SOFT, fontSize: "11px",
              letterSpacing: "0.36em", textTransform: "uppercase", fontWeight: 600,
            }}
          >
            A Brief History
          </span>
          <span className="h-px flex-1" style={{ background: C_RULE }} />
        </div>

        <h1
          className="mt-[clamp(1.75rem,4vh,2.75rem)]"
          style={{
            fontFamily: HEAD, color: C_INK, fontWeight: 500,
            fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1.15, letterSpacing: "-0.02em",
          }}
        >
          Ancient <span style={{ color: C_GOLD, fontStyle: "italic" }}>roots</span>,
          living <span style={{ color: C_DAWN, fontStyle: "italic" }}>work</span>.
        </h1>
      </section>

      <section
        className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3rem,6vh,5rem)]"
        style={{ background: C_BAND_DEEP, borderTop: `1px solid ${C_RULE_SOFT}` }}
      >
        <div className="relative mx-auto max-w-2xl">
          <p
            className="font-mono font-thin"
            style={{ color: C_INK_SOFT, fontSize: "clamp(14px, 1.6vw, 17px)", lineHeight: 1.7 }}
          >
            Kabbalah Astrology dates back to{" "}
            <span style={{ color: C_GOLD, fontStyle: "italic" }}>Abraham</span> and is found in many ancient texts and commentaries — the{" "}
            <span style={{ color: C_GOLD, fontStyle: "italic" }}>Talmud</span> (the Oral Torah), the{" "}
            <span style={{ color: C_GOLD, fontStyle: "italic" }}>Sefer Yetzirah</span> (Book of Formation), and the{" "}
            <span style={{ color: C_GOLD, fontStyle: "italic" }}>Zohar</span> (Book of Splendor).
          </p>
          <p
            className="mt-6 font-mono font-thin"
            style={{ color: C_INK_SOFT, fontSize: "clamp(14px, 1.6vw, 17px)", lineHeight: 1.7 }}
          >
            Kabbalists accept the signals or influence of the celestial constellations ({" "}
            <span style={{ color: C_INK, fontStyle: "italic" }}>Mazalot</span> ), but reject astrology as{" "}
            <span style={{ color: C_GOLD, fontStyle: "italic" }}>fatalistic prediction</span>. A person's free will always overrides fate.
          </p>
          <p
            className="mt-6 font-mono font-thin"
            style={{ color: C_INK_SOFT, fontSize: "clamp(14px, 1.6vw, 17px)", lineHeight: 1.7 }}
          >
            Fulfilling your{" "}
            <span style={{ color: C_DAWN, fontStyle: "italic" }}>Tikkun</span> serves a greater purpose —{" "}
            <span style={{ color: C_GOLD, fontStyle: "italic", fontWeight: 500 }}>Tikkun Olam</span> — sharing your light to build a better world.
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(4rem,8vh,7rem)] text-center"
        style={{ background: C_BAND_MID, borderTop: `1px solid ${C_RULE_SOFT}` }}
      >
        <div className="relative mx-auto max-w-2xl">
          <p
            style={{
              fontFamily: BODY, color: C_GOLD, fontSize: "11px",
              letterSpacing: "0.36em", textTransform: "uppercase", fontWeight: 600,
            }}
          >
            The Kabbalah Letter
          </p>
          <h2
            className="mt-4"
            style={{
              fontFamily: HEAD, color: C_INK, fontWeight: 500,
              fontSize: "clamp(26px, 4vw, 40px)", letterSpacing: "-0.02em",
            }}
          >
            Go <span style={{ color: C_GOLD, fontStyle: "italic" }}>deeper</span>.
          </h2>
          <p
            className="mx-auto mt-4 font-mono font-thin"
            style={{ color: C_INK_SOFT, fontSize: "14px", lineHeight: 1.6, maxWidth: "30rem" }}
          >
            Free weekly teachings on Kabbalah, Astrology, and the work of becoming. Unsubscribe anytime.
          </p>

          {state === "done" ? (
            <p className="mt-8 italic" style={{ fontFamily: HEAD, color: C_GOLD, fontSize: "18px" }}>
              Welcome. Check your inbox.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-8 mx-auto flex w-full max-w-md flex-col sm:flex-row items-stretch gap-3"
            >
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" autoComplete="email" maxLength={255}
                style={{
                  flex: 1, fontFamily: BODY, color: C_INK,
                  background: "rgba(10,14,28,0.45)", border: `1px solid ${C_RULE}`,
                  borderRadius: 2, padding: "14px 16px", fontSize: "14px", outline: "none",
                }}
              />
              <PrimaryCTA type="submit" label={state === "busy" ? "Subscribing…" : "Subscribe free"} disabled={state === "busy"} />
            </form>
          )}
          {err && <p className="mt-3" style={{ fontFamily: BODY, color: C_DAWN, fontSize: "12px" }}>{err}</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(2rem,4vh,3rem)] text-center">
        <Link
          to="/"
          style={{
            fontFamily: BODY, color: C_MUTED, fontSize: "10px",
            letterSpacing: "0.38em", textTransform: "uppercase", fontWeight: 600,
          }}
        >
          Kabbalah · Circle
        </Link>
      </footer>
    </SkyShell>
  );
}
