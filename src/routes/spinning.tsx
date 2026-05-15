import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";

export const Route = createFileRoute("/spinning")({
  component: () => <Screen name="Spinning" next={{ to: "/snippet", label: "Continue" }} />,
});
