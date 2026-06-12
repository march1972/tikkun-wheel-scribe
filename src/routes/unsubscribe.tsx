import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { SkyShell } from "@/components/landing/SkyShell";
import {
  HEAD,
  BODY,
  C_INK,
  C_INK_SOFT,
  C_MUTED,
  C_GOLD,
  C_DAWN,
  C_RULE,
} from "@/lib/landing-style";

const search = z.object({ token: z.string().optional() });

export const Route = createFileRoute("/unsubscribe")({
  validateSearch: search,
  component: UnsubscribePage,
  head: () => ({
    meta: [
      { title: "Unsubscribe — Kabbalah Circle" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type State =
  | { kind: "checking" }
  | { kind: "valid" }
  | { kind: "already" }
  | { kind: "invalid" }
  | { kind: "submitting" }
  | { kind: "done" }
  | { kind: "error"; msg: string };

function UnsubscribePage() {
  const { token } = Route.useSearch();
  const [state, setState] = useState<State>({ kind: "checking" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!token) {
        setState({ kind: "invalid" });
        return;
      }
      try {
        const res = await fetch(
          `/email/unsubscribe?token=${encodeURIComponent(token)}`,
          { method: "GET" },
        );
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok || data.error) {
          setState({ kind: "invalid" });
          return;
        }
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setState({ kind: "already" });
          return;
        }
        if (data.valid) {
          setState({ kind: "valid" });
          return;
        }
        setState({ kind: "invalid" });
      } catch {
        if (!cancelled) setState({ kind: "error", msg: "Could not check link. Please try again." });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const onConfirm = async () => {
    if (!token) return;
    setState({ kind: "submitting" });
    try {
      const res = await fetch(`/email/unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setState({ kind: "done" });
      } else if (data.reason === "already_unsubscribed") {
        setState({ kind: "already" });
      } else {
        setState({ kind: "error", msg: "Could not unsubscribe — please try again." });
      }
    } catch {
      setState({ kind: "error", msg: "Could not unsubscribe — please try again." });
    }
  };

  return (
    <SkyShell starDensity={180}>
      <section className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
        <p style={{ fontFamily: BODY, color: C_GOLD, fontSize: 11, letterSpacing: "0.32em", fontWeight: 600 }}>
          KABBALAH CIRCLE
        </p>
        <h1
          style={{
            fontFamily: HEAD,
            color: C_INK,
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 400,
            margin: "16px 0 24px",
            letterSpacing: "-0.01em",
          }}
        >
          Unsubscribe
        </h1>

        {state.kind === "checking" && (
          <p style={{ fontFamily: BODY, color: C_INK_SOFT, fontSize: 15 }}>Checking your link…</p>
        )}

        {state.kind === "valid" && (
          <>
            <p style={{ fontFamily: BODY, color: C_INK_SOFT, fontSize: 16, lineHeight: 1.7, maxWidth: 420 }}>
              Confirm you'd like to unsubscribe from Kabbalah Circle emails. You can always sign back up later.
            </p>
            <button
              onClick={onConfirm}
              style={{
                marginTop: 32,
                fontFamily: BODY,
                background: C_DAWN,
                color: C_INK,
                border: `1px solid ${C_RULE}`,
                borderRadius: 2,
                padding: "14px 28px",
                fontSize: 13,
                letterSpacing: "0.18em",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              Confirm unsubscribe
            </button>
          </>
        )}

        {state.kind === "submitting" && (
          <p style={{ fontFamily: BODY, color: C_INK_SOFT, fontSize: 15 }}>Unsubscribing…</p>
        )}

        {state.kind === "done" && (
          <p style={{ fontFamily: HEAD, fontStyle: "italic", color: C_GOLD, fontSize: 22 }}>
            You're unsubscribed. With light.
          </p>
        )}

        {state.kind === "already" && (
          <p style={{ fontFamily: BODY, color: C_INK_SOFT, fontSize: 15 }}>
            This email is already unsubscribed.
          </p>
        )}

        {state.kind === "invalid" && (
          <p style={{ fontFamily: BODY, color: C_MUTED, fontSize: 14 }}>
            This unsubscribe link is invalid or has expired.
          </p>
        )}

        {state.kind === "error" && (
          <p style={{ fontFamily: BODY, color: C_DAWN, fontSize: 14 }}>{state.msg}</p>
        )}
      </section>
    </SkyShell>
  );
}
