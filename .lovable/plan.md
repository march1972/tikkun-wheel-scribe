# Stabilize the home → spinning → snippet wheel flow

## Audit findings

- The wheel size jump is caused by `useResponsiveWheelSize` returning the desktop max size during SSR/first render, then shrinking on the client after `useEffect` runs. On iPhone-sized viewports this creates a visible “huge wheel → actual wheel” layout shift.
- The spinning page uses a different, much larger wheel sizing range than home (`380–760` vs `280–440`), so the flow feels inconsistent and oversized on mobile.
- The home page and `SkyShell` duplicate starfield/header/background code. Home also defines its own `StarField` instead of using the shared component, adding excess DOM and making the first route heavier.
- The home page renders very high star counts across the full page, and the measured mobile preview shows poor CLS, high style recalculation, and many DOM nodes before/around the click.
- Click handling currently allows repeated taps while navigation is beginning. If the route chunk is still loading on mobile, this can feel like a stutter or failed click.
- `/spinning` starts with no target until `useEffect` reads session storage. That means the wheel can mount before the target is available, then re-render and start the spin after the page is already visible.
- `/spinning` waits for the wheel’s internal timeout before going to `/snippet`; if animation/timer cleanup is interrupted or target state is late, the user can remain on the spinning page.
- Root error/not-found handling currently redirects to `/` with `window.location.replace`, which is heavy and can mask flow errors as “back to home.”

## Recommended fix

1. **Make wheel sizing deterministic on first paint**
   - Replace the SSR-first `max` return in `useResponsiveWheelSize` with a stable mobile-safe initial size.
   - Use the same sizing bounds for home and spinning so refreshes and route changes never show the wheel huge first.
   - For iPhone 16/mobile, keep the wheel at one stable size from first paint through hydration.

2. **Simplify and lock the home click path**
   - Add a small `isStarting` guard on home so wheel/CTA taps only fire once.
   - Save the selected target synchronously, then immediately navigate to `/spinning`.
   - Use `replace: true` only if we want to prevent accidental back-navigation into an already-started home click state; otherwise keep normal history.

3. **Make `/spinning` target available immediately**
   - Initialize target state directly from `sessionStorage` instead of waiting for an effect.
   - If there is no valid target, create one rather than bouncing back to home.
   - Add a route-level fallback timer that navigates to `/snippet` after the expected spin duration even if the wheel callback does not fire.

4. **Reduce wheel animation and page-render excess**
   - Remove the duplicate `StarField` implementation from `src/routes/index.tsx` and use the shared `src/components/landing/StarField.tsx`.
   - Reduce star density on mobile/home enough to cut DOM/style work without changing the visual direction.
   - Keep the wheel SVG stable and avoid wrapper scale transitions that can contribute to perceived stutter on tap.

5. **Clean routing/error behavior**
   - Replace hard `window.location.replace('/')` error/not-found redirects with lightweight router navigation or a small fallback UI.
   - Keep the stale-chunk recovery, but do not let general route errors silently dump the user back to home.

## Files to change

- `src/hooks/useResponsiveWheelSize.ts`
- `src/routes/index.tsx`
- `src/routes/spinning.tsx`
- `src/routes/__root.tsx`
- optionally `src/components/landing/StarField.tsx` for mobile density/performance polish

## Validation

- Test at the iPhone-sized viewport from the report.
- Refresh home and confirm the wheel does not resize after several seconds.
- Tap the wheel and the CTA repeatedly; confirm the app immediately routes to `/spinning` once.
- Confirm `/spinning` always reaches `/snippet`, including after refresh and repeated spins.
