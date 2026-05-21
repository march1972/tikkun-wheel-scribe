# Tint the wordmark light indigo

Shift the "Kabbalah Astrology" wordmark color from desaturated parchment grey to a soft light indigo that harmonizes with the night-sky gradient background.

## What changes

Two files, identical color swap:

- `src/components/landing/SkyShell.tsx` — header `<Link>` inline `color`
- `src/routes/index.tsx` — home page inline header `<Link>` `color`

Change:
- From: `rgba(241, 233, 213, 0.45)` (warm parchment grey)
- To:   `rgba(178, 190, 230, 0.55)` (soft light indigo, slightly more opacity since indigo reads dimmer than warm tones on the dark bg)

Everything else (font, size, tracking, uppercase, hover behavior) stays as-is.
