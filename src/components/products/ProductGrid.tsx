"use client";

import type { ProductWithOptions } from "@/types/product";
import type { MenuFilter } from "@/constants/categories";
import { useLanguage } from "@/hooks/useLanguage";
import { AnimatePresence } from "framer-motion";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";

interface ProductGridProps {
  products: ProductWithOptions[];
  filter: MenuFilter;
  /** Обрезка после фильтрации (иначе категории вроде «Напитки» выглядят пустыми) */
  limit?: number;
  loading?: boolean;
  error?: string | null;
}

/** Компактная адаптивная сетка: 2 колонки с ~360px, 1 колонка на очень узких */
const MENU_GRID_CLASS =
  "grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 auto-rows-fr";

function filterProducts(
  products: ProductWithOptions[],
  filter: MenuFilter,
): ProductWithOptions[] {
  if (filter === "all") return products;
  return products.filter((p) => p.category === filter);
}

export function ProductGrid({
  products,
  filter,
  limit,
  loading,
  error,
}: ProductGridProps) {
  const { t } = useLanguage();
  const filteredAll = filterProducts(products, filter);
  const filtered =
    typeof limit === "number" ? filteredAll.slice(0, limit) : filteredAll;

  if (loading) {
    return (
      <div className={MENU_GRID_CLASS}>
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/50">
        <p className="font-medium text-red-800 dark:text-red-200">
          {t.menu.loadError}
        </p>
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {t.menu.loadErrorHint}
        </p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gold/25 p-12 text-center">
        <p className="text-lg font-medium text-ivory">
          {t.menu.emptyTitle}
        </p>
        <p className="mt-2 text-sm text-muted">{t.menu.emptyHint}</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <div className={MENU_GRID_CLASS}>
        {filtered.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </AnimatePresence>
  );
}
