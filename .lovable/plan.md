## Goal

Demote "Spin again" to a text link and give the red CTA a clear, grounded primary role with a gold kicker caption above it.

## Layout (top → bottom)

1. Headline "Sound like *you?*" (unchanged)
2. Silver snippet box (unchanged)
3. **Gold kicker caption** — `YOUR FREE FULL BIRTH CHART READING`
   - small caps, gold (`C_GOLD`), 10–11px, letter-spacing 0.24em
   - sits *directly above* the CTA as its label
   - replaces the current grey caption that sat below the CTA
4. **Primary CTA** — red rectangular button
   - Keep red gradient, sharp corners, pulse glow
   - Add subtle gold inner stroke: `boxShadow: inset 0 0 0 1px rgba(240,200,104,0.25), 0 10px 40px -10px ${C_DAWN}aa`
   - Width: keep 280px (don't go full-width — preserves "press me" affordance)
   - Label stays `copy.primaryButton` ("See my full reading" or current text)
   - Keep `→` arrow for now (can refine later)
5. **"or spin again" text link** — small, muted, underlined
   - `fontFamily: BODY`, color `C_MUTED`, fontSize 12px, letter-spacing 0.18em, uppercase
   - Underlined on hover only (or always, subtle)
   - No border, no pill, no background
   - Sits ~16px below the CTA
   - Only renders when `canSpinAgain` is true

## Vertical rhythm

- Box → kicker caption: `mt-[clamp(1.4rem, 3.2vh, 2rem)]` (the existing CTA gap, now applied to the caption)
- Kicker → CTA: `mt-2` (8px) — they're a pair, tight grouping
- CTA → text link: `mt-3` (12px) — minor separation, escape hatch quietly available

## Remove

- The grey caption below the CTA ("Free Full Birth Chart Reading") — replaced by the gold kicker above
- The pill-shaped "Spin again" button (`spinAgainButton` JSX in the `!showForm` block only — form-state button stays untouched if any)

## Scope

Single file: `src/routes/snippet.tsx`, only the `!showForm` block. No new tokens, no new fonts. The `spinAgainButton` const can stay defined (still readable) but is no longer rendered in the `!showForm` branch — replaced by an inline text-link.

## Verification

Load `/snippet` at 672×530:
- One obvious red button with a gold uppercase label above it
- "or spin again" reads as a quiet text link, not a button
- All content fits above the fold
- Visual hierarchy: snippet (contemplate) → CTA (act) → text link (escape)
