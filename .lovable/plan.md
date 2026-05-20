# Remove eyebrow + shift up heading on final spin screen

## What
On the 3rd spin screen (`/snippet`), remove the "Kabbalah Astrology" eyebrow divider (the centred label with horizontal rules) and tighten the top spacing so the "Get your real Tikkun" heading sits higher.

## How
- In `src/routes/snippet.tsx` (final-spin branch, ~line 105):
  - Delete the `<div>` containing the horizontal-rule + "Kabbalah Astrology" + horizontal-rule eyebrow.
  - Remove the `mt-[clamp(1rem,2.5vh,1.5rem)]` margin-top class from the `<h1>` so it shifts up.
