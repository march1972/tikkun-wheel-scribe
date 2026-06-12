## Mobile audit findings & proposed fixes

Audited at 390×844 (iPhone 12/13/14). Wheel is left untouched per request. Issues are grouped by severity.

### Higher impact

**1. Hero CTA "Your Tikkun chart" — arrow drifts to the side**
`PrimaryCTA` uses `whitespace-pre-line` with a `\n` in the label and a separate `→` span in a flex row. On mobile the two words stack and the arrow sits vertically centered on the right, looking detached. Fix: drop the `\n` on this label (single line "Your Tikkun chart") so the arrow sits naturally beside it; the button is narrower and reads as one phrase.

**2. Form submit button — 3-line label with floating arrow** (`/form`)
"REVEAL MY FREE KABBALAH ASTROLOGY READING" wraps to 3 lines at 390 px because of the 0.28em tracking; the arrow again sits centered on the right. Fix: shorten to "REVEAL MY FREE READING" (or "Reveal my reading") on this button and tighten letter-spacing to ~0.18em on mobile so it sits on one line.

**3. Footer tap targets too small** (home page)
Footer links (About / Terms / Privacy) render at 10px with no vertical padding. On mobile they stack and the tap zones are well under the 44 px minimum. Fix: bump mobile font-size to 12px, add `py-2` to each link, and increase the gap between stacked links from `gap-2` to `gap-3`.

**4. Section vertical rhythm on mobile**
Each section uses `py-[clamp(6rem,12vh,9rem)]` → 96 px top + 96 px bottom on a phone. Combined with `Reveal` fade-ins, large empty bands appear between sections. Fix: lower the mobile end of the clamp to `clamp(3.5rem,12vh,9rem)` on the 4 narrative sections (What you receive, Origins, Free will, Tikkun Olam) so they breathe without feeling sparse.

### Lower impact polish

**5. "Influence, not prediction" — stray space inside parens**
Renders as `( Mazalot )` because of a literal `{" "}` before the italic span. Fix: remove the leading space so it reads `(Mazalot)`.

**6. "What you receive" heading is heavy on mobile**
`clamp(38px, 6.5vw, 76px)` → 38px on a 390px phone, with `letterSpacing: -0.025em`. Same on the other section h2s. Fix: drop the mobile floor to 32px (`clamp(32px, 6.5vw, 76px)`) so the section heads don't compete with the hero h1.

**7. "Receive your reading" closing CTA (OxbloodCTA) min-width**
`min-w-[260px]` works at 390px but breaks the layout at <320px. Fix: reduce to `min-w-[220px]` and let `max-w-[340px]` retain the desktop width.

**8. Footer disclaimer line-spacing**
"Kabbalah Circle is an independent unaffiliated project." at 10px + 0.12em tracking is dense on a phone. Fix: drop tracking to 0.08em and add `lineHeight: 1.5`.

### Technical scope

Files touched:
- `src/components/landing/PrimaryCTA.tsx` — no change (component stays generic; we just change the label passed in).
- `src/routes/index.tsx` — hero label, `OxbloodCTA` min-width, section h2 clamp, `Mazalot` whitespace, footer link sizing/padding, footer disclaimer tracking.
- `src/routes/form.tsx` — submit button label + letter-spacing override on mobile.

No changes to: `TikkunWheel`, `SefirotTree`, copy of the reading page sections, fonts, color tokens, or any data.

### Out of scope

- Wheel size, animation, or styling (explicit user request).
- Reading page card layout — already reads cleanly at 390 px.
- About page — content fits well, no spacing issues observed.

Approve and I'll apply these edits.