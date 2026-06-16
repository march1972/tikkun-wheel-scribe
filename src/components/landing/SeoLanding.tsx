import { Link, useNavigate } from "@tanstack/react-router";
import { SkyShell } from "@/components/landing/SkyShell";
import { PrimaryCTA } from "@/components/landing/PrimaryCTA";
import { track } from "@/lib/analytics";
import { getSpinSnippet } from "@/data/tikkun-lookup";
import {
  HEAD,
  BODY,
  C_INK,
  C_INK_BRIGHT,
  C_INK_SOFT,
  C_MUTED,
  C_GOLD,
  C_DAWN,
  C_RULE,
  C_BAND_MID,
  C_BAND_DEEP,
  C_BAND_LIFT,
} from "@/lib/landing-style";

export interface SeoLandingFAQ {
  q: string;
  a: string;
}

export interface SeoLandingProps {
  /** Route path (used in analytics + back link aria). */
  page: string;
  /** Small uppercase eyebrow above the H1. */
  eyebrow: string;
  /** Plain text H1 keyword + headline (e.g. "Jewish Astrology"). */
  keyword: string;
  /** Italic accent fragment after the keyword. */
  headlineAccent: string;
  /** Lead paragraph under the H1. */
  lead: string;
  /** Long-form sections rendered in order. */
  sections: { title: string; body: React.ReactNode }[];
  /** Short FAQ items (also emitted as JSON-LD on the route). */
  faq: SeoLandingFAQ[];
  /** ID label for the primary CTA in analytics. */
  ctaId: string;
}

const sectionInner =
  "mx-auto max-w-3xl px-[clamp(1.25rem,5vw,3rem)] py-[clamp(2.5rem,5vh,4rem)]";

const sectionTitle: React.CSSProperties = {
  fontFamily: HEAD,
  color: C_INK,
  fontSize: "clamp(24px,3.5vw,34px)",
  fontWeight: 500,
  letterSpacing: "-0.01em",
};

const bodyStyle: React.CSSProperties = {
  color: C_INK_SOFT,
  fontFamily: BODY,
  lineHeight: 1.7,
  fontSize: "15px",
};

export function SeoLanding(props: SeoLandingProps) {
  const navigate = useNavigate();

  const startTikkun = (where: string) => {
    track("cta_click", { ctaId: `${props.ctaId}_${where}`, page: props.page });
    const result = getSpinSnippet([]);
    if (result.exhausted || !result.sign) return;
    sessionStorage.setItem("tikkun_seen_signs", JSON.stringify(result.seen));
    sessionStorage.setItem("tikkun_target_sign", result.sign.id);
    sessionStorage.removeItem("tikkun_force_form");
    navigate({ to: "/spinning" });
  };

  return (
    <SkyShell starDensity={80}>
      {/* HERO */}
      <section style={{ background: C_BAND_MID }}>
        <div
          className="mx-auto max-w-3xl px-[clamp(1.25rem,5vw,3rem)]"
          style={{
            paddingTop: "clamp(3.5rem,7vh,5.5rem)",
            paddingBottom: "clamp(2.5rem,5vh,4rem)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: BODY,
              color: C_GOLD,
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            {props.eyebrow}
          </p>
          <h1
            style={{
              fontFamily: HEAD,
              color: C_INK_BRIGHT,
              fontSize: "clamp(30px,5.5vw,52px)",
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {props.keyword}{" "}
            <span style={{ color: C_DAWN, fontStyle: "italic" }}>
              {props.headlineAccent}
            </span>
          </h1>
          <p
            style={{
              ...bodyStyle,
              color: C_MUTED,
              marginTop: "1.25rem",
              maxWidth: "38rem",
              marginInline: "auto",
            }}
          >
            {props.lead}
          </p>
          <div
            className="flex flex-col items-center gap-3"
            style={{ marginTop: "2rem" }}
          >
            <PrimaryCTA
              onClick={() => startTikkun("hero")}
              label="Get your free reading"
            />
            <p
              style={{
                fontFamily: BODY,
                color: C_MUTED,
                fontSize: "10px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              FREE KABBALAH ASTROLOGY READING · No sign-up
            </p>
          </div>
        </div>
      </section>

      {/* BODY SECTIONS */}
      {props.sections.map((s, i) => (
        <section
          key={s.title}
          style={{
            background:
              i % 2 === 0 ? C_BAND_DEEP : C_BAND_LIFT,
          }}
        >
          <div className={sectionInner} style={bodyStyle}>
            <h2 style={sectionTitle}>{s.title}</h2>
            <div style={{ marginTop: "1.25rem" }}>{s.body}</div>
          </div>
        </section>
      ))}

      {/* MID CTA */}
      <section style={{ background: C_BAND_MID }}>
        <div
          className={sectionInner}
          style={{ ...bodyStyle, textAlign: "center" }}
        >
          <h2 style={sectionTitle}>Ready to see your chart?</h2>
          <p
            style={{
              ...bodyStyle,
              color: C_MUTED,
              marginTop: "0.75rem",
              maxWidth: "32rem",
              marginInline: "auto",
            }}
          >
            One date of birth is all it takes. Your Tikkun reading is free and
            written to be read in a few minutes.
          </p>
          <div style={{ marginTop: "1.75rem" }}>
            <PrimaryCTA
              onClick={() => startTikkun("mid")}
              label="Start my free reading"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: C_BAND_DEEP }}>
        <div className={sectionInner} style={bodyStyle}>
          <h2 style={sectionTitle}>Frequently asked</h2>
          <dl style={{ marginTop: "1.5rem" }}>
            {props.faq.map((f) => (
              <div
                key={f.q}
                style={{
                  borderTop: `1px solid ${C_RULE}`,
                  padding: "1.25rem 0",
                }}
              >
                <dt
                  style={{
                    fontFamily: HEAD,
                    color: C_INK,
                    fontSize: "17px",
                    fontWeight: 500,
                  }}
                >
                  {f.q}
                </dt>
                <dd
                  style={{
                    ...bodyStyle,
                    color: C_INK_SOFT,
                    margin: "0.5rem 0 0",
                  }}
                >
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FINAL CTA + LINKS */}
      <section style={{ background: C_BAND_LIFT }}>
        <div
          className={sectionInner}
          style={{ ...bodyStyle, textAlign: "center" }}
        >
          <PrimaryCTA
            onClick={() => startTikkun("final")}
            label="Reveal my Tikkun"
            variant="dawn"
          />
          <p
            style={{
              fontFamily: BODY,
              color: C_MUTED,
              fontSize: "12px",
              letterSpacing: "0.08em",
              marginTop: "1.5rem",
            }}
          >
            Curious about the tradition?{" "}
            <Link
              to="/kabbalistic-astrology"
              style={{ color: C_INK_SOFT, textDecoration: "underline" }}
            >
              Read the full history & glossary
            </Link>
            .
          </p>
        </div>
      </section>
    </SkyShell>
  );
}
