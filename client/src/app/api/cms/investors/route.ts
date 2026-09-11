import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import {
  createInvestorDocument,
  listInvestorDocuments,
} from "@/lib/strapi";
import type { InvestorType } from "@/lib/investors";
import { slugifyInvestorTitle } from "@/lib/investors";

export async function GET() {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const items = await listInvestorDocuments({ includeDrafts: true });
    return NextResponse.json({ items });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load investors";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    title?: string;
    excerpt?: string;
    docType?: InvestorType;
    date?: string;
    featured?: boolean;
    href?: string;
    slug?: string;
  } | null;

  if (!body?.title?.trim() || !body?.excerpt?.trim() || !body?.docType || !body?.date) {
    return NextResponse.json(
      { error: "title, excerpt, docType and date are required." },
      { status: 400 },
    );
  }

  try {
    const created = await createInvestorDocument({
      slug: body.slug?.trim() || slugifyInvestorTitle(body.title),
      title: body.title.trim(),
      excerpt: body.excerpt.trim(),
      docType: body.docType,
      date: body.date,
      featured: Boolean(body.featured),
      href: body.href?.trim() || "",
    });
    return NextResponse.json({ item: created.data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
