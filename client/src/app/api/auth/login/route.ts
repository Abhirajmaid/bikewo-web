import { NextResponse } from "next/server";
import {
  authenticate,
  createSessionToken,
  publicMember,
  sessionCookieOptions,
} from "@/lib/cms/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as {
      email?: string;
      password?: string;
    } | null;

    const email = body?.email?.trim() ?? "";
    const password = body?.password ?? "";
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const member = await authenticate(email, password);
    if (!member) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = createSessionToken(member);
    const res = NextResponse.json({ member: publicMember(member) });
    res.cookies.set(sessionCookieOptions(token));
    return res;
  } catch (err) {
    console.error("[auth/login]", err);
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
