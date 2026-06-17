## Goal

Extend the shared `FAQ` array in `src/data/kabbalistic-astrology.ts` with new common Kabbalah questions. This array is rendered on `/kabbalistic-astrology` and emitted as FAQPage JSON-LD on both `/kabbalistic-astrology` and `/` (homepage) — so a single edit updates both surfaces.

## Skip (already covered)

- "What is Kabbalistic astrology?" — already in FAQ.
- "What is Tikkun?" / "What is my Tikkun?" — covered on `/what-is-tikkun`.
- "Does Kabbalah teach that the stars control our fate?" — already in FAQ.
- "What is the Kabbalah Centre?" — already in FAQ.
- "Connection to astrology?" — the entire page is about this.

## Add (12 new questions)

Append these `{q, a}` entries to the `FAQ` array, in this order:

1. **What is Kabbalah and where did it originate?** — Jewish mystical tradition; roots in Second Temple esotericism, codified in medieval Provence/Spain (Sefer ha-Bahir, Zohar), systematized in 16th-c. Safed.
2. **Is Kabbalah a religion?** — No. It's the mystical/esoteric layer of Judaism, not a separate religion.
3. **What is the Zohar?** — Central classical Kabbalah text; mystical commentary on the Torah, attributed to Rashbi, composed/compiled 13th-c. Spain.
4. **What does Ein Sof mean?** — "Without end" — the Infinite, the unknowable divine essence beyond all attributes, from which the Sefirot emanate.
5. **What are the Ten Sefirot?** — Ten emanations/channels through which Ein Sof acts in creation: Keter, Chokhmah, Binah, Chesed, Gevurah, Tiferet, Netzach, Hod, Yesod, Malkhut.
6. **How can Kabbalah improve daily life?** — Frames daily acts as opportunities for tikkun; tools like Rosh Chodesh awareness, kavanah, and refining the desire to receive into the desire to bestow.
7. **How does Kabbalah explain suffering and evil?** — Lurianic account: Shevirat HaKelim (breaking of the vessels) scattered sparks; suffering is the friction of that brokenness and the call to gather/repair.
8. **What is the purpose of meditation in Kabbalah?** — Steadying attention to align the soul with divine flow; classical practices include letter permutation (Sefer Yetzirah / Abulafia) and kavanot (Rashash).
9. **Do you need to read Hebrew to study Kabbalah?** — Helpful but not required; many primary texts are translated. Hebrew letters themselves carry meaning, so even learning the alephbet deepens study.
10. **Can non-Jews study Kabbalah?** — Traditional schools restrict transmission; modern/universalist schools (Kabbalah Centre, Ashlagian outreach) teach openly. Both views coexist.
11. **What is the difference between traditional and modern/New Age Kabbalah?** — Traditional: text-centered, Hebrew, within Jewish practice and lineage. Modern/New Age: universalist, English-first, often blended with self-help or other contemplative traditions.
12. **Where should a beginner start with Kabbalah?** — Aryeh Kaplan's translations (Sefer Yetzirah, Bahir), Daniel Matt's Essential Kabbalah, then the Zohar with the Pritzker translation; pair with the [Kabbalistic Astrology guide](/kabbalistic-astrology) and the free reading on this site.

## Implementation

- Single edit: append 12 entries to the `FAQ` array in `src/data/kabbalistic-astrology.ts`.
- No component changes — `Faq` renderer and JSON-LD emitters consume the array automatically.
- Keep tone consistent with existing answers (concise, accurate, no emojis, no hype).
