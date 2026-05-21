# /history — match /reading polish + tighten the top

Bring `/history` in line with the editorial rhythm and scroll life we just shipped on `/reading`, and remove the redundant page-header block.

## 1. Remove the "A Brief History" header, lift the page

- Delete the entire intro `<section>` containing the hairline-flanked `A BRIEF HISTORY` eyebrow and the `Ancient roots, living work.` H1.
- Pull the remaining content up: the prose band becomes the first thing under the global `SkyShell` header (the small "Kabbalah Astrology" link stays — it's part of the shell, not this page).
- Reduce the top padding of the prose band so it breathes against the shell header but doesn't sit cramped: `pt-[clamp(2.5rem,6vh,4.5rem)]` (was effectively pushed down by the removed hero).
- Keep the border-top hairline on the prose band so it still reads as a contained passage.

## 2. Scroll life — reuse the same `<Reveal>` primitive

- Wrap the prose band's three paragraphs in `<Reveal>` with a small stagger (0ms, 120ms, 240ms delays, 700ms duration, y=16) so they fade up sequentially as the section enters view.
- Wrap the Newsletter block (eyebrow + H2 + supporting copy + form) in a single `<Reveal>` (duration 900ms, y=20) so the whole CTA settles in as one beat.
- Respects `prefers-reduced-motion` automatically (already handled inside `<Reveal>`).

## 3. Mobile adaptivity check

Existing `/history` already uses fluid `clamp()` sizing and a 2xl max-width column, so it is already responsive. After removing the hero, verify:
- The prose band's first paragraph sits comfortably ~clamp(2.5–4.5rem) below the shell header on a 360–414px viewport.
- Newsletter form still stacks (`flex-col sm:flex-row`) on phones — unchanged.

## Files touched

- `src/routes/history.tsx` — remove the intro hero section, adjust the prose band's top padding, wrap paragraphs and the newsletter block in `<Reveal>`.

## Out of scope

- No copy edits, no new routes, no changes to `SkyShell` or `PrimaryCTA`, no new dependencies.
- No changes to `/reading`, `/`, or any other page.
