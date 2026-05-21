# History + Landing polish

Two surgical changes. No copy edits anywhere.

## 1. `/history` — remove "A Brief History" eyebrow

Delete the hairline-flanked "A Brief History" pill above the hero headline (the `hist-fade` block, lines 89–100 of `src/routes/history.tsx`). The H1 "Ancient roots, living work." becomes the first element in the hero. Remove its `mt-[clamp(2rem,4vh,3rem)]` top margin so it sits naturally below the shell header.

Nothing else on `/history` changes — halo, prose, pull quote, newsletter, footer all stay.

## 2. `/` — same scroll-life treatment as `/reading` and `/history`

No content, copy, ordering, palette, or layout changes. Add only the two motion patterns the other two pages use:

a. **Scroll-reveal fades.** Import `Reveal` from `@/components/landing/Reveal` and wrap the headings + body paragraphs of each existing section so they fade up as they enter the viewport:
   - "What you receive" — heading, then each of the 3 list items with staggered delays (0 / 120 / 240ms)
   - "Ancient roots" — heading + paragraph (stagger 0 / 140ms)
   - "Influence, not prediction" — heading + paragraph (stagger 0 / 140ms)
   - "A greater purpose." — heading + paragraph + SefirotTree (stagger 0 / 140 / 280ms)
   - "Who you are." closing — heading + paragraph + CTA (stagger 0 / 140 / 280ms)

   Hero block (H1, wheel, intro paragraph, CTA) is **not** wrapped — it's above the fold and should appear immediately.

b. **Scroll-linked hero halo drift.** Add a soft radial halo behind the TikkunWheel (same `radial-gradient(circle, C_GOLD33 → C_DAWN1f → transparent)` recipe as `/history`), positioned absolutely behind the wheel. A `useEffect` with rAF-throttled scroll listener translates it upward at 0.3× scrollY. Respects `prefers-reduced-motion`.

All existing structure, StarField instances, copy, colors, band gradients, and the footer stay byte-identical.

## Files

- `src/routes/history.tsx` — remove eyebrow block.
- `src/routes/index.tsx` — add Reveal wraps + halo + scroll effect.

## Out of scope

No new routes, no new components, no dependency changes, no copy edits, no changes to `/reading`, `SkyShell`, `PrimaryCTA`, `Reveal`, or any shared module.
