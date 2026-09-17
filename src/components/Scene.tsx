import Image from "next/image";

/**
 * Tam ekran bölüm — sitenin tek yapı taşı.
 *
 * SpaceX'in sayfası baştan sona bunun tekrarı: bir fotoğraf, üstünde
 * alttan yukarı karartma, sola dayalı kısa bir metin bloğu ve içi boş
 * bir düğme. Her bölümü elle yazmak yerine tek bileşen yaptım; böylece
 * hepsinin kenar boşluğu, satır aralığı ve düğme yeri aynı.
 *
 * Görsel yoksa bölüm düz siyah kalıyor — kırık görsel kutusu göstermek
 * yerine sessizce siyah, SpaceX'in tonuna da uyuyor.
 */
export function Scene({
  image,
  eyebrow,
  title,
  lead,
  children,
  /** Görseli arka planı kaplayacak şekilde mi yoksa ortada nesne gibi mi
   *  göstereceğiz? Uygulama ikonları kare olduğu için kaplatmak onları
   *  bozuyor; o yüzden ikonlar "object" modunda gösteriliyor. */
  mode = "cover",
  first = false,
  eyebrowLang,
}: {
  image?: string;
  eyebrow?: string;
  /** Üst satır bazen Türkçe ("Geliştirmede"), bazen İngilizce ("Games").
   *  Büyük harfe çevirme dile duyarlı olduğu için hangisi olduğunu
   *  söylemek gerekiyor — bkz. `termLang` açıklaması. */
  eyebrowLang?: "en";
  title: string;
  lead?: string;
  children?: React.ReactNode;
  mode?: "cover" | "object";
  first?: boolean;
}) {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden sm:justify-end">
      {image && mode === "cover" && (
        <Image
          src={image}
          alt=""
          fill
          priority={first}
          sizes="100vw"
          className="object-cover"
        />
      )}

      {image && mode === "object" && (
        <>
          {/* Arkada aynı görselin büyütülüp bulanıklaştırılmış hali:
              kare bir ikondan tam ekran bir zemin çıkarmanın en dürüst
              yolu — uydurma bir fotoğraf koymaktansa. */}
          <Image
            src={image}
            alt=""
            fill
            priority={first}
            sizes="100vw"
            className="scale-150 object-cover opacity-35 blur-3xl"
          />
          {/* Telefonda ikon akışın içinde, metnin üstünde duruyor; sm ve
              üstünde ekranın ortasına sabitlenip metin altına iniyor.
              Mobilde de sabitlemek, kısa ekranlarda ikonu başlığın üstüne
              bindiriyordu — karartma okunurluğu kurtarsa da sıkışık
              görünüyordu. */}
          <div className="pointer-events-none relative mx-auto flex justify-center pb-6 pt-28 sm:absolute sm:inset-0 sm:items-center sm:p-0 sm:pb-40">
            {/* CSS boyutu 38vh'ye kadar çıkabiliyor; uzun ekranlarda bu 400
                CSS pikselini geçiyor ve 2x ekranda 800 fiziksel piksel demek.
                `width` bilerek gösterim boyutundan büyük — next/image srcset'i
                bunun 1x/2x'i olarak ürettiği için ikon ölçeklenip bulanmıyor. */}
            <Image
              src={image}
              alt=""
              width={512}
              height={512}
              quality={95}
              priority={first}
              sizes="(max-width: 640px) 60vw, 420px"
              className="h-[min(24vh,160px)] w-auto rounded-[22%] shadow-[0_30px_80px_rgb(0_0_0/0.6)] sm:h-[min(38vh,320px)]"
            />
          </div>
        </>
      )}

      <div
        className="scrim pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-6 sm:pb-28 sm:pt-40">
        {eyebrow && (
          <p className="label text-accent" lang={eyebrowLang}>
            {eyebrow}
          </p>
        )}
        {/* Başlık her zaman bir marka adı — "Neuvikon", "Unity" gibi. */}
        <h2
          className="display mt-4 max-w-[16ch] text-[clamp(2.4rem,7vw,5rem)]"
          lang="en"
        >
          {title}
        </h2>
        {lead && (
          <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-dim">
            {lead}
          </p>
        )}
        {children && (
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
