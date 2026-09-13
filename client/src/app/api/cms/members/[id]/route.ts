import { NextResponse } from "next/server";
import { getSessionMember, hashPassword, publicMember } from "@/lib/cms/auth";
import { deleteMember, updateMember } from "@/lib/cms/db";
import type { CmsMember } from "@/lib/cms/types";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: Ctx) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const body = (await request.json().catch(() => null)) as
    | (Partial<CmsMember> & { password?: string })
    | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { passwordHash: _ignored, password, ...safe } = body;
  const patch: Partial<CmsMember> = { ...safe };

  if (password !== undefined && password !== "") {
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }
    patch.passwordHash = hashPassword(password);
  }

  if (patch.status === "suspended" && id === member.id) {
    return NextResponse.json(
      { error: "You cannot deactivate your own account." },
      { status: 400 },
    );
  }

  const item = updateMember(id, patch);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item: publicMember(item) });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  if (id === member.id) {
    return NextResponse.json({ error: "You cannot delete your own account." }, { status: 400 });
  }
  if (!deleteMember(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
