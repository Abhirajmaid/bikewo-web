import { PageHero } from "@/components/ui/PageHero";

/** Shared dark hero for About sub-pages. */
export function AboutSubHero({
  title,
  blurb,
}: {
  title: string;
  blurb?: string;
}) {
  return (
    <PageHero
      crumbs={[
        { label: "Home", href: "/" },
        { label: "About BikeWo", href: "/about" },
        { label: title },
      ]}
      title={title}
      lede={blurb}
    />
  );
}
