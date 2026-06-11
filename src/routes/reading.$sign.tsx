import { createFileRoute, redirect } from "@tanstack/react-router";
import { SIGNS } from "@/data/tikkun-lookup";

// Pretty deep-link route used in emails: /reading/Aries
// Validates the sign name (case-insensitive) and renders the existing /reading
// page via redirect, which already supports `?sign=<id>`.
export const Route = createFileRoute("/reading/$sign")({
  beforeLoad: ({ params }) => {
    const seg = (params.sign ?? "").toLowerCase();
    const match = SIGNS.find((s) => s.id === seg);
    if (!match) {
      throw redirect({ to: "/form" });
    }
    throw redirect({ to: "/reading", search: { sign: match.id } });
  },
});
