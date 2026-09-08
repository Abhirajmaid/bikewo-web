import type { ReactNode } from "react";

type StatCard = {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "up" | "down" | "neutral";
};

type StatCardsProps = {
  stats: StatCard[];
};

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 divide-x divide-mist/60 rounded-xl border border-mist/60 bg-white lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={stat.label} className="px-5 py-4">
          <p className="text-xs font-medium text-slate-400">{stat.label}</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            {stat.value}
          </p>
          {stat.change ? (
            <p
              className={`mt-1 text-xs ${
                stat.changeType === "up"
                  ? "text-green-700"
                  : stat.changeType === "down"
                    ? "text-coral"
                    : "text-slate-400"
              }`}
            >
              {stat.change}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
