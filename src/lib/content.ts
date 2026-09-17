import { type Locale, TODO, TODO_EN } from "./i18n";
import {
  aboutEn,
  careersEn,
  divisionsEn,
  orgEn,
  statusLabelEn,
} from "./content.en";

/**
 * Sitenin TÜRKÇE içerik kaynağı; İngilizcesi `content.en.ts` içinde.
 *
 * Sayfalar bu dosyadan üretilir — yeni bir proje eklemek için JSX'e değil
 * buraya dokunursun. Bölüm eklemek/çıkarmak da aynı şekilde: `divisions`
 * dizisine bir kayıt ekle; menü, ana sayfadaki tam ekran bölüm ve /slug
 * sayfası kendiliğinden oluşur.
 *
 * ⚠️ `tagline: TODO` olan her kayıt doldurulmayı bekliyor. Uydurma açıklama
 * yazmadım — gerçek bilgi gelene kadar sayfada da açıkça yer tutucu olarak
 * görünüyorlar. Yayına çıkmadan önce bu dosyada "TODO" araması yap.
 */

/** Yer tutucular `i18n.ts` içinde; buradan da erişilebilsin diye yeniden veriliyor. */
export { isPending, TODO, TODO_EN } from "./i18n";

export type ProjectStatus = "yayinda" | "gelistirme" | "taslak";

export type Project = {
  name: string;
  /** Tam ekran bölümde başlığın altındaki tek satır. */
  tagline: string;
  description?: string;
  status: ProjectStatus;
  tags: string[];
  /** public/ altındaki görsel yolu. Şimdilik uygulama ikonu; ekran
   *  görüntüsü geldiğinde bu satırı değiştirmek yeterli. */
  image?: string;
  /** Projenin gidilebilecek adresleri: mağaza sayfası, canlı site, depo.
   *  Tek bir `href` yetmiyordu — GuessFast iki mağazada birden. */
  links?: ProjectLink[];
  /**
   * Bölüm sayfasında tam ekran mı görünsün?
   *
   * Varsayılan davranış metne bakıyor: bir satırı yazılmış proje tam ekran
   * alır, yazılmamış olan alttaki kısa listeye düşer. Bu alan o kararı elle
   * eziyor — metni henüz yazılmamış ama öne çıkması istenen projeler için.
   */
  featured?: boolean;
};

/** Etiketler marka adı olduğu için iki dilde de aynı yazılıyor. */
export type ProjectLink = { label: string; href: string };

export type Division = {
  slug: string;
  name: string;
  short: string;
  /** Tam ekran bölümde görünen tek cümle. */
  tagline: string;
  /** Bölüm sayfasının giriş paragrafı. */
  intro: string;
  capabilities: string[];
  projects: Project[];
  /** Bölümün kapak görseli. */
  image?: string;
};

/**
 * Sitenin canlı adresi. `metadataBase`, `sitemap.ts`, `robots.ts` ve JSON-LD
 * bu tek değerden besleniyor — dört yerde ayrı ayrı yazılınca biri mutlaka
 * geride kalıyordu.
 *
 * Şimdilik GitHub Pages adresi. Kendi alan adı alındığında değiştirilecek
 * tek yer burası; dağıtım sırasında `NEXT_PUBLIC_SITE_URL` ile de ezilebilir,
 * böylece önizleme dağıtımları canlı adresi kendine mal etmiyor.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://neuvikon-labs.github.io";

export type Org = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  year: number;
};

export type About = {
  lead: string;
  principles: { title: string; body: string }[];
  facts: { label: string; value: string }[];
  /** Ekipteki kişiler. Rol yazmıyoruz — küçük bir stüdyoda herkes birden
   *  fazla iş yapıyor ve uydurma unvanlar sahte bir hiyerarşi kuruyor. */
  team: string[];
};

export type Careers = {
  lead: string;
  openings: { title: string; division: string; summary: string }[];
  interests: string[];
};

