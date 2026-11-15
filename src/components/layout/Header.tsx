"use client";

import { CartButton } from "@/components/cart/CartButton";
import { DemoWhatsAppCta } from "@/components/ui/DemoWhatsAppCta";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { DEMO } from "@/constants/demo";
import { IMAGES } from "@/constants/images";
import { NAV_LINKS, SITE } from "@/constants/site";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import {
  handleHomeHashNavClick,
  isNavLinkActive,
  sectionHashFromHref,
} from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHomePage = pathname === "/";
  const activeSection = useScrollSpy(isHomePage);

  const navLinks = useMemo(
    () =>
      NAV_LINKS.map((link) => ({
        href: link.href,
        label: t.nav[link.labelKey],
        hash: sectionHashFromHref(link.href),
        labelKey: link.labelKey,
      })),
    [t],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-500",
          scrolled
            ? "border-b border-gold/20 bg-[#050505]/92 py-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "bg-transparent py-2 sm:py-2.5",
        )}
      >
        {/*
          Desktop: 3 equal columns keep the nav capsule optically centered
          while logo (left) and language/CTA (right) stay vertically aligned.
        */}
        <div className="mx-auto grid h-11 max-w-7xl grid-cols-[1fr_auto] items-center gap-2 px-4 sm:h-12 sm:gap-3 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-3 lg:px-8">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2.5 justify-self-start"
            aria-label={`${SITE.name}${t.header.homeAria}`}
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center sm:h-11 sm:w-11">
              <span
                className="absolute inset-0 rounded-full bg-gold/10 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <Image
                src={IMAGES.logo}
                alt={SITE.name}
                width={72}
                height={72}
                priority
                className="relative h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10"
              />
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-display text-lg font-semibold tracking-[0.03em] text-gold sm:text-xl">
                {SITE.shortName}
              </span>
              <span className="mt-0.5 hidden text-[9px] uppercase tracking-[0.28em] text-muted sm:block">
                КАФЕ
              </span>
            </span>
          </Link>

          <nav
            className="hidden h-10 items-center justify-self-center rounded-full border border-white/[0.12] bg-[#0a0807]/88 px-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_24px_rgba(0,0,0,0.35)] backdrop-blur-md lg:flex"
            aria-label={t.header.mainNav}
          >
            {navLinks.map((link) => {
              const isActive = isNavLinkActive({
                labelKey: link.labelKey,
                hash: link.hash,
                pathname,
                activeSection,
              });
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) =>
                    handleHomeHashNavClick(event, link.href, pathname)
                  }
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex h-7 items-center rounded-full px-3 text-sm font-medium transition-all duration-300 xl:px-3.5",
                    isActive
                      ? "bg-[#c40000] text-ivory shadow-[0_0_20px_rgba(208,0,0,0.45)]"
                      : "text-ivory/90 hover:bg-brandred/15 hover:text-gold",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex h-10 min-w-0 items-center justify-self-end gap-1.5 sm:gap-2.5">
            {/*
              Compact RU/TG beside hamburger on mobile.
              Hidden while drawer is open to avoid a duplicate switcher.
            */}
            <LanguageSwitcher
              compact
              className={cn(menuOpen && "max-lg:invisible max-lg:pointer-events-none")}
            />
            {!DEMO.disableOrders ? <CartButton /> : null}
            <DemoWhatsAppCta
              variant="header"
              className="hidden lg:inline-flex"
            />
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-[#120d0a]/50 text-ivory transition-colors hover:border-gold/50 hover:bg-gold/10 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label={t.header.openMenu}
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
