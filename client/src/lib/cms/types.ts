import type {
  ActiveStatus,
  CmsRole,
  InquiryStatus,
  MemberStatus,
  PublishStatus,
} from "@/lib/admin/types";

export type NewsMediaItem = {
  id: string;
  title: string;
  excerpt: string;
  typeLabel: string;
  date: string;
  href: string;
  /** Custom card image URL; null uses the default investor-style PDF preview. */
  image: string | null;
  status: PublishStatus;
  featured?: boolean;
};

export type CmsTeamMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  division: string;
  bio: string;
  image: string;
  joinedAt: string;
  status: ActiveStatus;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
};

export type CmsContactInquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  topic: string;
  message: string;
  submittedAt: string;
  status: InquiryStatus;
};

export type CmsMember = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  cmsRole: CmsRole;
  department: string;
  invitedAt: string;
  lastActiveAt: string | null;
  status: MemberStatus;
};

/** Site-wide CMS settings (footer, contact, SEO, socials). */
export type CmsSiteSettings = {
  name: string;
  legalName: string;
  cin: string;
  nseSymbol: string;
  tagline: string;
  corporateTagline: string;
  campaignTagline: string;
  description: string;
  keywords: string[];
  brandEmail: string;
  accountsEmail: string;
  phone: string;
  phoneTel: string;
  officeLabel: string;
  officeCity: string;
  officeAddress: string;
  officeHours: string;
  officeNote: string;
  socialLinkedin: string;
  socialYoutube: string;
  socialInstagram: string;
  socialX: string;
};

/** Local JSON store — auth, contact inbox, site settings. Content lives in Strapi. */
export type CmsDatabase = {
  contact: CmsContactInquiry[];
  members: CmsMember[];
  settings?: CmsSiteSettings;
};
