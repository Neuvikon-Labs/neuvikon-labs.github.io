/**
 * İki dilli site: Türkçe kökte (`/games`), İngilizce `/en` altında
 * (`/en/games`).
 *
 * Türkçeye önek verilmedi çünkü birincil kitle Türkçe ve mevcut adresler
 * korunuyor. Bunun karşılığı, adres üreten her yerde `href()` kullanmak
 * zorunda olmamız — elle `/iletisim` yazan bir bağlantı İngilizce sayfada
 * kullanıcıyı Türkçeye düşürür.
 *
 * Rotalar iki ayrı kök yerleşimle (`app/(tr)` ve `app/(en)`) kuruluyor;
 * böylece her dilin kendi `<html lang>` değeri olabiliyor.
 */

/**
 * Doldurulmayı bekleyen metin. `content.ts` ile `content.en.ts` birbirini
 * içe aktardığı için bu sabitler ikisinin de dışında, döngüye girmeyen bu
 * modülde duruyor.
 */
export const TODO = "AÇIKLAMA EKLENECEK";
export const TODO_EN = "DESCRIPTION PENDING";

/** Bir metnin henüz yazılmamış yer tutucu olup olmadığı, iki dilde de. */
export function isPending(text: string): boolean {
  return text === TODO || text === TODO_EN;
}

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

/** Sayfa yollarının dile göre karşılıkları. Slug'lar da çevriliyor. */
export const routes = {
  home: { tr: "/", en: "/en" },
  about: { tr: "/hakkimizda", en: "/en/about" },
  contact: { tr: "/iletisim", en: "/en/contact" },
  careers: { tr: "/kariyer", en: "/en/careers" },
  privacy: { tr: "/gizlilik", en: "/en/privacy" },
  legal: { tr: "/kvkk", en: "/en/data-protection" },
} as const;

export type RouteKey = keyof typeof routes;

/** Sabit bir sayfanın o dildeki adresi. */
export function href(locale: Locale, key: RouteKey): string {
  return routes[key][locale];
}

/** Bir bölümün o dildeki adresi — slug iki dilde de aynı (games/tech/robotics). */
export function divisionHref(locale: Locale, slug: string): string {
  return locale === "en" ? `/en/${slug}` : `/${slug}`;
}

/** Aynı sayfanın diğer dildeki karşılığı — dil değiştirme düğmesi için. */
export function otherLocale(locale: Locale): Locale {
  return locale === "tr" ? "en" : "tr";
}

/**
 * Arayüz metinleri.
 *
 * Proje ve bölüm açıklamaları burada değil — onlar `content.ts` ve
 * `content.en.ts` içinde. Burada yalnızca sayfa iskeletine ait, içerikten
 * bağımsız metinler var.
 */
export const ui = {
  tr: {
    skipToContent: "İçeriğe geç",
    mainNav: "Ana menü",
    menu: "Menü",
    close: "Kapat",
    about: "Hakkımızda",
    contact: "İletişim",
    careers: "Kariyer",
    privacy: "Gizlilik",
    dataProtection: "KVKK",
    divisionsCta: "Bölümler",
    scrollDown: "Aşağı kaydır",
    explore: "İncele",
    projectCount: (n: number) => `${n} proje`,
    otherDivisions: "Diğer bölümler",
    alsoWorkingOn: "Ayrıca üzerinde çalışıyoruz",
    projects: "Projeler",
    noProjects:
      "Bu bölümde yayına hazır bir proje henüz yok. Yukarıdaki alanlarda " +
      "birlikte bir şey yapmak istersen yazabilirsin.",
    getInTouch: "İletişime geç",
    contactTitle: "Birlikte bir şey yapalım",
    contactLead: "Proje fikri, iş birliği ya da sadece merak — hepsi için yazabilirsiniz.",
    notFoundTitle: "Sayfa yok",
    notFoundBody: "Aradığınız adres taşınmış ya da hiç var olmamış olabilir.",
    home: "Ana sayfa",
    switchLanguage: "English",
    switchLanguageLabel: "Switch to English",
  },
  en: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    menu: "Menu",
    close: "Close",
    about: "About",
    contact: "Contact",
    careers: "Careers",
    privacy: "Privacy",
    dataProtection: "Data protection",
    divisionsCta: "Divisions",
    scrollDown: "Scroll down",
    explore: "Explore",
    projectCount: (n: number) => (n === 1 ? "1 project" : `${n} projects`),
    otherDivisions: "Other divisions",
    alsoWorkingOn: "Also in progress",
    projects: "Projects",
    noProjects:
      "Nothing is ready to ship in this division yet. If you want to build " +
      "something in the areas above, write to us.",
    getInTouch: "Get in touch",
    contactTitle: "Let's build something",
    contactLead:
      "A project idea, a collaboration or plain curiosity — all of it is welcome.",
    notFoundTitle: "No such page",
    notFoundBody: "The address you followed has moved, or never existed.",
    home: "Home",
    switchLanguage: "Türkçe",
    switchLanguageLabel: "Türkçeye geç",
  },
} as const;

export type UI = (typeof ui)[Locale];
