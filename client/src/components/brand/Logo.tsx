import Image from "next/image";
import { cn } from "@/lib/utils";

const ART = {
  /** White / very light backgrounds — the default. */
  primary: "/brand/logo-primary.png",
  /** Indigo, Midnight and dark photography. */
  reversed: "/brand/logo-reversed.png",
  /** Green backgrounds and busy photography. */
  white: "/brand/logo-white.png",
} as const;

/** Native artwork is 6492×2574 (2.522:1). */
const RATIO = 6492 / 2574;

export function Logo({
  variant = "primary",
  height = 34,
  className,
  priority,
}: {
  variant?: keyof typeof ART;
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={ART[variant]}
      alt="BikeWo — Electrifying India"
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      className={cn("w-auto select-none", className)}
      style={{ height }}
    />
  );
}
