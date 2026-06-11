## Goal
Make the vertical rhythm between every section on `/reading` consistent and responsive — no more mix of `<Hairline>` margins, ad-hoc `py-[...]` on sections, and bespoke `marginTop/marginBottom` on the share card.

## Current inconsistencies (src/routes/reading.tsx)

- `<Hairline>` uses `margin: clamp(3rem,6vh,5rem) auto` between most sections.
- The Daily Mantra `<section>` uses `py-[clamp(3rem,6vh,5rem)]` — but it has no preceding `<Hairline>`, so the gap above it is just its own top padding (smaller than the gaps elsewhere).
- The Share / "Spread the Light" block uses its own `marginTop`/`marginBottom: clamp(3rem,6vh,5rem)` AND has its own internal `padding: clamp(2.5rem,6vh,4rem) ...` — so the gap before/after it visually doubles next to neighbors.
- The Newsletter `<section>` uses `py-[clamp(5rem,10vh,8rem)]` — roughly 2× the rhythm of every other section, so it feels detached.
- Hero uses `pt-[clamp(1rem,3vh,2rem)] pb-[clamp(2rem,5vh,4rem)]` and is then followed by a `<Hairline>` — stacking two different spacing systems.

Net effect: gaps range from ~2rem to ~8rem on mobile depending on which two sections meet, which is what the user is seeing.

## Plan

1. **Define one spacing token** at the top of `reading.tsx`:
   ```ts
   const SECTION_GAP = "clamp(3rem, 6vh, 5rem)"; // single source of truth
   ```

2. **Standardize `<Hairline>`** to use `SECTION_GAP` as its default `my` (it already does, just make it explicit/shared).

3. **Remove bespoke vertical padding from `<section>` wrappers**; let the `<Hairline>` (or a `<SectionSpacer>` when no rule is shown) own the gap. Concretely:
   - Hero `<section>`: keep `pt` (top of page breathing room) but drop the custom `pb`; the following `<Hairline>` provides the gap.
   - Daily Mantra `<section>`: change `py-[clamp(3rem,6vh,5rem)]` → `py-0`, and add a `<Hairline />` before it (matches every other section transition).
   - Share block: remove its outer `marginTop` / `marginBottom`; wrap it between two `<Hairline />`s (or a `<SectionSpacer />` if we want no rule line above/below it). Keep its internal padding as the card's own inset, not as section gap.
   - Newsletter `<section>`: change `py-[clamp(5rem,10vh,8rem)]` → `py-[clamp(3rem,6vh,5rem)]` so its rhythm matches everything else; add a `<Hairline />` before it.

4. **Add a `<SectionSpacer />` helper** (1px-tall, transparent, `margin: SECTION_GAP auto`) for the two places where we want the uniform gap but no visible gold rule (around the Share card, above the Newsletter if we'd rather not show another hairline there).

5. **Column padding**: confirm `<Column>` keeps its horizontal `clamp(1.25rem,5vw,2rem)`. No change needed — only vertical rhythm is off.

## Result

Every section-to-section gap on mobile and desktop is exactly `clamp(3rem, 6vh, 5rem)`, regardless of whether the boundary shows a hairline, the share card, or the newsletter. No section owns its own vertical padding anymore — spacing is decided by one token in one place.

## Files touched

- `src/routes/reading.tsx` only.
