import type { ActiveStatus, JobStatus, PublishStatus } from "@/lib/admin/types";
import type { NewsMediaItem, CmsTeamMember } from "@/lib/cms/types";
import type { InvestorDoc, InvestorType } from "@/lib/investors";
import { TYPE_META } from "@/lib/investors";

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");

type StrapiEntity = { id: number; documentId: string };

function authHeaders(): HeadersInit {
  const token = process.env.STRAPI_API_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function strapiConfigured() {
  return Boolean(process.env.STRAPI_URL);
}

export async function strapiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(init?.headers || {}),
    },
    next: init?.cache === "no-store" ? undefined : { revalidate: 60 },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Strapi ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

async function listCollection<T>(
  path: string,
  opts?: { includeDrafts?: boolean; sort?: string; populate?: string },
): Promise<T[]> {
  const qs = new URLSearchParams({
    "pagination[pageSize]": "100",
    sort: opts?.sort || "createdAt:desc",
  });
  if (opts?.populate) qs.set("populate", opts.populate);
  if (!opts?.includeDrafts) qs.set("status", "published");
  const json = await strapiFetch<{ data: T[] }>(`${path}?${qs}`, { cache: "no-store" });
  return json.data ?? [];
}

function createPublished<T>(path: string, data: Record<string, unknown>) {
  return strapiFetch<{ data: T }>(`${path}?status=published`, {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({ data }),
  });
}

function updateDoc<T>(path: string, documentId: string, data: Record<string, unknown>) {
  return strapiFetch<{ data: T }>(`${path}/${documentId}`, {
    method: "PUT",
    cache: "no-store",
    body: JSON.stringify({ data }),
  });
}

function deleteDoc(path: string, documentId: string) {
  return strapiFetch(`${path}/${documentId}`, { method: "DELETE", cache: "no-store" });
}

/* ------------------------------------------------------------------ Investors */

type StrapiInvestor = StrapiEntity & {
  slug: string;
  title: string;
  excerpt: string;
  docType: InvestorType;
  date: string;
  featured?: boolean;
  href?: string | null;
  file?: { url?: string } | null;
};

export function mapInvestorDoc(row: StrapiInvestor): InvestorDoc {
  const meta = TYPE_META[row.docType];
  const fileUrl = row.file?.url
    ? row.file.url.startsWith("http")
      ? row.file.url
      : `${STRAPI_URL}${row.file.url}`
    : "";
  return {
    id: row.slug || row.documentId,
    documentId: row.documentId,
    title: row.title,
    excerpt: row.excerpt,
    type: row.docType,
    typeLabel: meta.typeLabel,
    topic: meta.topic,
    topicLabel: meta.topicLabel,
    date: row.date,
    href: (row.href || fileUrl || "").trim(),
    featured: Boolean(row.featured),
  };
}

export async function listInvestorDocuments(opts?: { includeDrafts?: boolean }) {
  const rows = await listCollection<StrapiInvestor>("/api/investor-documents", {
    ...opts,
    sort: "date:desc",
    populate: "file",
  });
  return rows.map(mapInvestorDoc);
}

export async function createInvestorDocument(input: {
  slug: string;
  title: string;
  excerpt: string;
  docType: InvestorType;
  date: string;
  featured?: boolean;
  href?: string;
}) {
  return createPublished<StrapiInvestor>("/api/investor-documents", {
    ...input,
    href: input.href || "",
    featured: Boolean(input.featured),
  });
}

export async function updateInvestorDocument(
  documentId: string,
  input: Partial<{
    slug: string;
    title: string;
    excerpt: string;
    docType: InvestorType;
    date: string;
    featured: boolean;
    href: string;
  }>,
) {
  return updateDoc<StrapiInvestor>("/api/investor-documents", documentId, input);
}

export async function deleteInvestorDocument(documentId: string) {
  return deleteDoc("/api/investor-documents", documentId);
}

