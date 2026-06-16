Goal: Change the "Kabbalah Astrology" top-eyebrow text on every page from muted blue (`rgba(140, 175, 215, 0.55)`) to a rich golden color that matches the Tikkun wheel (`#f0c868`), and make it glow very brightly on hover.

Files to update:
- `src/routes/index.tsx` — eyebrow `Link`
- `src/routes/spinning.tsx` — eyebrow `span`
- `src/routes/kabbalistic-astrology.tsx` — eyebrow text
- `src/routes/history.tsx` — eyebrow text
- `src/routes/__root.tsx` — if eyebrow is present there

Changes:
1. Replace the static eyebrow color with `C_GOLD` (`#f0c868`) or a brighter gold variant (`C_GOLD_BRIGHT` `#FFE9B8`) so it visually echoes the wheel.
2. For any interactive eyebrow (e.g. the `Link` on the home page), intensify the hover state: shift to `C_GOLD_BRIGHT`, add a stronger drop-shadow glow (`drop-shadow-[0_0_12px_rgba(255,233,184,0.95)]`), and increase scale slightly.
3. For static eyebrows (e.g. on `/spinning`), either make them a plain `Link` to `/kabbalistic-astrology` with the same golden hover effect, or at minimum set the static color to the bright gold so every page reads consistently without relying on hover.

Out of scope: No layout changes, no new components, no backend work.