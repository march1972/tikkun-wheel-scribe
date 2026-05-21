import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { SkyShell } from "@/components/landing/SkyShell";
import { PrimaryCTA } from "@/components/landing/PrimaryCTA";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_GOLD_BRIGHT, C_DAWN,
  C_RULE, C_RULE_SOFT, C_BAND_DEEP, C_BAND_MID, C_BAND_DAWN,
} from "@/lib/landing-style";
import { signById, STATIC_COPY, type TikkunSign } from "@/lib/tikkun-data";

const search = z.object({ sign: z.string().optional() });

export const Route = createFileRoute("/reading")({
  component: ReadingPage,
  validateSearch: search,
  head: () => ({ meta: [{ title: "Your Tikkun Reading — Kabbalah Astrology" }] }),
});

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

function Paragraphs({ text, splitOn }: { text: string; splitOn: string }) {
  const parts = text.split(splitOn).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => (
        <p
          key={i}
          style={{
            fontFamily: BODY, color: C_INK_SOFT,
            fontSize: "15px",
            lineHeight: 1.7,
            marginTop: i === 0 ? 0 : "1.25em",
            maxWidth: "38rem",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
        >
          {p}
        </p>
      ))}
    </>
  );
}

function SectionHeader({ children, numeral }: { children: React.ReactNode; numeral?: string }) {
  return (
    <div className="flex flex-col items-center" style={{ marginBottom: "clamp(1.5rem,3vh,2.25rem)" }}>
      <span
        aria-hidden
        style={{
          display: "block",
          width: "44px",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${C_GOLD}aa, transparent)`,
          marginBottom: "14px",
        }}
      />
      {numeral && (
        <span
          style={{
            fontFamily: HEAD, fontStyle: "italic", color: C_GOLD_BRIGHT,
            fontSize: "13px", letterSpacing: "0.18em", marginBottom: "8px", opacity: 0.85,
          }}
        >
          {numeral}
        </span>
      )}
      <h2
        className="text-center"
        style={{
          fontFamily: BODY,
          color: C_GOLD,
          fontSize: "11px",
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          fontWeight: 600,
          margin: 0,
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4" aria-hidden style={{ padding: "0" }}>
      <span style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${C_RULE})` }} />
      <span style={{ color: C_GOLD, fontSize: 10, opacity: 0.7, letterSpacing: "0.3em" }}>✦</span>
      <span style={{ width: 60, height: 1, background: `linear-gradient(90deg, ${C_RULE}, transparent)` }} />
    </div>
  );
}

