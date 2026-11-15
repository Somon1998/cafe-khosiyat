"use client";

import { DemoWhatsAppCta } from "@/components/ui/DemoWhatsAppCta";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { IMAGES } from "@/constants/images";
import { NAV_LINKS, SITE } from "@/constants/site";
import { useLanguage } from "@/hooks/useLanguage";
import {
  handleHomeHashNavClick,
  isNavLinkActive,
  sectionHashFromHref,
  type HomeSectionId,
} from "@/lib/nav";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeSection?: HomeSectionId;
}

export function MobileMenu({
  open,
  onClose,
  activeSection = "hero",
}: MobileMenuProps) {
  const { t } = useLanguage();
  const pathname = usePathname();

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
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-label={t.mobileMenu.closeOverlay}
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className={cn(
              "fixed right-0 top-0 z-50 flex h-full w-[min(320px,85vw)] flex-col border-l border-gold/20 bg-[#090909] p-6 shadow-2xl lg:hidden",
            )}
            aria-label={t.mobileMenu.mobileNav}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Image
                  src={IMAGES.logo}
                  alt={SITE.name}
                  width={44}
                  height={44}
                  className="h-9 w-9 shrink-0 object-contain"
                />
                <span className="font-display text-lg font-semibold tracking-wide text-gold">
                  {SITE.shortName}
                </span>
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-ivory hover:bg-white/5"
                aria-label={t.mobileMenu.close}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Compact content-sized pill — do not stretch to panel width */}
            <div className="mb-4 flex justify-center">
              <LanguageSwitcher compact />
            </div>

            <ul className="flex flex-col gap-0.5">
              {navLinks.map((link, i) => {
                const isActive = isNavLinkActive({
                  labelKey: link.labelKey,
                  hash: link.hash,
                  pathname,
                  activeSection,
                });
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={link.href}
                      onClick={(event) => {
                        handleHomeHashNavClick(event, link.href, pathname);
                        onClose();
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block rounded-xl px-4 py-2.5 text-base font-medium transition-colors",
                        isActive
                          ? "bg-brandred text-ivory shadow-[0_0_18px_rgba(208,0,0,0.28)]"
                          : "text-foreground hover:bg-brandred/15 hover:text-gold",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            {/* CTA sits under nav (24–32px), not pinned to screen bottom */}
            <div className="mt-7">
              <DemoWhatsAppCta variant="header" fullWidth />
            </div>
          </motion.nav>
        </>
      ) : null}
    </AnimatePresence>
  );
}
