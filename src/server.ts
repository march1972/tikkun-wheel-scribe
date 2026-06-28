import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

const IMMUTABLE_EXT = /\.(js|mjs|css|woff2?|ttf|otf|eot|png|jpe?g|webp|avif|gif|ico|svg)$/i;
const PUBLIC_FILES = new Set([
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/manifest.json",
  "/site.webmanifest",
]);

function applyCacheHeaders(request: Request, response: Response): Response {
  // Don't touch error/redirect responses, or anything that set its own policy.
  if (response.status >= 300) return response;
  if (response.headers.has("cache-control")) return response;

  const url = new URL(request.url);
  const path = url.pathname;

  // Skip server-fn / API routes — handlers manage their own caching.
  if (path.startsWith("/_serverFn") || path.startsWith("/api/")) return response;

  let cacheControl: string | null = null;

  // Hashed build assets — long-lived, immutable.
  if (
    path.startsWith("/_build/") ||
    path.startsWith("/assets/") ||
    /\/[^/]+-[A-Za-z0-9_-]{8,}\.[a-z0-9]+$/i.test(path)
  ) {
    cacheControl = "public, max-age=31536000, immutable";
  } else if (PUBLIC_FILES.has(path) || (IMMUTABLE_EXT.test(path) && !path.endsWith(".html"))) {
    cacheControl = "public, max-age=86400, must-revalidate";
  } else {
    const ct = response.headers.get("content-type") ?? "";
    if (ct.includes("text/html")) {
      cacheControl = "public, max-age=0, must-revalidate";
    }
  }

  if (!cacheControl) return response;

  const headers = new Headers(response.headers);
  headers.set("cache-control", cacheControl);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return applyCacheHeaders(request, normalized);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};

