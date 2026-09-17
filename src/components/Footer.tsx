import Link from "next/link";
import { getContent } from "@/lib/content";
import { divisionHref, href, type Locale, ui } from "@/lib/i18n";

/**
 * İnce, büyük harf alt bilgi — SpaceX'inki de böyle: sayfanın altında
 * neredeyse görünmeyen bir bağlantı şeridi, sütunlu dev bir site haritası
 * değil.
 *
 * Masaüstünde tek satır. Telefonda değil: on bir bağlantı tek bir
 * `flex-wrap` içine konunca üç düzensiz satıra dağılıyor ve `ml-auto` ile
 * sağa itilmiş telif satırı sarmadan sonra rastgele bir yere düşüyordu.
 * Bu yüzden mobilde bağlantılar anlamlarına göre gruplara ayrılıyor;
 * `sm:contents` ile sm ve üstünde gruplar kaybolup hepsi yine tek şeride
 * diziliyor.
 */
export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { org, divisions } = getContent(locale);

  const pages = [
    { href: href(locale, "about"), label: t.about },
    { href: href(locale, "contact"), label: t.contact },
    { href: href(locale, "careers"), label: t.careers },
  ];
  const legal = [
    { href: href(locale, "privacy"), label: t.privacy },
    { href: href(locale, "legal"), label: t.dataProtection },
  ];

  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
          <Link
            href={href(locale, "home")}
            className="label text-dim hover:text-text"
            lang="en"
          >
            {org.name}
          </Link>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:contents">
            {divisions.map((d) => (
              <li key={d.slug} className="sm:contents">
                <Link
                  href={divisionHref(locale, d.slug)}
                  className="label text-dim hover:text-text"
                  lang="en"
                >
                  {d.short}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:contents">
            {pages.map((p) => (
              <li key={p.href} className="sm:contents">
                <Link href={p.href} className="label text-dim hover:text-text">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${org.email}`}
            className="label text-dim hover:text-text"
            lang="en"
          >
            {org.email}
          </a>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:contents">
            {legal.map((l) => (
              <li key={l.href} className="sm:contents">
                <Link
                  href={l.href}
                  className="label text-dim/70 hover:text-text"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <span className="label text-dim/60 sm:ml-auto" lang="en">
            © {org.year} {org.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
