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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kabbalistic Astrology Free Tikkun Olam Reading" },
      {
        name: "description",
        content:
          "Free Kabbalistic Astrology reading from your date of birth. Discover your Soul's Shadow patterns (Gilgul), your spiritual work (Tikkun) and your daily mantra (Kavanah).",
      },
      { name: "author", content: "Kabbalah Circle" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:site_name", content: "Kabbalah Circle" },
      { property: "og:title", content: "Kabbalistic Astrology Free Tikkun Olam Reading" },
      {
        property: "og:description",
        content:
          "Free Kabbalistic Astrology reading from your date of birth — rooted in the Sefer Yetzirah and the Zohar.",
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
        content: "Free Kabbalistic Astrology reading from your date of birth.",
      },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "theme-color", content: "#0c1426" },
      { name: "description", content: "Free Kabbalistic Astrology readings based on birth dates & info on Jewish Astrology, Hebrew Astrology, Tikkun Olam, Kabbalah, Psychology" },
      { property: "og:description", content: "Free Kabbalistic Astrology readings based on birth dates & info on Jewish Astrology, Hebrew Astrology, Tikkun Olam, Kabbalah, Psychology" },
      { name: "twitter:description", content: "Free Kabbalistic Astrology readings based on birth dates & info on Jewish Astrology, Hebrew Astrology, Tikkun Olam, Kabbalah, Psychology" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/gyLXDS55k9gIhfeCCWLqWpCmUea2/social-images/social-1781245045765-vilna-gaon.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/gyLXDS55k9gIhfeCCWLqWpCmUea2/social-images/social-1781245045765-vilna-gaon.webp" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
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