export const org: Org = {
  name: "Neuvikon",
  tagline: "Yazılım, oyun ve robotik üzerine çalışan bağımsız bir teknoloji stüdyosu.",
  description:
    "Neuvikon; ürün geliştirme, mobil oyun ve gömülü sistemler alanlarında " +
    "çalışan bağımsız bir teknoloji stüdyosudur. Üç bölümde topladığımız işleri " +
    "uçtan uca kendimiz tasarlar, yazar ve yayınlarız.",
  email: "neuvikon@gmail.com",
  year: 2026,
};

export const divisions: Division[] = [
  {
    slug: "games",
    name: "Neuvikon Games",
    short: "Games",
    tagline: "Mobil oyunlar; çok oyunculu ve tek oturumda oynanan.",
    image: "/apps/pushbump.png",
    intro:
      "Games bölümü mobil için kısa oturumlu, öğrenmesi birkaç saniye süren " +
      "ama ustalaşması uzun süren oyunlar üretiyor. Tasarımdan ağ katmanına, " +
      "görsellerden mağaza yayınına kadar her aşama stüdyo içinde yapılıyor.",
    capabilities: [
      "Unity 6 ile mobil oyun geliştirme — URP 2D, Input System",
      "Çok oyunculu ağ mimarisi — Netcode for GameObjects, Mirror, Unity Relay",
      "React Native + Expo ile mobil oyun; Firestore oda senkronizasyonu",
      "Prosedürel görsel ve ses üretimi, kodla kurulan arayüz",
      "Sunucu yetkili kural motorları, eşleştirme ve MMR/ELO",
      "Erişilebilirlik, çift dil (TR/EN) ve mağaza yayın süreçleri",
    ],
    projects: [
      {
        name: "PushBump",
        tagline: "Eğ, doldur, bırak. Tek itiş her şeyi değiştirir.",
        description:
          "Çevrimiçi çok oyunculu mobil arena oyunu. Telefonu eğerek hareket " +
          "eder, atışını doldurup bırakırsın. Her biri farklı silah ve " +
          "yeteneğe sahip karakterler, dört arena, bot modu ve savunma modu.",
        status: "gelistirme",
        tags: ["Unity", "Mirror", "Android", "Çok oyunculu"],
        image: "/apps/pushbump.png",
      },
      {
        name: "Neu-Pummel Party",
        tagline: "İki ila sekiz telefon, otuz mini oyun, tek oda.",
        description:
          "Telefonlarla oynanan parti oyunu. Biri oda kurar, herkes aynı " +
          "Wi-Fi'deki listeden katılır — IP yazmak yok, hesap açmak yok; " +
          "internet üzerinden oynamak için altı haneli oda kodu var. Her " +
          "turda otuz mini oyundan biri gelir, her birinin üç arena varyantı " +
          "ve bot yapay zekâsı vardır. Depoda tek bir ikili sanat varlığı " +
          "yok: tüm görseller ve sesler çalışma anında kodla üretiliyor. " +
          "Takım modu, Grand Prix, renk körü paleti ve hareket azaltma " +
          "seçenekleri var; reklam ve uygulama içi satın alma yok.",
        status: "gelistirme",
        tags: ["Unity 6", "Netcode for GameObjects", "Android", "2-8 oyuncu"],
        image: "/apps/neuparty.png",
      },
      {
        name: "UnderCard",
        tagline: "Elin en düşükse çağır. Değilse kaybettin.",
        description:
          "Cabo tarzı, gerçek zamanlı çok oyunculu mobil kart oyunu. 2-8 " +
          "oyuncu dört haneli oda kodu ya da davet linkiyle katılır; oda " +
          "durumu Firestore üzerinden eşitlenir. Üç zorlukta bot rakip ve " +
          "tamamen cihazda çalışan çevrimdışı mod, yeniden bağlanma, yetenek " +
          "ve olay kartları, üç tema ve iki dil.",
        status: "gelistirme",
        tags: ["React Native", "Expo", "Firebase", "2-8 oyuncu"],
        image: "/apps/undercard.png",
      },
      {
        name: "EdgeOut",
        tagline: "Rakibinin altı küresini tahtadan dışarı it.",
        description:
          "Abalone kural setiyle oynanan, altıgen tahtada rekabetçi çevrimiçi " +
          "itme stratejisi oyunu. Kural motoru istemci ve sunucuda aynı kodu " +
          "paylaşıyor: istemci hamleyi anında önizliyor, sunucu doğrulayıp " +
          "yayınlıyor — hile sunucu duvarını aşamıyor. MMR penceresiyle " +
          "genişleyen eşleştirme kuyruğu, rütbe merdiveni, tur sayacı, " +
          "yeniden bağlanma süresi ve pratik için bot rakip.",
        status: "gelistirme",
        tags: ["TypeScript", "Node.js", "WebSocket", "Çok oyunculu"],
        image: "/apps/edgeout.png",
      },
      {
        name: "GuessFast",
        tagline: "Sayıyı bul. Hızlı bul.",
        description:
          "Sayı tahmin oyunu. Her tahmin seni doğruya biraz daha yaklaştırır; " +
          "mesele kaç denemede değil, ne kadar sürede bulduğun.",
        status: "yayinda",
        tags: ["React Native", "Expo", "Android", "Bulmaca"],
        image: "/apps/guessfast.png",
        links: [
          {
            label: "Google Play",
            href: "https://play.google.com/store/apps/details?id=com.scientist001.GuessFast",
          },
          {
            label: "App Store",
            href: "https://apps.apple.com/ng/app/guessfast/id6758861605",
          },
        ],
      },
      {
        name: "Card Wars",
        tagline: "Hat tabanlı kart savaşı; 1v1 ya da 2v2.",
        description:
          "Hat (lane) tabanlı kart savaşı oyunu. Oyun açılışta kendini kurar " +
          "— boş bir sahnede bile çalışır, böylece sahne dosyası bozulsa bile " +
          "her şey sürüm kontrolünde metin olarak durur. 2v2'de her oyuncunun " +
          "tek bir karşısı vardır ve takım ancak tüm üyeleri düşünce kaybeder; " +
          "bu da müttefiki ayakta tutmayı anlamlı bir karar hâline getirir.",
        status: "gelistirme",
        tags: ["Unity 6", "Kart oyunu", "2v2"],
      },
      {
        name: "Today's Word",
        /* ⚠️ Metin geçici; görsel oyunun kendi ikonu. */
        tagline: "Günün kelimesi.",
        description:
          "Kelime bulmaca oyunu. Tasarımı sürüyor; kurallar ve ekran "
          + "görüntüleri yayına hazır olduğunda eklenecek.",
        image: "/apps/todays-word.jpg",
        status: "gelistirme",
        tags: ["Kelime oyunu"],
      },
      {
        name: "Timber Supply & Co",
        /* ⚠️ Metin geçici; görsel oyunun kendi sanatı. */
        tagline: "Kes, taşı, sat. Zincirin tamamı sende.",
        description:
          "Kereste tedarik zinciri üzerine kurulu yönetim oyunu. Ayrıntılar "
          + "yayına hazır olduğunda eklenecek.",
        image: "/apps/timber-supply.jpg",
        status: "gelistirme",
        tags: ["Yönetim"],
      },
      {
        name: "Muavin-Sim",
        /* ⚠️ Geçici: ad ve etiketten çıkarılmış, doğrulanmamış metin. */
        tagline: "Direksiyonda değilsin — kapıdasın.",
        description:
          "Otobüs muavinliği üzerine simülasyon oyunu. Ayrıntılar yayına "
          + "hazır olduğunda eklenecek.",
        image: "/apps/muavin-sim.png",
        status: "gelistirme",
        tags: ["Simülasyon"],
      },
      {
        name: "Duskfield",
        /* ⚠️ Geçici: ad ve etiketten çıkarılmış, doğrulanmamış metin. */
        tagline: "Alacakaranlıkta geçen bir dünya.",
        description:
          "Arka uç tarafı Bun ile yazılıyor. Oyunun kendisine dair ayrıntılar " +
          "yayına hazır olduğunda eklenecek.",
        image: "/apps/duskfield.png",
        status: "gelistirme",
        tags: ["Bun", "TypeScript"],
      },
    ],
  },
  {
    slug: "tech",
    name: "Neuvikon Tech",
    short: "Tech",
    tagline: "Web ve mobil ürünler, arka uç altyapısı.",
    image: "/apps/eclosion.png",
    intro:
      "Tech tarafında ürünün tamamını üstleniyoruz: arayüz, sunucu, veri ve " +
      "dağıtım. Küçük ekiple çalıştığımız için karmaşıklığı baştan " +
      "sınırlamayı, çalışan bir sürümü erken çıkarmayı tercih ediyoruz.",
    capabilities: [
      "Web uygulamaları — TypeScript, React, Next.js, Angular",
      "Mobil uygulamalar — React Native, Expo",
      "Arka uç ve gerçek zamanlı servisler — Node.js, Bun, Firebase",
      "Veri toplama, puanlama ve rapor üretimi — Python",
      "Bilgisayarlı görü ve hareketle etkileşim",
      "CI/CD, sürüm yönetimi ve mağaza yayın süreçleri",
    ],
    projects: [
      {
        name: "Neuvikon Web",
        tagline: "Bu site.",
        description:
          "Next.js App Router, TypeScript ve Tailwind ile yazılmış statik " +
          "kurumsal site. İçerik tek bir veri dosyasından üretiliyor.",
        status: "gelistirme",
        tags: ["Next.js", "TypeScript", "Tailwind"],
      },
      {
        name: "Neu-Source",
        tagline: "Ajan hangi bilette, ne harcadı — tek ekranda.",
        description:
          "Next.js ve TypeScript ile yazılan iç platform. `neuvikon` CLI'ı " +
          "buraya bağlanıyor: kodlama ajanının hangi bilet üzerinde " +
          "çalıştığını ve ne kadar token harcadığını bildiriyor.",
        status: "yayinda",
        tags: ["Next.js", "TypeScript"],
        links: [{ label: "neuvikon.space", href: "https://www.neuvikon.space/" }],
      },
      {
        name: "Neu-Chat",
        /* ⚠️ Geçici: ad ve etiketten çıkarılmış, doğrulanmamış metin. */
        tagline: "Stüdyonun kendi sohbet katmanı.",
        description:
          "Sohbet uygulaması. Ayrıntılar yayına hazır olduğunda eklenecek.",
        image: "/apps/neu-chat.png",
        status: "gelistirme",
        tags: ["Sohbet"],
      },
      {
        name: "Eclosion",
        tagline: "Altı alanda kendini geliştir.",
        description:
          "Alışkanlık takibi uygulaması. İnsanın gelişmesi gereken altı alanı " +
          "ayrı ayrı takip ediyor; günlük tekrar sürdükçe ilerleme birikiyor.",
        status: "gelistirme",
        tags: ["React Native", "Expo", "Alışkanlık takibi"],
        image: "/apps/eclosion.png",
      },
    ],
  },
  {
    slug: "robotics",
    name: "Neuvikon Robotics",
    short: "Robotics",
    tagline: "Gömülü sistemler, otonom robotlar ve donanım prototipleri.",
    intro:
      "Robotics bölümü donanımla yazılımın kesiştiği yerde çalışıyor: sensör " +
      "okuyan, karar veren ve fiziksel dünyada bir şey yapan sistemler. " +
      "Prototipten çalışan cihaza kadar olan yolu kısaltmaya odaklanıyoruz.",
    capabilities: [
      "Gömülü yazılım — ESP32 / ESP32-S3, C++, FreeRTOS",
      "Sensör füzyonu ve kontrol döngüleri — IMU, pusula, ToF",
      "Cihaz–bulut ve cihaz–masaüstü haberleşmesi — WebSocket, BLE, USB HID",
      "Kablosuz (OTA) firmware güncelleme ve modüler firmware mimarisi",
      "ROS 2 / Gazebo simülasyonu, hareket planlama ve navigasyon",
      "Kinematik analiz ve çalışma alanı görselleştirme",
    ],
    projects: [],
  },
];

