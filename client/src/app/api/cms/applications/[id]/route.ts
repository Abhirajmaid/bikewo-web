import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { deleteApplication, updateApplication } from "@/lib/cms/db";
import type { ApplicationStatus } from "@/lib/admin/types";

type Ctx = { params: Promise<{ id: string }> };

const STATUSES: ApplicationStatus[] = ["pending", "reviewing", "accepted", "rejected"];

export async function PATCH(request: Request, ctx: Ctx) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const body = (await request.json().catch(() => null)) as {
    status?: ApplicationStatus;
  } | null;
  if (!body?.status || !STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const item = await updateApplication(id, { status: body.status });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  if (!(await deleteApplication(id))) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
