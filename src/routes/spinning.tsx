import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TikkunWheel } from "@/components/TikkunWheel";
import { StarField } from "@/components/landing/StarField";
import { useResponsiveWheelSize } from "@/hooks/useResponsiveWheelSize";

export const Route = createFileRoute("/spinning")({
  component: Spinning,
  head: () => ({ meta: [{ title: "Searching your Tikkun…" }] }),
});

// ── Values copied from home (index.tsx) so this screen is identical ──
const HEAD = "var(--font-serif)";
const BODY = "var(--font-sans)";
const C_SKY_GRAD =
  "radial-gradient(55% 35% at 88% 0%, rgba(245,207,122,0.22) 0%, rgba(245,207,122,0) 60%), radial-gradient(70% 45% at 10% 100%, rgba(120,150,190,0.22) 0%, rgba(120,150,190,0) 65%), radial-gradient(60% 50% at 50% 35%, rgba(120,150,200,0.18) 0%, rgba(10,14,28,0) 70%), linear-gradient(180deg, #0c1426 0%, #1b2540 28%, #233055 55%, #2a3a5e 80%, #324468 100%)";
const C_INK = "#fdf6e6";
const C_INK_SOFT = "#ece3cf";
const C_GOLD = "#f0c868";
const C_DAWN = "#e63946";

function Spinning() {
  const navigate = useNavigate();
  const [target, setTarget] = useState<string | null>(null);
  const wheelSize = useResponsiveWheelSize(0.78, 220, 360);

  useEffect(() => {
    const t = sessionStorage.getItem("tikkun_target_sign");
    if (!t) {
      navigate({ to: "/" });
      return;
    }
    setTarget(t);
  }, [navigate]);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: C_SKY_GRAD, color: C_INK_SOFT }}
    >
      <StarField density={360} opacity={0.85} />

      <div className="relative">
        {/* ── TOP HEADER (identical to home) ─────────────────── */}
        <header className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1rem,2vh,1.5rem)]">
          <div className="mx-auto mt-[clamp(1rem,2vh,1.5rem)] text-center text-[#fdf7e7]">
            <span
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
            </span>
          </div>
        </header>

        {/* ── HERO (identical layout to home) ────────────────── */}
        <section className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,4vh,3.5rem)] pb-[clamp(3rem,6vh,5rem)]">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            {/* halo glow behind the wheel (matches home) */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "clamp(360px, 70vw, 680px)",
                height: "clamp(360px, 70vw, 680px)",
                background: `radial-gradient(circle, ${C_GOLD}33 0%, ${C_DAWN}1f 40%, transparent 70%)`,
                filter: "blur(10px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            <h1
              className="relative"
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontWeight: 500,
                fontSize: "clamp(48px, 9vw, 112px)",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
              }}
            >
              Reveal your{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: C_DAWN,
                }}
              >
                Tikkun
              </span>
            </h1>

            <div className="relative mt-[clamp(1.5rem,3.5vh,2.5rem)] flex w-full justify-center">
              <div
                className="relative rounded-full"
                style={{
                  filter:
                    "drop-shadow(0 0 60px rgba(240,200,104,0.32)) drop-shadow(0 0 30px rgba(255,233,184,0.22))",
                }}
              >
                <TikkunWheel
                  size={wheelSize}
                  state="spinning"
                  targetKey={target}
                  onSettle={() => navigate({ to: "/snippet" })}
                />
              </div>
            </div>

            <p
              className="relative mt-[clamp(2rem,4vh,3rem)] font-semibold uppercase"
              style={{
                fontFamily: BODY,
                color: C_DAWN,
                letterSpacing: "0.32em",
                fontSize: "clamp(10px, 1.4vw, 13px)",
              }}
            >
              Searching Tikkun patterns…
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
