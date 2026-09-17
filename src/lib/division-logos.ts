import type { StaticImageData } from "next/image";
import gamesDark from "../../public/divisions/games.png";
import gamesLight from "../../public/divisions/games-light.png";
import gamesMask from "../../public/divisions/games-mask.png";
import roboticsDark from "../../public/divisions/robotics.png";
import roboticsLight from "../../public/divisions/robotics-light.png";
import roboticsMask from "../../public/divisions/robotics-mask.png";
import gamesSwordMask from "../../public/divisions/games-sword-mask.png";
import roboticsGearMask from "../../public/divisions/robotics-gear-mask.png";

/**
 * Bölüm logoları ve her birinin kalem yolu.
 *
 * "pen" alanı ana logodakiyle aynı fikir: logonun değil, imzayı yazan
 * kalemin yolu. Her logo için yeşil pikseller bağlantılı parçalara ayrılıp
 * N bulundu, satır satır orta çizgisi çıkarıldı ve üç darbe elle yazılış
 * sırasıyla birleştirildi — sol alttan yukarı, tepeden çaprazlama aşağı,
 * sağdan tekrar yukarı.
 *
 * "mask" ise N DIŞINDA kalan her şey. Ana logoda bu bir dikdörtgendi;
 * burada olmuyor, çünkü N altındaki GAMES / ROBOTICS yazısıyla aynı
 * sütunları paylaşıyor. Bu yüzden maske piksel piksel üretilmiş bir görsel.
 *
 * Koordinatlar kaynak görselin ölçeğinde. PNG'lerin kendi çözünürlüğü
 * farklı olabilir; SVG viewBox ikisini birbirine oturtuyor.
 *
 * "part" varsa logonun bir parçası ayrı katmana alınmış demektir; o parça
 * maskenin dışında bırakılıp kendi animasyonuyla çiziliyor:
 *
 *   Games — kılıç. Kılıçla kol tek parça çizilmiş, kesip ayırmak kolun
 *   ortasında delik bırakırdı. Gerek de yok: yalnızca kolun DIŞINDA kalan
 *   iki parça (üstte kabza ve balçak, altta namlunun ucu) ayrılıyor, ortası
 *   zaten kolun arkasında. Katman kolun ALTINA çiziliyor, böylece aşağı
 *   indiğinde üst parça kolun arkasında kayboluyor ve alt parça altından
 *   çıkıyor.
 *
 *   Robotics — çark. Kola değmeyen ayrı bir parça, olduğu gibi çıkarıldı.
 *   "origin" dönme merkezi, logonun kendi ölçeğinde.
 *
 * Üretim betikleri depoda tutulmuyor; dosya bir kez üretilip gözle
 * doğrulandı.
 */
export type DivisionLogo = {
  dark: StaticImageData;
  light: StaticImageData;
  mask: StaticImageData;
  w: number;
  h: number;
  pen: string;
  penWidth: number;
  part?: {
    mask: StaticImageData;
    /** Hangi animasyon: kılıcın inişi mi, çarkın dönüşü mü. */
    kind: "sword" | "gear";
    /** Parça taban katmanın altına mı çizilsin? Kılıç için evet. */
    behind?: boolean;
    /** Dönme merkezi (yalnızca çark için), logonun kendi ölçeğinde. */
    origin?: [number, number];
  };
};

