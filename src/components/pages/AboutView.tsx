import Link from "next/link";
import { getContent } from "@/lib/content";
import { divisionHref, href, isPending, type Locale, ui } from "@/lib/i18n";

/**
 * Hakkımızda.
 *
 * Bir stüdyo sayfasının en kolay bozulduğu yer burası: "tutkulu ekibimizle
 * yenilikçi çözümler" cümleleri hiçbir şey anlatmıyor. Bu yüzden sayfa
 * sloganla değil, kodda karşılığı olan çalışma biçimleriyle kurulu —
 * `about.principles` içindeki her madde projelerin kendi belgelerinden
 * geliyor.
 */
export function AboutView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { org, about, divisions } = getContent(locale);

  return (
    <>
      <section className="relative flex min-h-[80svh] flex-col justify-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="label text-accent">{t.about}</p>
          <h1 className="display mt-4 max-w-[16ch] text-[clamp(2.4rem,7vw,4.6rem)]">
            {locale === "en" ? "Few things, finished" : "Az sayıda iş, sonuna kadar"}
          </h1>
          <p className="mt-6 max-w-[54ch] text-[15px] leading-relaxed text-dim">
            {about.lead}
          </p>

          {/* Kısa künye. Doldurulmamış alanlar gizlenmiyor — bir şirket
              sayfasında eksik bilgiyi saklamak, yanlış bilgi yazmakla
              aynı kapıya çıkar. */}
          <dl className="mt-12 grid max-w-3xl gap-px border-y border-line bg-line sm:grid-cols-4">
            {about.facts.map((f) => (
              <div key={f.label} className="bg-bg py-5 pr-6 sm:px-1">
                <dt className="label text-dim">{f.label}</dt>
                <dd
                  className={`mt-2 text-[15px] ${
                    isPending(f.value) ? "label text-dim/60" : "text-text"
                  }`}
                >
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* --------------------------------------------- nasıl çalışıyoruz */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="label text-accent">
            {locale === "en" ? "How we work" : "Nasıl çalışıyoruz"}
          </p>
          <div className="mt-12 grid gap-px border-y border-line bg-line sm:grid-cols-2">
            {about.principles.map((p) => (
              <div key={p.title} className="bg-bg py-8 pr-8 sm:px-1">
                <h2 className="display text-[clamp(1.2rem,2.4vw,1.6rem)]">{p.title}</h2>
                <p className="mt-4 max-w-[46ch] text-[14px] leading-relaxed text-dim">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- bölümler */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="label text-accent">
            {locale === "en" ? "Divisions" : "Bölümler"}
          </p>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {divisions.map((d) => (
              <Link key={d.slug} href={divisionHref(locale, d.slug)} className="group block">
                <h2
                  className="display text-[clamp(1.4rem,3vw,2rem)] transition-colors group-hover:text-accent"
                  lang="en"
                >
                  {d.name}
                </h2>
                <p className="mt-3 max-w-[38ch] text-[14px] leading-relaxed text-dim">
                  {d.tagline}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-16">
            <Link href={href(locale, "contact")} className="ghost-btn is-accent">
              {t.getInTouch}
            </Link>
          </div>
          <p className="mt-6 text-[14px] text-dim">
            {locale === "en" ? "Or write directly to " : "Ya da doğrudan "}
            <a href={`mailto:${org.email}`} className="text-accent hover:underline" lang="en">
              {org.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
