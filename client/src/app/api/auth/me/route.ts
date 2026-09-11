import { NextResponse } from "next/server";
import { getSessionMember, publicMember } from "@/lib/cms/auth";

export async function GET() {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ member: null }, { status: 401 });
  }
  return NextResponse.json({ member: publicMember(member) });
}
