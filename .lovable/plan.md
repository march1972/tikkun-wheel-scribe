# Split `/snippet` (teaser) and `/form` (final form)

Restore the two-route flow so `/snippet` is the between-spins teaser and `/form` is the final email/DOB form.

## Changes

1. **Create `src/routes/snippet.tsx`** — teaser-only screen extracted from current `form.tsx` (`!showForm` branch): SkyShell, hebrew letter card, gold dividers, snippet text, red "See My Real Tikkun" CTA, "Free Full Birth Chart Reading" caption, rounded "Spin again" secondary button. Styling byte-identical.
   - Red CTA `onClick` → `navigate({ to: "/form" })`.
   - "Spin again" → increments spin number, picks new target sign, navigates to `/spinning` (hidden when `spinNumber >= MAX_SPINS`).
   - On mount: if `spinNumber > FREE_SPINS_BEFORE_FORM`, `navigate({ to: "/form", replace: true })`.

2. **Rewrite `src/routes/form.tsx`** — form-only screen (`showForm` branch): heading, name/email/DOB inputs, newsletter checkbox, red "Reveal my Tikkun" submit, T&Cs line, `submitLead` via `useServerFn`. On mount, seed session sign if missing, and `setCurrentSpinNumber(FREE_SPINS_BEFORE_FORM + 1)`.

3. **Update `src/routes/spinning.tsx`** — change `/form` references back to `/snippet` in `router.preloadRoute` and post-spin `navigate`.

4. **Update `src/routes/index.tsx`** — change preload target from `/form` back to `/snippet`.

5. `src/routeTree.gen.ts` regenerates automatically.

## Reveal rules for `/form`

- Auto-redirect from `/snippet` after free spins exhausted (`spinNumber > FREE_SPINS_BEFORE_FORM`, i.e. spin 4+).
- Direct navigation when user clicks red "See My Real Tikkun" CTA on `/snippet`.

## Not touched

`TikkunWheel.tsx`, `SkyShell`, `StarField`, `landing-style.ts`, copy strings, colors, typography, animations, `lead.functions.ts`, `tikkun-data.ts`, `spinAttempts.ts`. No visual or business-logic changes — purely a route split.

## Verification

- `rg "to: \"/snippet\""` and `rg "to: \"/form\""` show only expected references.
- Flow: `/` → wheel → `/spinning` → `/snippet` (teaser). "Spin again" loops back through `/spinning` → `/snippet` with new sign. After 3 free spins → next attempt auto-redirects `/snippet` → `/form`. Red CTA on `/snippet` jumps to `/form` early. `/form` submit → `/reading`.
- Visual spot-check: teaser and form pages match current appearance.
