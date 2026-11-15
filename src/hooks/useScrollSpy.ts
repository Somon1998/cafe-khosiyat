"use client";

import {
  HOME_SECTION_IDS,
  NAV_SCROLL_OFFSET_PX,
  isHomeSectionId,
  type HomeSectionId,
} from "@/lib/nav";
import { useEffect, useState } from "react";

/**
 * Определяет активную секцию на главной по позиции скролла.
 * Учитывает sticky header (NAV_SCROLL_OFFSET_PX) и низ страницы.
 */
function readHashSection(): HomeSectionId | null {
  if (typeof window === "undefined") return null;
  const raw = window.location.hash.replace("#", "").split("#")[0];
  return raw && isHomeSectionId(raw) ? raw : null;
}

export function useScrollSpy(enabled: boolean): HomeSectionId {
  const [activeSection, setActiveSection] = useState<HomeSectionId>(
    () => readHashSection() ?? "hero",
  );

  useEffect(() => {
    if (!enabled) return;

    let rafId = 0;
    let settleTimer = 0;

    const resolveActiveSection = (): HomeSectionId => {
      const sections = HOME_SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const top = el.getBoundingClientRect().top + window.scrollY;
        return { id, top };
      }).filter((s): s is { id: HomeSectionId; top: number } => Boolean(s));

      if (sections.length === 0) return "hero";

      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Внизу страницы всегда «Контакты» — иначе короткая секция не дотягивает до probe
      if (docHeight - scrollBottom < 96) {
        return sections[sections.length - 1].id;
      }

      const probe = window.scrollY + NAV_SCROLL_OFFSET_PX;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.top <= probe + 1) {
          current = section.id;
        }
      }

      return current;
    };

    const sync = () => {
      const next = resolveActiveSection();
      setActiveSection((prev) => (prev === next ? prev : next));
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        sync();
      });
    };

    const onHashChange = () => {
      const fromHash = readHashSection();
      if (fromHash) {
        setActiveSection(fromHash);
      }
      // После якоря браузер/наш click-handler скроллит — догоняем позицию
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(sync, 120);
      onScrollOrResize();
    };

    sync();
    // Повтор после layout (hash scroll / sticky header)
    settleTimer = window.setTimeout(sync, 200);

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [enabled]);

  return activeSection;
}
