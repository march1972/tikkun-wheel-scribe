import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ConstellationGlyph } from "./ConstellationGlyph";

type NextLink = {
  to: string;
  label: string;
};

interface ScreenProps {
  name: string;
  next?: NextLink;
  children?: ReactNode;
}

export function Screen({ name, next, children }: ScreenProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-forest-deep px-6 text-cream">
      <h1
        className="text-center text-5xl italic text-cream md:text-7xl"
        style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
      >
        {name}
      </h1>

      {children}

      {next && (
        <Link
          to={next.to}
          className="mt-12 text-xs uppercase tracking-[0.3em] text-gold-bright transition-opacity hover:opacity-70"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {next.label}
        </Link>
      )}

      <ConstellationGlyph />
    </main>
  );
}
