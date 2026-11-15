import type { MetadataRoute } from "next";
import { DEMO } from "@/constants/demo";

export default function robots(): MetadataRoute.Robots {
  if (DEMO.noIndex) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/"],
    },
  };
}
