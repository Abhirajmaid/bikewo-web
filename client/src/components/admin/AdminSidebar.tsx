"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { Mark } from "@/components/brand/Mark";
import { ADMIN_NAV } from "@/lib/admin/nav";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-mist/60 bg-white lg:w-60">
      <Link
        href="/admin"
        className="flex shrink-0 items-center gap-3 border-b border-mist/60 px-5 py-5 transition-opacity hover:opacity-80"
      >
        <Mark className="size-8 shrink-0 text-indigo" title="BikeWo" />
        <div className="min-w-0">
          <Logo height={20} priority />
          <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
            CMS
          </p>
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {ADMIN_NAV.map((group) => (
          <div key={group.heading} className="mb-5 last:mb-0">
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {group.heading}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all",
                        active
                          ? "bg-ink font-medium text-white shadow-sm"
                          : "text-slate hover:bg-cloud hover:text-ink",
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        {active ? (
                          <span
                            aria-hidden
                            className="size-1.5 shrink-0 rounded-full bg-green-400"
                          />
                        ) : null}
                        {item.label}
                      </span>
                      {item.badge ? (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                            active
                              ? "bg-white/15 text-white"
                              : "bg-indigo-100 text-indigo-700",
                          )}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 space-y-2 border-t border-mist/60 px-5 py-4">
        <button
          type="button"
          onClick={logout}
          className="block w-full text-left text-xs font-medium text-slate transition-colors hover:text-ink"
        >
          Sign out
        </button>
        <Link
          href="/"
          className="block text-xs text-slate-400 transition-colors hover:text-slate"
        >
          ← Back to website
        </Link>
      </div>
    </aside>
  );
}
