# Fix flash-of-huge-wheel on / and /spinning

The `useResponsiveWheelSize` hook initializes its `useState` with `max` (440 on home, 760 on spinning). On SSR the HTML ships with the wheel at max size; on the client it stays huge until the post-mount `useEffect` runs and re-measures. On slow hydrations it can even appear to get stuck.

## Fix

`src/hooks/useResponsiveWheelSize.ts`:

- Replace the bare `useState(max)` with a lazy initializer that computes the real size synchronously when `window` is available, and falls back to `min` (not `max`) during SSR. This way the first client paint already has the correct size, and the SSR/no-window fallback is small (better to grow than to shrink-from-giant).

```ts
const [size, setSize] = useState(() => {
  if (typeof window === "undefined") return min;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const next = Math.min(vw * vwFraction, vh * 0.5, max);
  return Math.max(min, Math.round(next));
});
```

The existing `useEffect` resize listener stays — it just no longer has to correct an oversized first paint.

That's the whole change. No other files affected.
