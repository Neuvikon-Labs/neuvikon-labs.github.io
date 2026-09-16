# Bir şirket web sitesinde olması gerekenler

Genel bir kontrol listesi — her maddenin yanında bu sitedeki (`neuvikon-web`)
mevcut durum var. Durum işaretleri kodun kendisinden doğrulandı, tahmin değil.

| | Anlamı |
|---|---|
| ✅ | Var ve çalışıyor |
| ⚠️ | Var ama eksik ya da yanlış |
| ❌ | Yok |

---

## 1. Kimlik ve mesaj

Ziyaretçi ilk ekranda üç soruya cevap bulmalı: **kimsiniz, ne yapıyorsunuz,
benden ne istiyorsunuz.**

| Durum | Madde | Not |
|---|---|---|
| ✅ | Logo ve marka kimliği | İmza logo, yeşil vurgu, tek tipografi ailesi |
| ✅ | Tek cümlelik konumlandırma | "Yazılım, oyun ve robotik üzerine çalışan bağımsız bir teknoloji stüdyosu" |
| ✅ | Ne yaptığınızın kanıtı | Bölüm sayfaları + proje listesi |
| ✅ | Net bir çağrı (CTA) | "İncele" ve e-posta düğmeleri |
| ⚠️ | Hakkımızda / ekip sayfası | `/hakkimizda` yayında. Kuruluş yılı, konum ve ekip alanları hâlâ TODO |
| ❌ | Müşteri / iş birliği referansları | Elde referans yok; uydurulamaz. Gerçek bir iş birliği çıkınca eklenir |

## 2. İçerik sayfaları

| Durum | Madde | Not |
|---|---|---|
| ✅ | Ana sayfa | |
| ✅ | Hizmet / bölüm sayfaları | `/games`, `/tech`, `/robotics` |
| ⚠️ | Proje vitrini | Altı projede açıklama, on projede görsel yok — bilgi sende |
| ❌ | Vaka çalışması (case study) | Sonuç/metrik bilgisi olmadan yazılamaz — bkz. aşağıdaki not |
| ⚠️ | İletişim sayfası | `/iletisim` yayında. Form yok — arka uç servisi seçilmeli |
| ✅ | Kariyer / açık pozisyonlar | `/kariyer` yayında; pozisyon açılınca `careers.openings`'e eklenir |
| ❌ | Blog / haberler | SEO ve canlılık sinyali; sürdürülemeyecekse hiç açma |
| ✅ | 404 sayfası | Markaya uygun, tasarlanmış |

## 3. İletişim ve dönüşüm

| Durum | Madde | Not |
|---|---|---|
| ⚠️ | E-posta adresi | Var ama kişisel Gmail — kurumsal alan adına taşınmalı (`info@…`) |
| ❌ | İletişim formu | `mailto:` mobilde çoğu kullanıcıda hiçbir şey açmıyor |
| ❌ | Sosyal medya bağlantıları | GitHub, LinkedIn, itch.io / mağaza sayfaları |
| ❌ | Fiziksel adres ve telefon | Kurumsal güven ve yerel SEO için |

## 4. Teknik temel

| Durum | Madde | Not |
|---|---|---|
| ✅ | Mobil uyumlu düzen | |
| ✅ | `<html lang>` doğru | `tr`, İngilizce terimler `lang="en"` ile işaretli |
| ✅ | Hızlı yükleme | Statik üretim (SSG), `next/image` |
| ✅ | 404 ve yönlendirme yönetimi | |
| ⚠️ | Alan adı ve HTTPS | `neuvikon.com` koda tek sabit (`SITE_URL`) olarak girildi; site henüz yayında değil |
| ✅ | Alan adı tutarlılığı | `neuvikon.com` tek yerden (`SITE_URL`) besleniyor: metadataBase, sitemap, robots, JSON-LD |
| ❌ | `manifest.webmanifest` | Telefona kısayol eklenince ikon ve ad |
| ❌ | `security.txt` | Güvenlik açığı bildirimi için iletişim kanalı |
| ❌ | Yedek ve sürüm kontrolü | Depo henüz uzak sunucuya bağlı değil |

## 5. SEO ve paylaşım

