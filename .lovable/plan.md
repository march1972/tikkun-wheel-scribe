# Fix 1 — Wheel doesn't visibly spin on /spinning

**Root cause:** `TikkunWheel` triggers rotation inside `useIsomorphicLayoutEffect` (= `useLayoutEffect` in browser). It fires before paint and immediately calls `setSpinAngle(target + 1440)`. React commits the new angle in the same frame, so the browser never paints the 0° starting angle — the CSS `transform 2.5s` transition has no "from" state and the wheel snaps to its final angle (visually: sits still).

**Fix:** in `src/components/TikkunWheel.tsx`, change the spin-trigger effect from `useIsomorphicLayoutEffect` to `useEffect`. `useEffect` fires after paint, so the 0° angle paints first, then the state update triggers the 2.5s transition. Remove the now-unused `useIsomorphicLayoutEffect` helper. No other wheel changes.

# Fix 2 — /spinning must look identical to / at the top

**Root cause:** `/` uses its own `<main>` + locally-declared `C_SKY_GRAD` + `<StarField density={360}>` + header link + h1, while `/spinning` uses `SkyShell` with `starDensity={200}` and a different h1 wrapper. Result: visibly different gradient feel (fewer stars, and the SkyShell wrapper composes differently).

**Fix:** rewrite `src/routes/spinning.tsx` so its top half is byte-equivalent to `/`'s top half:

1. Drop `SkyShell`. Render bare `<main className="relative min-h-screen overflow-hidden" style={{ background: C_SKY_GRAD, color: C_INK_SOFT }}>` using the same `C_SKY_GRAD` from `src/lib/landing-style.ts` that `/` uses (already identical strings — confirmed).
2. Render `<StarField density={360} opacity={0.85} />` (same as `/`).
3. Render the same header block as `/`: centered "Kabbalah Astrology" `<Link to="/">` with identical font/size/letter-spacing/color.
4. Render the same hero `<h1>` block as `/`: "Reveal your *Tikkun*" with identical fontFamily (HEAD), color (C_INK), size (`clamp(44px, 7.5vw, 96px)`), line-height, letter-spacing, and the italic dawn-red "Tikkun" span.
5. Keep the existing wheel underneath in `state="spinning"`, same `useResponsiveWheelSize(0.85, 280, 440)`, same drop-shadow filter, same target/timer logic, same "Searching Tikkun patterns…" caption.

Net effect: the top of `/spinning` (background gradient, stars, header link, headline) is pixel-equivalent to `/`. Only the wheel below switches from idle to spinning and the caption swaps in.

# What I will NOT do

- No change to wheel size, easing, duration, target logic, or settle timing.
- No change to `/`, `/snippet`, `/form`, routes, or business logic.
- No change to `spinAttempts.ts`, sessionStorage keys, or counters.
- No edit to `SkyShell` itself (left in place for any other future use; `/spinning` simply stops using it).
- No new gradients, palette tokens, or font changes.
- No change to `useResponsiveWheelSize` or `StarField`.

# Verification

- `/` and `/spinning` show the same gradient, same star density, same centered "Kabbalah Astrology" link, same "Reveal your *Tikkun*" headline at the same size and position.
- Clicking any CTA on `/` → `/spinning` → wheel visibly rotates ~4 turns over 2.5s → `/snippet`.
- "Spin again" on `/snippet` → same visible rotation on `/spinning`.
