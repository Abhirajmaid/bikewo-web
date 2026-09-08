import { cn } from "@/lib/utils";

const VARIANTS = {
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-coral",
  info: "bg-indigo-100 text-indigo-700",
  neutral: "bg-cloud text-slate",
  violet: "bg-violet/10 text-violet",
} as const;

type StatusBadgeProps = {
  label: string;
  variant?: keyof typeof VARIANTS;
};

export function StatusBadge({ label, variant = "neutral" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        VARIANTS[variant],
      )}
    >
      {label.replace(/_/g, " ")}
    </span>
  );
}

export function publishVariant(status: string): keyof typeof VARIANTS {
  switch (status) {
    case "published":
    case "active":
    case "open":
    case "accepted":
    case "resolved":
      return "success";
    case "draft":
    case "pending":
    case "new":
    case "invited":
      return "warning";
    case "archived":
    case "inactive":
    case "closed":
    case "rejected":
    case "suspended":
      return "danger";
    case "in_progress":
    case "reviewing":
      return "info";
    default:
      return "neutral";
  }
}
