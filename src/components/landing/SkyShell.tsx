import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { StarField } from "./StarField";
import { C_SKY_GRAD, C_INK_SOFT, BODY } from "@/lib/landing-style";

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
              className="transition-opacity duration-300 hover:opacity-100"
              style={{
                fontFamily: BODY,
                color: "rgba(241, 233, 213, 0.7)",
                fontSize: "clamp(11px, 1.1vw, 12px)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              Kabbalah Astrology
            </Link>
          </div>
        </header>
        {children}
      </div>
    </main>
  );
}
