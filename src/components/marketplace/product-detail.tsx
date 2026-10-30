"use client";

import { money } from "@/lib/catalog";
import { MARKET_CATALOG } from "@/lib/marketplace-data";
import { useMarket } from "./marketplace-provider";

export function MarketProductDetail() {
  const { detailProduct, gi, setGi, size, setSize, qty, setQty, backToGrid, waPlain, add, openDetail } = useMarket();
  if (!detailProduct) return null;
  const p = detailProduct;
  const activeSize = size || p.sizes[0];

  const related = MARKET_CATALOG.filter((x) => x.id !== p.id && x.category === p.category)
    .concat(MARKET_CATALOG.filter((x) => x.id !== p.id && x.category !== p.category))
    .slice(0, 4);

  return (
    <main className="pt-[110px]">
      <div className="flex items-center gap-2.5 px-[clamp(18px,3vw,48px)] pb-[18px] text-[10px] font-semibold tracking-[.2em] text-ink/60 uppercase">
        <button type="button" onClick={backToGrid} className="text-ink">
          Marketplace
        </button>
        <span>/</span>
        <span>{p.category}</span>
        <span>/</span>
        <span className="text-orange">{p.name}</span>
      </div>

      <section className="grid items-start gap-[clamp(24px,3vw,56px)] px-[clamp(18px,3vw,48px)] pb-[clamp(48px,6vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden bg-[#EFE3C4]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.imgs[gi] || p.imgs[0]} alt={p.alt} className="h-full w-full object-cover" />
          </div>
          {p.imgs.length > 1 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {p.imgs.map((im, i) => (
                <button
                  key={im + i}
                  type="button"
                  onClick={() => setGi(i)}
                  aria-label={"Ver imagen " + (i + 1)}
                  className="aspect-[4/5] w-[clamp(64px,7vw,88px)] overflow-hidden border-2 bg-[#EFE3C4] p-0"
                  style={{ borderColor: i === gi ? "#202916" : "transparent" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={im} alt="" className="h-full w-full object-cover" style={{ opacity: i === gi ? 1 : 0.72 }} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-[520px]">
          <div className="text-[10px] font-semibold tracking-[.24em] text-orange uppercase">{p.category}</div>
          <h1 className="mt-2.5 font-display text-[clamp(46px,5.6vw,82px)] leading-[.88]">{p.name}</h1>
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-baseline gap-3">
              <span className="text-[24px] font-bold" style={{ color: p.oldPrice ? "#F06A1D" : "#202916" }}>
                {money(p.price)}
              </span>
              {p.oldPrice && (
                <>
                  <span className="text-[16px] font-medium text-ink/50 line-through">{money(p.oldPrice)}</span>
                  <span className="bg-orange px-2 py-1 text-[9.5px] font-extrabold tracking-[.16em] text-forest uppercase">Oferta</span>
                </>
              )}
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[.18em] text-ink/60 uppercase">
              <span className="size-[7px] rounded-full bg-whatsapp" />
              Disponible
            </span>
          </div>
          <p className="mt-5 text-[15px] leading-[1.75] text-ink/80 text-pretty">{p.desc}</p>

          <div className="mt-[26px]">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[10px] font-bold tracking-[.2em] uppercase">Talla</span>
              <span className="text-[10px] font-medium tracking-[.16em] text-ink/60 uppercase">
                {p.sizes.length > 1 ? "Consultanos por disponibilidad" : "Talla única"}
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={activeSize === s}
                  className="min-w-[52px] border px-3.5 py-3.5 text-[12px] font-bold tracking-[.08em] transition-colors"
                  style={{
                    borderColor: activeSize === s ? "#202916" : "#20291633",
                    background: activeSize === s ? "#202916" : "transparent",
                    color: activeSize === s ? "#FCF2D9" : "#202916",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-stretch gap-3">
            <div className="flex items-center border border-ink/20">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Restar"
                className="h-[52px] w-[46px] text-[18px]"
              >
                −
              </button>
              <span className="min-w-9 text-center text-[14px] font-bold">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Sumar" className="h-[52px] w-[46px] text-[18px]">
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => add(p, activeSize, qty)}
              className="min-h-[52px] flex-1 basis-[220px] bg-ink text-[11.5px] font-extrabold tracking-[.2em] text-cream uppercase transition-colors hover:bg-orange hover:text-forest"
            >
              Agregar al carrito
            </button>
          </div>

          <a
            href={waPlain}
            target="_blank"
            rel="noopener"
            className="mt-2.5 flex items-center justify-center gap-2.5 border border-ink/20 px-0 py-[15px] text-[10.5px] font-bold tracking-[.18em] text-ink uppercase transition-colors hover:bg-ink/6"
          >
            Consultar por WhatsApp
          </a>

          <div className="mt-[30px] border-t border-ink/15">
            {p.specs.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4.5 border-b border-ink/15 py-3.5 text-[12.5px] font-medium">
                <span className="text-[10.5px] font-bold tracking-[.14em] text-ink/60 uppercase">{k}</span>
                <span className="text-right text-ink">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/15 px-[clamp(18px,3vw,48px)] pt-[clamp(40px,5vw,68px)] pb-[clamp(60px,7vw,96px)]">
        <h2 className="mb-[22px] font-display text-[clamp(34px,4vw,54px)] leading-[.9]">También te puede servir</h2>
        <div className="grid gap-[clamp(18px,2.4vw,34px)] [grid-template-columns:repeat(auto-fill,minmax(clamp(200px,20vw,270px),1fr))]">
          {related.map((r) => (
            <button key={r.id} type="button" onClick={() => openDetail(r.id)} className="group block w-full p-0 text-left">
              <div className="aspect-[4/5] overflow-hidden bg-[#EFE3C4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.imgs[0]}
                  alt={r.alt}
                  className="h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.16,.84,.24,1)] group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[24px] leading-none">{r.name}</h3>
                <span className="text-[13px] font-bold">{money(r.price)}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
