import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { mediaPath, s3Configured, uploadObject } from "@/lib/s3";

export const runtime = "nodejs";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

export async function POST(request: Request) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!s3Configured()) {
    return NextResponse.json(
      { error: "Bucket is not configured. Set AWS_* env vars on the client." },
      { status: 503 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  const folder = String(form.get("folder") || "uploads").replace(/[^a-z0-9/_-]/gi, "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: "Only images (jpeg/png/webp/gif) and PDFs are allowed." },
      { status: 400 },
    );
  }
  if (file.size > 25 * 1024 * 1024) {
    return NextResponse.json({ error: "File must be under 25MB." }, { status: 400 });
  }

  const ext = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf(".")).toLowerCase()
    : file.type === "application/pdf"
      ? ".pdf"
      : ".bin";
  const safeBase = file.name
    .replace(ext, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  const key = `${folder}/${Date.now()}-${safeBase || "file"}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await uploadObject(key, buffer, file.type);

  return NextResponse.json({
    key,
    url: mediaPath(key),
    contentType: file.type,
    name: file.name,
  });
}
