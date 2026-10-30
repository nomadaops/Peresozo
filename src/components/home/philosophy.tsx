export function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-forest px-[clamp(18px,3vw,48px)] py-[clamp(70px,10vw,140px)] text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/isotype-cream.png"
        alt=""
        className="pointer-events-none absolute top-[52%] left-1/2 w-[min(760px,86%)] -translate-x-1/2 -translate-y-1/2 opacity-[.07]"
      />
      <div className="relative">
        <div className="mb-[26px] text-[10.5px] font-semibold tracking-[.3em] text-gold uppercase">
          08 — Filosofía
        </div>
        <h2 className="font-display text-[clamp(60px,12vw,190px)] leading-[.82]">
          Ni lentos
          <br />
          ni perezosos<span className="text-orange">.</span>
        </h2>
        <p className="mx-auto mt-[34px] max-w-[620px] text-[clamp(13px,1.05vw,15px)] leading-[1.85] font-semibold text-[#F8F8F8]">
          Más que un símbolo, es una mentalidad: mantenernos activos, visualizando y analizando el próximo
          movimiento. Entendemos el límite como un nuevo reto, no como un final.
        </p>
        <div className="mt-11 flex flex-wrap justify-center text-[10px] font-semibold tracking-[.26em] text-cream/60 uppercase">
          <span className="border-r border-cream/18 px-[22px]">Observar</span>
          <span className="border-r border-cream/18 px-[22px]">Analizar</span>
          <span className="px-[22px] text-orange">Mover con intención</span>
        </div>
      </div>
    </section>
  );
}
