import { createFileRoute, Link } from "@tanstack/react-router";
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
  C_BAND_MID,
  C_BAND_DEEP,
  C_BAND_LIFT,
} from "@/lib/landing-style";
import vilnaGaon from "@/assets/vilna-gaon.png.asset.json";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About · Kabbalah Circle" },
      {
        name: "description",
        content:
          "Meet Marc, the person behind Kabbalah Circle — a personal project exploring meaning, growth, and community through Kabbalah and psychology.",
      },
      { property: "og:title", content: "About · Kabbalah Circle" },
      {
        property: "og:description",
        content:
          "Meet Marc, the person behind Kabbalah Circle — a personal project exploring meaning, growth, and community through Kabbalah and psychology.",
      },
      { property: "og:url", content: "https://tikkun.kabbalahcircle.com/about" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://tikkun.kabbalahcircle.com/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: "https://tikkun.kabbalahcircle.com/about",
          name: "About · Kabbalah Circle",
          isPartOf: { "@id": "https://tikkun.kabbalahcircle.com/#website" },
          about: {
            "@type": "Person",
            name: "Marc",
            description: "Founder of Kabbalah Circle — a personal project exploring Kabbalah and psychology.",
          },
        }),
      },
    ],
  }),
});

const paraStyle: React.CSSProperties = {
  marginBottom: "1.25rem",
};

const sectionInner =
  "mx-auto max-w-2xl px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3rem,6vh,5rem)]";

const bodyStyle: React.CSSProperties = {
  color: C_INK_SOFT,
  fontFamily: BODY,
  lineHeight: 1.7,
  fontSize: "15px",
};

