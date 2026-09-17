"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * Koyu / aydınlık mod anahtarı.
 *
 * Varsayılan koyu: sitenin kimliği siyah. Aydınlık yalnızca ziyaretçi
 * isterse geliyor ve tercih `localStorage`'da kalıyor.
 *
 * Temayı asıl uygulayan yer burası değil — `THEME_SCRIPT` sayfa boyanmadan
 * önce `<html>` üzerine `data-theme` yazıyor. Bu bileşen yalnızca düğmeyi
 * çiziyor ve tıklamayı işliyor; yoksa ilk karede koyu tema görünüp sonra
 * aydınlığa atlıyordu.
 */

const KEY = "neuvikon-theme";

/**
 * `<head>` içinde, stil dosyasından sonra ve gövdeden önce çalışır.
 * Küçük tutuldu çünkü boyamayı bloke ediyor — asıl amacı da bu.
 */
export const THEME_SCRIPT = `try{var t=localStorage.getItem("${KEY}");if(t==="light")document.documentElement.setAttribute("data-theme","light")}catch(e){}`;

/* Tema React state'inde değil, `<html>` üzerinde duruyor — asıl kaynak o.
   Bu yüzden kopyasını tutmak yerine doğrudan okunuyor; MutationObserver da
   başka bir yerden değiştirilirse düğmeyi haberdar ediyor. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function ThemeToggle({ locale }: { locale: Locale }) {
  const light = useSyncExternalStore(
    subscribe,
    () => document.documentElement.getAttribute("data-theme") === "light",
    /* Sunucuda tercih bilinmiyor; varsayılan koyu kabul ediliyor. */
    () => false,
  );

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") !== "light";
    if (next) root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem(KEY, next ? "light" : "dark");
    } catch {
      /* Gizli sekmede yazma engellenebiliyor; tema yine de bu oturumda geçerli. */
    }
  }, []);

  const label = light
    ? locale === "en"
      ? "Switch to dark mode"
      : "Koyu moda geç"
    : locale === "en"
      ? "Switch to light mode"
      : "Aydınlık moda geç";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="label -m-2 p-2 text-text/50 transition-colors hover:text-text"
    >
      {/* Tek bir ikon, iki durum: daire dolduğunda ay, boşaldığında güneş.
          Yazı yerine simge, çünkü menüde zaten dört kelime var. */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="block"
      >
        {light ? (
          <path
            d="M13.2 9.6A5.6 5.6 0 0 1 6.4 2.8 5.6 5.6 0 1 0 13.2 9.6Z"
            fill="currentColor"
          />
        ) : (
          <>
            <circle cx="8" cy="8" r="3.1" fill="currentColor" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <rect
                key={a}
                x="7.45"
                y="0.6"
                width="1.1"
                height="2.4"
                rx="0.55"
                fill="currentColor"
                transform={`rotate(${a} 8 8)`}
              />
            ))}
          </>
        )}
      </svg>
    </button>
  );
}
