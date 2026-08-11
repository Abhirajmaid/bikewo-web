"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The Energy Arc — Brand Guidelines 05.1.
 *
 * A sweeping current line that enters from the lower-left and exits
 * upper-right. Always three strokes at 100 / 55 / 30% opacity.
 */
export function EnergyArc({
  className,
  color = "#2AB77C",
  animate = true,
}: {
  className?: string;
  color?: string;
  animate?: boolean;
}) {
  const reduced = useReducedMotion();
  const shouldDraw = animate && !reduced;

  const paths = [
    { d: "M-10 78 C40 78 55 22 120 18 C160 15 185 34 210 46", opacity: 1 },
    { d: "M-10 90 C45 90 62 32 128 28 C168 25 192 44 210 56", opacity: 0.55 },
    { d: "M-10 102 C50 102 70 42 136 38 C176 35 198 54 210 66", opacity: 0.3 },
  ];

  return (
    <svg
      viewBox="0 0 200 120"
      preserveAspectRatio="none"
      className={cn("pointer-events-none", className)}
      aria-hidden="true"
    >
      {paths.map((p, i) => (
        <motion.path
          key={p.d}
          d={p.d}
          fill="none"
          stroke={color}
          strokeWidth={1.4}
          vectorEffect="non-scaling-stroke"
          opacity={p.opacity}
          initial={shouldDraw ? { pathLength: 0 } : false}
          whileInView={shouldDraw ? { pathLength: 1 } : undefined}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </svg>
  );
}
