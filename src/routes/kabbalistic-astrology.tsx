import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SkyShell } from "@/components/landing/SkyShell";
import {
  HEAD,
  BODY,
  C_INK,
  C_INK_SOFT,
  C_MUTED,
  C_GOLD,
  C_DAWN,
  C_RULE,
  C_RULE_SOFT,
  C_BAND_MID,
  C_BAND_DEEP,
  C_BAND_LIFT,
} from "@/lib/landing-style";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  TIMELINE,
  ERAS,
  SEVEN_DOUBLES,
  TWELVE_ELEMENTALS,
  STREAMS,
  MATRIX,
  GLOSSARY,
  GCATS,
  FAQ,
  type Era,
  type GlossaryCat,
} from "@/data/kabbalistic-astrology";

const PAGE_URL = "https://tikkun.kabbalahcircle.com/kabbalistic-astrology";
const PAGE_TITLE =
  "Kabbalistic Astrology: History, Glossary & Timeline (Chokhmat HaMazalot)";
const PAGE_DESC =
  "A guide to Kabbalistic Astrology (Jewish or Hebrew Astrology): the Hebrew zodiac, the mazalot, Sefer Yetzirah, the Sefirot, and how Jewish thinkers from Abraham and ibn Ezra to Aryeh Kaplan understood cosmic influence. Includes an interactive timeline and a searchable glossary.";

