import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TikkunWheel } from "@/components/TikkunWheel";
import { useResponsiveWheelSize } from "@/hooks/useResponsiveWheelSize";
import { StarField } from "@/components/landing/StarField";
import {
  HEAD,
  BODY,
  C_INK,
  C_INK_SOFT,
  C_DAWN,
  C_GOLD,
  C_SKY_GRAD,
} from "@/lib/landing-style";

export const Route = createFileRoute("/spinning")({
  component: Spinning,
  head: () => ({
    meta: [
      { title: "Searching your Tikkun… — Kabbalah Astrology" },
      { name: "description", content: "Spinning the Tikkun wheel to surface a Shadow pattern from your Kabbalah astrology chart." },
      { property: "og:title", content: "Searching your Tikkun…" },
      { property: "og:description", content: "Spinning the Tikkun wheel to surface a Shadow pattern from your Kabbalah astrology chart." },
      { property: "og:url", content: "https://tikkun.kabbalahcircle.com/spinning" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://tikkun.kabbalahcircle.com/spinning" }],
  }),
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
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ color: C_INK_SOFT }}
    >
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{ background: C_SKY_GRAD }}
      />
      <StarField density={360} opacity={0.85} />

      <header className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1rem,2vh,1.5rem)]">
        <div className="mx-auto mt-[clamp(1rem,2vh,1.5rem)] text-center">
          <span
            style={{
              fontFamily: BODY,
              color: "rgba(106, 128, 166, 0.35)",
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

      <section className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(1.25rem,2.5vh,2.25rem)] pb-[clamp(3rem,6vh,5rem)]">
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
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
              fontSize: "clamp(38px, 7.1vw, 88px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
            }}
          >
            Reveal your{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400, color: C_DAWN }}>
              Tikkun
            </span>
          </h1>

          <div
            className="relative mt-[clamp(1.5rem,3.5vh,2.5rem)]"
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
    </main>
  );
}
