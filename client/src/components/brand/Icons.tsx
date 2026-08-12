/**
 * BikeWo icon set — Brand Guidelines 05.1.
 *
 * 24×24 grid · 2px stroke · round caps and joins · no fills, no duotone,
 * no perspective. Stroke colour comes from `currentColor`: Indigo on light,
 * White on dark, Green only when the icon *is* the accent.
 *
 * Do not scale the stroke — keep it optically constant at 16/20/24/32/48px.
 */

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 24, children, ...props }: IconProps) {
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

/* Lifted verbatim from the brand book's approved icon grid. */

export const BoltIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M13 2 5 14h6l-1 8 8-12h-6l1-8Z" />
  </Icon>
);

export const VehicleIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="7" width="14" height="10" rx="2" />
    <path d="M17 10h2l2 3v4h-4" />
    <circle cx="7" cy="19" r="2" />
    <circle cx="17" cy="19" r="2" />
  </Icon>
);

export const BatteryIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2" y="8" width="14" height="8" rx="2" />
    <path d="M19 11v2M16 12h3" />
    <path d="M5 12h5" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </Icon>
);

export const LeafIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3c4 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2-6 6-10Z" />
  </Icon>
);

export const BuildingIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 20V9l8-6 8 6v11" />
    <path d="M9 20v-6h6v6" />
  </Icon>
);

export const SunIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
  </Icon>
);

export const TruckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 17V9a2 2 0 0 1 2-2h11l5 5v5a2 2 0 0 1-2 2" />
    <circle cx="8" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </Icon>
);

export const PinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
);

export const PeopleIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="8" cy="8" r="3" />
    <circle cx="17" cy="10" r="2.5" />
    <path d="M3 20c0-3 2.2-5 5-5s5 2 5 5M15 20c0-2.4 1.4-4 3.5-4S22 17.6 22 20" />
  </Icon>
);

export const PulseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 12h4l2-5 3 10 2.5-7 1.8 4H21" />
  </Icon>
);

export const MonitorIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="M8 21h8M12 18v3M7 9h4M7 13h8" />
  </Icon>
);

/* Extensions drawn on the same grid and stroke discipline. */

export const BoxIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
    <path d="m3 8 9 5 9-5M12 13v8" />
  </Icon>
);

export const ShieldIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3 5 6v6c0 4.4 3 7.9 7 9 4-1.1 7-4.6 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const WalletIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
    <path d="M19 11h2v4h-2a2 2 0 0 1 0-4Z" />
  </Icon>
);

export const AcademyIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4 2 9l10 5 10-5-10-5Z" />
    <path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" />
  </Icon>
);

export const HeadsetIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 14v-2a8 8 0 1 1 16 0v2" />
    <path d="M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2ZM20 14a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z" />
    <path d="M17 18v1a2 2 0 0 1-2 2h-3" />
  </Icon>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Icon>
);

export const PlayIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m10 8.5 6 3.5-6 3.5v-7Z" />
  </Icon>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

/** Icon lookup for the ecosystem / division sets. */
export const DIVISION_ICONS = {
  distribution: VehicleIcon,
  leasing: WalletIcon,
  energy: BoltIcon,
  lifecycle: BatteryIcon,
  sourcing: BoxIcon,
  vzn: PulseIcon,
} as const;
