import { NextResponse } from "next/server";
import {
  APPLICATION_FILES_PREFIX,
  createApplication,
  newApplicationId,
  saveApplicationFile,
} from "@/lib/cms/db";
import type { CmsJobReference } from "@/lib/cms/types";
import {
  APPLICATION_PDF_MAX_BYTES,
  MIN_REFERENCES,
  NOTICE_PERIODS,
  ctcOutsideBand,
  isEmail,
  isPhone,
} from "@/lib/careers";
import { listCareers } from "@/lib/strapi";

export const runtime = "nodejs";

/** Same spam guard as the contact form: real people take a few seconds to fill the form. */
const MIN_FILL_MS = 3000;
const MAX_REFERENCES = 5;

function text(data: FormData, name: string, max = 200) {
  const value = data.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function bad(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

/** Returns the PDF bytes, null when no file was sent, or an error message. */
async function readPdf(
  data: FormData,
  name: string,
  label: string,
): Promise<Buffer | null | string> {
  const file = data.get(name);
  if (!(file instanceof File) || file.size === 0) return null;
  if (file.size > APPLICATION_PDF_MAX_BYTES) {
    return `${label} must be a PDF under 2 MB.`;
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  // Check the file signature, not just the browser-supplied type / extension.
  if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") {
    return `${label} must be a PDF file.`;
  }
  return bytes;
}

export async function POST(request: Request) {
  const data = await request.formData().catch(() => null);
  if (!data) return bad("Invalid form submission.");

  // Spam guard: drop bot submissions silently (respond as if saved).
  const elapsedMs = Number(text(data, "elapsedMs", 20));
  if (text(data, "website") || !Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_MS) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const openingId = text(data, "openingId", 100);
  let opening;
  try {
    opening = (await listCareers({ openOnly: true })).find((c) => c.id === openingId);
  } catch {
    return NextResponse.json(
      { error: "Unable to submit right now. Please try again later." },
      { status: 502 },
    );
  }
  if (!opening) return bad("This opening is no longer accepting applications.");

  const name = text(data, "name", 120);
  const phone = text(data, "phone", 30);
  const email = text(data, "email", 200);
  const linkedin = text(data, "linkedin", 300);
  const noticePeriod = text(data, "noticePeriod", 40);
  const coverLetter = text(data, "coverLetter", 5000);
  const currentCtcRaw = text(data, "currentCtc", 20);
  const expectedCtcRaw = text(data, "expectedCtc", 20);
  const currentCtc = Number(currentCtcRaw);
  const expectedCtc = Number(expectedCtcRaw);

  if (!name) return bad("Please enter your name.");
  if (!isPhone(phone)) return bad("Please enter a valid phone number.");
  if (!isEmail(email)) return bad("Please enter a valid email address.");
  if (linkedin && !/^https?:\/\/\S+$/i.test(linkedin)) {
    return bad("LinkedIn profile must be a full link starting with https://");
  }
  if (currentCtcRaw === "" || !Number.isFinite(currentCtc) || currentCtc < 0) {
    return bad("Please enter your current CTC (0 if you are a fresher).");
  }
  if (expectedCtcRaw === "" || !Number.isFinite(expectedCtc) || expectedCtc < 0) {
    return bad("Please enter your expected CTC.");
  }
  if (!(NOTICE_PERIODS as readonly string[]).includes(noticePeriod)) {
    return bad("Please select your notice period.");
  }

  let references: CmsJobReference[];
  try {
    const raw = JSON.parse(text(data, "references", 10000) || "[]") as unknown;
    if (!Array.isArray(raw)) throw new Error();
    references = raw.slice(0, MAX_REFERENCES).map((r) => {
      const ref = (r ?? {}) as Record<string, unknown>;
      const field = (k: string) =>
        typeof ref[k] === "string" ? (ref[k] as string).trim().slice(0, 200) : "";
      return {
        name: field("name"),
        company: field("company"),
        designation: field("designation"),
        phone: field("phone"),
        email: field("email"),
      };
    });
  } catch {
    return bad("Invalid reference details.");
  }
  if (references.length < MIN_REFERENCES) {
    return bad(`Please add at least ${MIN_REFERENCES} references.`);
  }
  for (const [i, ref] of references.entries()) {
    if (!ref.name || !ref.company || !ref.designation) {
      return bad(`Reference ${i + 1}: name, company and designation are required.`);
    }
    if (!isPhone(ref.phone)) return bad(`Reference ${i + 1}: enter a valid phone number.`);
    if (!isEmail(ref.email)) return bad(`Reference ${i + 1}: enter a valid email address.`);
  }

  const cv = await readPdf(data, "cv", "CV");
  if (typeof cv === "string") return bad(cv);
  if (!cv) return bad("Please upload your CV (PDF).");
  const coverLetterPdf = await readPdf(data, "coverLetterFile", "Cover letter");
  if (typeof coverLetterPdf === "string") return bad(coverLetterPdf);

  if (ctcOutsideBand(currentCtc, expectedCtc) && !coverLetter && !coverLetterPdf) {
    return bad(
      "Your expected CTC is outside the 5–30% range over your current CTC. Please explain why in the cover letter.",
    );
  }

  const id = newApplicationId();
  const folder = `${APPLICATION_FILES_PREFIX}${id}`;
  const cvKey = `${folder}/cv.pdf`;
  const coverLetterKey = coverLetterPdf ? `${folder}/cover-letter.pdf` : "";

  try {
    await saveApplicationFile(cvKey, cv);
    if (coverLetterPdf) await saveApplicationFile(coverLetterKey, coverLetterPdf);
    await createApplication({
      id,
      openingId: opening.id,
      position: opening.title,
      name,
      phone,
      email,
      linkedin,
      currentCtc,
      expectedCtc,
      noticePeriod,
      coverLetter,
      cvKey,
      coverLetterKey,
      references,
    });
  } catch (err) {
    console.error("[careers/apply]", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Unable to submit right now. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
