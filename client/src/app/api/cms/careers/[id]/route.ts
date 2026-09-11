import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { deleteCareer, updateCareer } from "@/lib/strapi";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = (await request.json().catch(() => null)) as {
    title?: string;
    location?: string;
    type?: "Full-time" | "Part-time" | "Contract";
    department?: string;
    postedAt?: string;
    status?: "open" | "closed";
    jdUrl?: string;
  } | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    const updated = await updateCareer(id, {
      title: body.title,
      location: body.location,
      jobType: body.type,
      department: body.department,
      postedAt: body.postedAt,
      jobStatus: body.status,
      jdUrl: body.jdUrl,
    });
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
    await deleteCareer(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
