import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, type SeoLandingFAQ } from "@/components/landing/SeoLanding";

const URL =
  "https://tikkun.kabbalahcircle.com/kabbalistic-astrology-reading";
const TITLE = "Kabbalistic Astrology Reading — Free Tikkun Birth Chart";
const DESC =
  "A free Kabbalistic Astrology reading: your mazal, your Soul's Shadow (Gilgul), your Tikkun, and a daily Kavanah — drawn from Sefer Yetzirah and the Zohar.";

const FAQ: SeoLandingFAQ[] = [
  {
    q: "What is Kabbalistic astrology?",
    a: "Kabbalistic astrology (Chokhmat HaMazalot) is the mystical reading of the Hebrew zodiac. It traces back to Sefer Yetzirah and the Zohar and was developed by ibn Ezra, the Ramban, the Arizal, the Baal HaSulam, and Aryeh Kaplan.",
  },
  {
    q: "What does the reading actually tell me?",
    a: "Your mazal (Hebrew sign), the recurring patterns of your Soul's Shadow (Gilgul), the specific Tikkun your soul came to work on, and one daily Kavanah (intention) you can carry today.",
  },
  {
    q: "Is the reading really free?",
    a: "Yes. Enter your date of birth and the full reading is generated immediately. No account, no payment, no email required up front.",
  },
  {
    q: "Where does the framework come from?",
    a: "Primarily from Sefer Yetzirah, the Zohar, the Arizal's Sha'ar HaGilgulim, and Aryeh Kaplan's translation work. The full history and glossary is published on this site.",
  },
];

export const Route = createFileRoute("/kabbalistic-astrology-reading")({
  component: KabbalisticAstrologyReadingLanding,
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

function KabbalisticAstrologyReadingLanding() {
  return (
    <SeoLanding
      page="/kabbalistic-astrology-reading"
      eyebrow="Chokhmat HaMazalot"
      keyword="Kabbalistic Astrology Reading"
      headlineAccent="your Tikkun, mapped from your date of birth."
      lead="A Kabbalistic Astrology reading — rooted in Sefer Yetzirah, the Zohar, and the Arizal — looks past prediction to your Tikkun: the soul's specific correction. Generate yours free in under a minute."
      ctaId="kabbalistic_astrology_reading"
      sections={[
        {
          title: "Past life, present work",
          body: (
            <>
              <p>
                Classical Kabbalah teaches <em>Gilgul</em> — the soul returns
                in cycles, carrying unfinished work. A Kabbalistic Astrology
                reading is the diagnostic: what pattern did you carry into
                this lifetime, and what is the Tikkun (correction) that
                resolves it?
              </p>
              <p style={{ marginTop: "1rem" }}>
                The reading uses your <em>mazal</em> (Hebrew sign), its
                associated Hebrew letter and month, and the Sefirah it draws
                from, to describe your Soul's Shadow and your path.
              </p>
            </>
          ),
        },
        {
          title: "What you receive",
          body: (
            <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
              <li style={{ marginBottom: "0.6rem" }}>
                <strong>Your mazal</strong> — Hebrew sign, month, tribe, and
                letter.
              </li>
              <li style={{ marginBottom: "0.6rem" }}>
                <strong>Soul's Shadow</strong> — the Gilgul pattern the
                tradition associates with your sign.
              </li>
              <li style={{ marginBottom: "0.6rem" }}>
                <strong>Your Tikkun</strong> — the specific correction your
                soul came to work on.
              </li>
              <li>
                <strong>Daily Kavanah</strong> — one intention to carry into
                today.
              </li>
            </ul>
          ),
        },
        {
          title: "Sources",
          body: (
            <p>
              Drawn from <em>Sefer Yetzirah</em>, the <em>Zohar</em>, ibn
              Ezra's <em>Reshit Chokhmah</em>, the Arizal's{" "}
              <em>Sha'ar HaGilgulim</em>, the Baal HaSulam's commentary, and
              the modern English translations of Aryeh Kaplan.
            </p>
          ),
        },
      ]}
      faq={FAQ}
    />
  );
}
