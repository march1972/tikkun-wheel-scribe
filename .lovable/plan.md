# Subtle uppercase wordmark — applied everywhere, dedup hidden copies

A quiet, modern uppercase wordmark that appears on every page and replaces the older hidden/duplicate versions.

## What changes

### 1. `src/components/landing/SkyShell.tsx` (used by /snippet, /spinning, /reading, /history, /terms, /privacy)
- Remove the ✦ separator, the slate utility classes, and the serif italic.
- Render a single uppercase wordmark: `KABBALAH ASTROLOGY`.
- Font: `BODY` (`var(--font-sans)`), weight 500.
- Size: ~11px mobile, ~12px desktop.
- Tracking: `letter-spacing: 0.28em` (moderate, not overdone).
- Color: `rgba(241, 233, 213, 0.45)` — desaturated parchment, recedes against the night sky. Hover → 0.7 opacity.
- Centered in the header row.

### 2. `src/routes/index.tsx` (home page — has its own inline header, not SkyShell)
- Replace the leftover inline `<span>` wordmark (lines ~260–277) with the same subtle uppercase wordmark, wrapped in a `<Link to="/">` and centered.
- Remove the leftover `border-slate-500 opacity-85 text-lg text-slate-200` utility classes and the doubled `K A B B A L A H&nbsp; &nbsp;A S T R O L O G Y` letter-spacing trick.
- Drop the extra `mt-[clamp(1rem,2vh,1.5rem)]` wrapper so spacing matches SkyShell.

### 3. Cleanup
- After the two edits above, no other files contain a visible "Kabbalah Astrology" header — only metadata, footers, and body copy. Nothing else to remove.

## Result

Same whisper-quiet uppercase wordmark, centered, on the home page and every other page — one source of truth styling, no hidden duplicates left behind.
