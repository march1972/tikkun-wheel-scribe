# /reading — letter block fix + scroll life

Two focused upgrades. Keep everything else from the current redesign intact.

## 1. Tikkun Letter block — fix the alignment

**Problem:** the oversized Hebrew letter (e.g. ע / Ayin) sits in a left-column next to the teaching paragraph. Visually it floats — baselines don't agree, the letter feels too big for its neighbour, and on narrow widths the two-column grid cramps.

**Recommendation — stacked, centered, restrained.** Drop the two-column grid entirely. Build one centered, vertical stack so the eye reads top-to-bottom with no alignment ambiguity:

```text
        [ ע ]            ← Hebrew letter, smaller (clamp 72–110px), C_DAWN, soft halo behind
       Ayin               ← letter name, Fraunces italic cream, ~22–26px
   THE EYE • SEEING       ← meaning, 10px tracked uppercase gold
   ─────                  ← 32px hairline, low-opacity cream
   Teaching paragraph…    ← left-aligned body in the 620px column,
                            sits directly under the centered header block
```

Specifics:
- Letter size: `clamp(72px, 11vw, 110px)` (down from 96–150). Halo softer: `0 0 28px ${C_DAWN}55`.
- Header block (letter + name + meaning) is **centered** within the 620px column with `text-align: center` and tight vertical rhythm (8px between letter→name, 6px between name→meaning).
- A 32px hairline divider sits between the header block and the teaching paragraph for breathing room.
- Teaching paragraph stays **left-aligned** (matches every other body paragraph on the page) inside the same 620px column.
- Single column at all widths — no `md:grid-cols` — so mobile and desktop look identical and never cramp.

This keeps the letter as a quiet emblem rather than a competing column, fixes baseline drift, and matches the editorial rhythm of the rest of the page.

## 2. Scroll life — subtle motion, not theme-park

Goal: make the page feel alive on scroll without turning it into a parallax demo. Two restrained layers:

**a) Section reveal on scroll**
- Every `<SectionLabel>` + its body fades up (`opacity 0→1`, `translateY 16px→0`, 700ms ease-out) the first time it enters the viewport.
- Implemented with a tiny `useInView` hook (IntersectionObserver, `threshold: 0.15`, `once: true`) and a `<Reveal>` wrapper component — no library needed.
- Respects `prefers-reduced-motion: reduce` — falls back to instant visible.

**b) Living hero halo + parallax drift**
- The hero halo behind the Hebrew letter gets a gentle continuous breathing (already present) **plus** a slow scroll-linked drift: as the user scrolls past the hero, the halo translates up at ~0.3× scroll speed (cheap `transform: translate3d` driven by a single `scroll` listener with `requestAnimationFrame` throttle). Creates a soft "the sky is moving with you" feeling.
- The big Daily Mantra line gets the same reveal-on-scroll treatment but with a longer 1100ms ease and a faint dawn-red glow that intensifies as it enters view (animate `text-shadow` opacity from 0 to full over the reveal).
- The starfield (already in `SkyShell`) is left alone — additional motion there would be too much.

**c) Micro-interaction on share buttons**
- Already have `hover:scale-[1.03]`. Add a subtle `transition: transform 220ms cubic-bezier(.2,.7,.3,1.2)` so the lift has a tiny springy feel. Zero new dependencies.

What I'm **not** doing:
- No full-page parallax, no scroll-jacking, no GSAP/Locomotive, no horizontal scroll, no cursor effects. Those would clash with the editorial restraint we just earned.

## Files touched

- `src/routes/reading.tsx` — rewrite the Tikkun Letter section as a centered stack; wrap every section in a new `<Reveal>` component; add hero halo scroll drift; intensify mantra glow on reveal.
- `src/components/landing/Reveal.tsx` *(new)* — small wrapper using IntersectionObserver + reduced-motion check. ~30 lines.

## Out of scope

No copy edits, no data changes, no other routes touched, no new dependencies.
