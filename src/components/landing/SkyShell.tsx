import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { StarField } from "./StarField";
import { C_SKY_GRAD, C_INK, C_INK_SOFT, C_GOLD, HEAD } from "@/lib/landing-style";

export function SkyShell({
  children,
  starDensity = 240,
}: {
  children: ReactNode;
  starDensity?: number;
}) {
  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: C_SKY_GRAD, color: C_INK_SOFT }}
    >
      <StarField density={starDensity} opacity={0.85} />
      <div className="relative">
        <header className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1.25rem,2.5vh,2rem)]">
          <div className="mx-auto max-w-6xl flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontSize: "clamp(15px, 1.6vw, 18px)",
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                Kabbalah
              </span>
              <span
                aria-hidden
                style={{
                  color: C_GOLD,
                  fontSize: "0.55em",
                  transform: "translateY(-1px)",
                }}
              >
                ✦
              </span>
              <span style={{ fontWeight: 400 }}>Astrology</span>
            </Link>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
