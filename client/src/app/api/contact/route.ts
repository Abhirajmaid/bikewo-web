import { NextResponse } from "next/server";
import { createContact } from "@/lib/cms/db";

/** Real people take a few seconds to fill the form; bots post instantly. */
const MIN_FILL_MS = 3000;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    topic?: string;
    message?: string;
    /** Honeypot: hidden from people, so it must stay empty. */
    website?: string;
    /** Milliseconds between the form rendering and being submitted. */
    elapsedMs?: number;
  } | null;

  // Spam guard: drop bot submissions silently (respond as if saved) so bots
  // don't learn to work around it. Catches the hidden-field fillers and
  // scripts posting straight to this endpoint without loading the form.
  const elapsedMs = body?.elapsedMs;
  if (
    body?.website?.trim() ||
    typeof elapsedMs !== "number" ||
    !Number.isFinite(elapsedMs) ||
    elapsedMs < MIN_FILL_MS
  ) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

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

  const item = await createContact({
    name: `${firstName} ${lastName}`.trim(),
    email,
    phone: body?.phone?.trim() || "",
    company: body?.company?.trim() || "",
    topic,
    message,
  });

  return NextResponse.json({ ok: true, id: item.id }, { status: 201 });
}
