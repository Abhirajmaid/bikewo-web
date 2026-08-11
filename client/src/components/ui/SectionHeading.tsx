import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

/**
 * Section header. Headlines are sentence case per the editorial rules —
 * never title case, never all caps.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
        {eyebrow && (
          <Reveal>
            <Eyebrow
              tone={tone === "dark" ? "dark" : "light"}
              className={align === "center" ? "justify-center" : undefined}
            >
              {eyebrow}
            </Eyebrow>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h2
            className={cn(
              "mt-5 text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] leading-[1.12]",
              tone === "dark" && "text-white",
            )}
          >
            {title}
          </h2>
        </Reveal>
        {lede && (
          <Reveal delay={0.1}>
            <p
              className={cn(
                "mt-5 text-[1.0625rem] leading-relaxed",
                tone === "dark" ? "text-white/65" : "text-slate",
              )}
            >
              {lede}
            </p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal delay={0.15} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  );
}
