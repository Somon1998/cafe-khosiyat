import { ContactSection } from "@/components/sections/ContactSection";
import { SITE } from "@/constants/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Контакты ${SITE.legalName} — ${SITE.address}, ${SITE.phone}. Демо-версия.`,
  robots: { index: false, follow: false },
};

export default function ContactPage() {
  return (
    <div className="pt-8 sm:pt-10">
      <ContactSection />
    </div>
  );
}
