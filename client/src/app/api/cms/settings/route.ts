import { NextResponse } from "next/server";
import { hasPermission } from "@/lib/admin/rbac";
import { getSessionMember } from "@/lib/cms/auth";
import { getSiteSettings, updateSiteSettings } from "@/lib/cms/db";
import type { CmsSiteSettings } from "@/lib/cms/types";

export async function GET() {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasPermission(member.cmsRole, "settings:manage")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return NextResponse.json({ settings: getSiteSettings() });
}

export async function PUT(request: Request) {
  const member = await getSessionMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasPermission(member.cmsRole, "settings:manage")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as Partial<CmsSiteSettings> | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const settings = updateSiteSettings({
    name: body.name?.trim(),
    legalName: body.legalName?.trim(),
    cin: body.cin?.trim(),
    nseSymbol: body.nseSymbol?.trim(),
    tagline: body.tagline?.trim(),
    corporateTagline: body.corporateTagline?.trim(),
    campaignTagline: body.campaignTagline?.trim(),
    description: body.description?.trim(),
    keywords: Array.isArray(body.keywords)
      ? body.keywords.map((k) => String(k).trim()).filter(Boolean)
      : undefined,
    brandEmail: body.brandEmail?.trim(),
    accountsEmail: body.accountsEmail?.trim(),
    phone: body.phone?.trim(),
    phoneTel: body.phoneTel?.trim(),
    officeLabel: body.officeLabel?.trim(),
    officeCity: body.officeCity?.trim(),
    officeAddress: body.officeAddress?.trim(),
    officeHours: body.officeHours?.trim(),
    officeNote: body.officeNote?.trim(),
    socialLinkedin: body.socialLinkedin?.trim(),
    socialYoutube: body.socialYoutube?.trim(),
    socialInstagram: body.socialInstagram?.trim(),
    socialX: body.socialX?.trim(),
  });

  return NextResponse.json({ settings });
}
