import { redirect } from "next/navigation";

/** Partners CMS tab removed — keep route so old bookmarks land on dashboard. */
export default function LegacyPartnersAdminPage() {
  redirect("/admin");
}
