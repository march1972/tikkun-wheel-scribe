# Make /reading feel inspirational, luminous, and centered

The page today reads like a long dim scroll: same dark band repeating, eyebrows + paragraphs stacked at the same rhythm, the hero letter is left-of-center, and the "Kabbalah Astrology" tag in the header sits flush-left. It lacks a "wow" moment and the visual contrast a reveal deserves.

## Goals
- Center "Kabbalah Astrology" header chip (site-wide via SkyShell, not just /reading).
- Turn the reveal hero into a real moment — bigger Hebrew letter, glow halo, soft animation on mount.
- Lift the palette: warmer cream ink, brighter gold accents, dawn-rose highlights, more luminous gradients between bands. Keep the night-sky DNA but add light.
- Rebalance type scale: tighter hierarchy between eyebrows, headings, mantras, and body. Mantras and section names should sing; body should breathe.
- Break the monotony of identical bands: alternate dark / luminous / dark, vary inner composition (centered prose, two-column letter teaching, full-bleed mantra card), add ornamental hairlines and a small celestial divider glyph.
- Give the page a clear emotional arc: Arrival → Pattern → Archetype → Work → Letter → Mantra → Reflection → Share → Deeper.

## What changes (visual only, zero copy edits)

1. Site header (`SkyShell.tsx`)
   - Center the "Kabbalah Astrology" eyebrow horizontally. Slightly brighter color so it's legible without shouting.

2. Reading hero
   - Center the Hebrew letter + label + sign as a true stacked composition (letter on top, label below, sign italic underneath) instead of inline baseline row.
   - Add a soft radial glow halo behind the letter (dawn-rose + gold mix), gentle fade-in.
   - Add a thin gold hairline + small star/asterisk glyph above and below the mantra quote — turns the blockquote into a framed "first light" moment.
   - Tighten top padding; add more breathing room around the mantra.

3. Band rhythm
   - Alternate three band treatments instead of two: deep night, mid-lift (current), and a new "dawn lift" band with a warm radial highlight (subtle peach/gold center) for Archetype and Daily Mantra. Creates light/dark cadence.
   - Insert a tiny centered celestial divider (✦ or hairline + dot + hairline) between bands so the page reads as movement, not repetition.

4. Section headers
   - Add a centered hairline above each eyebrow label and a small numeral (I–VIII) in gold serif to give chapter feel.

5. Mantra & Archetype emphasis
   - Daily Mantra: render inside a softly-bordered card with gold corner accents, larger serif italic (clamp 24–34px), letter-spacing tightened. Make it the visual peak.
   - Archetype lines: increase size and add generous line gap; treat each line as its own stanza.

6. Letter teaching block
   - Two-column on desktop: oversized Hebrew letter + name on the left, teaching paragraph on the right; stacks centered on mobile. Breaks the all-centered monotony.

7. Reflection
   - Render the prompt inside a quiet rounded panel with a subtle inner gold rule, italic serif intro mark.

8. Share row
   - Lighter pill buttons with gold hover state; add a tiny share icon (inline SVG) before each label for warmth.

9. "Go deeper" closing
   - Slightly larger Fraunces headline above the CTA, dawn-rose accent on a single word feel via existing gold/dawn tokens; more vertical space so the CTA lands as a finale, not a footer.

10. Palette lift (tokens in `landing-style.ts`)
    - Brighten C_INK_SOFT a touch; introduce one new band gradient `C_BAND_DAWN` (warm peach-gold radial over deep navy). No new font, no new component library.

## Out of scope
- No copy / content changes.
- No routing or data changes.
- No new dependencies. Animations done with CSS or existing framer-motion if already installed; otherwise pure CSS keyframes.

## Files touched
- `src/components/landing/SkyShell.tsx` — center header chip.
- `src/lib/landing-style.ts` — add `C_BAND_DAWN`, slightly warmer ink.
- `src/routes/reading.tsx` — hero composition, band alternation, dividers, numerals, mantra card, two-column letter block, reflection panel, share pills, closing spacing.

## QA
Screenshot /reading at 390 and 1366 after changes; confirm:
- Header chip centered site-wide.
- Clear light/dark band cadence.
- Mantra reads as the page's emotional peak.
- Body text still matches /terms (15px / 1.7).
- Mobile layout stacks cleanly with no horizontal scroll.
