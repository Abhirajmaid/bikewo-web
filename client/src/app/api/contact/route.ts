import { NextResponse } from "next/server";
import { createContact } from "@/lib/cms/db";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    topic?: string;
    message?: string;
  } | null;

  const firstName = body?.firstName?.trim() ?? "";
  const lastName = body?.lastName?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const message = body?.message?.trim() ?? "";
  const topic = body?.topic?.trim() || "General Inquiry";

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json(
      { error: "First name, last name, email and message are required." },
      { status: 400 },
    );
  }

  const item = createContact({
    name: `${firstName} ${lastName}`.trim(),
    email,
    phone: body?.phone?.trim() || "",
    company: body?.company?.trim() || "",
    topic,
    message,
  });

  return NextResponse.json({ ok: true, id: item.id }, { status: 201 });
}
