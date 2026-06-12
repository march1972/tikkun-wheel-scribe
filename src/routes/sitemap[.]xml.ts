import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SIGNS } from "@/data/tikkun-lookup";

const BASE_URL = "https://tikkun.kabbalahcircle.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);

        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
          { path: "/history", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/kabbalistic-astrology", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/kabbalistic-astrology-reading", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/jewish-astrology", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/hebrew-astrology", changefreq: "monthly", priority: "0.9", lastmod: today },
          { path: "/about", changefreq: "monthly", priority: "0.7", lastmod: today },
          { path: "/tikkun", changefreq: "monthly", priority: "0.7", lastmod: today },
          ...SIGNS.map((s) => ({
            path: `/tikkun/${s.id}`,
            changefreq: "monthly" as const,
            priority: "0.8",
            lastmod: today,
          })),
          { path: "/privacy", changefreq: "yearly", priority: "0.3", lastmod: today },
          { path: "/terms", changefreq: "yearly", priority: "0.3", lastmod: today },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
