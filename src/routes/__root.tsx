import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import ogDefault from "@/assets/og-default.jpg.asset.json";

const SITE_URL = "https://tikkun.kabbalahcircle.com";
const OG_IMAGE = `${SITE_URL}${ogDefault.url}`;

function SilentHomeRedirect() {
  useEffect(() => {
    if (typeof window !== "undefined") window.location.replace("/");
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
      { name: "google-site-verification", content: "CSzhF1bOAOJyUFwazEdpmT1sP_8ghfkCg8TDaffyY28" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kabbalistic Astrology Free Tikkun Olam Reading" },
      {
        name: "description",
        content:
          "Free Kabbalistic Astrology reading from your date of birth — discover your Soul's Shadow (Gilgul), your Tikkun, and your daily Kavanah.",
      },
      { name: "author", content: "Kabbalah Circle" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:site_name", content: "Kabbalah Circle" },
      { property: "og:title", content: "Kabbalistic Astrology Free Tikkun Olam Reading" },
      {
        property: "og:description",
        content:
          "Free Kabbalistic Astrology reading from your date of birth — discover your Soul's Shadow (Gilgul), your Tikkun, and your daily Kavanah.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1216" },
      { property: "og:image:height", content: "640" },
      { property: "og:image:alt", content: "Kabbalah Astrology — Reveal your Tikkun" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kabbalistic Astrology Free Tikkun Olam Reading" },
      {
        name: "twitter:description",
        content:
          "Free Kabbalistic Astrology reading from your date of birth — discover your Soul's Shadow (Gilgul), your Tikkun, and your daily Kavanah.",
      },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "theme-color", content: "#0c1426" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://api.fontshare.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://cdn.fontshare.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Frank+Ruhl+Libre:wght@400;500;600;700&display=swap",
        fetchpriority: "high",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Frank+Ruhl+Libre:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "Kabbalah Circle",
              url: `${SITE_URL}/`,
              logo: OG_IMAGE,
              description:
                "An independent project sharing Kabbalistic Astrology rooted in the Sefer Yetzirah and the Zohar.",
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: `${SITE_URL}/`,
              name: "Kabbalah Circle",
              description: "Free Kabbalah Tikkun astrology readings.",
              publisher: { "@id": `${SITE_URL}/#organization` },
              inLanguage: "en",
            },
          ],
        }),
      },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=AW-18281814766",
        async: true,
      },
      {
        children:
          "window.dataLayer = window.dataLayer || [];" +
          "function gtag(){dataLayer.push(arguments);}" +
          "gtag('js', new Date());" +
          "gtag('config', 'AW-18281814766');",
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

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
