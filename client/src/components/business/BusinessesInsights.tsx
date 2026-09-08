"use client";

import { BUSINESSES_INSIGHTS } from "@/lib/businesses";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import {
  BatteryIcon,
  BoltIcon,
  LeafIcon,
} from "@/components/brand/Icons";
import { cn } from "@/lib/utils";

type InsightCardData = typeof BUSINESSES_INSIGHTS.card;
type StatData = (typeof BUSINESSES_INSIGHTS.stats)[number];

const STAT_ICONS = {
  bolt: BoltIcon,
  leaf: LeafIcon,
  battery: BatteryIcon,
} as const;

const CIRCLE_SIZE = {
  lg: "size-36 md:size-40",
  md: "size-32 md:size-36",
  sm: "size-24 md:size-28",
} as const;

const STAT_POSITION = {
  "top-left": "left-[4%] top-[6%] md:left-[6%] md:top-[8%]",
  "bottom-center":
    "bottom-[8%] left-1/2 -translate-x-1/2 md:bottom-[10%]",
  "top-right": "right-[4%] top-[14%] md:right-[6%] md:top-[16%]",
} as const;

function InsightCardHeader({ kicker }: { kicker: string }) {
  return (
    <div className="flex items-center gap-2.5 bg-green-500 px-5 py-3.5 md:px-6">
      <span
        aria-hidden
        className="size-1.5 shrink-0 rounded-full bg-indigo-800"
      />
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-indigo-800">
        {kicker}
      </span>
    </div>
  );
}

function InsightCardBody({
  lede,
  bullets,
  actions,
}: Pick<InsightCardData, "lede" | "bullets" | "actions">) {
  return (
    <div className="flex flex-1 flex-col p-7 md:p-8">
      <p className="text-[15px] leading-relaxed text-indigo-800">{lede}</p>

      <ul className="mt-6 space-y-2.5">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-2.5 text-[14px] leading-relaxed text-slate"
          >
            <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-green-500" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
        {actions.map((action) => (
          <Button
            key={action.href}
            href={action.href}
            variant={action.variant}
            withArrow={action.variant === "primary"}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function InsightCard({ card }: { card: InsightCardData }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-indigo-100 bg-white">
      <InsightCardHeader kicker={card.kicker} />
      <InsightCardBody
        lede={card.lede}
        bullets={card.bullets}
        actions={card.actions}
      />
    </article>
  );
}

function StatCircle({
  value,
  suffix,
  detail,
  icon,
  size,
  position,
  className,
}: StatData & { className?: string }) {
  const Icon = STAT_ICONS[icon];
  const stacked = !!className;
  const alignCenter = position === "bottom-center" || stacked;

  return (
    <div
      className={cn(
        "w-38 md:w-44",
        !className && "absolute",
        !className && STAT_POSITION[position],
        className,
      )}
    >
      <div className="relative mx-auto w-fit">
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full border-2 border-indigo-800 bg-white",
            CIRCLE_SIZE[size],
          )}
        >
          <span
            className={cn(
              "font-display font-bold text-indigo-800",
              size === "sm"
                ? "text-2xl md:text-[1.75rem]"
                : "text-[clamp(1.75rem,1.2rem+1.2vw,2.25rem)]",
            )}
          >
            <Counter value={value} suffix={suffix} />
          </span>
        </div>

        <span
          aria-hidden
          className={cn(
            "absolute flex items-center justify-center rounded-full bg-indigo-800 text-green-500",
            size === "sm" ? "-right-2 -top-2 size-12" : "-right-2.5 -top-2.5 size-14",
          )}
        >
          <Icon size={size === "sm" ? 28 : 32} tone="onDark" />
        </span>
      </div>

      <p
        className={cn(
          "mt-4 text-[12px] leading-relaxed text-slate md:text-[13px]",
          alignCenter ? "text-center" : "text-left",
        )}
      >
        {detail}
      </p>
    </div>
  );
}

function InsightStats({ stats }: { stats: readonly StatData[] }) {
  return (
    <div className="rounded-lg border border-indigo-100 bg-white p-6 sm:p-8 lg:relative lg:min-h-112 lg:h-full">
      <div className="flex flex-col items-center gap-10 sm:gap-12 lg:hidden">
        {stats.map((stat) => (
          <StatCircle
            key={stat.detail}
            {...stat}
            className="!relative w-full max-w-44"
          />
        ))}
      </div>
      <div className="hidden lg:block">
        {stats.map((stat) => (
          <StatCircle key={stat.detail} {...stat} />
        ))}
      </div>
    </div>
  );
}

/** Insights band — feature card left, staggered stat circles right. */
export function BusinessesInsights() {
  return (
    <Section>
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-[clamp(1.75rem,1.1rem+2.4vw,3rem)] font-semibold leading-[1.12] text-indigo-800">
            {BUSINESSES_INSIGHTS.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-10 lg:items-stretch">
          <Reveal>
            <InsightCard card={BUSINESSES_INSIGHTS.card} />
          </Reveal>

          <Reveal delay={0.08}>
            <InsightStats stats={BUSINESSES_INSIGHTS.stats} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
