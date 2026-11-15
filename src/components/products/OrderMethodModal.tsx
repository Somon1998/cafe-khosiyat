"use client";

import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { DEMO } from "@/constants/demo";
import { useLanguage } from "@/hooks/useLanguage";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { getWhatsAppOrderLink } from "@/lib/whatsapp";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface OrderMethodModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  price: number;
}

const ORDER_METHODS = [
  {
    id: "whatsapp" as const,
    Icon: WhatsAppIcon,
    href: (name: string, price: number, locale: Locale) =>
      getWhatsAppOrderLink(name, price, locale),
    className:
      "bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white focus-visible:ring-[#25D366]/50",
  },
] as const;

export function OrderMethodModal({
  open,
  onClose,
  productName,
  price,
}: OrderMethodModalProps) {
  const { t, locale } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  // В демо заказные CTA полностью отключены
  if (DEMO.disableOrderLinks) return null;

  const labels = {
    whatsapp: t.orderModal.whatsapp,
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-method-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label={t.orderModal.close}
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-1/2 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gold/20 bg-surface p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2
            id="order-method-title"
            className="text-lg font-bold text-foreground"
          >
            {t.orderModal.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-white/5"
            aria-label={t.orderModal.close}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-3">
          {ORDER_METHODS.map((method) => {
            const Icon = method.Icon;
            return (
              <a
                key={method.id}
                href={method.href(productName, price, locale)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2",
                  method.className,
                )}
              >
                <Icon className="h-5 w-5" />
                {labels[method.id]}
              </a>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}
