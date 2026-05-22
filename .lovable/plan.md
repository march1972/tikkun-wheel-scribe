## Intended flow

- `/` (idle wheel, 3 CTAs) → CTA → `/spinning` (2.8s) → `/snippet` **(spin 1)**
- Spin 1 → red CTA → `/form` **or** "Spin again" → `/spinning` → `/snippet` **(spin 2)**
- Spin 2 → red CTA → `/form` **or** "Spin again" → `/spinning` → `/snippet` **(spin 3)**
- Spin 3 → **"Spin again" hidden**. Only path forward = red CTA → `/form`.
- `/form` submit → `/reading`.

Max 3 snippets, max 2 "Spin again" clicks. No spin 4. `/spinning` always lands on `/snippet`.

## What I will change

1. **Wheel size — fix first-paint flash** (`src/hooks/useResponsiveWheelSize.ts`)
   Initialize `useState` lazily with `compute()` so the wheel renders at its correct adaptive size on first paint. SSR-safe fallback to `min` when `window` is undefined. Resize/orientation behavior unchanged.

2. **Unify shell across `/` and `/spinning` only**
   Same background gradient (`C_SKY_GRAD`), same `StarField` density, same centered "Kabbalah Astrology" top link, same "Reveal your Tikkun" headline. So `/` → `/spinning` feels continuous.

3. **Make `/snippet` feel like a NEW screen / reveal moment** (`src/routes/snippet.tsx`)
   - **Remove** the "Kabbalah Astrology" top link → stop using `SkyShell`; render a bare `<main>` instead.
   - **Remove** the "Reveal your Tikkun" headline (it was never on `/snippet` — keep it off).
   - **New background gradient** distinct from `/` and `/spinning`. Add a new token in `src/lib/landing-style.ts`, e.g. `C_REVEAL_GRAD` — a warmer, deeper dawn-leaning gradient (deep indigo base lifting into a warm gold/dawn glow at the top-center, behind the Hebrew letter) so the reveal reads as a different moment. Keep `StarField` for continuity but lower density (~120) so the focus stays on the snippet card.
   - Card, dividers, Hebrew letter, snippet copy, red CTA, "Free Full Birth Chart Reading" caption, and "Spin again" button stay visually identical.

4. **Hide "Spin again" on snippet 3** (`src/routes/snippet.tsx`)
   Change condition from `spinNumber < MAX_SPINS` to `spinNumber < FREE_SPINS_BEFORE_FORM`. No replacement copy — the red CTA carries the action.

5. **Remove counter side-effect from `/form` mount** (`src/routes/form.tsx`)
   Delete `setCurrentSpinNumber(FREE_SPINS_BEFORE_FORM + 1)`. It corrupts the counter on back-nav.

6. **Drop `/snippet` auto-redirect to `/form`** (`src/routes/snippet.tsx`)
   No longer needed with the new rules.

## What I will NOT do

- **No design changes** to the snippet card itself, the wheel, typography, dividers, button styles, animations, or copy (beyond hiding "Spin again" on snippet 3).
- **No wheel resize.** Adaptive sizing args unchanged. Only the first-paint flash is fixed.
- **No "Kabbalah Astrology" link on `/snippet`.** Explicitly removed.
- **No "Reveal your Tikkun" headline on `/snippet`.** Explicitly not added.
- **No sticky/fixed positioning** anywhere.
- **No "Maximum spins reached" copy.** Button is simply hidden on snippet 3.
- **No changes** to `TikkunWheel`, `StarField` component itself, `lead.functions.ts`, `tikkun-data.ts`, `spinAttempts.ts` constants (`FREE_SPINS_BEFORE_FORM = 3`, `MAX_SPINS = 12`).
- **No route additions or removals.**
- **No business-logic changes** to form submit, lead capture, or reading flow.

## Verification

- Desktop and mobile: wheel renders at correct adaptive size on first paint, no flash.
- `/` and `/spinning` share identical top (background, stars, "Kabbalah Astrology" link, "Reveal your Tikkun" headline).
- `/snippet` has: no top link, no headline, a visibly distinct warmer gradient — feels like a reveal screen.
- Click-through: `/` → `/spinning` → `/snippet` (spin 1, Spin again visible) → `/spinning` → `/snippet` (spin 2, Spin again visible) → `/spinning` → `/snippet` (spin 3, Spin again hidden) → red CTA → `/form` → submit → `/reading`.
- Red CTA from spin 1 or 2 jumps straight to `/form`.
- Back-nav from `/form` to `/snippet` still shows the snippet (counter intact).
