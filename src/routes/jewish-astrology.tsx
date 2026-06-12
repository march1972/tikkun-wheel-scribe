import { createFileRoute } from "@tanstack/react-router";
import { SeoLanding, type SeoLandingFAQ } from "@/components/landing/SeoLanding";

const URL = "https://tikkun.kabbalahcircle.com/jewish-astrology";
const TITLE = "Jewish Astrology — Your Free Tikkun Birth Chart";
const DESC =
  "Jewish Astrology, the mystical reading of the Hebrew zodiac (mazalot) rooted in Sefer Yetzirah and the Zohar. Get a free Tikkun birth chart from your date of birth.";

const FAQ: SeoLandingFAQ[] = [
  {
    q: "Is Jewish astrology actually part of Judaism?",
    a: "Yes. Sages from Abraham and the Talmud through ibn Ezra, the Ramban, the Arizal and the Vilna Gaon discussed the mazalot (constellations). Classical Jewish astrology reads the stars as gateways for divine influence (Shefa), not as fixed fate.",
  },
  {
    q: "What is a mazal?",
    a: "A mazal is one of the twelve constellations of the Hebrew zodiac, each tied to a Hebrew month, a tribe of Israel, and a letter of the Hebrew alphabet. Your mazal describes the field your soul came to refine.",
  },
  {
    q: "How is Jewish astrology different from Western astrology?",
    a: "Western astrology focuses on personality and prediction. Jewish astrology focuses on Tikkun — the soul's correction. Same sky, very different question: not 'what will happen to me?' but 'what did I come here to repair?'",
  },
  {
    q: "Do I need to be Jewish to get a reading?",
    a: "No. The framework is open to anyone curious about Kabbalah and the soul's path. The reading is built from your date of birth.",
  },
];

export const Route = createFileRoute("/jewish-astrology")({
  component: JewishAstrologyLanding,
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

function JewishAstrologyLanding() {
  return (
    <SeoLanding
      page="/jewish-astrology"
      eyebrow="Mazalot · Chokhmat HaMazalot"
      keyword="Jewish Astrology"
      headlineAccent="reads the soul, not the calendar."
      lead="Jewish Astrology — the mystical reading of the Hebrew zodiac — has been studied since Abraham. It maps the twelve mazalot, the months, and the letters of the Hebrew alphabet to reveal your Tikkun: the soul's correction. Generate yours free from your date of birth."
      ctaId="jewish_astrology"
      sections={[
        {
          title: "An ancient tradition, not New Age",
          body: (
            <>
              <p>
                Long before modern astrology, Jewish mystics taught that the
                twelve constellations (<em>mazalot</em>) channel divine
                influence (<em>Shefa</em>) into the world. The earliest
                Kabbalistic text, <em>Sefer Yetzirah</em>, maps each Hebrew
                month, planet, and letter to a specific gate of energy. The{" "}
                <em>Zohar</em>, ibn Ezra's <em>Reshit Chokhmah</em>, and the
                Arizal's writings developed the framework you are reading from
                today.
              </p>
              <p style={{ marginTop: "1rem" }}>
                The point of a Jewish astrological reading is never prediction.
                It is <em>Tikkun</em>: identifying the patterns your soul came
                back to correct, and the practical Kavanah (intention) that
                lets you do the work.
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
                your date of birth, with its tribe, letter, and month.
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
      ]}
      faq={FAQ}
    />
  );
}
