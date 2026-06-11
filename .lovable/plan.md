Make four italic "statement" blocks on `/reading` share one type size, matching the Reflection prompt.

## Target size
`clamp(22px, 2.8vw, 28px)`, line-height `1.5`, HEAD italic, color `C_INK`.

## Changes in `src/routes/reading.tsx`

1. **Hero quote** (line ~233) — change `fontSize: "clamp(22px, 3.2vw, 32px)"` and `lineHeight: 1.45` → `clamp(22px, 2.8vw, 28px)` / `1.5`.
2. **Shadow Archetype lines** (line ~278) — change `fontSize: "clamp(24px, 3.2vw, 34px)"` and `lineHeight: 1.35` → `clamp(22px, 2.8vw, 28px)` / `1.5`.
3. **Daily Mantra text** (line ~346) — change `fontSize: "clamp(32px, 5vw, 56px)"` and `lineHeight: 1.3` → `clamp(22px, 2.8vw, 28px)` / `1.5`. Keep the existing glow `textShadow` and centering.

No changes to: section labels (20px), body prose (15px), Tikkun letter glyph, Share headline, Closing sub, or any copy text.