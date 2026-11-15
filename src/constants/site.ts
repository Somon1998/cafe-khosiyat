import { IMAGES } from "@/constants/images";

export const SITE = {
  name: "ХОСИЯТ КАФЕ",
  shortName: "Хосият",
  legalName: "Кафе «Хосият»",
  tagline: "Настоящий вкус Востока",
  description:
    "Добро пожаловать в кафе «Хосият» в Бохтаре — место, где восточная кухня, фирменный лагман и гостеприимство создают особую атмосферу.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "+992 98 809 9658",
  /** Только для отображения контакта; заказные CTA в демо отключены */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "992988099658",
  address: "г. Бохтар, ул. А. Каххарова, Таджикистан",
  city: "Бохтар",
  workingHours: "Ежедневно: 09:00 — 22:00",
  /**
   * Поиск по адресу без чужих координат Ahmad Cafe.
   * Embed (`output=embed`) часто отдаёт пустой iframe без place ID / API key —
   * в UI используем mapSearchUrl + fallback-карточку.
   */
  mapSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=%D0%91%D0%BE%D1%85%D1%82%D0%B0%D1%80%20%D1%83%D0%BB.%20%D0%90.%20%D0%9A%D0%B0%D1%85%D1%85%D0%B0%D1%80%D0%BE%D0%B2%D0%B0",
} as const;

/** Публичная навигация — только существующие разделы */
export const NAV_LINKS = [
  { href: "/#hero", labelKey: "home" as const },
  { href: "/menu", labelKey: "menu" as const },
  { href: "/#gallery", labelKey: "gallery" as const },
  { href: "/#contact", labelKey: "contact" as const },
] as const;

export const FOOTER_LINKS = [
  { href: "/menu", labelKey: "fullMenu" as const },
  { href: "/#gallery", labelKey: "gallery" as const },
  { href: "/#contact", labelKey: "contact" as const },
] as const;

export const GALLERY_IMAGES = IMAGES.gallery;

export const HERO_IMAGE = IMAGES.hero;
