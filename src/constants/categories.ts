import type { ProductCategory } from "@/types/product";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "hotdog",
  "shaurma",
  "shashlik",
  "drinks",
  "other",
];

/** Подписи для админки / legacy; публичные лейблы — через i18n */
export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  hotdog: "Хот-доги",
  shaurma: "Шаурма",
  shashlik: "Шашлык",
  drinks: "Напитки",
  other: "Горячие блюда",
};

export type MenuFilter = "all" | ProductCategory;

/** Фильтры публичного меню Khosiyat (без hotdog/shaurma) */
export const MENU_FILTERS: { value: MenuFilter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "other", label: "Горячие блюда" },
  { value: "shashlik", label: "Шашлык" },
  { value: "drinks", label: "Напитки" },
];
