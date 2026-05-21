# Standardize body text size + line-height to match /terms

## What's wrong today

/terms and /privacy use a single, fixed body style: `fontSize: 15px`, `lineHeight: 1.7`, `fontFamily: BODY` (General Sans), `color: C_INK_SOFT`.

Every other route uses a different (and inconsistent) body size and line-height, so the body text on /, /snippet, /history, /reading does not match Terms — it's larger and tighter at desktop.

Concrete drift:

| Page | Body fontSize | lineHeight |
|---|---|---|
| /terms, /privacy (target) | 15px | 1.7 |
| /history — 3 body paragraphs | clamp(14px, 1.6vw, 17px) | 1.7 |
| /reading — Paragraphs helper, Tikkun-letter teaching | clamp(14px, 1.6vw, 17px) | 1.7 |
| /reading — Reflection prompt | clamp(15px, 1.8vw, 18px) | 1.65 |
| /reading — Share sub, "deeper" sub | 14px | default |
| /index — intro + origins/free-will/greater-purpose + "What you receive" list | clamp(14px, 1.5vw, 17px) | 1.6 |
| /snippet — spin snippet body | clamp(14px, 1.7vw, 17px) | 1.6 |
| /snippet — "Email used to send…" footnote | 13px | 1.5 |

## Fix

Normalize **prose / body paragraphs** site-wide to the Terms spec:

- `fontSize: 15px` (fixed, not clamp)
- `lineHeight: 1.7`
- `fontFamily: BODY`
- color unchanged (already `C_INK_SOFT` / `C_INK` per page)

Apply to these specific paragraphs only:

- `src/routes/index.tsx` — hero intro paragraph; "What you receive" list items; Ancient roots paragraph; Influence not prediction paragraph; greater purpose paragraph. (5 paragraphs / list block.)
- `src/routes/snippet.tsx` — spin-snippet body paragraph; "Email used to send you free Tikkun Workbook" footnote (raise from 13px to 15px for prose consistency).
- `src/routes/history.tsx` — the 3 body paragraphs in the deep band; the newsletter sub-copy paragraph.
- `src/routes/reading.tsx` — `Paragraphs` helper (used for Life's Pattern and Life's Work); Tikkun-letter teaching paragraph; Reflection prompt paragraph; Share sub paragraph; "deeper" sub paragraph.

## Out of scope (intentionally unchanged)

These are not "body prose" and stay as-is so the visual hierarchy doesn't collapse:

- All headings (Fraunces, existing clamp sizes).
- Eyebrows / section-headers / labels / form labels (11px tracked uppercase).
- Buttons / CTA labels (12–13px tracked uppercase).
- Hebrew letter displays (large Fraunces).
- Italic Fraunces mantra / archetype lines on /reading.
- Footer link "Kabbalah · Circle" and "← Back to home" links.
- Tiny meta lines like "Free Tikkun Astrology Reading" (10px tracked uppercase) and error messages (12px).
- Input fields keep 14–15px as today.

## Files touched

- `src/routes/index.tsx`
- `src/routes/snippet.tsx`
- `src/routes/history.tsx`
- `src/routes/reading.tsx`

No content / copy / color / layout / component changes. Only `fontSize` + `lineHeight` of the body-prose paragraphs listed above.

## QA after the change

Screenshot /, /snippet (both pre-form and form states), /history, /reading at desktop (1366) and mobile (390) and confirm body text matches /terms in size and rhythm.
