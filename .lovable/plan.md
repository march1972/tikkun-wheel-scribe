## Goal
Make the background on `/spinning` visually identical to `/` in the hero area.

## Why they look different today
- Same `C_SKY_GRAD` string, but it's applied to `<main className="min-h-screen">` on both pages. Page heights differ, so the 180° gradient stretches over different total heights and the visible color at any scroll position differs.
- `/` has a warm gold/dawn radial-halo `<div>` behind the wheel (`haloRef`). `/spinning` has no halo, only the wheel's drop-shadow.

## Changes

### 1. Lock the sky gradient to the viewport (both pages)
Move the gradient from the scrolling `<main>` to a `fixed inset-0` layer sized to the viewport, so the gradient progression `#0c1426 → #324468` always spans exactly 100vh and renders identically regardless of page length.

- `src/components/landing/SkyShell.tsx`: replace the `style={{ background: C_SKY_GRAD }}` on `<main>` with a `<div className="fixed inset-0 -z-10" style={{ background: C_SKY_GRAD }} />` rendered before content. Keep `<main className="relative min-h-screen overflow-hidden">` for layout.
- `src/routes/index.tsx`: same treatment on its `<main>` (lines 252–256) — move `background: C_SKY_GRAD` onto a `fixed inset-0 -z-10` div, keep `StarField` and content layered above.

StarField stays absolutely positioned inside each `<main>` as today (so stars still scroll with content; only the base gradient is viewport-locked, matching what the user sees at any one moment).

### 2. Add the gold halo behind the wheel on /spinning
Copy the halo block from `src/routes/index.tsx` (lines 280–296) into `src/routes/spinning.tsx` inside the centered hero `<div>`, just before the `<h1>`. Drop the `ref={haloRef}` (spinning has no parallax handler) but keep all visual styles identical:

```tsx
<div
  aria-hidden
  style={{
    position: "absolute",
    top: "50%", left: "50%",
    transform: "translate(-50%, -50%)",
    width: "clamp(360px, 70vw, 680px)",
    height: "clamp(360px, 70vw, 680px)",
    background: `radial-gradient(circle, ${C_GOLD}33 0%, ${C_DAWN}1f 40%, transparent 70%)`,
    filter: "blur(10px)",
    pointerEvents: "none",
    zIndex: 0,
  }}
/>
```

Add `C_GOLD` to the `@/lib/landing-style` import in `spinning.tsx`. Ensure the parent `<div>` is `relative` (it already is via the section/flex wrapper; add `relative` to the inner centered div if needed) and the `<h1>` + wheel wrapper get `position: relative` so they sit above the halo.

## Files touched
- `src/components/landing/SkyShell.tsx`
- `src/routes/index.tsx`
- `src/routes/spinning.tsx`

## Out of scope
No changes to wheel size, copy, header text, fonts, or any other route.