import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getContent, links, SITE_URL } from "@/lib/content";
import { routes, ui } from "@/lib/i18n";

/**
 * İngilizce kök yerleşimi — `/en` altındaki her sayfa bunu kullanır.
 *
 * İki dilin iki ayrı kök yerleşimi var (`app/(tr)` ve `app/(en)`). Bunun tek sebebi
 * `<html lang>`: bir yerleşim yalnızca tek bir değer basabiliyor ve büyük
 * harfe çevirme dile duyarlı olduğu için bu değerin doğru olması şart.
 *
 * Barlow Condensed + Barlow: SpaceX D-DIN kullanıyor; onun ücretsiz
 * karşılığı olarak DIN ailesine en yakın duran bu ikili seçildi.
 */
const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});
const body = Barlow({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

const LOCALE = "en" as const;
const { org, divisions } = getContent(LOCALE);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${org.name} — ${org.tagline}`,
    template: `%s — ${org.name}`,
  },
  description: org.description,
  keywords: [org.name, ...divisions.map((d) => d.name), "games", "software", "robotics"],
  authors: [{ name: org.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: org.name,
    title: `${org.name} — ${org.tagline}`,
    description: org.description,
  },
  twitter: { card: "summary_large_image" },
  // Her sayfanın iki dildeki karşılığı Google'a bildiriliyor; ikisi de
  // kendi başına geçerli, biri diğerinin kopyası değil.
  alternates: {
    canonical: routes.home.en,
    languages: { tr: routes.home.tr, en: routes.home.en },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

/**
 * Google'ın şirketi tanıyabilmesi için yapısal veri. Arama sonucunda bilgi
 * panelini besleyen şey bu.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: org.name,
  url: SITE_URL,
  logo: `${SITE_URL}/neuvikon-logo.png`,
  description: org.description,
  email: org.email,
  foundingDate: String(org.year),
  sameAs: links.map((l) => l.href),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: org.email,
    availableLanguage: ["tr", "en"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // İçerik bizim ürettiğimiz sabit bir nesne; dışarıdan girdi almıyor.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Çerezsiz, kişisel veri toplamayan sayaç. Alan adı tanımlı
            değilse hiç yüklenmiyor — yerelde ve önizlemede sessiz. */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="flex min-h-full flex-col bg-bg font-sans text-text">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
        >
          {ui.en.skipToContent}
        </a>
        <Header locale={LOCALE} />
        <main id="icerik" className="snap flex-1">
          {children}
        </main>
        <Footer locale={LOCALE} />
      </body>
    </html>
  );
}
