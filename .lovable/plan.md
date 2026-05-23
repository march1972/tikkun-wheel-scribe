Scope: `src/routes/snippet.tsx` only, `!showForm` block (lines ~140–290) plus the pulse-glow keyframes. No new tokens, no new files, no copy file edits (CTA copy hardcoded inline since `copy.primaryButton` is shared).

## A — CTA copy + trust micro-line
- **Replace the gold kicker** ("Your Free Full Birth Chart Reading") entirely. Value prop moves *into* the button.
- **New CTA label** (hardcoded, overrides `copy.primaryButton` for this screen): `Get My Free Birth Chart` + `→`. One clear promise, action verb, possessive ("My") for ownership framing.
- **Add trust micro-line directly under the CTA**, above `(or spin again)`:
  - Text: `Free · No card needed · 60 seconds`
  - Style: `fontFamily: BODY`, `color: C_MUTED`, `fontSize: "10px"`, `letterSpacing: "0.16em"`, `fontWeight: 500`, `mt-3`, uppercase via inline `textTransform`.

## B — Consolidate kicker into CTA
- Remove the `<p>` gold kicker block (lines 216–228).
- CTA now sits directly under the silver box with `mt-[clamp(1.4rem,3.2vh,2rem)]` (inherits the kicker's old top margin).
- Order becomes: silver box → CTA → trust line → `(or spin again)`.

## C — Polish pass
1. **CTA radius**: `borderRadius: "0px"` → `"3px"`. Keeps architectural feel, removes brittleness.
2. **Warmer hover**: extend pulse-glow CSS — on `:hover` apply `background: linear-gradient(135deg, #ff4d5c 0%, #d11e2b 100%)` (warmer, hotter red) via a new `.cta-pulse-glow:hover` rule. Keep existing `hover:scale-[1.02]` and `hover:brightness-110`.
3. **Snippet hierarchy**: reduce snippet `<p>` (line 194–207) `fontSize` from `clamp(16px,1.9vw,20px)` → `clamp(15px,1.7vw,18px)`, `lineHeight` 1.7 → 1.6. CTA stack wins the page.
4. **Letter inner glow tie-in**: the radial gradient behind the Hebrew letter (line 178) already uses `C_DAWN`. Bump its intensity slightly — `${C_GOLD}40` → `${C_GOLD}55`, `${C_DAWN}20` → `${C_DAWN}35`. Ties silver box to red CTA via shared warm undertone.
5. **Mobile-friendly CTA width**: `w-[280px]` → `min-w-[260px] max-w-[320px] w-auto`, add horizontal padding buffer (keep `padding: "18px 32px"`).

## Final vertical stack
```text
[ Sound like you? ]
[ silver box: Hebrew letter (warmer glow) + smaller snippet ]
[ RED CTA: "Get My Free Birth Chart →" ]   (3px radius, hot-red hover)
[ Free · No card needed · 60 seconds ]      (muted micro-trust)
[ (or spin again) ]                          (only if canSpinAgain)
```

## Out of scope
- `showForm` branch untouched.
- No changes to `src/lib/tikkun-data.ts` or `STATIC_COPY` — CTA label override is local to this screen.
- No new design tokens.
