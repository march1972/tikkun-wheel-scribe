# Brighten the "Kabbalah Astrology" wordmark

The small "Kabbalah Astrology" eyebrow that sits in the page header (and a matching one on the home page) is currently a dusty blue: `rgba(178, 190, 230, 0.55)`. Shift it toward warm white so it reads less blue and a touch brighter, while staying subtle against the night-sky background.

## Change

Replace the color in both spots with a warm cream-white at slightly higher opacity:

- From: `rgba(178, 190, 230, 0.55)` (blue-leaning)
- To:   `rgba(241, 233, 213, 0.7)` (matches `C_INK_SOFT` cream, more white, less blue)

## Files

- `src/components/landing/SkyShell.tsx` — header wordmark link (appears on every page using SkyShell).
- `src/routes/index.tsx` (line ~267) — the same wordmark rendered inline on the landing page.

The other "Kabbalah Astrology" mentions on the site already use the cream token (`C_INK_SOFT`) and need no change.

No layout, font, size, or spacing changes — color only.
