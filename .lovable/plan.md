## Root cause

Semrush is right. Each `/tikkun/{sign}` page emits **two** `<link rel="canonical">` tags:

```html
<link rel="canonical" href="https://tikkun.kabbalahcircle.com/tikkun"/>          <!-- from parent tikkun.tsx -->
<link rel="canonical" href="https://tikkun.kabbalahcircle.com/tikkun/aries"/>    <!-- from leaf tikkun.$sign.tsx -->
```

TanStack Router concatenates `links` from every matched route without dedup. `tikkun.tsx` is both the page for `/tikkun` AND the parent layout for `/tikkun/$sign`, so its canonical leaks into every sign page. Most crawlers (including Semrush and Google) take the **first** canonical, which says "the canonical of `/tikkun/aries` is `/tikkun`". That's why all 12 sign URLs show up as "Non-canonical URL" in the sitemap audit.

This is documented in our head-meta guidance: *"Canonical lives on leaf routes only … a canonical in `__root.tsx` plus a leaf canonical emits both — invalid."* Same applies to a parent route that also serves a page.

## The fix

Split `src/routes/tikkun.tsx` into a layout + an index leaf, the standard TanStack pattern for "a route that has both a page and children":

1. **Rename** `src/routes/tikkun.tsx` → `src/routes/tikkun.index.tsx`.  
   Change its `createFileRoute("/tikkun")` to `createFileRoute("/tikkun/")` (the index segment). All page code, `head()`, canonical, JSON-LD — unchanged. This file remains the leaf for `/tikkun` and keeps its self-canonical.

2. **Create** a new minimal layout `src/routes/tikkun.tsx`:
   ```tsx
   import { createFileRoute, Outlet } from "@tanstack/react-router";
   export const Route = createFileRoute("/tikkun")({
     component: () => <Outlet />,
   });
   ```
   No `head()`, no canonical, no metadata. Children inherit nothing.

3. **No changes** to `tikkun.$sign.tsx`, the sitemap, or any other file. The 12 sign pages keep their own correct self-canonical.

After the change, each `/tikkun/{sign}` page will emit exactly one canonical, matching its own URL.

## Verification

Re-run the same curl I used to find the bug:
```
curl -s https://tikkun.kabbalahcircle.com/tikkun/aries | grep canonical
```
Expected: exactly one line, `href=".../tikkun/aries"`. Then re-trigger the Semrush audit; the 12 "Non-canonical URL" rows should clear.

## Out of scope

- No sitemap changes (`/tikkun` and all 12 signs stay listed).
- No metadata/copy changes on any page.
- No edits to the parent metadata that lives in `__root.tsx`.

This is a 2-file change with zero visible impact and fixes the SEO finding cleanly.
