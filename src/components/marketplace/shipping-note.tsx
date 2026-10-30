"use client";

import { useMarket } from "./marketplace-provider";

export function MarketShippingNote() {
  const { waPlain } = useMarket();

  return (
    <section className="bg-ink px-[clamp(18px,3vw,48px)] py-[clamp(34px,4vw,54px)] text-cream">
      <div className="flex flex-wrap items-center justify-between gap-[clamp(20px,3vw,44px)]">
        <div className="flex flex-wrap gap-[clamp(20px,3vw,52px)]">
          <div>
            <div className="font-display text-[32px] leading-none">Envíos a todo el país</div>
            <div className="mt-0.5 text-[12.5px] text-cream/60">Correos de Costa Rica y encomiendas</div>
          </div>
          <div>
            <div className="font-display text-[32px] leading-none text-gold">Pedidos por WhatsApp</div>
            <div className="mt-0.5 text-[12.5px] text-cream/60">Coordinamos pago y entrega directo con vos</div>
          </div>
        </div>
        <a href={waPlain} target="_blank" rel="noopener" className="bg-orange px-[30px] py-4 text-[11px] font-extrabold tracking-[.2em] text-forest uppercase">
          Escribinos
        </a>
      </div>
    </section>
  );
}