function About() {
  return (
    <SkyShell starDensity={80}>
      {/* ── Band A: intro + pull quote ───────────────────────────── */}
      <section style={{ background: C_BAND_MID }}>
        <div className={sectionInner} style={bodyStyle}>
          <h1
            style={{
              fontFamily: HEAD,
              color: C_INK,
              fontSize: "clamp(28px,5vw,44px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              marginBottom: "1.75rem",
            }}
          >
            About Kabbalah{" "}
            <span style={{ color: C_DAWN, fontStyle: "italic" }}>Circle</span>
          </h1>

          <p style={paraStyle}>Hi, I'm Marc.</p>

          <p style={paraStyle}>
            Kabbalah Circle is an independent personal project I'm working on,
            with the goal of helping people find greater meaning, spiritual
            growth, and fulfillment in their lives — through Kabbalah,
            psychology, human connection, and community.
          </p>

          <p style={paraStyle}>
            Kabbalah Circle isn't affiliated with any school or institution, and
            it isn't meant to replace one. If anything, I hope it encourages
            people to go deeper — including with the established teachers and
            centers who have carried this wisdom far longer, and far better,
            than I can.
          </p>

          <p style={paraStyle}>
            I've been studying Kabbalah on and off for over 30 years, and
            recently rediscovered it, through the{" "}
            <a
              href="https://onehouse.kabbalah.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: C_GOLD, textDecoration: "underline" }}
            >
              Kabbalah Centre<span className="sr-only"> (opens in new tab)</span>
            </a>{" "}
            in New York, alongside my own self-directed learning to explore
            different viewpoints and approaches. This project was actually
            inspired by a teacher at the Kabbalah Centre, who challenged me to
            go out and start something that could help spread the wisdom and
            Light of Kabbalah.
          </p>

          <blockquote
            style={{
              borderLeft: `1px solid rgba(201, 168, 111, 0.35)`,
              paddingLeft: "1.25rem",
              margin: "clamp(2rem,4vh,2.75rem) 0",
              fontStyle: "italic",
              color: C_DAWN,
              fontSize: "24px",
              lineHeight: 1.6,
              fontFamily: HEAD,
            }}
          >
            "The essence of human life is to constantly strengthen ourselves in
            the repair of our character traits. If not — of what purpose is
            life?"
            <footer
              style={{
                marginTop: "0.85rem",
                fontStyle: "normal",
                fontFamily: BODY,
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: C_MUTED,
              }}
            >
              — Even Shleimah 1:2, teachings of the Vilna Gaon
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── Band B: ancestry + portrait ──────────────────────────── */}
      <section style={{ background: C_BAND_DEEP }}>
        <div className={sectionInner} style={bodyStyle}>
          <p style={paraStyle}>
            Growing up, my grandmother Rose, whose family came from Lithuania,
            told me we were descendants of the{" "}
            <a
              href="https://en.wikipedia.org/wiki/Vilna_Gaon"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: C_GOLD, textDecoration: "underline" }}
            >
              Vilna Gaon<span className="sr-only"> (opens in new tab)</span>
            </a>
            , one of the greatest sages and Kabbalists. I'm not sure if that's
            true, but I have a distinct memory of a large, framed image of an
            austere sage, looking over us, in her apartment in Pretoria, South
            Africa. It looked similar to this one.
          </p>

          <figure className="my-[clamp(2rem,4vh,3rem)] flex flex-col items-center">
            <img
              src={vilnaGaon.url}
              alt="Portrait of the Vilna Gaon"
              style={{
                maxWidth: 240,
                width: "100%",
                height: "auto",
                borderRadius: 4,
                boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
              }}
            />
            <figcaption
              style={{
                marginTop: "0.75rem",
                fontStyle: "italic",
                fontSize: "12px",
                color: C_MUTED,
                textAlign: "center",
              }}
            >
              Vilna Gaon — Source: Wikipedia
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Band C: personal + CTA ───────────────────────────────── */}
      <section style={{ background: C_BAND_LIFT }}>
        <div className={sectionInner} style={bodyStyle}>
          <p style={paraStyle}>
            A little about my background: I'm a trained lawyer with an MBA from
            INSEAD. I've worked at companies like Sony and Softbank, and lived
            and worked in South Africa, Israel, Germany, and the United States.{" "}
            <br />
            <br />
            I'm also a certified coach (executive and relationship coaching), a
            mediator, a startup founder, and a venture capitalist.
          </p>

          <p style={paraStyle}>
            I grew up in South Africa and currently live in New York City with
            my wife, our three kids, and our Sheepadoodle, Ferdi. In my spare
            time, I spend time with our family, write, read, study Kabbalah and
            psychology, and run around Central Park with Ferdi and friends. (I
            start a Master's in Relationship Therapy in August 2026 — wish me
            luck!)
          </p>

          <p style={paraStyle}>
            Like many people, I approach religion, astrology, and spiritual
            wisdom, with a healthy dose of skepticism. I oscillate between
            believing and questioning, but carry a profound sense that we're
            connected to a higher energy, and have a purpose here: to connect
            with one another, and to serve something larger than any one of us.{" "}
            <br />
            <br />
            Kabbalistic Astrology (also sometimes known as Hebrew Astrology or
            Jewish Astrology), is relatively new to me, and while Kabbalah
            teachers us to embrace "certainty beyond logic", I have spent many
            skeptical days researching the origins of Kabbalistic Astrology, and
            whether it is broadly accepted or not. Despite much debate around
            the acceptability or otherwise of Hebrew Astrology by different
            movements, it is agreed that the cosmic constellations have never
            been seen as predictive of the future by Kabbalists. There may be
            cosmic influence, but humans always have free will, and the ability
            to direct and transform their own lives and Tikkun (regardless of
            the cosmos). What's also excited me about Kabbalistic Astrology is
            that it brings the tangible beauty and awesomness of the universe
            into our spiritual quest
          </p>

          <p style={paraStyle}>
            What's excited me about Kabbalistic Astrology is that it brings the
            tangible beauty and awesomeness of the universe into our daily
            spiritual quest. We gaze out at the same skies that the Patriarch
            Abraham and Matriarch Sarah gazed at many thousands of years ago.{" "}
            <br />
            <br />
            I am also inspired to see that some of the great modern
            psychologists like Carl Yung, who although not a Kabbalist (or
            Jewish), developed frameworks like the "Jungian shadow", which
            parallel ancient Kabbalistic concepts such as Tikkun, where we learn
            to identify, restrict and repair darker patterns (shadows) hidden in
            our soul or psyche. <br />
            <br />
            Even if we don't quite believe that our date of birth can yield a
            specific cosmic signal, there is much we can learn about ourselves
            and others if we study the Tikkun's "Shadow Patterns" (a term I
            borrowed from Yung to refer to the required spiritual "corrections"
            necessary for the soul to perfect its purpose). In doing so, we may
            begin to understand ourselves better, and what stands in our way of
            transforming our lives and the lives of those around us.
          </p>

          <p style={paraStyle}>
            I'm sharing all of this as someone who is still learning, and
            hoping to learn alongside you.
          </p>

          <div
            style={{
              marginTop: "clamp(2.25rem,5vh,3.25rem)",
              textAlign: "center",
            }}
          >
            <p style={{ ...paraStyle, marginBottom: "1.25rem" }}>
              If this resonates, I'd love to connect.
            </p>
            <a
              href="https://www.linkedin.com/in/marcherson/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                border: `1px solid ${C_GOLD}`,
                color: C_GOLD,
                padding: "0.75rem 1.5rem",
                fontFamily: BODY,
                fontSize: "12px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: 2,
                transition: "background 200ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(240,200,104,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
              }}
            >
              Connect with me on LinkedIn →<span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>

          <div
            style={{
              marginTop: "clamp(3rem,6vh,4rem)",
              borderTop: `1px solid ${C_RULE}`,
              paddingTop: "1.5rem",
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
              }}
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </section>
    </SkyShell>
  );
}
