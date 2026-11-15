/**
 * Визуальная нормализация изображений в карточках меню.
 *
 * Некоторые PNG содержат много пустого фона вокруг блюда.
 * При object-contain такие ассеты выглядят меньше соседних,
 * хотя размер карточки и область картинки одинаковые.
 *
 * Здесь — опциональные правки масштаба/отступов по id товара.
 * Не меняет сетку, object-cover не использует.
 */

export interface ProductImagePresentation {
  /** Масштаб относительно object-contain (1 = без изменений). */
  imageScale?: number;
  /** Опциональные padding-классы вместо дефолтных для еды/напитков. */
  imagePaddingClass?: string;
  /** Позиция object-* (по умолчанию object-center). */
  imagePositionClass?: string;
}

const DEFAULT_SCALE = 1;

/**
 * Кастомные правки только для ассетов с лишним пустым пространством.
 * Ключ = product.id из меню / БД.
 */
export const PRODUCT_IMAGE_PRESENTATION: Record<
  string,
  ProductImagePresentation
> = {
  "kh-manti": {
    // Круглая тарелка с заметными полями сверху/снизу и по бокам.
    imageScale: 1.22,
    imagePaddingClass: "p-1 sm:p-1.5",
    imagePositionClass: "object-center",
  },
  "kh-borscht": {
    // Белая миска занимает ~75–80% кадра — нужна лёгкая доводка.
    imageScale: 1.2,
    imagePaddingClass: "p-1 sm:p-1.5",
    imagePositionClass: "object-center",
  },
};

export interface ResolvedProductImagePresentation {
  imageScale: number;
  imagePaddingClass?: string;
  imagePositionClass: string;
}

export function getProductImagePresentation(
  productId: string,
): ResolvedProductImagePresentation {
  const custom = PRODUCT_IMAGE_PRESENTATION[productId];

  return {
    imageScale: custom?.imageScale ?? DEFAULT_SCALE,
    imagePaddingClass: custom?.imagePaddingClass,
    imagePositionClass: custom?.imagePositionClass ?? "object-center",
  };
}
