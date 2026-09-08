/**
 * BikeWo icons — DP Energy brand set from /public/icons.
 *
 * Thematic icons load the shared SVG assets (green→yellow accent).
 * UI chrome (arrows, menu, close, chevron, play, pin, clock) stays as
 * simple currentColor strokes — those shapes aren't in the brand pack.
 *
 * `tone`: "onLight" (default) = dark-stroke assets for light backgrounds.
 *         "onDark" = white-stroke assets for dark backgrounds.
 */

import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type Tone = "onLight" | "onDark";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  tone?: Tone;
};

type AssetProps = {
  size?: number;
  tone?: Tone;
  className?: string;
  alt?: string;
};

const DARK = "/icons/dp-energy-dark-icons";
const LIGHT = "/icons/dp-energy-light-icons";

function AssetIcon({
  onLight,
  onDark,
  size = 48,
  tone = "onLight",
  className,
  alt = "",
}: AssetProps & { onLight: string; onDark?: string }) {
  const src = tone === "onDark" && onDark ? onDark : onLight;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- brand SVG assets; avoid Image ID/cache issues
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      aria-hidden={alt ? undefined : true}
      className={cn("shrink-0 object-contain", className)}
      draggable={false}
    />
  );
}

/* ── Thematic brand assets ─────────────────────────────────────────── */

/** Lightning / green energy */
export const BoltIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-05.svg`}
    onDark={`${LIGHT}-09.svg`}
    {...p}
  />
);

/** EV / mobility */
export const VehicleIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-21.svg`}
    onDark={`${LIGHT}-11.svg`}
    {...p}
  />
);

/** Battery / storage */
export const BatteryIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-05.svg`}
    onDark={`${LIGHT}-06.svg`}
    {...p}
  />
);

/** Nature / sustainability */
export const LeafIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-14.svg`}
    onDark={`${LIGHT}-14.svg`}
    {...p}
  />
);

/** Saplings / growth / community */
export const GrowthIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-02.svg`}
    onDark={`${LIGHT}-07.svg`}
    {...p}
  />
);

/** Building / HQ */
export const BuildingIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-23.svg`}
    onDark={`${LIGHT}-23.svg`}
    {...p}
  />
);

/** City / urban presence */
export const CityIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-23.svg`}
    onDark={`${LIGHT}-24.svg`}
    {...p}
  />
);

/** Solar */
export const SunIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-21.svg`}
    onDark={`${LIGHT}-06.svg`}
    {...p}
  />
);

/** Wind / renewable */
export const WindIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-14.svg`}
    onDark={`${LIGHT}-08.svg`}
    {...p}
  />
);

/** Recycle / lifecycle */
export const RecycleIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-10.svg`}
    onDark={`${LIGHT}-06.svg`}
    {...p}
  />
);

/** Wallet / payments */
export const WalletIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-16.svg`}
    onDark={`${LIGHT}-20.svg`}
    {...p}
  />
);

/** Investment / earnings growth */
export const InvestIcon = (p: AssetProps) => (
  <AssetIcon onLight={`${DARK}-17.svg`} {...p} />
);

/** Certificate / training */
export const AcademyIcon = (p: AssetProps) => (
  <AssetIcon onLight={`${DARK}-22.svg`} {...p} />
);

/** Institution / trust */
export const ShieldIcon = (p: AssetProps) => (
  <AssetIcon onLight={`${DARK}-25.svg`} {...p} />
);

/** People / community — growth saplings */
export const PeopleIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-02.svg`}
    onDark={`${LIGHT}-15.svg`}
    {...p}
  />
);

/** Support headset */
export const HeadsetIcon = (p: AssetProps) => (
  <AssetIcon onLight={`${DARK}-29.svg`} {...p} />
);

/** Phone */
export const PhoneIcon = (p: AssetProps) => (
  <AssetIcon onLight={`${DARK}-28.svg`} {...p} />
);

/** Email */
export const MailIcon = (p: AssetProps) => (
  <AssetIcon onLight={`${DARK}-26.svg`} {...p} />
);

/** Chat */
export const ChatIcon = (p: AssetProps) => (
  <AssetIcon onLight={`${DARK}-30.svg`} {...p} />
);

/** Chip / tech / VZN */
export const PulseIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-05.svg`}
    onDark={`${LIGHT}-18.svg`}
    {...p}
  />
);

/** Monitor / tech gear */
export const MonitorIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-22.svg`}
    onDark={`${LIGHT}-18.svg`}
    {...p}
  />
);

/** Sourcing / commerce */
export const BoxIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-16.svg`}
    onDark={`${LIGHT}-20.svg`}
    {...p}
  />
);

/** Truck — closest: utility / distribution network */
export const TruckIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-21.svg`}
    onDark={`${LIGHT}-11.svg`}
    {...p}
  />
);

/** Weekly timing — coin growth stands in (no clock in pack) */
export const ClockIcon = (p: AssetProps) => (
  <AssetIcon onLight={`${DARK}-17.svg`} {...p} />
);

/** Location — building stands in (no pin in pack) */
export const PinIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-23.svg`}
    onDark={`${LIGHT}-24.svg`}
    {...p}
  />
);

/** Grid / infrastructure */
export const GridIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-05.svg`}
    onDark={`${LIGHT}-11.svg`}
    {...p}
  />
);

/** Green energy (bolt ringed by leaves) */
export const GreenEnergyIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-10.svg`}
    onDark={`${LIGHT}-09.svg`}
    {...p}
  />
);

/** Lamp / ideas — solar / energy */
export const LampIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-21.svg`}
    onDark={`${LIGHT}-09.svg`}
    {...p}
  />
);

/** Gear / technology */
export const GearIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-22.svg`}
    onDark={`${LIGHT}-18.svg`}
    {...p}
  />
);

/** Plus / install — solar panel */
export const PlusIcon = (p: AssetProps) => (
  <AssetIcon
    onLight={`${DARK}-21.svg`}
    onDark={`${LIGHT}-06.svg`}
    {...p}
  />
);

/* ── UI chrome (not in brand pack) ─────────────────────────────────── */

function StrokeIcon({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRightIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </StrokeIcon>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </StrokeIcon>
);

export const PlayIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m10 8.5 6 3.5-6 3.5v-7Z" />
  </StrokeIcon>
);

export const ChevronDownIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="m6 9 6 6 6-6" />
  </StrokeIcon>
);

export const MenuIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </StrokeIcon>
);

export const CloseIcon = (p: IconProps) => (
  <StrokeIcon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </StrokeIcon>
);

/** Icon lookup for the ecosystem / division sets. */
export const DIVISION_ICONS = {
  distribution: VehicleIcon,
  leasing: WalletIcon,
  energy: BoltIcon,
  lifecycle: RecycleIcon,
  sourcing: BoxIcon,
  vzn: PulseIcon,
} as const;
