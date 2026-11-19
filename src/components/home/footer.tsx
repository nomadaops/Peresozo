"use client";

import Link from "next/link";
import { useSite } from "@/components/site-provider";

export function Footer() {
  const { waPlain } = useSite();

  return (
    <footer
      id="contacto"
      className="relative overflow-hidden bg-footer px-[clamp(18px,3vw,48px)] pt-[clamp(50px,6vw,76px)] text-cream [scroll-margin-top:86px]"
    >
      <div className="flex flex-wrap justify-between gap-[clamp(28px,5vw,72px)] pb-[clamp(40px,5vw,64px)]">
        <div className="min-w-[220px] flex-1 basis-[240px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/isotype-cream.png" alt="Isotipo Perezoso" className="mb-[22px] w-[120px] opacity-85" />
          <p className="max-w-[280px] text-[13.5px] leading-[1.85] text-cream/80">
            Marca deportiva 100% costarricense. Bikewear funcional con actitud streetwear.
          </p>
        </div>
        <div className="flex-[0_1_160px]">
          <div className="mb-4 text-[9.5px] font-semibold tracking-[.24em] text-orange uppercase">Navegación</div>
          <div className="grid gap-[11px] text-[13px] font-medium">
            <Link href="/#top" className="text-cream/90 hover:text-cream">
              Home
            </Link>
            <Link href="/nosotros" className="text-cream/90 hover:text-cream">
              Nosotros
            </Link>
            <Link href="/marketplace" className="text-cream/90 hover:text-cream">
              Marketplace
            </Link>
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
            <a href="mailto:theperezosocompanycr@gmail.com" className="text-cream/80 break-all hover:text-cream">
              theperezosocompanycr@gmail.com
            </a>
            <a href={waPlain} target="_blank" rel="noopener" className="text-cream/90 hover:text-cream">
              +506 8312-7667
            </a>
            <span>San Rafael de Heredia, Costa Rica</span>
          </div>
        </div>
        <div className="flex-[0_1_180px]">
          <div className="mb-4 text-[9.5px] font-semibold tracking-[.24em] text-orange uppercase">Seguinos</div>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/perezoso.506"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-cream/80 transition-colors hover:text-orange"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@perezoso.company"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-cream/80 transition-colors hover:text-orange"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.43 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.07 2.52 5.5 5.6 5.5 3.1 0 5.6-2.5 5.6-5.6V9.35a7.3 7.3 0 0 0 4.29 1.38V7.64s-1.88.09-3.45-1.82Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3.5 border-t border-cream/10 py-[18px] text-[11px] font-medium tracking-[.14em] text-cream/65 uppercase">
        <span>© 2026 Perezoso &amp; CO. Todos los derechos reservados.</span>
        <a
          href="https://nomadaops.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-[7px] text-cream/50 normal-case tracking-normal transition-colors hover:text-cream/80"
        >
          <span className="text-[10px]">Powered by</span>
          <span className="text-[13px] font-bold tracking-[.18em]">NOMADA</span>
        </a>
      </div>
    </footer>
  );
}
