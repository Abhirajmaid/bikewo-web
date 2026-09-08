"use client";

import { useState } from "react";
import { AddMemberModal } from "@/components/admin/AddMemberModal";
import { DataTable } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { PermissionsMatrix } from "@/components/admin/PermissionsMatrix";
import { RoleBadge } from "@/components/admin/RoleBadge";
import { StatCards } from "@/components/admin/StatCards";
import { StatusBadge, publishVariant } from "@/components/admin/StatusBadge";
import { ToolbarButton } from "@/components/admin/Toolbar";
import { INTERNAL_MEMBERS } from "@/lib/admin/data";
import type { InternalMember } from "@/lib/admin/types";

export default function MembersPage() {
  const [members, setMembers] = useState(INTERNAL_MEMBERS);
  const [modalOpen, setModalOpen] = useState(false);

  const active = members.filter((m) => m.status === "active").length;
  const invited = members.filter((m) => m.status === "invited").length;

  return (
    <>
      <PageHeader
        title="Members"
        description="Internal BikeWo users with CMS access and role-based permissions"
        actions={
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <span aria-hidden>+</span> Invite member
          </button>
        }
      />

      <div className="space-y-5 p-6">
        <StatCards
          stats={[
            { label: "Total members", value: members.length },
            { label: "Active", value: active },
            { label: "Pending invites", value: invited },
            {
              label: "Roles in use",
              value: new Set(members.map((m) => m.cmsRole)).size,
            },
          ]}
        />

        <div className="flex flex-wrap gap-2">
          <ToolbarButton>Filter</ToolbarButton>
          <ToolbarButton>Sort</ToolbarButton>
        </div>

        <DataTable<InternalMember>
          data={members}
          selectionActions={[
            { label: "Change role" },
            { label: "Resend invite" },
            { label: "Suspend", variant: "danger" },
          ]}
          columns={[
            {
              key: "name",
              header: "Member",
              cell: (row) => (
                <div>
                  <p className="font-medium text-ink">{row.name}</p>
                  <p className="text-xs text-slate-400">{row.email}</p>
                </div>
              ),
            },
            {
              key: "role",
              header: "CMS role",
              cell: (row) => <RoleBadge role={row.cmsRole} />,
            },
            { key: "department", header: "Department", cell: (row) => row.department },
            {
              key: "invited",
              header: "Invited",
              cell: (row) => formatDate(row.invitedAt),
            },
            {
              key: "lastActive",
              header: "Last active",
              cell: (row) =>
                row.lastActiveAt ? formatDateTime(row.lastActiveAt) : "—",
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

        <PermissionsMatrix />
      </div>

      <AddMemberModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(form) => {
          setMembers((prev) => [
            {
              id: `im${Date.now()}`,
              name: form.name,
              email: form.email,
              cmsRole: form.cmsRole,
              department: form.department || "—",
              invitedAt: new Date().toISOString().slice(0, 10),
              lastActiveAt: null,
              status: "invited",
            },
            ...prev,
          ]);
        }}
      />
    </>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
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
