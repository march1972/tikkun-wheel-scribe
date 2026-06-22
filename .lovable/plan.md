## Full audit of all routes vs robots.txt + meta robots + sitemap

I re-checked every route file, `public/robots.txt`, and `src/routes/sitemap.xml.ts`. Here's the actual current state in the codebase (already fixed from previous turns):

### robots.txt
Only `Disallow: /unsubscribe`. Everything else is `Allow: /`. AI crawlers explicitly welcomed. Sitemap directive present.

### Per-route status

| Route | Meta robots | In sitemap | Status |
|---|---|---|---|
| `/` | index,follow (root default) | ✅ | OK |
| `/about` | inherits index | ✅ | OK |
| `/admin` | **noindex,nofollow** | ❌ | Intentionally blocked |
| `/content` | inherits index | ✅ | OK |
| `/form` | inherits index | ✅ | OK |
| `/hebrew-astrology` | inherits index | ✅ | OK |
| `/history` | inherits index | ✅ | OK |
| `/jewish-astrology` | inherits index | ✅ | OK |
| `/kabbalistic-astrology` | inherits index | ✅ | OK |
| `/kabbalistic-astrology-reading` | inherits index | ✅ | OK |
| `/privacy` | inherits index | ✅ | OK |
| `/reading` | explicit index,follow | ✅ | OK |
| `/reading/$sign` | redirect → `/reading?sign=…` | ❌ (correct — redirects don't belong in sitemap) | OK |
| `/snippet` | inherits index | ✅ | OK |
| `/spinning` | inherits index | ✅ | OK |
| `/terms` | inherits index | ✅ | OK |
| `/tikkun` | inherits index | ✅ | OK |
| `/tikkun/$sign` | inherits index | ✅ (all 12 signs) | OK |
| `/what-is-tikkun` | inherits index | ✅ | OK |
| `/unsubscribe` | **noindex,nofollow** + robots Disallow | ❌ | Intentionally blocked |
| `/email/unsubscribe` | server route (no HTML) | ❌ | Intentionally blocked |

### Conclusion
**No code changes required.** Every public route is allowed by robots.txt, has `index,follow`, and is listed in the sitemap. Only `/admin`, `/unsubscribe`, and `/email/unsubscribe` are blocked — which is correct.

### Next step for you
Republish the site (so the latest `robots.txt` and `sitemap.xml` are live on tikkun.kabbalahcircle.com), then in Google Search Console:
1. Open **Sitemaps** → resubmit `https://tikkun.kabbalahcircle.com/sitemap.xml`
2. Use **URL Inspection** → "Test live URL" → "Request indexing" for any URL that previously showed as blocked. Google's cached robots.txt verdict can lag 24–48h even after the file is updated.
