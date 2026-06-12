import { createFileRoute, notFound, Link, useNavigate } from "@tanstack/react-router";
import { SkyShell } from "@/components/landing/SkyShell";
import { PrimaryCTA } from "@/components/landing/PrimaryCTA";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_DAWN, C_RULE,
} from "@/lib/landing-style";
import { SIGNS, type TikkunSign } from "@/data/tikkun-lookup";

const SITE_URL = "https://tikkun.kabbalahcircle.com";

function firstParagraphs(text: string, n: number): string {
  return text.split(/\n\n+/).slice(0, n).join("\n\n");
}

function leadSentence(sign: TikkunSign): string {
  // 40–60 word AEO answer block.
  return `In Kabbalistic Astrology, the Tikkun for ${sign.name} is the soul correction of moving from a ${sign.southNode} shadow — ${sign.shadowArchetype.replace(/\.$/, "")} — toward the ${sign.northNode} work of conscious, courageous action. It is the lifetime task carried by anyone born when the lunar nodes draw this axis.`;
}

function metaDescription(sign: TikkunSign): string {
  const base = `Tikkun for ${sign.name}: ${sign.shadowArchetype} Move from ${sign.southNode} shadow patterns to your ${sign.northNode} soul work. Free Kabbalistic reading.`;
  return base.length > 155 ? base.slice(0, 152) + "…" : base;
}

export const Route = createFileRoute("/tikkun/$sign")({
  loader: ({ params }) => {
    const id = (params.sign ?? "").toLowerCase();
    const sign = SIGNS.find((s) => s.id === id);
    if (!sign) throw notFound();
    return { sign };
  },
  head: ({ params, loaderData }) => {
    const sign = loaderData?.sign;
    if (!sign) return { meta: [{ title: "Tikkun" }] };
    const url = `${SITE_URL}/tikkun/${sign.id}`;
    const title = `Tikkun for ${sign.name} — Soul Correction in Kabbalistic Astrology`;
    const desc = metaDescription(sign);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description: desc,
            url,
            author: { "@type": "Organization", name: "Kabbalah Circle" },
            publisher: { "@type": "Organization", name: "Kabbalah Circle" },
            datePublished: "2026-06-12",
            dateModified: "2026-06-12",
            inLanguage: "en",
            mainEntityOfPage: url,
            about: `Kabbalistic Astrology, Tikkun for ${sign.name}`,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Tikkun", item: `${SITE_URL}/tikkun` },
              { "@type": "ListItem", position: 3, name: sign.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <SkyShell starDensity={200}>
      <div className="mx-auto max-w-xl px-6 py-24 text-center" style={{ fontFamily: BODY, color: C_INK }}>
        <h1 style={{ fontFamily: HEAD, fontSize: 36 }}>Sign not found</h1>
        <p className="mt-4" style={{ color: C_INK_SOFT }}>
          <Link to="/tikkun" style={{ color: C_DAWN, textDecoration: "underline" }}>Browse all 12 Tikkunim →</Link>
        </p>
      </div>
    </SkyShell>
  ),
  errorComponent: () => null,
  component: TikkunSignPage,
});

const sectionLabel: React.CSSProperties = {
  fontFamily: BODY,
  color: C_GOLD,
  fontSize: "11px",
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  fontWeight: 600,
  marginBottom: "10px",
};

const para: React.CSSProperties = {
  fontFamily: BODY,
  color: C_INK,
  fontSize: "16px",
  lineHeight: 1.75,
  marginBottom: "1em",
};

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\n+/).map((p, i) => (
        <p key={i} style={para}>{p}</p>
      ))}
    </>
  );
}

