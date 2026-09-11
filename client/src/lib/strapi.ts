import type { InvestorDoc, InvestorType } from "@/lib/investors";
import { TYPE_META } from "@/lib/investors";

const STRAPI_URL = (process.env.STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");

type StrapiInvestor = {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  excerpt: string;
  docType: InvestorType;
  date: string;
  featured?: boolean;
  href?: string | null;
  file?: {
    url?: string;
  } | null;
};

type StrapiListResponse = {
  data: StrapiInvestor[];
};

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
  return res.json() as Promise<T>;
}

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
  const qs = new URLSearchParams({
    populate: "file",
    "pagination[pageSize]": "100",
    sort: "date:desc",
  });
  if (!opts?.includeDrafts) qs.set("status", "published");
  const json = await strapiFetch<StrapiListResponse>(
    `/api/investor-documents?${qs.toString()}`,
    { cache: "no-store" },
  );
  return json.data.map(mapInvestorDoc);
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
  return strapiFetch<{ data: StrapiInvestor }>(
    "/api/investor-documents?status=published",
    {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        data: {
          ...input,
          href: input.href || "",
          featured: Boolean(input.featured),
        },
      }),
    },
  );
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
  return strapiFetch<{ data: StrapiInvestor }>(`/api/investor-documents/${documentId}`, {
    method: "PUT",
    cache: "no-store",
    body: JSON.stringify({ data: input }),
  });
}

export async function deleteInvestorDocument(documentId: string) {
  return strapiFetch(`/api/investor-documents/${documentId}`, {
    method: "DELETE",
    cache: "no-store",
  });
}
