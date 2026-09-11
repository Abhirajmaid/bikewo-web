import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { createTeamMember, listTeamMembers } from "@/lib/strapi";
import type { ActiveStatus } from "@/lib/admin/types";

export async function GET() {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const items = await listTeamMembers({ includeDrafts: true });
    return NextResponse.json({ items });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load team";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  if (!body?.name?.trim() || !body?.role?.trim()) {
    return NextResponse.json({ error: "Name and role are required." }, { status: 400 });
  }

  try {
    const created = await createTeamMember({
      name: body.name.trim(),
      role: body.role.trim(),
      department: body.department?.trim() || "—",
      email: body.email?.trim() || "",
      division: body.division?.trim() || "executive",
      bio: body.bio?.trim() || "",
      imageUrl: body.image?.trim() || "",
      joinedAt: body.joinedAt || new Date().toISOString().slice(0, 10),
      memberStatus: body.status ?? "active",
      linkedin: body.linkedin,
      twitter: body.twitter,
      facebook: body.facebook,
      instagram: body.instagram,
    });
    return NextResponse.json({ item: created.data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Create failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
