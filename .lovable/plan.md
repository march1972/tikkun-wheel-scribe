# Bigger, bolder type on `/`

Push the landing page toward an editorial / magazine-bold scale (intensity 4/5). Frontend-only — no copy, no content, no color, no layout structure changes.

## Scale changes (src/routes/index.tsx)

| Element | Current | New |
|---|---|---|
| Hero H1 | clamp(40px, 7.5vw, 84px) | clamp(48px, 9vw, 112px), letter-spacing −0.035em |
| Hero intro paragraph | clamp(17px, 1.6vw, 20px) | clamp(20px, 2vw, 26px), line-height 1.55 |
| Section H2s (×4) | clamp(30px, 4.5vw, 52px) | clamp(38px, 6.5vw, 76px), letter-spacing −0.025em, line-height 1.1 |
| Section body paragraphs | clamp(16px, 1.5vw, 19px) | clamp(18px, 1.9vw, 23px), line-height 1.7, max-width 42rem |
| "What you receive" list items | clamp(15px, 1.4vw, 17px) | clamp(17px, 1.7vw, 21px), line-height 1.65 |
| Closing CTA H2 | matches hero | matches new hero (clamp(48px, 9vw, 112px)) |

Eyebrow micro-type, header label, CTA button, Hebrew letters, and footer stay untouched.

## Pull-quote treatment

For each of the 4 sections, promote the **first sentence** of the lead paragraph into an oversized pull-quote rendered above the rest of the body copy:

- Font size: clamp(26px, 3.2vw, 38px)
- Weight: light (300), letter-spacing −0.015em, line-height 1.25
- Color: `text-foreground` (full strength) vs. the body's muted tone
- Margin-bottom: 1.25rem
- Wrapped in `<Reveal>` with delay 80ms; the remaining body copy reveals at 200ms

The remaining sentences of that paragraph render below at the new body size, slightly muted, creating a clear lede → body hierarchy.

## Verification

- Visual check at 778px (current viewport) and at desktop ≥1280px to confirm H1/H2 don't break the grid or overflow.
- Confirm no horizontal scroll on mobile widths.
