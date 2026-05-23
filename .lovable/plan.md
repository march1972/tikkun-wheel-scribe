Refactor `src/routes/spinning.tsx` to remove the `SkyShell` wrapper (which adds a hidden duplicate "Kabbalah Astrology" header that pushes everything down) and use the same `<main>` shell as `src/routes/index.tsx`:

- Drop `import { SkyShell }` and `<SkyShell>` wrapper.
- Add imports: `StarField` from `@/components/landing/StarField`; `C_SKY_GRAD`, `C_INK_SOFT` from `@/lib/landing-style`.
- Render `<main className="relative min-h-screen overflow-hidden" style={{ color: C_INK_SOFT }}>` containing the fixed gradient div, `<StarField density={360} opacity={0.85} />`, then the existing header + section unchanged (header padding, halo, h1, wheel wrapper, paragraph kept identical).
- Bump h1 `lineHeight` from `1.0` → `1.02` to match index exactly.

Result: eyebrow and "Reveal your Tikkun" sit at the exact same Y on `/` and `/spinning`. No other files touched. `SkyShell.tsx` left intact for other routes.