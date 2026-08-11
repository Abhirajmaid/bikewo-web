"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

function format(n: number, decimals: number) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Animated counter for the "at a glance" band.
 *
 * Counts on first entry only. Respects reduced motion by rendering the final
 * value immediately — the number is the point, the animation is decoration.
 */
export function Counter({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Inset the bottom edge only. A bare "-15%" also pulls the left and right
  // boundaries in by 15% of the viewport width, which leaves narrow elements
  // in the first grid column outside the observer box entirely — they then
  // never count up.
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  const decimals = Number.isInteger(value) ? 0 : 1;
  const [display, setDisplay] = useState(() => (reduced ? value : 0));

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Ease-out expo so the number decelerates into its final value.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(display, decimals)}
      {/* green-700, not green-500: BikeWo Green on white is 2.57:1 and fails
          WCAG AA. Green text on a light surface is always green-700. */}
      {suffix && <span className="text-green-700">{suffix}</span>}
    </span>
  );
}
