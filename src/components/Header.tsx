"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { getContent } from "@/lib/content";
import { divisionHref, href, type Locale, otherLocale, routes, ui } from "@/lib/i18n";
import { Wordmark } from "./Logo";

/**
 * Üst menü — SpaceX'teki gibi zemini olmayan, fotoğrafın üstünde duran bir
 * şerit. Arka plan rengi YOK; bulanıklık ve çubuk yok. Fotoğrafın üstünde
 * okunmasını sağlayan şey bölümün kendi karartması.
 *
 * İstemci bileşeni olmasının tek sebebi mobil menü durumu ve aktif
 * bağlantının işaretlenmesi.
 */
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = ui[locale];
  const { divisions } = getContent(locale);

  const extras = [
    { href: href(locale, "about"), label: t.about },
    { href: href(locale, "contact"), label: t.contact },
  ];

  /* Dil değiştirme: bulunduğun sayfanın diğer dildeki karşılığına gider.
     Eşleşme bulunamazsa (ör. 404) o dilin ana sayfasına düşer. */
  const other = otherLocale(locale);
  const swapped =
    Object.values(routes).find((r) => r[locale] === pathname)?.[other] ??
    (divisions.some((d) => divisionHref(locale, d.slug) === pathname)
      ? divisionHref(other, pathname.split("/").pop()!)
      : href(other, "home"));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6"
        aria-label={t.mainNav}
      >
        <Link
          href={href(locale, "home")}
          onClick={() => setOpen(false)}
          className="flex items-center"
        >
          <Wordmark height={30} priority />
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          {divisions.map((d) => {
            const path = divisionHref(locale, d.slug);
            const active = pathname === path;
            return (
              <Link
                key={d.slug}
                href={path}
                aria-current={active ? "page" : undefined}
                className={`label transition-colors ${
                  active ? "text-accent" : "text-text/80 hover:text-text"
                }`}
                lang="en"
              >
                {d.short}
              </Link>
            );
          })}
          {extras.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className={`label transition-colors ${
                pathname === l.href ? "text-accent" : "text-text/80 hover:text-text"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={swapped}
            hrefLang={other}
            aria-label={t.switchLanguageLabel}
            className="label text-text/50 hover:text-text"
            lang={other}
          >
            {t.switchLanguage}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobil-menu"
          className="label -mr-1 py-2 text-text sm:hidden"
        >
          {open ? t.close : t.menu}
        </button>
      </nav>

      {open && (
        <div id="mobil-menu" className="border-y border-line bg-bg px-6 py-4 sm:hidden">
          {divisions.map((d) => (
            <Link
              key={d.slug}
              href={divisionHref(locale, d.slug)}
              onClick={() => setOpen(false)}
              className="label block py-3 text-text/80"
              lang="en"
            >
              {d.short}
            </Link>
          ))}
          {extras.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="label block py-3 text-text/80"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={swapped}
            hrefLang={other}
            onClick={() => setOpen(false)}
            className="label block py-3 text-accent"
            lang={other}
          >
            {t.switchLanguage}
          </Link>
        </div>
      )}
    </header>
  );
}
