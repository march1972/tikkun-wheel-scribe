import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";

export const Route = createFileRoute("/maxspins")({
  component: () => <Screen name="Max Spins" next={{ to: "/form", label: "Continue" }} />,
});
