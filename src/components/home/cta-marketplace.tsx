"use client";

import Link from "next/link";
import { useSite } from "@/components/site-provider";

export function CtaMarketplace() {
  const { waPlain } = useSite();

  return (
    <section className="relative isolate overflow-hidden bg-orange px-[clamp(18px,3vw,48px)] py-[clamp(60px,8vw,110px)] text-forest">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[.09]"
        style={{ backgroundImage: "url(/brand/pattern-dark-tile.png)", backgroundSize: "616px auto", backgroundRepeat: "repeat" }}
      />
      <div className="relative flex flex-wrap items-end justify-between gap-[34px]">
        <div>
          <div className="mb-[18px] text-[10.5px] font-semibold tracking-[.28em] uppercase">10 — Marketplace</div>
          <h2 className="font-display text-[clamp(52px,8.4vw,124px)] leading-[.84]">
            Equipate
            <br />y salí a rodar
          </h2>
        </div>
        <div className="max-w-[420px] bg-forest px-8 pt-[30px] pb-8 text-cream shadow-[14px_14px_0_rgba(20,29,16,.15)]">
          <div className="flex items-center gap-2.5 text-[9.5px] font-extrabold tracking-[.26em] text-orange uppercase">
            <span className="size-[7px] rounded-full bg-whatsapp" /> Pedidos abiertos
          </div>
          <p className="mt-[14px] text-[18px] leading-[1.55] font-black text-cream">
            Envíos a todo Costa Rica. Pedidos y consultas directas por WhatsApp.
          </p>
          <div className="my-[22px] flex border-y border-cream/12">
            <div className="flex-1 py-3.5">
              <div className="font-display text-[30px] leading-none">24 h</div>
              <div className="text-[9px] font-medium tracking-[.2em] text-cream/53 uppercase">Respuesta</div>
            </div>
            <div className="flex-1 border-l border-cream/12 py-3.5 pl-5">
              <div className="font-display text-[30px] leading-none">GAM</div>
              <div className="text-[9px] font-medium tracking-[.2em] text-cream/53 uppercase">Entrega 1—2 días</div>
            </div>
          </div>
          <div className="-mt-2 mb-[18px] flex items-start gap-2.5 text-[12.5px] leading-[1.55] font-medium text-cream/85">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F06A1D" strokeWidth="1.8" aria-hidden="true" className="mt-0.5 flex-none">
              <path d="M3 7h11v9H3z" />
              <path d="M14 10h4l3 3v3h-7" />
              <circle cx="7" cy="17.5" r="1.6" />
              <circle cx="17" cy="17.5" r="1.6" />
            </svg>
            <span>
              Entregas personales en el GAM <span className="font-bold text-orange">*costo adicional</span>
            </span>
          </div>
          <div className="grid gap-2.5">
            <a
              href={waPlain}
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center gap-2.5 bg-whatsapp px-[18px] py-[18px] text-[12px] font-black tracking-[.18em] text-[#0b1f12] uppercase transition-transform duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-5.6-4.6c-.4-.6-1-1.6-1-3 0-1.4.8-2.1 1-2.4.3-.3.6-.3.8-.3h.6c.2 0 .4-.1.7.5l.9 2c.1.2.1.4 0 .6l-.4.6-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.5.1.7-.1l.8-1c.2-.2.4-.2.6-.1l2 .9c.2.1.4.2.4.3.1.1.1.6-.1 1.1Z" />
              </svg>
              Pedir por WhatsApp
            </a>
            <Link
              href="/marketplace"
              className="border border-cream/24 py-[15px] text-center text-[11px] font-extrabold tracking-[.2em] text-cream uppercase transition-colors hover:bg-cream/8"
            >
              Ir al marketplace
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
