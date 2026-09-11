import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { createTestimonial, listTestimonials } from "@/lib/strapi";

export async function GET() {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const items = await listTestimonials({ includeDrafts: true });
    return NextResponse.json({ items });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load testimonials";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    quote?: string;
    name?: string;
    role?: string;
    avatarUrl?: string;
    sortOrder?: number;
  } | null;

  if (!body?.quote?.trim() || !body?.name?.trim()) {
    return NextResponse.json({ error: "Quote and name are required." }, { status: 400 });
  }

  try {
    const created = await createTestimonial({
      quote: body.quote.trim(),
      name: body.name.trim(),
      role: body.role?.trim() || "",
      avatarUrl: body.avatarUrl?.trim() || "",
      sortOrder: body.sortOrder ?? 0,
    });
    return NextResponse.json({ item: created.data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
