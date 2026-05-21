# Restyle the "Kabbalah Astrology" header

Refresh the small wordmark at the top of the homepage so it feels intentional and matches the cosmic, editorial tone of the landing page — and center it cleanly.

## What changes

- **File:** `src/components/landing/SkyShell.tsx` (the header rendered above every landing section).
- **Centering:** keep the link horizontally centered in the header row.
- **Typography:** switch from the tiny uppercase sans label to the page's serif display font (`HEAD` / `var(--font-serif)`), using small caps-style letterspacing for an elegant masthead feel.
- **Sizing:** bump from 10px to roughly 13–15px so it reads as a real wordmark, not a utility label.
- **Color:** use the warm parchment ink (`C_INK` / `C_INK_SOFT`) at full opacity instead of the dim slate gray, with a subtle gold (`C_GOLD`) accent option for the divider/dot between the two words.
- **Spacing:** add a touch more top padding and a thin hairline rule or gold dot separator between "Kabbalah" and "Astrology" instead of the current wide spaced-letter trick.
- **Cleanup:** remove the leftover `border-slate-500 opacity-85 text-lg text-slate-200` classes that conflict with the inline styles.

## Design direction options

I'll generate 3 rendered directions so you can pick the exact look:

1. **Serif masthead** — italic serif "Kabbalah" + roman "Astrology" separated by a small gold star/dot, centered.
2. **Refined spaced caps** — keep the spaced-uppercase idea but in the serif face, larger, in warm ink with a thin gold underline.
3. **Two-line monogram** — small "KABBALAH" eyebrow above a slightly larger serif "Astrology", tightly centered.

After you pick one, I'll implement it in `SkyShell.tsx` only — no other files touched.
