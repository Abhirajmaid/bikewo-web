import { CONTACT_OFFICE, CONTACT_OFFICE_NOTE } from "@/lib/contact";
import { SITE, SOCIALS } from "@/lib/site";
import type { CmsSiteSettings } from "./types";

function socialHref(label: string) {
  return SOCIALS.find((s) => s.label === label)?.href ?? "";
}

/** Defaults mirror hardcoded SITE / SOCIALS / CONTACT_OFFICE. */
export function defaultSiteSettings(): CmsSiteSettings {
  return {
    name: SITE.name,
    legalName: SITE.legalName,
    cin: SITE.cin,
    nseSymbol: SITE.nseSymbol,
    tagline: SITE.tagline,
    corporateTagline: SITE.corporateTagline,
    campaignTagline: SITE.campaignTagline,
    description: SITE.description,
    keywords: [...SITE.keywords],
    brandEmail: SITE.brandEmail,
    accountsEmail: SITE.accountsEmail,
    phone: SITE.phone,
    phoneTel: SITE.phoneTel,
    officeLabel: CONTACT_OFFICE.label,
    officeCity: CONTACT_OFFICE.city,
    officeAddress: CONTACT_OFFICE.address,
    officeHours: CONTACT_OFFICE.hours,
    officeNote: CONTACT_OFFICE_NOTE,
    socialLinkedin: socialHref("LinkedIn"),
    socialYoutube: socialHref("YouTube"),
    socialInstagram: socialHref("Instagram"),
    socialX: socialHref("X"),
  };
}

export function mergeSiteSettings(
  partial?: Partial<CmsSiteSettings> | null,
): CmsSiteSettings {
  const base = defaultSiteSettings();
  if (!partial) return base;
  return {
    ...base,
    ...partial,
    keywords: Array.isArray(partial.keywords)
      ? partial.keywords
      : base.keywords,
  };
}

export function settingsSocials(s: CmsSiteSettings) {
  return [
    { label: "LinkedIn", href: s.socialLinkedin },
    { label: "YouTube", href: s.socialYoutube },
    { label: "Instagram", href: s.socialInstagram },
    { label: "X", href: s.socialX },
  ].filter((x) => x.href.trim());
}

export function settingsMap(s: CmsSiteSettings) {
  const q = encodeURIComponent(s.officeAddress.trim() || s.officeCity);
  return {
    embedSrc: `https://www.google.com/maps?q=${q}&z=15&hl=en&output=embed`,
    directionsHref: `https://www.google.com/maps/search/?api=1&query=${q}`,
    title: `Map of BikeWo office in ${s.officeCity}`,
  };
}
