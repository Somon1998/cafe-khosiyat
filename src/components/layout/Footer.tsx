"use client";

import { DEMO } from "@/constants/demo";
import { IMAGES } from "@/constants/images";
import { FOOTER_LINKS, SITE } from "@/constants/site";
import { useLanguage } from "@/hooks/useLanguage";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = useMemo(
    () =>
      FOOTER_LINKS.map((link) => ({
        href: link.href,
        label: t.nav[link.labelKey],
      })),
    [t],
  );

  return (
    <footer className="border-t border-gold/15 bg-[#0c0a08]">
      <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src={IMAGES.logo}
                alt={SITE.name}
                width={48}
                height={48}
                className="h-11 w-11 shrink-0 object-contain"
              />
              <span className="font-display text-lg font-semibold tracking-wide text-gold">
                {SITE.name}
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-foreground sm:mt-4">
              {t.footer.description}
            </p>
            {DEMO.enabled ? (
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-gold-strong/90">
                {t.footer.demoNotice}
              </p>
            ) : null}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-ivory sm:mb-4">
              {t.footer.navigation}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 items-center text-sm text-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-ivory sm:mb-4">
              {t.footer.contacts}
            </h3>
            <ul className="space-y-3 text-sm text-foreground">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="inline-flex min-h-10 items-center break-all"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="break-words">{SITE.address}</li>
              <li>{t.site.workingHours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gold/10 pt-6 text-center text-sm text-muted sm:mt-12 sm:pt-8">
          {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