function TikkunSignPage() {
  const { sign } = Route.useLoaderData();
  const navigate = useNavigate();
  const idx = SIGNS.findIndex((s) => s.id === sign.id);
  const prev = SIGNS[(idx - 1 + SIGNS.length) % SIGNS.length];
  const next = SIGNS[(idx + 1) % SIGNS.length];
  const sibling = SIGNS[(idx + 6) % SIGNS.length]; // opposite

  const shadow = firstParagraphs(sign.shadowGilgul, 2);
  const work = firstParagraphs(sign.spiritualWorkTikkun, 2);

  return (
    <SkyShell starDensity={280}>
      <article className="mx-auto max-w-2xl px-[clamp(1rem,5vw,2.5rem)] pt-[clamp(1.5rem,4vh,2.5rem)] pb-[clamp(3rem,6vh,5rem)]">
        {/* Breadcrumb */}
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
          <Link to="/tikkun" style={{ color: C_INK_SOFT }}>Tikkun</Link>
          <span style={{ margin: "0 8px" }}>›</span>
          <span style={{ color: C_INK }}>{sign.name}</span>
        </nav>

        {/* Hebrew letter */}
        <div className="flex justify-center mb-4">
          <span
            style={{
              fontFamily: HEAD,
              color: C_DAWN,
              fontSize: "clamp(64px, 11vw, 96px)",
              lineHeight: 1,
              textShadow: `0 0 28px ${C_DAWN}55`,
            }}
            aria-hidden
          >
            {sign.tikkunLetterHebrew}
          </span>
        </div>

        {/* H1 */}
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
          Tikkun for{" "}
          <span style={{ color: C_GOLD, fontStyle: "italic" }}>{sign.name}</span>
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
          Soul Correction in Kabbalistic Astrology
        </p>

        {/* AEO lede */}
        <p
          style={{
            fontFamily: BODY,
            color: C_INK,
            fontSize: "18px",
            lineHeight: 1.7,
            marginBottom: "2rem",
            fontStyle: "italic",
          }}
        >
          {leadSentence(sign)}
        </p>

        {/* Quick facts */}
        <div
          style={{
            border: `1px solid ${C_RULE}`,
            background: "rgba(220,228,240,0.04)",
            padding: "1.25rem 1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <dl style={{ fontFamily: BODY, color: C_INK, fontSize: "14px", lineHeight: 1.8, margin: 0 }}>
            <Fact k="Hebrew name" v={sign.hebrewName} />
            <Fact k="Tikkun letter" v={`${sign.tikkunLetterHebrew} — see your full reading for transliteration`} />
            <Fact k="North Node (Tikkun)" v={sign.northNode} />
            <Fact k="South Node (Shadow)" v={sign.southNode} />
            {sign.dateRanges[0] && (
              <Fact
                k="Sample date range"
                v={`${sign.dateRanges[0].start} → ${sign.dateRanges[0].end} (one of ${sign.dateRanges.length} windows)`}
              />
            )}
          </dl>
        </div>

        {/* Shadow */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={sectionLabel}>The Shadow Pattern</h2>
          <p style={{ ...para, fontStyle: "italic", color: C_INK_SOFT }}>{sign.shadowArchetype}</p>
          <Paragraphs text={shadow} />
          <p style={{ ...para, color: C_MUTED, fontSize: "14px", fontStyle: "italic" }}>
            Your personal Tikkun reading reveals the specific shadow patterns active in your chart.
          </p>
        </section>

        {/* Work */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={sectionLabel}>The Spiritual Work</h2>
          <Paragraphs text={work} />
          <p style={{ ...para, color: C_MUTED, fontSize: "14px", fontStyle: "italic" }}>
            The full Tikkun teaching — including your Hebrew letter, transliteration, and personal kavanot — is revealed in your free reading.
          </p>
        </section>

        {/* Mantra */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={sectionLabel}>Daily Mantra (Kavanah)</h2>
          <blockquote
            style={{
              fontFamily: HEAD,
              color: C_DAWN,
              fontSize: "clamp(20px, 3vw, 26px)",
              lineHeight: 1.5,
              fontStyle: "italic",
              borderLeft: `2px solid ${C_GOLD}`,
              paddingLeft: "1.25rem",
              margin: 0,
            }}
          >
            “{sign.dailyMantra}”
          </blockquote>
        </section>

        {/* CTA */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <PrimaryCTA onClick={() => navigate({ to: "/" })} label="Get your personal Tikkun reading" />
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
            Free · No payment required
          </p>
        </div>

        {/* Related */}
        <section style={{ borderTop: `1px solid ${C_RULE}`, paddingTop: "1.75rem" }}>
          <h2 style={sectionLabel}>Related Tikkunim</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem" }}>
            {[prev, next, sibling].filter((s, i, arr) => arr.findIndex(x => x.id === s.id) === i && s.id !== sign.id).map((s) => (
              <li key={s.id}>
                <Link
                  to="/tikkun/$sign"
                  params={{ sign: s.id }}
                  style={{
                    fontFamily: BODY,
                    color: C_INK,
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    textDecorationColor: C_RULE,
                    fontSize: "15px",
                  }}
                >
                  Tikkun for {s.name} ({s.hebrewName})
                </Link>
              </li>
            ))}
            <li style={{ marginTop: "0.5rem" }}>
              <Link
                to="/tikkun"
                style={{
                  fontFamily: BODY,
                  color: C_GOLD,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  fontSize: "14px",
                  letterSpacing: "0.08em",
                }}
              >
                Explore all 12 Tikkunim →
              </Link>
            </li>
          </ul>
          <p
            style={{
              marginTop: "2rem",
              fontFamily: BODY,
              color: C_MUTED,
              fontSize: "11px",
              letterSpacing: "0.08em",
            }}
          >
            Last updated: June 2026
          </p>
        </section>
      </article>
    </SkyShell>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", gap: "1rem", padding: "4px 0" }}>
      <dt
        style={{
          fontFamily: BODY,
          color: C_MUTED,
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          minWidth: "150px",
          flexShrink: 0,
          paddingTop: "4px",
        }}
      >
        {k}
      </dt>
      <dd style={{ margin: 0, color: C_INK }}>{v}</dd>
    </div>
  );
}