/* ---------------------------------------------------------------------- Team */

type StrapiTeam = StrapiEntity & {
  name: string;
  role: string;
  department?: string;
  email?: string;
  division?: string;
  bio?: string;
  imageUrl?: string | null;
  photo?: { url?: string } | null;
  joinedAt?: string;
  memberStatus?: ActiveStatus;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
};

export type CmsTeamMemberDoc = CmsTeamMember & { documentId: string };

export function mapTeamMember(row: StrapiTeam): CmsTeamMemberDoc {
  const photoUrl = row.photo?.url
    ? row.photo.url.startsWith("http")
      ? row.photo.url
      : `${STRAPI_URL}${row.photo.url}`
    : "";
  return {
    id: row.documentId,
    documentId: row.documentId,
    name: row.name,
    role: row.role,
    department: row.department || "—",
    email: row.email || "",
    division: row.division || "executive",
    bio: row.bio || "",
    image: (row.imageUrl || photoUrl || "").trim(),
    joinedAt: row.joinedAt || new Date().toISOString().slice(0, 10),
    status: row.memberStatus || "active",
    linkedin: row.linkedin,
    twitter: row.twitter,
    facebook: row.facebook,
    instagram: row.instagram,
  };
}

export async function listTeamMembers(opts?: { includeDrafts?: boolean; activeOnly?: boolean }) {
  const rows = await listCollection<StrapiTeam>("/api/team-members", {
    includeDrafts: opts?.includeDrafts,
    sort: "joinedAt:desc",
    populate: "photo",
  });
  const mapped = rows.map(mapTeamMember);
  return opts?.activeOnly ? mapped.filter((m) => m.status === "active") : mapped;
}

export async function createTeamMember(input: {
  name: string;
  role: string;
  department?: string;
  email?: string;
  division?: string;
  bio?: string;
  imageUrl?: string;
  joinedAt?: string;
  memberStatus?: ActiveStatus;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}) {
  return createPublished<StrapiTeam>("/api/team-members", {
    ...input,
    imageUrl: input.imageUrl || "",
    memberStatus: input.memberStatus || "active",
  });
}

export async function updateTeamMember(documentId: string, input: Record<string, unknown>) {
  return updateDoc<StrapiTeam>("/api/team-members", documentId, input);
}

export async function deleteTeamMember(documentId: string) {
  return deleteDoc("/api/team-members", documentId);
}

/* ----------------------------------------------------------------------- News */

type StrapiNews = StrapiEntity & {
  slug: string;
  title: string;
  excerpt?: string;
  typeLabel?: string;
  date: string;
  href?: string | null;
  imageUrl?: string | null;
  featured?: boolean;
};

export type NewsMediaDoc = NewsMediaItem & { documentId: string };

export function mapNewsItem(row: StrapiNews): NewsMediaDoc {
  return {
    id: row.slug || row.documentId,
    documentId: row.documentId,
    title: row.title,
    excerpt: row.excerpt || "",
    typeLabel: row.typeLabel || "Press release",
    date: row.date,
    href: (row.href || "").trim(),
    image: (row.imageUrl || "").trim() || null,
    status: "published",
    featured: Boolean(row.featured),
  };
}

export async function listNewsMedia(opts?: { includeDrafts?: boolean }) {
  const rows = await listCollection<StrapiNews>("/api/news-media-items", {
    ...opts,
    sort: "date:desc",
  });
  return rows.map(mapNewsItem);
}

export async function createNewsMedia(input: {
  slug: string;
  title: string;
  excerpt?: string;
  typeLabel?: string;
  date: string;
  href?: string;
  imageUrl?: string | null;
  featured?: boolean;
}) {
  return createPublished<StrapiNews>("/api/news-media-items", {
    ...input,
    href: input.href || "",
    imageUrl: input.imageUrl || "",
    featured: Boolean(input.featured),
  });
}

