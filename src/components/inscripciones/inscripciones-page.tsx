"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EventosPill, InkNav } from "@/components/shared/ink-nav";

const DISCIPLINES = [
  { name: "Enduro", desc: "Etapas cronometradas de bajada con transiciones de pedal." },
  { name: "Downhill", desc: "Bajada pura, técnica y velocidad." },
  { name: "BMX", desc: "Calle, park y sesiones de trucos." },
  { name: "Freestyle", desc: "Saltos, líneas y estilo libre." },
];

const EVENTS = [
  {
    kicker: "BMX · Freestyle",
    title: "JAM",
    desc: "Sesiones abiertas de calle y park. Trucos, música y comunidad para rodar juntos.",
    tags: ["BMX", "Freestyle", "Street"],
    photos: ["/img/street-bmx.jpg", "/img/rail-bmx.jpg", "/img/church-bmx.jpg"],
  },
  {
    kicker: "Enduro · Downhill",
    title: "Compes",
    desc: "Competencias con cronómetro y categorías por nivel, en trails de bosque tropical.",
    tags: ["Enduro", "Downhill", "Por categoría"],
    photos: ["/img/jump-canopy.jpg", "/img/hero-v5.jpg", "/img/mk-hero-rider.jpg"],
  },
  {
    kicker: "MTB · Todos los niveles",
    title: "Recreativas MTB",
    desc: "Rodadas grupales por montaña, sin presión, para disfrutar el trail con la familia.",
    tags: ["MTB", "Grupal", "Todos los niveles"],
    photos: ["/img/trail-red.jpg", "/img/bamboo-rider.jpg", "/img/river-reflection.jpg"],
  },
];

const BIZ_SERVICES = [
  { name: "Exhibiciones", desc: "Shows de BMX, freestyle y MTB con nuestros atletas en tu evento." },
  { name: "Clínicas y talleres", desc: "Sesiones guiadas para que tu equipo aprenda técnica básica y segura." },
  { name: "Activaciones de marca", desc: "Presencia Perezoso y riders en lanzamientos, ferias y activaciones." },
];

const BIZ_TYPES = ["Exhibición", "Clínica", "Activación"];

type Biz = {
  type: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  date: string;
  people: string;
  notes: string;
};

const EMPTY: Biz = { type: "", company: "", contact: "", email: "", phone: "", date: "", people: "Menos de 25", notes: "" };

const inputCls = "w-full border bg-white px-4 py-[15px] text-[14px] font-medium text-ink outline-none";
const labelCls = "mb-2 block text-[10.5px] font-bold tracking-[.16em] uppercase";

