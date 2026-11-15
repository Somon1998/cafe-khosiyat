"use client";

import type { MenuFilter } from "@/constants/categories";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DEMO } from "@/constants/demo";
import { useLanguage } from "@/hooks/useLanguage";
import { useMenu } from "@/hooks/useMenu";
import Link from "next/link";
import { useState } from "react";

interface MenuSectionProps {
  showAllLink?: boolean;
  limit?: number;
}

export function MenuSection({ showAllLink = true, limit }: MenuSectionProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<MenuFilter>("all");
  const { products, loading, error } = useMenu(true);

  return (
    <section
      id="menu"
      className="scroll-mt-24 border-t border-gold/10 bg-[#090909] py-9 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.menu.eyebrow}
          title={t.menu.title}
          subtitle={t.menu.subtitle}
        />

        {/* Одно уведомление о демо над каталогом — не дублируем в карточках */}
        {DEMO.disableOrders ? (
          <p
            role="note"
            className="mb-4 rounded-xl border border-gold/20 bg-[#120d0a]/80 px-3 py-2.5 text-center text-sm text-foreground sm:mb-6 sm:px-4 sm:py-3"
          >
            {t.product.demoOnly}
          </p>
        ) : null}

        <div className="mb-4 sm:mb-8">
          <ProductFilters active={filter} onChange={setFilter} />
        </div>

        <ProductGrid
          products={products}
          filter={filter}
          limit={limit}
          loading={loading}
          error={error}
        />

        {showAllLink && limit ? (
          <div className="mt-7 text-center sm:mt-12">
            <Link href="/menu">
              <Button variant="outline" size="lg">
                {t.menu.fullMenu}
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
