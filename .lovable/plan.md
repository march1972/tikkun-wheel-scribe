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
- Type does the work. Match the /terms voice exactly: section labels use **Fraunces 20px gold** (the same treatment as Terms' sub-headers like "Use of the service"). Body uses General Sans 15px / 1.7. No second type system.
- Use the **dawn red (`C_DAWN`)** as a deliberate accent — on the Hebrew letter (already), on one italicized word inside the hero sign name, and on the closing headline's emphasized word (matches the `/terms` H1 treatment of "Conditions" in dawn-red italic). Gold stays for labels and hover; red stays for emphasis only.
- Generous left-aligned columns at ~620px max-width, centered on the page. Stop centering body prose — left alignment reads as modern editorial.
- Section dividers = a single 1px hairline at 64px wide, low-opacity cream. No glyphs, no numerals.
- Zero ornament. No ✦, no corner brackets, no card frames, no quote glyphs, no roman numerals.

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
  Section label: "Life's Pattern" rendered in **Fraunces 20px gold** — identical to /terms sub-headers.
  Body paragraphs: General Sans 15px, line-height 1.7, cream-soft, LEFT-aligned (matches /terms body).

[ section: archetype ]
  Same column. Label: "Archetype" (Fraunces 20px gold).
  Archetype lines rendered as a serif italic stanza, large (clamp 26–40px), cream, left-aligned — like a poem.

[ section: life's work ] — same shell as life's pattern.

[ section: tikkun letter ]
  Two-column on desktop: left = oversized Hebrew letter in **dawn red** (the page's signature color), letter name in Fraunces italic cream + meaning in 11px tracked gold uppercase micro-label.
  Right = teaching paragraph, left-aligned body, /terms style.
  Stacks on mobile.

[ section: daily mantra — the moment ]
  Full-width breathing band. NO box, NO border, NO corners, NO quote marks.
  Label "Daily Mantra" (Fraunces 20px gold) centered above.
  Mantra: oversized Fraunces italic (clamp 32–56px), cream-bright, with a faint **dawn-red text-shadow halo** behind it — ties the moment back to the hero letter. No card, no ornament.
  This is the page's emotional peak — earned by scale and silence.

[ section: reflection ]
  Same column shell. Label "Reflection" (Fraunces 20px gold).
  Prompt as Fraunces italic 22–28px cream, left-aligned. No card, no quote glyph.

[ section: share ]
  Same column. Label "Share" (Fraunces 20px gold).
  Headline left-aligned Fraunces. Sub paragraph left-aligned body.
  Three explicit, obvious share buttons — pills with brand-recognizable icons + labels:
    • WhatsApp — green brand color background (#25D366), white icon + "WhatsApp" label.
    • Instagram — Instagram brand gradient background (purple → pink → orange), white icon + "Instagram" label.
    • Copy link — cream/gold outlined pill with link icon + "Copy link" label (toggles to "Copied ✓"). Slightly larger / equal weight so it's not a second-class option.
  Icons from `lucide-react` (Link2 for copy). For WhatsApp + Instagram we use inline brand SVGs since lucide doesn't ship brand marks — small inline components in the same file.
  All three pills are the same size and sit in a single flex row, wrap on mobile.

[ closing — go deeper ]
  Centered. Label "Next Chapter" (Fraunces 20px gold).
  Large Fraunces headline with one word in **dawn-red italic** — mirrors /terms H1.
  CTA at the bottom = a **Dawn variant of PrimaryCTA** — same shape, same uppercase tracked typography, same arrow, same hover lift/brighten transition as the existing gold PrimaryCTA — but textured in red:
    • background: `linear-gradient(135deg, #ff5a6e 0%, #e63946 55%, #b8262f 100%)` (a deep dawn red gradient with a brighter highlight at the top-left so it has dimension, not flat).
    • text color: cream (`C_INK`), not deep navy — keeps contrast and warmth.
    • boxShadow: `0 12px 44px -10px rgba(230,57,70,0.6)` — red glow drop, same depth recipe as the gold button.
    • subtle inner highlight: `inset 0 1px 0 rgba(255,255,255,0.18)` for a glossy lift.
  Implemented as a new `variant="dawn"` prop on `PrimaryCTA` (or a small wrapper) — gold variant on the rest of the site stays untouched.
  Generous vertical space above and below.
```

**No section numbering** — user disliked the numerals. Labels alone, in the /terms Fraunces-gold treatment, carry the rhythm.

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
