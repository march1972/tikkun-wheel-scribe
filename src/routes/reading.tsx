import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";

export const Route = createFileRoute("/reading")({
  component: () => <Screen name="Reading" next={{ to: "/reading/more", label: "Continue" }} />,
});
