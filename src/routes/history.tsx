import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { SkyShell } from "@/components/landing/SkyShell";
import { PrimaryCTA } from "@/components/landing/PrimaryCTA";
import { Reveal } from "@/components/landing/Reveal";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_DAWN, C_RULE, C_RULE_SOFT,
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
  const haloRef = useRef<HTMLDivElement | null>(null);

  // Hero halo scroll-linked drift, matching /reading
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const el = haloRef.current;
        if (el) el.style.transform = `translate(-50%, calc(-50% - ${y * 0.3}px))`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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
    <SkyShell starDensity={280}>
      <style>{`
        @keyframes hist-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .hist-fade { animation: hist-fade-up 1.1s ease-out both; }
        .hist-fade-d1 { animation: hist-fade-up 1.1s ease-out 0.25s both; }
        .hist-fade-d2 { animation: hist-fade-up 1.1s ease-out 0.5s both; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative mx-auto flex max-w-3xl flex-col items-center px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,5vh,4rem)] pb-[clamp(3rem,6vh,5rem)] text-center">
        <div
          ref={haloRef}
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(320px, 60vw, 560px)",
            height: "clamp(320px, 60vw, 560px)",
            background: `radial-gradient(circle, ${C_GOLD}33 0%, ${C_DAWN}1f 40%, transparent 70%)`,
            filter: "blur(10px)",
            pointerEvents: "none",
            willChange: "transform",
          }}
        />

        <h1
          className="hist-fade relative"
          style={{
            fontFamily: HEAD, color: C_INK, fontWeight: 400,
            fontSize: "clamp(40px, 7.5vw, 84px)", lineHeight: 1.05, letterSpacing: "-0.02em",
            textShadow: `0 0 60px ${C_DAWN}33, 0 0 120px ${C_GOLD}22`,
          }}
        >
          Ancient <span style={{ color: C_GOLD, fontStyle: "italic" }}>wisdom</span>,
          <br />
          living <span style={{ color: C_DAWN, fontStyle: "italic" }}>work</span>.
        </h1>

        <p
          className="hist-fade-d1 relative mt-[clamp(1.5rem,3vh,2.25rem)]"
          style={{
            fontFamily: HEAD, fontStyle: "italic", color: C_INK_SOFT,
            fontSize: "clamp(18px, 2.4vw, 24px)", lineHeight: 1.5,
            maxWidth: "36rem",
          }}
        >
          Kabbalah provides us with wisdom to transform our lives&nbsp;
        </p>
      </section>

      {/* ── Prose ────────────────────────────────────────────── */}
      <section
        className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(4rem,8vh,7rem)]"
        style={{ borderTop: `1px solid ${C_RULE_SOFT}` }}
      >
        <div className="relative mx-auto max-w-2xl">
          <Reveal>
            <p style={{ fontFamily: BODY, color: C_INK_SOFT, fontSize: "17px", lineHeight: 1.75 }}>
              Kabbalistic Astrology dates back to{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>Abraham the Patriarch</span> and is found in many ancient texts and commentaries — the{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>Talmud</span> (the Oral Torah), the{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>Sefer Yetzirah</span> (Book of Formation), and the{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>Zohar</span> (Book of Splendor).
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-7" style={{ fontFamily: BODY, color: C_INK_SOFT, fontSize: "17px", lineHeight: 1.75 }}>
              Kabbalists generally accept the influence of the celestial constellations (Mazalot), but reject astrology as{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic" }}>fatalistic prediction</span>. A person's free will always overrides fate.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-7" style={{ fontFamily: BODY, color: C_INK_SOFT, fontSize: "17px", lineHeight: 1.75 }}>
              Fulfilling your{" "}
              <span style={{ color: C_DAWN, fontStyle: "italic" }}>Tikkun</span> serves a greater purpose —{" "}
              <span style={{ color: C_GOLD, fontStyle: "italic", fontWeight: 500 }}>Tikkun Olam</span> — sharing your light to build a better world.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Pull quote ───────────────────────────────────────── */}
      <Reveal duration={1100} y={20}>
        <section className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(4rem,8vh,7rem)] text-center"
          style={{ borderTop: `1px solid ${C_RULE_SOFT}` }}
        >
          <p
            style={{
              fontFamily: HEAD, fontStyle: "italic", color: C_INK,
              fontSize: "clamp(28px, 4.6vw, 48px)", lineHeight: 1.3,
              maxWidth: "34rem", margin: "0 auto",
              textShadow: `0 0 50px ${C_DAWN}55, 0 0 120px ${C_DAWN}22`,
              letterSpacing: "-0.01em",
            }}
          >
            “Come and see... joy pierces through the celestial garments to draw down pure blessing" — Zohar
          </p>
        </section>
      </Reveal>

      {/* ── Newsletter ───────────────────────────────────────── */}
      <Reveal duration={900} y={20}>
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(5rem,10vh,8rem)] text-center"
          style={{ borderTop: `1px solid ${C_RULE_SOFT}` }}
        >
          <div className="relative mx-auto max-w-2xl">
            <p
              style={{
                fontFamily: BODY, color: C_GOLD, fontSize: "11px",
                letterSpacing: "0.42em", textTransform: "uppercase", fontWeight: 600,
              }}
            >
              THE KABBALAH CIRCLE
            </p>
            <h2
              className="mt-5"
              style={{
                fontFamily: HEAD, color: C_INK, fontWeight: 400,
                fontSize: "clamp(34px, 5.5vw, 60px)", letterSpacing: "-0.02em", lineHeight: 1.1,
              }}
            >
              Go <span style={{ color: C_GOLD, fontStyle: "italic" }}>deeper</span>.
            </h2>
            <p
              className="mx-auto mt-5"
              style={{ fontFamily: BODY, color: C_INK_SOFT, fontSize: "16px", lineHeight: 1.7, maxWidth: "32rem" }}
            >
              Join our community for free teachings on Kabbalah, meaning, purpose, and the work of becoming. Leave at anytime.
            </p>

            {state === "done" ? (
              <p className="mt-10 italic" style={{ fontFamily: HEAD, color: C_GOLD, fontSize: "20px" }}>
                Welcome. Check your inbox.
              </p>
            ) : (
              <form
                onSubmit={onSubmit}
                className="mt-10 mx-auto flex w-full max-w-md flex-col sm:flex-row items-stretch gap-3"
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
                <PrimaryCTA
                  type="submit"
                  variant="dawn"
                  label={state === "busy" ? "Subscribing…" : "JOIN WAITLIST"}
                  disabled={state === "busy"}
                />
              </form>
            )}
            {err && <p className="mt-3" style={{ fontFamily: BODY, color: C_DAWN, fontSize: "12px" }}>{err}</p>}
          </div>
        </section>
      </Reveal>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(3rem,6vh,5rem)] pb-[clamp(1.5rem,3vh,2.5rem)]">
        <div className="mx-auto max-w-6xl">
          <div style={{ borderTop: `1px solid ${C_RULE}` }} className="mb-[clamp(1.5rem,3vh,2.5rem)]" />
          <div className="flex justify-center">
            <div
              className="flex flex-col items-center gap-2 md:flex-row md:gap-0"
              style={{
                fontFamily: BODY, fontSize: "10px",
                letterSpacing: "0.12em", fontWeight: 500,
              }}
            >
              <Link to="/terms" style={{ color: C_INK_SOFT, textDecoration: "underline" }}>
                Terms &amp; Conditions
              </Link>
              <span className="hidden md:inline" style={{ color: C_MUTED, margin: "0 8px" }}>·</span>
              <Link to="/privacy" style={{ color: C_INK_SOFT, textDecoration: "underline" }}>
                Privacy
              </Link>
              <span className="hidden md:inline" style={{ color: C_MUTED, margin: "0 8px" }}>·</span>
              <span style={{ color: C_INK_SOFT }}>Kabbalah Astrology</span>
              <span className="hidden md:inline" style={{ color: C_MUTED, margin: "0 8px" }}>·</span>
              <span style={{ color: C_INK_SOFT }}>Kabbalah Circle © 2026</span>
            </div>
          </div>
        </div>
      </footer>
    </SkyShell>
  );
}
