# Rename `/snippet` → `/form` (clean, no design changes)

## Audit of current state

- **`/snippet`** — the actual post-wheel page (teaser + email/DOB form variants).
- **`/form`** — a stub that seeds sessionStorage and `replace`-redirects to `/snippet`.
- **`/spinning`** — navigates to `/snippet` when wheel stops; preloads `/snippet`.
- **`index.tsx`** — preloads `/snippet`.
- No other references to `/snippet` anywhere in `src/` (verified via ripgrep).

## Changes

1. **Delete** `src/routes/form.tsx` (the stub redirect — no longer needed).
2. **Move** the content of `src/routes/snippet.tsx` into a new `src/routes/form.tsx`:
   - Change `createFileRoute("/snippet")` → `createFileRoute("/form")`.
   - **No other code or styling changes** — UI, copy, colors, fonts, layout, animations, form fields, CTAs, and the `SkyShell` background remain byte-identical.
   - Add a small mount-time fallback (taken from the old stub) so direct visits to `/form` still work: if `sessionStorage.tikkun_target_sign` is missing, seed a random sign and set spin number to `FREE_SPINS_BEFORE_FORM + 1`. This is gated on "empty session" so the normal flow from `/spinning` is unaffected.
3. **Delete** `src/routes/snippet.tsx`.
4. **Update internal links** (3 spots):
   - `src/routes/spinning.tsx`: `navigate({ to: "/snippet" })` and `router.preloadRoute({ to: "/snippet" })` → `/form`. Update the comment.
   - `src/routes/index.tsx`: `router.preloadRoute({ to: "/snippet" })` → `/form`. Update the comment.
5. `src/routeTree.gen.ts` regenerates automatically.

## What I will NOT touch

- `TikkunWheel.tsx`, `SkyShell`, `StarField`, `landing-style.ts`, all copy/strings, all CSS classes, all inline styles, all animations, the spin/form logic, `lead.functions.ts`, `tikkun-data.ts`, `spinAttempts.ts`.
- Design tokens, colors, typography, button styles, glow/pulse animations — unchanged.

## Verification (post-edit)

1. `rg "snippet"` across `src/` (excluding `routeTree.gen.ts` and unrelated `bundle.ts` data comment) — expect **zero matches**.
2. Confirm the build/typecheck passes (TanStack regenerates the route tree; `to: "/form"` is type-checked).
3. Browser check at the preview:
   - Load `/` → click wheel → wheel spins → lands on `/form` (URL changes from `/snippet` to `/form`).
   - On `/form`, "Spin again" works and visuals are identical to before.
   - Exhaust free spins → form variant renders with the same fields, CTAs, and red pulsing button.
   - Direct visit to `/form` with no session also renders correctly (fallback seed).
4. Visual spot-check vs. before: hebrew letter, dividers, gold accents, red CTA, "Free Full Birth Chart Reading" caption, secondary "Spin again" button — all unchanged.

## Files touched

- delete: `src/routes/snippet.tsx`
- delete + recreate: `src/routes/form.tsx` (now holds the real page)
- edit: `src/routes/spinning.tsx`
- edit: `src/routes/index.tsx`
