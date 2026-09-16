import type { NextConfig } from "next";

/**
 * GitHub Pages'e statik dağıtım.
 *
 * Pages yalnızca dosya servis ediyor — sunucu tarafı yok. Bu yüzden site
 * tamamen önceden üretiliyor (`output: "export"` → `out/`).
 *
 * Bunun tek bedeli görsel optimizasyonunun kapanması: `next/image` boyut
 * değiştirmeyi ve WebP'ye çevirmeyi sunucuda yapıyordu, artık PNG'ler olduğu
 * gibi iniyor. Uygulama ikonları 512–1024 px; yavaşlık hissedilirse çözüm
 * dosyaları kaynağında küçültmek, sunucu eklemek değil.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  /* Pages, klasör adresini `/games/` diye sunduğu için her sayfa kendi
     dizininde bir index.html olarak yazılıyor. Sondaki eğik çizgi olmadan
     yönlendirme 404 veriyordu. */
  trailingSlash: true,
};

export default nextConfig;
