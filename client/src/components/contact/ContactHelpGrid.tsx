import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BoltIcon,
  HeadsetIcon,
  MonitorIcon,
  PlayIcon,
  RecycleIcon,
  VehicleIcon,
  WalletIcon,
} from "@/components/brand/Icons";
import { CONTACT_HELP, CONTACT_PAGE_WIDTH } from "@/lib/contact";
import { cn } from "@/lib/utils";

const TILE_ICONS = {
  bolt: BoltIcon,
  monitor: MonitorIcon,
  wallet: WalletIcon,
  recycle: RecycleIcon,
  vehicle: VehicleIcon,
  headset: HeadsetIcon,
};

const ICON_SIZE = 56;

export function ContactHelpGrid() {
  return (
    <section className="bg-white pb-16 md:pb-24">
      <Container className={CONTACT_PAGE_WIDTH}>
        <Reveal>
          <div className="overflow-hidden rounded-[20px] bg-[#052016] p-2.5 md:p-3">
            <div
              className={cn(
                "contact-help-bento grid grid-cols-2 gap-2.5 auto-rows-[minmax(140px,auto)] sm:gap-3",
                "lg:grid-cols-5 lg:grid-rows-[1.15fr_1.15fr_0.7fr] lg:min-h-[440px] lg:gap-3 xl:min-h-[500px]",
              )}
            >
              {CONTACT_HELP.map((tile) => {
                const TileIcon =
                  "icon" in tile && tile.icon ? TILE_ICONS[tile.icon] : null;

                return (
                  <Link
                    key={tile.id}
                    href={tile.href}
                    data-area={tile.area}
                    className={cn(
                      "group relative flex min-h-[140px] flex-col overflow-hidden rounded-xl transition-transform duration-200 hover:scale-[1.01]",
                      (tile.variant === "featured" || tile.variant === "support") &&
                        "col-span-2 min-h-[200px] lg:col-span-1 lg:min-h-0",
                      tile.variant === "darkTile" &&
                        "justify-between border border-white/10 bg-[#0a2e1f] p-4 text-white md:p-5",
                      tile.variant === "play" &&
                        "flex-row items-center justify-between gap-3 border border-white/10 bg-[#0a2e1f] p-4 text-white md:p-5",
                      (tile.variant === "image" ||
                        tile.variant === "featured" ||
                        tile.variant === "support") &&
                        "text-white",
                    )}
                  >
                    {tile.variant === "featured" && "image" in tile && (
                      <>
                        <Image
                          src={tile.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 22vw, 100vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[#052016]/55" />
                        <div className="relative z-10 flex h-full flex-col p-4 md:p-5">
                          <p className="max-w-[14ch] font-display text-lg font-semibold leading-snug md:text-xl">
                            {tile.title}{" "}
                            <span aria-hidden>&gt;</span>
                          </p>
                          <ArrowRightIcon
                            size={18}
                            className="mt-3 transition-transform group-hover:translate-x-1"
                          />
                        </div>
                      </>
                    )}

                    {tile.variant === "darkTile" && TileIcon && (
                      <>
                        <TileIcon size={ICON_SIZE} tone="onDark" />
                        <p className="font-display text-base font-semibold md:text-[17px]">
                          {tile.title}
                        </p>
                      </>
                    )}

                    {tile.variant === "image" && "image" in tile && (
                      <>
                        <Image
                          src={tile.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 18vw, 50vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#052016]/85 via-[#052016]/25 to-transparent" />
                        <div className="relative z-10 flex h-full flex-col justify-between p-4 md:p-5">
                          {TileIcon && <TileIcon size={ICON_SIZE} tone="onDark" />}
                          <p className="mt-auto font-display text-base font-semibold md:text-[17px]">
                            {tile.title}
                          </p>
                        </div>
                      </>
                    )}

                    {tile.variant === "play" && (
                      <>
                        <div className="flex min-w-0 flex-col gap-3">
                          {TileIcon && <TileIcon size={ICON_SIZE} tone="onDark" />}
                          <p className="font-display text-base font-semibold md:text-[17px]">
                            {tile.title}
                          </p>
                        </div>
                        <span className="flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-[11px] leading-tight text-white/80 transition-colors group-hover:border-[#89FF00]/50 group-hover:text-[#89FF00]">
                          <PlayIcon size={18} className="shrink-0" />
                          <span className="hidden max-w-28 sm:inline">{tile.playLabel}</span>
                        </span>
                      </>
                    )}

                    {tile.variant === "support" && "image" in tile && (
                      <>
                        <Image
                          src={tile.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 22vw, 100vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[#052016]/50" />
                        <div className="relative z-10 flex h-full flex-col justify-between p-4 md:p-5">
                          <div className="flex flex-col gap-3">
                            {TileIcon && <TileIcon size={ICON_SIZE} tone="onDark" />}
                            <p className="font-display text-lg font-semibold md:text-xl">
                              {tile.title}
                            </p>
                          </div>
                          <p className="inline-flex items-center gap-1.5 self-end font-display text-sm font-medium md:text-base">
                            {tile.cta}
                            <ArrowUpRightIcon
                              size={16}
                              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </p>
                        </div>
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
