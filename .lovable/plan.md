# Match `/snippet` to the new `/` and `/reading` type scale

Apply the same editorial / magazine-bold scale (intensity 4/5) used on `/` and `/reading` to `/snippet` so the three pages read as one. Frontend only — no new content, no new elements, no copy or layout structure changes.

## Scale changes (src/routes/snippet.tsx)

### Pre-form state (snippet card view)

| Element | Current | New |
|---|---|---|
| "Sound like you?" eyebrow | clamp(10px, 2.6vw, 13px), tracking 0.22em | unchanged — matches eyebrow micro-type left untouched on `/` and `/reading` |
| Hebrew letter (sign.hebrewLetter) | clamp(50px, 10vw, 90px) | clamp(72px, 13vw, 120px), keep glow |
| Snippet body paragraph (sign.screen3.spinSnippet) | 15px, line-height 1.7 | clamp(17px, 1.9vw, 21px), line-height 1.7 |
| "Spin again" button label | 11px / 0.22em | unchanged — button micro-type |
| Primary CTA label | 12px / 0.24em | unchanged — button micro-type |
| "Free Full Birth Chart Reading" caption | clamp(12px, 1.3vw, 14px) | unchanged — meta caption |

### Form state (after final free spin)

| Element | Current | New |
|---|---|---|
| H2 "See your actual Tikkun chart" | clamp(25px, 6.9vw, 37px), letter-spacing −0.02em, line-height 1.2 | clamp(34px, 6.2vw, 60px), letter-spacing −0.025em, line-height 1.1 (slightly tempered vs section H2s on `/` because it sits inside the narrow form column) |
| "(Free reading + workbook)" eyebrow | 12px / 0.18em | unchanged — eyebrow micro-type |
| Field labels | 10px / 0.22em | unchanged — form micro-type |
| Inputs | 15px | unchanged — input affordance, changing this breaks 16px iOS zoom rule |
| Newsletter checkbox label | 13px | unchanged — UI affordance |
| Submit button label | 12px / 0.24em | unchanged — button micro-type |
| Footer "Email used to send…" line | 15px | unchanged — fine print |

## Rationale

- Hebrew letter and snippet body paragraph carry the "reveal" moment — bumping them up matches the editorial weight of the H1 and body bumps on `/` and `/reading`.
- Form H2 gets bumped but capped lower than a full section H2 (76px) because the form card is narrow (max-w-2xl) and a 76px headline would wrap awkwardly above the inputs.
- Everything else on `/snippet` is either eyebrow / form chrome / button micro-type that was deliberately left alone on `/` and `/reading`.

## Verification

- No editorial / copy changes — type scale only.
- Visual check at 778px and at desktop ≥1280px for both pre-form and form states.
- Mobile pass at 375px and 414px: confirm Hebrew letter doesn't overflow the snippet card, form H2 wraps cleanly above inputs without pushing the submit button awkwardly far down, and spacing rhythm (mt clamps) still feels balanced after the bumps.
- Confirm no horizontal scroll on mobile widths.
- Confirm form H2 doesn't push the inputs below the fold on a 530-tall viewport.
