import Image from "next/image";
import Link from "next/link";
import {
  getContent,
  projectHref,
  termLang,
  type Division,
  type Project,
} from "@/lib/content";
import { divisionHref, href, isPending, type Locale, ui } from "@/lib/i18n";

/**
 * Tek bir projenin sayfası. Dört bölümün ve iki dilin tamamı bu bileşenden
 * üretiliyor — bölüm sayfasıyla aynı mantık.
 *
 * Uygulama içi görseller `project.media` içinden geliyor. Çoğu projede henüz
 * boş; o zaman sayfa uydurma bir şey göstermek yerine alanın boş olduğunu
 * yazıyor. Görsel çekildiğinde `content.ts`'e bir satır eklemek yetiyor.
 */
export function ProjectView({
  locale,
  d,
  p,
}: {
  locale: Locale;
  d: Division;
  p: Project;
}) {
  const t = ui[locale];
  const { statusLabel } = getContent(locale);
  const others = d.projects.filter((x) => x.name !== p.name).slice(0, 6);

  return (
    <>
      {/* ---------------------------------------------------- açılış ekranı */}
      <section className="relative flex min-h-[80svh] flex-col justify-center py-28 sm:py-24 overflow-hidden">
        {p.image && (
          <Image
            src={p.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-150 object-cover opacity-30 blur-3xl"
          />
        )}
        <div
          className="scrim pointer-events-none absolute inset-0"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6">
          <Link
            href={divisionHref(locale, d.slug)}
            className="label text-accent underline-offset-4 hover:underline"
          >
            ← {t.backToDivision(d.name)}
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            {p.image && (
              <Image
                src={p.image}
                alt=""
                width={512}
                height={512}
                quality={95}
                priority
                sizes="(max-width: 640px) 34vw, 180px"
                className="h-[clamp(5rem,18vw,9rem)] w-auto rounded-[22%] shadow-[0_30px_80px_rgb(0_0_0/0.6)]"
              />
            )}
            <div>
              <p className="label text-accent">{statusLabel[p.status]}</p>
              <h1
                className="display mt-3 text-[clamp(2.2rem,6vw,4.2rem)]"
                lang="en"
              >
                {p.name}
              </h1>
            </div>
          </div>

          {!isPending(p.tagline) && (
            <p className="mt-8 max-w-[52ch] text-[15px] leading-relaxed text-dim">
              {p.tagline}
            </p>
          )}
          {p.description && (
            <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-dim">
              {p.description}
            </p>
          )}

          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2">
            {p.tags.map((tag) => (
              <li key={tag} className="label text-dim" lang={termLang(tag)}>
                {tag}
              </li>
            ))}
          </ul>

          {p.links && (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {p.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label text-accent underline-offset-4 hover:underline"
                    lang="en"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ------------------------------------------- uygulama içi görseller */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="label text-accent">{t.media}</p>

          {p.media && p.media.length > 0 ? (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {p.media.map((m) => (
                <li
                  key={m.src}
                  className="overflow-hidden rounded-xl border border-line bg-bg"
                >
                  {m.kind === "video" ? (
                    /* Otomatik oynatma yok: sayfada altı görsel birden
                       oynarsa hem dikkat dağılıyor hem de mobil veriyi
                       tüketiyor. Denetimler kullanıcıda. */
                    <video
                      src={m.src}
                      poster={m.poster}
                      controls
                      playsInline
                      preload="metadata"
                      className="h-auto w-full"
                    />
                  ) : (
                    <Image
                      src={m.src}
                      alt={m.alt ?? ""}
                      width={1080}
                      height={1920}
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className="h-auto w-full"
                    />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-dim">
              {t.mediaPending}
            </p>
          )}
        </div>
      </section>

      {/* ------------------------------------------ aynı bölümdeki projeler */}
      {others.length > 0 && (
        <section className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="label text-accent">{t.projects}</p>
            <ul className="mt-10 grid gap-px border-y border-line bg-line sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.name} className="bg-bg">
                  <Link
                    href={projectHref(locale, d.slug, o.name)}
                    className="group block py-6 pr-6 sm:px-1"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-4">
                      <h2
                        className="display text-[clamp(1.2rem,2.4vw,1.6rem)] transition-colors group-hover:text-accent"
                        lang="en"
                      >
                        {o.name}
                      </h2>
                      <span className="label text-accent">
                        {statusLabel[o.status]}
                      </span>
                    </div>
                    {!isPending(o.tagline) && (
                      <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-dim">
                        {o.tagline}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={href(locale, "contact")}
              className="ghost-btn is-accent mt-12"
            >
              {t.getInTouch}
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
