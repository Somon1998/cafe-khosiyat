"use client";

import { DEMO } from "@/constants/demo";
import { useLanguage } from "@/hooks/useLanguage";

function bannerText(locale: string): string {
  if (locale === "tg") return DEMO.bannerTextTg;
  if (locale === "en") return DEMO.bannerTextEn;
  return DEMO.bannerTextRu;
}

export function DemoBanner() {
  const { locale } = useLanguage();

  if (!DEMO.enabled || !DEMO.showBanner) return null;

  return (
    <div
      role="status"
      className="relative z-[60] border-b border-gold/25 bg-burgundy px-4 py-2 text-center text-xs font-medium text-ivory sm:text-sm"
    >
      {bannerText(locale)}
    </div>
  );
}
