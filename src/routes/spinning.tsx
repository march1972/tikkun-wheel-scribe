import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { TikkunWheel } from "@/components/TikkunWheel";
import { SkyShell } from "@/components/landing/SkyShell";
import { HEAD, BODY, C_INK, C_DAWN } from "@/lib/landing-style";
import { randomTikkunSign, signById } from "@/lib/tikkun-data";

export const Route = createFileRoute("/spinning")({
  component: Spinning,
  head: () => ({ meta: [{ title: "Searching your Tikkun…" }] }),
});

// Deterministic transition duration. Always advance regardless of animation.
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
  const targetRef = useRef<string>(typeof window === "undefined" ? "aries" : resolveTarget());
  const navigatedRef = useRef(false);

  // Preload /snippet so the next hop is instant.
  useEffect(() => {
    router.preloadRoute({ to: "/snippet" }).catch(() => {});
  }, [router]);

  // Single deterministic timer drives the transition — the wheel is visual only.
  useEffect(() => {
    const id = setTimeout(() => {
      if (navigatedRef.current) return;
      navigatedRef.current = true;
      navigate({ to: "/snippet" });
    }, SPIN_DURATION_MS);
    return () => clearTimeout(id);
  }, [navigate]);

  return (
    <SkyShell starDensity={140}>
      <section className="relative px-[clamp(1.25rem,5vw,3rem)] pt-[clamp(2rem,4vh,3.5rem)] pb-[clamp(3rem,6vh,5rem)]">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1
            style={{
              fontFamily: HEAD,
              color: C_INK,
              fontWeight: 500,
              fontSize: "clamp(40px, 8vw, 96px)",
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
              width: "clamp(280px, 85vw, 440px)",
              aspectRatio: "1 / 1",
              filter:
                "drop-shadow(0 0 60px rgba(240,200,104,0.32)) drop-shadow(0 0 30px rgba(255,233,184,0.22))",
            }}
          >
            <TikkunWheel state="spinning" targetKey={targetRef.current} />
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
