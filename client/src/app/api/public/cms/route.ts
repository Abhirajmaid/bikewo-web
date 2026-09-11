import { NextResponse } from "next/server";
import { listNewsMedia, listTeamMembers, listTestimonials, listCareers } from "@/lib/strapi";

export async function GET(request: Request) {
  const resource = new URL(request.url).searchParams.get("resource");

  try {
    if (resource === "team") {
      const items = await listTeamMembers({ activeOnly: true });
      return NextResponse.json({ items });
    }
    if (resource === "testimonials") {
      const items = await listTestimonials();
      return NextResponse.json({ items });
    }
    if (resource === "careers") {
      const items = await listCareers({ openOnly: true });
      return NextResponse.json({ items });
    }
    const items = await listNewsMedia();
    return NextResponse.json({ items });
  } catch (err) {
    const message = err instanceof Error ? err.message : "CMS unavailable";
    return NextResponse.json({ error: message, items: [] }, { status: 502 });
  }
}
