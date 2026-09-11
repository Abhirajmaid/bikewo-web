import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { createCareer, listCareers } from "@/lib/strapi";
import type { JobStatus } from "@/lib/admin/types";

export async function GET() {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const items = await listCareers({ includeDrafts: true });
    return NextResponse.json({ items });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load careers";
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
    location?: string;
    type?: "Full-time" | "Part-time" | "Contract";
    department?: string;
    postedAt?: string;
    status?: JobStatus;
    jdUrl?: string;
  } | null;

  if (!body?.title?.trim() || !body?.location?.trim()) {
    return NextResponse.json({ error: "Title and location are required." }, { status: 400 });
  }

  try {
    const created = await createCareer({
      title: body.title.trim(),
      location: body.location.trim(),
      jobType: body.type || "Full-time",
      department: body.department?.trim() || "—",
      postedAt: body.postedAt || new Date().toISOString().slice(0, 10),
      jobStatus: body.status || "open",
      jdUrl: body.jdUrl?.trim() || "",
    });
    return NextResponse.json({ item: created.data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
