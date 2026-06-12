## Why

The "12 Tikkunim" footer link on the home page is gated by a hidden `sessionStorage` flag (`tikkun_real_sign`), so it almost never renders — which is why you don't see it. Rather than expose it directly in the global footer, route discovery of `/tikkun` through the existing `/kabbalistic-astrology` page (which already has a "The 12 Tikkunim" section linking to `/tikkun`).

## Changes

1. **`src/routes/index.tsx`**
   - Remove the `<TikkunFooterLink />` usage from the footer links row.
   - Delete the `TikkunFooterLink` component definition at the bottom of the file.
   - Clean up now-unused `useState` / `useEffect` imports if no other code uses them.

2. **`src/routes/kabbalistic-astrology.tsx`** (verify, no rewrite expected)
   - Confirm the existing `TikkunSection` (heading "The 12 Tikkunim" + `Link to="/tikkun"`) is present and prominent so visitors reach `/tikkun` from this page.
   - Confirm the "Tikkun" chip in the top nav links scrolls to that section.

3. **No changes** to `/tikkun` route itself, footer styling for the remaining links, or sitemap (already includes both pages).

## Result

- Footer keeps: About · Terms · Privacy · Kabbalah Astrology · © line.
- Path to `/tikkun`: footer → "Kabbalah Astrology" → "The 12 Tikkunim" section → `/tikkun`.
