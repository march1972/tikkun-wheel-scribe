# Make TikkunWheel feel mystical and tappable

Refine the wheel's visual presence so it reads as a sacred, alive object that invites a tap. All changes stay inside `src/components/TikkunWheel.tsx` (no logic, no routes, no props).

## Visual goals

- **Mystical glow**: deeper, layered halo around the central aleph — soft cream core, warm amber mid, oxblood-tinted outer falloff. Add a faint outer aura outside the gold ring.
- **Aleph as heartbeat**: the central medallion gently pulses (scale + glow opacity) on a ~2.2s loop while idle, like it's breathing. Stops while spinning.
- **Tap affordance**: a second, slower ring-pulse expands outward from the rim every ~2.6s (fading as it grows) — the universal "tap me" cue, but styled as a ripple of light rather than a UI ring.
- **Mystical texture**: add a faint star/sparkle layer (3–5 tiny gold dots at fixed offsets) inside the rotating group so the wheel feels charged, not empty. Increase opacity of the inner concentric rings slightly and add a 4th hairline ring for depth.
- **Letter shimmer**: every-3rd accent letter gets a subtle gold drop-glow (SVG filter) so the wheel shimmers as it rotates.

## Motion details

- Pulse + ripple pause when `state === "spinning"` or `state === "stopped"` (so the result moment stays still and reverent).
- Cursor stays `pointer`; add a gentle `:hover` scale (1.02) and brighter halo on hover/focus to reinforce tappability on desktop.
- All animation via CSS keyframes scoped by `uid` (same pattern already used for `tk-slow-spin`).

## Technical notes

- Add SVG `<filter>` for letter glow (feGaussianBlur + feMerge), referenced only by accent letters to keep cost low.
- Add two new `<radialGradient>`s: outer aura, and a brighter aleph-halo.
- Ripple = a `<circle>` at rim radius with `stroke` animated via keyframes (`r` and `opacity`); rendered outside the rotating group.
- Aleph pulse = wrap medallion `<circle>` + `<text>` in a `<g>` with `transform-origin` at center and a scale keyframe (1 → 1.04 → 1).
- No new dependencies. No prop changes. No changes to spin behavior, settle timing, or callbacks.
