import { NextResponse } from "next/server";
import { getSessionMember, hashPassword, publicMember } from "@/lib/cms/auth";
import { createMember, listMembers } from "@/lib/cms/db";
import type { CmsRole } from "@/lib/admin/types";

export async function GET() {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    items: listMembers().map(publicMember),
  });
}

export async function POST(request: Request) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    name?: string;
    email?: string;
    password?: string;
    cmsRole?: CmsRole;
    department?: string;
  } | null;

  if (!body?.name?.trim() || !body?.email?.trim() || !body?.password) {
    return NextResponse.json(
      { error: "Name, email and password are required." },
      { status: 400 },
    );
  }

  const exists = listMembers().some(
    (m) => m.email.toLowerCase() === body.email!.trim().toLowerCase(),
  );
  if (exists) {
    return NextResponse.json({ error: "A member with that email already exists." }, { status: 409 });
  }

  const item = createMember({
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    passwordHash: hashPassword(body.password),
    cmsRole: body.cmsRole ?? "editor",
    department: body.department?.trim() || "—",
    invitedAt: new Date().toISOString().slice(0, 10),
    lastActiveAt: null,
    status: "active",
  });

  return NextResponse.json({ item: publicMember(item) }, { status: 201 });
}
