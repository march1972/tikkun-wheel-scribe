import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TikkunWheel } from "@/components/TikkunWheel";
import { useResponsiveWheelSize } from "@/hooks/useResponsiveWheelSize";
import { ConstellationGlyph } from "@/components/ConstellationGlyph";

export const Route = createFileRoute("/spinning")({
  component: Spinning,
});

function Spinning() {
  const navigate = useNavigate();
  const [target, setTarget] = useState<string | null>(null);
  const wheelSize = useResponsiveWheelSize(0.8, 260, 420);

  useEffect(() => {
    const t = sessionStorage.getItem("tikkun_target_sign");
    if (!t) {
      navigate({ to: "/" });
      return;
    }
    setTarget(t);
    const id = setTimeout(() => navigate({ to: "/snippet" }), 2500);
    return () => clearTimeout(id);
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-forest-deep px-6 text-cream">
      <TikkunWheel size={wheelSize} state="spinning" targetKey={target} />
      <p
        className="mt-10 text-[11px] font-semibold uppercase"
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--gold-bright)",
          letterSpacing: "0.32em",
        }}
      >
        Searching Tikkun pattern…
      </p>
      <ConstellationGlyph />
    </main>
  );
}
