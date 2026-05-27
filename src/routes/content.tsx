import { createFileRoute } from "@tanstack/react-router";
import { SkyShell } from "@/components/landing/SkyShell";
import {
  HEAD, BODY, C_INK, C_INK_SOFT, C_MUTED, C_GOLD, C_DAWN, C_RULE,
} from "@/lib/landing-style";
import { SIGNS, STATIC_COPY } from "@/lib/tikkun-data";

export const Route = createFileRoute("/content")({
  component: ContentReview,
  head: () => ({
    meta: [
      { title: "All Tikkun content — internal review" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function Paragraphs({ text }: { text: string }) {
  const paras = text.split("\n\n");
  return (
    <>
      {paras.map((p, i) => (
        <p
          key={i}
          style={{
            fontFamily: BODY,
            color: C_INK,
            fontSize: "15px",
            lineHeight: 1.7,
            marginTop: i === 0 ? 0 : "0.9em",
          }}
        >
          {p.split("\n").map((line, j, arr) => (
            <span key={j}>
              {line}
              {j < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: BODY,
        color: C_GOLD,
        fontSize: "10px",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        fontWeight: 700,
        margin: "1.4rem 0 0.5rem",
      }}
    >
      {children}
    </h3>
  );
}

function ContentReview() {
  const headers = STATIC_COPY.screen6.sectionHeaders;
  return (
    <SkyShell starDensity={240}>
      <section
        className="mx-auto px-[clamp(1rem,5vw,3rem)] pt-10 pb-24"
        style={{ maxWidth: 820 }}
      >
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontFamily: HEAD,
              color: C_INK,
              fontSize: "clamp(34px, 5vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            All <span style={{ color: C_GOLD, fontStyle: "italic" }}>Tikkun</span> content
          </h1>
          <p
            style={{
              fontFamily: BODY,
              color: C_MUTED,
              fontSize: "12px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginTop: "0.75rem",
            }}
          >
            Internal review — {SIGNS.length} signs
          </p>
        </header>

        {SIGNS.map((s, idx) => (
          <article
            key={s.id}
            style={{
              paddingTop: idx === 0 ? 0 : "2.5rem",
              paddingBottom: "2.5rem",
              borderTop: idx === 0 ? "none" : `1px solid ${C_RULE}`,
            }}
          >
            {/* Sign header */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
              <span
                aria-hidden
                style={{
                  fontFamily: HEAD,
                  color: C_DAWN,
                  fontSize: "64px",
                  lineHeight: 1,
                  textShadow: `0 0 24px ${C_DAWN}55`,
                }}
              >
                {s.hebrewLetter}
              </span>
              <div>
                <h2
                  style={{
                    fontFamily: HEAD,
                    color: C_INK,
                    fontSize: "clamp(28px, 4vw, 40px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.sign}
                </h2>
                <p
                  style={{
                    fontFamily: BODY,
                    color: C_INK_SOFT,
                    fontSize: "12px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {s.letterName} · {s.tikkunDirection}
                </p>
              </div>
            </div>

            <Label>Spin snippet</Label>
            <p
              style={{
                fontFamily: BODY,
                fontStyle: "italic",
                color: C_INK,
                fontSize: "16px",
                lineHeight: 1.65,
              }}
            >
              {s.screen3.spinSnippet}
            </p>

            <Label>Mantra quote</Label>
            <p
              style={{
                fontFamily: HEAD,
                color: C_GOLD,
                fontSize: "20px",
                lineHeight: 1.4,
                fontStyle: "italic",
              }}
            >
              “{s.screen6.mantraQuote}”
            </p>

            <Label>{headers[0]}</Label>
            <Paragraphs text={s.screen6.lifesPattern} />

            <Label>{headers[1]}</Label>
            <Paragraphs text={s.screen6.archetype} />

            <Label>{headers[2]}</Label>
            <Paragraphs text={s.screen6.lifesWork} />

            <Label>{headers[3]}</Label>
            <p
              style={{
                fontFamily: BODY,
                color: C_INK,
                fontSize: "15px",
                lineHeight: 1.7,
              }}
            >
              <strong style={{ color: C_GOLD }}>{s.letterName}</strong> — {s.screen6.letterMeaning}
            </p>
            <Paragraphs text={s.screen6.letterTeaching} />

            <Label>{headers[4]}</Label>
            <p
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontSize: "18px",
                lineHeight: 1.5,
                fontStyle: "italic",
              }}
            >
              {s.screen6.dailyMantra}
            </p>
          </article>
        ))}
      </section>
    </SkyShell>
  );
}
