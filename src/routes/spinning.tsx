import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TikkunWheel } from "@/components/TikkunWheel";
import { useResponsiveWheelSize } from "@/hooks/useResponsiveWheelSize";
import { SkyShell } from "@/components/landing/SkyShell";
import { HEAD, BODY, C_INK, C_DAWN, C_GOLD } from "@/lib/landing-style";

export const Route = createFileRoute("/spinning")({
  component: Spinning,
  head: () => ({ meta: [{ title: "Searching your Tikkun…" }] }),
});

function Spinning() {
  const navigate = useNavigate();
  const [target, setTarget] = useState<string | null>(null);
  const wheelSize = useResponsiveWheelSize(0.72, 220, 460);

  useEffect(() => {
    const t = sessionStorage.getItem("tikkun_target_sign");
    if (!t) {
      navigate({ to: "/" });
      return;
    }
    setTarget(t);
  }, [navigate]);

  return (
    <SkyShell starDensity={360}>
      <header className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1rem,2vh,1.5rem)]">
        <div className="mx-auto mt-[clamp(1rem,2vh,1.5rem)] text-center">
          <span
            style={{
              fontFamily: BODY,
              color: "rgba(80, 105, 150, 0.35)",
              fontSize: "10px",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Kabbalah Astrology
          </span>
        </div>
      </header>
      <section className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,4vh,3.5rem)] pb-[clamp(3rem,6vh,5rem)]">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1
            style={{
              fontFamily: HEAD,
              color: C_INK,
              fontWeight: 500,
              fontSize: "clamp(41px, 7.65vw, 95px)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
            }}
          >
            Reveal your{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400, color: C_DAWN }}>
              Tikkun
            </span>
          </h1>

          <div
            className="mt-[clamp(1.5rem,3.5vh,2.5rem)]"
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

          <p
            className="mt-[clamp(2rem,4vh,3rem)] font-semibold uppercase text-center"
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
    </SkyShell>
  );
}
