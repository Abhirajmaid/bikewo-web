import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/brand/Icons";
import {
  CONTACT_OFFICE_HEADING,
  CONTACT_PAGE_WIDTH,
} from "@/lib/contact";
import { getSiteSettings } from "@/lib/cms/db";
import { settingsMap } from "@/lib/cms/settings";

export function ContactOffices() {
  const site = getSiteSettings();
  const map = settingsMap(site);

  const details = [
    {
      icon: PinIcon,
      label: "Address",
      value: site.officeAddress,
    },
    {
      icon: PhoneIcon,
      label: "Call us",
      value: site.phone,
      href: `tel:${site.phoneTel}`,
    },
    {
      icon: MailIcon,
      label: "Write to us",
      value: site.brandEmail,
      href: `mailto:${site.brandEmail}`,
    },
    {
      icon: ClockIcon,
      label: "Appointments",
      value: site.officeHours,
    },
  ] as const;

  return (
    <section className="border-t border-indigo-100 bg-white py-16 md:py-24">
      <Container className={CONTACT_PAGE_WIDTH}>
        <SectionHeading
          eyebrow={CONTACT_OFFICE_HEADING.eyebrow}
          title={CONTACT_OFFICE_HEADING.title}
          lede={CONTACT_OFFICE_HEADING.lede}
          align="center"
          className="justify-center"
        />

        <Reveal delay={0.12} className="mt-12 md:mt-16">
          <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-card lg:relative">
            <div className="relative h-72 sm:h-96 lg:h-128">
              <iframe
                title={map.title}
                src={map.embedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            </div>

            <div className="lg:absolute lg:left-8 lg:top-1/2 lg:z-10 lg:w-96 lg:-translate-y-1/2">
              <div className="flex flex-col gap-6 border-t border-indigo-100 bg-white p-6 lg:rounded-2xl lg:border lg:p-7 lg:shadow-lift">
                <div>
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-green-700">
                    {site.officeLabel}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-indigo-800">
                    {site.officeCity}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {details.map((item) => (
                    <li key={item.label} className="flex items-start gap-3.5">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
                        <item.icon size={22} />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p className="text-xs font-medium text-slate-400">{item.label}</p>
                        {"href" in item ? (
                          <a
                            href={item.href}
                            className="mt-0.5 block truncate text-[15px] font-medium text-indigo-800 transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-green-700"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-[15px] font-medium leading-snug text-indigo-800">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                <Button
                  href={map.directionsHref}
                  variant="primary"
                  withArrow
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full"
                >
                  Get directions
                </Button>

                <p className="text-xs leading-relaxed text-slate-400">
                  {site.officeNote}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
