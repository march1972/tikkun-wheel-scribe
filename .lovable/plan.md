## Add Google Ads tag (AW-18281814766)

Inject the gtag.js script sitewide via the root route's `head().scripts` array in `src/routes/__root.tsx`, so it loads in the `<head>` on every page via `<HeadContent />`.

### Changes

**`src/routes/__root.tsx`** — append two entries to the existing `scripts` array in `head()`:

1. External loader:
   ```ts
   { src: "https://www.googletagmanager.com/gtag/js?id=AW-18281814766", async: true }
   ```
2. Inline bootstrap:
   ```ts
   {
     children:
       "window.dataLayer = window.dataLayer || [];" +
       "function gtag(){dataLayer.push(arguments);}" +
       "gtag('js', new Date());" +
       "gtag('config', 'AW-18281814766');",
   }
   ```

No other files change. The existing JSON-LD script entry stays as is.

### Verification

After the edit, run a preview JS check confirming:
- `typeof window.gtag === "function"`
- `Array.isArray(window.dataLayer) && window.dataLayer.length > 0`
- A `<script>` with `src` containing `googletagmanager.com/gtag/js?id=AW-18281814766` exists in the DOM

### Notes

- Tag fires on preview immediately; it will also fire on the published site after the next publish.
- No consent gating is added (matches the snippet you provided). If you later need GDPR/consent-mode, that's a separate change.
