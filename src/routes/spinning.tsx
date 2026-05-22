import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { TikkunWheel } from "@/components/TikkunWheel";
import { StarField } from "@/components/landing/StarField";
import { useResponsiveWheelSize } from "@/hooks/useResponsiveWheelSize";
import { HEAD, BODY, C_SKY_GRAD, C_INK, C_INK_SOFT, C_DAWN } from "@/lib/landing-style";
import { randomTikkunSign, signById } from "@/lib/tikkun-data";

export const Route = createFileRoute("/spinning")({
  component: Spinning,
  head: () => ({ meta: [{ title: "Searching your Tikkun…" }] }),
});

const SPIN_DURATION_MS = 2800;

function resolveTarget(): string {
  if (typeof window === "undefined") return "aries";
  const existing = sessionStorage.getItem("tikkun_target_sign");
  if (signById(existing)) return existing as string;
  const fresh = randomTikkunSign().id;
  try {
    sessionStorage.setItem("tikkun_target_sign", fresh);
  } catch {}
  return fresh;
}

function Spinning() {
  const navigate = useNavigate();
  const router = useRouter();
  const wheelSize = useResponsiveWheelSize(0.85, 280, 440);
  const targetRef = useRef<string>(typeof window === "undefined" ? "aries" : resolveTarget());
  const navigatedRef = useRef(false);

  useEffect(() => {
    router.preloadRoute({ to: "/snippet" }).catch(() => {});
  }, [router]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (navigatedRef.current) return;
      navigatedRef.current = true;
      navigate({ to: "/snippet" });
    }, SPIN_DURATION_MS);
    return () => clearTimeout(id);
  }, [navigate]);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: C_SKY_GRAD, color: C_INK_SOFT }}
    >
      <StarField density={360} opacity={0.85} />

      <div className="relative">
        {/* ── TOP HEADER (identical to /) ───────────────────── */}
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

        {/* ── HERO (identical h1 to /) ──────────────────────── */}
        <section className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,4vh,3.5rem)] pb-[clamp(3rem,6vh,5rem)]">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1
              className="relative"
              style={{
                fontFamily: HEAD,
                color: C_INK,
                fontWeight: 500,
                fontSize: "clamp(44px, 7.5vw, 96px)",
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

            <div
              className="mt-[clamp(1.5rem,3.5vh,2.5rem)]"
              style={{
                filter:
                  "drop-shadow(0 0 60px rgba(240,200,104,0.32)) drop-shadow(0 0 30px rgba(255,233,184,0.22))",
              }}
            >
              <TikkunWheel size={wheelSize} state="spinning" targetKey={targetRef.current} />
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
      </div>
    </main>
  );
}
