# Right-size the home hero so the CTA sits above the fold

Bring the homepage hero down a notch and tighten the wheel so the paragraph and CTA aren't pushed below the fold on shorter screens.

## What changes

`src/routes/index.tsx` — hero section only:

- Line 306, hero `<h1>` font size:
  `clamp(48px, 9vw, 112px)` → `clamp(40px, 6.5vw, 84px)`
- Line 281, hero `<section>` bottom padding:
  `pb-[clamp(3rem,6vh,5rem)]` → `pb-[clamp(2rem,4vh,3.5rem)]`
- Line 336, paragraph top margin:
  `mt-[clamp(3.25rem,6.5vh,5rem)]` → `mt-[clamp(1.5rem,3vh,2.25rem)]`

`src/routes/index.tsx` — wheel sizing hook call:

- Find the `useResponsiveWheelSize(...)` call on the home page and shrink it. Default currently is `(0.8, 240, 420)` with a `vh * 0.55` internal cap. Pass tighter args:
  `useResponsiveWheelSize(0.72, 240, 360)` and also drop the internal vh cap to 45%.

`src/hooks/useResponsiveWheelSize.ts`:

- Change `vh * 0.55` → `vh * 0.45` so the wheel respects shorter viewports across every page that uses the hook.

Nothing else touched. Other pages' headers stay as-is (already correctly sized).
