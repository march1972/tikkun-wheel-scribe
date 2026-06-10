import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  words: string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  gapMs?: number;
  style?: CSSProperties;
  /** Optional punctuation rendered right after the typed word (e.g. "."). */
  suffix?: ReactNode;
  suffixStyle?: CSSProperties;
};

export function TypewriterWord({
  words,
  typeMs = 70,
  deleteMs = 40,
  holdMs = 2200,
  gapMs = 350,
  style,
  suffix,
  suffixStyle,
}: Props) {
  const [reduced, setReduced] = useState<boolean | null>(null);
  const [text, setText] = useState("");
  const [blinking, setBlinking] = useState(true);
  const stateRef = useRef({ wordIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced !== false) return;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const s = stateRef.current;
      const word = words[s.wordIdx];

      if (!s.deleting) {
        s.charIdx += 1;
        setText(word.slice(0, s.charIdx));
        if (s.charIdx >= word.length) {
          // Word fully typed — hold, cursor blinks
          setBlinking(true);
          s.deleting = true;
          timer = setTimeout(tick, holdMs);
        } else {
          setBlinking(false);
          timer = setTimeout(tick, typeMs);
        }
      } else {
        s.charIdx -= 1;
        setText(word.slice(0, Math.max(0, s.charIdx)));
        setBlinking(false);
        if (s.charIdx <= 0) {
          s.deleting = false;
          s.wordIdx = (s.wordIdx + 1) % words.length;
          timer = setTimeout(tick, gapMs);
        } else {
          timer = setTimeout(tick, deleteMs);
        }
      }
    };

    timer = setTimeout(tick, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reduced, words, typeMs, deleteMs, holdMs, gapMs]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  // Static fallback for SSR / reduced motion
  const display = reduced === false ? text : words[0];

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        textAlign: "left",
        whiteSpace: "nowrap",
      }}
    >
      {/* Invisible sizer reserves width of the longest word so layout never shifts */}
      <span aria-hidden style={{ visibility: "hidden" }}>
        <span style={style}>{longest}</span>
        {suffix != null && <span style={suffixStyle}>{suffix}</span>}
      </span>
      <span
        aria-live="polite"
        style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap" }}
      >
        <span style={style}>
          {display}
          {reduced === false && (
            <span
              aria-hidden
              className={blinking ? "tw-cursor tw-cursor-blink" : "tw-cursor"}
            />
          )}
        </span>
        {suffix != null && <span style={suffixStyle}>{suffix}</span>}
      </span>
      <style>{`
        .tw-cursor {
          display: inline-block;
          width: 0.06em;
          height: 0.92em;
          margin-left: 0.06em;
          vertical-align: -0.08em;
          background: currentColor;
          border-radius: 1px;
        }
        .tw-cursor-blink {
          animation: tw-blink 1.05s step-end infinite;
        }
        @keyframes tw-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
