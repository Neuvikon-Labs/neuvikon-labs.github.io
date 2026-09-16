"use client";

import Image from "next/image";
import { useId } from "react";
import wordmark from "../../public/neuvikon-logo.png";
import glyph from "../../public/neuvikon-n.png";

/**
 * Neuvikon logosu.
 *
 * Görsel yeniden çizilmiyor — el yazısı bir imza taklit edilemez, en küçük
 * eğri farkı bile sahte durur. Ekranda görünen piksel her zaman orijinal PNG.
 *
 * Animasyon bu yüzden maske ile yapılıyor: aşağıdaki `PEN` yolu logonun
 * değil, kalemin yolu — N'in üç darbesinin orta çizgisi, PNG'nin alfa
 * kanalından çıkarıldı. Kalın bir beyaz çizgi olarak maskeye çizilip
 * stroke-dashoffset ile açıldığında, altındaki gerçek görsel kalemin
 * gittiği sırayla ortaya çıkıyor: sol alttan yukarı, tepeden çaprazlama
 * aşağı, sağdan tekrar yukarı. Elle yazılış sırası bu.
 */
const PEN =
  "M 4.0 327.0 C 4.3 325.2 5.4 319.8 6.0 316.0 C 6.6 312.2 6.9 308.0 7.5 304.0 C 8.1 300.0 9.1 296.0 9.5 292.0 C 9.9 288.0 9.8 284.0 10.0 280.0 C 10.3 276.0 10.8 272.0 11.0 268.0 C 11.3 264.0 11.3 260.0 11.5 256.0 C 11.8 252.0 12.3 248.0 12.5 244.0 C 12.8 240.0 12.8 236.0 13.0 232.0 C 13.2 228.0 13.3 224.0 13.5 220.0 C 13.7 216.0 13.9 212.0 14.0 208.0 C 14.1 204.0 14.0 200.0 14.0 196.0 C 14.0 192.0 14.0 188.0 14.0 184.0 C 14.0 180.0 14.0 176.0 14.0 172.0 C 14.0 168.0 14.0 164.0 14.0 160.0 C 14.0 156.0 14.0 152.0 14.0 148.0 C 14.0 144.0 14.0 140.0 14.0 136.0 C 14.0 132.0 14.0 128.0 14.0 124.0 C 14.0 120.0 14.0 116.0 14.0 112.0 C 14.0 108.0 14.0 104.0 14.0 100.0 C 14.0 96.0 13.9 92.0 14.0 88.0 C 14.1 84.0 14.4 80.0 14.5 76.0 C 14.6 72.0 14.5 68.0 14.5 64.0 C 14.5 60.0 14.4 56.0 14.5 52.0 C 14.6 48.0 14.7 44.0 15.0 40.0 C 15.3 36.0 15.8 32.0 16.5 28.0 C 17.3 24.0 17.7 20.0 19.5 16.0 C 21.3 12.0 24.3 4.8 27.5 4.0 C 30.8 3.2 35.0 7.8 39.0 11.0 C 43.0 14.2 47.7 19.0 51.5 23.0 C 55.3 27.0 58.8 31.0 62.0 35.0 C 65.3 39.0 68.1 43.0 71.0 47.0 C 73.9 51.0 76.9 55.0 79.5 59.0 C 82.1 63.0 84.2 67.0 86.5 71.0 C 88.8 75.0 91.2 79.0 93.5 83.0 C 95.8 87.0 98.3 91.0 100.5 95.0 C 102.7 99.0 104.6 103.0 106.5 107.0 C 108.4 111.0 110.2 115.0 112.0 119.0 C 113.8 123.0 115.8 127.0 117.5 131.0 C 119.3 135.0 120.9 139.0 122.5 143.0 C 124.1 147.0 125.5 151.0 127.0 155.0 C 128.5 159.0 130.1 163.0 131.5 167.0 C 132.9 171.0 134.3 175.0 135.5 179.0 C 136.8 183.0 137.8 187.0 139.0 191.0 C 140.2 195.0 141.3 199.0 142.5 203.0 C 143.7 207.0 145.0 211.0 146.0 215.0 C 147.0 219.0 147.8 224.0 148.5 227.0 C 149.2 230.0 148.5 230.7 150.0 233.0 C 151.5 235.3 156.1 237.7 157.5 241.0 C 158.9 244.3 158.2 249.0 158.5 253.0 C 158.8 257.0 159.3 261.0 159.5 265.0 C 159.7 269.0 159.3 273.0 159.5 277.0 C 159.7 281.0 160.3 285.2 160.5 289.0 C 160.7 292.8 159.9 310.0 160.5 300.0 C 161.1 290.0 163.3 242.8 164.0 229.0 C 164.7 215.2 164.4 221.0 164.5 217.0 C 164.6 213.0 164.4 209.0 164.5 205.0 C 164.6 201.0 164.8 197.0 165.0 193.0 C 165.2 189.0 165.3 185.0 165.5 181.0 C 165.8 177.0 166.3 173.0 166.5 169.0 C 166.7 165.0 166.4 161.0 166.5 157.0 C 166.6 153.0 166.9 149.0 167.0 145.0 C 167.1 141.0 166.9 137.0 167.0 133.0 C 167.1 129.0 167.4 125.0 167.5 121.0 C 167.6 117.0 167.5 113.0 167.5 109.0 C 167.5 105.0 167.5 101.0 167.5 97.0 C 167.5 93.0 167.5 89.0 167.5 85.0 C 167.5 81.0 167.5 77.0 167.5 73.0 C 167.5 69.0 167.5 65.0 167.5 61.0 C 167.5 57.0 167.5 53.0 167.5 49.0 C 167.5 45.0 167.4 41.0 167.5 37.0 C 167.6 33.0 167.8 29.0 168.0 25.0 C 168.3 21.0 168.8 17.0 169.0 13.0 C 169.3 9.0 169.4 3.0 169.5 1.0";

