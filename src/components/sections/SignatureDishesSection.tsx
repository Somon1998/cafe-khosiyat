"use client";

import { getSignatureDishes } from "@/data/khosiyat-menu";
import { useLanguage } from "@/hooks/useLanguage";
import {
  getProductDescription,
  getProductName,
} from "@/lib/product-i18n";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function SignatureDishesSection() {
  const { t, locale } = useLanguage();
  const reduceMotion = useReducedMotion();
  const dishes = useMemo(() => getSignatureDishes(), []);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, [updateArrows, dishes.length]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-signature-card]");
    if (!card) return;
    const gap = 16;
    const delta = (card.getBoundingClientRect().width + gap) * direction;
    el.scrollBy({
      left: delta,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    requestAnimationFrame(updateArrows);
    window.setTimeout(updateArrows, reduceMotion ? 40 : 380);
  };

  return (
    <section
      id="signature"
      className="scroll-mt-24 overflow-x-clip border-t border-gold/10 bg-culinary py-4 sm:py-6 lg:py-7"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-3 flex flex-col gap-2.5 sm:mb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              {t.signature.eyebrow}
            </p>
            <h2 className="mt-1 font-display text-3xl font-semibold text-ivory sm:text-4xl">
              <span className="relative inline-block">
                {t.signature.title}
                <span
                  className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-[42%] rounded-full bg-[#c40000] shadow-[0_0_10px_rgba(196,0,0,0.55)]"
                  aria-hidden
                />
              </span>
            </h2>
            <p className="mt-2 max-w-xl text-sm text-foreground sm:text-base">
              {t.signature.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <CarouselButton
                label={t.signature.prev}
                disabled={!canPrev}
                onClick={() => scrollByCard(-1)}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </CarouselButton>
              <CarouselButton
                label={t.signature.next}
                disabled={!canNext}
                onClick={() => scrollByCard(1)}
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </CarouselButton>
            </div>
            <Link
              href="/menu"
              className="min-h-11 inline-flex items-center text-sm font-semibold text-gold transition-colors hover:text-gold-strong"
            >
              {t.signature.viewAll}
            </Link>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-0.5 touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
          aria-label={t.signature.title}
        >
          {dishes.map((dish, i) => {
            const name = getProductName(dish, locale);
            const description = getProductDescription(dish, locale);

            return (
              <motion.article
                key={dish.id}
                data-signature-card
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -3, borderColor: "rgba(255,209,102,0.5)" }
                }
                className={cn(
                  "group flex h-[7rem] shrink-0 snap-start items-center gap-3 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-r from-[#1a0c0e] via-[#140a0c] to-[#0e0a09] p-2.5 shadow-[0_0_0_1px_rgba(255,209,102,0.05),0_0_20px_rgba(122,8,11,0.12)] transition-shadow duration-300 sm:h-[7.25rem] sm:gap-3.5 sm:p-3",
                  "hover:shadow-[0_12px_36px_rgba(122,8,11,0.3),0_0_28px_rgba(255,209,102,0.12)]",
                  /* Mobile: card width leaves a peek of the next dish for swipe affordance */
                  "w-[min(82vw,18.5rem)] basis-[min(82vw,18.5rem)]",
                  "sm:w-auto sm:basis-[calc((100%-1rem)/2)]",
                  "lg:basis-[calc((100%-2rem)/3)]",
                )}
              >
                <div className="relative h-[5.25rem] w-[5.25rem] shrink-0 overflow-hidden rounded-full border border-gold/35 bg-[#120e0b] shadow-[inset_0_0_0_1px_rgba(255,209,102,0.1),0_0_16px_rgba(255,209,102,0.08)] sm:h-[5.75rem] sm:w-[5.75rem]">
                  {dish.image_url ? (
                    <Image
                      src={dish.image_url}
                      alt={name}
                      fill
                      sizes="92px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(245,235,221,0.12),transparent_55%)]"
                    aria-hidden
                  />
                </div>

                <div className="min-w-0 flex-1 py-0.5 pr-1">
                  <h3 className="font-display text-base font-semibold leading-snug text-ivory sm:text-xl">
                    {name}
                  </h3>
                  {description ? (
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted sm:mt-1 sm:text-sm">
                      {description}
                    </p>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/35 text-gold transition-colors sm:h-9 sm:w-9",
        "hover:border-gold hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
        "disabled:pointer-events-none disabled:opacity-35",
      )}
    >
      {children}
    </button>
  );
}
