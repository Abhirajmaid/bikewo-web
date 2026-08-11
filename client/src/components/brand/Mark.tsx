import type { SVGProps } from "react";

/**
 * The BikeWo brandmark — handlebar, head ring and rider body.
 * Geometry is taken verbatim from `kit/logos/bikewo-mark.svg` and inherits
 * `currentColor`, so it can sit on any approved background.
 *
 * Minimum size: 8mm / 24px. Clear space: X = the head ring diameter, all sides.
 */
export function Mark({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 2085 1953"
      fill="currentColor"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      <rect x="0" y="169" width="586" height="124" rx="62" />
      <rect x="1499" y="169" width="586" height="124" rx="62" />
      <circle
        cx="1030.5"
        cy="330.5"
        r="258"
        fill="none"
        stroke="currentColor"
        strokeWidth="145"
      />
      <rect x="850" y="852" width="361" height="1101" rx="180.5" />
    </svg>
  );
}
