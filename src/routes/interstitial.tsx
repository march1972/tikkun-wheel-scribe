import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SkyShell } from "@/components/landing/SkyShell";
import { PrimaryCTA } from "@/components/landing/PrimaryCTA";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_DAWN, C_RULE,
} from "@/lib/landing-style";

export const Route = createFileRoute("/interstitial")({
  component: Interstitial,
  head: () => ({ meta: [{ title: "Your actual Tikkun — Kabbalah Astrology" }] }),
});

function Interstitial() {
  const navigate = useNavigate();
  return (
    <SkyShell starDensity={200}>
      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col items-center justify-center px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3rem,8vh,6rem)] text-center">
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
          className="mt-[clamp(2rem,5vh,3.5rem)]"
          style={{
            fontFamily: HEAD, color: C_INK, fontWeight: 500,
            fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.12,
            letterSpacing: "-0.02em",
          }}
        >
          Your actual{" "}
          <span style={{ color: C_DAWN, fontStyle: "italic", fontWeight: 400 }}>Tikkun</span>{" "}
          pattern is found in your <span style={{ color: C_GOLD, fontStyle: "italic" }}>lunar birth chart</span>.
        </h1>

        <div className="mt-[clamp(2.5rem,5vh,4rem)]">
          <PrimaryCTA label="See my real Tikkun" onClick={() => navigate({ to: "/form" })} />
        </div>

        <p
          className="mt-[clamp(1rem,2.5vh,1.75rem)] font-mono"
          style={{ color: C_MUTED, fontSize: "clamp(12px, 1.3vw, 14px)" }}
        >
          Free Tikkun reading + 10-page Workbook
        </p>
      </section>
    </SkyShell>
  );
}
