import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/Legal";
import { getContent } from "@/lib/content";

/**
 * Gizlilik politikasının İngilizcesi.
 *
 * Türkçe metnin birebir çevirisi değil ama aynı olguları anlatıyor: bu site
 * statik, form yok, çerez yazılmıyor. İki metin ayrı dosyalarda durduğu için
 * biri değişince diğeri de elden geçirilmeli.
 */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What this site collects, why, and for how long.",
  alternates: {
    canonical: "/en/privacy",
    languages: { tr: "/gizlilik", en: "/en/privacy" },
  },
};

export default function PrivacyPage() {
  const { org } = getContent("en");

  return (
    <LegalPage locale="en" eyebrow="Legal" title="Privacy Policy">
      <LegalSection title="In short">
        <p>
          This site does not track you. There is no ad network, no social
          media pixel and no profiling. You do not create an account and you do
          not fill in a form; the site is a set of pre-rendered pages.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          This site writes no cookies to your browser. Because there are no
          session, preference or advertising cookies, there is no consent
          banner either.
        </p>
        <p>
          A cookieless counter that collects no personal data (Plausible
          Analytics) may be used to measure visits. It does not identify
          individual visitors, does not track across devices and does not share
          what it collects with third parties.
        </p>
      </LegalSection>

      <LegalSection title="Externally loaded resources">
        <p>
          Fonts are served from this site&apos;s own origin; opening a page
          sends no request to Google Fonts. Images and logos come from the same
          domain.
        </p>
      </LegalSection>

      <LegalSection title="When you send an email">
        <p>
          When you write to{" "}
          <a href={`mailto:${org.email}`} className="text-accent hover:underline">
            {org.email}
          </a>
          , your message and anything in it is stored on our email
          provider&apos;s servers. We use it only to reply to you; we do not add
          you to a mailing list and we do not share it with third parties.
        </p>
      </LegalSection>

      <LegalSection title="Server logs">
        <p>
          Our hosting provider may keep standard access logs for security and
          error tracking: IP address, browser information, the page requested
          and a timestamp. These logs are not read for advertising or analytics.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          When this text changes, the date at the top of the page is updated. A
          significant change is announced on the home page.
        </p>
      </LegalSection>

      <LegalSection title="Related">
        <p>
          For your rights over your personal data and the data controller
          identity, see the{" "}
          <Link href="/en/data-protection" className="text-accent hover:underline">
            Data Protection Notice
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
