import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/brand/Icons";

/**
 * Buttons — Brand Guidelines 07.1.
 *
 * Height 48px · padding 24px · radius full · label Poppins 600 15px.
 * The primary label is INDIGO ON GREEN — never white on green.
 */

type Variant = "primary" | "secondary" | "ghost" | "onDark";

const VARIANTS: Record<Variant, string> = {
  // Indigo label on green. This pairing is 5.71:1 and is the only approved
  // treatment for a green button.
  primary:
    "bg-green-500 text-indigo-800 hover:bg-charge active:bg-green-600 shadow-[0_2px_8px_rgb(42_183_124/0.28)]",
  secondary: "bg-indigo-800 text-white hover:bg-indigo-700 active:bg-indigo-900",
  ghost:
    "border border-indigo-200 text-indigo-800 hover:border-indigo-800 hover:bg-indigo-100/60",
  // On dark photography or Midnight panels.
  onDark:
    "border border-white/25 text-white hover:bg-white/10 hover:border-white/45 backdrop-blur-sm",
};

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  withArrow?: boolean;
};

/**
 * Note the explicit transition list. Tailwind's `transition-colors` includes
 * `outline-color`, which pins the focus ring to the element's currentColor and
 * stops the green `:focus-visible` outline from ever applying.
 */
const BASE =
  "group inline-flex h-12 min-w-11 items-center justify-center gap-2 rounded-full px-6 font-display text-[15px] font-semibold leading-none transition-[background-color,border-color,color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]";

export function Button({
  variant = "primary",
  children,
  className,
  withArrow = false,
  href,
  ...props
}: ButtonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={cn(BASE, VARIANTS[variant], className)} {...props}>
      {children}
      {withArrow && (
        <ArrowRightIcon
          size={18}
          className="transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}

export function ButtonEl({
  variant = "primary",
  children,
  className,
  withArrow = false,
  ...props
}: ButtonProps & ComponentProps<"button">) {
  return (
    <button className={cn(BASE, VARIANTS[variant], className)} {...props}>
      {children}
      {withArrow && (
        <ArrowRightIcon
          size={18}
          className="transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-1"
        />
      )}
    </button>
  );
}
