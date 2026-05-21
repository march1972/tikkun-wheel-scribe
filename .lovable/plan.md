# Restyle the "Kabbalah Astrology" wordmark — subtle, modern, uppercase

A quiet masthead that sits above the hero without competing with it.

## What changes

File: `src/components/landing/SkyShell.tsx` only.

- **Remove** the gold ✦ separator entirely — no ornament.
- **Case + spacing:** uppercase, tracked out moderately (`letter-spacing ~0.28em`) — modern, not the previous overdone `0.42em` super-spaced look.
- **Font:** switch to a modern geometric sans via the system stack already wired through `BODY` (`var(--font-sans)`), weight 500. Distinct from the serif used by the big H1, so it reads as a discreet wordmark rather than a smaller echo of the headline.
- **Size:** ~11px on mobile, ~12px desktop — small enough to recede.
- **Color / brightness:** desaturated parchment at low opacity — `rgba(241, 233, 213, 0.45)` (≈ `C_INK_SOFT` @ 45%). No gold, no pure white. On hover, lift to ~0.7 opacity for affordance.
- **Layout:** keep centered in the header row; a single space between the two words (no double-spacing trick).
- **Cleanup:** drop the leftover slate/border utility classes.

## Result

A whisper-quiet uppercase wordmark in the page's sans font, low-contrast against the night sky, that frames the hero instead of fighting it.
