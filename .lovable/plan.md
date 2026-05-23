## Concept

A rectangular "card" framed by the wheel's gold ring — except the 12 Hebrew letters are beaded along the rectangle's perimeter instead of a circle. The user's chosen letter sits at top-center, enlarged and brightened. Inside: "Sound like you?" headline + snippet copy. Below: red CTA + spin again.

Reads as "the wheel unrolled into a card."

## The card frame

- Rectangle, corner radius 16px.
- Border: 1.5px solid `#c9a84c` (gold) — wheel ring's primary stop.
- Background: `radial-gradient(120% 80% at 50% 0%, rgba(201,168,76,0.10), rgba(10,14,28,0.78) 55%, rgba(8,10,22,0.92))`.
- Outer glow: `0 30px 80px -25px rgba(0,0,0,0.7), 0 0 60px -10px rgba(201,168,76,0.18)`.
- Inner highlight: `inset 0 1px 0 rgba(255,255,255,0.05)`.
- `position: relative; overflow: visible` so letters can sit centered on the border line.

## The 12 letters along the border

- Wheel order: `["ה","ו","ז","ח","ט","י","ל","נ","ס","ע","צ","ק"]`.
- Rotate the array so the chosen letter becomes index 0.
- Distribute around the perimeter clockwise from top-center: **4 top, 2 right, 4 bottom, 2 left** = 12.
- Chosen letter is index 0 → sits at top-center.
- Edge slot positions (fraction along the edge):
  - Top: `[0.5, 0.78, ...]` — chosen at 0.5; next two right of it then wrap.
  - Concretely (clockwise from chosen): top [0.5, 0.78], right [0.33, 0.67], bottom [0.78, 0.5, 0.22] (right-to-left so order stays clockwise), bottom-left handled by left edge [0.67, 0.33], plus top [0.22] for the final wrap-around letter.
  - Final 12 slots in order: top 0.5, top 0.78, right 0.33, right 0.67, bottom 0.78, bottom 0.5, bottom 0.22, left 0.67, left 0.33, top 0.22 — that's 10. Adjust to 4-2-4-2: top [0.22, 0.5, 0.78], top extra at the wrap end — settled distribution: **top [0.18, 0.5, 0.82], right [0.5], bottom [0.82, 0.5, 0.18], left [0.5]** = 8. To hit 12 add: top [0.34, 0.66], bottom [0.66, 0.34] → final **top: 0.18, 0.34, 0.5, 0.66, 0.82 (5)**, etc. Simpler final distribution:
    - **Top: 4 slots at `[0.14, 0.38, 0.62, 0.86]`** plus chosen overlaid at `0.5` → top edge shows 5 marks but chosen sits between the inner pair (so the inner two slots become `[0.30, 0.70]` and chosen is at `0.5`). Net top = 4 default slots + chosen.
  - Cleanest final scheme: **top 4 (chosen + 3 others), right 2, bottom 4, left 2** for 12 total.
    - Top edge t-values: `[0.5 (chosen), 0.78, 0.92, 0.22]` — wait this is getting tangled.
- Practical implementation: hard-code a `SLOTS` array of 12 `{edge, t}` objects in clockwise order starting at top-center. Rotated letter array maps 1:1 onto it. Exact numbers chosen for visual balance during build (tweak in browser).
- Each letter rendered as absolutely-positioned `<span>`:
  - Font: `'Frank Ruhl Libre', serif`.
  - Default: 13px, color `#f4ecdb` (cream).
  - Every 3rd slot in original wheel order: color `#FFE9B8`, weight 500 (preserves wheel rhythm).
  - Dark plate behind each letter: `padding: 0 6px; background: #0a0e1c;` so the gold border line appears interrupted by the letter.
  - Centered on border line via transform: top edge `translate(-50%,-50%)`, bottom `translate(-50%,50%)`, left `translate(-50%,-50%)`, right `translate(50%,-50%)`.
- Chosen letter override (top-center): size 22px, color `#FFE9B8`, weight 600, glow `text-shadow: 0 0 14px rgba(240,200,104,0.7), 0 0 28px rgba(240,200,104,0.35)`, larger plate `padding: 0 10px`.

## Card padding

`padding: clamp(1.5rem, 4vw, 2rem) clamp(1.25rem, 3.5vw, 1.75rem)` — slightly extra top room for the chosen letter to breathe above the inner content.

## Inside the card

1. **"Sound like you?" headline** — HEAD italic, gold gradient text `linear-gradient(135deg, #f0d78c 0%, #c9a84c 60%, #b8923a 100%)` clipped to text, `text-shadow: 0 0 22px rgba(201,168,76,0.35)`, size `clamp(24px, 5vw, 36px)`, weight 500, line-height 1.05, letter-spacing -0.01em.
2. **Snippet copy** — BODY, color `C_INK`, size `clamp(15px, 1.7vw, 18px)`, line-height 1.55, margin-top 14px.

No Hebrew letter inside — it lives on the border at the top.

## Below the card

- Red rectangular CTA — unchanged visuals/copy/behavior. `margin-top: clamp(1rem, 2.5vh, 1.5rem)`.
- "Free Full Birth Chart Reading" caption — unchanged.
- "Spin again" pill — unchanged. `margin-top: clamp(1rem, 2.5vh, 1.5rem)`.

## Section top padding

`pt-[clamp(1rem,2.5vh,1.75rem)]` (unchanged from current).

## What stays the same

- SkyShell background + stars.
- Form branch (`showForm`) — entirely untouched.
- Red CTA + "Spin again" — unchanged.
- `TikkunWheel` component — not used here; no changes to it.

## Out of scope

- No new fonts, copy, or dependencies.
- No changes to `/spinning`, `/`, `/reading`.

## Technical notes

- Single file: `src/routes/snippet.tsx`. Replace the `!showForm` card block (~lines 141–193). Adjust margins on the CTA + spin-again wrappers (~lines 204, 228).
- Inline helpers at top of file:
  - `LETTERS = ["ה","ו","ז","ח","ט","י","ל","נ","ס","ע","צ","ק"]`
  - `SLOTS: Array<{edge: 'top'|'right'|'bottom'|'left'; t: number}>` — 12 slots in clockwise order from top-center.
  - `rotateToFront(letter)` returns the LETTERS array rotated so `letter` is at index 0.
  - For each slot, compute style based on `edge` + `t` as described.
- Uses existing tokens (`HEAD`, `BODY`, `C_INK`, `C_GOLD`, `C_DAWN`) from `@/lib/landing-style` — no new tokens.

## Verification

Load `/snippet` at 672×530:
- All 12 Hebrew letters visible along the rectangle perimeter, wheel order, chosen at top-center.
- Chosen letter unmistakably larger + brighter + glowing.
- Border line visually interrupted by each letter's dark plate.
- "Sound like you?" headline + snippet copy legible inside.
- Red CTA fully visible without scrolling.
- Form branch still renders correctly.