| Durum | Madde | Not |
|---|---|---|
| ✅ | Sayfa başlığı ve açıklaması | `metadata` şablonuyla her sayfada |
| ✅ | `robots.txt` | `src/app/robots.ts` |
| ✅ | `sitemap.xml` | Her iki dilin tüm sayfaları, dil eşleşmeleriyle |
| ✅ | Open Graph / Twitter etiketleri | `openGraph` + `twitter.card` |
| ✅ | **OG görseli** | 1200×630, her dil için ayrı alt metinle (`opengraph-image.png`) |
| ✅ | JSON-LD `Organization` şeması | Her iki kök yerleşimde basılıyor |
| ✅ | Anlamlı URL yapısı | `/games`, `/tech`, `/robotics` |
| ⚠️ | Google Search Console kaydı | Doğrulama etiketi `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` ile hazır; kayıt sende |

## 6. Erişilebilirlik

| Durum | Madde | Not |
|---|---|---|
| ✅ | İçeriğe atlama bağlantısı | |
| ✅ | Görünür odak halkası | `:focus-visible` |
| ✅ | `prefers-reduced-motion` desteği | Animasyonlar kapanıyor |
| ✅ | Anlamlı `alt` metinleri | Dekoratif görseller `aria-hidden` |
| ⚠️ | Renk kontrastı | Gövde metni `#9b9b9b` — siyah üzerinde sınırda, fotoğraf üzerinde riskli |
| ❌ | Klavye ve ekran okuyucu testi | Gerçek cihazla bir kez baştan sona denenmeli |

## 7. Yasal — Türkiye

Bu kısım isteğe bağlı değil; eksikliği idari para cezasına konu olabilir.

| Durum | Madde | Not |
|---|---|---|
| ⚠️ | **Gizlilik politikası / KVKK aydınlatma metni** | Dört sayfa yazıldı (TR+EN). Veri sorumlusu künyesi hâlâ TODO |
| ✅ | Çerez bildirimi ve tercih yönetimi | Çerez yazılmıyor; gerekçesi gizlilik metninde açık |
| ❌ | Kullanım koşulları | |
| ⚠️ | Ticari kimlik bilgileri | Künye tablosu hazır (`legalEntity`), alanlar boş — 6563 sayılı Kanun kapsamında doldurulmalı |
| ❌ | Telif bildirimi | Alt bilgide `© 2026 Neuvikon` var ama hakların kapsamı yazılı değil |

## 8. Ölçüm

| Durum | Madde | Not |
|---|---|---|
| ⚠️ | Analitik | Plausible bağlandı; `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` tanımlanınca çalışır |
| ❌ | Hata izleme | Sentry ya da benzeri |
| ❌ | Çalışma süresi izleme (uptime) | |

## 9. Uluslararasılaşma

| Durum | Madde | Not |
|---|---|---|
| ✅ | İngilizce sürüm | `/en` altında tam çeviri; dil değiştirme düğmesi aynı sayfanın karşılığına gider |
| ✅ | `hreflang` etiketleri | Her sayfada `alternates.languages`, sitemap'te de dil eşleşmeleri |

---

## Yayına çıkmadan önce kalanlar

Kod tarafı hazır; aşağıdakiler bilgi ya da hesap gerektiriyor.

1. **Veri sorumlusu künyesini doldur** — `content.ts` → `legalEntity`.
   Ticaret unvanı (ya da gerçek kişi adı), adres, MERSİS ve vergi bilgisi.
   Eksik künyeyle aydınlatma metni hukuken geçersiz.
2. **Hakkımızda künyesini doldur** — `content.ts` → `about.facts`:
   kuruluş yılı, konum, ekip. Şu an üçü de yer tutucu.
3. **Altı projenin açıklamasını yaz** — Today's Word, Timber Supply & Co,
   Muavin-Sim, Duskfield, Neu-Source, Neu-Chat. Metni yazılana kadar
   bölüm sayfasının altındaki kısa listede duruyorlar, tam ekran almıyorlar.
   Türkçesini yazarken `content.en.ts` içindeki İngilizcesini de yaz.
4. **Alan adını al ve DNS'i bağla**, sonra Plausible ile Search Console
   hesaplarını aç ve `.env` içindeki iki değişkeni doldur.
5. **İletişim formu için arka uç seç** (Formspree, Resend + route handler ya
   da kendi API'n). Şu an sayfada bilinçli olarak form yok.
6. **Kurumsal e-posta.** `neuvikon@gmail.com` senin tercihinle kaldı; alan
   adı alınınca `content.ts` → `org.email` tek satırda değişir.
