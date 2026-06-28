## Goal
Add browser caching, asset minification, and HTTP compression across the site.

## Current state
- **Minification**: Vite already minifies JS/CSS in production builds (default esbuild minifier). No action needed beyond confirming the prod build is what's deployed — which it is on Lovable/Cloudflare.
- **Compression**: Cloudflare automatically applies Brotli/gzip to text responses at the edge. Our Worker isn't disabling it, so this already works for HTML/JS/CSS/JSON/SVG. No code change required.
- **Caching**: This is the real gap. Our Worker (`src/server.ts`) returns responses untouched, so static assets fall back to weak defaults. We need explicit `Cache-Control` headers.

## Changes

### 1. `src/server.ts` — add cache headers in the Worker
Wrap the response from `handler.fetch` and set `Cache-Control` based on the URL:

- `/_build/assets/*`, `/assets/*`, hashed JS/CSS/font/image files → `public, max-age=31536000, immutable` (1 year — safe because filenames are content-hashed by Vite).
- Other static files in `/public` (favicon, robots.txt, sitemap.xml, og images, llms.txt) → `public, max-age=86400, must-revalidate` (1 day).
- HTML / SSR document responses (`text/html`) → `public, max-age=0, must-revalidate` (always revalidate so deploys are visible immediately).
- API / server-function responses (`/_serverFn/*`, `/api/*`) → leave untouched (handlers set their own caching).
- Never overwrite a `Cache-Control` header the inner handler already set.

Implementation: a small `applyCacheHeaders(request, response)` helper called inside the existing `fetch` after `normalizeCatastrophicSsrResponse`. Clone headers before mutating (Response headers are immutable when the body is a stream).

### 2. Confirm minification (no code change)
Document in the plan that Vite's production build already minifies JS and CSS via esbuild — no config edit needed. If we ever want to verify, `bun run build` output shows `.js`/`.css` sizes minified.

### 3. Compression (no code change)
Cloudflare's edge auto-compresses eligible responses. The Worker must not set `Content-Encoding` manually (it doesn't). No change needed.

## Out of scope
- Service worker / offline caching.
- Image format conversion (separate perf task).
- Changing the build pipeline or Vite config.

## Verification
After deploy: `curl -I https://tikkun.kabbalahcircle.com/_build/assets/<hashed>.js` shows `cache-control: public, max-age=31536000, immutable` and `content-encoding: br` (or `gzip`). HTML root shows `cache-control: public, max-age=0, must-revalidate`.
