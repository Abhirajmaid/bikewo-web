"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { SelectionBar } from "./SelectionBar";

export type Column<T> = {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

export type TableFilter<T> = {
  key: string;
  label: string;
  getValue: (row: T) => string;
  /** If omitted, options are derived from the current data. */
  options?: Array<{ value: string; label: string }>;
};

export type TableSort<T> = {
  key: string;
  label: string;
  compare: (a: T, b: T) => number;
};

type DataTableProps<T extends { id: string }> = {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  selectionActions?: Array<{ label: string; variant?: "danger" }>;
  searchPlaceholder?: string;
  getSearchText?: (row: T) => string;
  filters?: TableFilter<T>[];
  sorts?: TableSort<T>[];
  defaultSortKey?: string;
};

export function DataTable<T extends { id: string }>({
  data,
  columns,
  pageSize = 10,
  selectionActions = [
    { label: "Edit" },
    { label: "Delete", variant: "danger" },
  ],
  searchPlaceholder = "Search…",
  getSearchText,
  filters = [],
  sorts = [],
  defaultSortKey,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [sortKey, setSortKey] = useState(defaultSortKey ?? sorts[0]?.key ?? "");

  const filterOptions = useMemo(() => {
    return filters.map((filter) => {
      if (filter.options) return filter;
      const values = Array.from(
        new Set(data.map((row) => filter.getValue(row)).filter(Boolean)),
      ).sort((a, b) => a.localeCompare(b));
      return {
        ...filter,
        options: values.map((value) => ({ value, label: value })),
      };
    });
  }, [data, filters]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = data;

    if (q && getSearchText) {
      rows = rows.filter((row) => getSearchText(row).toLowerCase().includes(q));
    }

    for (const filter of filters) {
      const selectedValue = filterValues[filter.key];
      if (!selectedValue) continue;
      rows = rows.filter((row) => filter.getValue(row) === selectedValue);
    }

    const activeSort = sorts.find((s) => s.key === sortKey);
    if (activeSort) {
      rows = [...rows].sort(activeSort.compare);
    }

    return rows;
  }, [data, query, getSearchText, filters, filterValues, sorts, sortKey]);

  useEffect(() => {
    setPage(1);
  }, [query, filterValues, sortKey, data.length]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);
  const showControls =
    Boolean(getSearchText) || filters.length > 0 || sorts.length > 0;

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

  const selectClass =
    "appearance-none rounded-lg border border-mist/80 bg-white bg-[length:12px] bg-[right_0.75rem_center] bg-no-repeat py-1.5 pl-3 pr-9 text-sm text-slate outline-none focus:border-indigo-400";
  const selectChevronStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  };

  return (
    <div className="relative space-y-3">
      {showControls ? (
        <div className="flex flex-wrap items-center gap-2">
          {getSearchText ? (
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="min-w-[200px] flex-1 rounded-lg border border-mist/80 bg-white px-3 py-1.5 text-sm text-ink outline-none placeholder:text-slate-400 focus:border-indigo-400 sm:max-w-xs"
            />
          ) : null}

          {filterOptions.map((filter) => (
            <select
              key={filter.key}
              value={filterValues[filter.key] ?? ""}
              onChange={(e) =>
                setFilterValues((prev) => ({
                  ...prev,
                  [filter.key]: e.target.value,
                }))
              }
              className={selectClass}
              style={selectChevronStyle}
              aria-label={filter.label}
            >
              <option value="">{filter.label}</option>
              {filter.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}

          {sorts.length > 0 ? (
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className={selectClass}
              style={selectChevronStyle}
              aria-label="Sort by"
            >
              {sorts.map((sort) => (
                <option key={sort.key} value={sort.key}>
                  {sort.label}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      ) : null}

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
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-10 text-center text-sm text-slate-400"
                >
                  No matching rows.
                </td>
              </tr>
            ) : (
              rows.map((row) => {
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
                      <td
                        key={col.key}
                        className={cn("px-4 py-3 text-slate", col.className)}
                      >
                        {col.cell(row)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-mist/60 px-4 py-3 text-xs text-slate-400">
          <p>
            {filtered.length === 0
              ? "Showing 0 of 0"
              : `Showing ${start + 1}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length}`}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safePage <= 1}
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
                  p === safePage
                    ? "bg-ink text-white"
                    : "border border-mist/80 hover:bg-cloud",
                )}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              disabled={safePage >= totalPages}
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

export function cmpStr(a: string, b: string) {
  return a.localeCompare(b, undefined, { sensitivity: "base" });
}

export function cmpDate(a: string, b: string) {
  return new Date(a).getTime() - new Date(b).getTime();
}
