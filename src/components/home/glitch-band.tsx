function GlitchLine({ color, isoOpacity }: { color: string; isoOpacity: number }) {
  const isoSrc = color === "#FCF2D9" ? "/brand/isotype-orange.png" : "/brand/isotype-cream.png";
  return (
    <span className="inline-flex items-center gap-[1.2em]" style={{ color }}>
      <span className="shrink-0">¿Listo para ser parte de la familia Perezoso?</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={isoSrc} alt="" className="h-[.72em] w-[1.42em] shrink-0" style={{ opacity: isoOpacity }} />
      <span className="shrink-0">¿Listo para ser parte de la familia Perezoso?</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={isoSrc} alt="" className="h-[.72em] w-[1.42em] shrink-0" style={{ opacity: isoOpacity }} />
    </span>
  );
}

export function GlitchBand() {
  return (
    <section
      aria-label="¿Listo para ser parte de la familia Perezoso?"
      className="relative overflow-hidden border-y border-cream/12 bg-forest py-[clamp(12px,1.8vw,22px)]"
    >
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{ background: "repeating-linear-gradient(#FCF2D90a 0 1px,transparent 1px 4px)" }}
      />
      <div
        className="pointer-events-none absolute top-[-10%] left-[22%] h-[120%] w-[2px] animate-[gBolt_6.5s_steps(1,end)_infinite] [transform:skewX(-18deg)]"
        style={{ background: "linear-gradient(#FCF2D900,#FCF2D9,#FCF2D900)" }}
      />
      <div
        className="pointer-events-none absolute top-[-10%] left-[71%] h-[120%] w-px animate-[gBolt_6.5s_steps(1,end)_.35s_infinite] [transform:skewX(14deg)]"
        style={{ background: "linear-gradient(#08ACC300,#08ACC3,#08ACC300)" }}
      />

      <div className="relative animate-[gJitter_6.5s_steps(1,end)_infinite] whitespace-nowrap">
        <div className="inline-flex animate-[gSlideA_26s_linear_infinite] gap-[1.2em] font-display text-[clamp(28px,4.2vw,58px)] leading-[.9] text-cream">
          <GlitchLine color="#FCF2D9" isoOpacity={0.95} />
          <GlitchLine color="#FCF2D9" isoOpacity={0.95} />
        </div>
        <div className="pointer-events-none absolute inset-0 animate-[gSlice_6.5s_steps(1,end)_infinite] mix-blend-screen">
          <div className="inline-flex animate-[gSlideA_26s_linear_infinite,gShiftR_6.5s_steps(1,end)_infinite] gap-[1.2em] font-display text-[clamp(28px,4.2vw,58px)] leading-[.9] text-[#F0402A]">
            <GlitchLine color="#F0402A" isoOpacity={0.85} />
            <GlitchLine color="#F0402A" isoOpacity={0.85} />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 animate-[gSlice_6.5s_steps(1,end)_.18s_infinite] mix-blend-screen">
          <div className="inline-flex animate-[gSlideA_26s_linear_infinite,gShiftC_6.5s_steps(1,end)_infinite] gap-[1.2em] font-display text-[clamp(28px,4.2vw,58px)] leading-[.9] text-teal">
            <GlitchLine color="#08ACC3" isoOpacity={0.85} />
            <GlitchLine color="#08ACC3" isoOpacity={0.85} />
          </div>
        </div>
      </div>
    </section>
  );
}
