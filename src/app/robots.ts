import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

/* Statik dışa aktarımda (`output: "export"`) Next bu iki rotayı da önceden
   üretilmiş dosya olarak istiyor. Normal derlemede de zaten statikler, o
   yüzden satır her iki durumda da doğru. */
export const dynamic = "force-static";
