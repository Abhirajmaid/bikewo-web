import { redirect } from "next/navigation";

/** Alias — dashboard lives at /admin. */
export default function AdminDashboardAliasPage() {
  redirect("/admin");
}
