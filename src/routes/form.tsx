import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";

export const Route = createFileRoute("/form")({
  component: () => <Screen name="Form" next={{ to: "/reading", label: "Continue" }} />,
});
