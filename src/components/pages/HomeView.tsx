import Link from "next/link";
import { getContent } from "@/lib/content";
import { divisionHref, href, type Locale, ui } from "@/lib/i18n";
import { Scene } from "@/components/Scene";
import { Wordmark } from "@/components/Logo";

/**
 * Ana sayfa: bir açılış ekranı + her bölüm için bir tam ekran bölüm.
 * SpaceX'in ana sayfası da tam olarak bu — üst üste dizilmiş, her biri
 * tek bir şeyi anlatan ekranlar.
 *
 * Türkçe ve İngilizce sayfalar bu tek bileşenden basılıyor; fark yalnızca
 * `locale`.
 */
export function HomeView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { org, divisions } = getContent(locale);

  return (
    <>
      {/* -------------------------------------------------- açılış ekranı */}
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
        {/* Açılışta fotoğraf yok: logo tek başına duruyor. Elde gerçek bir
            stüdyo fotoğrafı olmadan sahte bir görsel koymaktansa siyahın
            üstünde imza daha dürüst — ve SpaceX'in sessizliğine de uyuyor. */}
        <div className="relative mx-auto w-full max-w-6xl px-6">
          <Wordmark height={132} priority className="!h-[clamp(72px,13vw,150px)]" />
          <p className="display mt-10 max-w-[18ch] text-[clamp(1.9rem,5vw,3.4rem)] text-text">
            {locale === "en" ? "Software, games and robotics" : "Yazılım, oyun ve robotik"}
          </p>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-dim">
            {org.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="#games" className="ghost-btn is-accent">
              {t.divisionsCta}
            </Link>
            <Link href={href(locale, "contact")} className="ghost-btn">
              {t.contact}
            </Link>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="label absolute inset-x-0 bottom-8 text-center text-dim"
        >
          {t.scrollDown}
        </span>
      </section>

      {/* ------------------------------------------- her bölüm için bir ekran */}
      {divisions.map((d) => (
        <div key={d.slug} id={d.slug}>
          <Scene
            image={d.image}
            mode="object"
            eyebrow={d.short}
            eyebrowLang="en"
            title={d.name}
            lead={d.tagline}
          >
            <Link href={divisionHref(locale, d.slug)} className="ghost-btn">
              {t.explore}
            </Link>
            <span className="label text-dim">{t.projectCount(d.projects.length)}</span>
          </Scene>
        </div>
      ))}

      {/* ------------------------------------------------------- iletişim */}
      <section className="relative flex min-h-[70svh] flex-col justify-center border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="label text-accent">{t.contact}</p>
          <h2 className="display mt-4 max-w-[14ch] text-[clamp(2.2rem,6vw,4.2rem)]">
            {t.contactTitle}
          </h2>
          <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-dim">
            {t.contactLead}
          </p>
          <a href={`mailto:${org.email}`} className="ghost-btn is-accent mt-9" lang="en">
            {org.email}
          </a>
        </div>
      </section>
    </>
  );
}
