import { createFileRoute, Link } from "@tanstack/react-router";
import { SkyShell } from "@/components/landing/SkyShell";
import { PageFooter } from "@/components/landing/PageFooter";
import { PrimaryCTA as GoldCTA } from "@/components/landing/PrimaryCTA";
import { Reveal } from "@/components/landing/Reveal";
import {
  HEAD,
  BODY,
  C_INK,
  C_INK_BRIGHT,
  C_INK_SOFT,
  C_GOLD,
  C_DAWN,
  C_RULE,
} from "@/lib/landing-style";

const PAGE_URL = "https://tikkun.kabbalahcircle.com/what-is-tikkun";
const PAGE_TITLE =
  "What is Tikkun? Meaning, Origins & Your Personal Tikkun in Kabbalah";
const PAGE_DESC =
  "Tikkun (תיקון) means 'repair' or 'correction' in Hebrew. Learn what Tikkun means in Kabbalah, the difference between Tikkun Olam and your personal Tikkun, and how to discover the soul-corrections you are here to make.";

const SECTIONS = [
  { id: "meaning", label: "Meaning" },
  { id: "personal", label: "Personal Tikkun" },
  { id: "olam", label: "Tikkun Olam" },
  { id: "discover", label: "Discover Yours" },
  { id: "twelve", label: "The 12 Tikkunim" },
  { id: "faq", label: "FAQ" },
];

const FAQ = [
  {
    q: "What does Tikkun mean in Hebrew?",
    a: "Tikkun (תיקון) literally means 'repair', 'correction', or 'rectification'. In Kabbalah it refers to the spiritual work of repairing the soul and, through it, repairing the world.",
  },
  {
    q: "What is the difference between Tikkun and Tikkun Olam?",
    a: "Tikkun Olam means 'repair of the world' — collective action and ethical work. Your personal Tikkun is the specific soul-correction you, individually, are here to make in this lifetime. The two are connected: repairing yourself contributes to repairing the world.",
  },
  {
    q: "What is my Tikkun?",
    a: "In Kabbalistic Astrology, your personal Tikkun is read from your date of birth — the patterns your soul carries from past lifetimes (Gilgulim) and the conscious work required to correct them in this one.",
  },
  {
    q: "Is Tikkun a mitzvah?",
    a: "Working on your Tikkun is considered the very purpose of incarnation in Lurianic Kabbalah. It is not a single commandment but the underlying reason the mitzvot are given — each one is an opportunity for repair.",
  },
  {
    q: "Where does the idea of Tikkun come from?",
    a: "The concept is rooted in the Zohar and was developed in detail by Rabbi Isaac Luria (the Arizal) in 16th-century Safed. He taught that creation involves a 'breaking of the vessels' (Shevirat HaKelim) which scattered divine sparks, and our work is to gather and elevate them — that gathering is Tikkun.",
  },
  {
    q: "How do I discover my personal Tikkun?",
    a: "Enter your date of birth into the free Kabbalah Astrology reading on this site. It reveals your Soul's Shadow patterns, your Tikkun, and a daily Kavanah (intention) to work with.",
  },
];

export const Route = createFileRoute("/what-is-tikkun")({
  component: WhatIsTikkunPage,
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
          headline: "What is Tikkun? Meaning, Origins & Your Personal Tikkun",
          description: PAGE_DESC,
          url: PAGE_URL,
          mainEntityOfPage: PAGE_URL,
          author: { "@type": "Organization", name: "Kabbalah Circle" },
          publisher: { "@type": "Organization", name: "Kabbalah Circle" },
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

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24"
      style={{
        fontFamily: HEAD,
        color: C_INK,
        fontSize: "clamp(28px, 4.5vw, 48px)",
        lineHeight: 1.15,
        letterSpacing: "-0.02em",
        marginTop: "clamp(2.5rem, 6vh, 4rem)",
        marginBottom: "clamp(1rem, 2vh, 1.5rem)",
      }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: BODY,
        color: C_INK_SOFT,
        fontSize: "clamp(17px, 1.5vw, 19px)",
        lineHeight: 1.7,
        marginBottom: "1.1rem",
      }}
    >
      {children}
    </p>
  );
}

