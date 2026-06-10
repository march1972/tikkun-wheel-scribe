import { createFileRoute, Link } from "@tanstack/react-router";
import { SkyShell } from "@/components/landing/SkyShell";
import { HEAD, BODY, C_INK, C_INK_SOFT, C_GOLD, C_DAWN, C_RULE } from "@/lib/landing-style";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Kabbalah Astrology" },
      { name: "description", content: "How Kabbalah Astrology collects, uses, and protects your personal information." },
    ],
  }),
});

function Privacy() {
  return (
    <SkyShell starDensity={80}>
      <section
        className="relative mx-auto max-w-2xl px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3rem,6vh,5rem)]"
        style={{ color: C_INK_SOFT, fontFamily: BODY, lineHeight: 1.7, fontSize: "15px" }}
      >
        <h1 style={{ fontFamily: HEAD, color: C_INK, fontSize: "clamp(28px,5vw,44px)", fontWeight: 500, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
          Privacy{" "}
          <span style={{ color: C_DAWN, fontStyle: "italic" }}>Policy</span>
        </h1>

        <p>Your privacy matters. This page explains what we collect, why we collect it, and the choices you have.</p>

        <h2 style={{ fontFamily: HEAD, color: C_GOLD, fontSize: "20px", marginTop: "2rem", marginBottom: "0.5rem" }}>What we collect</h2>
        <p>We collect your email address, optional name, location/s, and date of birth. Date of birth is used to calculate your Tikkun reading. Email is used to deliver the reading and the free Tikkun Workbook.</p>

        <h2 style={{ fontFamily: HEAD, color: C_GOLD, fontSize: "20px", marginTop: "2rem", marginBottom: "0.5rem" }}>How we use it</h2>
        <p>We never sell your data. We only contact you about your reading and workbook. If you opt in to the Kabbalah Circle mailing list, you'll also receive occasional reflections and teachings; you can unsubscribe with one click at any time.</p>

        <h2 style={{ fontFamily: HEAD, color: C_GOLD, fontSize: "20px", marginTop: "2rem", marginBottom: "0.5rem" }}>Storage and security</h2>
        <p>Your information is stored securely on managed cloud infrastructure with access restricted to the service operators.</p>

        <h2 style={{ fontFamily: HEAD, color: C_GOLD, fontSize: "20px", marginTop: "2rem", marginBottom: "0.5rem" }}>Your rights</h2>
        <p>You can ask us to delete your data at any time by replying to any email you receive from us.</p>

        <p style={{ marginTop: "2rem" }}>
          See also our{" "}
          <Link to="/terms" style={{ color: C_GOLD, textDecoration: "underline" }}>Terms &amp; Conditions</Link>.
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
