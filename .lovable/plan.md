Make the "Spread the Light" share section on `/reading` feel like a luminous, full-width call-to-action. Keep the current internal order (TikkunWheel → heading → sub-copy → share buttons) exactly as-is.

### What will change

1. **Full-width container**  
   Remove the `maxWidth: 640px` and center-margin constraints so the gold-tinted block spans the full viewport width. Keep comfortable horizontal padding so text and buttons don't touch the edges, and let the share pill row wrap naturally on narrow screens.

2. **Much more luminous background**  
   Replace the current very subtle gradient (`rgba(245,200,104,0.05) → 0.015`) with a noticeably brighter, lighter treatment so the block clearly stands out from the dark page:
   - Raise the gold tint opacity (e.g. ~`0.14` at the center fading to ~`0.04` at the edges).
   - Add a soft radial glow centered behind the wheel to give the block a true "light" feel.
   - Strengthen the top/bottom hairline borders slightly so the luminous edge is crisp.
   - Optional subtle outer glow (`box-shadow`) in warm gold to lift it off surrounding content.

3. **Spacing polish for the wider block**  
   Increase vertical padding (`clamp(2.5rem, 6vh, 4rem)`) so the full-width band breathes. Keep all content centered as it is today.

### Explicitly NOT changing
- Internal order stays: TikkunWheel (top) → "Spread the Light" heading → sub-copy → share buttons.
- TikkunWheel component itself, share button logic, URLs, and copy text.
- Any other section of the page.

### Files to edit
- `src/routes/reading.tsx` — the "Share / Spread the Light" `Reveal` block (around lines 393–510).