import { redirect } from "next/navigation";

export default function LegacyBlogsAdminPage() {
  redirect("/admin/news");
}
