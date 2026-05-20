import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { SkyShell } from "@/components/landing/SkyShell";
import { PrimaryCTA } from "@/components/landing/PrimaryCTA";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_DAWN, C_RULE, C_RULE_SOFT, C_BAND_DEEP, C_BAND_MID,
} from "@/lib/landing-style";
import { signById, STATIC_COPY, type TikkunSign } from "@/lib/tikkun-data";

const search = z.object({ sign: z.string().optional() });

export const Route = createFileRoute("/reading")({
  component: ReadingPage,
  validateSearch: search,
  head: () => ({ meta: [{ title: "Your Tikkun Reading — Kabbalah Astrology" }] }),
});

function Paragraphs({ text, splitOn }: { text: string; splitOn: string }) {
  const parts = text.split(splitOn).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => (
        <p
          key={i}
          className="font-mono font-thin"
          style={{
            color: C_INK_SOFT,
            fontSize: "clamp(14px, 1.6vw, 17px)",
            lineHeight: 1.7,
            marginTop: i === 0 ? 0 : "1.25em",
            maxWidth: "38rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {p}
        </p>
      ))}
    </>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-center"
      style={{
        fontFamily: BODY,
        color: C_GOLD,
        fontSize: "11px",
        letterSpacing: "0.36em",
        textTransform: "uppercase",
        fontWeight: 600,
        marginBottom: "clamp(1.25rem,2.5vh,1.75rem)",
      }}
    >
      {children}
    </h2>
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
      navigate({ to: "/form" });
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
    <SkyShell starDensity={260}>
      {/* ── Reveal hero ── */}
      <section className="relative mx-auto flex max-w-2xl flex-col items-center px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,5vh,4rem)] pb-[clamp(3rem,6vh,5rem)] text-center">
        <div className="flex w-full items-center gap-3">
          <span className="h-px flex-1" style={{ background: C_RULE }} />
          <span
            style={{
              fontFamily: BODY, color: C_INK_SOFT, fontSize: "11px",
              letterSpacing: "0.36em", textTransform: "uppercase", fontWeight: 600,
            }}
          >
            {sc.eyebrow}
          </span>
          <span className="h-px flex-1" style={{ background: C_RULE }} />
        </div>

        <div className="mt-[clamp(1.5rem,3vh,2.25rem)] flex flex-wrap items-baseline justify-center gap-[clamp(10px,2vw,20px)]">
          <span
            style={{
              fontFamily: HEAD, color: C_DAWN, fontSize: "clamp(64px, 13vw, 130px)",
              lineHeight: 1, textShadow: `0 0 28px ${C_DAWN}66`,
            }}
          >
            {sign.hebrewLetter}
          </span>
          <span
            style={{
              fontFamily: HEAD, color: C_INK, fontSize: "clamp(22px, 4vw, 36px)",
              fontWeight: 400,
            }}
          >
            <span style={{ color: C_MUTED, fontStyle: "normal", fontFamily: BODY, fontSize: "11px", letterSpacing: "0.32em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
              {sc.label}
            </span>
            <span style={{ fontStyle: "italic" }}>{sign.sign}</span>
          </span>
        </div>

        <blockquote
          className="mt-[clamp(2rem,4vh,3rem)] italic"
          style={{
            fontFamily: HEAD, color: C_INK, fontSize: "clamp(18px, 2.4vw, 24px)",
            lineHeight: 1.45, maxWidth: "32rem",
          }}
        >
          “{sign.screen6.mantraQuote}”
        </blockquote>

        <p
          className="mt-[clamp(2rem,4vh,3rem)] font-mono"
          style={{ color: C_MUTED, fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          {sc.scrollHint}
        </p>
      </section>

      {/* ── Life's Pattern ── */}
      <ReadingBand bg={C_BAND_DEEP}>
        <SectionHeader>{headers[0]}</SectionHeader>
        <Paragraphs text={sign.screen6.lifesPattern} splitOn="\n\n" />
      </ReadingBand>

      {/* ── Archetype ── */}
      <ReadingBand bg={C_BAND_MID}>
        <SectionHeader>{headers[1]}</SectionHeader>
        <div className="text-center">
          {sign.screen6.archetype.split("\n").map((line, i) => (
            <p
              key={i}
              className="italic"
              style={{
                fontFamily: HEAD, color: C_INK, fontSize: "clamp(20px, 3vw, 28px)",
                lineHeight: 1.35,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </ReadingBand>

      {/* ── Life's Work ── */}
      <ReadingBand bg={C_BAND_DEEP}>
        <SectionHeader>{headers[2]}</SectionHeader>
        <Paragraphs text={sign.screen6.lifesWork} splitOn="\n\n" />
      </ReadingBand>

      {/* ── Tikkun Letter ── */}
      <ReadingBand bg={C_BAND_MID}>
        <SectionHeader>{headers[3]}</SectionHeader>
        <div className="flex flex-col items-center text-center">
          <div className="flex items-baseline gap-3">
            <span
              style={{
                fontFamily: HEAD, color: C_DAWN, fontSize: "clamp(48px, 8vw, 80px)",
                lineHeight: 1, textShadow: `0 0 20px ${C_DAWN}55`,
              }}
            >
              {sign.hebrewLetter}
            </span>
            <span
              style={{
                fontFamily: HEAD, color: C_INK, fontStyle: "italic",
                fontSize: "clamp(18px, 2.6vw, 26px)",
              }}
            >
              {sign.letterName} —{" "}
              <span style={{ color: C_GOLD }}>{sign.screen6.letterMeaning}</span>
            </span>
          </div>
          <p
            className="mt-6 font-mono font-thin"
            style={{
              color: C_INK_SOFT, fontSize: "clamp(14px, 1.6vw, 17px)",
              lineHeight: 1.7, maxWidth: "34rem",
            }}
          >
            {sign.screen6.letterTeaching}
          </p>
        </div>
      </ReadingBand>

      {/* ── Daily Mantra ── */}
      <ReadingBand bg={C_BAND_DEEP}>
        <SectionHeader>{headers[4]}</SectionHeader>
        <p
          className="text-center italic"
          style={{
            fontFamily: HEAD, color: C_GOLD, fontSize: "clamp(20px, 3vw, 28px)",
            lineHeight: 1.45,
          }}
        >
          “{sign.screen6.dailyMantra}”
        </p>
      </ReadingBand>

      {/* ── Reflection ── */}
      <ReadingBand bg={C_BAND_MID}>
        <SectionHeader>{headers[5]}</SectionHeader>
        <p
          className="text-center font-mono font-thin"
          style={{
            color: C_INK, fontSize: "clamp(15px, 1.8vw, 18px)",
            lineHeight: 1.65, maxWidth: "32rem", marginLeft: "auto", marginRight: "auto",
          }}
        >
          {sc.reflectionPrompt}
        </p>
      </ReadingBand>

      {/* ── Share ── */}
      <ReadingBand bg={C_BAND_DEEP}>
        <SectionHeader>{headers[6]}</SectionHeader>
        <h3
          className="text-center"
          style={{
            fontFamily: HEAD, color: C_INK, fontSize: "clamp(22px, 3vw, 30px)",
            fontWeight: 500,
          }}
        >
          {sc.shareHeadline}
        </h3>
        <p
          className="mt-3 text-center font-mono font-thin"
          style={{ color: C_INK_SOFT, fontSize: "14px", maxWidth: "30rem", marginLeft: "auto", marginRight: "auto" }}
        >
          {sc.shareSub}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
            target="_blank" rel="noopener noreferrer"
            className="uppercase transition-opacity hover:opacity-80"
            style={{
              fontFamily: BODY, fontSize: "11px", letterSpacing: "0.24em", color: C_INK,
              border: `1px solid ${C_RULE}`, padding: "10px 18px", borderRadius: 999,
            }}
          >WhatsApp</a>
          <a
            href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
            className="uppercase transition-opacity hover:opacity-80"
            style={{
              fontFamily: BODY, fontSize: "11px", letterSpacing: "0.24em", color: C_INK,
              border: `1px solid ${C_RULE}`, padding: "10px 18px", borderRadius: 999,
            }}
          >Instagram</a>
          <button
            type="button"
            onClick={async () => {
              try { await navigator.clipboard.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
            }}
            className="uppercase transition-opacity hover:opacity-80"
            style={{
              fontFamily: BODY, fontSize: "11px", letterSpacing: "0.24em", color: C_INK,
              border: `1px solid ${C_RULE}`, padding: "10px 18px", borderRadius: 999,
              background: "transparent", cursor: "pointer",
            }}
          >{copied ? "Copied ✓" : "Copy link"}</button>
        </div>
      </ReadingBand>

      {/* ── Want to go deeper → /history ── */}
      <section
        className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(4rem,8vh,7rem)] text-center"
        style={{ background: C_BAND_MID, borderTop: `1px solid ${C_RULE_SOFT}` }}
      >
        <SectionHeader>{headers[7]}</SectionHeader>
        <p
          className="mt-2 font-mono font-thin"
          style={{ color: C_INK_SOFT, fontSize: "14px", maxWidth: "30rem", marginLeft: "auto", marginRight: "auto" }}
        >
          {sc.deeperSub}
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/history">
            <PrimaryCTA label={sc.deeperButton} />
          </Link>
        </div>
      </section>
    </SkyShell>
  );
}

function ReadingBand({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <section
      className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3.5rem,7vh,6rem)]"
      style={{ background: bg, borderTop: `1px solid ${C_RULE_SOFT}` }}
    >
      <div className="relative mx-auto max-w-3xl">{children}</div>
    </section>
  );
}
