"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  APPLICATION_PDF_MAX_BYTES,
  MIN_REFERENCES,
  NOTICE_PERIODS,
  ctcOutsideBand,
} from "@/lib/careers";
import type { CmsJobReference } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-md border border-indigo-200 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-slate-400 outline-none transition-[border-color,box-shadow] focus:border-green-600 focus:ring-2 focus:ring-green-500/25";

const emptyReference = (): CmsJobReference => ({
  name: "",
  company: "",
  designation: "",
  phone: "",
  email: "",
});

function Field({
  label,
  hint,
  optional,
  children,
}: {
  label: string;
  hint?: ReactNode;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-indigo-800">
        {label}
        {optional ? <span className="font-normal text-slate"> (optional)</span> : null}
      </span>
      {children}
      {hint ? <span className="mt-1.5 block text-[13px] text-slate">{hint}</span> : null}
    </label>
  );
}

function SectionTitle({ n, children }: { n: number; children: ReactNode }) {
  return (
    <h2 className="flex items-baseline gap-3 font-display text-lg font-semibold text-indigo-800">
      <span className="eyebrow text-green-700">{String(n).padStart(2, "0")}</span>
      {children}
    </h2>
  );
}

function pdfError(file: File | null | undefined, label: string) {
  if (!file) return null;
  const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
  if (!isPdf) return `${label} must be a PDF file.`;
  if (file.size > APPLICATION_PDF_MAX_BYTES) return `${label} must be under 2 MB.`;
  return null;
}

