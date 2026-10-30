"use client";

import Link from "next/link";
import { useState } from "react";
import { CartLink, EventosPill, HamburgerButton, InkNav } from "@/components/shared/ink-nav";
import { InkMobileMenu } from "@/components/shared/ink-mobile-menu";
import { Reveal } from "@/components/shared/reveal";

type Img = { n: string; alt: string; ratio: string };
type Entry = {
  year: string;
  kicker: string;
  title: string;
  body: string;
  body2?: string;
  story?: string;
  storyBy?: string;
  fig: string;
  caption: string;
  imgs: Img[];
};

const TIMELINE: Entry[] = [
  {
    year: "2025",
    kicker: "El origen",
    title: "Nace Perezoso",
    body: "Jose Bonilla, un apasionado por los deportes de dos ruedas, funda Perezoso bajo la necesidad de pertenencia: formar y ser parte del movimiento.",
    story:
      "“El amor por las dos ruedas inicia a los 3 años, cuando descubro el motocross gracias a mi tío. Desde muy pequeño me gustó dibujar, y en las pistas me llamaban mucho la atención los colores de las motos, las marcas y, sobre todo, los cascos. Afinidad por la cultura street, y con ella el streetwear. Diseñar y crear cosas es una gran parte de mí.”",
    storyBy: "Jose Bonilla, fundador",
    fig: "Fig. 03",
    caption: "Jose Bonilla, fundador de Perezoso.",
    imgs: [{ n: "n-jose-perro", alt: "Jose Bonilla, fundador de Perezoso, con su perro", ratio: "4/5" }],
  },
  {
    year: "2025",
    kicker: "Primera edición",
    title: "Morir intentándolo",
    body: "La primera colección hace referencia al lema de vida del fundador. “Morir intentándolo” es una mentalidad fuerte, con una visión clara y dispuesta.",
    body2:
      "Entendemos que los grandes logros no llegan solos ni de una manera fácil: cada batalla física y mental tendrá una verdadera intención. Si hacemos de esta frase una práctica, llegaremos a la perfección.",
    story: "“Siempre he pensado que el que se esfuerza y hace las cosas bien va a ser recompensado, aunque tome un par de intentos.”",
    storyBy: "Jose Bonilla, fundador",
    fig: "Fig. 04",
    caption: "Camiseta y etiquetas de la primera edición.",
    imgs: [
      { n: "n-morir-tee", alt: "Camiseta Morir intentándolo sostenida por varias manos", ratio: "4/5" },
      { n: "n-etiquetas", alt: "Etiquetas Perezoso de la primera edición", ratio: "2/5" },
    ],
  },
  {
    year: "2026",
    kicker: "Segunda edición",
    title: "No Bad Days",
    body: "En nuestro segundo drop contamos con 5 diseños y una frase que hace referencia a nuestra mentalidad positiva y plena. “No Bad Days” nos mentaliza a que ningún día es malo: siempre hay algo bueno que rescatar, aprender y valorar.",
    body2:
      "El drop hace referencia a varios símbolos: el girasol, la flor de loto y el bosque, elementos naturales que nos rodean. El girasol, como un nuevo amanecer o una nueva oportunidad; la flor de loto, porque por más difícil que sea el entorno tenemos que lograr florecer; y el bosque, como elemento de paz.",
    fig: "Fig. 05",
    caption: "Jerseys de la colección No Bad Days.",
    imgs: [
      { n: "p-nbd-burgundy-ss-2", alt: "Rider con jersey NBD Burgundy entre las hojas", ratio: "4/5" },
      { n: "p-nbd-blackgold-1", alt: "Rider con jersey NBD Black/Gold", ratio: "2/5" },
    ],
  },
];

const STRIP = [
  { n: "church-bmx", alt: "Rider con su BMX frente a una iglesia", caption: "En la calle" },
  { n: "bamboo-rider", alt: "Rider en el bambú con jersey técnico", caption: "En el trail" },
  { n: "p-signature-black-1", alt: "Rider con la Signature Tee Black", caption: "Signature Tee" },
  { n: "squat-jungle", alt: "Rider agachado en la selva", caption: "En la selva" },
  { n: "street-bmx", alt: "Rider de BMX en la ciudad", caption: "En la ciudad" },
  { n: "p-nbd-green-1", alt: "Niño con el jersey NBD Green", caption: "Para toda la familia" },
  { n: "trail-red", alt: "Rider en un trail de tierra roja", caption: "Tierra roja" },
];

