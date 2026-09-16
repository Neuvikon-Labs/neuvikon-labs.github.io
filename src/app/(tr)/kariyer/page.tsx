import type { Metadata } from "next";
import { CareersView } from "@/components/pages/CareersView";
import { getContent } from "@/lib/content";


export const metadata: Metadata = {
  title: "Kariyer",
  description: getContent("tr").careers.lead,
  alternates: { canonical: "/kariyer", languages: { tr: "/kariyer", en: "/en/careers" } },
};

export default function Page() {
  return <CareersView locale="tr" />;
}
