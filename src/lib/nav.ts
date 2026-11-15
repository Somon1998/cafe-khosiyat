import { NAV_LINKS } from "@/constants/site";
import type { MouseEvent } from "react";

/** Секции главной, которые участвуют в scroll spy и active nav */
export const HOME_SECTION_IDS = ["hero", "menu", "gallery", "contact"] as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

export type NavLabelKey = (typeof NAV_LINKS)[number]["labelKey"];

/** Высота sticky header + запас — совпадает со scroll-mt-24 */
export const NAV_SCROLL_OFFSET_PX = 96;

export function sectionHashFromHref(href: string): string | null {
  if (!href.includes("#")) return null;
  // Берём только первый сегмент — защита от битых hash вроде #hero#menu
  const hash = href.split("#")[1]?.split("#")[0] ?? "";
  return hash || "hero";
}

export function isHomeSectionId(id: string): id is HomeSectionId {
  return (HOME_SECTION_IDS as readonly string[]).includes(id);
}

/**
 * Единая логика активного пункта для desktop и mobile nav.
 * На главной «Меню» подсвечивается по секции #menu; на /menu — по pathname.
 */
export function isNavLinkActive(options: {
  labelKey: NavLabelKey;
  hash: string | null;
  pathname: string;
  activeSection: string;
}): boolean {
  const { labelKey, hash, pathname, activeSection } = options;
  const isHomePage = pathname === "/";
  const isMenuPage = pathname === "/menu";
  const isContactPage = pathname === "/contact";

  if (isMenuPage) return labelKey === "menu";
  if (isContactPage) return labelKey === "contact";
  if (!isHomePage) return false;

  if (labelKey === "menu") return activeSection === "menu";
  if (!hash) return false;
  return activeSection === hash;
}

/**
 * На главной Next.js Link часто не скроллит к тому же pathname + hash.
 * Скроллим сами и пишем чистый hash (`/#gallery`), без склейки якорей.
 * С других маршрутов оставляем обычный переход Next.
 */
export function handleHomeHashNavClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string,
): void {
  const hash = sectionHashFromHref(href);
  if (!hash || !href.startsWith("/#")) return;
  if (pathname !== "/") return;

  event.preventDefault();

  const cleanUrl = `/#${hash}`;
  if (`${window.location.pathname}${window.location.hash}` !== cleanUrl) {
    window.history.pushState(null, "", cleanUrl);
  }

  const target = document.getElementById(hash);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // pushState не шлёт hashchange — уведомляем scroll spy вручную
  window.dispatchEvent(new Event("hashchange"));
}
