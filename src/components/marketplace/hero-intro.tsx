export function MarketHeroIntro() {
  return (
    <>
      <section className="relative h-[clamp(380px,44vw,560px)] overflow-hidden bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/mk-hero-rider.jpg"
          alt="Rider de MTB saltando en la selva costarricense"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(32,41,22,.92)_0%,rgba(32,41,22,.38)_46%,rgba(32,41,22,.1)_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(32,41,22,.55),rgba(32,41,22,0)_34%,rgba(32,41,22,.5))]" />
        <div className="relative flex h-full max-w-[820px] flex-col justify-end px-[clamp(18px,3vw,48px)] py-[clamp(24px,4vw,52px)] text-cream">
          <div className="mb-3.5 flex items-center gap-3 text-[10px] font-semibold tracking-[.26em] text-orange uppercase">
            <span className="h-0.5 w-9 bg-orange" /> Temporada 01 · disponible
          </div>
          <h2 className="font-display text-[clamp(42px,6.4vw,96px)] leading-[.86]">
            Equipate para
            <br />
            todos tus terrenos
          </h2>
          <p className="mt-4 max-w-[400px] text-[clamp(13px,1vw,15px)] leading-[1.7] text-cream/77">
            Prendas probadas en trail, en calle y en el clima de aquí.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden px-[clamp(18px,3vw,48px)] pt-[clamp(34px,5vw,64px)] pb-[clamp(26px,3vw,40px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[.06]"
          style={{ backgroundImage: "url(/brand/pattern-dark.png)", backgroundSize: "300px auto", backgroundRepeat: "repeat" }}
        />
        <div className="relative flex flex-wrap items-end justify-between gap-[clamp(20px,3vw,48px)]">
          <div>
            <div className="mb-3.5 flex items-center gap-3 text-[10px] font-semibold tracking-[.26em] text-orange uppercase">
              <span className="h-0.5 w-9 bg-orange" /> Tienda oficial
            </div>
            <h1 className="font-display text-[clamp(56px,9vw,132px)] leading-[.82]">Marketplace</h1>
          </div>
          <p className="max-w-[420px] flex-1 basis-[300px] pb-2.5 text-[clamp(14px,1.1vw,16px)] leading-[1.7] text-ink/80">
            Bikewear hecho en Costa Rica para el clima tropical y para la calle. Pedidos y envíos coordinados por
            WhatsApp.
          </p>
        </div>
      </section>
    </>
  );
}
