export type CmsRole = "super_admin" | "admin" | "editor" | "reviewer" | "viewer";

export type MemberStatus = "active" | "invited" | "suspended";

export type Permission =
  | "content:read"
  | "content:write"
  | "content:publish"
  | "content:delete"
  | "submissions:read"
  | "submissions:manage"
  | "members:read"
  | "members:manage"
  | "settings:manage";

export type InternalMember = {
  id: string;
  name: string;
  email: string;
  cmsRole: CmsRole;
  department: string;
  invitedAt: string;
  lastActiveAt: string | null;
  status: MemberStatus;
};

export const CMS_ROLES: Record<
  CmsRole,
  { label: string; description: string }
> = {
  super_admin: {
    label: "Super Admin",
    description: "Full access to all CMS features, members, and settings.",
  },
  admin: {
    label: "Admin",
    description: "Manage content, submissions, and members. Cannot modify super admins.",
  },
  editor: {
    label: "Editor",
    description: "Create, edit, and publish website content. View submissions.",
  },
  reviewer: {
    label: "Reviewer",
    description: "Review and update submissions. Edit drafts only.",
  },
  viewer: {
    label: "Viewer",
    description: "Read-only access to content and submissions.",
  },
};

export const PERMISSION_LABELS: Record<Permission, string> = {
  "content:read": "View content",
  "content:write": "Create & edit content",
  "content:publish": "Publish content",
  "content:delete": "Delete content",
  "submissions:read": "View submissions",
  "submissions:manage": "Manage submissions",
  "members:read": "View members",
  "members:manage": "Invite & manage members",
  "settings:manage": "Manage CMS settings",
};

export const ROLE_PERMISSIONS: Record<CmsRole, Permission[]> = {
  super_admin: [
    "content:read",
    "content:write",
    "content:publish",
    "content:delete",
    "submissions:read",
    "submissions:manage",
    "members:read",
    "members:manage",
    "settings:manage",
  ],
  admin: [
    "content:read",
    "content:write",
    "content:publish",
    "content:delete",
    "submissions:read",
    "submissions:manage",
    "members:read",
    "members:manage",
  ],
  editor: [
    "content:read",
    "content:write",
    "content:publish",
    "submissions:read",
  ],
  reviewer: ["content:read", "content:write", "submissions:read", "submissions:manage"],
  viewer: ["content:read", "submissions:read"],
};

export function hasPermission(role: CmsRole, permission: Permission) {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function roleVariant(role: CmsRole): "violet" | "info" | "success" | "warning" | "neutral" {
  switch (role) {
    case "super_admin":
      return "violet";
    case "admin":
      return "info";
    case "editor":
      return "success";
    case "reviewer":
      return "warning";
    case "viewer":
      return "neutral";
  }
}
