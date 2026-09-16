# Neuvikon Web

Neuvikon'un kurumsal tanıtım sitesi. Üç bölüm: **Tech**, **Games**, **Robotics**.

## Çalıştırma

```bash
npm run dev     # http://localhost:3000
npm run build   # üretim derlemesi
npm start       # derlenmiş sürümü çalıştır
```

## İçeriği nasıl değiştiririm

Neredeyse her şey tek dosyada: **`src/lib/content.ts`**

- Yeni proje eklemek → ilgili bölümün `projects` dizisine bir kayıt ekle
- Yeni bölüm eklemek → `divisions` dizisine bir kayıt ekle; menü, ana sayfa
  kartı ve `/slug` sayfası kendiliğinden oluşur (JSX'e dokunmana gerek yok)
- E-posta, yıl, açıklama → `org` nesnesi

### ⚠️ Yayına çıkmadan önce

1. `content.ts` içinde **`status: "taslak"`** araması yap. Gerçek bilgi
   olmadığı için boş bırakılmış iskeletler — gerçek projelerinle değiştir
   ya da sil. Şu an taslak olanlar: *İç Altyapı* (Tech), *Prototip Platformu*
   (Robotics).
2. Alan adını üç yerde değiştir:
   - `src/app/layout.tsx` → `metadataBase`
   - `src/app/sitemap.ts` → `BASE`
   - `src/app/robots.ts` → `sitemap`
3. `public/` içine bir `og-image.png` (1200×630) koyup `layout.tsx`'teki
   `openGraph`'a ekle — şu an sosyal medya önizlemesinde görsel yok.
4. Favicon `src/app/favicon.ico` hâlâ Next.js varsayılanı.

## Yapı

```
src/
  app/
    layout.tsx           kök düzen, SEO meta, header + footer
    page.tsx             ana sayfa
    [division]/page.tsx  üç bölüm sayfasının tamamı (tek dosya)
    not-found.tsx        404
    sitemap.ts robots.ts
    globals.css          palet ve tema değişkenleri
  components/
    Header.tsx           tek istemci bileşeni (mobil menü durumu için)
    Footer.tsx  ProjectCard.tsx  Mark.tsx
  lib/
    content.ts           TEK içerik kaynağı
```

## Tasarım notları

- **Karanlık tema tek seçenek.** Açık tema bilerek tanımlanmadı; yarım
  karartılmış bir tema iki taraftan da kötü görünüyordu.
- **Bölüm rengi CSS değişkeniyle geçiyor.** Her bölüm sayfası ve kartı
  `--accent`'i kendi rengine ayarlıyor, alttaki her şey (`text-accent`,
  `bg-accent`, `border-accent`) onu miras alıyor. Bölüm başına ayrı sınıf
  yazmaya gerek yok.
- **Erişilebilirlik:** klavye için "İçeriğe geç" bağlantısı, görünür odak
  halkası, `aria-current` ile aktif menü, `prefers-reduced-motion` desteği.
- **Mark** bileşeni: kütleden bir parça sökülmüş disk — PushBump ikonuyla
  aynı fikrin düz, tek renkli hali. 24 pikselde gerçekçi metal çamura
  dönerdi, o yüzden saf siluet.

## Derleme çıktısı

Sayfaların hepsi statik olarak önceden üretiliyor (SSG) — çalışma anında
sunucuda iş yok, herhangi bir statik barındırmaya (Vercel, Cloudflare Pages,
Netlify) doğrudan çıkabilir.

## Yığın

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
