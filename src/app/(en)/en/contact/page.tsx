import type { Metadata } from "next";
import { ContactView } from "@/components/pages/ContactView";
import { getContent } from "@/lib/content";


export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${getContent("en").org.name}.`,
  alternates: { canonical: "/en/contact", languages: { tr: "/iletisim", en: "/en/contact" } },
};

export default function Page() {
  return <ContactView locale="en" />;
}
