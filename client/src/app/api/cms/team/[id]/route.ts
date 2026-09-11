import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { deleteTeamMember, updateTeamMember } from "@/lib/strapi";
import type { ActiveStatus } from "@/lib/admin/types";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    role?: string;
    department?: string;
    email?: string;
    division?: string;
    bio?: string;
    image?: string;
    joinedAt?: string;
    status?: ActiveStatus;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  } | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    const updated = await updateTeamMember(id, {
      name: body.name,
      role: body.role,
      department: body.department,
      email: body.email,
      division: body.division,
      bio: body.bio,
      imageUrl: body.image,
      joinedAt: body.joinedAt,
      memberStatus: body.status,
      linkedin: body.linkedin,
      twitter: body.twitter,
      facebook: body.facebook,
      instagram: body.instagram,
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
    await deleteTeamMember(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