const VALUES = [
  { n: "Estilo", sub: "Detalles que hacen la diferencia", body: "Prendas versátiles con un estilo único, dentro y fuera de la bici." },
  { n: "Comodidad", sub: "Hecho para el trópico", body: "Materiales agradables al movimiento, para el clima tropical y cualquier ocasión." },
  { n: "Dentro y fuera del deporte", sub: "Más allá del bikelife", body: "Del trail a la oficina, de la calle al fin de semana. Prendas pensadas para cualquier estilo de vida, no solo para la bici." },
  { n: "Determinación", sub: "El límite es un reto, no un final", body: "Intentamos lo imposible todas las veces necesarias. Enfrentamos el camino difícil." },
];

const TEXT_COLS = "grid-cols-1 min-[900px]:grid-cols-[minmax(140px,.32fr)_minmax(0,1fr)]";

export function NosotrosPage() {
  const [menu, setMenu] = useState(false);
  const [paused, setPaused] = useState(false);

  return (
    <div className="overflow-x-hidden bg-cream text-forest">
      <InkNav
        active="Nosotros"
        tone="forest"
        right={
          <>
            <EventosPill />
            <CartLink />
            <HamburgerButton onClick={() => setMenu(true)} />
          </>
        }
      />

      <main>
        {/* PORTADA */}
        <section className="px-[clamp(18px,4vw,64px)] pt-[clamp(110px,12vw,140px)] pb-[clamp(50px,6vw,80px)]">
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-2.5 border-t-2 border-b border-t-forest border-b-forest/20 py-3 text-[10px] font-bold tracking-[.22em] uppercase">
            <span>Perezoso &amp; Co.</span>
            <span className="text-forest/60">San Rafael de Heredia, Costa Rica</span>
            <span className="text-forest/60">Desde 2025</span>
            <span className="text-orange">Nosotros</span>
          </div>
          <div className="mt-[clamp(28px,4vw,48px)] grid grid-cols-1 items-start gap-[clamp(28px,4vw,64px)] min-[900px]:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <Reveal duration={1000}>
              <h1 className="font-display text-[clamp(84px,15vw,240px)] leading-[.78] tracking-[-.005em]">
                Una marca
                <br />
                sobre dos
                <br />
                ruedas
              </h1>
              <p className="mt-[clamp(28px,3.4vw,44px)] max-w-[640px] text-[clamp(20px,2.1vw,30px)] leading-[1.45] font-light">
                Marca deportiva 100% costarricense, creada y diseñada por y para los riders más activos.
              </p>
            </Reveal>
            <Reveal duration={1100} className="m-0">
              <figure className="m-0">
                <div
                  role="img"
                  aria-label="Riders Perezoso junto al río"
                  className="aspect-[3/4] bg-cover bg-center"
                  style={{ backgroundImage: "url(/img/river-reflection.jpg)" }}
                />
                <figcaption className="mt-2.5 flex justify-between gap-3 text-[11px] leading-[1.5] font-medium text-forest/65">
                  <span className="font-bold text-forest">Fig. 01</span>
                  <span>Desde Costa Rica. De riders, para riders.</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* MANIFIESTO */}
        <section className="px-[clamp(18px,4vw,64px)] pb-[clamp(70px,9vw,130px)]">
          <div className={"grid gap-[clamp(20px,4vw,64px)] border-t border-forest/20 pt-[clamp(30px,4vw,52px)] " + TEXT_COLS}>
            <div className="text-[10px] font-bold tracking-[.24em] text-orange uppercase">¿Qué somos?</div>
            <Reveal>
              <p className="text-[clamp(24px,2.8vw,42px)] leading-[1.32] font-light text-pretty">
                Funcionalidad <span className="font-semibold">bikewear</span> con actitud{" "}
                <span className="font-semibold">streetwear</span>. Prendas versátiles, cómodas y con un estilo único, con
                detalles que hacen la diferencia.
              </p>
              <p className="mt-[22px] max-w-[560px] text-[15px] leading-[1.85] text-forest/80">
                Del trail a la oficina, de la calle al fin de semana. Prendas pensadas para cualquier estilo de vida, no
                solo para la bici.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FOTO A SANGRE */}
        <Reveal slide={false} duration={1100}>
          <figure className="m-0">
            <div
              role="img"
              aria-label="Rider de Perezoso saltando bajo los árboles"
              className="h-[clamp(360px,62vw,880px)]"
              style={{ background: "url(/img/jump-canopy.jpg) center bottom -59.4vw/100% auto no-repeat" }}
            />
            <figcaption className="flex justify-between gap-4 border-b border-forest/20 px-[clamp(18px,4vw,64px)] py-3 text-[11px] leading-[1.5] font-medium text-forest/65">
              <span className="font-bold text-forest">Fig. 02</span>
              <span>Materiales agradables al movimiento, para el clima tropical y cualquier ocasión.</span>
            </figcaption>
          </figure>
        </Reveal>

        {/* LÍNEA DE TIEMPO */}
        <section className="px-[clamp(18px,4vw,64px)] py-[clamp(70px,9vw,130px)]">
          <div className={"mb-[clamp(40px,6vw,80px)] grid gap-[clamp(20px,4vw,64px)] " + TEXT_COLS}>
            <div className="text-[10px] font-bold tracking-[.24em] text-orange uppercase">Cronología</div>
            <h2 className="font-display text-[clamp(52px,7vw,108px)] leading-[.86]">
              Cómo llegamos
              <br />
              hasta aquí
            </h2>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute top-0 bottom-0 left-[7px] w-0.5 bg-forest min-[900px]:left-[calc(50%-1px)]" />
            {TIMELINE.map((e, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal
                  key={e.title}
                  className="relative grid grid-cols-1 items-start gap-[clamp(24px,4vw,72px)] pb-[clamp(56px,7vw,110px)] pl-10 min-[900px]:grid-cols-2 min-[900px]:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-3.5 left-0 size-4 rounded-full border-[3px] border-cream bg-orange shadow-[0_0_0_2px_#141D10] min-[900px]:left-[calc(50%-8px)]"
                  />
                  <div className={"order-0 text-left " + (left ? "min-[900px]:text-right" : "min-[900px]:order-1")}>
                    <div className="font-display text-[clamp(84px,11vw,170px)] leading-[.8] text-forest">{e.year}</div>
                    <div className="mt-3.5 text-[10.5px] font-bold tracking-[.22em] text-orange uppercase">{e.kicker}</div>
                    <h3 className="mt-2 font-display text-[clamp(34px,3.6vw,54px)] leading-[.95]">{e.title}</h3>
                    <p className="mt-3.5 text-[15.5px] leading-[1.8] text-forest/85">{e.body}</p>
                    {e.body2 && <p className="mt-3 text-[15.5px] leading-[1.8] text-forest/85">{e.body2}</p>}
                    {e.story && (
                      <blockquote className="mt-[22px] flex flex-wrap items-start gap-[18px] border-t border-forest/20 pt-[18px] text-left">
                        <div className="min-w-0 flex-[1_1_200px]">
                          <p className="text-[clamp(17px,1.45vw,21px)] leading-[1.6] font-light text-forest text-pretty">{e.story}</p>
                          <footer className="mt-3 text-[10px] font-bold tracking-[.22em] text-orange uppercase">{e.storyBy}</footer>
                        </div>
                      </blockquote>
                    )}
                  </div>
                  <figure className={"m-0 order-1 " + (left ? "" : "min-[900px]:order-0")}>
                    <div
                      className="grid gap-2"
                      style={{ gridTemplateColumns: e.imgs.length > 1 ? "minmax(0,1.6fr) minmax(0,.7fr)" : "minmax(0,1fr)" }}
                    >
                      {e.imgs.map((im) => (
                        <div
                          key={im.n}
                          role="img"
                          aria-label={im.alt}
                          className="bg-cover bg-center"
                          style={{ aspectRatio: im.ratio, backgroundImage: `url(/img/${im.n}.jpg)` }}
                        />
                      ))}
                    </div>
                    <figcaption className={"mt-2.5 text-[11px] leading-[1.5] font-medium text-forest/65 text-left " + (left ? "min-[900px]:text-right" : "")}>
                      <span className="font-bold text-forest">{e.fig}</span> · {e.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* CITA */}
        <section className="bg-forest px-[clamp(18px,4vw,64px)] py-[clamp(80px,11vw,160px)] text-cream">
          <Reveal duration={1000}>
            <blockquote className="mx-auto max-w-[1100px]">
              <h2 className="mb-[clamp(18px,2.4vw,30px)] font-display text-[clamp(56px,7vw,108px)] leading-[.9] text-orange">El perezoso:</h2>
              <p className="text-[clamp(28px,4vw,60px)] leading-[1.22] font-light text-pretty">
                Más que un símbolo, es un estilo de vida, donde siempre nos podemos mantener activos, visualizando y
                analizando el próximo movimiento. Entendemos el límite como un nuevo reto, no como un final.
              </p>
              <footer className="mt-[clamp(28px,3.4vw,44px)] flex flex-wrap items-center gap-x-7 gap-y-3.5 text-[10.5px] font-bold tracking-[.24em] uppercase">
                <span className="text-gold">Ni lentos ni perezosos.</span>
                <span className="text-cream/50">Observar · Analizar · Mover con intención</span>
              </footer>
            </blockquote>
          </Reveal>
        </section>

        {/* TIRA DE FOTOS */}
        <section className="pt-[clamp(60px,8vw,110px)] pb-[clamp(50px,6vw,80px)]">
          <div className="mb-[22px] flex flex-wrap items-end justify-between gap-4 px-[clamp(18px,4vw,64px)]">
            <h2 className="font-display text-[clamp(44px,5.4vw,80px)] leading-[.88]">
              Dentro y fuera
              <br />
              del deporte
            </h2>
            <span className="text-[10px] font-bold tracking-[.22em] text-forest/60 uppercase">Deslizá →</span>
          </div>
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="overflow-hidden pb-3.5">
            <div
              className="flex w-max gap-3 pl-3"
              style={{ animation: "pzStrip 60s linear infinite", animationPlayState: paused ? "paused" : "running" }}
            >
              {[0, 1].flatMap((r) =>
                STRIP.map((s, i) => (
                  <figure key={r + "-" + i} className="m-0 flex-[0_0_clamp(220px,24vw,340px)]">
                    <div
                      role="img"
                      aria-label={s.alt}
                      className="aspect-[3/4] bg-cover bg-center"
                      style={{ backgroundImage: `url(/img/${s.n}.jpg)` }}
                    />
                    <figcaption className="mt-2.5 text-[11px] leading-[1.5] font-medium text-forest/65">
                      <span className="font-bold text-forest">{"Fig. " + String(i + 6).padStart(2, "0")}</span> · {s.caption}
                    </figcaption>
                  </figure>
                ))
              )}
            </div>
          </div>
        </section>

        {/* VALORES */}
        <section className="px-[clamp(18px,4vw,64px)] pt-[clamp(40px,5vw,70px)] pb-[clamp(70px,9vw,130px)]">
          <div className={"grid gap-[clamp(20px,4vw,64px)] " + TEXT_COLS}>
            <div className="text-[10px] font-bold tracking-[.24em] text-orange uppercase">Lo que nos define</div>
            <div className="border-t-2 border-forest">
              {VALUES.map((v, i) => (
                <Reveal
                  key={v.n}
                  duration={800}
                  className="grid grid-cols-[36px_minmax(0,1fr)] items-baseline gap-[clamp(12px,3vw,40px)] border-b border-forest/20 py-[clamp(20px,2.6vw,32px)] min-[700px]:grid-cols-[44px_minmax(0,1fr)_minmax(0,1.1fr)]"
                >
                  <span className="text-[11px] font-bold tracking-[.2em] text-orange">{"0" + (i + 1)}</span>
                  <h3 className="font-display text-[clamp(38px,4.4vw,66px)] leading-[.92]">{v.n}</h3>
                  <div className="col-span-2 min-[700px]:col-span-1">
                    <div className="text-[10.5px] font-bold tracking-[.16em] uppercase">{v.sub}</div>
                    <p className="mt-2 text-[14.5px] leading-[1.75] text-forest/80">{v.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CIERRE */}
        <section className="px-[clamp(18px,4vw,64px)] pb-[clamp(60px,8vw,100px)]">
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-y-2 border-forest py-[clamp(26px,3vw,40px)]">
            <p className="text-[clamp(20px,2vw,28px)] leading-[1.4] font-light">La historia sigue en cada rodada.</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] font-extrabold tracking-[.2em] uppercase">
              {[
                ["/marketplace", "Marketplace →"],
                ["/galeria", "Galería →"],
                ["/inscripciones", "Eventos →"],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="border-b-2 border-orange pb-[5px] text-forest hover:text-orange">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap justify-between gap-3.5 bg-forest px-[clamp(18px,4vw,64px)] py-5 text-[11px] font-medium tracking-[.14em] text-cream/65 uppercase">
          <span>© 2026 Perezoso &amp; CO. Todos los derechos reservados.</span>
          <span>Ni lentos ni perezosos.</span>
        </footer>
      </main>

      <InkMobileMenu open={menu} onClose={() => setMenu(false)} active="Nosotros" tone="forest" />
    </div>
  );
}