/** Kalemin ucu: en kalın darbe ~25 birim, yuvarlak uçla 32 hepsini örtüyor. */
const PEN_WIDTH = 32;

/** Logonun kendi ölçüleri; maske koordinatları bu düzleme ait. */
const ART = { w: 643, h: 329 };
/** N ile "euvikon" arasındaki boşluk — sağdaki kısım maskede sabit duruyor. */
const REST_X = 180;

function PenMask({ id, rest }: { id: string; rest: boolean }) {
  return (
    <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width={ART.w} height={ART.h}>
      {rest && (
        <rect x={REST_X} y="0" width={ART.w - REST_X} height={ART.h} fill="#fff" />
      )}
      <path
        d={PEN}
        className="pen-draw"
        pathLength="1"
        fill="none"
        stroke="#fff"
        strokeWidth={PEN_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </mask>
  );
}

export function Wordmark({
  height = 26,
  priority = false,
  className = "",
  animate = true,
}: {
  height?: number;
  priority?: boolean;
  className?: string;
  /** Kapatıldığında logo hiç maskelenmeden, tek parça görsel olarak basılır. */
  animate?: boolean;
}) {
  const maskId = useId();

  if (!animate) {
    return (
      <Image
        src={wordmark}
        alt="Neuvikon"
        height={height}
        style={{ height, width: "auto" }}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <svg
      viewBox={`0 0 ${ART.w} ${ART.h}`}
      height={height}
      style={{ height, width: "auto" }}
      role="img"
      aria-label="Neuvikon"
      className={className}
    >
      <defs>
        <PenMask id={maskId} rest />
      </defs>
      <image
        href={wordmark.src}
        width={ART.w}
        height={ART.h}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}

/**
 * Sadece yeşil N. Logonun tamamının sığmadığı yerlerde (kart köşesi, 404)
 * kısaltma olarak kullanılıyor.
 */
export function Glyph({
  height = 24,
  className = "",
  animate = true,
}: {
  height?: number;
  className?: string;
  animate?: boolean;
}) {
  const maskId = useId();

  if (!animate) {
    return (
      <Image
        src={glyph}
        alt=""
        aria-hidden="true"
        height={height}
        style={{ height, width: "auto" }}
        className={className}
      />
    );
  }

  return (
    <svg
      viewBox={`0 0 ${glyph.width} ${ART.h}`}
      height={height}
      style={{ height, width: "auto" }}
      aria-hidden="true"
      className={className}
    >
      <defs>
        <PenMask id={maskId} rest={false} />
      </defs>
      <image
        href={glyph.src}
        width={glyph.width}
        height={ART.h}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
