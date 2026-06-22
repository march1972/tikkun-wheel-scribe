import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { getSpinSnippet } from "@/data/tikkun-lookup";

export const Route = createFileRoute("/form")({
  component: FormRedirect,
  head: () => ({
    meta: [
      { title: "See your real Tikkun pattern" },
    ],
  }),
});

function FormRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    // Ensure /snippet has a sign to display behind the form.
    const existing = sessionStorage.getItem("tikkun_target_sign");
    if (!existing) {
      const result = getSpinSnippet([]);
      if (!result.exhausted && result.sign) {
        sessionStorage.setItem("tikkun_target_sign", result.sign.id);
        sessionStorage.setItem("tikkun_seen_signs", JSON.stringify(result.seen));
      }
    }
    // Mark snippet as form-mode by exhausting seen signs.
    sessionStorage.setItem("tikkun_force_form", "1");
    navigate({ to: "/snippet", replace: true });
  }, [navigate]);
  return null;
}
