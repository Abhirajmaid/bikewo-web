"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The house entrance animation — Brand Guidelines 07.1 design tokens:
 * "motion — entrance: 400ms · fade + 16px rise".
 *
 * Under `prefers-reduced-motion` the element is simply present: no rise,
 * no fade, no delay chain.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  as = "div",
  ...props
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span" | "p" | "h2";
} & HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      // `initial={false}` leaves the element at its resting state, so reduced
      // motion gets the layout without the rise or the fade.
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      // Bottom-edge inset only — a bare percentage would also inset left and
      // right, so narrow first-column items would never enter the box.
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
