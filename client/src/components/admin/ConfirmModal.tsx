"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** danger = red delete button (default); default = ink primary */
  variant?: "danger" | "default";
};

type ConfirmFn = (options: ConfirmOptions | string) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

export function useConfirm(): ConfirmFn {
  const fn = useContext(ConfirmContext);
  if (!fn) throw new Error("useConfirm must be used within ConfirmProvider");
  return fn;
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [opts, setOpts] = useState<ConfirmOptions | null>(null);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback<ConfirmFn>((input) => {
    const next = typeof input === "string" ? { message: input } : input;
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
      setOpts(next);
    });
  }, []);

  function finish(value: boolean) {
    resolveRef.current?.(value);
    resolveRef.current = null;
    setOpts(null);
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {opts ? (
        <ConfirmDialog
          title={opts.title ?? "Are you sure?"}
          message={opts.message}
          confirmLabel={opts.confirmLabel ?? "Delete"}
          cancelLabel={opts.cancelLabel ?? "Cancel"}
          variant={opts.variant ?? "danger"}
          onConfirm={() => finish(true)}
          onCancel={() => finish(false)}
        />
      ) : null}
    </ConfirmContext.Provider>
  );
}

function ConfirmDialog({
  title,
  message,
  confirmLabel,
  cancelLabel,
  variant,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  variant: "danger" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        className="relative w-full max-w-sm overflow-hidden rounded-xl border border-mist/60 bg-white shadow-deep"
      >
        <div className="px-6 pt-5 pb-4">
          <h2 id="confirm-title" className="font-display text-lg font-semibold text-ink">
            {title}
          </h2>
          <p id="confirm-message" className="mt-2 text-sm leading-relaxed text-slate">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-2 border-t border-mist/60 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-mist/80 px-4 py-2 text-sm font-medium text-slate hover:bg-cloud hover:text-ink"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            autoFocus
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium text-white",
              variant === "danger" ? "bg-coral hover:bg-coral/90" : "bg-ink hover:bg-ink/90",
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
