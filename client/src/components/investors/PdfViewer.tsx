"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, DownloadIcon } from "@/components/brand/Icons";
import { ButtonEl } from "@/components/ui/Button";
import type { InvestorDoc } from "@/lib/investors";

export function PdfViewer({
  doc,
  onClose,
}: {
  doc: InvestorDoc;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-80 flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        aria-label="Close document"
        className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-viewer-title"
        className="relative flex h-[min(92dvh,920px)] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-deep"
      >
        <div className="flex items-center gap-3 border-b border-indigo-100 px-4 py-3 sm:px-5">
          <h2
            id="pdf-viewer-title"
            className="min-w-0 flex-1 truncate font-display text-base font-semibold text-indigo-800 sm:text-lg"
          >
            {doc.title}
          </h2>
          <a
            href={doc.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center rounded-full px-4 font-display text-[13px] font-semibold text-indigo-800 transition-colors hover:bg-indigo-100 sm:inline-flex"
          >
            Open in new tab
          </a>
          <a
            href={doc.href}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-10 items-center justify-center rounded-full text-indigo-800 transition-colors hover:bg-indigo-100"
            aria-label="Download PDF"
          >
            <DownloadIcon size={18} />
          </a>
          <ButtonEl
            variant="ghost"
            className="size-10 min-w-0 px-0"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon size={18} />
          </ButtonEl>
        </div>

        <iframe
          src={doc.href}
          title={doc.title}
          className="h-full w-full flex-1 bg-cloud"
        />
      </div>
    </div>,
    document.body,
  );
}