export function InscripcionesPage() {
  const [tick, setTick] = useState(0);
  const [hoverEv, setHoverEv] = useState<number | null>(null);
  const [biz, setBiz] = useState<Biz>(EMPTY);
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4200);
    return () => clearInterval(id);
  }, []);

  const set = (k: keyof Biz) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setBiz((b) => ({ ...b, [k]: e.target.value }));

  const er = {
    type: !biz.type,
    company: biz.company.trim().length < 2,
    contact: biz.contact.trim().length < 3,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(biz.email.trim()),
    phone: biz.phone.replace(/\D/g, "").length < 8,
  };
  const show = (k: keyof typeof er) => tried && er[k];
  const bd = (k: keyof typeof er) => (show(k) ? "#F06A1D" : "#20291633");

  const waMsg =
    "Hola Perezoso, quiero cotizar un evento privado.\n\nEmpresa: " + biz.company + "\nContacto: " + biz.contact +
    "\nCorreo: " + biz.email + "\nTeléfono: " + biz.phone + "\nTipo: " + biz.type + "\nFecha: " + (biz.date || "Por definir") +
    "\nPersonas: " + biz.people + (biz.notes ? "\nDetalles: " + biz.notes : "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(er).some(Boolean)) {
      setTried(true);
      return;
    }
    try {
      const raw = localStorage.getItem("pz_eventos_privados");
      const list = raw ? JSON.parse(raw) : [];
      list.unshift({ ...biz, createdAt: new Date().toISOString() });
      localStorage.setItem("pz_eventos_privados", JSON.stringify(list));
    } catch {
      /* ignore */
    }
    setSent(true);
    window.open("https://wa.me/50683127667?text=" + encodeURIComponent(waMsg), "_blank", "noopener");
  };

  const reset = () => {
    setBiz(EMPTY);
    setTried(false);
    setSent(false);
  };

  return (
    <div className="bg-cream text-ink">
      <InkNav active="" tone="ink" right={<EventosPill filled />} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink px-[clamp(18px,3vw,48px)] pt-[clamp(150px,16vw,210px)] pb-[clamp(56px,6vw,84px)] text-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/hero-v5.jpg"
          alt="Rider de enduro en la selva costarricense"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(32,41,22,.96)_0%,rgba(32,41,22,.82)_40%,rgba(32,41,22,.3)_72%,rgba(32,41,22,.15)_100%)]" />
        <div className="max-w-[780px]">
          <div className="inline-flex items-center gap-2.5 border border-orange px-3 py-[7px] text-[10px] font-bold tracking-[.24em] text-orange uppercase">
            <span className="size-[7px] rounded-full bg-orange [animation:pulse_1.6s_ease-in-out_infinite]" />
            Próximamente
          </div>
          <h1 className="mt-5 font-display text-[clamp(64px,10vw,150px)] leading-[.82]">
            Eventos y
            <br />
            competencias
          </h1>
          <p className="mt-[22px] max-w-[460px] text-[clamp(14px,1.1vw,16px)] leading-[1.75] text-cream/80">
            Estamos preparando rodadas, sesiones y competencias Perezoso. Mirá lo que viene y seguinos para enterarte primero.
          </p>
          <a
            href="#proximamente"
            className="mt-7 inline-flex items-center gap-3 bg-orange px-[30px] py-[17px] text-[11px] font-extrabold tracking-[.2em] text-forest uppercase transition-colors hover:bg-cream"
          >
            Ver lo que viene <span className="text-[14px]">→</span>
          </a>
        </div>
      </section>

      {/* DISCIPLINAS */}
      <section className="relative isolate overflow-hidden px-[clamp(18px,3vw,48px)] py-[clamp(56px,7vw,96px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[.05]"
          style={{ backgroundImage: "url(/brand/pattern-dark.png)", backgroundSize: "100% auto", backgroundRepeat: "repeat-y" }}
        />
        <div className="mb-[clamp(28px,3vw,44px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-2 text-[10.5px] font-semibold tracking-[.26em] text-orange uppercase">Disciplinas</div>
            <h2 className="font-display text-[clamp(42px,5.4vw,74px)] leading-[.86]">¿Qué rodás?</h2>
          </div>
          <p className="max-w-[380px] text-[14px] leading-[1.7] text-ink/80">
            Las fechas, sedes y categorías se anunciarán por Instagram y WhatsApp.
          </p>
        </div>
        <div className="grid border-t border-ink/20 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
          {DISCIPLINES.map((d, i) => (
            <div key={d.name} className="border-b border-ink/20 py-[clamp(22px,2.6vw,34px)] pr-[clamp(14px,1.6vw,22px)]">
              <div className="text-[11px] font-bold tracking-[.14em] text-orange">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-2.5 font-display text-[clamp(40px,4.4vw,60px)] leading-[.9]">{d.name}</div>
              <p className="mt-2.5 max-w-[260px] text-[13.5px] leading-[1.65] text-ink/75">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRÓXIMAMENTE */}
      <section id="proximamente" className="relative isolate overflow-hidden bg-ink px-[clamp(18px,3vw,48px)] py-[clamp(56px,7vw,96px)] text-cream [scroll-margin-top:90px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[.03]"
          style={{ backgroundImage: "url(/brand/pattern-cream.png)", backgroundSize: "100% auto", backgroundRepeat: "repeat-y" }}
        />
        <div className="mb-[clamp(28px,3vw,44px)] flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-2.5 inline-flex items-center gap-2.5 text-[10.5px] font-bold tracking-[.26em] text-orange uppercase">
              <span className="size-[7px] rounded-full bg-orange [animation:pulse_1.6s_ease-in-out_infinite]" />
              Próximamente
            </div>
            <h2 className="font-display text-[clamp(46px,6vw,88px)] leading-[.85]">Lo que viene</h2>
          </div>
          <p className="max-w-[380px] text-[14px] leading-[1.7] text-cream/75">
            Tres formatos para rodar con la familia Perezoso. Fechas y sedes por anunciar.
          </p>
        </div>
        <div className="grid gap-[clamp(12px,1.4vw,20px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
          {EVENTS.map((ev, i) => {
            const hov = hoverEv === i;
            const active = (tick + i) % ev.photos.length;
            return (
              <article
                key={ev.title}
                onMouseEnter={() => setHoverEv(i)}
                onMouseLeave={() => setHoverEv(null)}
                className="relative isolate flex min-h-[clamp(460px,46vw,600px)] flex-col justify-between overflow-hidden bg-forest p-[clamp(22px,2.4vw,32px)]"
              >
                {ev.photos.map((src, j) => (
                  <div
                    key={src}
                    aria-hidden="true"
                    className="absolute inset-0 -z-20 bg-cover bg-center transition-[opacity,transform] duration-[1400ms,7000ms] ease-[ease,linear]"
                    style={{
                      backgroundImage: `url(${src})`,
                      opacity: j === active ? 1 : 0,
                      transform: j === active ? (hov ? "scale(1.14)" : "scale(1.09)") : "scale(1)",
                    }}
                  />
                ))}
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,29,16,.55)_0%,rgba(20,29,16,.1)_38%,rgba(20,29,16,.92)_100%)]" />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-bold tracking-[.16em] text-orange">{String(i + 1).padStart(2, "0")}</span>
                  <span className="border border-cream/30 bg-forest/40 px-2.5 py-1.5 text-[9.5px] font-bold tracking-[.18em] uppercase">
                    Fecha por anunciar
                  </span>
                </div>
                <div>
                  <div className="text-[10px] font-semibold tracking-[.24em] text-cream/75 uppercase">{ev.kicker}</div>
                  <h3 className="mt-2 font-display text-[clamp(56px,6vw,92px)] leading-[.84]">{ev.title}</h3>
                  <p className="mt-3.5 max-w-[340px] text-[14px] leading-[1.7] font-medium text-cream/88 text-pretty">{ev.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {ev.tags.map((t) => (
                      <span key={t} className="bg-cream/8 px-2.5 py-1.5 text-[9.5px] font-bold tracking-[.14em] uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-1">
                    {ev.photos.map((_, j) => (
                      <span
                        key={j}
                        className="h-0.5 transition-[width,background] duration-[400ms]"
                        style={{ width: j === active ? 28 : 10, background: j === active ? "#F06A1D" : "#FCF2D94d" }}
                      />
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-[clamp(28px,3vw,44px)] flex flex-wrap items-center justify-between gap-x-7 gap-y-4 border-t border-cream/12 pt-[22px]">
          <p className="text-[14px] leading-[1.6] font-medium text-cream/80">
            Anunciamos fechas primero en Instagram{" "}
            <a href="https://instagram.com/perezoso.506" target="_blank" rel="noopener" className="font-bold text-orange">
              @perezoso.506
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="https://instagram.com/perezoso.506"
              target="_blank"
              rel="noopener"
              className="border border-cream/30 px-6 py-[15px] text-[10.5px] font-extrabold tracking-[.2em] text-cream uppercase transition-colors hover:bg-cream hover:text-forest"
            >
              Seguir en Instagram
            </a>
            <a
              href="https://wa.me/50683127667?text=Hola%20Perezoso%2C%20quiero%20info%20sobre%20los%20pr%C3%B3ximos%20eventos."
              target="_blank"
              rel="noopener"
              className="bg-orange px-6 py-[15px] text-[10.5px] font-extrabold tracking-[.2em] text-forest uppercase transition-colors hover:bg-cream"
            >
              Avisame por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* EMPRESAS */}
      <section id="empresas" className="relative isolate overflow-hidden bg-cream px-[clamp(18px,3vw,48px)] py-[clamp(56px,7vw,96px)] text-ink [scroll-margin-top:90px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[.05]"
          style={{ backgroundImage: "url(/brand/pattern-dark.png)", backgroundSize: "100% auto", backgroundRepeat: "repeat-y" }}
        />
        <div className="grid items-start gap-[clamp(30px,5vw,80px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]">
          <div>
            <div className="mb-2.5 text-[10.5px] font-bold tracking-[.26em] text-orange uppercase">Para empresas</div>
            <h2 className="font-display text-[clamp(46px,6vw,88px)] leading-[.85]">
              Eventos privados
              <br />
              con atletas Perezoso
            </h2>
            <p className="mt-[18px] max-w-[440px] text-[15px] leading-[1.75] text-ink/80">
              Llevá la energía del trail y la calle a tu empresa. Armamos experiencias a la medida con nuestros riders.
            </p>
            <div className="relative mt-7 aspect-[16/10] overflow-hidden bg-ink">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/jump-canopy.jpg"
                alt="Atleta Perezoso saltando en el bosque"
                className="h-full w-full object-cover [object-position:50%_15%]"
              />
              <span className="absolute bottom-3 left-3.5 bg-ink px-3 py-[7px] text-[9.5px] font-bold tracking-[.18em] text-cream uppercase">
                Atletas Perezoso
              </span>
            </div>
            <div className="mt-[26px] border-t border-ink/20">
              {BIZ_SERVICES.map((sv, i) => (
                <div key={sv.name} className="flex gap-[18px] border-b border-ink/20 py-4">
                  <span className="w-7 flex-none pt-1 text-[11px] font-bold tracking-[.14em] text-orange">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="font-display text-[28px] leading-none">{sv.name}</div>
                    <p className="mt-1 text-[13.5px] leading-[1.6] text-ink/75">{sv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-ink p-[clamp(24px,3vw,40px)] text-cream">
            {sent ? (
              <div className="[animation:riseIn_.35s_ease_both]">
                <div className="text-[10.5px] font-bold tracking-[.24em] text-orange uppercase">✓ Solicitud enviada</div>
                <h3 className="mt-3 font-display text-[clamp(36px,4vw,52px)] leading-[.92]">Gracias, {biz.company.trim()}.</h3>
                <p className="mt-3.5 text-[14.5px] leading-[1.75] text-cream/80">
                  Te contactaremos pronto para armar la propuesta. Si querés acelerar, escribinos directo.
                </p>
                <div className="mt-[22px] flex flex-wrap gap-2.5">
                  <a
                    href={"https://wa.me/50683127667?text=" + encodeURIComponent(waMsg)}
                    target="_blank"
                    rel="noopener"
                    className="bg-whatsapp px-[22px] py-[15px] text-[10.5px] font-black tracking-[.18em] text-[#0b1f12] uppercase"
                  >
                    Abrir WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={reset}
                    className="border border-cream/30 px-[22px] py-3.5 text-[10.5px] font-extrabold tracking-[.2em] text-cream uppercase"
                  >
                    Nueva solicitud
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-[10.5px] font-bold tracking-[.24em] text-orange uppercase">Cotizá tu evento</div>
                <h3 className="mt-2 mb-[22px] font-display text-[clamp(34px,3.4vw,46px)] leading-[.95]">Contanos qué tenés en mente</h3>
                <form onSubmit={submit} noValidate className="grid gap-4">
                  <div>
                    <div className={labelCls + " text-cream"}>Tipo de evento *</div>
                    <div className="flex flex-wrap gap-2">
                      {BIZ_TYPES.map((t) => {
                        const on = biz.type === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setBiz((b) => ({ ...b, type: t }))}
                            aria-pressed={on}
                            className="border px-3.5 py-[11px] text-[10.5px] font-bold tracking-[.12em] uppercase transition-colors"
                            style={{
                              background: on ? "#F06A1D" : "transparent",
                              color: on ? "#141D10" : "#FCF2D9",
                              borderColor: on ? "#F06A1D" : "#FCF2D94d",
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                    {show("type") && <div className="mt-1.5 text-[11.5px] font-semibold text-orange">Elegí un tipo de evento.</div>}
                  </div>
                  <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
                    <label className="block">
                      <span className={labelCls}>Empresa *</span>
                      <input type="text" value={biz.company} onChange={set("company")} placeholder="Nombre de la empresa" className={inputCls} style={{ borderColor: bd("company") }} />
                      {show("company") && <span className="mt-1.5 block text-[11.5px] font-semibold text-orange">Indicá la empresa.</span>}
                    </label>
                    <label className="block">
                      <span className={labelCls}>Persona de contacto *</span>
                      <input type="text" value={biz.contact} onChange={set("contact")} placeholder="Nombre y apellido" className={inputCls} style={{ borderColor: bd("contact") }} />
                      {show("contact") && <span className="mt-1.5 block text-[11.5px] font-semibold text-orange">Indicá un nombre.</span>}
                    </label>
                  </div>
                  <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
                    <label className="block">
                      <span className={labelCls}>Correo *</span>
                      <input type="email" value={biz.email} onChange={set("email")} placeholder="nombre@empresa.com" className={inputCls} style={{ borderColor: bd("email") }} />
                      {show("email") && <span className="mt-1.5 block text-[11.5px] font-semibold text-orange">Revisá el correo.</span>}
                    </label>
                    <label className="block">
                      <span className={labelCls}>Teléfono *</span>
                      <input type="tel" value={biz.phone} onChange={set("phone")} placeholder="8888-8888" className={inputCls} style={{ borderColor: bd("phone") }} />
                      {show("phone") && <span className="mt-1.5 block text-[11.5px] font-semibold text-orange">Número de 8 dígitos.</span>}
                    </label>
                  </div>
                  <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
                    <label className="block">
                      <span className={labelCls}>Fecha aproximada</span>
                      <input type="date" value={biz.date} onChange={set("date")} className={inputCls} style={{ borderColor: "#20291633" }} />
                    </label>
                    <label className="block">
                      <span className={labelCls}>Cantidad de personas</span>
                      <select value={biz.people} onChange={set("people")} className={inputCls} style={{ borderColor: "#20291633" }}>
                        <option value="Menos de 25">Menos de 25</option>
                        <option value="25 a 50">25 a 50</option>
                        <option value="50 a 100">50 a 100</option>
                        <option value="Más de 100">Más de 100</option>
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className={labelCls}>Detalles</span>
                    <textarea
                      value={biz.notes}
                      onChange={set("notes")}
                      rows={3}
                      placeholder="Lugar, objetivo del evento, disciplinas de interés…"
                      className={inputCls + " resize-y leading-[1.6]"}
                      style={{ borderColor: "#20291633" }}
                    />
                  </label>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 justify-self-start bg-orange px-[30px] py-[17px] text-[11px] font-extrabold tracking-[.2em] text-forest uppercase transition-colors hover:bg-cream"
                  >
                    Solicitar cotización <span className="text-[14px]">→</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-footer px-[clamp(18px,3vw,48px)] py-7">
        <div className="flex flex-wrap justify-between gap-3.5 text-[11px] font-medium tracking-[.14em] text-cream/65 uppercase">
          <span>© 2026 Perezoso &amp; CO. Todos los derechos reservados.</span>
          <Link href="/" className="text-cream/65 hover:text-cream">
            ← Volver al inicio
          </Link>
        </div>
      </footer>
    </div>
  );
}
