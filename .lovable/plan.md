# Animated Typing Headline

Turn the hero headline into a typewriter animation that cycles through three words.

## Behavior

1. "Reveal your" stays fixed; only the gold italic word animates.
2. On page load, the word **Tikkun** types out letter by letter with a blinking cursor.
3. After a short pause (~2.2s), the word deletes itself, then types **Purpose**.
4. Pause again, delete, then type **Patterns**.
5. Loop back to **Tikkun** and repeat continuously.

## Details

- A thin gold blinking cursor bar appears while typing/deleting, in the same dawn-gold style as the current word.
- The headline reserves space for the longest word ("Patterns") so the wheel and content below never jump as letters appear/disappear.
- Typing speed ~70ms per letter, deleting slightly faster (~40ms), feels smooth and deliberate.
- Users with "reduce motion" enabled see the static word "Tikkun" with no animation.
- The trailing period stays after the animated word.

## Technical

- New small component `TypewriterWord` in `src/components/landing/` driven by `useEffect` timers (no new packages).
- `src/routes/index.tsx`: replace the static "Tikkun" span with the new component, passing the words `["Tikkun", "Purpose", "Patterns"]`.
- No backend, content JSON, or other pages touched.