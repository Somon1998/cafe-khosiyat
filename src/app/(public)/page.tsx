import { ContactSection } from "@/components/sections/ContactSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MenuSection } from "@/components/sections/MenuSection";
import { SignatureDishesSection } from "@/components/sections/SignatureDishesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SignatureDishesSection />
      <MenuSection limit={8} showAllLink />
      <GallerySection />
      <ContactSection />
    </>
  );
}
