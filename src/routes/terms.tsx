import { createFileRoute, Link } from "@tanstack/react-router";
import { SkyShell } from "@/components/landing/SkyShell";
import { HEAD, BODY, C_INK, C_INK_SOFT, C_GOLD, C_DAWN, C_RULE } from "@/lib/landing-style";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Kabbalah Astrology" },
      { name: "description", content: "Terms and conditions for using Kabbalah Astrology and receiving your free Tikkun reading." },
    ],
  }),
});

function Terms() {
  return (
    <SkyShell starDensity={80}>
      <section
        className="relative mx-auto max-w-2xl px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3rem,6vh,5rem)]"
        style={{ color: C_INK_SOFT, fontFamily: BODY, lineHeight: 1.7, fontSize: "15px" }}
      >
        <h1 style={{ fontFamily: HEAD, color: C_INK, fontSize: "clamp(28px,5vw,44px)", fontWeight: 500, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
          Terms &{" "}
          <span style={{ color: C_DAWN, fontStyle: "italic" }}>Conditions</span>
        </h1>

        <p>By using this site ("Kabbalah Circle" or "site"), you agree to the terms below. The site offers a free astrological reading, chart and/or other information ("service") for personal and reflective use only.</p>

        <h2 style={{ fontFamily: HEAD, color: C_GOLD, fontSize: "20px", marginTop: "2rem", marginBottom: "0.5rem" }}>Use of the service</h2>
        <p>Readings are interpretive and offered for inspiration and self-reflection. They are not medical, legal, financial, or psychological advice. You are responsible for the choices you make in your own life. </p>

        <h2 style={{ fontFamily: HEAD, color: C_GOLD, fontSize: "20px", marginTop: "2rem", marginBottom: "0.5rem" }}>Your information</h2>
        <p>You provide your date of birth and email so we can generate and deliver your reading and the free Tikkun Workbook. You may opt in to the Kabbalah Circle mailing list; opting in is never required and you can unsubscribe at any time.</p>

        <h2 style={{ fontFamily: HEAD, color: C_GOLD, fontSize: "20px", marginTop: "2rem", marginBottom: "0.5rem" }}>Intellectual property</h2>
        <p>All readings, text, imagery, and the workbook are the property of Kabbalah Astrology and are licensed to you for personal use. Please do not redistribute or resell.</p>

        <h2 style={{ fontFamily: HEAD, color: C_GOLD, fontSize: "20px", marginTop: "2rem", marginBottom: "0.5rem" }}>Changes</h2>
        <p>We may update these terms from time to time. Continued use of the service constitutes acceptance of the updated terms.</p>

        <p style={{ marginTop: "2rem" }}>
          See also our{" "}
          <Link to="/privacy" style={{ color: C_GOLD, textDecoration: "underline" }}>Privacy Policy</Link>.
        </p>

        <div style={{ marginTop: "2.5rem", borderTop: `1px solid ${C_RULE}`, paddingTop: "1.5rem" }}>
          <Link to="/" style={{ color: C_INK_SOFT, textDecoration: "underline", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ← Back to home
          </Link>
        </div>
      </section>
    </SkyShell>
  );
}
