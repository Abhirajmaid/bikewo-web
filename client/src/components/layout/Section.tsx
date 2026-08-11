import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Vertical rhythm wrapper so every band on the page breathes identically. */
export function Section({
  children,
  className,
  id,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "cloud" | "dark";
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-20 md:py-28 lg:py-32",
        tone === "cloud" && "bg-cloud",
        tone === "dark" && "bg-indigo-950 text-white",
        className,
      )}
    >
      {children}
    </section>
  );
}
