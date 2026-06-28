import { createFileRoute, Link } from "@tanstack/react-router";
import { SeoLanding, type SeoLandingFAQ } from "@/components/landing/SeoLanding";
import { BODY, C_GOLD, C_INK_SOFT, C_MUTED, C_RULE } from "@/lib/landing-style";

const URL = "https://tikkun.kabbalahcircle.com/kabbalah-astrology";
const TITLE = "Kabbalah Astrology — Your Free Tikkun Reading from the Hebrew Zodiac";
const DESC =
  "Kabbalah astrology — also called Kabbalistic, Hebrew, or Jewish astrology — reads the twelve mazalot to reveal your soul's Tikkun. Get your free reading from your date of birth.";

const FAQ: SeoLandingFAQ[] = [
  {
    q: "What is Kabbalah astrology?",
    a: "Kabbalah astrology is the mystical Jewish reading of the twelve mazalot (Hebrew zodiac signs). Rooted in Sefer Yetzirah, the Zohar, and the writings of the Arizal, it treats the stars as gateways for divine influence (Shefa) — not as fixed fate — and asks what your soul came to repair (Tikkun).",
  },
  {
    q: "Is Kabbalistic astrology the same as Hebrew or Jewish astrology?",
    a: "Yes. Kabbalistic astrology, Hebrew astrology, Kabbalah astrology, and Jewish astrology all name the same tradition. Each term emphasizes a different angle — the Kabbalistic source texts, the Hebrew calendar and letters, or the broader Jewish lineage — but the underlying reading of the mazalot is identical.",
  },
  {
    q: "What does Judaism actually say about astrology?",
    a: "Classical Judaism takes astrology seriously without treating it as fate. Abraham, the Talmud, ibn Ezra, the Ramban, the Arizal, and the Vilna Gaon all discussed the mazalot. The consistent teaching is ein mazal le-Yisrael — the stars describe tendencies, but free will and Tikkun rewrite the story.",
  },
  {
    q: "What are the 12 mazalot of the Hebrew zodiac?",
    a: "Taleh (Aries / Nissan), Shor (Taurus / Iyar), Te'omim (Gemini / Sivan), Sartan (Cancer / Tammuz), Aryeh (Leo / Av), Betulah (Virgo / Elul), Moznayim (Libra / Tishrei), Akrav (Scorpio / Cheshvan), Keshet (Sagittarius / Kislev), Gedi (Capricorn / Tevet), D'li (Aquarius / Shevat), and Dagim (Pisces / Adar).",
  },
  {
    q: "What's in the free reading?",
    a: "Your mazal (Hebrew zodiac sign) with its month, tribe, and letter; your Soul's Shadow (the recurring patterns Kabbalah associates with your sign); your Tikkun (the correction your soul came to work on); and a daily Kavanah (intention) you can carry today. Just enter your date of birth.",
  },
  {
    q: "Do I need to be Jewish to get a Kabbalah astrology reading?",
    a: "No. The framework is open to anyone drawn to Kabbalah and the soul's path. The reading is built from your civil date of birth and converted internally to the Hebrew calendar.",
  },
];

export const Route = createFileRoute("/kabbalah-astrology")({
  component: KabbalahAstrologyLanding,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "kabbalah astrology, kabbalistic astrology, hebrew astrology, judaism and astrology, jewish astrology, mazalot, hebrew zodiac, tikkun, sefer yetzirah",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESC,
          about:
            "Kabbalah astrology, also called Kabbalistic, Hebrew, or Jewish astrology",
          url: URL,
          mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "Kabbalah Circle" },
          publisher: {
            "@type": "Organization",
            name: "Kabbalah Circle",
            url: "https://tikkun.kabbalahcircle.com",
          },
        }),
      },
    ],
  }),
});

