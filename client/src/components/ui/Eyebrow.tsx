import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  /** `dark` inverts the badge for navy / deep-green section backgrounds. */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-block px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em]",
        tone === "light" && "bg-indigo-800 text-white",
        tone === "dark" && "bg-white text-indigo-800",
        className,
      )}
    >
      {children}
    </p>
  );
}
