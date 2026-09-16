import Link from "next/link";
import { getContent, links } from "@/lib/content";
import { href, type Locale, ui } from "@/lib/i18n";

/**
 * İletişim.
 *
 * Bilinçli olarak form yok. Form için bir arka uç servisi (Formspree,
 * Resend, kendi route handler'ımız) seçilmesi gerekiyor ve bu karar
 * verilmeden konan bir form, gönderilen mesajı sessizce kaybeder —
 * çalışmayan bir formdan e-posta adresi daha dürüst.
 *
 * ⚠️ `org.email` hâlâ kişisel bir Gmail adresi. Alan adı alındığında
 * kurumsal bir adrese taşınmalı.
 */
export function ContactView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { org } = getContent(locale);

  return (
    <section className="relative flex min-h-[90svh] flex-col justify-center">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="label text-accent">{t.contact}</p>
        <h1 className="display mt-4 max-w-[14ch] text-[clamp(2.4rem,7vw,4.6rem)]">
          {t.contactTitle}
        </h1>
        <p className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-dim">
          {locale === "en"
            ? "A project idea, a collaboration or plain curiosity — all of it is welcome. We usually reply within a few working days."
            : "Proje fikri, iş birliği ya da sadece merak — hepsi için yazabilirsiniz. E-postalara genellikle birkaç iş günü içinde dönüyoruz."}
        </p>

        <div className="mt-12 grid gap-px border-y border-line bg-line sm:grid-cols-2">
          <div className="bg-bg py-8 pr-8 sm:px-1">
            <p className="label text-dim">{locale === "en" ? "Email" : "E-posta"}</p>
            <a
              href={`mailto:${org.email}`}
              className="mt-3 block text-[clamp(1.1rem,2.6vw,1.6rem)] text-text transition-colors hover:text-accent"
              lang="en"
            >
              {org.email}
            </a>
          </div>

          <div className="bg-bg py-8 pr-8 sm:px-1">
            <p className="label text-dim">{locale === "en" ? "Links" : "Bağlantılar"}</p>
            <ul className="mt-3 space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[15px] text-text transition-colors hover:text-accent"
                    lang="en"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <a href={`mailto:${org.email}`} className="ghost-btn is-accent">
            {locale === "en" ? "Send an email" : "E-posta gönder"}
          </a>
          <Link href={href(locale, "careers")} className="ghost-btn">
            {t.careers}
          </Link>
        </div>
      </div>
    </section>
  );
}
