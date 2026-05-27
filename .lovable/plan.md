## Goal

A single scrollable, print-friendly page that displays every zodiac sign's content in one place for review/proofing:
- spin snippet (the teaser shown after the wheel)
- full reading (mantra quote, life's pattern, archetype, life's work, letter meaning, letter teaching, daily mantra)

## New route

`src/routes/content.tsx` — `/content`

- Reuses `SIGNS` and `STATIC_COPY` from `src/lib/tikkun-data.ts` (no new data, no backend).
- Reuses landing tokens (`HEAD`, `BODY`, `C_INK`, `C_GOLD`, `C_DAWN`, etc.) from `src/lib/landing-style.ts` so it visually matches the real reading.
- Wrapped in `SkyShell` for the same starfield background.
- Not linked from any nav — internal QA page, reachable by typing `/content`.
- `head()` sets `<title>` and `<meta name="robots" content="noindex">` so it stays out of search.

## Page structure

1. Header strip: title "All Tikkun content" + small note "Internal review — 12 signs".
2. For each of the 12 signs (zodiac order), one stacked block containing:
   - Sign name + Hebrew letter (big, gold) + letter name + south node + tikkun direction
   - Section: **Spin snippet** — `sign.screen3.spinSnippet` rendered in the same italic style as `/snippet`
   - Section: **Full reading** — labeled subsections matching `STATIC_COPY.screen6.sectionHeaders`:
     - Mantra quote
     - Your Life's Pattern (preserves `\n\n` paragraph breaks)
     - Archetype (preserves `\n` line break)
     - Your Life's Work (preserves `\n\n`)
     - Your Tikkun Letter — letter meaning + letter teaching
     - Daily Mantra
3. Thin gold divider between signs.

Paragraph breaks are rendered by splitting on `\n\n` / `\n` and mapping to `<p>` / `<br/>`.

## Out of scope

- No nav link, no auth gate, no edit UI, no PDF export (can add later if useful).
- No changes to existing routes, data, or server functions.
