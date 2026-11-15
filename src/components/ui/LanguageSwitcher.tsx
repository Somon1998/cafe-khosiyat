"use client";

import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/config";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

/** Приоритет демо: RU / TG. EN остаётся в архитектуре словарей. */
const PUBLIC_LOCALES: Locale[] = LOCALES.filter((code) => code !== "en");

export function LanguageSwitcher({
  className,
  compact = false,
}: LanguageSwitcherProps) {
  const { locale, setLocale, t, ready } = useLanguage();

  if (!ready) {
    return (
      <div
        className={cn(
          "h-9 w-[84px] shrink-0 rounded-full border border-white/12 sm:h-10 sm:w-[92px]",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <div
      role="group"
      aria-label={t.lang.switcherLabel}
      className={cn(
        "inline-flex w-fit shrink-0 items-center rounded-full border border-white/12 bg-[#0a0807]/82 p-1 backdrop-blur-md",
        compact ? "h-9" : "h-10",
        className,
      )}
    >
      {PUBLIC_LOCALES.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={t.lang[code]}
            title={t.lang[code]}
            className={cn(
              "inline-flex items-center justify-center rounded-full font-semibold transition-colors",
              compact
                ? "h-7 min-w-[2.25rem] px-2 text-[11px]"
                : "h-8 px-2.5 text-xs",
              active
                ? "bg-[#c40000] text-white shadow-[0_0_14px_rgba(208,0,0,0.35)]"
                : "text-foreground/85 hover:text-gold",
            )}
          >
            {LOCALE_LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
