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

export type CmsDatabase = {
  news: NewsMediaItem[];
  team: CmsTeamMember[];
  contact: CmsContactInquiry[];
  members: CmsMember[];
};
