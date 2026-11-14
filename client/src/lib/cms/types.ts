import type {
  ActiveStatus,
  ApplicationStatus,
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

export type CmsJobReference = {
  name: string;
  company: string;
  designation: string;
  phone: string;
  email: string;
};

/** A candidate's application to a live career opening (submitted from /careers). */
export type CmsJobApplication = {
  id: string;
  /** Strapi documentId of the career opening. */
  openingId: string;
  /** Opening title when the candidate applied (kept if the opening is later edited or removed). */
  position: string;
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  /** Annual CTC in INR; 0 for freshers. */
  currentCtc: number;
  expectedCtc: number;
  noticePeriod: string;
  coverLetter: string;
  /** Private bucket keys, served only through the signed-in admin API. */
  cvKey: string;
  coverLetterKey: string;
  references: CmsJobReference[];
  submittedAt: string;
  status: ApplicationStatus;
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

/** Local JSON store — auth, contact inbox, job applications, site settings. Content lives in Strapi. */
export type CmsDatabase = {
  contact: CmsContactInquiry[];
  applications: CmsJobApplication[];
  members: CmsMember[];
  settings?: CmsSiteSettings;
};
