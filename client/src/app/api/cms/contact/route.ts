import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { listContact } from "@/lib/cms/db";

export async function GET() {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ items: listContact() });
}
