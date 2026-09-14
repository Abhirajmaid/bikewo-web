"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Mark } from "@/components/brand/Mark";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawNext = searchParams.get("next") || "/admin";
  const next =
    rawNext === "/admin/dashboard" || rawNext === "/admin/login"
      ? "/admin"
      : rawNext.startsWith("/admin")
        ? rawNext
        : "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setError("Unable to reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-indigo-950 px-4 py-12">
      <div aria-hidden className="rider-pattern absolute inset-0 opacity-[0.07] invert" />
      <div
        aria-hidden
        className="absolute -left-24 top-1/4 size-72 rounded-full bg-green-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-16 bottom-1/4 size-80 rounded-full bg-indigo-500/30 blur-3xl"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white shadow-lift">
        <div className="border-b border-mist/60 bg-cloud/80 px-8 py-7">
          <div className="flex items-center gap-3">
            <Mark className="size-10 text-indigo" title="BikeWo" />
            <div>
              <Logo height={22} priority />
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                Content management
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5 px-8 py-8">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink">Sign in</h1>
            <p className="mt-1.5 text-sm text-slate">
              Manage News &amp; Media, team, contact inquiries and CMS members.
            </p>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-mist bg-white px-4 py-3 text-sm text-ink outline-none transition-[border-color,box-shadow] focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-mist bg-white py-3 pl-4 pr-11 text-sm text-ink outline-none transition-[border-color,box-shadow] focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 transition-colors hover:text-ink"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                    aria-hidden
                  >
                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .698 10.747 10.747 0 0 1-1.444 2.49" />
                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.698 10.75 10.75 0 0 1 4.446-4.86" />
                    <path d="m2 2 20 20" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5"
                    aria-hidden
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-green-500 font-display text-[15px] font-semibold text-indigo-800 transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-indigo-950 text-white">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