export const statusLabel: Record<ProjectStatus, string> = {
  yayinda: "Yayında",
  gelistirme: "Geliştirmede",
  taslak: "Hazırlanıyor",
};

/**
 * Bir dilin tüm içeriği. Sayfalar doğrudan `divisions` yerine bunu kullanıyor
 * ki aynı bileşen iki dili de basabilsin.
 */
export type Content = {
  org: Org;
  divisions: Division[];
  statusLabel: Record<ProjectStatus, string>;
  about: About;
  careers: Careers;
  pending: string;
};

export function getContent(locale: Locale): Content {
  return locale === "en"
    ? {
        org: orgEn,
        divisions: divisionsEn,
        statusLabel: statusLabelEn,
        about: aboutEn,
        careers: careersEn,
        pending: TODO_EN,
      }
    : { org, divisions, statusLabel, about, careers, pending: TODO };
}

export function getDivision(locale: Locale, slug: string): Division | undefined {
  return getContent(locale).divisions.find((d) => d.slug === slug);
}

/**
 * Büyük harfe çevirirken İngilizce kuralı uygulanacak etiketler.
 *
 * Sayfadaki başlıkların ve etiketlerin tamamı CSS `text-transform: uppercase`
 * ile büyütülüyor. Bu dönüşüm dile duyarlı: `<html lang="tr">` altında her
 * `i` harfi `İ` oluyor. Türkçe metinde doğru olan bu — "yönetim" → "YÖNETİM".
 * Ama aynı kural teknoloji adlarını bozuyor: "Unity" → "UNİTY",
 * "TypeScript" → "TYPESCRİPT".
 *
 * Çözüm harfi elle değiştirmek değil, metnin dilini söylemek: bu kümedeki
 * etiketler `lang="en"` ile işaretleniyor, tarayıcı da onları İngilizce
 * kurallarına göre büyütüyor. Proje ve bölüm adları zaten her zaman
 * İngilizce sayılıyor (hepsi marka adı), o yüzden burada yer almıyorlar.
 */
