"use client";

import { useId } from "react";
import { divisionLogos } from "@/lib/division-logos";

/**
 * Bölüm logosu — ana logodaki yazılış animasyonunun aynısı.
 *
 * Mantık `Logo.tsx` ile aynı: görsel yeniden çizilmiyor, ekranda görünen
 * piksel her zaman orijinal PNG. Animasyon maskeyle yapılıyor; maskede iki
 * parça var:
 *
 *   1. N dışındaki her şey — sabit, en baştan görünür (`mask` görseli).
 *   2. N — kalem yolu boyunca açılan kalın bir çizgi.
 *
 * Tek fark maskenin ilk parçasının dikdörtgen değil görsel olması: bölüm
 * logolarında N, altındaki yazıyla aynı sütunları paylaşıyor.
 *
 * Koyu ve aydınlık sürümlerin ikisi de basılıp biri CSS ile gizleniyor —
 * JavaScript'le seçmek ilk karede yanlış logoyu gösteriyordu.
 */
export function DivisionLogo({
  slug,
  className = "",
  priority = false,
}: {
  slug: string;
  className?: string;
  priority?: boolean;
}) {
  const maskId = useId();
  const logo = divisionLogos[slug];
  if (!logo) return null;

  return (
    <svg
      viewBox={`0 0 ${logo.w} ${logo.h}`}
      role="img"
      aria-label={`Neuvikon ${slug}`}
      className={className}
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={logo.w}
          height={logo.h}
        >
          <image href={logo.mask.src} width={logo.w} height={logo.h} />
          <path
            d={logo.pen}
            className="pen-draw"
            pathLength="1"
            fill="none"
            stroke="#fff"
            strokeWidth={logo.penWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
      </defs>
      <image
        className="logo-ink-dark"
        href={logo.dark.src}
        width={logo.w}
        height={logo.h}
        mask={`url(#${maskId})`}
        {...(priority ? { fetchPriority: "high" as const } : {})}
      />
      <image
        className="logo-ink-light"
        href={logo.light.src}
        width={logo.w}
        height={logo.h}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
