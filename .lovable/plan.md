# /reading — total redesign, modern editorial

Strip the ornamental "ancient mystical" layer (diamonds, stars, roman numerals, gold corner brackets, framed cards) and rebuild the page as a modern, editorial, confident scroll. Think contemporary art-book / Apple newsroom / Aesop journal: lots of breathing room, a single strong type voice, restrained color, a clear vertical rhythm carried by typography alone — not decoration.

## Diagnosis of current state

- Star/diamond glyphs (✦) feel dated and clip-arty.
- Roman numerals add noise without hierarchy.
- Reflection card and Mantra card have inconsistent treatment (one bordered + cornered, the other rounded+quote glyph) — looks unfinished.
- Body text alignment mixes centered prose and left-aligned letter-teaching column.
- Alternating dawn/deep band backgrounds feel themed rather than designed; pace is choppy.
- Hero glow is good; rest of page doesn't live up to it.

## New design language

**Principles**
- One background, infinite scroll. Drop the band-alternation. Single deep night gradient top→bottom, with a few soft luminous "moments" placed where the eye should stop (hero, mantra, closing).
- Type does the work. Fraunces (serif) for everything that should breathe; General Sans uppercase micro-labels for section markers. No glyphs, no numerals, no corner brackets.
- Generous left-aligned columns at ~620px max-width, centered on the page. Stop centering body prose — left alignment reads as modern editorial; centered prose reads as wedding invitation.
- Section dividers = a single 1px hairline at 64px wide, low-opacity cream. Not gold, not animated, not glyph'd.
- Gold reserved for accents only: micro-labels, one word in the headline, hover states.

**Page structure (same content, new shell)**

```text
[ hero ]
  Centered. Oversized Hebrew letter with soft dawn halo (keep).
  Small uppercase eyebrow under it: "your tikkun sign"
  Sign name in large Fraunces italic.
  Below: the mantra quote in big serif, no quote marks, no frame, no glyphs.
  Tiny "scroll" hint at bottom.

[ section: life's pattern ]
  Left-aligned column, max 620px, centered on page.
  Eyebrow: "01 — life's pattern" in 10px tracked uppercase cream/60.
  Heading: short serif title pulled from copy OR repeat eyebrow as title (decision: title = section name in large Fraunces).
  Body paragraphs in 16px General Sans, line-height 1.75, color cream/85, LEFT-aligned.

[ section: archetype ]
  Same column. Eyebrow "02 — archetype".
  Archetype lines rendered as a single multi-line serif italic block, large (clamp 28–44px), left-aligned, color cream — feels like a poem stanza, no centering, no glyphs.

[ section: life's work ] — same shell as 01.

[ section: tikkun letter ]
  Two-column on desktop: left = oversized Hebrew letter (no glow, just color), letter name in italic + meaning in uppercase micro-label.
  Right = teaching paragraph, left-aligned body.
  Stacks on mobile.

[ section: daily mantra — the moment ]
  Full-width breathing band. NO box, NO border, NO corners, NO quote marks.
  Centered, oversized Fraunces italic (clamp 32–56px), color cream-bright with a faint dawn glow behind the text (text-shadow, not a card).
  Tiny eyebrow above: "daily mantra".
  This is the page's emotional peak — earned by scale and silence, not ornament.

[ section: reflection ]
  Same column shell. Eyebrow "06 — reflection".
  Prompt as a medium serif (22–28px), left-aligned, italic. No card, no quote glyph.

[ section: share ]
  Same column. Eyebrow "07 — share".
  Headline left-aligned serif. Sub paragraph left-aligned.
  Three minimal text-link buttons in a row: WhatsApp · Instagram · Copy link.
  Underline-on-hover with gold; no pills, no borders.

[ closing — go deeper ]
  Centered. Eyebrow "next chapter".
  Large serif headline.
  Single PrimaryCTA. Generous vertical space above and below.
```

**Section numbering**
- Use plain Arabic digits "01 / 02 / 03" inline with the eyebrow label, not roman numerals stacked above. Format: `01 — life's pattern`. If user dislikes any numbering, easy to drop and keep just the label.

**Removed for good**
- All ✦ / diamond / star glyphs.
- All hairline-with-glyph dividers between bands.
- Roman numerals.
- Gold corner brackets on the mantra card.
- The mantra card frame itself.
- The reflection card frame.
- Quote glyphs (`"`).
- Band background alternation.

**Kept**
- Hero halo on the Hebrew letter (it works).
- Site header "Kabbalah Astrology" centered (from previous turn).
- Fraunces + General Sans pairing.
- Existing colors: cream / gold / dawn-rose / deep navy. Just used with more restraint.

## Files touched
- `src/routes/reading.tsx` — full rewrite of layout, no copy changes, no data changes.
- Possibly `src/lib/landing-style.ts` — no new tokens needed; `C_BAND_DAWN` becomes unused (leave defined, harmless).

## Out of scope
- No copy edits.
- No routing / data / component-library changes.
- Other pages (/index, /history, /snippet, /terms, /privacy) untouched in this pass.

## QA after change
- Screenshot /reading at 390 and 1366.
- Confirm: zero glyph ornaments anywhere; consistent left-aligned column rhythm; single mantra moment lands as the peak; no inconsistent card treatments; mobile stacks cleanly.
