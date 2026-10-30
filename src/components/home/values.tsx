"use client";

import { useState } from "react";
import { VALUES } from "@/lib/catalog";

export function Values() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setFlipped((s) => ({ ...s, [k]: !s[k] }));

  return (
    <section className="relative overflow-hidden border-t border-cream/8 bg-forest px-[clamp(18px,3vw,48px)] py-[clamp(56px,7vw,96px)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/pattern-cream.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-auto w-full opacity-[.03]"
      />
      <div className="relative mb-[clamp(30px,4vw,52px)] flex items-baseline gap-5">
        <span className="text-[10.5px] font-semibold tracking-[.26em] text-orange uppercase">Valores de marca</span>
      </div>
      <div className="relative border-t border-cream/12">
        {VALUES.map((v, i) => {
          const isFlipped = !!flipped[v.k];
          const num = "0" + (i + 1);
          return (
            <div key={v.k} className="border-b border-cream/12 [perspective:1400px]">
              <button
                type="button"
                onClick={() => toggle(v.k)}
                aria-expanded={isFlipped}
                className="block w-full text-left"
              >
                <div
                  className="relative h-[clamp(96px,13vw,168px)] transition-transform duration-[780ms] ease-[cubic-bezier(.16,.84,.24,1)] [transform-style:preserve-3d]"
                  style={{ transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)" }}
                >
                  <div className="absolute inset-0 flex items-center gap-[clamp(14px,2.4vw,34px)] [backface-visibility:hidden]">
                    <h3
                      className="font-display text-[clamp(48px,8.4vw,116px)] leading-[.84]"
                      style={{ color: v.accent }}
                    >
                      {v.n}
                    </h3>
                    <span className="ml-auto grid size-[34px] flex-none place-items-center border border-cream/24 text-[17px] text-cream/60">
                      +
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center gap-[clamp(14px,2.4vw,34px)] [backface-visibility:hidden] [transform:rotateX(180deg)]">
                    <span className="w-9 flex-none text-[9.5px] font-semibold tracking-[.24em] text-orange">
                      {num}
                    </span>
                    <div className="min-w-0 max-w-[760px] flex-1">
                      <div className="font-display text-[clamp(26px,3.2vw,40px)] leading-none text-cream">
                        {v.sub}
                      </div>
                      <p className="mt-2 max-w-[620px] text-[clamp(14px,1.15vw,17px)] leading-[1.6] text-cream/72 text-pretty">
                        {v.body}
                      </p>
                    </div>
                    <span className="ml-auto grid size-[34px] flex-none place-items-center border border-orange text-[17px] text-orange">
                      −
                    </span>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
