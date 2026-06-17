import { Link } from "@tanstack/react-router";
import { BODY, C_INK_SOFT, C_MUTED, C_RULE } from "@/lib/landing-style";

export function PageFooter() {
  const linkStyle: React.CSSProperties = {
    color: C_INK_SOFT,
    textDecoration: "underline",
  };
  return (
    <footer className="px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(6rem,12vh,9rem)] pb-[clamp(1.5rem,3vh,2.5rem)]">
      <div className="mx-auto max-w-6xl">
        <div
          style={{ borderTop: `1px solid ${C_RULE}` }}
          className="mb-[clamp(1.5rem,3vh,2.5rem)]"
        />
        <div className="flex flex-col items-center">
          <div
            className="flex flex-col items-center gap-3 md:flex-row md:gap-0"
            style={{
              fontFamily: BODY,
              fontSize: "12px",
              letterSpacing: "0.12em",
              fontWeight: 500,
            }}
          >
            <Link
              to="/form"
              className="py-2 md:py-0"
              style={{ ...linkStyle, color: "#f0c868" }}
            >
              My Tikkun Chart
            </Link>
            <span
              className="hidden md:inline"
              style={{ color: C_MUTED, margin: "0 8px" }}
            >
              ·
            </span>
            <Link to="/about" className="py-2 md:py-0" style={linkStyle}>
              About
            </Link>
            <span
              className="hidden md:inline"
              style={{ color: C_MUTED, margin: "0 8px" }}
            >
              ·
            </span>
            <Link to="/terms" className="py-2 md:py-0" style={linkStyle}>
              Terms &amp; Conditions
            </Link>
            <span
              className="hidden md:inline"
              style={{ color: C_MUTED, margin: "0 8px" }}
            >
              ·
            </span>
            <Link to="/privacy" className="py-2 md:py-0" style={linkStyle}>
              Privacy
            </Link>
            <span
              className="hidden md:inline"
              style={{ color: C_MUTED, margin: "0 8px" }}
            >
              ·
            </span>
            <Link
              to="/kabbalistic-astrology"
              className="py-2 md:py-0"
              style={linkStyle}
            >
              Kabbalah Astrology
            </Link>
            <span
              className="hidden md:inline"
              style={{ color: C_MUTED, margin: "0 8px" }}
            >
              ·
            </span>
            <Link
              to="/what-is-tikkun"
              className="py-2 md:py-0"
              style={linkStyle}
            >
              What is Tikkun
            </Link>
            <span
              className="hidden md:inline"
              style={{ color: C_MUTED, margin: "0 8px" }}
            >
              ·
            </span>
            <span style={{ color: C_INK_SOFT }}>Kabbalah Circle © 2026</span>
          </div>
          <p
            style={{
              marginTop: "clamp(0.75rem,1.5vh,1rem)",
              textAlign: "center",
              color: C_MUTED,
              fontFamily: BODY,
              fontSize: "10px",
              letterSpacing: "0.08em",
              lineHeight: 1.5,
              maxWidth: "32rem",
            }}
          >
            Kabbalah Circle is an independent unaffiliated project.
          </p>
        </div>
      </div>
    </footer>
  );
}
