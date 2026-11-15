"use client";

import { MENU_FILTERS, type MenuFilter } from "@/constants/categories";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProductFiltersProps {
  active: MenuFilter;
  onChange: (filter: MenuFilter) => void;
}

export function ProductFilters({ active, onChange }: ProductFiltersProps) {
  const { t } = useLanguage();

  return (
    <div
      className="-mx-4 overflow-x-auto overscroll-x-contain scroll-smooth touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:overflow-visible [&::-webkit-scrollbar]:hidden"
      role="presentation"
    >
      <div
        className="flex w-max min-w-full flex-nowrap justify-start gap-2 px-4 sm:w-auto sm:flex-wrap sm:justify-center sm:px-0"
        role="tablist"
        aria-label={t.menu.filterAria}
      >
        {MENU_FILTERS.map((filter) => {
          const isActive = active === filter.value;
          const label = t.categories[filter.value];
          return (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(filter.value)}
              className={cn(
                "relative min-h-12 shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:min-h-11 sm:px-5",
                isActive
                  ? "text-white"
                  : "text-foreground hover:bg-gold/10 hover:text-gold",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="menu-filter-pill"
                  className="brand-gradient absolute inset-0 rounded-full shadow-lg shadow-gold/25"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              ) : null}
              <span className="relative z-10 whitespace-nowrap">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
