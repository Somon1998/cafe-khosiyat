import type { MetadataRoute } from "next";
import { DEMO } from "@/constants/demo";

/** В демо-режиме sitemap пустой — сайт не для индексации. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (DEMO.noIndex) {
    return [];
  }

  return [];
}
