type SelectionBarProps = {
  count: number;
  actions: Array<{ label: string; variant?: "danger" }>;
};

export function SelectionBar({ count, actions }: SelectionBarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-mist/80 bg-ink px-5 py-2.5 shadow-deep">
      <span className="text-sm font-medium text-white">{count} selected</span>
      <span className="h-4 w-px bg-white/20" />
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          className={`text-sm font-medium ${
            action.variant === "danger"
              ? "text-coral"
              : "text-white hover:text-green-300"
          }`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
