import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, getDivision } from "@/lib/content";
import { DivisionView } from "@/components/pages/DivisionView";

/**
 * Bölüm sayfası — üç bölümün üçü de bu tek dosyadan üretiliyor.
 * `content.ts`'e dördüncü bir bölüm eklersen sayfası kendiliğinden oluşur.
 */

const LOCALE = "en" as const;

export function generateStaticParams() {
  return getContent(LOCALE).divisions.map((d) => ({ division: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ division: string }>;
}): Promise<Metadata> {
  const { division } = await params;
  const d = getDivision(LOCALE, division);
  if (!d) return {};
  const { org } = getContent(LOCALE);
  return {
    title: d.name,
    description: d.intro,
    openGraph: { title: `${d.name} — ${org.name}`, description: d.intro },
    alternates: {
      canonical: "/en/" + division,
      languages: { tr: "/" + division, en: "/en/" + division },
    },
  };
}

export default async function DivisionPage({
  params,
}: {
  params: Promise<{ division: string }>;
}) {
  const { division } = await params;
  const d = getDivision(LOCALE, division);
  if (!d) notFound();

  return <DivisionView locale={LOCALE} d={d} />;
}
