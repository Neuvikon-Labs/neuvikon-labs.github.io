"use client";

import { useId } from "react";
import { divisionLogos } from "@/lib/division-logos";

/**
 * Bölüm logosu — ana logodaki yazılış animasyonu, artı logoya özel bir
 * parça hareketi.
 *
 * Mantık `Logo.tsx` ile aynı: görsel yeniden çizilmiyor, ekranda görünen
 * piksel her zaman orijinal PNG. Katmanlar aynı PNG'nin maskelenmiş
 * kopyaları — böylece her katman için ayrı koyu/aydınlık dosya tutmak
 * gerekmiyor.
 *
 * Üç katman var:
 *   1. Ayrı parça (Games'te kılıç, Robotics'te çark) — kendi animasyonuyla.
 *   2. Taban: N ve o parça dışındaki her şey; en baştan görünür.
 *   3. N: kalem yolu boyunca alttan yukarı açılır.
 *
 * Kılıç tabanın ALTINA çiziliyor: aşağı indiğinde üst parçası kolun
 * arkasında kayboluyor, alt parçası altından çıkıyor.
 */
export function DivisionLogo({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const id = useId();
  const logo = divisionLogos[slug];
  if (!logo) return null;

  const baseMaskId = `${id}-base`;
  const partMaskId = `${id}-part`;
  const { part } = logo;

  /* Koyu ve aydınlık sürümlerin ikisi de basılıp biri CSS ile gizleniyor —
     temayı JavaScript'le seçmek ilk karede yanlış logoyu gösteriyordu. */
  const inks = (maskId: string) => (
    <>
      <image
        className="logo-ink-dark"
        href={logo.dark.src}
        width={logo.w}
        height={logo.h}
        mask={`url(#${maskId})`}
      />
      <image
        className="logo-ink-light"
        href={logo.light.src}
        width={logo.w}
        height={logo.h}
        mask={`url(#${maskId})`}
      />
    </>
  );

  const partLayer = part && (
    <g
      className={part.kind === "sword" ? "logo-sword" : "logo-gear"}
      style={
        part.origin
          ? { transformOrigin: `${part.origin[0]}px ${part.origin[1]}px` }
          : undefined
      }
    >
      {inks(partMaskId)}
    </g>
  );

  return (
    <svg
      viewBox={`0 0 ${logo.w} ${logo.h}`}
      role="img"
      aria-label={`Neuvikon ${slug}`}
      className={className}
    >
      <defs>
        <mask
          id={baseMaskId}
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
        {part && (
          <mask
            id={partMaskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={logo.w}
            height={logo.h}
          >
            <image href={part.mask.src} width={logo.w} height={logo.h} />
          </mask>
        )}
      </defs>

      {part?.behind && partLayer}
      {inks(baseMaskId)}
      {part && !part.behind && partLayer}
    </svg>
  );
}
