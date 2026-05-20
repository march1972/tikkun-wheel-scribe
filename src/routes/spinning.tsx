import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TikkunWheel } from "@/components/TikkunWheel";
import { useResponsiveWheelSize } from "@/hooks/useResponsiveWheelSize";
import { SkyShell } from "@/components/landing/SkyShell";
import { HEAD, BODY, C_INK, C_GOLD_BRIGHT, C_DAWN } from "@/lib/landing-style";

export const Route = createFileRoute("/spinning")({
  component: Spinning,
  head: () => ({ meta: [{ title: "Searching your Tikkun…" }] }),
});

function Spinning() {
  const navigate = useNavigate();
  const [target, setTarget] = useState<string | null>(null);
  const wheelSize = useResponsiveWheelSize(0.78, 240, 420);

  useEffect(() => {
    const t = sessionStorage.getItem("tikkun_target_sign");
    if (!t) {
      navigate({ to: "/" });
      return;
    }
    setTarget(t);
  }, [navigate]);

  return (
    <SkyShell starDensity={220}>
      <section className="relative flex min-h-[calc(100vh-3rem)] flex-col items-center justify-center px-[clamp(1rem,5vw,3rem)] py-[clamp(2rem,6vh,5rem)] text-center">
        <div
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
            color: C_GOLD_BRIGHT,
            letterSpacing: "0.32em",
            fontSize: "clamp(10px, 1.4vw, 13px)",
          }}
        >
          Searching Tikkun pattern…
        </p>
      </section>
    </SkyShell>
  );
}
