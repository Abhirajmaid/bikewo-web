import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ChatIcon, MailIcon, PhoneIcon } from "@/components/brand/Icons";
import { CONTACT_MISSION, CONTACT_PAGE_WIDTH, CONTACT_QUICK } from "@/lib/contact";

const ICONS = { phone: PhoneIcon, chat: ChatIcon, mail: MailIcon };

export function ContactMission() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container className={CONTACT_PAGE_WIDTH}>
        <Reveal>
          <p className="text-center font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#6b7280]">
            {CONTACT_MISSION.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mx-auto mt-8 max-w-4xl text-center font-display text-[clamp(1.375rem,1rem+1.5vw,2.25rem)] font-medium leading-[1.35] tracking-[-0.02em] text-[#052016]">
            {CONTACT_MISSION.textBefore}
            <span className="bg-[#89FF00] px-1.5 py-0.5 text-[#052016]">
              {CONTACT_MISSION.highlight}
            </span>
            {CONTACT_MISSION.textAfter}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-14 flex max-w-xl flex-wrap items-center justify-center gap-10 md:gap-16">
            {CONTACT_QUICK.map(({ label, href, icon }) => {
              const Icon = ICONS[icon];
              return (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex flex-col items-center gap-3 text-[#052016] transition-colors hover:text-[#14603f]"
                  >
                    <span className="flex h-20 w-20 items-center justify-center rounded-full border border-[#052016]/15 transition-colors group-hover:border-[#89FF00] group-hover:bg-[#89FF00]/10">
                      <Icon size={56} />
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
