import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { FREE_SPINS_BEFORE_FORM, setCurrentSpinNumber } from "@/lib/spinAttempts";
import { randomTikkunSign, signById } from "@/lib/tikkun-data";

export const Route = createFileRoute("/form")({
  component: FormRedirect,
  head: () => ({ meta: [{ title: "See your real Tikkun pattern" }] }),
});

function FormRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    // Ensure snippet has a target sign to render
    const existing = sessionStorage.getItem("tikkun_target_sign");
    if (!signById(existing)) {
      sessionStorage.setItem("tikkun_target_sign", randomTikkunSign(null).id);
    }
    // Force snippet into form-mode (spin > FREE_SPINS_BEFORE_FORM)
    setCurrentSpinNumber(FREE_SPINS_BEFORE_FORM + 1);
    navigate({ to: "/snippet", replace: true });
  }, [navigate]);
  return null;
}
