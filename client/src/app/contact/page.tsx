import type { Metadata } from "next";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactHelpGrid } from "@/components/contact/ContactHelpGrid";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactMission } from "@/components/contact/ContactMission";
import { ContactOffices } from "@/components/contact/ContactOffices";
import { ROUTE_INDEX, SITE } from "@/lib/site";

const entry = ROUTE_INDEX["/contact"];

export const metadata: Metadata = {
  title: entry?.title ?? "Contact",
  description: entry?.blurb ?? SITE.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${entry?.title ?? "Contact"} — ${SITE.name}`,
    description: entry?.blurb ?? SITE.description,
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <ContactMission />
      <ContactHelpGrid />
      <ContactOffices />
    </>
  );
}
