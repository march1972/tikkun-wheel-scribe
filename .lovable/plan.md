## Changes to `src/routes/reading.tsx`

### 1. Remove the rule above "THE KABBALAH CIRCLE"
The faint line sitting on top of the share buttons comes from `borderTop: 1px solid C_RULE_SOFT` on the Newsletter `<section>` (line 452). Remove that `borderTop` so nothing draws between the share block and the newsletter.

### 2. Make "Spread the Light" feel like its own block
Wrap the Share `<Reveal>` in a distinct panel so it visually separates from the surrounding sections:
- Soft dawn-tinted background: `background: linear-gradient(180deg, rgba(245,200,104,0.04), rgba(245,200,104,0.015))`
- Hairline borders top + bottom using `C_RULE_SOFT` (replaces the standalone `<Hairline />` above it, so no double rules)
- Rounded inner card with generous padding
- Center-align the section label, subhead, wheel image, and share buttons (currently left-aligned)
- Tighten max width so it reads as a self-contained CTA card

### 3. Add a small static Tikkun Wheel image
Import the existing `TikkunWheel` component from `src/components/TikkunWheel.tsx` and render a small, non-interactive instance (~140–160px) centered above the "Spread the Light" label inside the new card. This breaks up the page rhythm and ties the share CTA back to the home wheel.

If `TikkunWheel` doesn't support a non-spinning/static prop, render it inside a wrapper with `pointer-events: none` and a fixed small size via `useResponsiveWheelSize` override (or simple inline width/height). I'll verify on implementation; fallback is a decorative SVG-style circle of the 12 letters.

### 4. Typography & layout polish in the Spread the Light block
- Section label kept gold/uppercase, centered
- Subhead ("Share the Tikkun Wheel with friends…") centered, slightly larger (`16px`, italic-leaning), max-width ~28rem
- Share pills centered with `justify-center`, a touch more vertical spacing above them
- Remove the redundant `<Hairline />` that currently sits at line 392 (replaced by the card's own top border)

### Visual structure after changes

```text
… Daily Mantra …
                      (no hairline)
┌─ soft tinted card, hairline top + bottom ──────────┐
│            ◯  small Tikkun Wheel                   │
│            SPREAD THE LIGHT                        │
│   Share the Tikkun Wheel with friends…             │
│        [WhatsApp] [Instagram] [Copy link]          │
└────────────────────────────────────────────────────┘
                      (no hairline)
THE KABBALAH CIRCLE …
```

### Files touched
- `src/routes/reading.tsx` — restructure Share section, remove borderTop on newsletter, import `TikkunWheel`.

No copy changes, no other routes affected.
