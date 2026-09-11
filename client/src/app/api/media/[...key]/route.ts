import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { bucketName, getS3, s3Configured } from "@/lib/s3";

export const runtime = "nodejs";

type Params = { params: Promise<{ key: string[] }> };

export async function GET(_request: Request, { params }: Params) {
  if (!s3Configured()) {
    return NextResponse.json({ error: "Bucket not configured" }, { status: 503 });
  }

  const { key: parts } = await params;
  const key = parts.map(decodeURIComponent).join("/");
  if (!key || key.includes("..")) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  try {
    const out = await getS3().send(
      new GetObjectCommand({ Bucket: bucketName(), Key: key }),
    );
    const bytes = await out.Body?.transformToByteArray();
    if (!bytes) {
      return NextResponse.json({ error: "Empty object" }, { status: 404 });
    }
    return new NextResponse(Buffer.from(bytes), {
      headers: {
        "Content-Type": out.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=3600",
        ...(out.ContentLength != null
          ? { "Content-Length": String(out.ContentLength) }
          : {}),
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
