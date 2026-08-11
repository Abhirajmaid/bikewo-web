import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "green";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-2.5",
        tone === "light" && "text-slate",
        tone === "dark" && "text-green-400",
        tone === "green" && "text-green-700",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-6",
          tone === "dark" ? "bg-green-400/50" : "bg-current opacity-40",
        )}
      />
      {children}
    </p>
  );
}
