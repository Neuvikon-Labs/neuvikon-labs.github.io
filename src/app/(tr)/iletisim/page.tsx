import type { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";
import { getContent } from "@/lib/content";


export const metadata: Metadata = {
  title: "İletişim",
  description: `${getContent("tr").org.name} ile iletişime geçin.`,
  alternates: { canonical: "/iletisim", languages: { tr: "/iletisim", en: "/en/contact" } },
};

export default function Page() {
  return <ContactView locale="tr" />;
}
