"use client";

import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

type DemoWhatsAppCtaProps = {
  className?: string;
  /** header = compact red glow; hero = dark + gold outline */
  variant?: "header" | "hero";
  fullWidth?: boolean;
};

/**
 * Визуальный превью CTA WhatsApp для неофициального демо.
 * Не открывает заказ и не имитирует работу кафе.
 */
export function DemoWhatsAppCta({
  className,
  variant = "header",
  fullWidth = false,
}: DemoWhatsAppCtaProps) {
  const { t } = useLanguage();
  const label =
    variant === "header" ? t.header.orderWhatsApp : t.hero.secondaryCta;
  const title =
    variant === "header"
      ? t.header.whatsappDemoTitle
      : t.hero.whatsappDemoTitle;
  const aria =
    variant === "header" ? t.header.whatsappDemoAria : t.hero.whatsappDemoAria;

  return (
    <button
      type="button"
      aria-disabled="true"
      title={title}
      aria-label={aria}
      onClick={(event) => {
        event.preventDefault();
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
        "cursor-not-allowed opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]",
        fullWidth && "w-full",
        variant === "header" &&
          "h-10 shrink-0 whitespace-nowrap bg-gradient-to-b from-[#ef1a1a] via-[#c40000] to-[#8f0000] px-3.5 text-sm text-white shadow-[0_0_0_1px_rgba(255,80,80,0.18),0_0_28px_rgba(208,0,0,0.48)] xl:px-5",
        variant === "hero" &&
          "h-12 min-h-12 border border-gold/60 bg-[#120d0a]/85 px-5 text-[0.9375rem] text-gold shadow-[inset_0_0_0_1px_rgba(213,175,117,0.08)] min-[360px]:px-7 min-[360px]:text-base",
        className,
      )}
    >
      <WhatsAppIcon
        className={cn(
          "h-4 w-4 shrink-0",
          variant === "header" ? "text-white" : "text-gold",
        )}
      />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}
