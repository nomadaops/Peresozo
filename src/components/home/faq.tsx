"use client";

import { useState } from "react";
import { useSite } from "@/components/site-provider";
import { FAQ, FAQ_CATS } from "@/lib/catalog";

export function Faq() {
  const { waPlain } = useSite();
  const [cat, setCat] = useState<(typeof FAQ_CATS)[number]>("Todas");
  const [open, setOpen] = useState(0);

  const list = FAQ.filter((f) => cat === "Todas" || f.cat === cat);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-cream px-[clamp(18px,3vw,48px)] pt-[clamp(56px,7vw,96px)] pb-[clamp(60px,7vw,104px)] text-forest [scroll-margin-top:86px]"
    >
      <div className="relative grid items-start gap-[clamp(30px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
        <div className="md:sticky md:top-[110px]">
          <div className="mb-2.5 text-[10.5px] font-semibold tracking-[.26em] text-orange uppercase">
            Preguntas frecuentes
          </div>
          <h2 className="font-display text-[clamp(52px,7vw,104px)] leading-[.84]">
            Antes de
            <br />
            rodar
          </h2>
          <p className="mt-[18px] max-w-[360px] text-[14.5px] leading-[1.75] text-forest/80">
            Lo que más nos preguntan sobre pedidos, pagos y prendas.
          </p>
          <div className="mt-[26px] flex flex-wrap gap-2">
            {FAQ_CATS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCat(c);
                  setOpen(0);
                }}
                aria-pressed={cat === c}
                className="border px-4 py-2.5 text-[10.5px] font-bold tracking-[.16em] uppercase transition-colors"
                style={{
                  borderColor: cat === c ? "#141D10" : "#141D1033",
                  background: cat === c ? "#141D10" : "transparent",
                  color: cat === c ? "#FCF2D9" : "#141D10",
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-[34px] max-w-[360px] border-t border-forest/15 pt-5">
            <div className="font-display text-[26px] leading-none">¿No encontrás tu respuesta?</div>
            <a
              href={waPlain}
              target="_blank"
              rel="noopener"
              className="mt-3.5 inline-flex items-center gap-2.5 bg-forest px-6 py-[15px] text-[10.5px] font-extrabold tracking-[.2em] text-cream uppercase transition-colors hover:bg-orange hover:text-forest"
            >
              Escribinos por WhatsApp →
            </a>
          </div>
        </div>

        <div className="border-t border-forest/20">
          {list.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-forest/20 [animation:riseIn_.35s_ease_both]">
                <button
                  type="button"
                  onClick={() => setOpen((o) => (o === i ? -1 : i))}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-[clamp(14px,2vw,26px)] py-[clamp(18px,2.2vw,26px)] text-left hover:text-orange"
                >
                  <span
                    className="w-[34px] flex-none text-[11px] font-bold tracking-[.12em]"
                    style={{ color: isOpen ? "#F06A1D" : "#141D1066" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-display text-[clamp(24px,2.4vw,34px)] leading-[1.02]">{f.q}</span>
                  <span
                    className="grid size-[34px] flex-none place-items-center border text-[20px] leading-none text-forest transition-[transform,background] duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)]"
                    style={{
                      borderColor: isOpen ? "#F06A1D" : "#141D1033",
                      background: isOpen ? "#F06A1D" : "transparent",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div
                      className="pr-[clamp(48px,6vw,60px)] pb-[26px] pl-[clamp(48px,4.4vw,60px)] transition-opacity duration-300"
                      style={{ opacity: isOpen ? 1 : 0 }}
                    >
                      <p className="max-w-[560px] text-[15px] leading-[1.75] text-forest/85 text-pretty">{f.a}</p>
                      {f.facts && f.facts.length > 0 && (
                        <div className="mt-[18px] flex flex-wrap gap-[clamp(18px,3vw,40px)]">
                          {f.facts.map((fx) => (
                            <div key={fx.k}>
                              <div className="font-display text-[clamp(36px,4vw,52px)] leading-[.9] text-orange">{fx.v}</div>
                              <div className="mt-1 text-[10px] font-semibold tracking-[.18em] text-forest/60 uppercase">{fx.k}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
