"use client";

import { useState } from "react";
import { money } from "@/lib/catalog";
import { sizeLabel, type MarketProduct } from "@/lib/marketplace-data";
import { useMarket } from "./marketplace-provider";

function ProductCard({ p }: { p: MarketProduct }) {
  const { openDetail, add } = useMarket();
  const [hover, setHover] = useState(false);
  const hasAlt = p.imgs.length > 1;

  return (
    <article className="relative">
      <button
        type="button"
        onClick={() => openDetail(p.id)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="block w-full p-0 text-left"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#EFE3C4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.imgs[0]}
            alt={p.alt}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,.84,.24,1)]"
            style={{ transform: hover ? "scale(1.035)" : "scale(1)" }}
          />
          {hasAlt && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={p.imgs[1]}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[450ms] ease-in-out"
              style={{ opacity: hover ? 1 : 0, transform: hover ? "scale(1.035)" : "scale(1)" }}
            />
          )}
          {p.tag && (
            <span className="absolute top-0 left-0 bg-ink px-2.5 py-1.5 text-[9px] font-extrabold tracking-[.2em] text-cream uppercase">
              {p.tag}
            </span>
          )}
          <span
            className="absolute inset-x-3 bottom-3 bg-cream py-[11px] text-center text-[10px] font-extrabold tracking-[.2em] text-ink uppercase transition-all duration-300 ease-[cubic-bezier(.16,.84,.24,1)]"
            style={{ opacity: hover ? 1 : 0, transform: hover ? "translateY(0)" : "translateY(8px)" }}
          >
            Ver producto
          </span>
        </div>
        <div className="mt-3.5 flex items-baseline justify-between gap-3.5 border-b border-ink/15 pb-2.5">
          <div className="min-w-0">
            <h3 className="font-display text-[clamp(24px,2.1vw,30px)] leading-[1.02]">{p.name}</h3>
            <div className="mt-0.5 text-[10px] font-medium tracking-[.18em] text-ink/60 uppercase">
              {p.category} · {sizeLabel(p)}
            </div>
          </div>
          <div className="flex flex-col items-end gap-0.5 whitespace-nowrap">
            {p.oldPrice && <span className="text-[12px] font-medium text-ink/50 line-through">{money(p.oldPrice)}</span>}
            <span className="text-[15px] font-bold" style={{ color: p.oldPrice ? "#F06A1D" : "#202916" }}>
              {money(p.price)}
            </span>
          </div>
        </div>
      </button>
      <div className="mt-2.5 flex items-center gap-2">
        <span className="text-[9.5px] font-medium tracking-[.18em] text-ink/60 uppercase">Agregar</span>
        <div className="flex flex-wrap gap-1.5">
          {p.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => add(p, s, 1)}
              aria-label={"Agregar " + p.name + " talla " + s}
              className="min-w-8 border border-ink/20 px-2 py-1.5 text-[10px] font-bold tracking-[.1em] transition-colors hover:border-ink hover:bg-ink hover:text-cream"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

export function MarketProductGrid() {
  const { filtered, clearFilters } = useMarket();

  return (
    <section className="px-[clamp(18px,3vw,48px)] pt-[clamp(28px,4vw,52px)] pb-[clamp(60px,7vw,96px)]">
      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <div className="font-display text-[44px] leading-none">Sin resultados</div>
          <p className="mt-2 text-[14px] text-ink/60">Probá con otra búsqueda o categoría.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-[22px] border border-ink px-[26px] py-3.5 text-[10.5px] font-extrabold tracking-[.2em] uppercase"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      <div className="grid gap-[clamp(24px,3vw,48px)_clamp(18px,2.4vw,34px)] grid-cols-1 min-[560px]:grid-cols-2 min-[1100px]:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
