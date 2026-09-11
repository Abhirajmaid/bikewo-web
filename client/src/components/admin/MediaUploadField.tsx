"use client";

import { useRef, useState } from "react";

/** Upload-first media field; optional paste-link is secondary. */
export function MediaUploadField({
  label,
  folder,
  accept,
  value,
  onChange,
  hint,
  allowUrl = false,
}: {
  label: string;
  folder: string;
  accept: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  /** Show a collapsed “paste link” fallback under the upload control. */
  allowUrl?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLink, setShowLink] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  async function uploadFile(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError(null);
    const body = new FormData();
    body.set("file", file);
    body.set("folder", folder);
    const res = await fetch("/api/cms/upload", { method: "POST", body });
    const data = (await res.json().catch(() => ({}))) as {
      url?: string;
      error?: string;
    };
    setUploading(false);
    if (!res.ok || !data.url) {
      setError(data.error || "Upload failed.");
      return;
    }
    onChange(data.url);
    setShowLink(false);
  }

  const lower = value.toLowerCase();
  const looksLikePdf = lower.includes(".pdf") || accept.includes("pdf");
  const showImagePreview =
    Boolean(value) &&
    !looksLikePdf &&
    (/\.(jpe?g|png|webp|gif)(\?|$)/i.test(lower) ||
      value.startsWith("/api/media/") ||
      value.startsWith("blob:"));

  return (
    <div className="block space-y-2">
      <span className="block text-sm font-medium text-ink">{label}</span>

      {value ? (
        <div className="overflow-hidden rounded-xl border border-mist bg-cloud">
          {showImagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-40 w-full object-cover" />
          ) : (
            <div className="flex items-center gap-3 px-4 py-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-xs font-semibold text-indigo-800">
                PDF
              </span>
              <p className="min-w-0 flex-1 truncate text-xs text-slate">{value}</p>
            </div>
          )}
          <div className="flex gap-2 border-t border-mist/80 px-3 py-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="text-xs font-medium text-green-700 hover:underline disabled:opacity-50"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs font-medium text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            void uploadFile(e.dataTransfer.files?.[0] ?? null);
          }}
          className={`flex w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
            dragOver
              ? "border-indigo-500 bg-indigo-50"
              : "border-mist bg-cloud/60 hover:border-indigo-300 hover:bg-indigo-50/40"
          } disabled:opacity-60`}
        >
          <span className="font-display text-sm font-semibold text-indigo-800">
            {uploading ? "Uploading…" : "Click to upload"}
          </span>
          <span className="text-xs text-slate">
            or drag and drop · {accept.includes("pdf") ? "PDF" : "JPEG, PNG, WebP"}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        disabled={uploading}
        onChange={(e) => {
          void uploadFile(e.target.files?.[0] ?? null);
          e.target.value = "";
        }}
      />

      {hint ? <p className="text-xs text-slate-400">{hint}</p> : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}

      {allowUrl ? (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowLink((v) => !v)}
            className="text-xs font-medium text-indigo-700 hover:underline"
          >
            {showLink ? "Hide link option" : "Or paste an external link"}
          </button>
          {showLink ? (
            <input
              type="url"
              value={value.startsWith("/api/media/") ? "" : value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://…"
              className="mt-2 w-full rounded-xl border border-mist bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
