/** Shared rules for the careers application form (used by the form and the API). */

/** Per-file limit. Two PDFs plus fields must stay under the ~4.5 MB serverless request cap. */
export const APPLICATION_PDF_MAX_BYTES = 2 * 1024 * 1024;

export const MIN_REFERENCES = 2;

export const NOTICE_PERIODS = [
  "Immediate",
  "15 days",
  "30 days",
  "45 days",
  "60 days",
  "90 days",
  "More than 90 days",
] as const;

/** Ideal hike band for expected CTC over current CTC. */
export const CTC_HIKE_MIN = 0.05;
export const CTC_HIKE_MAX = 0.3;

/**
 * True when expected CTC is outside the 5–30% band over current CTC.
 * Freshers (current CTC 0) have no band.
 */
export function ctcOutsideBand(current: number, expected: number) {
  if (!(current > 0) || !Number.isFinite(expected)) return false;
  const hike = (expected - current) / current;
  return hike < CTC_HIKE_MIN || hike > CTC_HIKE_MAX;
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isPhone(value: string) {
  return /^\+?[0-9\s-]{7,20}$/.test(value);
}
