import { CMS_ROLES, roleVariant, type CmsRole } from "@/lib/admin/rbac";
import { StatusBadge } from "./StatusBadge";

export function RoleBadge({ role }: { role: CmsRole }) {
  return (
    <StatusBadge label={CMS_ROLES[role].label} variant={roleVariant(role)} />
  );
}