export async function updateNewsMedia(documentId: string, input: Record<string, unknown>) {
  return updateDoc<StrapiNews>("/api/news-media-items", documentId, input);
}

export async function deleteNewsMedia(documentId: string) {
  return deleteDoc("/api/news-media-items", documentId);
}

/* --------------------------------------------------------------- Testimonials */

export type TestimonialDoc = {
  id: string;
  documentId: string;
  quote: string;
  name: string;
  role: string;
  avatarUrl: string;
  sortOrder: number;
  status: PublishStatus;
};

type StrapiTestimonial = StrapiEntity & {
  quote: string;
  name: string;
  role?: string;
  avatarUrl?: string | null;
  sortOrder?: number;
};

export function mapTestimonial(row: StrapiTestimonial): TestimonialDoc {
  return {
    id: row.documentId,
    documentId: row.documentId,
    quote: row.quote,
    name: row.name,
    role: row.role || "",
    avatarUrl: (row.avatarUrl || "").trim(),
    sortOrder: row.sortOrder ?? 0,
    status: "published",
  };
}

export async function listTestimonials(opts?: { includeDrafts?: boolean }) {
  const rows = await listCollection<StrapiTestimonial>("/api/testimonials", {
    ...opts,
    sort: "sortOrder:asc",
  });
  return rows.map(mapTestimonial);
}

export async function createTestimonial(input: {
  quote: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  sortOrder?: number;
}) {
  return createPublished<StrapiTestimonial>("/api/testimonials", {
    ...input,
    avatarUrl: input.avatarUrl || "",
    sortOrder: input.sortOrder ?? 0,
  });
}

export async function updateTestimonial(documentId: string, input: Record<string, unknown>) {
  return updateDoc<StrapiTestimonial>("/api/testimonials", documentId, input);
}

export async function deleteTestimonial(documentId: string) {
  return deleteDoc("/api/testimonials", documentId);
}

/* -------------------------------------------------------------------- Careers */

export type CareerDoc = {
  id: string;
  documentId: string;
  title: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  department: string;
  postedAt: string;
  applications: number;
  status: JobStatus;
  jdUrl: string;
};

type StrapiCareer = StrapiEntity & {
  title: string;
  location: string;
  jobType?: "Full-time" | "Part-time" | "Contract";
  department?: string;
  postedAt?: string;
  jobStatus?: JobStatus;
  jdUrl?: string | null;
};

export function mapCareer(row: StrapiCareer): CareerDoc {
  return {
    id: row.documentId,
    documentId: row.documentId,
    title: row.title,
    location: row.location,
    type: row.jobType || "Full-time",
    department: row.department || "—",
    postedAt: row.postedAt || new Date().toISOString().slice(0, 10),
    applications: 0,
    status: row.jobStatus || "open",
    jdUrl: (row.jdUrl || "").trim(),
  };
}

export async function listCareers(opts?: { includeDrafts?: boolean; openOnly?: boolean }) {
  const rows = await listCollection<StrapiCareer>("/api/career-openings", {
    includeDrafts: opts?.includeDrafts,
    sort: "postedAt:desc",
  });
  const mapped = rows.map(mapCareer);
  return opts?.openOnly ? mapped.filter((c) => c.status === "open") : mapped;
}

export async function createCareer(input: {
  title: string;
  location: string;
  jobType?: "Full-time" | "Part-time" | "Contract";
  department?: string;
  postedAt?: string;
  jobStatus?: JobStatus;
  jdUrl?: string;
}) {
  return createPublished<StrapiCareer>("/api/career-openings", {
    ...input,
    jobType: input.jobType || "Full-time",
    jobStatus: input.jobStatus || "open",
    jdUrl: input.jdUrl || "",
  });
}

export async function updateCareer(documentId: string, input: Record<string, unknown>) {
  return updateDoc<StrapiCareer>("/api/career-openings", documentId, input);
}

export async function deleteCareer(documentId: string) {
  return deleteDoc("/api/career-openings", documentId);
}
