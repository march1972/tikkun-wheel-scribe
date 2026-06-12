## Change

In `src/routes/tikkun.tsx` (line 188), change the bottom "Get your personal Tikkun reading" CTA from navigating to `/` to navigating to `/form`.

`/form` is the existing route that sets up sessionStorage and redirects to `/snippet` in form-mode, showing the Name / Email / Date of Birth form (the screenshot you shared).

No other changes.