function ReadingPage() {
  const navigate = useNavigate();
  const { sign: signId } = Route.useSearch();
  const [sign, setSign] = useState<TikkunSign | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const id = signId ?? sessionStorage.getItem("tikkun_real_sign");
    const s = signById(id);
    if (!s) {
      navigate({ to: "/" });
      return;
    }
    setSign(s);
  }, [signId, navigate]);

  if (!sign) return null;
  const sc = STATIC_COPY.screen6;
  const headers = sc.sectionHeaders;
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareText = `Discover your Tikkun — your soul's pattern of correction in Kabbalah Astrology.`;

  return (
    <SkyShell starDensity={280}>
      <style>{`
        @keyframes tikkun-fade-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes tikkun-glow { 0%, 100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.06); } }
        .tk-fade { animation: tikkun-fade-up 1.1s ease-out both; }
        .tk-fade-d1 { animation: tikkun-fade-up 1.1s ease-out 0.25s both; }
        .tk-fade-d2 { animation: tikkun-fade-up 1.1s ease-out 0.5s both; }
        .tk-fade-d3 { animation: tikkun-fade-up 1.1s ease-out 0.8s both; }
        .tk-halo { animation: tikkun-glow 6s ease-in-out infinite; }
      `}</style>

      {/* ── Reveal hero ── */}
      <section className="relative mx-auto flex max-w-2xl flex-col items-center px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(0.5rem,2vh,1.5rem)] pb-[clamp(3rem,7vh,5rem)] text-center">
        <div className="relative flex flex-col items-center tk-fade">
          {/* Halo */}
          <div
            aria-hidden
            className="tk-halo"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -55%)",
              width: "clamp(260px, 50vw, 460px)",
              height: "clamp(260px, 50vw, 460px)",
              background: `radial-gradient(circle, ${C_DAWN}33 0%, ${C_GOLD}1f 35%, transparent 70%)`,
              filter: "blur(8px)",
              pointerEvents: "none",
            }}
          />
          <span
            className="relative"
            style={{
              fontFamily: HEAD, color: C_DAWN, fontSize: "clamp(96px, 18vw, 180px)",
              lineHeight: 1, textShadow: `0 0 40px ${C_DAWN}88, 0 0 80px ${C_GOLD}44`,
            }}
          >
            {sign.hebrewLetter}
          </span>
        </div>

        <span
          className="tk-fade-d1"
          style={{
            color: C_GOLD, fontFamily: BODY, fontSize: "11px",
            letterSpacing: "0.42em", textTransform: "uppercase",
            display: "block", marginTop: "clamp(1.5rem,3vh,2rem)",
          }}
        >
          {sc.label}
        </span>
        <h1
          className="tk-fade-d1"
          style={{
            fontFamily: HEAD, color: C_INK, fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 400, fontStyle: "italic", marginTop: "12px", lineHeight: 1.1,
          }}
        >
          {sign.sign}
        </h1>

        {/* Framed mantra */}
        <div className="tk-fade-d2 flex flex-col items-center" style={{ marginTop: "clamp(2.5rem,5vh,3.5rem)" }}>
          <div className="flex items-center gap-3" aria-hidden>
            <span style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${C_GOLD}aa)` }} />
            <span style={{ color: C_GOLD_BRIGHT, fontSize: 11 }}>✦</span>
            <span style={{ width: 50, height: 1, background: `linear-gradient(90deg, ${C_GOLD}aa, transparent)` }} />
          </div>
          <blockquote
            className="italic"
            style={{
              fontFamily: HEAD, color: C_INK, fontSize: "clamp(20px, 3vw, 30px)",
              lineHeight: 1.45, maxWidth: "34rem", margin: "1.25rem 0",
            }}
          >
            “{sign.screen6.mantraQuote}”
          </blockquote>
          <div className="flex items-center gap-3" aria-hidden>
            <span style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${C_GOLD}aa)` }} />
            <span style={{ color: C_GOLD_BRIGHT, fontSize: 11 }}>✦</span>
            <span style={{ width: 50, height: 1, background: `linear-gradient(90deg, ${C_GOLD}aa, transparent)` }} />
          </div>
        </div>

        <p
          className="tk-fade-d3"
          style={{
            fontFamily: BODY, color: C_MUTED, fontSize: "11px",
            letterSpacing: "0.32em", textTransform: "uppercase",
            marginTop: "clamp(2.5rem,5vh,3.5rem)",
          }}
        >
          {sc.scrollHint}
        </p>
      </section>

      {/* ── Life's Pattern ── */}
      <ReadingBand bg={C_BAND_DEEP}>
        <SectionHeader numeral={ROMAN[0]}>{headers[0]}</SectionHeader>
        <Paragraphs text={sign.screen6.lifesPattern} splitOn="\n\n" />
      </ReadingBand>

      {/* ── Archetype ── (dawn lift) */}
      <ReadingBand bg={C_BAND_DAWN}>
        <SectionHeader numeral={ROMAN[1]}>{headers[1]}</SectionHeader>
        <div className="text-center" style={{ display: "flex", flexDirection: "column", gap: "0.75em" }}>
          {sign.screen6.archetype.split("\n").map((line, i) => (
            <p
              key={i}
              className="italic"
              style={{
                fontFamily: HEAD, color: C_INK, fontSize: "clamp(22px, 3.4vw, 34px)",
                lineHeight: 1.4, margin: 0,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </ReadingBand>

      {/* ── Life's Work ── */}
      <ReadingBand bg={C_BAND_MID}>
        <SectionHeader numeral={ROMAN[2]}>{headers[2]}</SectionHeader>
        <Paragraphs text={sign.screen6.lifesWork} splitOn="\n\n" />
      </ReadingBand>

      {/* ── Tikkun Letter (two column on desktop) ── */}
      <ReadingBand bg={C_BAND_DEEP}>
        <SectionHeader numeral={ROMAN[3]}>{headers[3]}</SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-[clamp(1.5rem,4vw,3rem)] max-w-3xl mx-auto">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span
              style={{
                fontFamily: HEAD, color: C_DAWN, fontSize: "clamp(96px, 14vw, 160px)",
                lineHeight: 1, textShadow: `0 0 32px ${C_DAWN}66, 0 0 60px ${C_GOLD}33`,
              }}
            >
              {sign.hebrewLetter}
            </span>
            <span
              style={{
                fontFamily: HEAD, color: C_INK, fontStyle: "italic",
                fontSize: "clamp(18px, 2.4vw, 24px)", marginTop: "12px",
              }}
            >
              {sign.letterName}
            </span>
            <span
              style={{
                fontFamily: BODY, color: C_GOLD, fontSize: "11px",
                letterSpacing: "0.32em", textTransform: "uppercase", marginTop: "6px",
              }}
            >
              {sign.screen6.letterMeaning}
            </span>
          </div>
          <p
            style={{
              fontFamily: BODY, color: C_INK_SOFT, fontSize: "15px",
              lineHeight: 1.7, maxWidth: "34rem",
            }}
          >
            {sign.screen6.letterTeaching}
          </p>
        </div>
      </ReadingBand>

      {/* ── Daily Mantra (peak — dawn band with framed card) ── */}
      <ReadingBand bg={C_BAND_DAWN}>
        <SectionHeader numeral={ROMAN[4]}>{headers[4]}</SectionHeader>
        <div
          className="relative mx-auto"
          style={{
            maxWidth: "36rem",
            padding: "clamp(2rem,4vw,3rem) clamp(1.5rem,3vw,2.5rem)",
            border: `1px solid ${C_GOLD}55`,
            borderRadius: "2px",
            background: "rgba(20, 28, 50, 0.35)",
            boxShadow: `0 0 60px ${C_GOLD}15, inset 0 0 40px rgba(255,220,180,0.04)`,
          }}
        >
          {/* corner ornaments */}
          {[
            { top: -6, left: -6 }, { top: -6, right: -6 },
            { bottom: -6, left: -6 }, { bottom: -6, right: -6 },
          ].map((pos, i) => (
            <span key={i} aria-hidden style={{
              position: "absolute", ...pos, width: 12, height: 12,
              borderTop: pos.top !== undefined ? `1px solid ${C_GOLD}` : "none",
              borderBottom: pos.bottom !== undefined ? `1px solid ${C_GOLD}` : "none",
              borderLeft: pos.left !== undefined ? `1px solid ${C_GOLD}` : "none",
              borderRight: pos.right !== undefined ? `1px solid ${C_GOLD}` : "none",
            }} />
          ))}
          <p
            className="text-center italic"
            style={{
              fontFamily: HEAD, color: C_GOLD_BRIGHT, fontSize: "clamp(24px, 3.8vw, 36px)",
              lineHeight: 1.4, margin: 0, letterSpacing: "-0.005em",
            }}
          >
            “{sign.screen6.dailyMantra}”
          </p>
        </div>
      </ReadingBand>

      {/* ── Reflection ── */}
      <ReadingBand bg={C_BAND_MID}>
        <SectionHeader numeral={ROMAN[5]}>{headers[5]}</SectionHeader>
        <div
          className="mx-auto"
          style={{
            maxWidth: "34rem",
            padding: "clamp(1.75rem,3.5vw,2.5rem)",
            border: `1px solid ${C_RULE}`,
            borderRadius: "2px",
            background: "rgba(15, 23, 41, 0.3)",
          }}
        >
          <span aria-hidden style={{
            display: "block", textAlign: "center", color: C_GOLD,
            fontFamily: HEAD, fontStyle: "italic", fontSize: 22, lineHeight: 1, marginBottom: 8,
          }}>“</span>
          <p
            className="text-center"
            style={{
              fontFamily: BODY, color: C_INK, fontSize: "15px",
              lineHeight: 1.7, margin: 0,
            }}
          >
            {sc.reflectionPrompt}
          </p>
        </div>
      </ReadingBand>

      {/* ── Share ── */}
      <ReadingBand bg={C_BAND_DEEP}>
        <SectionHeader numeral={ROMAN[6]}>{headers[6]}</SectionHeader>
        <h3
          className="text-center"
          style={{
            fontFamily: HEAD, color: C_INK, fontSize: "clamp(24px, 3.4vw, 34px)",
            fontWeight: 500, lineHeight: 1.3,
          }}
        >
          {sc.shareHeadline}
        </h3>
        <p
          className="mt-3 text-center"
          style={{ fontFamily: BODY, color: C_INK_SOFT, fontSize: "15px", lineHeight: 1.7, maxWidth: "30rem", marginLeft: "auto", marginRight: "auto" }}
        >
          {sc.shareSub}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}` },
            { label: "Instagram", href: "https://www.instagram.com/" },
          ].map((b) => (
            <a
              key={b.label}
              href={b.href} target="_blank" rel="noopener noreferrer"
              className="uppercase transition-all hover:opacity-100"
              style={{
                fontFamily: BODY, fontSize: "11px", letterSpacing: "0.28em", color: C_INK,
                border: `1px solid ${C_GOLD}55`, padding: "11px 22px", borderRadius: 999,
                background: "rgba(245,200,104,0.04)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C_GOLD; e.currentTarget.style.background = "rgba(245,200,104,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${C_GOLD}55`; e.currentTarget.style.background = "rgba(245,200,104,0.04)"; }}
            >
              {b.label}
            </a>
          ))}
          <button
            type="button"
            onClick={async () => {
              try { await navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
            }}
            className="uppercase transition-all"
            style={{
              fontFamily: BODY, fontSize: "11px", letterSpacing: "0.28em", color: C_INK,
              border: `1px solid ${C_GOLD}55`, padding: "11px 22px", borderRadius: 999,
              background: "rgba(245,200,104,0.04)", cursor: "pointer",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = C_GOLD; e.currentTarget.style.background = "rgba(245,200,104,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${C_GOLD}55`; e.currentTarget.style.background = "rgba(245,200,104,0.04)"; }}
          >
            {copied ? "Copied ✓" : "Copy link"}
          </button>
        </div>
      </ReadingBand>

      {/* ── Want to go deeper → /history ── */}
      <section
        className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(5rem,10vh,8rem)] text-center"
        style={{ background: C_BAND_DAWN, borderTop: `1px solid ${C_RULE_SOFT}` }}
      >
        <SectionHeader numeral={ROMAN[7]}>{headers[7]}</SectionHeader>
        <h3
          style={{
            fontFamily: HEAD, color: C_INK, fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 500, lineHeight: 1.25, marginTop: "0.5rem",
          }}
        >
          {sc.deeperSub}
        </h3>
        <div className="mt-10 flex justify-center">
          <PrimaryCTA label={sc.deeperButton} onClick={() => navigate({ to: "/history" })} />
        </div>
      </section>
    </SkyShell>
  );
}

function ReadingBand({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <>
      <div style={{ background: bg, padding: "clamp(1.5rem,3vh,2.5rem) 0" }}>
        <Divider />
      </div>
      <section
        className="relative px-[clamp(1.25rem,5vw,3rem)] pb-[clamp(4rem,8vh,6.5rem)] pt-[clamp(1rem,2vh,2rem)]"
        style={{ background: bg }}
      >
        <div className="relative mx-auto max-w-3xl">{children}</div>
      </section>
    </>
  );
}
