import type { Metadata } from "next";
import { CareersView } from "@/components/pages/CareersView";
import { getContent } from "@/lib/content";


export const metadata: Metadata = {
  title: "Careers",
  description: getContent("en").careers.lead,
  alternates: { canonical: "/en/careers", languages: { tr: "/kariyer", en: "/en/careers" } },
};

export default function Page() {
  return <CareersView locale="en" />;
}
