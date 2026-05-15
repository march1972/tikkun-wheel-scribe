import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/Screen";

export const Route = createFileRoute("/reading/more")({
  component: () => <Screen name="Reading Part Two" next={{ to: "/", label: "Return" }} />,
});
