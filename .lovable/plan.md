## Goal

Make the snippet card feel like a sibling to the Tikkun wheel — warm gold rim, soft inner glow, dark celestial body — while shrinking vertical rhythm so the red CTA stays above the fold. **"Sound like you?" is the hero of the card** — bigger, brighter, unmistakably the headline.

## "Sound like you?" — the star

Promote it from eyebrow chip → headline:
- Font: switch from `BODY` to `HEAD` (display serif, same as "Reveal your Tikkun"), italic for personality.
- Size: `clamp(26px, 5.2vw, 38px)` (was 10–13px).
- Color: warm gold gradient — `linear-gradient(135deg, #f0d78c 0%, #c9a84c 60%, #b8923a 100%)` clipped to text (`background-clip: text`), with a soft glow `text-shadow: 0 0 22px rgba(201,168,76,0.35)`.
- Weight 500, letter-spacing `-0.01em`, line-height 1.05.
- Remove the uppercase + 0.22em tracking — let it breathe as a phrase, not a label.
- Drop the side hairlines (no longer needs framing — the type does the work).
- Sits at the top of the card with a tight margin below.

## Card frame (wheel-like)

- Background: `radial-gradient(120% 80% at 50% 0%, rgba(201,168,76,0.10), rgba(10,14,28,0.78) 55%, rgba(8,10,22,0.92))`
- Border: `1px solid rgba(201,168,76,0.45)` (gold, matching wheel rim)
- Shadow: `0 30px 80px -25px rgba(0,0,0,0.7), 0 0 60px -10px rgba(201,168,76,0.18), inset 0 1px 0 rgba(255,255,255,0.05)`
- Corner radius: 16px
- Faint radial gold halo behind the Hebrew letter (mirrors the wheel's center glow).

## Hebrew letter

- Shrink one notch: `clamp(56px, 10vw, 92px)` (was 72–120). Frees vertical space.
- Subtle gold radial halo behind it (~140% of letter size).

## Snippet copy

- Slightly tighter: `clamp(15px, 1.7vw, 18px)`, line-height 1.55 (was 17–21 / 1.7).
- Color stays `C_INK`.

## Spacing (vertical budget — must keep red CTA visible)

- Card padding: `clamp(1.1rem, 3vw, 1.75rem)` (was 1.75–2.75rem).
- "Sound like you?" → Hebrew letter: ~12px.
- Hebrew letter → snippet copy: ~10px.
- Card → CTA gap: `clamp(0.9rem, 2vh, 1.4rem)`.
- CTA → "Spin again" gap: `clamp(1rem, 2.5vh, 1.5rem)`.
- Outer section top padding: `clamp(1rem, 2.5vh, 1.75rem)`.

## What stays the same

- Red rectangular CTA (size, glow pulse, copy) — untouched.
- "Free Full Birth Chart Reading" caption — untouched.
- "Spin again" pill — untouched.
- Background (SkyShell, stars) — untouched.
- Form state (`showForm`) — untouched.

## Out of scope

- No new fonts, no new copy, no new dependencies.
- No changes to /spinning, /reading, or the homepage.

## Technical notes

- Single file: `src/routes/snippet.tsx`, only the `!showForm` card block (lines ~140–193), wrapper section padding (line 139), CTA gap (line 204), "Spin again" gap (line 228).
- Uses existing tokens `C_GOLD`, `C_DAWN`, `C_INK`, `C_RULE`, `HEAD`, `BODY` from `@/lib/landing-style` — no new tokens.

## Verification

Load `/snippet` at 672×530, confirm: (a) "Sound like you?" reads as the unmistakable headline of the card, (b) the card visually rhymes with the wheel, (c) the red CTA is visible without scrolling.
