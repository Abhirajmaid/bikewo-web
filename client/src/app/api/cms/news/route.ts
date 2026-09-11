import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { createNewsMedia, listNewsMedia } from "@/lib/strapi";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function GET() {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const items = await listNewsMedia({ includeDrafts: true });
    return NextResponse.json({ items });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load news";
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
    typeLabel?: string;
    date?: string;
    href?: string;
    image?: string | null;
    featured?: boolean;
    slug?: string;
  } | null;

  if (!body?.title?.trim() || !body?.date) {
    return NextResponse.json({ error: "Title and date are required." }, { status: 400 });
  }

  try {
    const created = await createNewsMedia({
      slug: body.slug?.trim() || slugify(body.title),
      title: body.title.trim(),
      excerpt: body.excerpt?.trim() || "",
      typeLabel: body.typeLabel?.trim() || "Press release",
      date: body.date,
      href: body.href?.trim() || "",
      imageUrl: body.image?.trim() || "",
      featured: Boolean(body.featured),
    });
    return NextResponse.json({ item: created.data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
