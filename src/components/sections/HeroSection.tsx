"use client";

import { DemoWhatsAppCta } from "@/components/ui/DemoWhatsAppCta";
import { HERO_IMAGE } from "@/constants/site";
import { useLanguage } from "@/hooks/useLanguage";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock3, MapPin, Sparkles, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function HeroSection() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.55,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  const secondLine = [t.hero.titleLine2, t.hero.titleHighlight]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id="hero"
      className="relative scroll-mt-24 overflow-x-clip bg-culinary pb-2 pt-0 sm:pb-2 lg:pb-2"
    >
      {/* Near-black base + localized warm accents only */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_18%,rgba(122,8,11,0.16),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_88%_42%,rgba(208,0,0,0.11),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_68%,rgba(255,209,102,0.05),transparent_36%)]" />
      </div>

      {/*
        Mobile: compact stack — copy tight, dish prominent, little dead space.
        Desktop: approved two-column composition preserved.
      */}
      <div className="relative mx-auto grid max-w-7xl items-start gap-0 px-4 sm:gap-2 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-0 lg:px-8 xl:gap-0">
        {/* LEFT — raised copy block */}
        <div className="relative z-10 mx-auto w-full max-w-xl pt-0 text-center sm:pt-0 lg:mx-0 lg:max-w-none lg:pt-1 lg:pr-2 lg:text-left xl:pt-2">
          <motion.div
            {...fadeUp(0)}
            className="mb-1 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-[#17100d]/70 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-gold min-[360px]:mb-1.5 min-[360px]:px-3 min-[360px]:py-1 min-[360px]:text-xs sm:mb-2 sm:px-3.5 sm:py-1.5 sm:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {t.hero.badge}
          </motion.div>

          <motion.h1
            {...fadeUp(0.05)}
            className="font-display text-[1.95rem] font-semibold leading-[0.94] tracking-tight min-[360px]:text-[2.2rem] sm:text-5xl md:text-6xl lg:text-[4.15rem] xl:text-[5rem]"
          >
            <span className="block text-[#FFFFFF] drop-shadow-[0_2px_18px_rgba(0,0,0,0.4)]">
              {t.hero.titleLine1}
            </span>
            <span className="relative mt-0.5 block">
              <span
                className="pointer-events-none absolute inset-0 translate-y-[2px] text-[#FFD166]/22 blur-[4px]"
                aria-hidden
              >
                {secondLine}
              </span>
              <span className="relative text-[#FFD166]">{secondLine}</span>
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            className="mx-auto mt-1 max-w-md text-[0.875rem] leading-snug text-foreground/95 min-[360px]:mt-1.5 min-[360px]:text-[0.9375rem] sm:mt-2.5 sm:max-w-lg sm:text-lg sm:leading-relaxed lg:mx-0"
          >
            {t.site.description}
          </motion.p>

          <motion.div
            {...fadeUp(0.15)}
            className="mx-auto mt-2 flex w-[90%] max-w-[20.5rem] flex-col items-stretch gap-2 sm:mx-0 sm:mt-3.5 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-3 lg:justify-start"
          >
            <Link href="/menu" className="group w-full sm:w-auto">
              <span className="red-glow inline-flex h-[50px] min-h-[50px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-b from-[#ef1a1a] via-[#c40000] to-[#8f0000] px-5 text-[0.9375rem] font-semibold text-white transition-all duration-300 hover:from-[#ff2424] hover:via-[#d00000] hover:to-[#9a0000] hover:shadow-[0_0_36px_rgba(208,0,0,0.5)] min-[360px]:px-7 min-[360px]:text-base sm:h-12 sm:min-h-12 sm:w-auto sm:px-8">
                {t.hero.viewMenu}
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
            <DemoWhatsAppCta
              variant="hero"
              fullWidth
              className="h-[50px] min-h-[50px] sm:h-12 sm:min-h-12 sm:w-auto"
            />
          </motion.div>
        </div>

        {/* RIGHT — cinematic lagman pulled toward text, soft edge dissolve */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.985, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-0 mx-auto w-full max-w-[21rem] -mt-0.5 pt-1 sm:max-w-md sm:-translate-y-2 sm:pt-0 lg:max-w-none lg:-ml-6 lg:-translate-y-4 xl:-ml-10 xl:-translate-y-6 xl:-mr-2"
        >
          <div
            className="pointer-events-none absolute left-[48%] top-[46%] h-[58%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(208,0,0,0.22)_0%,rgba(255,209,102,0.08)_42%,transparent_72%)] blur-3xl"
            aria-hidden
          />

          <div className="relative mx-auto w-full">
            {/*
              Mobile: wider dish (prominent bowl, object-contain, no crop).
              Desktop: capped width preserves approved first-screen balance.
            */}
            <div className="hero-dish-fade relative mx-auto aspect-[1122/1402] w-full max-w-[min(100%,22rem)] sm:max-w-[390px] lg:max-w-[min(100%,440px)] xl:max-w-[480px]">
              <Image
                src={HERO_IMAGE}
                alt={t.hero.imageAlt}
                fill
                priority
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 390px, 38vw"
                className="object-contain object-center"
              />
            </div>

            {/* Edge veils — lighter on mobile so the bowl rim stays visible */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[8%] bg-[linear-gradient(to_right,#090909_0%,rgba(9,9,9,0.35)_35%,transparent_100%)] sm:w-[18%] sm:bg-[linear-gradient(to_right,#090909_0%,rgba(9,9,9,0.45)_30%,rgba(9,9,9,0.12)_65%,transparent_100%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[8%] bg-[linear-gradient(to_bottom,#090909_0%,rgba(9,9,9,0.35)_45%,transparent_100%)] sm:h-[12%] sm:bg-[linear-gradient(to_bottom,#090909_0%,rgba(9,9,9,0.45)_40%,transparent_100%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[12%] bg-[linear-gradient(to_top,#090909_0%,rgba(9,9,9,0.45)_35%,transparent_100%)] sm:h-[18%] sm:bg-[linear-gradient(to_top,#090909_0%,rgba(9,9,9,0.6)_28%,rgba(9,9,9,0.14)_70%,transparent_100%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[8%] bg-[linear-gradient(to_left,#090909_0%,rgba(9,9,9,0.4)_35%,transparent_100%)] sm:w-[14%] sm:bg-[linear-gradient(to_left,#090909_0%,rgba(9,9,9,0.55)_28%,rgba(9,9,9,0.14)_68%,transparent_100%)]"
              aria-hidden
            />
          </div>
        </motion.div>
      </div>

      {/* Verified facts only — premium dark gold-rim panel (no fake stats) */}
      <div className="relative z-10 mx-auto mt-1 max-w-7xl px-4 sm:mt-0 sm:px-6 lg:-mt-8 lg:px-8 xl:-mt-12">
        <div
          className="premium-info-bar grid grid-cols-3 gap-0 rounded-2xl border border-gold/35 bg-gradient-to-r from-[#140a0c]/92 via-[#10090b]/90 to-[#0c0807]/92 px-0.5 py-2 shadow-[0_0_0_1px_rgba(255,209,102,0.06),0_0_36px_rgba(122,8,11,0.28),0_0_28px_rgba(255,209,102,0.08)] backdrop-blur-md min-[360px]:px-1 sm:divide-x sm:divide-gold/20 sm:px-1 sm:py-3"
        >
          <InfoCell
            icon={<MapPin className="h-3.5 w-3.5" aria-hidden />}
            label={t.hero.infoCity}
            value={t.hero.infoCityValue}
          />
          <InfoCell
            icon={<Clock3 className="h-3.5 w-3.5" aria-hidden />}
            label={t.contact.workingHours}
            value={t.hero.infoHoursValue}
          />
          <InfoCell
            icon={<UtensilsCrossed className="h-3.5 w-3.5" aria-hidden />}
            label={t.hero.todayInMenu}
            value={t.hero.dishesCount}
          />
        </div>
      </div>
    </section>
  );
}

function InfoCell({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center justify-center gap-0.5 px-0.5 py-1 text-center min-[360px]:gap-1 min-[360px]:px-1.5 sm:flex-row sm:gap-2.5 sm:px-3 sm:py-0.5 sm:text-left">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold min-[360px]:h-7 min-[360px]:w-7 sm:h-8 sm:w-8">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[8px] uppercase tracking-[0.08em] text-gold/75 min-[360px]:text-[9px] min-[360px]:tracking-[0.12em] sm:text-[11px] sm:tracking-[0.14em]">
          {label}
        </p>
        <p className="whitespace-nowrap font-display text-[0.8125rem] font-semibold leading-tight text-ivory min-[360px]:text-sm sm:text-lg">
          {value}
        </p>
      </div>
    </div>
  );
}
