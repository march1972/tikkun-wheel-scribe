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

        <ul
          className="mt-[clamp(1.5rem,3vh,2rem)] flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-mono"
          style={{ color: C_INK_SOFT, fontSize: "12px", letterSpacing: "0.08em" }}
        >
          <li>✓ Your soul's pattern</li>
          <li>✓ Free 10-page workbook</li>
          <li>✓ Emailed instantly</li>
        </ul>

        <div className="mt-[clamp(2rem,4vh,3rem)]">
          <PrimaryCTA label="See my real Tikkun" onClick={() => navigate({ to: "/form" })} />
        </div>

        <p
          className="mt-[clamp(0.75rem,2vh,1.25rem)] font-mono italic"
          style={{ color: C_MUTED, fontSize: "clamp(11px, 1.2vw, 13px)" }}
        >
          Takes under a minute. No payment, no spam.
        </p>
      </section>
    </SkyShell>
  );
}
