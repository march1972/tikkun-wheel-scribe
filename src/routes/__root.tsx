import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";

function SilentHomeRedirect() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.location.replace("/");
    }
  }, []);
  return null;
}

function ErrorComponent({ error }: { error: Error; reset: () => void }) {
  console.error(error);
  return <SilentHomeRedirect />;
}


export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tikkun Microsite" },
      { name: "description", content: "Kabbalah Astrology" },
      { name: "author", content: "Tikkun" },
      { property: "og:title", content: "Tikkun Microsite" },
      { property: "og:description", content: "Kabbalah Astrology" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: SilentHomeRedirect,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Recover from stale-chunk errors after a redeploy. When the browser is
  // holding an old index.html, lazy module imports 404 and clicks appear
  // to do nothing. Detect that and hard-reload once to pick up fresh assets.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const RELOAD_KEY = "tk_chunk_reload_ts";
    const isChunkError = (msg?: string) =>
      !!msg &&
      (msg.includes("Importing a module script failed") ||
        msg.includes("Failed to fetch dynamically imported module") ||
        msg.includes("error loading dynamically imported module") ||
        msg.includes("ChunkLoadError"));

    const maybeReload = () => {
      const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
      if (Date.now() - last < 10_000) return; // avoid reload loops
      sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
      window.location.reload();
    };

    const onError = (e: ErrorEvent) => {
      if (isChunkError(e.message) || isChunkError(e.error?.message)) maybeReload();
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const reason: any = e.reason;
      const msg = typeof reason === "string" ? reason : reason?.message;
      if (isChunkError(msg)) maybeReload();
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
