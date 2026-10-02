import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/config/site";
import { AnalyticsBoot } from "@/components/AnalyticsBoot";
import "./globals.css";

const sans = localFont({
  src: "../fonts/figtree-latin-wght-normal.woff2",
  variable: "--font-figtree",
  weight: "300 900",
  display: "swap",
});

const heading = localFont({
  src: "../fonts/bricolage-grotesque-latin-standard-normal.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.defaultTitle, template: site.seo.titleTemplate },
  description: site.seo.description,
  formatDetection: { telephone: false },
  robots: site.indexable ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f5f7fb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${sans.variable} ${heading.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#contenu"
          className="sr-only z-[100] rounded-full bg-marine-700 px-5 py-3 text-sm text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Aller au contenu
        </a>
        {children}
        <AnalyticsBoot />
      </body>
    </html>
  );
}
