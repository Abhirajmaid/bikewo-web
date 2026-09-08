export type AdminNavItem = {
  label: string;
  href: string;
  badge?: number;
};

export type AdminNavGroup = {
  heading: string;
  items: AdminNavItem[];
};

export const ADMIN_NAV: AdminNavGroup[] = [
  {
    heading: "Overview",
    items: [{ label: "Dashboard", href: "/admin" }],
  },
  {
    heading: "Content",
    items: [
      { label: "Team", href: "/admin/team" },
      { label: "Blogs", href: "/admin/blogs" },
      { label: "Careers", href: "/admin/careers" },
      { label: "Testimonials", href: "/admin/testimonials" },
      { label: "Partners", href: "/admin/partners" },
    ],
  },
  {
    heading: "Submissions",
    items: [
      { label: "Contact", href: "/admin/contact", badge: 2 },
      { label: "Applications", href: "/admin/applications", badge: 4 },
    ],
  },
  {
    heading: "Settings",
    items: [{ label: "Members", href: "/admin/members" }],
  },
];
