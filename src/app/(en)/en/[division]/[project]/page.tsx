import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, getProject, isPending, projectSlug, type Project } from "@/lib/content";
import { ProjectView } from "@/components/pages/ProjectView";

/**
 * Proje sayfası — `/games/pushbump` gibi. Bölüm sayfası gibi tek dosyadan
 * üretiliyor: `content.ts`'e eklenen her proje kendi sayfasını da kazanıyor.
 */

const LOCALE = "en" as const;

export function generateStaticParams() {
  return getContent(LOCALE).divisions.flatMap((d) =>
    d.projects.map((p) => ({ division: d.slug, project: projectSlug(p.name) })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ division: string; project: string }>;
}): Promise<Metadata> {
  const { division, project } = await params;
  const found = getProject(LOCALE, division, project);
  if (!found) return {};
  const description = describe(found.project);
  const { org } = getContent(LOCALE);
  const path = `/${division}/${project}`;
  return {
    title: found.project.name,
    description,
    openGraph: { title: `${found.project.name} — ${org.name}`, description },
    alternates: {
      canonical: "/en" + path,
      languages: { tr: path, en: "/en" + path },
    },
  };
}

/** Açıklaması yazılmamış projede yer tutucu metni arama sonucuna basmıyoruz. */
function describe(p: Project): string | undefined {
  return p.description ?? (isPending(p.tagline) ? undefined : p.tagline);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ division: string; project: string }>;
}) {
  const { division, project } = await params;
  const found = getProject(LOCALE, division, project);
  if (!found) notFound();

  return <ProjectView locale={LOCALE} d={found.division} p={found.project} />;
}
