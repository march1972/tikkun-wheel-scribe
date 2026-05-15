import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";

export const Route = createFileRoute("/")({
  component: () => <Screen name="Landing" next={{ to: "/spinning", label: "Begin" }} />,
});
