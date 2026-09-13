"use client";

import { useState } from "react";
import { ContentPage } from "@/components/admin/ContentPage";
import { cmpDate, cmpStr, DataTable } from "@/components/admin/DataTable";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import { DRIVER_APPLICATIONS, JOB_APPLICATIONS } from "@/lib/admin/data";
import type { DriverApplication, JobApplication } from "@/lib/admin/types";
import { cn } from "@/lib/utils";

type Tab = "driver" | "job";

export default function ApplicationsPage() {
  const [tab, setTab] = useState<Tab>("driver");

  const driverPending = DRIVER_APPLICATIONS.filter((a) => a.status === "pending").length;
  const jobPending = JOB_APPLICATIONS.filter((a) => a.status === "pending").length;

  return (
    <ContentPage
      title="Applications"
      description="Shram Sainik driver and career job applications"
      addLabel="Export CSV"
      stats={[
        {
          label: "Driver applications",
          value: DRIVER_APPLICATIONS.length,
          change: `${driverPending} pending`,
        },
        {
          label: "Job applications",
          value: JOB_APPLICATIONS.length,
          change: `${jobPending} pending`,
        },
        {
          label: "Under review",
          value:
            DRIVER_APPLICATIONS.filter((a) => a.status === "reviewing").length +
            JOB_APPLICATIONS.filter((a) => a.status === "reviewing").length,
        },
        {
          label: "Accepted",
          value: DRIVER_APPLICATIONS.filter((a) => a.status === "accepted").length,
        },
      ]}
      toolbarExtra={
        <>
          <div className="flex rounded-lg border border-mist/80 bg-white p-0.5">
            {(
              [
                { id: "driver" as const, label: "Driver (Shram Sainik)" },
                { id: "job" as const, label: "Career jobs" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  tab === t.id
                    ? "bg-ink text-white"
                    : "text-slate hover:text-ink",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <ToolbarButton>Export</ToolbarButton>
        </>
      }
    >
      {tab === "driver" ? (
        <DataTable<DriverApplication>
          data={DRIVER_APPLICATIONS}
          searchPlaceholder="Search drivers…"
          getSearchText={(row) =>
            `${row.name} ${row.phone} ${row.city} ${row.vehicleType} ${row.experience}`
          }
          filters={[
            {
              key: "status",
              label: "All statuses",
              getValue: (row) => row.status,
              options: [
                { value: "pending", label: "Pending" },
                { value: "reviewing", label: "Reviewing" },
                { value: "accepted", label: "Accepted" },
                { value: "rejected", label: "Rejected" },
              ],
            },
            { key: "city", label: "All cities", getValue: (row) => row.city },
            { key: "vehicle", label: "All vehicles", getValue: (row) => row.vehicleType },
          ]}
          sorts={[
            {
              key: "submitted-desc",
              label: "Newest first",
              compare: (a, b) => cmpDate(b.submittedAt, a.submittedAt),
            },
            {
              key: "submitted-asc",
              label: "Oldest first",
              compare: (a, b) => cmpDate(a.submittedAt, b.submittedAt),
            },
            {
              key: "name",
              label: "Name A–Z",
              compare: (a, b) => cmpStr(a.name, b.name),
            },
          ]}
          defaultSortKey="submitted-desc"
          selectionActions={[
            { label: "Mark reviewing" },
            { label: "Accept" },
            { label: "Reject", variant: "danger" },
          ]}
          columns={[
            {
              key: "name",
              header: "Applicant",
              cell: (row) => (
                <div>
                  <p className="font-medium text-ink">{row.name}</p>
                  <p className="text-xs text-slate-400">{row.phone}</p>
                </div>
              ),
            },
            { key: "city", header: "City", cell: (row) => row.city },
            { key: "vehicle", header: "Vehicle type", cell: (row) => row.vehicleType },
            { key: "experience", header: "Experience", cell: (row) => row.experience },
            {
              key: "submitted",
              header: "Submitted",
              cell: (row) => formatDateTime(row.submittedAt),
            },
            {
              key: "status",
              header: "Status",
              cell: (row) => (
                <StatusBadge label={row.status} variant={publishVariant(row.status)} />
              ),
            },
          ]}
        />
      ) : (
        <DataTable<JobApplication>
          data={JOB_APPLICATIONS}
          searchPlaceholder="Search applicants…"
          getSearchText={(row) => `${row.name} ${row.email} ${row.position}`}
          filters={[
            {
              key: "status",
              label: "All statuses",
              getValue: (row) => row.status,
              options: [
                { value: "pending", label: "Pending" },
                { value: "reviewing", label: "Reviewing" },
                { value: "accepted", label: "Accepted" },
                { value: "rejected", label: "Rejected" },
              ],
            },
            { key: "position", label: "All positions", getValue: (row) => row.position },
          ]}
          sorts={[
            {
              key: "submitted-desc",
              label: "Newest first",
              compare: (a, b) => cmpDate(b.submittedAt, a.submittedAt),
            },
            {
              key: "submitted-asc",
              label: "Oldest first",
              compare: (a, b) => cmpDate(a.submittedAt, b.submittedAt),
            },
            {
              key: "name",
              label: "Name A–Z",
              compare: (a, b) => cmpStr(a.name, b.name),
            },
          ]}
          defaultSortKey="submitted-desc"
          selectionActions={[
            { label: "Mark reviewing" },
            { label: "Schedule interview" },
            { label: "Reject", variant: "danger" },
          ]}
          columns={[
            {
              key: "name",
              header: "Applicant",
              cell: (row) => (
                <div>
                  <p className="font-medium text-ink">{row.name}</p>
                  <p className="text-xs text-slate-400">{row.email}</p>
                </div>
              ),
            },
            { key: "position", header: "Position applied", cell: (row) => row.position },
            {
              key: "submitted",
              header: "Submitted",
              cell: (row) => formatDateTime(row.submittedAt),
            },
            {
              key: "status",
              header: "Status",
              cell: (row) => (
                <StatusBadge label={row.status} variant={publishVariant(row.status)} />
              ),
            },
          ]}
        />
      )}
    </ContentPage>
  );
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
