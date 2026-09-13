import type { ReactNode } from "react";

type ActionVariant = "preview" | "edit" | "delete" | "progress" | "resolve";

type RowAction = {
  label: string;
  onClick: () => void;
  variant: ActionVariant;
};

const tone: Record<ActionVariant, string> = {
  preview: "text-indigo-600 hover:bg-indigo-50",
  edit: "text-green-700 hover:bg-green-50",
  delete: "text-red-600 hover:bg-red-50",
  progress: "text-indigo-700 hover:bg-indigo-50",
  resolve: "text-green-700 hover:bg-green-50",
};

const icons: Record<ActionVariant, ReactNode> = {
  preview: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  delete: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  ),
  progress: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  resolve: (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
};

export function RowActions({ actions }: { actions: RowAction[] }) {
  return (
    <div className="flex items-center gap-0.5">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          onClick={action.onClick}
          aria-label={action.label}
          className={`group relative rounded-md p-1.5 transition-colors ${tone[action.variant]}`}
        >
          {icons[action.variant]}
          <span
            role="tooltip"
            className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}