export const Route = createFileRoute("/kabbalistic-astrology")({
  component: KabbalisticAstrologyPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: PAGE_URL },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: PAGE_TITLE,
          description: PAGE_DESC,
          url: PAGE_URL,
          mainEntityOfPage: PAGE_URL,
          author: { "@type": "Organization", name: "Kabbalah Circle" },
          publisher: {
            "@type": "Organization",
            name: "Kabbalah Circle",
            url: "https://tikkun.kabbalahcircle.com",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

// ── shared style helpers ────────────────────────────────────────────
const sectionInner =
  "mx-auto max-w-3xl px-[clamp(1.25rem,5vw,3rem)] py-[clamp(2.5rem,5vh,4rem)]";

const sectionTitle: React.CSSProperties = {
  fontFamily: HEAD,
  color: C_INK,
  fontSize: "clamp(24px,3.5vw,34px)",
  fontWeight: 500,
  letterSpacing: "-0.01em",
};

const sectionLead: React.CSSProperties = {
  fontFamily: BODY,
  color: C_MUTED,
  marginTop: "0.5rem",
  fontSize: "15px",
  lineHeight: 1.7,
};

const bodyStyle: React.CSSProperties = {
  color: C_INK_SOFT,
  fontFamily: BODY,
  lineHeight: 1.7,
  fontSize: "15px",
};

const cardStyle: React.CSSProperties = {
  border: `1px solid ${C_RULE}`,
  background: "rgba(15, 23, 41, 0.35)",
  borderRadius: 8,
};

const tableCell: React.CSSProperties = {
  padding: "10px 14px",
  fontFamily: BODY,
  color: C_INK_SOFT,
  fontSize: "14px",
  verticalAlign: "top",
  borderTop: `1px solid ${C_RULE_SOFT}`,
};

const tableHeadCell: React.CSSProperties = {
  padding: "10px 14px",
  fontFamily: BODY,
  color: C_GOLD,
  fontSize: "11px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  textAlign: "left",
  fontWeight: 600,
};

// ── page ────────────────────────────────────────────────────────────
function KabbalisticAstrologyPage() {
  return (
    <SkyShell starDensity={80}>
      <Hero />
      <Intro />
      <Timeline />
      <Letters />
      <Streams />
      <Matrix />
      <Glossary />
      <Faq />
      <Closing />
    </SkyShell>
  );
}

// ── hero ────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ background: C_BAND_MID }}>
      <div
        className="mx-auto max-w-3xl px-[clamp(1.25rem,5vw,3rem)]"
        style={{ paddingTop: "clamp(3.5rem,7vh,5.5rem)", paddingBottom: "clamp(2rem,4vh,3rem)", textAlign: "center" }}
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
          Chokhmat HaMazalot
        </p>
        <h1
          style={{
            fontFamily: HEAD,
            color: C_INK,
            fontSize: "clamp(30px,5.5vw,52px)",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          A History of{" "}
          <span style={{ color: C_DAWN, fontStyle: "italic" }}>
            Kabbalistic Astrology
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
          A guide to Kabbalistic Astrology, sometimes called Jewish Astrology or
          Hebrew Astrology. Explore the interactive timeline and searchable
          glossary below.
        </p>
        <nav
          className="flex flex-wrap items-center justify-center gap-2"
          style={{ marginTop: "1.75rem" }}
          aria-label="On this page"
        >
          {[
            ["Timeline", "#timeline"],
            ["Letters & Mappings", "#letters"],
            ["Modern Paths", "#streams"],
            ["Glossary", "#glossary"],
            ["Tikkun", "#tikkun"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: BODY,
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: C_INK_SOFT,
                border: `1px solid ${C_RULE}`,
                borderRadius: 999,
                padding: "8px 14px",
                textDecoration: "none",
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

// ── intro ───────────────────────────────────────────────────────────
function Intro() {
  return (
    <section style={{ background: C_BAND_DEEP }}>
      <div className={sectionInner} style={bodyStyle}>
        <h2 style={sectionTitle}>What is Kabbalistic Astrology?</h2>
        <p style={{ marginTop: "1.25rem" }}>
          This page follows Kabbalistic Astrology across roughly four millennia
          of texts and teachers, and gathers its core vocabulary into a glossary
          you can search. Many Kabbalistic astrologers hold that cosmic
          influence is not physical radiation or fixed fate, but the structured
          flow of divine energy (<em>Shefa</em>) moving through spiritual
          gateways that are mapped to the letters of the Hebrew alphabet.
        </p>
        <p style={{ marginTop: "1rem" }}>
          The sections below trace how that idea took shape and changed over
          time, from the letter mysticism of <em>Sefer Yetzirah</em> and the
          cosmology of the <em>Zohar</em> to the inner, psychological readings
          of the Hasidic masters and the systems taught today. They are
          presented so you can see what each tradition actually says, side by
          side, rather than as a single fixed doctrine.
        </p>
      </div>
    </section>
  );
}

// ── timeline ────────────────────────────────────────────────────────
function Timeline() {
  const [era, setEra] = useState<(typeof ERAS)[number]>("All");
  const [open, setOpen] = useState<Set<string>>(new Set());

  const filtered = useMemo(
    () => (era === "All" ? TIMELINE : TIMELINE.filter((t) => t.era === era)),
    [era],
  );

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section id="timeline" style={{ background: C_BAND_LIFT }}>
      <div className={sectionInner} style={bodyStyle}>
        <h2 style={sectionTitle}>Interactive Timeline</h2>
        <p style={sectionLead}>
          Filter by era, then tap any entry to open its teaching, its key
          source, and a representative passage.
        </p>

        <div
          className="flex flex-wrap gap-2"
          style={{ marginTop: "1.25rem" }}
          role="group"
          aria-label="Filter timeline by era"
        >
          {ERAS.map((e) => {
            const active = e === era;
            return (
              <button
                key={e}
                type="button"
                onClick={() => setEra(e)}
                aria-pressed={active}
                style={{
                  fontFamily: BODY,
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  padding: "6px 14px",
                  borderRadius: 999,
                  cursor: "pointer",
                  border: `1px solid ${active ? C_GOLD : C_RULE}`,
                  background: active ? C_GOLD : "transparent",
                  color: active ? "#1a1f33" : C_INK_SOFT,
                  fontWeight: active ? 700 : 500,
                  transition: "all 150ms ease",
                }}
              >
                {e}
              </button>
            );
          })}
        </div>

        <ol
          style={{
            listStyle: "none",
            marginTop: "2rem",
            paddingLeft: "1.5rem",
            borderLeft: `1px solid ${C_RULE}`,
          }}
        >
          {filtered.map((t) => {
            const isOpen = open.has(t.id);
            return (
              <li
                key={t.id}
                style={{ position: "relative", marginBottom: "1.25rem" }}
              >
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: "-1.95rem",
                    top: "1.25rem",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    border: `2px solid ${C_GOLD}`,
                    background: "#0c1426",
                  }}
                />
                <button
                  type="button"
                  onClick={() => toggle(t.id)}
                  aria-expanded={isOpen}
                  aria-controls={`tl-body-${t.id}`}
                  style={{
                    ...cardStyle,
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "16px 18px",
                    cursor: "pointer",
                    color: "inherit",
                    fontFamily: BODY,
                  }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3
                      style={{
                        fontFamily: HEAD,
                        color: C_INK,
                        fontSize: "17px",
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      {t.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: BODY,
                        fontSize: "10px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: C_GOLD,
                      }}
                    >
                      {t.era}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: C_MUTED,
                      marginTop: 4,
                    }}
                  >
                    {t.date}
                  </p>
                  {!isOpen && (
                    <p
                      style={{
                        fontSize: "12px",
                        color: C_GOLD,
                        marginTop: 8,
                        letterSpacing: "0.06em",
                      }}
                    >
                      Read more →
                    </p>
                  )}
                  {isOpen && (
                    <div id={`tl-body-${t.id}`} style={{ marginTop: "0.9rem" }}>
                      <p
                        style={{
                          fontFamily: BODY,
                          fontSize: "10px",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: C_MUTED,
                        }}
                      >
                        Source:{" "}
                        <b style={{ color: C_INK_SOFT, fontWeight: 600 }}>
                          {t.source}
                        </b>
                      </p>
                      <p style={{ marginTop: "0.75rem", color: C_INK_SOFT }}>
                        {t.body}
                      </p>
                      {t.quote && (
                        <blockquote
                          style={{
                            borderLeft: `2px solid ${C_GOLD}`,
                            paddingLeft: "1rem",
                            margin: "1rem 0",
                            fontStyle: "italic",
                            color: C_INK_SOFT,
                          }}
                        >
                          {t.quote}
                          {t.quoteCite && (
                            <cite
                              style={{
                                display: "block",
                                marginTop: 6,
                                fontStyle: "normal",
                                fontSize: "12px",
                                color: C_MUTED,
                              }}
                            >
                              {t.quoteCite}
                            </cite>
                          )}
                        </blockquote>
                      )}
                      {t.teaching && (
                        <p
                          style={{
                            background: "rgba(240, 200, 104, 0.08)",
                            border: `1px solid ${C_RULE_SOFT}`,
                            borderRadius: 6,
                            padding: "10px 12px",
                            marginTop: "0.75rem",
                            fontSize: "14px",
                            color: C_INK_SOFT,
                          }}
                        >
                          {t.teaching}
                        </p>
                      )}
                      {t.note && (
                        <p
                          style={{
                            marginTop: "0.75rem",
                            fontSize: "13px",
                            color: C_MUTED,
                          }}
                        >
                          <b style={{ color: C_INK_SOFT, fontWeight: 600 }}>
                            Note.
                          </b>{" "}
                          {t.note}
                        </p>
                      )}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

// ── letters ─────────────────────────────────────────────────────────
function Letters() {
  return (
    <section id="letters" style={{ background: C_BAND_DEEP }}>
      <div className={sectionInner} style={bodyStyle}>
        <h2 style={sectionTitle}>The Hebrew Letters and the Heavens</h2>
        <p style={{ ...sectionLead, maxWidth: "44rem" }}>
          Sefer Yetzirah maps the twenty-two Hebrew letters onto creation. The{" "}
          <strong style={{ color: C_INK }}>seven double letters</strong> answer
          to the classical planets and to the seven openings of the head. The{" "}
          <strong style={{ color: C_INK }}>twelve elemental letters</strong>{" "}
          answer to the zodiac signs, the Hebrew months, and the faculties and
          organs of the body.
        </p>

        <Tabs defaultValue="doubles" className="mt-6">
          <TabsList
            className="bg-transparent gap-2 h-auto p-0"
            style={{ border: "none" }}
          >
            <TabsTrigger
              value="doubles"
              className="data-[state=active]:bg-[color:var(--c-gold)] data-[state=active]:text-[#1a1f33] data-[state=active]:shadow-none rounded-md px-4 py-2 text-sm border border-white/15 text-[color:var(--c-ink-soft)]"
              style={
                {
                  ["--c-gold" as never]: C_GOLD,
                  ["--c-ink-soft" as never]: C_INK_SOFT,
                } as React.CSSProperties
              }
            >
              Seven Doubles · Planets
            </TabsTrigger>
            <TabsTrigger
              value="elementals"
              className="data-[state=active]:bg-[color:var(--c-gold)] data-[state=active]:text-[#1a1f33] data-[state=active]:shadow-none rounded-md px-4 py-2 text-sm border border-white/15 text-[color:var(--c-ink-soft)]"
              style={
                {
                  ["--c-gold" as never]: C_GOLD,
                  ["--c-ink-soft" as never]: C_INK_SOFT,
                } as React.CSSProperties
              }
            >
              Twelve Elementals · Zodiac
            </TabsTrigger>
          </TabsList>

          <TabsContent value="doubles" className="mt-5">
            <div
              style={{ ...cardStyle, overflowX: "auto" }}
              className="w-full"
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={tableHeadCell}>Letter</th>
                    <th style={tableHeadCell}>Planet</th>
                    <th style={tableHeadCell}>Gate of the Head</th>
                  </tr>
                </thead>
                <tbody>
                  {SEVEN_DOUBLES.map(([l, p, g]) => (
                    <tr key={l}>
                      <td style={{ ...tableCell, color: C_INK, fontWeight: 600 }}>
                        {l}
                      </td>
                      <td style={tableCell}>{p}</td>
                      <td style={tableCell}>{g}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="elementals" className="mt-5">
            <div style={{ ...cardStyle, overflowX: "auto" }} className="w-full">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={tableHeadCell}>Letter</th>
                    <th style={tableHeadCell}>Sign</th>
                    <th style={tableHeadCell}>Hebrew Month</th>
                    <th style={tableHeadCell}>Faculty</th>
                    <th style={tableHeadCell}>Organ</th>
                  </tr>
                </thead>
                <tbody>
                  {TWELVE_ELEMENTALS.map(([l, s, m, f, o]) => (
                    <tr key={l}>
                      <td style={{ ...tableCell, color: C_INK, fontWeight: 600 }}>
                        {l}
                      </td>
                      <td style={tableCell}>{s}</td>
                      <td style={tableCell}>{m}</td>
                      <td style={tableCell}>{f}</td>
                      <td style={tableCell}>{o}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        <p
          style={{
            marginTop: "0.9rem",
            fontSize: "12px",
            color: C_MUTED,
            fontStyle: "italic",
          }}
        >
          These correspondences follow the Gra-Ari recension of Sefer Yetzirah
          (4:8 to 4:14 and 5:1 to 5:10). The Short, Long, and Saadia recensions
          assign some letters to different planets, gates, and organs, so this
          table is best read as one well attested arrangement rather than a
          single fixed system.
        </p>
      </div>
    </section>
  );
}

// ── modern streams ──────────────────────────────────────────────────
function Streams() {
  return (
    <section id="streams" style={{ background: C_BAND_MID }}>
      <div className={sectionInner} style={bodyStyle}>
        <h2 style={sectionTitle}>Modern Paths of Kabbalah</h2>
        <p style={{ ...sectionLead, maxWidth: "44rem" }}>
          Kabbalah today is carried by several distinct paths. They share a
          great deal, yet each reads cosmic influence in its own way, some as
          literal spiritual law, some as inner psychology, some as cultural
          history. The notes below describe the main living streams and how
          each tends to understand the stars.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 mt-6">
          {STREAMS.map((s) => (
            <article
              key={s.name}
              style={{ ...cardStyle, padding: "18px 20px" }}
            >
              <h3
                style={{
                  fontFamily: HEAD,
                  color: C_INK,
                  fontSize: "17px",
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {s.name}
              </h3>
              <p
                style={{
                  fontFamily: BODY,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: C_GOLD,
                  marginTop: 4,
                }}
              >
                {s.character}
              </p>
              <p style={{ marginTop: "0.8rem", fontSize: "14px", color: C_INK_SOFT }}>
                {s.text}
              </p>
              <p
                style={{
                  marginTop: "0.8rem",
                  borderTop: `1px solid ${C_RULE_SOFT}`,
                  paddingTop: "0.75rem",
                  fontSize: "14px",
                  color: C_MUTED,
                }}
              >
                <b style={{ color: C_INK_SOFT, fontWeight: 600 }}>
                  View of the stars.
                </b>{" "}
                {s.view}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── matrix ──────────────────────────────────────────────────────────
function Matrix() {
  return (
    <section style={{ background: C_BAND_LIFT }}>
      <div className={sectionInner} style={bodyStyle}>
        <h2 style={sectionTitle}>How Each Era Reads Cosmic Influence</h2>
        <p style={sectionLead}>
          A quick comparison of where the power is said to sit, and how a person
          is meant to work with it.
        </p>
        <div
          style={{ ...cardStyle, overflowX: "auto", marginTop: "1.25rem" }}
          className="w-full"
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={tableHeadCell}>Era / Path</th>
                <th style={tableHeadCell}>Source</th>
                <th style={tableHeadCell}>Where Influence Sits</th>
                <th style={tableHeadCell}>How It Is Navigated</th>
              </tr>
            </thead>
            <tbody>
              {MATRIX.map(([era, src, where, how]) => (
                <tr key={era}>
                  <td style={{ ...tableCell, color: C_INK, fontWeight: 600 }}>
                    {era}
                  </td>
                  <td style={tableCell}>{src}</td>
                  <td style={tableCell}>{where}</td>
                  <td style={tableCell}>{how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ── glossary ────────────────────────────────────────────────────────
function Glossary() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof GCATS)[number]>("All");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return GLOSSARY.filter((g) => {
      if (cat !== "All" && g.cat !== cat) return false;
      if (!needle) return true;
      return (
        g.term.toLowerCase().includes(needle) ||
        g.def.toLowerCase().includes(needle)
      );
    });
  }, [q, cat]);

  return (
    <section id="glossary" style={{ background: C_BAND_DEEP }}>
      <div className={sectionInner} style={bodyStyle}>
        <h2 style={sectionTitle}>Searchable Glossary</h2>
        <p style={sectionLead}>Search a term or filter by category.</p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label htmlFor="glossary-search" className="sr-only">
            Search glossary
          </label>
          <Input
            id="glossary-search"
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search terms, for example mazal, tikkun, or Sefirot"
            className="sm:max-w-sm"
            style={{
              background: "rgba(15, 23, 41, 0.5)",
              border: `1px solid ${C_RULE}`,
              color: C_INK,
              fontFamily: BODY,
            }}
          />
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter glossary by category"
          >
            {GCATS.map((c) => {
              const active = c === cat;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  aria-pressed={active}
                  style={{
                    fontFamily: BODY,
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    padding: "5px 12px",
                    borderRadius: 999,
                    cursor: "pointer",
                    border: `1px solid ${active ? C_GOLD : C_RULE}`,
                    background: active ? C_GOLD : "transparent",
                    color: active ? "#1a1f33" : C_INK_SOFT,
                    fontWeight: active ? 700 : 500,
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 mt-6">
          {filtered.map((g) => (
            <article key={g.term} style={{ ...cardStyle, padding: "16px 18px" }}>
              <div className="flex items-baseline justify-between gap-2">
                <h3
                  style={{
                    fontFamily: HEAD,
                    color: C_INK,
                    fontSize: "16px",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {g.term}
                </h3>
                <span
                  style={{
                    fontFamily: BODY,
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: C_GOLD,
                    background: "rgba(240,200,104,0.1)",
                    borderRadius: 4,
                    padding: "2px 8px",
                  }}
                >
                  {g.cat as GlossaryCat}
                </span>
              </div>
              <p style={{ marginTop: 10, fontSize: "14px", color: C_INK_SOFT }}>
                {g.def}
              </p>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p style={{ marginTop: "1rem", color: C_MUTED, fontSize: "14px" }}>
            No terms match that search.
          </p>
        )}
      </div>
    </section>
  );
}

// ── FAQ ─────────────────────────────────────────────────────────────
function Faq() {
  return (
    <section style={{ background: C_BAND_MID }}>
      <div className={sectionInner} style={bodyStyle}>
        <h2 style={sectionTitle}>Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mt-5">
          {FAQ.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              style={{
                border: `1px solid ${C_RULE}`,
                borderRadius: 8,
                marginBottom: 10,
                background: "rgba(15, 23, 41, 0.35)",
                padding: "0 16px",
              }}
              className="border-b"
            >
              <AccordionTrigger
                style={{
                  fontFamily: BODY,
                  color: C_INK,
                  fontSize: "15px",
                  fontWeight: 600,
                  textAlign: "left",
                }}
              >
                {f.q}
              </AccordionTrigger>
              <AccordionContent
                style={{
                  fontFamily: BODY,
                  color: C_INK_SOFT,
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// ── closing ─────────────────────────────────────────────────────────
function Closing() {
  return (
    <section style={{ background: C_BAND_DEEP }}>
      <div className={sectionInner} style={bodyStyle}>
        <p
          style={{
            fontSize: "13px",
            color: C_MUTED,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Kabbalistic Astrology, also known as Chokhmat HaMazalot. An
          educational overview presented for study. Primary sources include
          Sefer Yetzirah, the Zohar, and the writings of the teachers named
          above.
        </p>
        <div
          style={{
            marginTop: "clamp(2rem,4vh,3rem)",
            borderTop: `1px solid ${C_RULE}`,
            paddingTop: "1.5rem",
            textAlign: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: C_INK_SOFT,
              textDecoration: "underline",
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: BODY,
            }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
