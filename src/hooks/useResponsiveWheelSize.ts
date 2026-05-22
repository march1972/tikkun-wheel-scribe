import { useEffect, useState } from "react";

/**
 * Returns a stable pixel size for the TikkunWheel.
 *
 * The first render is always the mobile-safe minimum so SSR and hydration match.
 * The browser then measures once mounted and on resize/orientation changes.
 */
export function useResponsiveWheelSize(
  vwFraction = 0.8,
  min = 240,
  max = 420,
): number {
  const compute = () => {
    if (typeof window === "undefined") return min;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const next = Math.min(vw * vwFraction, vh * 0.5, max);
    return Math.max(min, Math.round(next));
  };

  const [size, setSize] = useState<number>(() => compute());

  useEffect(() => {
    const onResize = () => setSize(compute());
    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vwFraction, min, max]);

  return size;
}
