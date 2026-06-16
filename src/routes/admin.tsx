import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  adminListVersions,
  adminUploadVersion,
  adminActivateVersion,
  adminDeleteVersion,
  adminWhoAmI,
} from "@/lib/admin-tikkun.functions";

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin — Tikkun Content" }, { name: "robots", content: "noindex,nofollow" }] }),
});

type Version = {
  id: string;
  filename: string;
  storagePath: string;
  notes: string | null;
  isActive: boolean;
  uploadedAt: string;
};

function AdminPage() {
  const [session, setSession] = useState<{ email: string } | null>(null);
  const [checking, setChecking] = useState(true);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [forbidden, setForbidden] = useState(false);

  const whoAmIFn = useServerFn(adminWhoAmI);
  const listFn = useServerFn(adminListVersions);
  const uploadFn = useServerFn(adminUploadVersion);
  const activateFn = useServerFn(adminActivateVersion);
  const deleteFn = useServerFn(adminDeleteVersion);

  const [versions, setVersions] = useState<Version[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [errs, setErrs] = useState<string[]>([]);

  // Auth check
  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const email = data.session?.user?.email ?? null;
      setSession(email ? { email } : null);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      const email = s?.user?.email ?? null;
      setSession(email ? { email } : null);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const refreshList = useCallback(async () => {
    setLoadingList(true);
    try {
      const rows = await listFn();
      setVersions(rows);
    } catch (e) {
      setErrs([(e as Error).message]);
    } finally {
      setLoadingList(false);
    }
  }, [listFn]);

  useEffect(() => {
    if (!session) return;
    whoAmIFn()
      .then((r) => {
        if (!r.isAdmin) {
          setForbidden(true);
          return;
        }
        setAdminEmail(r.email);
        void refreshList();
      })
      .catch(() => setForbidden(true));
  }, [session, whoAmIFn, refreshList]);

  if (checking) return <Shell><p>Loading…</p></Shell>;
  if (!session) return <SignInForm onSignedIn={(e) => setSession({ email: e })} />;
  if (forbidden)
    return (
      <Shell>
        <p className="text-red-700">
          Signed in as <strong>{session.email}</strong>, but this account is not authorized to manage Tikkun content.
        </p>
        <button
          className="mt-4 px-3 py-2 border rounded"
          onClick={async () => {
            await supabase.auth.signOut();
            setSession(null);
            setForbidden(false);
          }}
        >
          Sign out
        </button>
      </Shell>
    );

  return (
    <Shell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Tikkun Content Admin</h1>
        <div className="text-sm text-gray-600">
          {adminEmail}{" "}
          <button
            className="ml-3 underline"
            onClick={async () => {
              await supabase.auth.signOut();
              setSession(null);
              setAdminEmail(null);
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      <UploadForm
        busy={busy}
        onSubmit={async (payload) => {
          setBusy(true);
          setErrs([]);
          setMsg(null);
          try {
            const res = await uploadFn({ data: payload });
            if (!res.ok) {
              setErrs(res.errors);
            } else {
              setMsg(payload.activate ? "Uploaded and activated." : "Uploaded.");
              await refreshList();
            }
          } catch (e) {
            setErrs([(e as Error).message]);
          } finally {
            setBusy(false);
          }
        }}
      />

      {msg && <p className="mt-4 text-green-700">{msg}</p>}
      {errs.length > 0 && (
        <ul className="mt-4 text-red-700 text-sm list-disc pl-5">
          {errs.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      )}

      <h2 className="text-xl font-semibold mt-10 mb-3">Versions</h2>
      {loadingList ? (
        <p>Loading…</p>
      ) : versions.length === 0 ? (
        <p className="text-gray-600">No versions uploaded yet.</p>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Filename</th>
              <th className="text-left py-2">Uploaded</th>
              <th className="text-left py-2">Notes</th>
              <th className="text-left py-2">Status</th>
              <th className="text-right py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {versions.map((v) => (
              <tr key={v.id} className="border-b align-top">
                <td className="py-2 pr-3">{v.filename}</td>
                <td className="py-2 pr-3 whitespace-nowrap">
                  {new Date(v.uploadedAt).toLocaleString()}
                </td>
                <td className="py-2 pr-3">{v.notes ?? ""}</td>
                <td className="py-2 pr-3">
                  {v.isActive ? (
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded">Active</span>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>
                <td className="py-2 text-right space-x-2">
                  {!v.isActive && (
                    <>
                      <button
                        className="px-2 py-1 border rounded hover:bg-gray-50"
                        disabled={busy}
                        onClick={async () => {
                          setBusy(true);
                          setErrs([]);
                          try {
                            await activateFn({ data: { id: v.id } });
                            setMsg(`Activated ${v.filename}`);
                            await refreshList();
                          } catch (e) {
                            setErrs([(e as Error).message]);
                          } finally {
                            setBusy(false);
                          }
                        }}
                      >
                        Activate
                      </button>
                      <button
                        className="px-2 py-1 border rounded text-red-700 hover:bg-red-50"
                        disabled={busy}
                        onClick={async () => {
                          if (!confirm(`Delete ${v.filename}?`)) return;
                          setBusy(true);
                          setErrs([]);
                          try {
                            const res = await deleteFn({ data: { id: v.id } });
                            if (!res.ok) setErrs([res.error]);
                            else {
                              setMsg("Deleted.");
                              await refreshList();
                            }
                          } catch (e) {
                            setErrs([(e as Error).message]);
                          } finally {
                            setBusy(false);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="mt-8 text-xs text-gray-500">
        Activating a version updates Tikkun reading emails immediately. Other site pages
        will pick up the new content on the next deploy or page refresh where applicable.
      </p>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-10">{children}</div>
    </div>
  );
}

function SignInForm({ onSignedIn }: { onSignedIn: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  return (
    <Shell>
      <h1 className="text-2xl font-semibold mb-6">Admin sign in</h1>
      <form
        className="space-y-3 max-w-sm"
        onSubmit={async (e) => {
          e.preventDefault();
          setErr(null);
          setMsg(null);
          setBusy(true);
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          setBusy(false);
          if (error) {
            setErr(error.message);
            return;
          }
          onSignedIn(data.user?.email ?? email);
        }}
      >
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button
          disabled={busy}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <button
          type="button"
          disabled={busy || !email}
          className="w-full border py-2 rounded disabled:opacity-50"
          onClick={async () => {
            setErr(null);
            setMsg(null);
            setBusy(true);
            const { error } = await supabase.auth.signInWithOtp({
              email,
              options: { emailRedirectTo: `${window.location.origin}/admin` },
            });
            setBusy(false);
            if (error) setErr(error.message);
            else setMsg(`Magic sign-in link sent to ${email}. Check your inbox.`);
          }}
        >
          Email me a sign-in link
        </button>
        {err && <p className="text-red-700 text-sm">{err}</p>}
        {msg && <p className="text-green-700 text-sm">{msg}</p>}
      </form>
    </Shell>
  );
}

function UploadForm({
  busy,
  onSubmit,
}: {
  busy: boolean;
  onSubmit: (data: { filename: string; notes: string | null; contentText: string; activate: boolean }) => Promise<void>;
}) {
  const [filename, setFilename] = useState("");
  const [notes, setNotes] = useState("");
  const [contentText, setContentText] = useState("");
  const [activate, setActivate] = useState(true);

  return (
    <form
      className="border rounded p-4 space-y-3 bg-gray-50"
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit({
          filename: filename || "tikkun-content.json",
          notes: notes.trim() || null,
          contentText,
          activate,
        });
      }}
    >
      <h2 className="font-semibold">Upload new content</h2>
      <input
        type="file"
        accept="application/json,.json"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          setFilename(f.name);
          setContentText(await f.text());
        }}
      />
      <input
        type="text"
        placeholder="Filename"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="text"
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        placeholder="Or paste JSON here"
        value={contentText}
        onChange={(e) => setContentText(e.target.value)}
        rows={8}
        className="w-full border rounded px-3 py-2 font-mono text-xs"
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={activate} onChange={(e) => setActivate(e.target.checked)} />
        Activate immediately
      </label>
      <button
        disabled={busy || !contentText}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {busy ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}
