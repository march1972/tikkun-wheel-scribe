# Resize home page Tikkun wheel

## Problem
On the home page (`src/routes/index.tsx` line 213), the wheel is sized with:
```ts
const wheelSize = useResponsiveWheelSize(1.1, 380, 760);
```
That asks for **110% of viewport width** with a **380px minimum**, so on any phone narrower than ~380px the wheel hangs off both edges, and even on a 414px phone it spans edge-to-edge with no breathing room.

## Change
Update only that one call on the home page:
```ts
const wheelSize = useResponsiveWheelSize(0.72, 220, 460);
```
- `0.72` → wheel takes ~72% of viewport width (always leaves comfortable side margin)
- `220` min → safe on the smallest phones (320px wide)
- `460` max → still a strong hero on desktop, but not oversized

The hook already caps height at `vh * 0.55`, so short screens stay safe too.

## Scope
- Only `src/routes/index.tsx` line 213.
- No changes to `TikkunWheel`, the hook itself, the spinning page, copy, layout, or anything else.

## Out of scope
Wheel sizes on `/spinning` and other routes stay as-is unless you ask.
