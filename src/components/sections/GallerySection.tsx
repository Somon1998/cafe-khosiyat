"use client";

import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IMAGES, type GalleryAltKey } from "@/constants/images";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";

export function GallerySection() {
  const { t } = useLanguage();

  const galleryImages = useMemo(
    () =>
      IMAGES.gallery.map((img) => ({
        src: img.src,
        alt: t.gallery.alts[img.altKey as GalleryAltKey],
      })),
    [t],
  );

  return (
    <section
      id="gallery"
      className="scroll-mt-24 border-t border-gold/10 bg-surface/60 py-9 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />

        {/* Mobile: 2-col compact mosaic; sm+: approved 2-col proportions */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
          {galleryImages.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative aspect-[5/4] overflow-hidden rounded-xl border border-gold/10 shadow-md shadow-black/30 sm:aspect-[4/3] sm:rounded-2xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
