"use client";

import Link from "next/link";
import { useMarket } from "./marketplace-provider";

export function MarketFooter() {
  const { waPlain } = useMarket();

  return (
    <footer className="bg-footer px-[clamp(18px,3vw,48px)] pt-[clamp(44px,5vw,64px)] text-cream">
      <div className="flex flex-wrap justify-between gap-[clamp(26px,5vw,64px)] pb-[clamp(34px,4vw,52px)]">
        <div className="min-w-[220px] flex-1 basis-[240px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/isotype-cream.png" alt="Isotipo Perezoso" className="mb-5 w-[110px] opacity-85" />
          <p className="max-w-[280px] text-[13.5px] leading-[1.85] text-cream/80">
            Marca deportiva 100% costarricense. Bikewear funcional con actitud streetwear.
          </p>
        </div>
        <div className="flex-[0_1_160px]">
          <div className="mb-4 text-[9.5px] font-semibold tracking-[.24em] text-orange uppercase">Navegación</div>
          <div className="grid gap-[11px] text-[13px] font-medium">
            <Link href="/" className="text-cream/90 hover:text-cream">
              Home
            </Link>
            <Link href="/nosotros" className="text-cream/90 hover:text-cream">
              Nosotros
            </Link>
            <a href="#top" className="text-cream/90 hover:text-cream">
              Marketplace
            </a>
            <Link href="/galeria" className="text-cream/90 hover:text-cream">
              Galería
            </Link>
            <Link href="/contacto" className="text-cream/90 hover:text-cream">
              Contacto
            </Link>
          </div>
        </div>
        <div className="flex-[0_1_200px]">
          <div className="mb-4 text-[9.5px] font-semibold tracking-[.24em] text-orange uppercase">Contacto</div>
          <div className="grid gap-[11px] text-[13px] leading-[1.6] text-cream/90">
            <a href="mailto:theperezosocompanycr@gmail.com" className="text-cream/90 break-all hover:text-cream">
              theperezosocompanycr@gmail.com
            </a>
            <a href={waPlain} target="_blank" rel="noopener" className="text-cream/90 hover:text-cream">
              +506 8312-7667
            </a>
            <span>San Rafael de Heredia, Costa Rica</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-3.5 border-t border-cream/10 py-[18px] text-[11px] font-medium tracking-[.14em] text-cream/65 uppercase">
        <span>© 2026 Perezoso &amp; CO. Todos los derechos reservados.</span>
        <span>Ni lentos ni perezosos.</span>
      </div>
    </footer>
  );
}
