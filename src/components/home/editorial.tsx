import Link from "next/link";

export function Editorial() {
  return (
    <section className="relative h-[clamp(520px,58vw,660px)] overflow-hidden bg-forest">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/street-bmx.jpg"
        alt="Riders BMX en calle de San Jose"
        className="absolute inset-0 h-full w-full object-cover [object-position:50%_32%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#141D10ee_0%,#141D1055_58%,#141D1099_100%)]" />
      <div className="absolute top-0 bottom-0 left-[clamp(18px,3vw,48px)] w-px bg-cream/12" />
      <div className="absolute top-[clamp(48px,7vw,92px)] left-[clamp(34px,5vw,82px)] max-w-[640px]">
        <h2 className="font-display text-[clamp(64px,10vw,132px)] leading-[.82]">
          Listas para
          <br />
          cualquier
          <br />
          ocasión
        </h2>
        <Link
          href="/galeria"
          className="mt-[30px] inline-block bg-orange px-8 py-4 text-[11px] font-extrabold tracking-[.22em] text-forest uppercase"
        >
          Ver la campaña
        </Link>
      </div>
      <div className="absolute right-[clamp(18px,3vw,48px)] bottom-[34px] text-right text-[9.5px] leading-[2] font-medium tracking-[.22em] text-cream/53 uppercase">
        <div>San Rafael de Heredia</div>
        <div className="text-teal">Foto · archivo Perezoso</div>
      </div>
    </section>
  );
}
