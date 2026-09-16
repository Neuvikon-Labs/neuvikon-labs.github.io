import type { Metadata } from "next";
import { AboutView } from "@/components/pages/AboutView";
import { getContent } from "@/lib/content";


export const metadata: Metadata = {
  title: "Hakkımızda",
  description: getContent("tr").about.lead,
  alternates: { canonical: "/hakkimizda", languages: { tr: "/hakkimizda", en: "/en/about" } },
};

export default function Page() {
  return <AboutView locale="tr" />;
}