const EN_TERMS = new Set([
  "Unity",
  "Unity 6",
  "Unity 2D",
  "URP",
  "Mirror",
  "Netcode for GameObjects",
  "Android",
  "React Native",
  "Expo",
  "Firebase",
  "TypeScript",
  "Node.js",
  "Next.js",
  "Tailwind",
  "WebSocket",
  "Bun",
  "Python",
  "Angular",
  "Electron",
  "ESP32",
  "ESP32-S3",
  "C++",
  "ROS",
  "ROS 2",
  "Gazebo",
  "NumPy",
  "PrimeNG",
  "AMOLED",
  "OTA",
  "USB HID",
  "BLE",
  "Wi-Fi",
  "IMU",
  "Servo",
  "i18n",
  "Casual",
]);

/** Bir etiketin `lang` özniteliği — İngilizce değilse belirtmeye gerek yok. */
export function termLang(term: string): "en" | undefined {
  return EN_TERMS.has(term) ? "en" : undefined;
}

/**
 * Dış bağlantılar. Sosyal hesap açıldıkça buraya eklenir; alt bilgi ve
 * iletişim sayfası bu listeden üretiliyor.
 */
export const links: { label: string; href: string }[] = [
  { label: "GitHub", href: "https://github.com/Zer0desu1" },
];

