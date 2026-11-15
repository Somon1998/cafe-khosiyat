"use client";

import { Button } from "@/components/ui/Button";
import { DEMO } from "@/constants/demo";
import { IMAGES } from "@/constants/images";
import { getProductImagePresentation } from "@/constants/product-image-presentation";
import { useLanguage } from "@/hooks/useLanguage";
import { formatPrice } from "@/lib/utils";
import {
  getProductDescription,
  getProductName,
} from "@/lib/product-i18n";
import { ProductConfigModal } from "@/components/products/ProductConfigModal";
import type { ProductWithOptions } from "@/types/product";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";

interface ProductCardProps {
  product: ProductWithOptions;
  index?: number;
}

const PLACEHOLDER = IMAGES.placeholder;
const HOVER_SCALE_FACTOR = 1.03;

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { t, locale } = useLanguage();
  const [configOpen, setConfigOpen] = useState(false);
  const imageSrc = product.image_url ?? PLACEHOLDER;
  const orderDisabled = !product.is_available;
  const displayName = getProductName(product, locale);
  const displayDescription = getProductDescription(product, locale);
  const isDrink = product.category === "drinks";
  const imagePresentation = getProductImagePresentation(product.id);
  const defaultPaddingClass = isDrink
    ? "p-3 sm:p-4"
    : "p-2 sm:p-2.5";
  const imageStyle = {
    "--product-image-scale": String(imagePresentation.imageScale),
    "--product-image-hover-scale": String(
      imagePresentation.imageScale * HOVER_SCALE_FACTOR,
    ),
  } as CSSProperties;

  const variantPrices = product.variants.map((v) => v.price);
  const basePrice =
    variantPrices.length > 0 ? Math.min(...variantPrices) : product.price;
  const priceLabel =
    product.variants.length > 1
      ? `${t.product.priceFrom} ${formatPrice(basePrice)}`
      : formatPrice(basePrice);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.28, delay: Math.min(index * 0.03, 0.24) }}
      className={cn(
        "group flex h-full min-h-0 flex-col overflow-hidden rounded-[16px]",
        "border border-gold/25 bg-gradient-to-b from-[#1a0f10] via-[#120d0a] to-[#0a0707]",
        "shadow-[0_8px_24px_rgba(0,0,0,0.35)]",
        "transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-gold/45 hover:shadow-[0_14px_32px_rgba(0,0,0,0.45)]",
        !DEMO.disableOrders && !product.is_available && "opacity-80",
      )}
    >
      {/* Единая область изображения для всех карточек */}
      <div
        className={cn(
          "relative w-full shrink-0 overflow-hidden",
          "bg-[radial-gradient(ellipse_at_center,rgba(42,24,20,0.9)_0%,rgba(10,7,7,0.95)_70%)]",
          isDrink
            ? "h-[148px] min-[360px]:h-[156px] sm:h-[176px]"
            : "h-[132px] min-[360px]:h-[140px] sm:h-[160px] lg:h-[168px]",
        )}
      >
        <Image
          src={imageSrc}
          alt={displayName}
          fill
          sizes="(max-width: 380px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          style={imageStyle}
          className={cn(
            // object-contain сохраняем: без обрезки блюда, только визуальный scale.
            "object-contain transition-transform duration-500",
            "scale-[var(--product-image-scale)]",
            "group-hover:scale-[var(--product-image-hover-scale)]",
            imagePresentation.imagePositionClass,
            imagePresentation.imagePaddingClass ?? defaultPaddingClass,
          )}
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-1 px-2.5 py-2.5 sm:gap-1.5 sm:px-3.5 sm:py-3.5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gold-strong sm:text-[10px]">
          {t.categories[product.category]}
        </p>

        <h3 className="line-clamp-2 min-h-[2.35rem] break-words text-[0.8125rem] font-semibold leading-snug text-ivory sm:min-h-[2.75rem] sm:text-[0.95rem]">
          {displayName}
        </h3>

        {displayDescription ? (
          <p className="line-clamp-2 min-h-[2rem] flex-1 break-words text-[11px] leading-relaxed text-muted sm:min-h-[2.5rem] sm:text-[13px]">
            {displayDescription}
          </p>
        ) : (
          <div className="min-h-[2rem] flex-1 sm:min-h-[2.5rem]" />
        )}

        {/* Цены и заказ — только вне демо-режима */}
        {!DEMO.disableOrders ? (
          <div className="mt-1 shrink-0 border-t border-gold/15 pt-2.5">
            <span className="text-base font-bold text-gold">{priceLabel}</span>
            {orderDisabled ? (
              <Button
                size="sm"
                variant="outline"
                disabled
                className="mt-2 w-full"
              >
                {t.product.unavailableShort}
              </Button>
            ) : (
              <div className="mt-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setConfigOpen(true)}
                  className="w-full"
                >
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  {t.cart.addToCart}
                </Button>
                {configOpen ? (
                  <ProductConfigModal
                    onClose={() => setConfigOpen(false)}
                    product={product}
                    productName={displayName}
                  />
                ) : null}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[16px] border border-gold/15 bg-[#120d0a]">
      <div className="h-[132px] bg-stone-800/80 min-[360px]:h-[140px] sm:h-[160px] lg:h-[168px]" />
      <div className="space-y-2 px-2.5 py-2.5 sm:px-3.5 sm:py-3.5">
        <div className="h-2.5 w-16 rounded bg-stone-700/80" />
        <div className="h-4 w-3/4 rounded bg-stone-700/80" />
        <div className="h-3 w-full rounded bg-stone-800/80" />
        <div className="h-3 w-5/6 rounded bg-stone-800/80" />
      </div>
    </div>
  );
}
