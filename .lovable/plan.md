# CTA refinement: gold invitation, matte-red commitment

Pattern: **Gold = invitation. Red = commitment.** One of each per page, treated with restraint. Red stays as an accent color (Hebrew letters, italicized words) — untouched.

## 1. `/` hero "Who you are" → GOLD
First impression. Swap the local red `PrimaryCTA` usage at line 356 of `src/routes/index.tsx` to use the shared gold component from `@/components/landing/PrimaryCTA` (variant `gold`, default).

## 2. `/` bottom "Receive your reading" → MATTE OXBLOOD
Line 618 of `src/routes/index.tsx`. Currently uses the shared gold `PrimaryCTA`. Replace with the same matte-oxblood treatment we used on `/snippet`:
- Background: solid `#5c1a24`, hover `#6b1f2b`
- Border: `1px solid rgba(240,200,104,0.35)` (gold hairline)
- Shadow: `0 8px 24px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)`; hover bumps to `0 12px 32px -12px rgba(92,26,36,0.55)`
- `borderRadius: 3px`, `padding: 20px 36px`, `fontWeight: 600`, `letterSpacing: 0.18em`, `fontSize: 12px`
- Hover: `translate-y-[-1px]` only — no scale, no brightness, no glow

## 3. `/form` submit "Reveal my Tikkun" → MATTE OXBLOOD
`src/routes/snippet.tsx`, the `showForm` branch submit button (currently uses `cta-pulse-glow` with the saturated red gradient). Replace with the same matte-oxblood treatment as above. Keep the `busy` disabled state ("Revealing…") and the arrow.

## 4. Kill `cta-pulse-glow` entirely
With both red buttons converted, the `<style>` block in `src/routes/snippet.tsx` containing `@keyframes cta-pulse-glow` and `.cta-pulse-glow:hover` becomes dead code. Delete the entire block.

## 5. Local red `PrimaryCTA` in `src/routes/index.tsx`
After step 1 (hero → gold) and step 2 (bottom → matte oxblood), the local red `PrimaryCTA` function at line 173 has zero call sites. Delete the function.

## Out of scope
- `C_DAWN` as an accent color (Hebrew letters, italicized "Tikkun" / "Abraham" / "free will" / "Influence") — **stays red, untouched**. That's where red is doing sacred work, not sales work.
- The shared `PrimaryCTA` component at `src/components/landing/PrimaryCTA.tsx` — untouched (still supports gold + dawn variants for future use).
- `/snippet` teaser CTA — already gold from previous turn, untouched.
- No copy changes on `/` or `/form`.

## Final state per page

```text
/  (home)
  hero            → GOLD   "Who you are →"           (invitation)
  bottom          → OXBLOOD "Receive your reading →"  (commitment)
  accent reds     → unchanged (Hebrew letters, italics)

/snippet  (teaser)
  CTA             → GOLD   "Reveal My Actual Chart"   (already done)

/form → /snippet (form mode)
  submit          → OXBLOOD "Reveal my Tikkun →"      (commitment)
```
