import Link from "next/link";
import { getContent } from "@/lib/content";
import { divisionHref, href, type Locale, ui } from "@/lib/i18n";

/**
 * İnce, büyük harf, tek satırlık alt bilgi — SpaceX'inki de böyle:
 * sayfanın altında neredeyse görünmeyen bir bağlantı şeridi, sütunlu
 * dev bir site haritası değil.
 */
export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { org, divisions } = getContent(locale);

  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-8">
        <Link href={href(locale, "home")} className="label text-dim hover:text-text" lang="en">
          {org.name}
        </Link>
        {divisions.map((d) => (
          <Link
            key={d.slug}
            href={divisionHref(locale, d.slug)}
            className="label text-dim hover:text-text"
            lang="en"
          >
            {d.short}
          </Link>
        ))}
        <Link href={href(locale, "about")} className="label text-dim hover:text-text">
          {t.about}
        </Link>
        <Link href={href(locale, "contact")} className="label text-dim hover:text-text">
          {t.contact}
        </Link>
        <Link href={href(locale, "careers")} className="label text-dim hover:text-text">
          {t.careers}
        </Link>
        <a
          href={`mailto:${org.email}`}
          className="label text-dim hover:text-text"
          lang="en"
        >
          {org.email}
        </a>
        <Link href={href(locale, "privacy")} className="label text-dim/70 hover:text-text">
          {t.privacy}
        </Link>
        <Link href={href(locale, "legal")} className="label text-dim/70 hover:text-text">
          {t.dataProtection}
        </Link>
        <span className="label ml-auto text-dim/60" lang="en">
          © {org.year} {org.name}
        </span>
      </div>
    </footer>
  );
}