export const divisionLogos: Record<string, DivisionLogo> = {
  games: {
    dark: gamesDark,
    light: gamesLight,
    mask: gamesMask,
    w: 1024,
    h: 1024,
    penWidth: 55,
    part: { mask: gamesSwordMask, kind: "sword", behind: true },
    pen: "M 330.5 616.0 C 330.5 615.0 330.3 612.7 330.5 610.0 C 330.7 607.3 331.2 603.3 331.5 600.0 C 331.8 596.7 332.2 593.3 332.5 590.0 C 332.8 586.7 333.2 583.3 333.5 580.0 C 333.8 576.7 334.3 573.3 334.5 570.0 C 334.8 566.7 334.8 563.3 335.0 560.0 C 335.3 556.7 335.8 553.3 336.0 550.0 C 336.2 546.7 335.8 543.3 336.0 540.0 C 336.2 536.7 336.8 533.3 337.0 530.0 C 337.2 526.7 336.9 523.3 337.0 520.0 C 337.1 516.7 337.4 513.3 337.5 510.0 C 337.6 506.7 337.5 503.3 337.5 500.0 C 337.5 496.7 337.5 493.3 337.5 490.0 C 337.5 486.7 337.5 483.3 337.5 480.0 C 337.5 476.7 337.5 473.3 337.5 470.0 C 337.5 466.7 337.5 463.3 337.5 460.0 C 337.5 456.7 337.5 453.3 337.5 450.0 C 337.5 446.7 337.5 443.3 337.5 440.0 C 337.5 436.7 337.5 433.3 337.5 430.0 C 337.5 426.7 337.5 423.3 337.5 420.0 C 337.5 416.7 337.5 413.3 337.5 410.0 C 337.5 406.7 337.4 403.3 337.5 400.0 C 337.6 396.7 337.8 393.3 338.0 390.0 C 338.2 386.7 338.2 383.2 338.5 380.0 C 338.8 376.8 339.5 373.3 340.0 371.0 C 340.5 368.7 339.4 367.8 341.5 366.0 C 343.6 364.2 351.2 362.7 352.5 360.0 C 353.8 357.3 346.1 348.0 349.5 350.0 C 352.9 352.0 367.8 366.7 373.0 372.0 C 378.3 377.3 378.4 378.7 381.0 382.0 C 383.6 385.3 386.3 388.7 388.5 392.0 C 390.8 395.3 392.5 398.7 394.5 402.0 C 396.5 405.3 398.6 408.7 400.5 412.0 C 402.4 415.3 404.3 418.7 406.0 422.0 C 407.8 425.3 409.3 428.7 411.0 432.0 C 412.7 435.3 414.3 438.7 416.0 442.0 C 417.7 445.3 419.5 448.7 421.0 452.0 C 422.5 455.3 423.7 458.7 425.0 462.0 C 426.3 465.3 427.8 468.7 429.0 472.0 C 430.3 475.3 431.3 478.7 432.5 482.0 C 433.8 485.3 435.3 488.7 436.5 492.0 C 437.7 495.3 438.5 498.7 439.5 502.0 C 440.5 505.3 441.5 508.7 442.5 512.0 C 443.5 515.3 444.7 519.0 445.5 522.0 C 446.3 525.0 445.1 517.8 447.5 530.0 C 449.9 542.2 458.0 585.7 460.0 595.0 C 462.0 604.3 459.7 589.2 459.5 586.0 C 459.3 582.8 459.3 579.3 459.0 576.0 C 458.8 572.7 458.2 569.3 458.0 566.0 C 457.8 562.7 458.2 559.3 458.0 556.0 C 457.8 552.7 457.3 549.3 457.0 546.0 C 456.7 542.7 454.9 539.3 456.0 536.0 C 457.1 532.7 462.3 529.3 463.5 526.0 C 464.8 522.7 463.4 519.3 463.5 516.0 C 463.6 512.7 463.8 509.3 464.0 506.0 C 464.2 502.7 464.4 499.3 464.5 496.0 C 464.6 492.7 464.4 489.3 464.5 486.0 C 464.6 482.7 464.8 479.3 465.0 476.0 C 465.2 472.7 465.4 469.3 465.5 466.0 C 465.6 462.7 465.5 459.3 465.5 456.0 C 465.5 452.7 465.5 449.3 465.5 446.0 C 465.5 442.7 465.5 439.3 465.5 436.0 C 465.5 432.7 465.5 429.3 465.5 426.0 C 465.5 422.7 465.5 419.3 465.5 416.0 C 465.5 412.7 465.5 409.3 465.5 406.0 C 465.5 402.7 465.4 399.3 465.5 396.0 C 465.6 392.7 465.9 389.3 466.0 386.0 C 466.1 382.7 465.8 379.3 466.0 376.0 C 466.2 372.7 466.8 369.3 467.0 366.0 C 467.3 362.7 467.3 359.3 467.5 356.0 C 467.8 352.7 468.3 347.7 468.5 346.0",
  },
  robotics: {
    dark: roboticsDark,
    light: roboticsLight,
    mask: roboticsMask,
    w: 512,
    h: 512,
    penWidth: 23,
    part: { mask: roboticsGearMask, kind: "gear", origin: [137, 265] },
    pen: "M 165.0 307.0 C 165.1 305.8 165.3 302.8 165.5 300.0 C 165.8 297.2 166.3 293.3 166.5 290.0 C 166.8 286.7 166.8 283.3 167.0 280.0 C 167.3 276.7 167.8 273.3 168.0 270.0 C 168.2 266.7 167.9 263.3 168.0 260.0 C 168.1 256.7 168.4 253.3 168.5 250.0 C 168.6 246.7 168.5 243.3 168.5 240.0 C 168.5 236.7 168.5 233.3 168.5 230.0 C 168.5 226.7 168.5 223.3 168.5 220.0 C 168.5 216.7 168.5 213.3 168.5 210.0 C 168.5 206.7 168.4 203.3 168.5 200.0 C 168.6 196.7 168.8 192.8 169.0 190.0 C 169.3 187.2 169.1 185.5 170.0 183.0 C 170.9 180.5 171.8 174.5 174.5 175.0 C 177.3 175.5 183.3 182.5 186.5 186.0 C 189.8 189.5 191.8 192.7 194.0 196.0 C 196.3 199.3 198.1 202.7 200.0 206.0 C 201.9 209.3 203.8 212.7 205.5 216.0 C 207.2 219.3 208.6 222.7 210.0 226.0 C 211.4 229.3 212.7 232.7 214.0 236.0 C 215.3 239.3 216.8 242.7 218.0 246.0 C 219.2 249.3 220.2 253.2 221.0 256.0 C 221.8 258.8 221.6 256.2 223.0 263.0 C 224.4 269.8 228.5 292.0 229.5 297.0 C 230.5 302.0 229.1 295.3 229.0 293.0 C 228.9 290.7 229.1 286.3 229.0 283.0 C 228.9 279.7 228.2 276.3 228.5 273.0 C 228.8 269.7 230.5 266.3 231.0 263.0 C 231.5 259.7 231.3 256.3 231.5 253.0 C 231.7 249.7 231.8 246.3 232.0 243.0 C 232.2 239.7 232.4 236.3 232.5 233.0 C 232.6 229.7 232.5 226.3 232.5 223.0 C 232.5 219.7 232.5 216.3 232.5 213.0 C 232.5 209.7 232.5 206.3 232.5 203.0 C 232.5 199.7 232.4 196.3 232.5 193.0 C 232.6 189.7 232.8 186.3 233.0 183.0 C 233.2 179.7 233.4 174.7 233.5 173.0",
  },
};
