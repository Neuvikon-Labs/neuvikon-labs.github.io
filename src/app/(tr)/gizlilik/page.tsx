import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/Legal";
import { org } from "@/lib/content";

/**
 * Gizlilik politikası.
 *
 * KVKK metni "hangi hakların var" sorusuna cevap veriyor; bu sayfa "site ne
 * yapıyor" sorusuna. İkisini ayırmak, ikisini de okunur tutuyor.
 *
 * ⚠️ Siteye çerez kullanan bir analitik, reklam pikseli ya da gömülü video
 * eklenirse bu metin ve çerez bölümü güncellenmeli.
 */

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Bu sitenin hangi verileri topladığı, neden topladığı ve ne kadar sakladığı.",
};

export default function PrivacyPage() {
  return (
    <LegalPage locale="tr" eyebrow="Yasal" title="Gizlilik Politikası">
      <LegalSection title="Kısaca">
        <p>
          Bu site sizi takip etmiyor. Reklam ağı, sosyal medya pikseli ve
          profilleme yok. Hesap açmıyorsunuz, form doldurmuyorsunuz; site
          önceden üretilmiş sayfalardan ibaret.
        </p>
      </LegalSection>

      <LegalSection title="Çerezler">
        <p>
          Bu site tarayıcınıza çerez yazmaz. Oturum, tercih ya da reklam
          çerezi kullanılmadığından bir çerez onay penceresi de bulunmaz.
        </p>
        <p>
          Ziyaret sayısını ölçmek için çerezsiz ve kişisel veri toplamayan bir
          sayaç (Plausible Analytics) kullanılabilir. Bu araç bireysel
          ziyaretçileri tanımaz, cihazlar arası takip yapmaz ve topladığı
          verileri üçüncü kişilerle paylaşmaz.
        </p>
      </LegalSection>

      <LegalSection title="Dışarıdan yüklenen kaynaklar">
        <p>
          Yazı tipleri sitenin kendi sunucusundan servis edilir; sayfa
          açıldığında Google Fonts&apos;a bir istek gitmez. Görseller ve
          logolar da aynı alan adından gelir.
        </p>
      </LegalSection>

      <LegalSection title="E-posta yazdığınızda">
        <p>
          Bize{" "}
          <a href={`mailto:${org.email}`} className="text-accent hover:underline" lang="en">
            {org.email}
          </a>{" "}
          adresinden yazdığınızda, mesajınız ve içindeki bilgiler e-posta
          sağlayıcımızın sunucularında saklanır. Bu verileri yalnızca size
          dönüş yapmak için kullanırız; bülten listesine eklemeyiz ve üçüncü
          kişilerle paylaşmayız.
        </p>
      </LegalSection>

      <LegalSection title="Sunucu kayıtları">
        <p>
          Barındırma sağlayıcısı, güvenlik ve hata takibi için standart erişim
          kayıtları tutabilir: IP adresi, tarayıcı bilgisi, istenen sayfa ve
          zaman damgası. Bu kayıtlara reklam ya da analiz amacıyla bakılmaz.
        </p>
      </LegalSection>

      <LegalSection title="Değişiklikler">
        <p>
          Bu metin değiştiğinde sayfanın üstündeki tarih güncellenir. Önemli
          bir değişiklik olursa ana sayfada duyurulur.
        </p>
      </LegalSection>

      <LegalSection title="İlgili metin">
        <p>
          Kişisel verilerinize ilişkin haklarınız ve veri sorumlusu künyesi
          için{" "}
          <Link href="/kvkk" className="text-accent hover:underline">
            KVKK Aydınlatma Metni
          </Link>{" "}
          sayfasına bakabilirsiniz.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
