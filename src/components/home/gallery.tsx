"use client";

import Link from "next/link";
import { useState } from "react";
import { useSite } from "@/components/site-provider";
import { GALLERY, REVIEWS } from "@/lib/catalog";
import { useViewportWidth } from "@/lib/use-viewport";

function Reviews() {
  const w = useViewportWidth();
  const [pageState, setPage] = useState(0);

  const per = w >= 1100 ? 4 : w >= 760 ? 2 : 1;
  const pages = Math.ceil(REVIEWS.length / per);
  const page = Math.min(pageState, pages - 1);
  const gap = w >= 1100 ? 22 : 14;
  const avg = REVIEWS.reduce((n, r) => n + r.rating, 0) / REVIEWS.length;

  return (
    <div className="mt-[clamp(56px,7vw,96px)] border-t border-forest/15 pt-[clamp(34px,4vw,52px)]">
      <div className="mb-[clamp(26px,3vw,40px)] flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="mb-2 text-[10.5px] font-semibold tracking-[.26em] text-orange uppercase">Reseñas</div>
          <h2 className="font-display text-[clamp(42px,5.4vw,74px)] leading-[.86]">
            Lo que dice
            <br />
            la familia
          </h2>
        </div>
        <div className="flex items-center gap-[18px]">
          <div className="text-right">
            <div className="font-display text-[clamp(46px,5vw,64px)] leading-[.9]">{avg.toFixed(1).replace(".", ",")}</div>
            <div className="mt-1 flex justify-end gap-[3px] text-[15px] tracking-[1px] text-orange">★★★★★</div>
            <div className="mt-1 text-[10px] font-semibold tracking-[.16em] text-forest/60 uppercase">{REVIEWS.length} reseñas</div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((page - 1 + pages) % pages)}
              aria-label="Reseñas anteriores"
              className="grid size-[46px] place-items-center border border-forest/20 text-[18px] transition-colors hover:bg-forest hover:text-cream"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setPage((page + 1) % pages)}
              aria-label="Más reseñas"
              className="grid size-[46px] place-items-center border border-forest bg-forest text-[18px] text-cream transition-colors hover:border-orange hover:bg-orange hover:text-forest"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-[600ms] ease-[cubic-bezier(.2,.8,.2,1)]"
          style={{ gap, transform: `translateX(calc(${-page * 100}% - ${page * gap}px))` }}
        >
          {REVIEWS.map((r, i) => {
            const dark = i % 4 === 1;
            const initials = r.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("");
            return (
              <article
                key={r.name}
                className="flex min-h-[280px] min-w-0 flex-col justify-between gap-6 border border-forest/15 p-[clamp(22px,2.4vw,30px)]"
                style={{
                  flex: `0 0 calc((100% - ${gap * (per - 1)}px) / ${per})`,
                  background: dark ? "#141D10" : "transparent",
                  color: dark ? "#FCF2D9" : "#141D10",
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[14px] tracking-[2px] text-orange">{"★".repeat(r.rating)}</span>
                    <span className="text-[9.5px] font-semibold tracking-[.16em] uppercase opacity-60">{r.when}</span>
                  </div>
                  <p className="mt-[18px] text-[15px] leading-[1.7] font-medium text-pretty">“{r.text}”</p>
                </div>
                <div
                  className="flex items-center gap-3 border-t pt-4"
                  style={{ borderColor: dark ? "#FCF2D91f" : "#141D1020" }}
                >
                  <span
                    className="grid size-10 flex-none place-items-center font-display text-[19px] tracking-[.02em]"
                    style={{ background: dark ? "#F06A1D" : "#141D10", color: dark ? "#141D10" : "#FCF2D9" }}
                  >
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold">{r.name}</div>
                    <div className="mt-0.5 text-[11px] font-medium opacity-65">{r.product}</div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3.5">
        <div className="flex gap-1.5">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={"Ir a reseñas " + (i + 1)}
              className="h-[3px] p-0 transition-[width,background] duration-300"
              style={{ width: i === page ? 34 : 14, background: i === page ? "#F06A1D" : "#141D1033" }}
            />
          ))}
        </div>
        <span className="text-[11px] font-medium text-forest/50">Reseñas de muestra · pronto conectadas con Google</span>
      </div>
    </div>
  );
}

export function Gallery() {
  const { openLightbox } = useSite();

  return (
    <section
      id="galeria"
      className="relative isolate overflow-hidden bg-cream px-[clamp(18px,3vw,48px)] pt-[clamp(52px,7vw,88px)] pb-[clamp(60px,7vw,96px)] text-forest [scroll-margin-top:86px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[.05]"
        style={{ backgroundImage: "url(/brand/pattern-dark.png)", backgroundSize: "100% auto", backgroundRepeat: "repeat-y", backgroundPosition: "top center" }}
      />
      <div className="mb-[26px] flex flex-wrap items-end justify-between gap-5">
        <h2 className="font-display text-[clamp(42px,5.4vw,74px)] leading-[.86]">Galería</h2>
        <Link
          href="/galeria"
          className="border-b-2 border-orange pb-[5px] text-[11px] font-bold tracking-[.2em] uppercase"
        >
          Ver galería →
        </Link>
      </div>
      <div className="grid gap-2 [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]">
        {GALLERY.map((g) => (
          <button
            key={g.img}
            type="button"
            onClick={() => openLightbox(g.img, g.alt)}
            className="group relative block overflow-hidden p-0 [aspect-ratio:3/4]"
          >
            <div
              role="img"
              aria-label={g.alt}
              className="h-full w-full bg-cover bg-center transition-transform duration-[800ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
              style={{ backgroundImage: `url(${g.img})` }}
            />
            <span className="absolute bottom-[10px] left-3 text-[9px] font-semibold tracking-[.2em] text-cream uppercase [text-shadow:0_1px_8px_#141D10]">
              {g.caption}
            </span>
          </button>
        ))}
      </div>

      <Reviews />
    </section>
  );
}
