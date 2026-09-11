import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ToolbarProps = {
  children?: ReactNode;
  showStats?: boolean;
  onToggleStats?: () => void;
  primaryAction?: ReactNode;
};

export function Toolbar({
  children,
  showStats,
  onToggleStats,
  primaryAction,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">{children}</div>
      <div className="flex items-center gap-3">
        {onToggleStats !== undefined ? (
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate">
            <span>Show statistics</span>
            <button
              type="button"
              role="switch"
              aria-checked={showStats}
              onClick={onToggleStats}
              className={cn(
                "relative h-5 w-9 rounded-full transition-colors",
                showStats ? "bg-green-600" : "bg-mist",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 size-4 rounded-full bg-white shadow-sm transition-transform",
                  showStats && "translate-x-4",
                )}
              />
            </button>
          </label>
        ) : null}
        {primaryAction}
      </div>
    </div>
  );
}

export function ToolbarButton({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors",
        active
          ? "border-indigo-200 bg-indigo-50 text-indigo-700"
          : "border-mist/80 bg-white text-slate hover:border-mist hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
    >
      {children}
    </button>
  );
}
