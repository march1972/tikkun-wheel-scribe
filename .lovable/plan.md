Single file: `src/routes/snippet.tsx`, `!showForm` branch only.

## 1. CTA copy
- Label: `Reveal My Actual Tikkun Chart` + `→`
- (Replaces current "Get My Free Birth Chart")

## 2. Subline (replaces trust micro-line)
- Text: `Free Lunar Reading & Workbook`
- Style: `BODY`, color `C_GOLD` at reduced opacity (~75%) so it whispers rather than competes — `color: rgba(240,200,104,0.78)`, `fontSize: "11px"`, `letterSpacing: "0.22em"`, `fontWeight: 500`, `textTransform: "uppercase"`, `mt-3`.
- Removes "Free · No card needed · 60 seconds" entirely.

## 3. Button — matte oxblood, no pulse
Strip the promo/SaaS cues. Specific changes:

- **Background**: solid `#5c1a24` (deep sacramental red). No gradient. On hover: `#6b1f2b` (one shade lighter, no warming-up gradient).
- **Border**: 1px hairline `rgba(240,200,104,0.35)` — gold whisper, not the current 1px inset gold that fights the red.
- **Animation**: remove `cta-pulse-glow` class and the `@keyframes cta-pulse-glow` block + the `:hover` override entirely. Replace with a still, subtle resting shadow: `box-shadow: 0 8px 24px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)`. On hover: lift via `hover:translate-y-[-1px]` and shadow bump to `0 12px 32px -12px rgba(92,26,36,0.55)`. No scale, no brightness, no glow pulse.
- **Border-radius**: keep `3px`.
- **Padding**: `20px 36px` (slightly more breathing room — premium feel).
- **Typography**: `fontWeight: 600` (down from 700), `letterSpacing: "0.18em"` (down from 0.22em), `fontSize: "12px"`. Tighter, less shouty.
- **Color**: keep `C_INK` (off-white).
- **Width**: keep `min-w-[260px] max-w-[320px]`.
- **Transitions**: `transition-all duration-300 ease-out`.

## 4. Cleanup
- Delete the `<style>` block containing `@keyframes cta-pulse-glow` and `.cta-pulse-glow:hover`. (Still used by the `showForm` submit button — verify and keep keyframes if so, just don't apply to this button. **Decision: keep the keyframes block intact since `showForm` submit still uses `cta-pulse-glow`; just remove the class from this button.**)

## Final stack (no-form branch)
```text
[ Sound like you? ]
[ silver box: Hebrew letter + snippet ]
[ OXBLOOD BUTTON: Reveal My Actual Tikkun Chart → ]   (matte, still, gold hairline)
[ Free Lunar Reading & Workbook ]                      (gold whisper, uppercase)
[ (or spin again) ]                                    (unchanged)
```

## Out of scope
- `showForm` branch and its submit button — untouched.
- No token, copy file, or data changes.
- No mobile-layout changes beyond the existing min/max width.
