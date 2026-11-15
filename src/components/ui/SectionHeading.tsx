"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-7 max-w-2xl sm:mb-10 lg:mb-12",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-gold sm:mb-3">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-[1.75rem] font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2.5 text-base text-muted sm:mt-4 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
