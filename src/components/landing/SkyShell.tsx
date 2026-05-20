import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { StarField } from "./StarField";
import { C_SKY_GRAD, C_INK_SOFT, C_MUTED, BODY } from "@/lib/landing-style";

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
        <header className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1rem,2vh,1.5rem)]">
          <div className="mx-auto max-w-6xl">
            <Link
              to="/"
              style={{
                fontFamily: BODY,
                color: "rgba(160, 180, 210, 0.55)",
                fontSize: "10px",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                fontWeight: 600,
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
