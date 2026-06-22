## Plan

1. **Simplify `robots.txt` to a crawler-safe format**
   - Keep `User-agent: *` with `Allow: /`.
   - Keep only the intentional blocked route: `Disallow: /unsubscribe`.
   - Remove the many extra AI-specific `User-agent` blocks, because Google can apply the most specific matching group and these extra groups can make debugging harder.
   - Add explicit Google crawler groups so Googlebot and the smartphone inspection crawler are clearly allowed.

2. **Keep sitemap discovery intact**
   - Keep `Sitemap: https://tikkun.kabbalahcircle.com/sitemap.xml`.

3. **Verify live behavior after publish**
   - Check `https://tikkun.kabbalahcircle.com/robots.txt` after publishing.
   - Re-run URL Inspection on the affected URL in Google Search Console.

## Proposed `robots.txt`

```txt
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-Mobile
Allow: /

User-agent: *
Allow: /
Disallow: /unsubscribe

Sitemap: https://tikkun.kabbalahcircle.com/sitemap.xml
```

## Note

The currently live `robots.txt` does not visibly block Google, so this is a defensive cleanup to remove any crawler-specific ambiguity and make Google’s inspection result easier to resolve after republishing and reinspection.