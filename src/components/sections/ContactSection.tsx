"use client";

import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DEMO } from "@/constants/demo";
import { SITE } from "@/constants/site";
import { useLanguage } from "@/hooks/useLanguage";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="scroll-mt-24 py-9 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="grid gap-5 sm:gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-4 rounded-2xl border border-gold/15 bg-surface p-5 shadow-lg shadow-black/20 sm:space-y-6 sm:p-8">
              <ContactItem
                icon={MapPin}
                title={t.contact.address}
                value={SITE.address}
              />
              <ContactItem
                icon={Phone}
                title={t.contact.phone}
                value={SITE.phone}
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              />
              <ContactItem
                icon={Clock}
                title={t.contact.workingHours}
                value={t.site.workingHours}
              />
              {DEMO.enabled ? (
                <p className="rounded-xl border border-gold/20 bg-black/30 px-3 py-2.5 text-sm leading-relaxed text-foreground sm:px-4 sm:py-3">
                  {t.contact.demoNote}
                </p>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {/*
              Google Maps search + output=embed часто отдаёт пустой iframe
              (X-Frame / отсутствие place embed). Без подтверждённых координат
              показываем стильную карточку со ссылкой на поиск по адресу.
            */}
            <div className="flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-gold/15 bg-gradient-to-br from-[#1a100e] via-[#120d0a] to-[#0c0a08] p-5 shadow-lg shadow-black/30 sm:min-h-[280px] sm:p-8 lg:min-h-[360px]">
              <div>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold sm:mb-5 sm:h-12 sm:w-12">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-semibold text-ivory sm:text-2xl">
                  {t.contact.mapTitle}
                </h3>
                <p className="mt-2.5 max-w-md text-sm leading-relaxed text-foreground sm:mt-3">
                  {t.contact.mapFallbackHint}
                </p>
                <p className="mt-3 text-sm font-medium text-gold sm:mt-4">
                  {SITE.address}
                </p>
              </div>
              <div className="mt-6 sm:mt-8">
                <a
                  href={SITE.mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 min-h-12 w-auto max-w-full whitespace-nowrap rounded-full border-gold/50 px-5 text-gold hover:border-gold hover:bg-gold/10 min-[360px]:px-6"
                  >
                    {t.contact.openInMaps}
                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                  </Button>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex gap-3 sm:gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted">{title}</p>
        <p className="break-words font-semibold leading-snug text-ivory">
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block min-h-11 rounded-xl transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
      >
        {content}
      </a>
    );
  }

  return content;
}