/**
 * Hakkımızda sayfasının içeriği.
 *
 * ⚠️ `about.facts` içindeki TODO kayıtları gerçek bilgi bekliyor: stüdyonun
 * kuruluş yılı, nerede olduğu ve ekipte kimlerin bulunduğu. Bunları uydurmak
 * bir şirket sayfasında en kötü hata olur — doldurulana kadar sayfada açıkça
 * yer tutucu olarak duruyorlar.
 */
export const about: About = {
  lead:
    "Neuvikon bağımsız bir teknoloji stüdyosu. Bir işi baştan sona üstlenmeyi " +
    "tercih ediyoruz: tasarım, yazılım, altyapı ve yayın aynı elden çıkıyor. " +
    "Bu yüzden az sayıda işi aynı anda yürütüyor, her birini gerçekten " +
    "bitirmeye çalışıyoruz.",
  /** Uydurma değil: her biri projelerin kendi belgelerinde yazılı olan
   *  ve kodda karşılığı bulunan çalışma biçimleri. */
  principles: [
    {
      title: "Uçtan uca tek elden",
      body:
        "Oyun tasarımından ağ katmanına, devre şemasından mağaza yayınına " +
        "kadar her aşama stüdyo içinde yapılıyor. Dışarıya iş verdiğimizde " +
        "bile mimari kararı bizde kalıyor.",
    },
    {
      title: "Sunucu otoritedir",
      body:
        "Çok oyunculu işlerimizde istemci yalnızca niyet gönderir; kuralı " +
        "sunucu işletir ve sonucu yayınlar. Aynı kural motoru istemcide de " +
        "çalıştığı için oyuncu gecikme hissetmez, ama hile sunucu duvarını " +
        "aşamaz.",
    },
    {
      title: "Kaynak koda güven, dosyaya değil",
      body:
        "Projelerimiz açılışta kendini kurar; sahneye elle bağlanmış hiçbir " +
        "şey yoktur. Böylece bir ikili dosya bozulsa bile sistem ayakta " +
        "kalır ve her şey sürüm kontrolünde metin olarak kalır.",
    },
    {
      title: "Erişilebilirlik sonradan eklenmez",
      body:
        "Renk körü paleti, renge eşlik eden şekil, yazı boyutu, hareket " +
        "azaltma ve sol el modu ürünün ilk sürümünde var. Sonraya " +
        "bırakılan erişilebilirlik hiç gelmiyor.",
    },
    {
      title: "Dikkat satılık değil",
      body:
        "Oyunlarımızda reklam ve uygulama içi satın alma yok. Bir oyunun " +
        "iyi olması, oyuncunun canını sıkarak para kazanmasından daha " +
        "sürdürülebilir bir hedef.",
    },
  ],
  /** Sayfanın üst kısmındaki kısa künye. TODO olanlar sayfada da TODO görünür. */
  facts: [
    { label: "Kuruluş", value: "2026" },
    { label: "Konum", value: "Türkiye" },
    { label: "Ekip", value: "4 kişi" },
    { label: "Bölüm", value: "3" },
  ],
  team: [
    "Vural Bilgin",
    "Oğulcan Yusuf Bozkurt",
    "Arda Özan",
    "İrem Bozkurt",
  ],
};

