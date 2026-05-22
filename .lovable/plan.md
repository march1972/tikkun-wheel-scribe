# Fix initial oversized wheel flash on mobile

## Problem
`useResponsiveWheelSize` initializes state to `max` (460px) and only computes the real size inside `useEffect` after mount. On mobile, the user sees a 460px wheel for one paint, then it snaps down to the correct ~280px — the "few seconds" of resize they noticed.

Root cause is in `src/hooks/useResponsiveWheelSize.ts`:
```ts
const [size, setSize] = useState(max);   // always starts at max
useEffect(() => { compute(); ... }, ...) // corrects after mount
```

## Change
Update `src/hooks/useResponsiveWheelSize.ts` only. Use a lazy initializer that computes the correct size synchronously on the first client render, falling back to `min` (not `max`) during SSR so hydration on small screens doesn't flash huge.

```ts
const [size, setSize] = useState(() => {
  if (typeof window === "undefined") return min;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const next = Math.min(vw * vwFraction, vh * 0.55, max);
  return Math.max(min, Math.round(next));
});
```

The existing `useEffect` resize listener stays as-is so orientation changes still work.

## Why `min` for SSR fallback
- SSR HTML is the same for all viewports; we can't know the real width.
- Starting at `min` means mobile (the failure case) renders correctly on first paint; desktop briefly shows a smaller wheel for one frame before the effect runs, which is far less jarring than the current mobile flash.
- Once mounted, the lazy initializer takes over and there is no flash at all on client navigation.

## Scope
- Only `src/hooks/useResponsiveWheelSize.ts`.
- No changes to `TikkunWheel`, `index.tsx`, `spinning.tsx`, or anything else.
