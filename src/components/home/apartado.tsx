"use client";

import Link from "next/link";
import { useSite } from "@/components/site-provider";

export function Apartado() {
  const { waPlain } = useSite();

  return (
    <section
      id="marketplace"
      className="relative overflow-hidden bg-cream px-[clamp(18px,3vw,48px)] pt-[clamp(56px,7vw,88px)] pb-[clamp(60px,7vw,96px)] text-forest [scroll-margin-top:86px]"
    >
      <div className="relative mb-[clamp(34px,4vw,56px)] flex flex-wrap items-end justify-between gap-[22px]">
        <div>
          <div className="mb-4 text-[10.5px] font-semibold tracking-[.26em] text-orange uppercase">Sistema de apartado</div>
          <h2 className="font-display text-[clamp(42px,5.4vw,74px)] leading-[.86]">Apartá tu producto</h2>
          <p className="mt-3.5 max-w-[440px] text-[14px] leading-[1.7] text-forest/80">
            Asegurá tu prenda hoy y terminá de pagarla a tu ritmo.
          </p>
        </div>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-3 bg-forest px-7 py-4 text-[11px] font-extrabold tracking-[.2em] text-cream uppercase transition-colors hover:bg-orange hover:text-forest"
        >
          Ver marketplace <span className="text-[14px]">→</span>
        </Link>
      </div>

      <div className="relative grid gap-0.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
        <div className="relative flex min-h-[clamp(320px,30vw,400px)] flex-col justify-between overflow-hidden bg-orange p-[clamp(26px,3vw,40px)] text-forest transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/isotype-dark.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-[50px] -right-[70px] w-[240px] opacity-[.08]"
          />
          <div className="relative flex items-center justify-between text-[10px] font-bold tracking-[.24em] uppercase">
            <span>Paso 01</span>
            <span className="bg-forest px-2.5 py-1.5 text-cream">Apartá</span>
          </div>
          <div className="relative">
            <div className="font-display text-[clamp(64px,7.4vw,150px)] leading-[.82] whitespace-nowrap">15%</div>
            <p className="mt-3.5 max-w-[320px] text-[15px] leading-[1.6] font-semibold">
              Pagás el 15% del valor del producto y queda reservado a tu nombre.
            </p>
          </div>
        </div>

        <div className="relative flex min-h-[clamp(320px,30vw,400px)] flex-col justify-between overflow-hidden bg-forest p-[clamp(26px,3vw,40px)] text-cream transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1">
          <div className="relative flex items-center justify-between text-[10px] font-bold tracking-[.24em] text-cream/80 uppercase">
            <span>Paso 02</span>
            <span className="bg-cream px-2.5 py-1.5 text-forest">Retirá</span>
          </div>
          <div className="relative">
            <div className="font-display text-[clamp(64px,7.4vw,150px)] leading-[.82] whitespace-nowrap">45 días</div>
            <p className="mt-3.5 max-w-[340px] text-[15px] leading-[1.6] font-medium text-cream">
              Tenés hasta mes y medio para retirar tu producto y cancelar el monto restante.
            </p>
          </div>
        </div>

        <Link
          href="/marketplace"
          className="group relative block min-h-[clamp(320px,30vw,400px)] overflow-hidden text-cream"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/jersey-hold.jpg"
            alt="Rider mostrando un jersey Perezoso"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-b from-forest/0 from-40% to-forest/88" />
          <div className="absolute inset-x-[clamp(22px,2.6vw,34px)] bottom-[clamp(22px,2.6vw,32px)] flex items-end justify-between gap-3.5">
            <div>
              <div className="mb-1.5 text-[10px] font-bold tracking-[.24em] text-orange uppercase">Paso 03</div>
              <div className="font-display text-[clamp(40px,4vw,58px)] leading-[.9]">A rodar.</div>
            </div>
            <span className="grid size-[46px] flex-none place-items-center bg-orange text-[18px] font-bold text-forest">→</span>
          </div>
        </Link>
      </div>

      <div className="relative mt-[22px] flex flex-wrap items-center justify-between gap-x-7 gap-y-3">
        <p className="text-[12.5px] leading-[1.6] font-medium text-forest/70">*Aplica solo para productos en stock.</p>
        <p className="text-[12.5px] leading-[1.6] font-medium text-forest">
          ¿Buscás algo de un próximo drop?{" "}
          <a href={waPlain} target="_blank" rel="noopener" className="border-b border-orange font-bold text-orange">
            Contactanos
          </a>{" "}
          y te respondemos en menos de 24 h.
        </p>
      </div>
    </section>
  );
}
