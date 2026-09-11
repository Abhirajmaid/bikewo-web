import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { createNews, listNews } from "@/lib/cms/db";
import type { NewsMediaItem } from "@/lib/cms/types";

export async function GET() {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ items: listNews() });
}

export async function POST(request: Request) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as Partial<NewsMediaItem> | null;
  if (!body?.title?.trim() || !body?.href?.trim()) {
    return NextResponse.json({ error: "Title and document URL are required." }, { status: 400 });
  }

  const item = createNews({
    title: body.title.trim(),
    excerpt: body.excerpt?.trim() || "Press release filed with the National Stock Exchange.",
    typeLabel: body.typeLabel?.trim() || "Press release",
    date: body.date || new Date().toISOString().slice(0, 10),
    href: body.href.trim(),
    image: body.image?.trim() || null,
    status: body.status ?? "draft",
    featured: Boolean(body.featured),
  });

  return NextResponse.json({ item }, { status: 201 });
}
