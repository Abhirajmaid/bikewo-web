"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SelectionBar } from "./SelectionBar";

export type Column<T> = {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T extends { id: string }> = {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  selectionActions?: Array<{ label: string; variant?: "danger" }>;
};

export function DataTable<T extends { id: string }>({
  data,
  columns,
  pageSize = 10,
  selectionActions = [
    { label: "Edit" },
    { label: "Delete", variant: "danger" },
  ],
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const start = (page - 1) * pageSize;
  const rows = data.slice(start, start + pageSize);

  const allSelected = rows.length > 0 && rows.every((r) => selected.has(r.id));

  function toggleAll() {
    if (allSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        rows.forEach((r) => next.delete(r.id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        rows.forEach((r) => next.add(r.id));
        return next;
      });
    }
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="relative">
      <div className="overflow-x-auto rounded-xl border border-mist/60 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-mist/60 text-xs font-medium text-slate-400">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="size-3.5 rounded border-mist accent-green-600"
                  aria-label="Select all rows"
                />
              </th>
              {columns.map((col) => (
                <th key={col.key} className={cn("px-4 py-3", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isSelected = selected.has(row.id);
              return (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-mist/40 transition-colors last:border-0",
                    isSelected ? "bg-amber-50/50" : "hover:bg-cloud/50",
                  )}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOne(row.id)}
                      className="size-3.5 rounded border-mist accent-green-600"
                      aria-label={`Select row ${row.id}`}
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className={cn("px-4 py-3 text-slate", col.className)}>
                      {col.cell(row)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-mist/60 px-4 py-3 text-xs text-slate-400">
          <p>
            Showing {start + 1}–{Math.min(start + pageSize, data.length)} of{" "}
            {data.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-md border border-mist/80 px-2.5 py-1 disabled:opacity-40"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                className={cn(
                  "min-w-7 rounded-md px-2 py-1",
                  p === page
                    ? "bg-ink text-white"
                    : "border border-mist/80 hover:bg-cloud",
                )}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-md border border-mist/80 px-2.5 py-1 disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {selected.size > 0 ? (
        <SelectionBar count={selected.size} actions={selectionActions} />
      ) : null}
    </div>
  );
}
