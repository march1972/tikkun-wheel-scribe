# Plan: Tighten `/snippet` form layout & polish legal copy

## Changes (all in `src/routes/snippet.tsx`)

1. **Update legal copy text**
   - From: `Email used for full Tikkun Birth Chart.`
   - To: `Birth date and email for full Tikkun Birth Chart.`

2. **Darken legal copy** — currently `color: C_INK` (bright). Drop to a dimmer muted tone (e.g. `rgba(236,227,207,0.55)`) and reduce size to ~12px so it reads as fine print. T&Cs link stays muted/underlined, slightly smaller still.

3. **Constrain form width for better UX** — standard single-column lead/auth form width is ~360–400px. Wrap the `<form>` plus the legal `<p>` in a centered container with `maxWidth: 380px` and `margin: 0 auto`. The outer heading stays full-width.

4. **Match red CTA button width to inputs** — button currently `w-full` inside the wider section. Once the form is constrained to 380px, the button auto-matches input width (both fill the 380px column). Keep its existing styling (oxblood, square, 0.28em tracking).

## Files
- `src/routes/snippet.tsx` only.