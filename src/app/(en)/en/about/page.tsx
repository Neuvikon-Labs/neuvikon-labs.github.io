import type { Metadata } from "next";
import { AboutView } from "@/components/pages/AboutView";
import { getContent } from "@/lib/content";


export const metadata: Metadata = {
  title: "About",
  description: getContent("en").about.lead,
  alternates: { canonical: "/en/about", languages: { tr: "/hakkimizda", en: "/en/about" } },
};

export default function Page() {
  return <AboutView locale="en" />;
}
