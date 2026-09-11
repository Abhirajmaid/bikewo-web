import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { createTeamMember, listTeam } from "@/lib/cms/db";
import type { CmsTeamMember } from "@/lib/cms/types";

export async function GET() {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ items: listTeam() });
}

export async function POST(request: Request) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as Partial<CmsTeamMember> | null;
  if (!body?.name?.trim() || !body?.role?.trim()) {
    return NextResponse.json({ error: "Name and role are required." }, { status: 400 });
  }

  const item = createTeamMember({
    name: body.name.trim(),
    role: body.role.trim(),
    department: body.department?.trim() || "—",
    email: body.email?.trim() || "",
    division: body.division?.trim() || "executive",
    bio: body.bio?.trim() || "",
    image: body.image?.trim() || "",
    joinedAt: body.joinedAt || new Date().toISOString().slice(0, 10),
    status: body.status ?? "active",
    linkedin: body.linkedin,
    twitter: body.twitter,
    facebook: body.facebook,
    instagram: body.instagram,
  });

  return NextResponse.json({ item }, { status: 201 });
}
