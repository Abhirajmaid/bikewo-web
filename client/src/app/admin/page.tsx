import Link from "next/link";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCards } from "@/components/admin/StatCards";
import {
  BLOGS,
  CAREERS,
  CONTACT_INQUIRIES,
  DRIVER_APPLICATIONS,
  INTERNAL_MEMBERS,
  JOB_APPLICATIONS,
  TEAM,
} from "@/lib/admin/data";

export default function AdminDashboardPage() {
  const newContacts = CONTACT_INQUIRIES.filter((c) => c.status === "new").length;
  const pendingApps =
    DRIVER_APPLICATIONS.filter((a) => a.status === "pending").length +
    JOB_APPLICATIONS.filter((a) => a.status === "pending").length;

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of BikeWo CMS content and submissions"
      />

      <div className="space-y-6 p-6">
        <StatCards
          stats={[
            { label: "Team members", value: TEAM.length, change: "4 active" },
            { label: "Published blogs", value: BLOGS.filter((b) => b.status === "published").length },
            { label: "Open positions", value: CAREERS.filter((c) => c.status === "open").length },
            {
              label: "Pending submissions",
              value: newContacts + pendingApps,
              change: `${newContacts} contact · ${pendingApps} applications`,
            },
          ]}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="rounded-xl border border-mist/60 bg-white p-5">
            <h2 className="font-display text-sm font-semibold text-ink">Content</h2>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Team", href: "/admin/team", count: TEAM.length },
                { label: "Blogs", href: "/admin/blogs", count: BLOGS.length },
                { label: "Careers", href: "/admin/careers", count: CAREERS.length },
                { label: "Testimonials", href: "/admin/testimonials", count: 3 },
                { label: "Partners", href: "/admin/partners", count: 5 },
                { label: "CMS Members", href: "/admin/members", count: INTERNAL_MEMBERS.length },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate transition-colors hover:bg-cloud hover:text-ink"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-slate-400">{item.count} items</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-mist/60 bg-white p-5">
            <h2 className="font-display text-sm font-semibold text-ink">
              Recent submissions
            </h2>
            <ul className="mt-3 space-y-3">
              {CONTACT_INQUIRIES.slice(0, 3).map((inquiry) => (
                <li
                  key={inquiry.id}
                  className="rounded-lg border border-mist/40 px-3 py-2.5"
                >
                  <p className="text-sm font-medium text-ink">{inquiry.name}</p>
                  <p className="text-xs text-slate-400">
                    {inquiry.topic} · {formatDate(inquiry.submittedAt)}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/admin/contact"
              className="mt-3 inline-block text-xs font-medium text-green-700 hover:underline"
            >
              View all contact inquiries →
            </Link>
          </section>
        </div>
      </div>
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
