# Fix: /reading body sections feel cut off on the right on iPhone 15 Pro Max

## Problem
On iPhone 15 Pro Max (430 CSS px viewport), the long-form body sections on `/reading` — "Your Soul's Shadow Patterns", "Shadow Archetype", "Your Spiritual Work (Tikkun)", "Your Tikkun Letter" — read as off-center: the paragraphs sit flush against the right edge with almost no breathing room, so the rightmost word on each line looks clipped even when it technically fits.

## Cause
In `src/routes/reading.tsx`, the shared `Column` wrapper uses:

```ts
paddingLeft:  "clamp(1.25rem, 5vw, 2rem)"
paddingRight: "clamp(1.25rem, 5vw, 2rem)"
```

At 430px viewport that resolves to ~21px each side. Combined with 15px body copy in Frank Ruhl Libre / system serif, lines run ~387px wide and end right at the gutter. On real iOS Safari the metrics push the final glyphs even closer to the edge, which reads as "not centered / cut off on the right". The hero, share, and newsletter sections use the same `5vw` pattern but have shorter or centered text so they don't trip this perception.

## Change
Single file: `src/routes/reading.tsx`. Increase horizontal gutters and prevent any long word from sitting flush at the edge.

1. `Column` component (used by every affected body section):
   - Change both `paddingLeft` and `paddingRight` to `clamp(1.5rem, 7vw, 2.25rem)` so the mobile gutter grows from ~21px → ~30px on a 430px viewport while desktop stays unchanged.
   - Honor the device safe area by wrapping each with `max(...)` against `env(safe-area-inset-left)` / `env(safe-area-inset-right)`.

2. `Body` paragraph style and the Shadow Archetype lines (lines 88–110 and 357–369) and the Tikkun Letter paragraphs (lines 402–411): add `overflowWrap: "anywhere"` (and `hyphens: "auto"`) so a stray long token can't push flush against the edge.

3. Hero `<section>` at line 245 — bump its `px-[clamp(1.25rem,5vw,3rem)]` to `px-[clamp(1.5rem,7vw,3rem)]` for visual parity so the hero, body, and newsletter all share the same mobile gutter.

No copy, font, color, layout structure, or behavior changes. No edits outside `src/routes/reading.tsx`.

## Verification
- Re-run the headless mobile capture at 430×932 and scroll through `/reading?sign=aries`. Confirm every body paragraph has ≥28px right gutter and no word sits within 6px of the viewport edge.
- Spot-check 360px (smaller Android) and 768px+ (tablet/desktop) so desktop layout is unchanged.
- Confirm `documentElement.scrollWidth === window.innerWidth` still holds (no new horizontal overflow from the larger padding).

## Out of scope
- The wheel-centering issue from the previous turn.
- Any restyling of the share card or newsletter form.
- Other routes (`/`, `/snippet`, `/spinning`, etc.).