function WhatIsTikkunPage() {
  return (
    <SkyShell>
      <article className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,4vh,3rem)] pb-[clamp(4rem,10vh,8rem)]">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p
              style={{
                fontFamily: BODY,
                color: C_GOLD,
                fontSize: "11px",
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "1.25rem",
              }}
            >
              A Guide
            </p>
            <h1
              style={{
                fontFamily: HEAD,
                color: C_INK_BRIGHT ?? C_INK,
                fontWeight: 500,
                fontSize: "clamp(36px, 6.5vw, 72px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              What is{" "}
              <span style={{ color: C_DAWN, fontStyle: "italic" }}>Tikkun</span>?
            </h1>
            <p
              style={{
                fontFamily: BODY,
                color: C_INK_SOFT,
                fontSize: "clamp(19px, 1.9vw, 23px)",
                lineHeight: 1.55,
                marginTop: "1.5rem",
                maxWidth: "44rem",
              }}
            >
              <span style={{ color: C_GOLD }}>Tikkun</span> (תיקון) is the
              Hebrew word for <em>repair</em>, <em>correction</em>, or{" "}
              <em>rectification</em>. In Kabbalah, it names the central work of
              a human life: the soul-corrections you are here to make.
            </p>
          </Reveal>

          <nav
            aria-label="On this page"
            className="mt-[clamp(2rem,4vh,3rem)] flex flex-wrap gap-x-5 gap-y-2 border-y py-4"
            style={{ borderColor: C_RULE }}
          >
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  fontFamily: BODY,
                  color: C_INK_SOFT,
                  fontSize: "12px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
                className="hover:!text-[#f0c868] transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>

          <H2 id="meaning">The meaning of Tikkun</H2>
          <P>
            The root ת-ק-נ carries the sense of setting something right,
            establishing it properly, or restoring its intended order. Tikkun
            is not punishment and not penance — it is the act of bringing
            something fractured back to wholeness.
          </P>
          <P>
            In Lurianic Kabbalah (the school of Rabbi Isaac Luria, the Arizal,
            in 16th-century Safed), Tikkun is the answer to a cosmic problem.
            Creation began with vessels meant to hold divine light. Those
            vessels shattered — an event called <em>Shevirat HaKelim</em>,
            the Breaking of the Vessels — scattering sparks of holiness
            throughout the world. Every act of Tikkun gathers a spark and
            returns it.
          </P>

          <H2 id="personal">Your personal Tikkun</H2>
          <P>
            Each soul carries its own Tikkun. According to the doctrine of{" "}
            <em>Gilgul</em> (reincarnation in Kabbalah), the patterns,
            reactivity, and unfinished work of past lifetimes return with the
            soul. Your personal Tikkun is the specific correction your soul
            took on when it entered this lifetime — the habits to interrupt,
            the qualities to develop, the work that will not wait.
          </P>
          <P>
            In Kabbalistic Astrology, this is readable. Your date of birth
            encodes your soul's pattern of return: the shadows it tends to
            repeat (Gilgul), the conscious correction it came to make
            (Tikkun), and the daily intention that aligns you with it
            (Kavanah).
          </P>

          <H2 id="olam">Tikkun Olam vs. your Tikkun</H2>
          <P>
            <strong style={{ color: C_INK }}>Tikkun Olam</strong> — "repair of
            the world" — is the better-known phrase. In modern usage it
            describes collective ethical action: justice, kindness,
            stewardship of the world. In its original Kabbalistic sense it
            refers to the cosmic repair of creation itself, with humanity as
            the active partner.
          </P>
          <P>
            Your personal Tikkun is the local form of that universal work.
            The Arizal taught that there is no separation between the two:
            the world is repaired through the repair of individual souls.
            The work you do on yourself is not selfish — it is the only
            material you have been given to repair the whole.
          </P>

          <H2 id="discover">How to discover your personal Tikkun</H2>
          <P>
            Kabbalistic Astrology offers a direct way to begin. From your
            date of birth, the free reading on this site reveals three
            things:
          </P>
          <ul
            style={{
              fontFamily: BODY,
              color: C_INK_SOFT,
              fontSize: "clamp(17px, 1.5vw, 19px)",
              lineHeight: 1.7,
              listStyle: "none",
              padding: 0,
              marginBottom: "1.5rem",
            }}
          >
            {[
              {
                title: "Your Soul's Shadow Patterns",
                body: "The default reactivity carried over from past lifetimes (Gilgulim) you are here to correct.",
              },
              {
                title: "Your Spiritual Work (Tikkun)",
                body: "The active correction, conscious restrictions, and real-world responsibilities your soul came to take on.",
              },
              {
                title: "Your Daily Mantra (Kavanah)",
                body: "Words to meditate on to restrict the ego and direct your intention toward your Tikkun.",
              },
            ].map((item) => (
              <li
                key={item.title}
                style={{
                  borderTop: `1px solid ${C_RULE}`,
                  padding: "1rem 0",
                }}
              >
                <div
                  style={{
                    color: C_GOLD,
                    fontFamily: HEAD,
                    fontSize: "clamp(19px, 1.7vw, 22px)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {item.title}
                </div>
                {item.body}
              </li>
            ))}
          </ul>

          <div className="mt-[clamp(2rem,4vh,3rem)] flex flex-col items-center gap-3">
            <GoldCTA
              onClick={() => {
                window.location.href = "/";
              }}
              label="Reveal your Tikkun"
            />
            <p
              style={{
                fontFamily: BODY,
                color: "#FFE9B8",
                fontSize: "10px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Free Kabbalah Astrology reading
            </p>
          </div>

          <H2 id="faq">Frequently asked</H2>
          <dl>
            {FAQ.map((f) => (
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
                    fontSize: "clamp(19px, 1.9vw, 23px)",
                    lineHeight: 1.3,
                    marginBottom: "0.5rem",
                  }}
                >
                  {f.q}
                </dt>
                <dd
                  style={{
                    fontFamily: BODY,
                    color: C_INK_SOFT,
                    fontSize: "clamp(16px, 1.4vw, 18px)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>

          <div
            id="twelve"
            style={{
              marginTop: "clamp(2.5rem,6vh,4rem)",
              borderTop: `1px solid ${C_RULE}`,
              paddingTop: "clamp(2rem,4vh,3rem)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontSize: "clamp(26px, 4vw, 42px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              The <span style={{ color: C_GOLD, fontStyle: "italic" }}>12 Tikkunim</span>
            </h2>
            <p
              style={{
                fontFamily: BODY,
                color: C_INK_SOFT,
                fontSize: "clamp(16px, 1.5vw, 19px)",
                lineHeight: 1.7,
                maxWidth: "560px",
                margin: "0 auto 1.5rem",
              }}
            >
              Each zodiac sign carries a distinct soul correction. Explore the
              twelve Tikkunim — from Aries to Pisces — and discover which
              spiritual work belongs to your birth sign.
            </p>
            <Link
              to="/tikkun"
              style={{
                fontFamily: BODY,
                color: C_GOLD,
                fontSize: "13px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Explore the 12 Tikkunim →
            </Link>
          </div>

          <div
            style={{
              marginTop: "clamp(2.5rem,6vh,4rem)",
              textAlign: "center",
            }}
          >
            <PrimaryCTA
              variant="dawn"
              onClick={() => {
                window.location.href = "/form";
              }}
              label="Get your personal Tikkun reading"
            />
            <p
              style={{
                fontFamily: BODY,
                color: "rgba(184,51,63,0.85)",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginTop: "0.85rem",
                marginBottom: "1.25rem",
              }}
            >
              Free · Based on your date of birth
            </p>
            <p
              style={{
                fontFamily: BODY,
                color: C_INK_SOFT,
                fontSize: "13px",
              }}
            >
              Or explore:{" "}
              <Link
                to="/tikkun"
                style={{ color: C_GOLD, textDecoration: "underline" }}
              >
                The 12 Tikkunim
              </Link>
              {" · "}
              <Link
                to="/kabbalistic-astrology"
                style={{ color: C_GOLD, textDecoration: "underline" }}
              >
                Kabbalistic Astrology guide
              </Link>
            </p>
          </div>
        </div>
      </article>
      <PageFooter />
    </SkyShell>
  );
}
