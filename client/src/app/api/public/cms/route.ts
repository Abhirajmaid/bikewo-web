import { NextResponse } from "next/server";
import { listPublishedNews } from "@/lib/cms/db";
import { listActiveTeam } from "@/lib/cms/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");

  if (resource === "team") {
    return NextResponse.json({ items: listActiveTeam() });
  }

  return NextResponse.json({ items: listPublishedNews() });
}
