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
      { label: "News and Media", href: "/admin/news" },
      { label: "Careers", href: "/admin/careers" },
      { label: "Testimonials", href: "/admin/testimonials" },
    ],
  },
  {
    heading: "Submissions",
    items: [
      { label: "Contact", href: "/admin/contact" },
      { label: "Applications", href: "/admin/applications" },
    ],
  },
  {
    heading: "Settings",
    items: [{ label: "Members", href: "/admin/members" }],
  },
];
