# Plan: Snippet form spacing + CTA label tweak

All changes in `src/routes/snippet.tsx`.

1. **Tighten field spacing, keep CTA breathing room** — current `gap-5` (20px) between every form row makes the fields feel floaty and pushes the CTA below the fold on small viewports. Best practice for short lead forms:
   - Form `gap-5` → `gap-4` (16px) — tight, grouped, scannable.
   - Newsletter checkbox: add `marginTop: 8px` so it visually separates from the input cluster (it's a different control type).
   - Submit button: keep `mt-6` (24px) — clear separation between inputs and primary action drives conversion.

2. **CTA label** — change button text from `Reveal my free Tikkun Reading` → `Reveal my free Tikkun astrology reading` (busy state stays `Revealing…`).

No other files touched.