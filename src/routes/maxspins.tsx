import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ConstellationGlyph } from "@/components/ConstellationGlyph";
import { SefirotTree } from "@/components/SefirotTree";

export const Route = createFileRoute("/maxspins")({
  component: MaxSpins,
});

function MaxSpins() {
  const navigate = useNavigate();
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-forest-deep px-6 py-16 text-cream">
      <p
        className="mb-8 text-[11px] font-semibold uppercase text-gold-bright"
        style={{
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.42em",
        }}
      >
        Kabbalah Astrology
      </p>

      <SefirotTree size={72} />

      <h1
        className="mt-8 max-w-[320px] text-center text-[16px] leading-relaxed"
        style={{
          fontFamily: "var(--font-serif)",
          color: "var(--cream-soft)",
          fontWeight: 400,
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
        className="rounded-full px-7 py-3 text-[12px] font-semibold uppercase transition-opacity hover:opacity-90"
        style={{
          backgroundColor: "var(--gold-bright)",
          color: "var(--forest-deepest)",
          fontFamily: "var(--font-sans)",
          letterSpacing: "0.28em",
        }}
      >
        See My Real Tikkun
      </button>

      <p
        className="mt-4 text-[12px] italic"
        style={{ fontFamily: "var(--font-serif)", color: "var(--cream-faint)" }}
      >
        Free Tikkun reading + 10-page Workbook
      </p>

      <ConstellationGlyph />
    </main>
  );
}
