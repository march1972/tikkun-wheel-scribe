import { useEffect, useState } from "react";

/**
 * Returns a pixel size for the TikkunWheel that scales with viewport:
 *   min(vwFraction * 100vw, max) clamped to [min, max].
 * SSR-safe (returns max on first render).
 */
export function useResponsiveWheelSize(
  vwFraction = 0.8,
  min = 240,
  max = 420,
): number {
  const [size, setSize] = useState(() => {
    if (typeof window === "undefined") return min;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const next = Math.min(vw * vwFraction, vh * 0.55, max);
    return Math.max(min, Math.round(next));
  });

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Constrain by both width and height so it never overflows on short screens.
      const next = Math.min(vw * vwFraction, vh * 0.55, max);
      setSize(Math.max(min, Math.round(next)));
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);
    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, [vwFraction, min, max]);

  return size;
}
