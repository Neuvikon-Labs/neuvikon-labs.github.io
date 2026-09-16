import { legalEntity } from "@/lib/content";
import { isPending, type Locale } from "@/lib/i18n";

/**
 * Hukuki metinlerin ortak kabuğu.
 *
 * Sitenin geri kalanı tam ekran bölümlerden oluşuyor ama bu sayfalar
 * okunmak için var: dar ölçü, normal satır aralığı, büyük harf yok.
 * Bir kullanım koşulunu SpaceX estetiğiyle yazmak metni okunmaz yapıyor.
 */
export function LegalPage({
  locale,
  eyebrow,
  title,
  children,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-32 sm:py-40">
      <div className="mx-auto w-full max-w-3xl px-6">
        <p className="label text-accent">{eyebrow}</p>
        <h1 className="display mt-4 text-[clamp(2.2rem,6vw,3.6rem)]">{title}</h1>
        <p className="mt-5 text-[14px] text-dim">
          {locale === "en" ? "Last updated: " : "Son güncelleme: "}
          {locale === "en" ? legalEntity.updatedEn : legalEntity.updated}
        </p>
        <div className="mt-14 space-y-12">{children}</div>
      </div>
    </section>
  );
}

/** Başlık + gövde. */
export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[1.05rem] font-medium text-text">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-dim">{children}</div>
    </section>
  );
}

/**
 * Veri sorumlusu künyesi. Doldurulmamış alanlar gizlenmiyor — hukuki bir
 * metinde eksik bilgiyi saklamak, metnin geçersiz olduğunu gizlemek olur.
 */
export function LegalEntityTable({ locale }: { locale: Locale }) {
  const labels =
    locale === "en"
      ? {
          title: "Data controller",
          address: "Address",
          mersis: "MERSIS no",
          tax: "Tax office / number",
        }
      : {
          title: "Veri sorumlusu",
          address: "Adres",
          mersis: "MERSİS no",
          tax: "Vergi dairesi / no",
        };

  const rows = [
    { label: labels.title, value: legalEntity.title },
    { label: labels.address, value: legalEntity.address },
    { label: labels.mersis, value: legalEntity.mersis },
    { label: labels.tax, value: legalEntity.taxOffice },
  ];

  return (
    <dl className="grid gap-px border-y border-line bg-line">
      {rows.map((r) => (
        <div key={r.label} className="bg-bg py-4 sm:flex sm:gap-6">
          <dt className="label text-dim sm:w-52 sm:shrink-0">{r.label}</dt>
          <dd
            className={`mt-1 text-[15px] sm:mt-0 ${
              isPending(r.value) ? "label text-dim/60" : "text-text"
            }`}
          >
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
