import Link from "next/link";
import { getContent, projectHref, termLang, type Division } from "@/lib/content";
import { divisionHref, href, isPending, type Locale, ui } from "@/lib/i18n";
import { Scene } from "@/components/Scene";
import { DivisionLogo } from "@/components/DivisionLogo";
import { divisionLogos } from "@/lib/division-logos";

/**
 * Bölüm sayfası. Üç bölümün üçü ve iki dilin ikisi de bu tek bileşenden
 * üretiliyor.
 */
export function DivisionView({ locale, d }: { locale: Locale; d: Division }) {
  const t = ui[locale];
  const { divisions, statusLabel } = getContent(locale);
  const others = divisions.filter((x) => x.slug !== d.slug);

  /* Metni yazılmış projeler tam ekran alır; henüz yazılmamışlar aşağıdaki
     kısa listeye düşer. Bir projeye metin eklendiği anda kendiliğinden
     yukarı, tam ekrana taşınıyor. `featured` bu kararı elle ezebiliyor. */
  const isBig = (p: Division["projects"][number]) =>
    p.featured ?? !isPending(p.tagline);
  const featured = d.projects.filter(isBig);
  const quiet = d.projects.filter((p) => !isBig(p));

  return (
    <>
      {/* ---------------------------------------------------- açılış ekranı */}
      <section className="relative flex min-h-[100svh] flex-col justify-center py-28 sm:py-24 overflow-hidden">
        <div className="relative mx-auto w-full max-w-6xl px-6">
          <p className="label text-accent" lang="en">
            {d.short}
          </p>
          {/* Logosu olan bölümde başlık logonun kendisi; olmayanda yazı.
              İkisini birden basmak adı iki kez göstermek olurdu. */}
          {divisionLogos[d.slug] ? (
            <h1 className="mt-6">
              <DivisionLogo
                slug={d.slug}
                priority
                className="h-auto w-[min(88vw,32rem)]"
              />
            </h1>
          ) : (
            <h1
              className="display mt-4 max-w-[14ch] text-[clamp(2.6rem,8vw,5.5rem)]"
              lang="en"
            >
              {d.name}
            </h1>
          )}
          <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-dim">
            {d.intro}
          </p>

          {/* Yetenekler: kart değil, numarasız bir liste. Bunlar bir sıra
              değil, eşit ağırlıkta maddeler. */}
          <ul className="mt-12 grid max-w-3xl gap-px border-y border-line bg-line sm:grid-cols-2">
            {d.capabilities.map((c) => (
              <li
                key={c}
                className="bg-bg py-4 pr-6 text-[14px] leading-relaxed text-dim sm:px-1"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------ anlatacak sözü olan her proje bir ekran alır */}
      {featured.map((p) => (
        <Scene
          key={p.name}
          image={p.image}
          mode="object"
          eyebrow={statusLabel[p.status]}
          title={p.name}
          titleHref={projectHref(locale, d.slug, p.name)}
          lead={isPending(p.tagline) ? undefined : p.tagline}
        >
          {/* `featured` ile öne alınmış ama metni henüz yazılmamış projeler
              burada gri bir yer tutucuyla duruyor — uydurma cümle yazmaktansa
              eksik olduğu görünsün. */}
          {p.description ? (
            <p className="max-w-[46ch] text-[14px] leading-relaxed text-dim">
              {p.description}
            </p>
          ) : (
            isPending(p.tagline) && (
              <span className="label text-dim/60">{p.tagline}</span>
            )
          )}
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {p.tags.map((tag) => (
              <li key={tag} className="label text-dim" lang={termLang(tag)}>
                {tag}
              </li>
            ))}
          </ul>
          {/* Mağaza ve site bağlantıları. İçi boş düğme yerine altı çizili
              bağlantı: bir ekranda iki ghost-btn yan yana durunca hangisinin
              asıl eylem olduğu kayboluyordu. */}
          {p.links && (
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
          {/* Projenin kendi sayfası: uygulama içi görseller ve videolar
              orada duruyor. Dış bağlantılar mağazaya gidiyor, bu ise
              sitenin içinde kalıyor — o yüzden düğme, altı çizili bağlantı
              değil. */}
          <Link
            href={projectHref(locale, d.slug, p.name)}
            className="ghost-btn is-accent"
          >
            {t.explore}
          </Link>
        </Scene>
      ))}

      {/* Henüz metni yazılmamış projeler. Bunlara da tam ekran vermek her
          birini boş bir ekrana çeviriyordu. Uydurma metin yazmak yerine
          ölçeği küçülttüm: sadece adları ve teknolojileri — eksik ama dürüst. */}
      {quiet.length > 0 && (
        <section className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="label text-accent">{t.alsoWorkingOn}</p>
            <ul className="mt-10 grid gap-px border-y border-line bg-line sm:grid-cols-2">
              {quiet.map((p) => (
                <li key={p.name} className="bg-bg py-6 pr-6 sm:px-1">
                  <div className="flex flex-wrap items-baseline gap-x-4">
                    <h2
                      className="display text-[clamp(1.2rem,2.4vw,1.6rem)]"
                      lang="en"
                    >
                      <Link
                        href={projectHref(locale, d.slug, p.name)}
                        className="transition-colors hover:text-accent"
                      >
                        {p.name}
                      </Link>
                    </h2>
                    <span className="label text-accent">
                      {statusLabel[p.status]}
                    </span>
                  </div>
                  {p.description && (
                    <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-dim">
                      {p.description}
                    </p>
                  )}
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {p.tags.map((tag) => (
                      <li
                        key={tag}
                        className="label text-dim/70"
                        lang={termLang(tag)}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  {p.links && (
                    <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
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
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Bölümün hiç projesi yoksa sayfayı burada bitirmek terk edilmişlik
          hissi veriyordu; durumu açıkça yazmak daha iyi. */}
      {d.projects.length === 0 && (
        <section className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="label text-accent">{t.projects}</p>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-dim">
              {t.noProjects}
            </p>
            <Link
              href={href(locale, "contact")}
              className="ghost-btn is-accent mt-9"
            >
              {t.getInTouch}
            </Link>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------- diğer bölümler */}
      <section className="relative flex min-h-[60svh] flex-col justify-center py-28 sm:py-24 border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="label text-accent">{t.otherDivisions}</p>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={divisionHref(locale, o.slug)}
                className="group block"
              >
                <h2
                  className="display text-[clamp(1.6rem,3.4vw,2.4rem)] transition-colors group-hover:text-accent"
                  lang="en"
                >
                  {o.name}
                </h2>
                <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-dim">
                  {o.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
