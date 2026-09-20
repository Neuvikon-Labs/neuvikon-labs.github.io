import type { MetadataRoute } from "next";
import { getContent, projectSlug, SITE_URL } from "@/lib/content";
import { locales, routes, type RouteKey } from "@/lib/i18n";

/**
 * Site haritası, iki dilin tamamını kapsıyor.
 *
 * Her kaydın `alternates.languages` alanı var: Google'a "bu iki adres aynı
 * sayfanın iki dili" demek, birini diğerinin kopyası saymasını engelliyor.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticKeys = Object.keys(routes) as RouteKey[];

  const pages = staticKeys.map((key) => ({
    key,
    priority: key === "home" ? 1 : 0.6,
    changeFrequency: (key === "home" ? "monthly" : "yearly") as "monthly" | "yearly",
  }));

  const entries: MetadataRoute.Sitemap = [];

  for (const { key, priority, changeFrequency } of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}${routes[key][locale]}`,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            tr: `${SITE_URL}${routes[key].tr}`,
            en: `${SITE_URL}${routes[key].en}`,
          },
        },
      });
    }
  }

  for (const d of getContent("tr").divisions) {
    for (const locale of locales) {
      entries.push({
        url: locale === "en" ? `${SITE_URL}/en/${d.slug}` : `${SITE_URL}/${d.slug}`,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            tr: `${SITE_URL}/${d.slug}`,
            en: `${SITE_URL}/en/${d.slug}`,
          },
        },
      });
    }
  }

  /* Her projenin kendi sayfası da haritada: bölüm sayfasından bağlanıyorlar
     ama arama motoruna ayrıca söylemek, yeni eklenen bir projenin fark
     edilmesini hızlandırıyor. */
  for (const d of getContent("tr").divisions) {
    for (const project of d.projects) {
      const path = `/${d.slug}/${projectSlug(project.name)}`;
      for (const locale of locales) {
        entries.push({
          url: locale === "en" ? `${SITE_URL}/en${path}` : `${SITE_URL}${path}`,
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: {
            languages: { tr: `${SITE_URL}${path}`, en: `${SITE_URL}/en${path}` },
          },
        });
      }
    }
  }

  return entries;
}

/* Statik dışa aktarımda (`output: "export"`) Next bu iki rotayı da önceden
   üretilmiş dosya olarak istiyor. Normal derlemede de zaten statikler, o
   yüzden satır her iki durumda da doğru. */
export const dynamic = "force-static";
