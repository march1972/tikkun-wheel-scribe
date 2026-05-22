# Re-audit and harden the home → spinning → snippet wheel flow

## What is actually going wrong

Do I know what the issue is? Yes: the flow is not failing because of one button handler; it is stuttering because hydration, animation, and routing are fighting each other on the first interaction.

1. **The wheel SVG is causing React hydration mismatches**
   - Console shows mismatched SVG coordinates such as `y2=27.485979540325758` vs `27.485979540325744`.
   - That comes from rendering floating-point SVG geometry from `Math.sin` / `Math.cos` during SSR and again in the browser.
   - React warns that it will not patch those attributes. On mobile this can make the first click feel unreliable because the app is hydrating/reconciling while the user taps.

2. **The wheel size hook is still not SSR-safe**
   - `useResponsiveWheelSize` now reads `window.innerWidth` inside the `useState` initializer.
   - That avoids some size flash, but it also means the first browser render can differ from the server render whenever the computed client size is not the SSR fallback.
   - This is exactly the kind of SSR/client branch React flags as a hydration problem.

3. **The wheel component injects a large dynamic `<style>` tag per wheel render**
   - `TikkunWheel` creates unique keyframes and inline CSS with size-derived numeric values on every instance.
   - That increases style recalculation and makes route transitions heavier than they need to be.

4. **The home page is still too heavy for the first tap on a 320px mobile viewport**
   - Measured mobile profile: ~1,283 elements, 181 layouts, 183 style recalcs before interaction.
   - Home renders a 360-star field plus multiple additional star fields later in the page. Even if visually nice, it is expensive during the first click.

5. **Navigation waits behind visual animation instead of being guaranteed by route state**
   - `/spinning` relies on the wheel animation callback plus a timeout fallback.
   - That usually works, but the user experience still depends on mounting/hydrating another animated SVG page before reaching `/snippet`.

6. **Root error handling can hide real route failures**
   - The root error boundary still redirects with `window.location.replace('/')`.
   - If a route error occurs during `/spinning` or `/snippet`, it can look like the wheel “stuttered and stayed home” instead of showing the real issue.

## Recommended fix

1. **Make the wheel SSR-deterministic**
   - Refactor `TikkunWheel` to render in a fixed internal SVG coordinate system, for example `viewBox="0 0 1000 1000"`.
   - Scale the outer container with CSS width/height only.
   - Round all generated SVG coordinates to a stable precision before rendering.
   - Move keyframes to static CSS classes instead of generating a unique `<style>` block with dynamic numbers per render.

2. **Replace the wheel size hook with CSS-first sizing**
   - Stop reading `window` during initial render.
   - Give the wheel wrapper one stable CSS variable like `--wheel-size: clamp(280px, 85vw, 440px)`.
   - Use the same CSS sizing on `/` and `/spinning` so refreshes and route changes cannot resize the wheel after hydration.

3. **Make the click path immediate and one-way**
   - On wheel or CTA tap: synchronously choose/store the target and navigate once to `/spinning` with an in-memory guard.
   - Disable pointer events while the route change is starting so double taps cannot queue duplicate navigation.
   - Use route preloading for `/spinning` and `/snippet` from home to reduce first-click chunk delay.

4. **Make `/spinning` a short deterministic transition**
   - Read/create the target before rendering the wheel.
   - Start the transition timer at route mount and always navigate to `/snippet` after the fixed duration.
   - Keep the wheel animation visual-only; it should never be the only thing responsible for advancing the flow.

5. **Reduce mobile render cost on home**
   - Lower star density on the first viewport and remove or defer below-the-fold star layers on mobile.
   - Remove hover/active scale transitions around the clickable wheel on touch-sized screens.
   - Keep the visual style, but cut avoidable DOM and style work before the first interaction.

6. **Stop silent hard redirects for route errors**
   - Replace `window.location.replace('/')` in error/not-found handling with a lightweight fallback UI or router navigation.
   - Keep stale chunk recovery only for real chunk-load errors, not general route errors.

## Files to change after approval

- `src/components/TikkunWheel.tsx`
- `src/hooks/useResponsiveWheelSize.ts` or remove its usage from this flow
- `src/routes/index.tsx`
- `src/routes/spinning.tsx`
- `src/routes/__root.tsx`
- `src/components/landing/StarField.tsx`

## Validation after implementation

- Test at 320×568 and 390×844 mobile viewports.
- Confirm there are no React hydration mismatch warnings.
- Refresh `/` repeatedly and confirm the wheel is the same size on first paint and after hydration.
- Tap the wheel and CTA repeatedly; confirm one immediate route change to `/spinning`.
- Confirm `/spinning` always reaches `/snippet`, including on refresh and slow-device simulation.
- Re-run a mobile performance profile and confirm lower DOM/style work on the first screen.
