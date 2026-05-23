## Goal

Refine the `/snippet` card so the excerpt frame reads as a precious, silver-leaf artifact — and tighten the vertical rhythm so the eye flows letter → words → CTA with intent.

## Box — silver, not gold

Swap the faint gold tint for a cool silver treatment:
- `background: rgba(220, 228, 240, 0.05)` (very faint cool tint, almost glass)
- `border: 1px solid rgba(220, 228, 240, 0.28)` (silver, ~2x stronger than the gold 0x33 was — silver needs more presence on dark sky to not vanish)
- Subtle inner highlight via `boxShadow: inset 0 1px 0 rgba(255,255,255,0.06)` so the top edge catches light (a lead-gen polish move — frames the content as a "card object")
- Keep `borderRadius: 2`, padding unchanged

Rationale: silver reads cooler/more sacred against the indigo sky than gold, and it stops competing with the gold "you?" in the headline. The headline owns the warm accent; the box becomes a quiet vessel.

## Hebrew letter — nudge up

- Reduce top padding inside the box OR pull the letter container up with negative `marginTop: clamp(-6px, -1vh, -10px)`
- Trim the letter container `minHeight` from `clamp(60px,11vw,100px)` → `clamp(52px, 9.5vw, 88px)` so the letter sits higher and closer to the headline gravitationally
- Halo stays, but reduce halo size ~10% so it doesn't fill the freed space

Rationale: with a silver frame the letter feels like a relic in a reliquary — it should sit near the top third, not centered. Classic museum-label composition.

## CTA — nudge down

- Increase `mt-[clamp(0.9rem,2vh,1.4rem)]` → `mt-[clamp(1.4rem, 3.2vh, 2rem)]`
- Creates a clear "pause" between the artifact (box) and the action (CTA) — separates contemplation from decision

Rationale (UX): in lead-gen, the CTA needs a visual moat. When it's too close to content above, users scan past it. A larger gap + the existing pulse glow makes it feel like a deliberate next step, not a footer to the box.

## Verification

Load `/snippet` at 672×530:
- Box reads as silver/glass, not gold
- Hebrew letter sits visibly higher in the box (top third, not center)
- Red CTA has clear breathing room above it but still fully visible above the fold
- "Spin again" pill remains visible

## Scope

Single file: `src/routes/snippet.tsx`, only the `!showForm` block. No new tokens.
