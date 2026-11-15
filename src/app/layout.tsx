import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { ThemeScript } from "@/components/providers/ThemeScript";
import { DEMO } from "@/constants/demo";
import { SITE } from "@/constants/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.shortName} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.description} Неофициальная демонстрационная версия.`,
  openGraph: {
    title: `${SITE.shortName} (демо)`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/images/khosiyat/lagman.png",
        width: 1200,
        height: 630,
        alt: SITE.shortName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.shortName} (демо)`,
    description: SITE.description,
    images: ["/images/khosiyat/lagman.png"],
  },
  robots: DEMO.noIndex
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`dark ${manrope.variable} ${cormorant.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
