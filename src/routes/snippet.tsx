import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";

export const Route = createFileRoute("/snippet")({
  component: () => <Screen name="Snippet" next={{ to: "/maxspins", label: "Continue" }} />,
});
