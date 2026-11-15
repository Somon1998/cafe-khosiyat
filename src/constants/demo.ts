/**
 * Демо-режим Khosiyat Premium V2.
 * Неофициальная демонстрационная версия — не действующий сайт кафе.
 */
export const DEMO = {
  enabled: true,
  /** Верхний баннер скрыт — disclosure остаётся в Footer */
  showBanner: false,
  /** Отключить корзину и оформление заказа */
  disableOrders: true,
  /** Отключить WhatsApp / Telegram / Instagram заказные CTA */
  disableOrderLinks: true,
  /** Скрыть публичные ссылки на админку */
  hideAdminLinks: true,
  /** Не индексировать поисковиками */
  noIndex: true,
  bannerTextRu:
    "Неофициальная демонстрационная версия. Не действующий сайт кафе «Хосият».",
  bannerTextTg:
    "Нусхаи намоишии ғайрирасмӣ. Сойти амалкунандаи кафеи «Хосият» нест.",
  bannerTextEn:
    "Unofficial demo version. Not the official Khosiyat Cafe website.",
} as const;
