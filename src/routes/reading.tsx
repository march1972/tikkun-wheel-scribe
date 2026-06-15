import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

const SHARE_URL = "https://tikkun.kabbalahcircle.com";
const SHARE_TEXT = "Hi, get a free Kabbalah Tikkun reading to see your default patterns & purpose.";
import { SkyShell } from "@/components/landing/SkyShell";
import { PrimaryCTA } from "@/components/landing/PrimaryCTA";
import { Reveal } from "@/components/landing/Reveal";
import { TikkunWheel } from "@/components/TikkunWheel";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_DAWN, C_RULE, C_RULE_SOFT,
} from "@/lib/landing-style";
import { SIGNS, toParagraphs, type TikkunSign } from "@/data/tikkun-lookup";
import { READING_COPY } from "@/lib/reading-copy";
import { subscribeNewsletter } from "@/lib/lead.functions";

const search = z.object({ sign: z.string().optional() });

export const Route = createFileRoute("/reading")({
  component: ReadingPage,
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Your Tikkun Reading — Kabbalah Circle" },
      { name: "description", content: "Your personal Kabbalah Tikkun reading — your Soul's Shadow patterns, spiritual work (Tikkun), and daily mantra (Kavanah) based on your birth date." },
      // Personalised, query-string-driven reading — not a canonical landing page.
      // Kept out of the index until we move per-sign content to static /tikkun/[sign] pages in Phase 3.
      { name: "robots", content: "noindex, follow" },
    ],
  }),
});

/* ---------- shared bits ---------- */

const SECTION_GAP = "clamp(3rem, 6vh, 5rem)";

function SectionSpacer() {
  return <div aria-hidden style={{ height: SECTION_GAP }} />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: HEAD,
        color: C_GOLD,
        fontSize: "20px",
        fontWeight: 500,
        margin: 0,
        marginBottom: "1rem",
        letterSpacing: "-0.005em",
      }}
    >
      {children}
    </h2>
  );
}

function HeaderWithAccent({ text }: { text: string }) {
  const m = text.match(/^(.*)\(([^)]+)\)(.*)$/);
  if (!m) return <>{text}</>;
  return (
    <>
      {m[1]}
      <span style={{ color: C_DAWN, fontStyle: "italic" }}>({m[2]})</span>
      {m[3]}
    </>
  );
}

function Hairline({ width = 64, my = SECTION_GAP }: { width?: number; my?: string }) {
  return (
    <div
      aria-hidden
      style={{
        width,
        height: 1,
        background: C_RULE,
        margin: `${my} auto`,
      }}
    />
  );
}

function Body({ text, splitOn }: { text: string; splitOn: string }) {
  const parts = text.split(splitOn).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => (
        <p
          key={i}
          style={{
            fontFamily: BODY,
            color: C_INK_SOFT,
            fontSize: "15px",
            lineHeight: 1.7,
            marginTop: i === 0 ? 0 : "1.1em",
            marginBottom: 0,
            textAlign: "left",
          }}
        >
          {p}
        </p>
      ))}
    </>
  );
}

function Column({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto"
      style={{
        maxWidth: "620px",
        paddingLeft: "clamp(1.25rem,5vw,2rem)",
        paddingRight: "clamp(1.25rem,5vw,2rem)",
      }}
    >
      {children}
    </div>
  );
}

/* ---------- brand share icons ---------- */

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.04 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.36-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.975-1.246-2.242-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.155 0-3.515.012-4.756.069-.945.043-1.504.198-1.857.33-.467.181-.8.398-1.15.748-.35.35-.567.683-.748 1.15-.132.353-.287.912-.33 1.857-.057 1.241-.069 1.601-.069 4.756s.012 3.515.069 4.756c.043.945.198 1.504.33 1.857.181.467.398.8.748 1.15.35.35.683.567 1.15.748.353.132.912.287 1.857.33 1.241.057 1.601.069 4.756.069s3.515-.012 4.756-.069c.945-.043 1.504-.198 1.857-.33.467-.181.8-.398 1.15-.748.35-.35.567-.683.748-1.15.132-.353.287-.912.33-1.857.057-1.241.069-1.601.069-4.756s-.012-3.515-.069-4.756c-.043-.945-.198-1.504-.33-1.857-.181-.467-.398-.8-.748-1.15-.35-.35-.683-.567-1.15-.748-.353-.132-.912-.287-1.857-.33C15.515 4.013 15.155 4.001 12 4.001zm0 3.281a4.718 4.718 0 110 9.436 4.718 4.718 0 010-9.436zm0 1.838a2.88 2.88 0 100 5.76 2.88 2.88 0 000-5.76zm5.013-2.034a1.102 1.102 0 110 2.205 1.102 1.102 0 010-2.205z" />
    </svg>
  );
}

