# Plan: Replace native browser validation popup with our oxblood red

The orange "Please fill out this field" tooltip is the browser's native HTML5 validation chrome — it can't be restyled cross-browser. We already have a custom error path in `onSubmit` (sets `err` and renders a `<p>` with `color: C_DAWN`). We just need to (a) suppress the native popup and (b) make sure our custom message uses the oxblood red (`#7a1f2b`) matching the CTA pill.

## Changes (`src/routes/snippet.tsx`)

1. **Disable native validation** — add `noValidate` to the `<form>` element. The existing `onSubmit` already validates `dob` and `email` and sets `err`.
2. **Keep `required`** on email/dob inputs for accessibility/autofill semantics — they're harmless once `noValidate` is set.
3. **Restyle the error `<p>`** — change `color: C_DAWN` → `color: "#c44553"` (a readable lighter oxblood that meets contrast on the dark bg, in the same red family as the `#7a1f2b` CTA). Also add `fontWeight: 500` and `letterSpacing: 0.02em` so it reads clearly.

No other files touched.