export function ApplyForm({ openingId, position }: { openingId: string; position: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [currentCtc, setCurrentCtc] = useState("");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [references, setReferences] = useState<CmsJobReference[]>(() =>
    Array.from({ length: MIN_REFERENCES }, emptyReference),
  );
  // When the form became usable; sent with the submission as a spam signal.
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const outsideBand =
    currentCtc !== "" &&
    expectedCtc !== "" &&
    ctcOutsideBand(Number(currentCtc), Number(expectedCtc));

  function updateReference(index: number, key: keyof CmsJobReference, value: string) {
    setReferences((refs) => refs.map((r, i) => (i === index ? { ...r, [key]: value } : r)));
  }

  if (status === "ok") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 px-6 py-10 text-center">
        <p className="font-display text-xl font-semibold text-indigo-800">
          Thanks, your application was received.
        </p>
        <p className="mt-3 text-slate">
          Our team will review your application for {position} and get in touch if
          your profile is a fit.
        </p>
        <Link
          href="/careers"
          className="mt-6 inline-flex h-12 items-center rounded-full border border-indigo-200 px-6 font-display text-[15px] font-semibold text-indigo-800 hover:border-indigo-800"
        >
          Back to all openings
        </Link>
      </div>
    );
  }

  return (
    <form
      className="space-y-12"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);

        const cv = data.get("cv") as File | null;
        const coverFile = data.get("coverLetterFile") as File | null;
        const coverText = String(data.get("coverLetter") || "").trim();
        const fileProblem =
          pdfError(cv && cv.size > 0 ? cv : null, "CV") ||
          pdfError(coverFile && coverFile.size > 0 ? coverFile : null, "Cover letter");
        if (!cv || cv.size === 0) {
          setStatus("error");
          setError("Please upload your CV (PDF).");
          return;
        }
        if (fileProblem) {
          setStatus("error");
          setError(fileProblem);
          return;
        }
        if (outsideBand && !coverText && !(coverFile && coverFile.size > 0)) {
          setStatus("error");
          setError(
            "Your expected CTC is outside the 5–30% range. Please explain why in the cover letter.",
          );
          return;
        }
        if (!coverFile || coverFile.size === 0) data.delete("coverLetterFile");

        data.set("openingId", openingId);
        data.set("references", JSON.stringify(references));
        data.set(
          "elapsedMs",
          String(startedAt.current ? Date.now() - startedAt.current : 0),
        );

        setStatus("sending");
        setError(null);
        void fetch("/api/careers/apply", { method: "POST", body: data })
          .then(async (res) => {
            const body = (await res.json().catch(() => ({}))) as { error?: string };
            if (!res.ok) {
              setStatus("error");
              setError(body.error || "Something went wrong. Please try again.");
              return;
            }
            setStatus("ok");
            window.scrollTo({ top: 0, behavior: "smooth" });
          })
          .catch(() => {
            setStatus("error");
            setError("Unable to submit right now. Please try again.");
          });
      }}
    >
      {/* Honeypot: off-screen and skipped by keyboard / screen readers, so only bots fill it. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="space-y-5">
        <legend className="mb-5">
          <SectionTitle n={1}>Your details</SectionTitle>
        </legend>
        <Field label="Full name">
          <input type="text" name="name" required autoComplete="name" maxLength={120} className={inputClass} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone number">
            <input type="tel" name="phone" required autoComplete="tel" maxLength={30} className={inputClass} />
          </Field>
          <Field label="Email address">
            <input type="email" name="email" required autoComplete="email" maxLength={200} className={inputClass} />
          </Field>
        </div>
        <Field label="LinkedIn profile" optional>
          <input
            type="url"
            name="linkedin"
            placeholder="https://www.linkedin.com/in/…"
            maxLength={300}
            className={inputClass}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-5">
          <SectionTitle n={2}>Compensation and notice period</SectionTitle>
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Current CTC (₹ per year)" hint="Enter 0 if you are a fresher.">
            <input
              type="number"
              name="currentCtc"
              required
              min={0}
              step="any"
              inputMode="decimal"
              value={currentCtc}
              onChange={(e) => setCurrentCtc(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field
            label="Expected CTC (₹ per year)"
            hint="Ideally 5–30% more than your current CTC. If it is outside this range, explain why in your cover letter."
          >
            <input
              type="number"
              name="expectedCtc"
              required
              min={0}
              step="any"
              inputMode="decimal"
              value={expectedCtc}
              onChange={(e) => setExpectedCtc(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
        {outsideBand ? (
          <p role="status" className="rounded-md border border-amber/40 bg-amber/10 px-4 py-3 text-sm text-amber-700">
            Your expected CTC is outside the 5–30% range. Please give the reason in the
            cover letter below.
          </p>
        ) : null}
        <Field label="Notice period">
          <select name="noticePeriod" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select notice period
            </option>
            {NOTICE_PERIODS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-5">
          <SectionTitle n={3}>CV and cover letter</SectionTitle>
        </legend>
        <Field label="Upload CV" hint="PDF only, up to 2 MB.">
          <input
            type="file"
            name="cv"
            required
            accept="application/pdf,.pdf"
            className={cn(inputClass, "file:mr-4 file:rounded-full file:border-0 file:bg-indigo-100 file:px-4 file:py-2 file:font-display file:text-sm file:font-semibold file:text-indigo-800")}
          />
        </Field>
        <Field
          label="Cover letter / note"
          optional={!outsideBand}
          hint="Write a short note here, or upload a PDF below."
        >
          <textarea
            name="coverLetter"
            rows={6}
            maxLength={5000}
            className={cn(inputClass, "resize-y")}
          />
        </Field>
        <Field label="Cover letter PDF" optional hint="PDF only, up to 2 MB.">
          <input
            type="file"
            name="coverLetterFile"
            accept="application/pdf,.pdf"
            className={cn(inputClass, "file:mr-4 file:rounded-full file:border-0 file:bg-indigo-100 file:px-4 file:py-2 file:font-display file:text-sm file:font-semibold file:text-indigo-800")}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="mb-1">
          <SectionTitle n={4}>References</SectionTitle>
        </legend>
        <p className="text-sm text-slate">
          Add at least {MIN_REFERENCES} people we can contact about your work.
        </p>
        {references.map((ref, i) => (
          <div key={i} className="rounded-lg border border-indigo-200/80 p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="font-display text-[15px] font-semibold text-indigo-800">
                Reference {i + 1}
              </p>
              {i >= MIN_REFERENCES ? (
                <button
                  type="button"
                  onClick={() => setReferences((refs) => refs.filter((_, j) => j !== i))}
                  className="min-h-11 px-2 text-sm text-slate hover:text-coral"
                >
                  Remove
                </button>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <input type="text" required maxLength={200} value={ref.name} onChange={(e) => updateReference(i, "name", e.target.value)} className={inputClass} />
              </Field>
              <Field label="Company">
                <input type="text" required maxLength={200} value={ref.company} onChange={(e) => updateReference(i, "company", e.target.value)} className={inputClass} />
              </Field>
              <Field label="Designation">
                <input type="text" required maxLength={200} value={ref.designation} onChange={(e) => updateReference(i, "designation", e.target.value)} className={inputClass} />
              </Field>
              <Field label="Phone number">
                <input type="tel" required maxLength={30} value={ref.phone} onChange={(e) => updateReference(i, "phone", e.target.value)} className={inputClass} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Email address">
                  <input type="email" required maxLength={200} value={ref.email} onChange={(e) => updateReference(i, "email", e.target.value)} className={inputClass} />
                </Field>
              </div>
            </div>
          </div>
        ))}
        {references.length < 5 ? (
          <button
            type="button"
            onClick={() => setReferences((refs) => [...refs, emptyReference()])}
            className="inline-flex h-11 items-center rounded-full border border-indigo-200 px-5 font-display text-sm font-semibold text-indigo-800 hover:border-indigo-800"
          >
            + Add another reference
          </button>
        ) : null}
      </fieldset>

      <div className="space-y-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-green-500 px-6 font-display text-[15px] font-semibold text-indigo-800 transition-[background-color,opacity] hover:bg-charge disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Submitting…" : "Submit application"}
        </button>
        {status === "error" && error ? (
          <p role="alert" className="text-sm text-coral">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