/* ---------- page ---------- */

function ReadingPage() {
  const navigate = useNavigate();
  const { sign: signId } = Route.useSearch();
  const [sign, setSign] = useState<TikkunSign | null>(null);
  const [copied, setCopied] = useState(false);
  const haloRef = useRef<HTMLDivElement | null>(null);

  const subscribe = useServerFn(subscribeNewsletter);
  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [subErr, setSubErr] = useState<string | null>(null);

  const onSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubErr(null);
    if (!email) return;
    setSubState("busy");
    try {
      const res = await subscribe({ data: { email } });
      if (res.ok) { setSubState("done"); setEmail(""); }
      else { setSubState("error"); setSubErr(res.error); }
    } catch {
      setSubState("error");
      setSubErr("Could not subscribe — please try again.");
    }
  };


  useEffect(() => {
    const id = signId ?? sessionStorage.getItem("tikkun_real_sign");
    const s = id ? (SIGNS.find((x) => x.id === id) ?? null) : null;
    if (!s) {
      navigate({ to: "/" });
      return;
    }
    setSign(s);
  }, [signId, navigate]);

  // Hero halo scroll-linked drift
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
        if (el) {
          el.style.transform = `translate(-50%, calc(-55% - ${y * 0.3}px))`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sign]);

  if (!sign) return null;
  const sc = READING_COPY;
  const headers = sc.sectionHeaders;
  const shareUrl = SHARE_URL;
  const shareText = SHARE_TEXT;

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Kabbalah Tikkun reading", text: SHARE_TEXT, url: SHARE_URL });
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      toast("Link copied — paste it to share.");
    } catch {}
  };

  return (
    <SkyShell starDensity={280}>
      <style>{`
        @keyframes tikkun-fade-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes tikkun-glow { 0%, 100% { opacity: 0.55; transform: translate(-50%, -55%) scale(1); } 50% { opacity: 0.85; transform: translate(-50%, -55%) scale(1.06); } }
        .tk-fade { animation: tikkun-fade-up 1.1s ease-out both; }
        .tk-fade-d1 { animation: tikkun-fade-up 1.1s ease-out 0.25s both; }
        .tk-fade-d2 { animation: tikkun-fade-up 1.1s ease-out 0.5s both; }
        .tk-fade-d3 { animation: tikkun-fade-up 1.1s ease-out 0.8s both; }
        .tk-share-pill { transition: transform 220ms cubic-bezier(.2,.7,.3,1.2); }
        .tk-share-pill:hover { transform: translateY(-2px) scale(1.03); }
        .tk-wheel-cta:hover { transform: scale(1.05); filter: drop-shadow(0 0 24px rgba(245,207,122,0.55)); }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative mx-auto flex max-w-2xl flex-col items-center px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1rem,3vh,2rem)] text-center">
        <div className="relative flex flex-col items-center tk-fade">
          <div
            ref={haloRef}
            aria-hidden
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
              willChange: "transform",
            }}
          />
          <span
            className="relative"
            style={{
              fontFamily: HEAD, color: C_DAWN, fontSize: "clamp(96px, 18vw, 180px)",
              lineHeight: 1, textShadow: `0 0 40px ${C_DAWN}88, 0 0 80px ${C_GOLD}44`,
            }}
          >
            {sign.tikkunLetterHebrew}
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
            fontFamily: HEAD, color: C_INK, fontSize: "clamp(34px, 6vw, 60px)",
            fontWeight: 400, fontStyle: "italic", marginTop: "12px", lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          {sign.signId}
        </h1>

        <p
          className="tk-fade-d2"
          style={{
            fontFamily: HEAD, color: C_INK, fontSize: "clamp(22px, 2.8vw, 28px)",
            fontStyle: "italic", lineHeight: 1.5, maxWidth: "34rem",
            marginTop: "clamp(2rem,4vh,3rem)",
          }}
        >
          {sign.quote}
        </p>

        <p
          className="tk-fade-d3"
          style={{
            fontFamily: BODY, color: C_MUTED, fontSize: "10px",
            letterSpacing: "0.32em", textTransform: "uppercase",
            marginTop: "clamp(2.5rem,5vh,3.5rem)",
            whiteSpace: "pre-line",
          }}
        >
          NORTH LUNAR NODE IN {sign.northNode}
          {"\n"}
          SOUTH LUNAR NODE IN {sign.southNode}
        </p>
      </section>

      <Hairline />

      {/* ── Your Shadow Pattern (Gilgul) ── */}
      <Reveal>
        <Column>
          <SectionLabel><HeaderWithAccent text={headers[0]} /></SectionLabel>
          <Body text={sign.shadowGilgul} splitOn={"\n\n"} />
        </Column>
      </Reveal>

      <Hairline />

      {/* ── Shadow Archetype ── */}
      <Reveal>
        <Column>
          <SectionLabel>{headers[1]}</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6em" }}>
            {sign.shadowArchetype.split("\n").map((line: string, i: number) => (
              <p
                key={i}
                style={{
                  fontFamily: HEAD, fontStyle: "italic", color: C_INK,
                  fontSize: "clamp(22px, 2.8vw, 28px)", lineHeight: 1.5,
                  margin: 0, letterSpacing: "-0.005em",
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </Column>
      </Reveal>

      <Hairline />

      {/* ── Your Spiritual Work (Tikkun) ── */}
      <Reveal>
        <Column>
          <SectionLabel><HeaderWithAccent text={headers[2]} /></SectionLabel>
          <Body text={sign.spiritualWorkTikkun} splitOn={"\n\n"} />
        </Column>
      </Reveal>

      <Hairline />

      {/* ── Your Tikkun Letter — stacked, centered ── */}
      <Reveal>
        <Column>
          <SectionLabel>{headers[3]}</SectionLabel>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: HEAD, color: C_DAWN,
                fontSize: "clamp(72px, 11vw, 110px)", lineHeight: 1,
                textShadow: `0 0 28px ${C_DAWN}55, 0 0 60px ${C_GOLD}22`,
              }}
            >
              {sign.tikkunLetterHebrew}
            </div>
          </div>
          <Hairline width={32} my="clamp(1.5rem,3vh,2rem)" />
          <div
            style={{
              fontFamily: BODY, color: C_INK_SOFT, fontSize: "15px",
              lineHeight: 1.7, textAlign: "left",
            }}
          >
            {toParagraphs(sign.tikkunLetterFull).map((p, i) => (
              <p key={i} style={{ margin: i === 0 ? 0 : "1.1em 0 0 0" }}>{p}</p>
            ))}
          </div>
        </Column>
      </Reveal>

      <Hairline />

      {/* ── Daily Mantra (the moment) ── */}
      <Reveal duration={1100} y={20}>
        <section className="px-[clamp(1.25rem,5vw,3rem)] text-center">
          <h2
            style={{
              fontFamily: HEAD, color: C_GOLD, fontSize: "20px",
              fontWeight: 500, margin: 0, marginBottom: "clamp(1.5rem,3vh,2rem)",
            }}
          >
            <HeaderWithAccent text={headers[4]} />
          </h2>
          <p
            style={{
              fontFamily: HEAD, fontStyle: "italic", color: C_INK,
              fontSize: "clamp(22px, 2.8vw, 28px)", lineHeight: 1.5,
              maxWidth: "30rem", margin: "0 auto",
              textShadow: `0 0 40px ${C_DAWN}66, 0 0 100px ${C_DAWN}33`,
              letterSpacing: "-0.01em",
            }}
          >
            {sign.dailyMantra}
          </p>
        </section>
      </Reveal>

      <SectionSpacer />

      {/* ── Share / Spread the Light (distinct card) ── */}
      <Reveal>
        <div
          style={{
            width: "100%",
            padding: "clamp(2.5rem,6vh,4rem) clamp(1.25rem,5vw,3rem)",
            background:
              "radial-gradient(70% 55% at 50% 25%, rgba(180,200,235,0.16) 0%, rgba(10,14,28,0) 70%), radial-gradient(45% 35% at 90% 100%, rgba(245,207,122,0.08) 0%, rgba(245,207,122,0) 70%), linear-gradient(180deg, #14203c 0%, #1c2848 40%, #22304f 70%, #1c2848 100%)",
            textAlign: "center",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "clamp(1rem,2vh,1.5rem)",
            }}
          >
            <Link
              to="/"
              title={SHARE_TEXT}
              aria-label={SHARE_TEXT}
              className="tk-wheel-cta"
              style={{ display: "inline-flex", opacity: 0.92, cursor: "pointer", borderRadius: "50%", transition: "transform 240ms ease, filter 240ms ease" }}
            >
              <TikkunWheel size={150} state="stopped" hideCenterLabel />
            </Link>
          </div>

          <h2
            style={{
              fontFamily: HEAD,
              color: C_GOLD,
              fontSize: "20px",
              fontWeight: 500,
              margin: 0,
              marginBottom: "0.75rem",
              letterSpacing: "-0.005em",
            }}
          >
            {headers[6]}
          </h2>

          <p
            style={{
              fontFamily: BODY,
              color: C_INK_SOFT,
              fontSize: "16px",
              lineHeight: 1.65,
              margin: "0 auto",
              maxWidth: "28rem",
            }}
          >
            {sc.shareSub}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + " " + SHARE_URL)}`}
              target="_blank" rel="noopener noreferrer"
              title={SHARE_TEXT}
              aria-label={SHARE_TEXT}
              className="tk-share-pill inline-flex items-center gap-2"
              style={{
                fontFamily: BODY, fontSize: "13px", fontWeight: 600, color: "#fff",
                background: "#25D366", padding: "12px 22px", borderRadius: 999,
                boxShadow: "0 8px 24px -8px rgba(37,211,102,0.55)",
              }}
            >
              <WhatsAppIcon /> WhatsApp
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            <button
              type="button"
              onClick={onInstagramShare}
              title={SHARE_TEXT}
              aria-label={SHARE_TEXT}
              className="tk-share-pill inline-flex items-center gap-2"
              style={{
                fontFamily: BODY, fontSize: "13px", fontWeight: 600, color: "#fff",
                background: "linear-gradient(135deg, #515BD4 0%, #8134AF 25%, #DD2A7B 55%, #FEDA77 100%)",
                padding: "12px 22px", borderRadius: 999,
                boxShadow: "0 8px 24px -8px rgba(221,42,123,0.5)",
                border: "none", cursor: "pointer",
              }}
            >
              <InstagramIcon /> Instagram
            </button>
            <button
              type="button"
              onClick={copy}
              className="tk-share-pill inline-flex items-center gap-2"
              style={{
                fontFamily: BODY, fontSize: "13px", fontWeight: 600, color: C_INK,
                background: "rgba(245,200,104,0.06)",
                border: `1px solid ${C_GOLD}88`,
                padding: "12px 22px", borderRadius: 999, cursor: "pointer",
              }}
            >
              <Link2 size={16} />
              {copied ? "Copied ✓" : "Copy link"}
            </button>
          </div>
        </div>
      </Reveal>



      <SectionSpacer />

      {/* ── Newsletter ── */}
      <Reveal duration={900} y={20}>
        <section
          className="relative px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3rem,6vh,5rem)] text-center"
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
              Join our free circle for insights and coaching on relationships, meaning, and the work of becoming. Leave any time.
            </p>

            {subState === "done" ? (
              <p className="mt-10 italic" style={{ fontFamily: HEAD, color: C_GOLD, fontSize: "20px" }}>
                Welcome. Check your inbox.
              </p>
            ) : (
              <form
                onSubmit={onSubscribe}
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
                  label={subState === "busy" ? "Subscribing…" : "JOIN WAITLIST"}
                  disabled={subState === "busy"}
                />
              </form>
            )}
            {subErr && <p className="mt-3" style={{ fontFamily: BODY, color: C_DAWN, fontSize: "12px" }}>{subErr}</p>}
          </div>
        </section>
      </Reveal>

    </SkyShell>
  );
}
