import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SkyShell } from "@/components/landing/SkyShell";
import { PrimaryCTA } from "@/components/landing/PrimaryCTA";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_DAWN, C_RULE,
} from "@/lib/landing-style";
import { SIGNS } from "@/data/tikkun-lookup";

const SITE_URL = "https://tikkun.kabbalahcircle.com";
const URL = `${SITE_URL}/tikkun`;
const TITLE = "The 12 Tikkunim — Kabbalistic Soul Corrections by Zodiac Sign";
const DESC =
  "The 12 Tikkunim of Kabbalistic Astrology: the soul correction (Tikkun) for each zodiac sign, drawn from the lunar nodes and the Hebrew letters of the Sefer Yetzirah.";

export const Route = createFileRoute("/tikkun")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: TITLE,
          description: DESC,
          url: URL,
          inLanguage: "en",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: SIGNS.length,
            itemListElement: SIGNS.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `Tikkun for ${s.name}`,
              url: `${SITE_URL}/tikkun/${s.id}`,
            })),
          },
        }),
      },
    ],
  }),
  component: TikkunIndex,
});

function TikkunIndex() {
  const navigate = useNavigate();
  return (
    <SkyShell starDensity={300}>
      <main className="mx-auto max-w-4xl px-[clamp(1rem,5vw,2.5rem)] pt-[clamp(1.5rem,4vh,2.5rem)] pb-[clamp(3rem,6vh,5rem)]">
        <nav
          aria-label="Breadcrumb"
          style={{
            fontFamily: BODY,
            color: C_MUTED,
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
          }}
        >
          <Link to="/" style={{ color: C_INK_SOFT }}>Home</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: C_INK }}>Tikkun</span>
        </nav>

        <h1
          style={{
            fontFamily: HEAD,
            color: C_INK,
            fontSize: "clamp(34px, 5.5vw, 56px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            textAlign: "center",
            marginBottom: "1.25rem",
          }}
        >
          The <span style={{ color: C_GOLD, fontStyle: "italic" }}>12 Tikkunim</span>
        </h1>
        <p
          style={{
            fontFamily: BODY,
            color: C_INK_SOFT,
            fontSize: "12px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Kabbalistic Soul Corrections by Zodiac Sign
        </p>

        <p
          style={{
            fontFamily: BODY,
            color: C_INK,
            fontSize: "17px",
            lineHeight: 1.7,
            maxWidth: "640px",
            margin: "0 auto 3rem",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          In Kabbalistic Astrology, a <em>Tikkun</em> is the soul-level correction a person is here to perform in this lifetime: the work of moving from a reactive shadow pattern (carried over from past lives through the South lunar node) toward the conscious work pointed to by the North lunar node. There are twelve, one for each zodiac sign.
        </p>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          {SIGNS.map((s) => (
            <li key={s.id}>
              <Link
                to="/tikkun/$sign"
                params={{ sign: s.id }}
                className="block transition-all duration-300 hover:scale-[1.02] hover:border-white/30"
                style={{
                  border: `1px solid ${C_RULE}`,
                  background: "rgba(220,228,240,0.04)",
                  padding: "1.25rem 1.25rem 1.5rem",
                  textDecoration: "none",
                  height: "100%",
                }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span
                    style={{
                      fontFamily: HEAD,
                      color: C_DAWN,
                      fontSize: "32px",
                      lineHeight: 1,
                    }}
                    aria-hidden
                  >
                    {s.tikkunLetterHebrew}
                  </span>
                  <span
                    style={{
                      fontFamily: BODY,
                      color: C_MUTED,
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.hebrewName}
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: HEAD,
                    color: C_INK,
                    fontSize: "22px",
                    lineHeight: 1.2,
                    marginBottom: "0.5rem",
                  }}
                >
                  Tikkun for {s.name}
                </h2>
                <p
                  style={{
                    fontFamily: BODY,
                    color: C_INK_SOFT,
                    fontSize: "13px",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {s.spinSnippet}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <PrimaryCTA onClick={() => navigate({ to: "/form" })} label="Get your personal Tikkun reading" />
          <p
            style={{
              marginTop: "0.85rem",
              fontFamily: BODY,
              color: "rgba(240,200,104,0.78)",
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Free · Based on your date of birth
          </p>
        </div>
      </main>
    </SkyShell>
  );
}
