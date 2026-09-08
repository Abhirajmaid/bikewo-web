export type PublishStatus = "draft" | "published" | "archived";
export type ActiveStatus = "active" | "inactive";
export type InquiryStatus = "new" | "in_progress" | "resolved";
export type ApplicationStatus = "pending" | "reviewing" | "accepted" | "rejected";
export type JobStatus = "open" | "closed";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  joinedAt: string;
  status: ActiveStatus;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  excerpt: string;
  publishedAt: string | null;
  status: PublishStatus;
};

export type CareerOpening = {
  id: string;
  title: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  department: string;
  postedAt: string;
  applications: number;
  status: JobStatus;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  status: PublishStatus;
  sortOrder: number;
};

export type Partner = {
  id: string;
  name: string;
  website: string;
  sortOrder: number;
  status: PublishStatus;
};

export type ContactInquiry = {
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

export type DriverApplication = {
  id: string;
  name: string;
  phone: string;
  city: string;
  vehicleType: string;
  experience: string;
  submittedAt: string;
  status: ApplicationStatus;
};

export type JobApplication = {
  id: string;
  name: string;
  email: string;
  position: string;
  submittedAt: string;
  status: ApplicationStatus;
};

export type { CmsRole, InternalMember, MemberStatus, Permission } from "./rbac";
