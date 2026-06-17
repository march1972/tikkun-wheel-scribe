import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, type SeoLandingFAQ } from "@/components/landing/SeoLanding";

const URL = "https://tikkun.kabbalahcircle.com/hebrew-astrology";
const TITLE = "Hebrew Astrology — Your Free Birth Chart from the Mazalot";
const DESC =
  "Hebrew Astrology reads the twelve mazalot through Sefer Yetzirah and the Zohar. Get a free Tikkun birth chart from your date of birth.";

const FAQ: SeoLandingFAQ[] = [
  {
    q: "What is Hebrew astrology?",
    a: "Hebrew astrology — also called Jewish or Kabbalistic astrology — reads the twelve mazalot of the Hebrew zodiac. Each mazal is paired with a Hebrew month, a Hebrew letter, and a tribe of Israel, drawn from Sefer Yetzirah and the Zohar.",
  },
  {
    q: "What are the 12 Hebrew zodiac signs?",
    a: "Taleh (Aries / Nissan), Shor (Taurus / Iyar), Te'omim (Gemini / Sivan), Sartan (Cancer / Tammuz), Aryeh (Leo / Av), Betulah (Virgo / Elul), Moznayim (Libra / Tishrei), Akrav (Scorpio / Cheshvan), Keshet (Sagittarius / Kislev), Gedi (Capricorn / Tevet), D'li (Aquarius / Shevat), and Dagim (Pisces / Adar).",
  },
  {
    q: "Does the reading use my Hebrew birthday?",
    a: "You just enter your civil date of birth. The reading converts it internally to the Hebrew calendar to determine your mazal and Hebrew month.",
  },
  {
    q: "Is this the same as Western astrology?",
    a: "The constellations overlap with Western astrology, but the meaning is different. Hebrew astrology asks what your soul came to repair (Tikkun), not what fate has in store.",
  },
];

export const Route = createFileRoute("/hebrew-astrology")({
  component: HebrewAstrologyLanding,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
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
    ],
  }),
});

function HebrewAstrologyLanding() {
  return (
    <SeoLanding
      page="/hebrew-astrology"
      eyebrow="Mazalot · The Hebrew Zodiac"
      keyword="Hebrew Astrology"
      headlineAccent="twelve mazalot, twelve months, twelve letters."
      lead="Hebrew Astrology — the reading of the twelve mazalot through Sefer Yetzirah and the Zohar — links each Hebrew month to a constellation, a tribe, and a letter of the Hebrew alphabet. Generate your free Tikkun chart from your date of birth."
      ctaId="hebrew_astrology"
      sections={[
        {
          title: "The twelve mazalot",
          body: (
            <>
              <p>
                The Hebrew zodiac is structured around the twelve Hebrew
                months. Each month is governed by a mazal (constellation), a
                planet, a tribe of Israel, and one of the twelve "elemental"
                letters of the Hebrew alphabet described in{" "}
                <em>Sefer Yetzirah</em>. Together they form the year's
                spiritual calendar.
              </p>
              <p style={{ marginTop: "1rem" }}>
                Your sign is not your personality. It is the gate through
                which your soul entered this lifetime — and the field where
                its <em>Tikkun</em> (correction) is to be worked out.
              </p>
            </>
          ),
        },
        {
          title: "From letters to soul",
          body: (
            <>
              <p>
                In the Kabbalistic system, the Hebrew letters are not just an
                alphabet. They are the building blocks the world was spoken
                into being with. Each elemental letter is paired with a month
                and a mazal, so reading your sign is also reading the letter
                your soul was sealed with.
              </p>
              <p style={{ marginTop: "1rem" }}>
                Your free reading walks you through your mazal, the patterns
                associated with it, and the specific Tikkun the tradition
                points you toward.
              </p>
            </>
          ),
        },
      ]}
      faq={FAQ}
    />
  );
}
