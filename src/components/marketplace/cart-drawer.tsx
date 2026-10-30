"use client";

import { useMarket } from "./marketplace-provider";

export function MarketCartDrawer() {
  const { cartOpen, closeCart, count, cartEmpty, rows, subtotalLabel, waCheckout, openOrderForm } = useMarket();
  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div onClick={closeCart} className="absolute inset-0 bg-[#0a0d06]/80 [animation:fade_.25s_ease_both]" />
      <aside
        role="dialog"
        aria-label="Carrito"
        className="relative flex w-[min(430px,100%)] flex-col bg-ink text-cream [animation:slideIn_.32s_cubic-bezier(.2,.8,.2,1)_both]"
      >
        <div className="flex items-center justify-between border-b border-cream/12 px-6 py-[22px]">
          <div className="flex items-baseline gap-2.5">
            <h2 className="font-display text-[34px] leading-none">Tu pedido</h2>
            <span className="text-[10px] font-semibold tracking-[.2em] text-orange uppercase">{count} ítems</span>
          </div>
          <button type="button" onClick={closeCart} aria-label="Cerrar carrito" className="text-[26px] leading-none text-cream">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2">
          {cartEmpty && (
            <div className="px-2.5 py-[70px] text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/isotype-cream.png" alt="" className="mx-auto mb-[22px] w-[120px] opacity-16" />
              <div className="font-display text-[34px] leading-none">Carrito vacío</div>
              <p className="mt-2 text-[12.5px] leading-[1.7] text-cream/53">Todavía no agregaste prendas.</p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-6 border border-cream/30 px-[26px] py-3.5 text-[10.5px] font-extrabold tracking-[.2em] text-cream uppercase"
              >
                Seguir comprando
              </button>
            </div>
          )}
          {rows.map((r) => (
            <div key={r.key} className="flex gap-3.5 border-b border-cream/8 py-[18px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.img} alt={r.alt} className="h-[88px] w-[72px] flex-none bg-[#2b361d] object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-2.5">
                  <h3 className="font-display text-[23px] leading-[1.05]">{r.name}</h3>
                  <button type="button" onClick={r.remove} aria-label="Quitar" className="text-[10px] tracking-[.16em] text-cream/40 uppercase">
                    Quitar
                  </button>
                </div>
                <div className="mt-1 text-[10.5px] font-medium tracking-[.14em] text-cream/53 uppercase">
                  Talla {r.size}
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center border border-cream/18">
                    <button type="button" onClick={r.dec} aria-label="Restar" className="size-[30px] text-cream">
                      −
                    </button>
                    <span className="min-w-[26px] text-center text-[12px] font-semibold">{r.qty}</span>
                    <button type="button" onClick={r.inc} aria-label="Sumar" className="size-[30px] text-cream">
                      +
                    </button>
                  </div>
                  <span className="text-[13.5px] font-bold">{r.lineLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-cream/12 px-6 pt-5 pb-6">
          <div className="flex items-baseline justify-between text-[11px] font-semibold tracking-[.2em] text-cream/60 uppercase">
            <span>Subtotal</span>
            <span className="font-display text-[34px] tracking-normal text-cream">{subtotalLabel}</span>
          </div>
          <p className="mt-1.5 text-[10.5px] leading-[1.6] text-cream/40">El envío se coordina por WhatsApp.</p>
          <a
            href={waCheckout}
            target="_blank"
            rel="noopener"
            className="mt-4 flex items-center justify-center gap-2.5 bg-whatsapp px-0 py-[19px] text-center text-[11.5px] font-black tracking-[.16em] text-[#0b1f12] uppercase"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-5.6-4.6c-.4-.6-1-1.6-1-3 0-1.4.8-2.1 1-2.4.3-.3.6-.3.8-.3h.6c.2 0 .4-.1.7.5l.9 2c.1.2.1.4 0 .6l-.4.6-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.5.1.7-.1l.8-1c.2-.2.4-.2.6-.1l2 .9c.2.1.4.2.4.3.1.1.1.6-.1 1.1Z" />
            </svg>
            Finalizar pedido por WhatsApp
          </a>
          <button
            type="button"
            onClick={openOrderForm}
            className="mt-2.5 w-full border border-cream/30 py-4 text-[10.5px] font-extrabold tracking-[.18em] text-cream uppercase"
          >
            Hacer pedido
          </button>
          <button
            type="button"
            onClick={closeCart}
            className="mt-2.5 w-full border border-cream/18 py-[15px] text-[10.5px] font-bold tracking-[.2em] text-cream/80 uppercase"
          >
            Seguir comprando
          </button>
        </div>
      </aside>
    </div>
  );
}
