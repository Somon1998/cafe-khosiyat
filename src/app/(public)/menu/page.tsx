import { MenuSection } from "@/components/sections/MenuSection";
import { SITE } from "@/constants/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Меню",
  description: `Меню ${SITE.legalName} в Бохтаре — лагман, манты, плов, шашлык и напитки. Демо-версия.`,
  robots: { index: false, follow: false },
};

export default function MenuPage() {
  return (
    <div className="pt-8 sm:pt-10">
      <MenuSection showAllLink={false} />
    </div>
  );
}
