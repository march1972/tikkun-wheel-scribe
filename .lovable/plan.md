## Link audit results

Scanned every `<a>`, `<Link>`, and `target=` usage across `src/`. Findings and fixes below. No styling changes — only the element type, `target`/`rel` attributes, and a visually-hidden accessibility label where needed.

### Internal links to convert from `<a href>` → `<Link to>` (same tab)

1. **`src/routes/snippet.tsx`** (line ~420) — T&Cs link uses `<a href="/terms">`. Convert to `<Link to="/terms">`, keep inline styles/classes.
2. **`src/routes/reading.tsx`** (line ~441) — The Tikkun wheel anchor uses `<a href={SHARE_URL}>` where `SHARE_URL = "https://tikkun.kabbalahcircle.com"` (our own custom domain). Convert to `<Link to="/">`, keep className/styles. The WhatsApp/Copy buttons keep using `SHARE_URL` as the shared text payload (unchanged).
3. **`src/lib/error-page.ts`** — Raw HTML error string with `<a href="/">`. Leave as-is (not a React tree; full reload here is acceptable on a crash page).

### External links to add visually-hidden "(opens in new tab)" label

These already use `target="_blank" rel="noopener noreferrer"` — only adding the screen-reader-only span inside the anchor:

1. **`src/routes/about.tsx`** — Kabbalah Centre link (`https://onehouse.kabbalah.com/en/`).
2. **`src/routes/about.tsx`** — LinkedIn link (`https://www.linkedin.com/in/marcherson/`).
3. **`src/routes/reading.tsx`** — WhatsApp share link (`https://wa.me/...`).

The Instagram share is a `<button>` invoking the Web Share API / clipboard, not a link — no change.

### Visually-hidden label

Use a small inline span (no new file):

```tsx
<span className="sr-only"> (opens in new tab)</span>
```

`sr-only` is already provided by Tailwind in this project.

### Already correct (no changes)

- `src/routes/privacy.tsx`, `src/routes/terms.tsx`, `src/routes/history.tsx`, `src/routes/index.tsx`, `src/components/landing/SkyShell.tsx` — all internal navigation already uses TanStack `<Link>` with no `target="_blank"`.

### Out of scope

No styling, copy, or routing-target changes beyond the items above.