/**
 * Kariyer sayfası. Açık pozisyon yokken sayfayı kaldırmak yerine durumu
 * açıkça yazıyoruz — arayan kişi boşuna aramasın, ama kapı da kapanmasın.
 */
export const careers: Careers = {
  lead:
    "Şu anda açık bir pozisyon yok. Yine de birlikte çalışmak istiyorsan " +
    "yazabilirsin: ilgilendiğin bölümü ve daha önce bitirdiğin bir işi " +
    "anlatan kısa bir e-posta yeterli.",
  /** Açık pozisyon geldiğinde bu diziye eklenir; sayfa kendiliğinden değişir. */
  openings: [],
  interests: [
    "Unity ve çok oyunculu ağ mimarisi",
    "React Native / Expo ile mobil ürün",
    "Gömülü yazılım — ESP32, sensör füzyonu",
    "Oyun ve arayüz tasarımı",
  ],
};

/**
 * Veri sorumlusunun yasal künyesi — KVKK aydınlatma metni ve gizlilik
 * politikası bu kayıttan besleniyor.
 *
 * ⚠️ Buradaki TODO alanları yayına çıkmadan önce doldurulmalı. Bir aydınlatma
 * metninde veri sorumlusunun kimliği zorunlu unsurdur; eksikse metin hukuken
 * geçersizdir. Şirket henüz tüzel kişilik değilse gerçek kişi adı ve adresi
 * yazılır. VERBİS kaydı yalnızca kayıt yükümlülüğü doğmuşsa gerekir.
 */
export const legalEntity = {
  /** Ticaret unvanı ya da gerçek kişi ad-soyadı. */
  title: TODO,
  address: TODO,
  /** Tüzel kişilik yoksa boş bırakılır. */
  mersis: TODO,
  taxOffice: TODO,
  /** Son güncelleme — metin her değiştiğinde elle güncellenir. */
  updated: "16 Eylül 2026",
  updatedEn: "16 September 2026",
};
