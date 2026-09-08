import {
  BoxIcon,
  BuildingIcon,
  MailIcon,
  PeopleIcon,
  ShieldIcon,
  WalletIcon,
} from "@/components/brand/Icons";
import { Container } from "@/components/layout/Container";
import { Counter } from "@/components/ui/Counter";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { INVESTOR_PAGE, INVESTOR_STATS } from "@/lib/investors";
import { stagger } from "@/lib/utils";

const STAT_ICONS = {
  shield: ShieldIcon,
  box: BoxIcon,
  building: BuildingIcon,
  wallet: WalletIcon,
  people: PeopleIcon,
  mail: MailIcon,
} as const;

export function InvestorsHero() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: INVESTOR_PAGE.title },
        ]}
        title={INVESTOR_PAGE.title}
        lede={INVESTOR_PAGE.lede}
      />

      <section className="border-b border-indigo-100 bg-white py-12 md:py-16">
        <Container>
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {INVESTOR_STATS.map((stat, i) => {
              const Icon = STAT_ICONS[stat.icon];
              return (
                <Reveal as="li" key={stat.slug} delay={stagger(i, 0.04)}>
                  <div className="flex flex-col items-center text-center">
                    <span className="flex size-16 items-center justify-center rounded-full bg-green-50 text-indigo-800 md:size-18">
                      <Icon size={40} />
                    </span>
                    <p className="mt-4 font-display text-2xl font-bold tracking-tight text-indigo-800 md:text-3xl">
                      <Counter value={stat.count} />
                    </p>
                    <p className="mt-1 text-[13px] text-slate">{stat.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>
    </>
  );
}
