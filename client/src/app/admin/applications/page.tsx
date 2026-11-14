"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ContentPage } from "@/components/admin/ContentPage";
import { useConfirm } from "@/components/admin/ConfirmModal";
import { cmpDate, cmpStr, DataTable } from "@/components/admin/DataTable";
import { RowActions } from "@/components/admin/RowActions";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import { DRIVER_APPLICATIONS } from "@/lib/admin/data";
import type { ApplicationStatus, DriverApplication } from "@/lib/admin/types";
import type { CmsJobApplication } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

type Tab = "driver" | "job";

export default function ApplicationsPage() {
  const confirm = useConfirm();
  const [tab, setTab] = useState<Tab>("job");
  const [jobs, setJobs] = useState<CmsJobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<CmsJobApplication | null>(null);

  async function load() {
    setLoading(true);
    setJobs(await fetchApplications());
    setLoading(false);
  }

  useEffect(() => {
    let active = true;
    void fetchApplications().then((items) => {
      if (!active) return;
      setJobs(items);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  async function setStatus(id: string, status: ApplicationStatus) {
    await fetch(`/api/cms/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setViewing((current) => (current?.id === id ? { ...current, status } : current));
    await load();
  }

  async function remove(id: string) {
    if (
      !(await confirm({
        title: "Delete application",
        message:
          "Delete this application and its CV / cover letter files? This action cannot be undone.",
      }))
    )
      return;
    await fetch(`/api/cms/applications/${id}`, { method: "DELETE" });
    setViewing((current) => (current?.id === id ? null : current));
    await load();
  }

  const driverPending = DRIVER_APPLICATIONS.filter((a) => a.status === "pending").length;
  const jobPending = jobs.filter((a) => a.status === "pending").length;

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
          value: jobs.length,
          change: `${jobPending} pending`,
        },
        {
          label: "Under review",
          value:
            DRIVER_APPLICATIONS.filter((a) => a.status === "reviewing").length +
            jobs.filter((a) => a.status === "reviewing").length,
        },
        {
          label: "Accepted",
          value:
            DRIVER_APPLICATIONS.filter((a) => a.status === "accepted").length +
            jobs.filter((a) => a.status === "accepted").length,
        },
      ]}
      toolbarExtra={
        <>
          <div className="flex rounded-lg border border-mist/80 bg-white p-0.5">
            {(
              [
                { id: "job" as const, label: "Career jobs" },
                { id: "driver" as const, label: "Driver (Shram Sainik)" },
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
          <ToolbarButton onClick={() => void load()}>Refresh</ToolbarButton>
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
              options: STATUS_OPTIONS,
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
      ) : loading ? (
        <p className="text-sm text-slate">Loading…</p>
      ) : jobs.length === 0 ? (
        <p className="rounded-xl border border-dashed border-mist bg-white px-4 py-10 text-center text-sm text-slate">
          No job applications yet. Applications submitted from the Careers page
          appear here.
        </p>
      ) : (
        <DataTable<CmsJobApplication>
          data={jobs}
          searchPlaceholder="Search applicants…"
          getSearchText={(row) => `${row.name} ${row.email} ${row.phone} ${row.position}`}
          filters={[
            {
              key: "status",
              label: "All statuses",
              getValue: (row) => row.status,
              options: STATUS_OPTIONS,
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
          columns={[
            {
              key: "name",
              header: "Applicant",
              cell: (row) => (
                <button
                  type="button"
                  onClick={() => setViewing(row)}
                  className="text-left"
                  title="Open application"
                >
                  <p className="font-medium text-ink hover:underline">{row.name}</p>
                  <p className="text-xs text-slate-400">{row.email}</p>
                </button>
              ),
            },
            { key: "position", header: "Position applied", cell: (row) => row.position },
            {
              key: "ctc",
              header: "Current → expected CTC",
              cell: (row) => `${formatInr(row.currentCtc)} → ${formatInr(row.expectedCtc)}`,
            },
            { key: "notice", header: "Notice", cell: (row) => row.noticePeriod },
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
            {
              key: "actions",
              header: "",
              cell: (row) => (
                <RowActions
                  actions={[
                    {
                      label: "View application",
                      variant: "preview",
                      onClick: () => setViewing(row),
                    },
                    {
                      label: "Mark reviewing",
                      variant: "progress",
                      onClick: () => void setStatus(row.id, "reviewing"),
                    },
                    {
                      label: "Delete",
                      variant: "delete",
                      onClick: () => void remove(row.id),
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      )}

      {viewing ? (
        <ApplicationDetailModal
          application={viewing}
          onClose={() => setViewing(null)}
          onSetStatus={(status) => void setStatus(viewing.id, status)}
        />
      ) : null}
    </ContentPage>
  );
}

async function fetchApplications(): Promise<CmsJobApplication[]> {
  const res = await fetch("/api/cms/applications").catch(() => null);
  if (!res?.ok) return [];
  return ((await res.json()) as { items: CmsJobApplication[] }).items;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "reviewing", label: "Reviewing" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

function ApplicationDetailModal({
  application: a,
  onClose,
  onSetStatus,
}: {
  application: CmsJobApplication;
  onClose: () => void;
  onSetStatus: (status: ApplicationStatus) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const link = (href: string, label: string, external = false) => (
    <a
      href={href}
      className="text-indigo-600 hover:underline"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );

  const fileUrl = (kind: "cv" | "cover") =>
    `/api/cms/applications/${encodeURIComponent(a.id)}/file?kind=${kind}`;

  const details: { label: string; value: ReactNode }[] = [
    { label: "Position", value: a.position },
    { label: "Email", value: link(`mailto:${a.email}`, a.email) },
    { label: "Phone", value: link(`tel:${a.phone}`, a.phone) },
    {
      label: "LinkedIn",
      value: /^https?:\/\//i.test(a.linkedin) ? link(a.linkedin, "Open profile", true) : "—",
    },
    { label: "Current CTC", value: formatInr(a.currentCtc) },
    { label: "Expected CTC", value: formatInr(a.expectedCtc) },
    { label: "Notice period", value: a.noticePeriod },
    { label: "Submitted", value: formatDateTime(a.submittedAt) },
    { label: "CV", value: a.cvKey ? link(fileUrl("cv"), "Open CV (PDF)", true) : "—" },
    {
      label: "Cover letter PDF",
      value: a.coverLetterKey ? link(fileUrl("cover"), "Open PDF", true) : "—",
    },
    {
      label: "Status",
      value: <StatusBadge label={a.status} variant={publishVariant(a.status)} />,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-title"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-mist/60 px-6 py-4">
          <div className="min-w-0">
            <h2
              id="application-title"
              className="truncate font-display text-lg font-semibold text-ink"
            >
              {a.name}
            </h2>
            <p className="text-xs text-slate-400">Job application</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-sm text-slate hover:text-ink"
          >
            Close
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
            {details.map((d) => (
              <div key={d.label} className="min-w-0">
                <dt className="text-xs font-medium text-slate-400">{d.label}</dt>
                <dd className="mt-0.5 break-words text-ink">{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5">
            <p className="text-xs font-medium text-slate-400">Cover letter / note</p>
            <p className="mt-1 whitespace-pre-wrap break-words rounded-lg border border-mist/60 bg-cloud px-4 py-3 text-sm leading-relaxed text-ink">
              {a.coverLetter || "No note provided."}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-xs font-medium text-slate-400">References</p>
            <ul className="mt-1 space-y-2">
              {a.references.map((r, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-mist/60 px-4 py-3 text-sm text-ink"
                >
                  <p className="font-medium">
                    {r.name}
                    <span className="font-normal text-slate">
                      {" "}
                      · {r.designation}, {r.company}
                    </span>
                  </p>
                  <p className="mt-0.5 break-words text-slate">
                    {link(`tel:${r.phone}`, r.phone)} · {link(`mailto:${r.email}`, r.email)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap justify-end gap-2 border-t border-mist/60 px-6 py-4">
          {a.status !== "reviewing" ? (
            <button
              type="button"
              onClick={() => onSetStatus("reviewing")}
              className="rounded-lg border border-mist/80 px-4 py-2 text-sm font-medium text-slate hover:bg-cloud hover:text-ink"
            >
              Mark reviewing
            </button>
          ) : null}
          {a.status !== "rejected" ? (
            <button
              type="button"
              onClick={() => onSetStatus("rejected")}
              className="rounded-lg border border-mist/80 px-4 py-2 text-sm font-medium text-slate hover:bg-cloud hover:text-ink"
            >
              Reject
            </button>
          ) : null}
          {a.status !== "accepted" ? (
            <button
              type="button"
              onClick={() => onSetStatus("accepted")}
              className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink/90"
            >
              Accept
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function formatInr(value: number) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
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
