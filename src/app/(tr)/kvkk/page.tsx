import type { Metadata } from "next";
import Link from "next/link";
import { LegalEntityTable, LegalPage, LegalSection } from "@/components/Legal";
import { org } from "@/lib/content";

/**
 * KVKK aydınlatma metni.
 *
 * Metin sitenin gerçek davranışını anlatıyor, genel bir şablon değil: bu site
 * statik olarak üretiliyor, form yok, çerez yazılmıyor, oturum tutulmuyor.
 * Kişisel veri yalnızca ziyaretçi e-posta yazdığında işleniyor.
 *
 * ⚠️ Bu metin bir avukat tarafından yazılmadı. Siteye form, üyelik, ödeme ya
 * da çerez kullanan bir analitik eklenirse metin yeniden gözden geçirilmeli.
 */

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
};

export default function KvkkPage() {
  return (
    <LegalPage locale="tr" eyebrow="Yasal" title="KVKK Aydınlatma Metni">
      <LegalSection title="Veri sorumlusu">
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
          uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla aşağıda
          künyesi verilen taraf tarafından işlenmektedir.
        </p>
        <LegalEntityTable locale="tr" />
      </LegalSection>

      <LegalSection title="Hangi verileri işliyoruz">
        <p>
          Bu site statik olarak üretilir. Üyelik, form, ödeme ya da oturum
          bulunmadığından, siteyi yalnızca gezerken bize herhangi bir kişisel
          veri iletmezsiniz.
        </p>
        <p>Kişisel veri yalnızca şu durumda işlenir:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-text">E-posta yazdığınızda:</strong> ad ve
            soyadınız, e-posta adresiniz ve mesajınızda paylaştığınız bilgiler.
          </li>
        </ul>
        <p>
          Ayrıca sitenin ziyaret edildiği sunucu tarafında, barındırma
          sağlayıcısının teknik kayıtları (IP adresi, tarayıcı bilgisi, istek
          zamanı) güvenlik ve hata takibi amacıyla kısa süreli tutulabilir.
        </p>
      </LegalSection>

      <LegalSection title="İşleme amacı ve hukuki sebebi">
        <p>
          E-posta yoluyla ilettiğiniz veriler, yalnızca talebinize yanıt vermek
          ve varsa iş ilişkisini kurmak amacıyla işlenir. Hukuki sebep, KVKK
          m.5/2-(c) uyarınca sözleşmenin kurulması veya ifasıyla doğrudan
          ilgili olması ve m.5/2-(f) uyarınca meşru menfaattir.
        </p>
        <p>
          Sunucu kayıtları, KVKK m.5/2-(ç) uyarınca hukuki yükümlülük ve
          m.5/2-(f) uyarınca sistem güvenliğine ilişkin meşru menfaat
          kapsamında işlenir.
        </p>
      </LegalSection>

      <LegalSection title="Aktarım">
        <p>
          Kişisel verileriniz pazarlama amacıyla üçüncü kişilere satılmaz ve
          devredilmez. Yalnızca hizmetin sürdürülebilmesi için e-posta ve
          barındırma sağlayıcılarımızın altyapısında bulunur. Bu sağlayıcıların
          sunucuları yurt dışında olabileceğinden, aktarım KVKK m.9 kapsamında
          gerçekleşir.
        </p>
      </LegalSection>

      <LegalSection title="Saklama süresi">
        <p>
          E-posta yazışmaları, ilgili görüşme sonuçlandıktan sonra makul bir
          süre saklanır ve amaç ortadan kalktığında silinir. Sunucu kayıtları
          sağlayıcının belirlediği süre boyunca tutulur.
        </p>
      </LegalSection>

      <LegalSection title="Haklarınız">
        <p>KVKK m.11 uyarınca şu haklara sahipsiniz:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Kişisel verinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
          <li>Kanundaki şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
          <li>Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
          <li>Münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç doğmasına itiraz etme</li>
          <li>Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
        </ul>
        <p>
          Taleplerinizi{" "}
          <a href={`mailto:${org.email}`} className="text-accent hover:underline" lang="en">
            {org.email}
          </a>{" "}
          adresine iletebilirsiniz. Başvurular en geç otuz gün içinde
          sonuçlandırılır.
        </p>
      </LegalSection>

      <LegalSection title="İlgili metin">
        <p>
          Sitenin veri ve çerez davranışının tamamı için{" "}
          <Link href="/gizlilik" className="text-accent hover:underline">
            Gizlilik Politikası
          </Link>{" "}
          sayfasına bakabilirsiniz.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
