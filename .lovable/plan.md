## Problem

The app crashes at runtime with:
`SyntaxError: [vite] The requested module '@react-email/components' does not provide an export named 'renderAsync'`

Five server files import `render` from `@react-email/components` and alias it as `renderAsync`:

- `src/lib/email/send-internal.server.ts`
- `src/routes/lovable/email/transactional/send.ts`
- `src/routes/lovable/email/transactional/preview.ts`
- `src/routes/lovable/email/auth/webhook.ts`
- `src/routes/lovable/email/auth/preview.ts`

`@react-email/components` re-exports `render` via `export * from "@react-email/render"`. Vite's SSR module runner is failing to resolve that wildcard re-export through the components barrel, so the renamed import blows up at module-evaluation time and brings down the whole route tree (which is why the home page also errors).

## Fix

Import `render` directly from `@react-email/render` (already installed as a transitive dep — and it's the package that actually owns the function). Keep the local `renderAsync` alias so no call sites change.

In each of the 5 files, replace:
```ts
import { render as renderAsync } from '@react-email/components'
```
with:
```ts
import { render as renderAsync } from '@react-email/render'
```

No other code changes. No template changes. No package install needed.

## Verification

- Reload preview — the `/` route and email preview/send routes should load without the SyntaxError.
- Re-run the test send to `marc@shiftxp.com` to confirm reading + waitlist emails still render and queue.
