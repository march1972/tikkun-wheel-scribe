import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ConstellationGlyph } from "@/components/ConstellationGlyph";
import { SefirotTree } from "@/components/SefirotTree";

export const Route = createFileRoute("/maxspins")({
  component: MaxSpins,
});

function MaxSpins() {
  const navigate = useNavigate();
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-forest-deep px-[clamp(1rem,5vw,3rem)] py-[clamp(2rem,6vh,5rem)] text-cream">
      <p
        className="mb-8 font-semibold uppercase text-gold-bright"
        style={{
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.42em",
          fontSize: "clamp(10px, 1.4vw, 13px)",
        }}
      >
        Kabbalah Astrology
      </p>

      <SefirotTree min={72} max={128} vwFraction={0.24} />

      <h1
        className="mt-8 text-center"
        style={{
          fontFamily: "var(--font-serif)",
          color: "var(--cream-soft)",
          fontWeight: 400,
          fontSize: "clamp(15px, 1.8vw, 22px)",
          lineHeight: 1.6,
          maxWidth: "min(92vw, 480px)",
        }}
      >
        Your actual <em>Tikkun</em> pattern is found in your birth date.
      </h1>

      <span
        aria-hidden="true"
        className="my-6 block h-px w-10"
        style={{ backgroundColor: "var(--gold-deep)" }}
      />

      <button
        type="button"
        onClick={() => navigate({ to: "/form" })}
        className="rounded-full font-semibold uppercase transition-opacity hover:opacity-90"
        style={{
          backgroundColor: "var(--gold-bright)",
          color: "var(--forest-deepest)",
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.28em",
          fontSize: "clamp(11px, 1.3vw, 14px)",
          padding: "clamp(10px, 1.4vh, 14px) clamp(22px, 3.5vw, 36px)",
        }}
      >
        See My Real Tikkun
      </button>

      <p
        className="mt-4 italic"
        style={{
          fontFamily: "var(--font-serif)",
          color: "var(--cream-faint)",
          fontSize: "clamp(11px, 1.2vw, 14px)",
        }}
      >
        Free Tikkun reading + 10-page Workbook
      </p>

      <ConstellationGlyph />
    </main>
  );
}
