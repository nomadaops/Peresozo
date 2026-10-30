import Link from "next/link";

const COMING = "Coming".split("");
const SOON = "Soon".split("");

function ComingSoon() {
  const wave = (ch: string, i: number, offset: number) => (
    <span
      key={offset + i}
      className="inline-block"
      style={{ animation: `csWave 2.4s ease-in-out ${(offset + i * 0.08).toFixed(2)}s infinite` }}
    >
      {ch}
    </span>
  );
  return (
    <div
      aria-label="Coming Soon"
      className="pointer-events-none absolute inset-x-5 top-1/2 -translate-y-[62%] text-cream"
    >
      <div
        aria-hidden="true"
        className="font-display text-[clamp(44px,4.6vw,72px)] leading-[.9] tracking-[.01em] whitespace-nowrap"
      >
        {COMING.map((c, i) => wave(c, i, 0))}
        <span className="inline-block w-[.28em]" />
        {SOON.map((c, i) => wave(c, i, 0.56))}
        {[0, 0.25, 0.5].map((d) => (
          <span key={d} className="inline-block" style={{ animation: `csDot 1.5s steps(1,end) ${d.toFixed(2)}s infinite` }}>
            .
          </span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="mt-2.5 h-0.5 w-[clamp(120px,14vw,200px)] bg-cream"
        style={{ animation: "csLine 2.8s cubic-bezier(.6,0,.3,1) infinite" }}
      />
    </div>
  );
}

export function Categories() {
  return (
    <section className="relative isolate overflow-hidden bg-forest px-[clamp(18px,3vw,48px)] pt-[clamp(56px,7vw,88px)] pb-[clamp(60px,7vw,96px)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[.03]"
        style={{ backgroundImage: "url(/brand/pattern-cream.png)", backgroundSize: "100% auto", backgroundRepeat: "repeat-y", backgroundPosition: "top center" }}
      />
      <div className="relative mb-8 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(42px,5.4vw,74px)] leading-[.86]">
          Comprá por
          <br />
          categoría
        </h2>
        <div className="flex flex-1 basis-[260px] items-stretch gap-4 pb-1" style={{ maxWidth: 420 }}>
          <span className="h-[71px] w-2 flex-none bg-linear-to-b from-orange to-teal" />
          <p className="font-display text-[clamp(28px,3vw,42px)] leading-[.94] text-cream">
            Mente tranquila.
            <br />
            <span className="text-orange">Bajadas rápidas.</span>
          </p>
        </div>
        <Link
          href="/marketplace"
          className="border-b-2 border-orange pb-[5px] text-[11px] font-bold tracking-[.2em] text-cream uppercase"
        >
          Todo el catálogo →
        </Link>
      </div>

      <div className="relative grid gap-0.5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
        <Link href="/marketplace#long-sleeve" className="group relative h-[440px] overflow-hidden text-cream">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/portrait-jersey.jpg"
            alt="Categoría jerseys"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-b from-forest/0 from-38% to-forest/90" />
          <div className="absolute inset-x-6 bottom-[22px] flex items-end justify-between gap-3">
            <div className="font-display text-[clamp(40px,4vw,62px)] leading-[.92]">Jerseys</div>
          </div>
        </Link>

        <Link href="/marketplace#camisetas" className="group relative h-[440px] overflow-hidden text-cream">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/church-bmx.jpg"
            alt="Categoría camisetas"
            className="h-full w-full object-cover [object-position:50%_18%] transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-b from-forest/0 from-38% to-forest/90" />
          <div className="absolute inset-x-6 bottom-[22px]">
            <div className="font-display text-[clamp(36px,3.6vw,54px)] leading-[.92]">Camisetas</div>
          </div>
        </Link>

        <div className="grid h-[440px] grid-rows-2 gap-0.5">
          <Link href="/marketplace#accesorios" className="group relative overflow-hidden text-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/cap-trio.jpg"
              alt="Categoría accesorios"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-b from-forest/0 from-34% to-forest/87" />
            <div className="absolute bottom-4 left-5">
              <div className="font-display text-[38px] leading-[.95]">Accesorios</div>
            </div>
          </Link>
          <Link
            href="/marketplace#packs"
            className="relative flex flex-col justify-end overflow-hidden bg-orange p-5 text-forest"
          >
            <ComingSoon />
            <div>
              <div className="font-display text-[38px] leading-[.95]">Riding gear</div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
