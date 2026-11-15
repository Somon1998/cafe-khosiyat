/**
 * Официальные ассеты кафе «Хосият» из public/images/khosiyat/.
 * Имена файлов проверены по содержимому папки.
 */
export const IMAGES = {
  logo: "/images/khosiyat/logo.png",
  /** Кинематографичная AI-визуализация — только для Hero */
  hero: "/images/khosiyat/lagman-cinematic.png",
  placeholder: "/images/placeholder.jpg",
  dishes: {
    lagman: "/images/khosiyat/lagman.png",
    manti: "/images/khosiyat/manti.png",
    plov: "/images/khosiyat/plov.png",
    fish: "/images/khosiyat/fish.png",
    shurpaLamb: "/images/khosiyat/shurpa-lamb.png",
    redBorscht: "/images/khosiyat/red-borscht.png",
    beefSoup: "/images/khosiyat/beef-soup.png",
    birinchoba: "/images/khosiyat/birinchoba.png",
    chujaBiryon: "/images/khosiyat/chuja-biryon.png",
    napoleon: "/images/khosiyat/napoleon.png",
    plemenBulon: "/images/khosiyat/plemen-bulon.jpg",
    shashlikDumba: "/images/khosiyat/shashlik-dumba.png",
    shashlikFarsh: "/images/khosiyat/shashlik-farsh.png",
    shashlikKuskovoy: "/images/khosiyat/shashlik-kuskovoy-govi.png",
    shashlikLiver: "/images/khosiyat/shashlik-liver.png",
    shashlikNezhnuy: "/images/khosiyat/shashlik-nezhnuy.png",
    shashlikRulet: "/images/khosiyat/shashlik-rulet.png",
    shashlikSharikvi: "/images/khosiyat/shashlik-sharikvi.png",
    shashlikRebra: "/images/khosiyat/shashlyk-rebra-baraniny.png",
    cocaCola: "/images/khosiyat/coca-cola.png",
    rcCola: "/images/khosiyat/rc-cola.png",
    dobryJuice: "/images/khosiyat/dobry-juice.png",
    gorilla: "/images/khosiyat/gorilla.png",
    mineralWater: "/images/khosiyat/mineral-water.png",
    mojito: "/images/khosiyat/mojito.png",
  },
  venue: {
    exterior: "/images/khosiyat/exterior.png",
    interior1: "/images/khosiyat/interior-1.png",
    interior2: "/images/khosiyat/interior-2.png",
    interior3: "/images/khosiyat/interior-3.png",
  },
  gallery: [
    {
      src: "/images/khosiyat/exterior.png",
      altKey: "exterior" as const,
    },
    {
      src: "/images/khosiyat/interior-1.png",
      altKey: "interior1" as const,
    },
    {
      src: "/images/khosiyat/interior-2.png",
      altKey: "interior2" as const,
    },
    {
      src: "/images/khosiyat/interior-3.png",
      altKey: "interior3" as const,
    },
  ],
} as const;

export type GalleryAltKey = (typeof IMAGES.gallery)[number]["altKey"];
