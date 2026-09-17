import Link from "next/link";
import { Glyph } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col justify-center py-28 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Glyph height={56} />
        <h1 className="display mt-8 text-[clamp(2.2rem,6vw,4rem)]">Sayfa yok</h1>
        <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-dim">
          Aradığınız adres taşınmış ya da hiç var olmamış olabilir.
        </p>
        <Link href="/" className="ghost-btn mt-9">
          Ana sayfa
        </Link>
      </div>
    </section>
  );
}
