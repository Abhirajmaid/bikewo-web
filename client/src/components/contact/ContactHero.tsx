import { CONTACT_HERO } from "@/lib/contact";
import { PageHero } from "@/components/ui/PageHero";

export function ContactHero() {
  return (
    <PageHero
      crumbs={[
        { label: "Home", href: "/" },
        { label: CONTACT_HERO.breadcrumb },
      ]}
      title={CONTACT_HERO.breadcrumb}
      lede={CONTACT_HERO.title}
    />
  );
}
