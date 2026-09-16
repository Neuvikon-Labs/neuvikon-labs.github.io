import { getContent } from "@/lib/content";
import { type Locale, ui } from "@/lib/i18n";

/**
 * Kariyer.
 *
 * Açık pozisyon yokken sayfayı hiç açmamak da bir seçenek, ama arayan kişi
 * o zaman sitede dolaşıp boşuna arıyor. Durumu açıkça yazmak hem aramayı
 * bitiriyor hem kapıyı açık bırakıyor.
 *
 * Pozisyon açıldığında `careers.openings` dizisine bir kayıt eklemek
 * yeterli — sayfa kendiliğinden liste hâline geçiyor.
 */
export function CareersView({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { org, careers } = getContent(locale);
  const hasOpenings = careers.openings.length > 0;

  return (
    <section className="relative flex min-h-[85svh] flex-col justify-center">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="label text-accent">{t.careers}</p>
        <h1 className="display mt-4 max-w-[16ch] text-[clamp(2.4rem,7vw,4.6rem)]">
          {hasOpenings
            ? locale === "en"
              ? "Open positions"
              : "Açık pozisyonlar"
            : locale === "en"
              ? "No open positions right now"
              : "Şu an açık pozisyon yok"}
        </h1>
        <p className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-dim">
          {careers.lead}
        </p>

        {hasOpenings && (
          <div className="mt-12 grid gap-px border-y border-line bg-line">
            {careers.openings.map((o) => (
              <article key={o.title} className="bg-bg py-8 pr-8 sm:px-1">
                <p className="label text-accent" lang="en">
                  {o.division}
                </p>
                <h2 className="display mt-3 text-[clamp(1.3rem,2.8vw,1.9rem)]">
                  {o.title}
                </h2>
                <p className="mt-4 max-w-[48ch] text-[14px] leading-relaxed text-dim">
                  {o.summary}
                </p>
              </article>
            ))}
          </div>
        )}

        <div className="mt-14 max-w-[52ch]">
          <p className="label text-accent">
            {locale === "en" ? "Areas we care about" : "İlgilendiğimiz alanlar"}
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {careers.interests.map((i) => (
              <li
                key={i}
                className="border-l border-line pl-5 text-[14px] leading-relaxed text-dim"
              >
                {i}
              </li>
            ))}
          </ul>
        </div>

        <a href={`mailto:${org.email}`} className="ghost-btn is-accent mt-14">
          {locale === "en" ? "Tell us about yourself" : "Kendini anlat"}
        </a>
      </div>
    </section>
  );
}
