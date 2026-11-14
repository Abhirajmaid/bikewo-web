import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { getApplication, readApplicationFile } from "@/lib/cms/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

/** Streams a candidate's CV (`?kind=cv`) or cover letter PDF (`?kind=cover`) to signed-in admins. */
export async function GET(request: Request, ctx: Ctx) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const kind = new URL(request.url).searchParams.get("kind");
  const application = await getApplication(id);
  const key =
    kind === "cover" ? application?.coverLetterKey : application?.cvKey;
  if (!application || !key) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const bytes = await readApplicationFile(key);
  if (!bytes) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const base = application.name.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "candidate";
  const filename = `${base}-${kind === "cover" ? "cover-letter" : "cv"}.pdf`;
  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
