"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { StatCards } from "./StatCards";
import { Toolbar } from "./Toolbar";

type ContentPageProps = {
  title: string;
  description?: string;
  addLabel: string;
  stats?: Array<{
    label: string;
    value: string | number;
    change?: string;
    changeType?: "up" | "down" | "neutral";
  }>;
  toolbarExtra?: ReactNode;
  children: ReactNode;
};

export function ContentPage({
  title,
  description,
  addLabel,
  stats,
  toolbarExtra,
  children,
}: ContentPageProps) {
  const [showStats, setShowStats] = useState(true);

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        actions={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <span aria-hidden>+</span> {addLabel}
          </button>
        }
      />

      <div className="flex-1 space-y-5 p-6">
        <Toolbar
          showStats={showStats}
          onToggleStats={stats ? () => setShowStats((s) => !s) : undefined}
          primaryAction={null}
        >
          {toolbarExtra}
        </Toolbar>

        {showStats && stats ? <StatCards stats={stats} /> : null}

        {children}
      </div>
    </>
  );
}
