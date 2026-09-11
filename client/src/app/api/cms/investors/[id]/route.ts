import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { deleteInvestorDocument, updateInvestorDocument } from "@/lib/strapi";
import type { InvestorType } from "@/lib/investors";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = (await request.json().catch(() => null)) as Partial<{
    title: string;
    excerpt: string;
    docType: InvestorType;
    date: string;
    featured: boolean;
    href: string;
    slug: string;
  }> | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    const updated = await updateInvestorDocument(id, body);
    return NextResponse.json({ item: updated.data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  try {
    await deleteInvestorDocument(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
