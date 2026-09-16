import { NextResponse } from "next/server";
import { getSessionMember } from "@/lib/cms/auth";
import { mediaPath, s3Configured, signedPutUrl } from "@/lib/s3";

export const runtime = "nodejs";

const MAX_BYTES = 20 * 1024 * 1024;

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

type SignBody = {
  filename?: string;
  contentType?: string;
  folder?: string;
  size?: number;
};

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

  try {
    const body = (await request.json()) as SignBody;
    const filename = String(body.filename || "").trim();
    const contentType = String(body.contentType || "").trim();
    const size = Number(body.size);
    const folder = String(body.folder || "uploads").replace(
      /[^a-z0-9/_-]/gi,
      "",
    );

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "filename and contentType are required" },
        { status: 400 },
      );
    }
    if (!ALLOWED.has(contentType)) {
      return NextResponse.json(
        { error: "Only images (jpeg/png/webp/gif) and PDFs are allowed." },
        { status: 400 },
      );
    }
    if (!Number.isFinite(size) || size <= 0) {
      return NextResponse.json({ error: "size is required" }, { status: 400 });
    }
    if (size > MAX_BYTES) {
      return NextResponse.json(
        { error: "File must be under 20MB." },
        { status: 400 },
      );
    }

    const ext = filename.includes(".")
      ? filename.slice(filename.lastIndexOf(".")).toLowerCase()
      : contentType === "application/pdf"
        ? ".pdf"
        : ".bin";
    const safeBase = filename
      .replace(ext, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60);
    const key = `${folder}/${Date.now()}-${safeBase || "file"}${ext}`;
    const uploadUrl = await signedPutUrl(key, contentType);

    return NextResponse.json({
      key,
      uploadUrl,
      url: mediaPath(key),
      contentType,
      name: filename,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    console.error("[cms/upload]", message);
    return NextResponse.json(
      { error: `Upload failed: ${message}` },
      { status: 500 },
    );
  }
}
