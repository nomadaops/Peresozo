export function Statement() {
  return (
    <section
      id="nosotros"
      className="relative isolate overflow-hidden bg-cream px-[clamp(18px,3vw,48px)] pt-[clamp(56px,7vw,96px)] text-forest [scroll-margin-top:86px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[.05]"
        style={{ backgroundImage: "url(/brand/pattern-dark.png)", backgroundSize: "100% auto", backgroundRepeat: "repeat-y", backgroundPosition: "top center" }}
      />
      <div className="relative flex flex-wrap items-start gap-[clamp(24px,3vw,44px)]">
        <div className="flex-1 basis-[480px]">
          <div className="mb-5 text-[10.5px] font-semibold tracking-[.26em] text-orange uppercase">¿Qué somos?</div>
          <h2 className="max-w-[620px] font-display text-[clamp(52px,7vw,96px)] leading-[.86]">
            Funcionalidad
            <br />
            bikewear
            <br />
            <span className="text-teal">+</span> actitud
            <br />
            streetwear
          </h2>
          <p className="mt-7 max-w-[470px] text-[16px] leading-[1.8] text-forest/80">
            Marca deportiva 100% costarricense, creada y diseñada por y para los riders más activos. Prendas
            versátiles, cómodas y con un estilo único, con detalles que hacen la diferencia.
          </p>
          <div className="mt-[42px] mb-[clamp(48px,6vw,90px)] flex flex-wrap border-t border-forest/15">
            <div className="border-r border-forest/15 pt-[18px] pr-8">
              <div className="font-display text-[34px] leading-[1.1]">Estilo</div>
            </div>
            <div className="border-r border-forest/15 px-8 pt-[18px]">
              <div className="font-display text-[34px] leading-[1.1] text-teal">Comodidad</div>
            </div>
            <div className="pt-[18px] pl-8">
              <div className="font-display text-[34px] leading-[1.1] text-orange">Determinación</div>
            </div>
          </div>
        </div>
        <div className="relative mb-[-1px] flex-1 basis-[380px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/bamboo-rider.jpg"
            alt="Rider Perezoso en bambú con jersey técnico"
            className="h-[clamp(400px,50vw,609px)] w-full object-cover [object-position:50%_28%] [filter:saturate(.95)]"
          />
          <div className="absolute bottom-[94px] left-0 bg-orange px-5 py-3 text-[12px] font-bold tracking-[.22em] text-forest uppercase sm:-left-6">
            Del trail a la calle.
          </div>
          <div className="absolute bottom-[52px] left-0 bg-orange px-4 py-[9px] text-[10px] font-bold tracking-[.22em] text-forest uppercase sm:-left-6">
            De la calle al trail.
          </div>
        </div>
      </div>
    </section>
  );
}
