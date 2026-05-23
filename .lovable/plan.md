## Goal

Restyle the `/snippet` card so its header and frame visually match the "What you receive" section on the landing page. Keep the red CTA visible above the fold.

## Header — "Sound like you?"

Match the landing "What you receive." headline exactly:
- Font: `HEAD`, `fontSize: clamp(38px, 6.5vw, 76px)`, `lineHeight: 1.1`, `letterSpacing: -0.025em`
- "Sound like" in white (`C_INK`, upright)
- "you?" in yellow (`C_GOLD`, italic) — same treatment as "receive."
- Centered, sits above the rectangle (not inside it)
- Remove the current gold gradient text-clip, italic-on-whole-phrase, and gold glow

## Rectangle — transparent, like the receive cards

Replace the current dark radial-gradient + heavy gold border + blur with the landing card recipe:
- `background: rgba(240, 200, 104, 0.06)` (faint gold tint)
- `border: 1px solid ${C_GOLD}33`
- `borderRadius: 2` (sharp, not 16px)
- Drop `backdropFilter` and the heavy `boxShadow` stack
- Padding: `clamp(1.25rem, 2.5vw, 1.75rem)` (matches landing cards)

## Inside the rectangle

- Hebrew letter centered (kept), keep the soft gold/red radial halo, size `clamp(56px, 10vw, 92px)`
- Below the letter: the italic snippet copy (unchanged styling — `BODY`, italic, `clamp(16px,1.9vw,20px)`, lh 1.7)
- No header inside the box (header now lives above it)

## Vertical budget

Bigger header eats space. To keep the red CTA above the fold at 672×530:
- Section top padding stays `clamp(1rem, 2.5vh, 1.75rem)`
- Header → rectangle gap: `clamp(0.75rem, 2vh, 1.25rem)`
- Rectangle → CTA gap: `clamp(0.9rem, 2vh, 1.4rem)` (unchanged)
- CTA → "Spin again" gap: `clamp(1rem, 2.5vh, 1.5rem)` (unchanged)
- If still tight, the header `clamp` min can be nudged down to `32px` — flag during verification.

## What stays the same

- Red rectangular CTA + glow pulse + "Free Full Birth Chart Reading" caption
- "Spin again" pill
- SkyShell background and stars
- Form state (`showForm`) flow — untouched

## Scope

Single file: `src/routes/snippet.tsx`, only the `!showForm` block (~lines 138–193). Uses existing tokens from `@/lib/landing-style` — no new tokens, no new fonts.

## Verification

Load `/snippet` at 672×530 and confirm: (a) headline reads identically in scale/treatment to landing "What you receive.", (b) rectangle is a translucent gold-tinted card matching the receive cards, (c) red CTA is fully visible without scrolling.
