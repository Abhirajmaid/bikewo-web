"use client";

import { useState } from "react";

/** Upload to Railway bucket and/or paste an external URL. */
export function MediaUploadField({
  label,
  folder,
  accept,
  value,
  onChange,
  hint,
  allowUrl = false,
  urlPlaceholder = "https://…",
}: {
  label: string;
  folder: string;
  accept: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  allowUrl?: boolean;
  urlPlaceholder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(file: File | null) {
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
  }

  const lower = value.toLowerCase();
  const isImage =
    Boolean(value) &&
    (lower.includes("/api/media/")
      ? !lower.includes(".pdf")
      : /\.(jpe?g|png|webp|gif)(\?|$)/i.test(lower) ||
        (!lower.includes(".pdf") && !lower.startsWith("http")));

  return (
    <div className="block">
      <span className="mb-1 block text-sm font-medium text-ink">{label}</span>
      {value ? (
        <div className="mb-2 overflow-hidden rounded-xl border border-mist bg-cloud">
          {isImage && !lower.includes(".pdf") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-36 w-full object-cover" />
          ) : (
            <p className="truncate px-3 py-2 text-xs text-slate">{value}</p>
          )}
        </div>
      ) : null}

      {allowUrl ? (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={urlPlaceholder}
          className="mb-2 w-full rounded-xl border border-mist bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
        />
      ) : null}

      <input
        type="file"
        accept={accept}
        disabled={uploading}
        onChange={(e) => void onFile(e.target.files?.[0] ?? null)}
        className="block w-full text-sm text-slate file:mr-3 file:rounded-lg file:border-0 file:bg-ink file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
      />
      {hint ? <span className="mt-1 block text-xs text-slate-400">{hint}</span> : null}
      {uploading ? <span className="mt-1 block text-xs text-slate">Uploading…</span> : null}
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="mt-1 text-xs font-medium text-red-600 hover:underline"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}