function KabbalahAstrologyLanding() {
  return (
    <SeoLanding
      page="/kabbalah-astrology"
      eyebrow="Chokhmat HaMazalot · The Wisdom of the Constellations"
      keyword="Kabbalah Astrology"
      headlineAccent="reads your soul, not your fate."
      lead="Kabbalah astrology — also called Kabbalistic, Hebrew, or Jewish astrology — is the mystical reading of the twelve mazalot taught in Sefer Yetzirah, the Zohar, and the Arizal. It asks one question Western astrology doesn't: what did your soul come here to repair? Generate your free Tikkun reading from your date of birth."
      ctaId="kabbalah_astrology_hub"
      sections={[
        {
          title: "One tradition, four names",
          body: (
            <>
              <p>
                <strong>Kabbalistic astrology</strong>,{" "}
                <strong>Hebrew astrology</strong>,{" "}
                <strong>Kabbalah astrology</strong>, and{" "}
                <strong>Jewish astrology</strong> all describe the same body of
                teaching. Each name emphasizes a different doorway in — the
                Kabbalistic source texts, the Hebrew calendar and letters, or
                the broader Jewish lineage — but the underlying reading of the
                twelve mazalot is one and the same.
              </p>
              <p style={{ marginTop: "1rem" }}>
                The shared idea: the stars are not a verdict. They are gateways
                through which divine influence (<em>Shefa</em>) flows into the
                world, mapped to the letters of the Hebrew alphabet. Your sign
                is the gate your soul came through — and the field where its{" "}
                <em>Tikkun</em> is to be worked out.
              </p>
            </>
          ),
        },
        {
          title: "Judaism and astrology — what the sages actually said",
          body: (
            <>
              <p>
                The relationship between Judaism and astrology is older and
                deeper than most assume. The Talmud (<em>Shabbat 156a</em>)
                debates whether <em>mazal</em> governs Israel. Abraham is
                described as a master of the stars. Ibn Ezra wrote treatises on
                the mazalot. The Ramban, the Arizal, and the Vilna Gaon all
                treated Kabbalistic astrology as a real wisdom — while
                insisting, in the phrase{" "}
                <em>ein mazal le-Yisrael</em>, that prayer, repentance, and
                Tikkun can overturn whatever the stars suggest.
              </p>
              <p style={{ marginTop: "1rem" }}>
                That is the lineage this reading sits inside: serious about
                the sky, more serious about the soul.
              </p>
            </>
          ),
        },
        {
          title: "What your free reading includes",
          body: (
            <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
              <li style={{ marginBottom: "0.6rem" }}>
                <strong>Your mazal</strong> — the Hebrew zodiac sign tied to
                your date of birth, with its month, tribe, and letter.
              </li>
              <li style={{ marginBottom: "0.6rem" }}>
                <strong>Your Soul's Shadow</strong> — the recurring patterns
                (<em>Gilgul</em>) the tradition associates with your sign.
              </li>
              <li style={{ marginBottom: "0.6rem" }}>
                <strong>Your Tikkun</strong> — the specific correction your
                soul came to work on in this lifetime.
              </li>
              <li>
                <strong>Your daily Kavanah</strong> — one intention you can
                carry today.
              </li>
            </ul>
          ),
        },
        {
          title: "Go deeper",
          body: (
            <>
              <p style={{ marginBottom: "1rem" }}>
                Three companion pages unpack different angles of the same
                tradition:
              </p>
              <ul
                style={{
                  paddingLeft: "1.25rem",
                  margin: 0,
                  fontFamily: BODY,
                  color: C_INK_SOFT,
                }}
              >
                <li style={{ marginBottom: "0.6rem" }}>
                  <Link
                    to="/kabbalistic-astrology"
                    style={{ color: C_GOLD, textDecoration: "underline" }}
                  >
                    Kabbalistic Astrology — full guide
                  </Link>{" "}
                  — history, glossary, and an interactive 4,000-year timeline.
                </li>
                <li style={{ marginBottom: "0.6rem" }}>
                  <Link
                    to="/hebrew-astrology"
                    style={{ color: C_GOLD, textDecoration: "underline" }}
                  >
                    Hebrew Astrology
                  </Link>{" "}
                  — the twelve mazalot through the lens of Sefer Yetzirah and
                  the Hebrew alphabet.
                </li>
                <li>
                  <Link
                    to="/jewish-astrology"
                    style={{ color: C_GOLD, textDecoration: "underline" }}
                  >
                    Jewish Astrology
                  </Link>{" "}
                  — the lineage from Abraham and the Talmud to the Arizal and
                  today.
                </li>
              </ul>
              <p
                style={{
                  marginTop: "1.25rem",
                  paddingTop: "1.25rem",
                  borderTop: `1px solid ${C_RULE}`,
                  color: C_MUTED,
                  fontSize: "13px",
                }}
              >
                Or jump straight to{" "}
                <Link
                  to="/what-is-tikkun"
                  style={{ color: C_GOLD, textDecoration: "underline" }}
                >
                  what Tikkun actually means
                </Link>
                .
              </p>
            </>
          ),
        },
      ]}
      faq={FAQ}
    />
  );
}
