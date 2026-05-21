# Dial hero + wheel back up — middle ground

Split the difference between the previous oversized values and the recent too-small values.

## What changes

`src/routes/index.tsx`:

- Line 213, wheel hook call:
  `useResponsiveWheelSize(0.72, 240, 360)` → `useResponsiveWheelSize(0.85, 280, 440)`
- Line 306, hero `<h1>` font size:
  `clamp(40px, 6.5vw, 84px)` → `clamp(44px, 7.5vw, 96px)`

`src/hooks/useResponsiveWheelSize.ts`:

- Line 20, internal vh cap:
  `vh * 0.45` → `vh * 0.5` (between the original 0.55 and the recent 0.45).

Paragraph margin and section padding stay at their tightened values so the CTA remains close to the wheel.
