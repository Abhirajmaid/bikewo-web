"use client";

import Image from "next/image";
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

  const [email, setEmail] = useState("admin@bikewo.com");
  const [password, setPassword] = useState("");
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
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-mist bg-white px-4 py-3 text-sm text-ink outline-none transition-[border-color,box-shadow] focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
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

          <p className="text-center text-xs text-slate-400">
            Default: admin@bikewo.com / BikeWo@CMS2026
          </p>
        </form>

        <div className="relative h-28 border-t border-mist/60">
          <Image
            src="/assets/hf_20260806_143952_059129b3-b95c-4bc3-b79f-2067db331c84.png"
            alt=""
            fill
            className="object-cover object-center opacity-90"
            sizes="28rem"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-indigo-950/50 to-transparent" />
        </div>
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
