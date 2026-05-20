export function StarField({
  density = 90,
  opacity = 0.7,
  seedOffset = 0,
  driftSeconds = 90,
}: {
  density?: number;
  opacity?: number;
  seedOffset?: number;
  driftSeconds?: number;
}) {
  const mulberry32 = (a: number) => {
    let t = a >>> 0;
    return () => {
      t = (t + 0x6d2b79f5) >>> 0;
      let x = t;
      x = Math.imul(x ^ (x >>> 15), x | 1);
      x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  };
  const stars = Array.from({ length: density }).map((_, i) => {
    const rng = mulberry32((i + 1) * 2654435761 + seedOffset * 97);
    rng(); rng();
    const left = rng() * 100;
    const top = rng() * 100;
    const v = rng();
    const big = v > 0.92;
    const mid = v > 0.78 && !big;
    const size = big ? 2.5 : mid ? 1.6 : 1;
    const o = 0.45 + rng() * 0.55;
    const tint = rng();
    const bg = tint > 0.93 ? "#a8c8e8" : tint > 0.86 ? "#ffd6b8" : "#fffdf3";
    return (
      <span
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: bg,
          opacity: o * opacity,
          boxShadow: big
            ? "0 0 8px rgba(245,207,122,0.85), 0 0 14px rgba(255,176,136,0.4)"
            : mid
              ? "0 0 4px rgba(253,246,230,0.6)"
              : undefined,
        }}
      />
    );
  });
  const driftName = `tk-drift-${seedOffset}`;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes ${driftName} {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(-2%, -1.2%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
      <div
        className="absolute inset-0"
        style={{
          animation: `${driftName} ${driftSeconds}s ease-in-out infinite`,
          willChange: "transform",
        }}
      >
        {stars}
      </div>
    </div>
  );
}
