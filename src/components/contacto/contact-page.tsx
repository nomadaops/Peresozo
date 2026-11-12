"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { EventosPill, HamburgerButton, InkNav } from "@/components/shared/ink-nav";
import { InkMobileMenu } from "@/components/shared/ink-mobile-menu";
import { DELIVERIES, PRODUCTS, SIZES, TOPICS, WA_NUMBER, channels, money, type Topic } from "@/lib/contacto-data";

type Errors = Partial<Record<"nombre" | "email" | "tel" | "provincia" | "infoProducto" | "envio" | "ubicacion" | "edicion" | "talla", string>>;

const PROVINCIAS = ["San Jose", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón", "Fuera de Costa Rica"];

const waPlain = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hola Perezoso, quisiera recibir más información.");

export function ContactPage() {
  const [menu, setMenu] = useState(false);
  const [topic, setTopic] = useState<Topic>("Consulta general");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [provincia, setProvincia] = useState("");
  const [otro, setOtro] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [edicion, setEdicion] = useState<string | null>(null);
  const [infoProducto, setInfoProducto] = useState("");
  const [envio, setEnvio] = useState<string | null>(null);
  const [ubicacion, setUbicacion] = useState("");
  const [talla, setTalla] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const submitTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const isOrder = topic === "Quiero hacer un pedido";
  const isInfo = topic === "Información sobre un producto";
  const selected = PRODUCTS.find((x) => x.id === edicion);
  const needsLocation = !!DELIVERIES.find((x) => x.id === envio)?.loc;

  function validate(): Errors {
    const e: Errors = {};
    if (!nombre.trim()) e.nombre = "Escribí tu nombre.";
    if (!email.trim()) e.email = "Escribí tu correo.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = "Ese correo no parece válido.";
    if (!tel.trim()) e.tel = "Necesitamos un número para contactarte.";
    else if (tel.replace(/\D/g, "").length < 8) e.tel = "Ingresá al menos 8 dígitos.";
    if (!provincia) e.provincia = "Elegí tu provincia.";
    if (isInfo && !infoProducto) e.infoProducto = "Escogé un producto.";
    if (isOrder) {
      if (!envio) e.envio = "Escogé cómo querés recibir tu pedido.";
      if (needsLocation && !ubicacion.trim()) e.ubicacion = "Indicanos tu ubicación.";
      if (!edicion) e.edicion = "Elegí un producto.";
      if (!talla && !selected?.oneSize) e.talla = "Elegí una talla.";
    }
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched(true);
    if (Object.keys(errs).length) return;
    setLoading(true);
    clearTimeout(submitTimer.current);
    submitTimer.current = setTimeout(() => {
      setLoading(false);
      setSent(true);
      window.open(waSummary, "_blank", "noopener");
    }, 600);
  }

  function reset() {
    setSent(false);
    setTouched(false);
    setErrors({});
    setNombre("");
    setEmail("");
    setTel("");
    setProvincia("");
    setOtro("");
    setMensaje("");
    setEdicion(null);
    setInfoProducto("");
    setEnvio(null);
    setUbicacion("");
    setTalla(null);
    setTopic("Consulta general");
  }

  function summary(): string {
    const ed = PRODUCTS.find((x) => x.id === edicion);
    let t = "Hola Perezoso, les escribo desde la web.\n\n";
    t += "Motivo: " + topic + "\n";
    if (nombre) t += "Nombre: " + nombre + "\n";
    if (tel) t += "Teléfono: " + tel + "\n";
    if (email) t += "Correo: " + email + "\n";
    if (provincia) t += "Provincia: " + provincia + "\n";
    if (isInfo && infoProducto) t += "Producto: " + infoProducto + "\n";
    if (isOrder && ed) {
      t += "\nPedido:\n• " + ed.label + "\n  Talla: " + (ed.oneSize ? "Única" : talla || "—") + "\n  Precio: " + money(ed.price) + "\n";
      t += "  Adelanto 50%: " + money(ed.price / 2) + "\n";
      const dv = DELIVERIES.find((x) => x.id === envio);
      if (dv) t += "\nEnvío: " + dv.label + "\n";
      if (dv && dv.loc && ubicacion) t += "Ubicación: " + ubicacion + "\n";
    }
    if (otro) t += "\nOtra combinación: " + otro + "\n";
    if (mensaje) t += "\nMensaje: " + mensaje + "\n";
    return t;
  }

  const waSummary = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(summary());
  const errs = touched ? errors : {};
  const lineColor = (k: keyof Errors) => (errs[k] ? "#C0392B" : "#20291640");
  const hasErrors = touched && Object.keys(errors).length > 0;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-cream text-ink">
      <InkNav
        active="Contacto"
        right={
          <>
            <EventosPill />
            <a href={waPlain} target="_blank" rel="noopener" aria-label="Escribir por WhatsApp" className="grid size-[30px] place-items-center text-cream">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-5.6-4.6c-.4-.6-1-1.6-1-3 0-1.4.8-2.1 1-2.4.3-.3.6-.3.8-.3h.6c.2 0 .4-.1.7.5l.9 2c.1.2.1.4 0 .6l-.4.6-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.5.1.7-.1l.8-1c.2-.2.4-.2.6-.1l2 .9c.2.1.4.2.4.3.1.1.1.6-.1 1.1Z" />
              </svg>
            </a>
            <HamburgerButton onClick={() => setMenu(true)} />
          </>
        }
      />

      <main id="top">
        {/* INTRO */}
        <section className="relative flex min-h-[clamp(420px,46vw,600px)] items-end overflow-hidden bg-ink px-[clamp(18px,3vw,48px)] pt-[clamp(140px,16vw,210px)] pb-[clamp(44px,5vw,70px)] text-cream">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/contacto-hero-v2.jpg"
            alt="Riders Perezoso descansando junto a un río en la montaña"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(32,41,22,.96)_0%,rgba(32,41,22,.9)_34%,rgba(32,41,22,.3)_58%,rgba(32,41,22,.08)_78%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(32,41,22,.8),rgba(32,41,22,.34)_34%,rgba(32,41,22,.62)_62%,rgba(32,41,22,.88))]" />
          <div className="relative flex w-full flex-wrap items-end justify-between gap-[clamp(20px,3vw,48px)]">
            <div>
              <div className="mb-3.5 flex items-center gap-3 text-[10px] font-semibold tracking-[.26em] text-orange uppercase">
                <span className="h-0.5 w-9 bg-orange" /> Escribinos
              </div>
              <h1 className="font-display text-[clamp(54px,8.6vw,124px)] leading-[.84]">Contacto</h1>
              <p className="mt-1.5 font-display text-[clamp(24px,3.4vw,48px)] leading-none text-gold">
                Hablemos de tu próxima rodada.
              </p>
              <p className="mt-4.5 max-w-[400px] text-[clamp(13.5px,1.05vw,15px)] leading-[1.75] text-cream/77">
                Pedidos, tallas, colores o colaboraciones. Contestamos por WhatsApp en menos de 24 horas.
              </p>
              <a
                href={waPlain}
                target="_blank"
                rel="noopener"
                className="mt-[22px] inline-flex items-center gap-2.5 bg-whatsapp px-[26px] py-4 text-[11px] font-black tracking-[.2em] text-[#0b1f12] uppercase transition-transform duration-[180ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-5.6-4.6c-.4-.6-1-1.6-1-3 0-1.4.8-2.1 1-2.4.3-.3.6-.3.8-.3h.6c.2 0 .4-.1.7.5l.9 2c.1.2.1.4 0 .6l-.4.6-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.5.1.7-.1l.8-1c.2-.2.4-.2.6-.1l2 .9c.2.1.4.2.4.3.1.1.1.6-.1 1.1Z" />
                </svg>
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* CONTACTO + FORM */}
        <section className="grid items-start [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          <div className="relative border-r border-ink/15 px-[clamp(18px,3vw,48px)] py-[clamp(38px,5vw,64px)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[.05]"
              style={{ backgroundImage: "url(/brand/pattern-dark.png)", backgroundSize: "280px auto", backgroundRepeat: "repeat" }}
            />
            <div className="relative max-w-[420px]">
              <h2 className="font-display text-[clamp(32px,3.6vw,46px)] leading-[.94]">Canales directos</h2>
              <div className="mt-[26px] border-t border-ink/15">
                {channels().map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target={ch.target}
                    rel="noopener"
                    className="group flex items-start gap-4 border-b border-ink/15 py-5 text-ink transition-[padding] duration-[250ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:pl-2"
                  >
                    <span className="mt-0.5 flex-none" style={{ color: ch.tint }}>
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                        <path d={ch.path} />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[9.5px] font-bold tracking-[.24em] text-ink/60 uppercase">{ch.label}</span>
                      <span className="mt-1 block font-display text-[clamp(26px,2.6vw,34px)] leading-[1.06] break-words">{ch.value}</span>
                      <span className="mt-0.5 block text-[12px] text-ink/60">{ch.note}</span>
                    </span>
                    <span className="flex-none self-center text-[17px] text-orange">→</span>
                  </a>
                ))}
              </div>

              <div className="mt-[34px] bg-ink px-[26px] py-6 text-cream">
                <div className="text-[9.5px] font-bold tracking-[.24em] text-gold uppercase">Horario de respuesta</div>
                <div className="mt-3.5 flex gap-7">
                  <div>
                    <div className="font-display text-[36px] leading-none">24 h</div>
                    <div className="text-[11.5px] text-cream/60">Máximo por WhatsApp</div>
                  </div>
                  <div className="border-l border-cream/12 pl-7">
                    <div className="font-display text-[36px] leading-none">L—S</div>
                    <div className="text-[11.5px] text-cream/60">Lunes a sábado</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-[clamp(18px,3vw,48px)] py-[clamp(38px,5vw,64px)]">
            {sent && (
              <div className="max-w-[560px] [animation:riseIn_.35s_ease_both]">
                <div className="inline-flex items-center gap-2 bg-ink px-3.5 py-2 text-[9.5px] font-extrabold tracking-[.24em] text-cream uppercase">
                  <span className="size-[7px] rounded-full bg-whatsapp" /> Solicitud recibida
                </div>
                <h2 className="mt-5 font-display text-[clamp(46px,6vw,86px)] leading-[.86]">
                  Gracias por
                  <br />
                  escribirnos.
                </h2>
                <p className="mt-4.5 max-w-[440px] text-[15px] leading-[1.75] text-ink/80">
                  Uno de nuestros agentes se pone en contacto con vos pronto. Si querés adelantar, escribinos directo
                  por WhatsApp con el mismo detalle.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={waSummary}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-2.5 bg-whatsapp px-7 py-[17px] text-[11px] font-black tracking-[.2em] text-[#0b1f12] uppercase"
                  >
                    Abrir WhatsApp
                  </a>
                  <button type="button" onClick={reset} className="border border-ink/20 px-[26px] py-4 text-[10.5px] font-bold tracking-[.2em] uppercase hover:bg-ink/6">
                    Enviar otra solicitud
                  </button>
                </div>
              </div>
            )}

            {!sent && (
              <form onSubmit={handleSubmit} noValidate className="max-w-[640px]">
                <h2 className="font-display text-[clamp(32px,3.6vw,46px)] leading-[.94]">¿En qué podemos ayudarte?</h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      aria-pressed={topic === t}
                      className="flex items-center gap-2.5 border px-4.5 py-3.5 text-[10.5px] font-bold tracking-[.14em] uppercase transition-colors duration-200 ease-[cubic-bezier(.2,.8,.2,1)]"
                      style={{
                        borderColor: topic === t ? "#202916" : "#20291633",
                        background: topic === t ? "#202916" : "transparent",
                        color: topic === t ? "#FCF2D9" : "#202916",
                      }}
                    >
                      <span className="block size-[7px]" style={{ background: topic === t ? "#F06A1D" : "#20291633" }} />
                      {t}
                    </button>
                  ))}
                </div>

                <div className="mt-[34px] grid gap-[clamp(14px,2vw,24px)] [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                  <label className="block">
                    <span className="mb-2 block text-[9.5px] font-bold tracking-[.22em] text-ink/60 uppercase">Nombre completo *</span>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Tu nombre"
                      className="w-full border-0 border-b bg-transparent py-2.5 text-[15px] font-medium outline-none"
                      style={{ borderBottomColor: lineColor("nombre") }}
                    />
                    {errs.nombre && <span className="mt-1.5 block text-[11px] font-semibold text-[#C0392B]">{errs.nombre}</span>}
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[9.5px] font-bold tracking-[.22em] text-ink/60 uppercase">Correo electrónico *</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tucorreo@mail.com"
                      className="w-full border-0 border-b bg-transparent py-2.5 text-[15px] font-medium outline-none"
                      style={{ borderBottomColor: lineColor("email") }}
                    />
                    {errs.email && <span className="mt-1.5 block text-[11px] font-semibold text-[#C0392B]">{errs.email}</span>}
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[9.5px] font-bold tracking-[.22em] text-ink/60 uppercase">Teléfono / WhatsApp *</span>
                    <input
                      type="tel"
                      value={tel}
                      onChange={(e) => setTel(e.target.value)}
                      placeholder="8888-8888"
                      className="w-full border-0 border-b bg-transparent py-2.5 text-[15px] font-medium outline-none"
                      style={{ borderBottomColor: lineColor("tel") }}
                    />
                    {errs.tel && <span className="mt-1.5 block text-[11px] font-semibold text-[#C0392B]">{errs.tel}</span>}
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[9.5px] font-bold tracking-[.22em] text-ink/60 uppercase">Provincia *</span>
                    <select
                      value={provincia}
                      onChange={(e) => setProvincia(e.target.value)}
                      className="w-full border-0 border-b bg-transparent py-2.5 text-[15px] font-medium outline-none"
                      style={{ borderBottomColor: lineColor("provincia") }}
                    >
                      <option value="">Seleccioná una provincia</option>
                      {PROVINCIAS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    {errs.provincia && <span className="mt-1.5 block text-[11px] font-semibold text-[#C0392B]">{errs.provincia}</span>}
                  </label>
                </div>

                {isInfo && (
                  <label className="mt-6 block [animation:riseIn_.35s_cubic-bezier(.2,.8,.2,1)_both]">
                    <span className="block text-[9.5px] font-bold tracking-[.22em] text-ink/60 uppercase">Producto *</span>
                    <select
                      value={infoProducto}
                      onChange={(e) => setInfoProducto(e.target.value)}
                      className="w-full cursor-pointer border-0 border-b bg-transparent py-2.5 text-[15px] font-medium text-ink outline-none"
                      style={{ borderBottomColor: lineColor("infoProducto") }}
                    >
                      <option value="">Escogé el producto</option>
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.label}>
                          {p.label + " · " + money(p.price)}
                        </option>
                      ))}
                    </select>
                    {errs.infoProducto && <span className="mt-1.5 block text-[11px] font-semibold text-[#C0392B]">{errs.infoProducto}</span>}
                  </label>
                )}

                {isOrder && (
                  <div className="mt-[42px] [animation:riseIn_.35s_cubic-bezier(.2,.8,.2,1)_both]">
                    <div className="flex items-center gap-3.5">
                      <h3 className="font-display text-[clamp(28px,3vw,38px)] leading-none">Escogé el producto</h3>
                      <span className="h-px flex-1 bg-ink/15" />
                      <span className="text-[9.5px] font-bold tracking-[.22em] text-orange uppercase">Paso 1—3</span>
                    </div>

                    <div className="mt-5.5">
                      <span className="mb-3 block text-[9.5px] font-bold tracking-[.22em] text-ink/60 uppercase">01 · Producto *</span>
                      <div className="grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(190px,1fr))]">
                        {PRODUCTS.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setEdicion(p.id);
                              setTalla(p.oneSize ? "Única" : talla === "Única" ? null : talla);
                            }}
                            aria-pressed={edicion === p.id}
                            className="flex items-center gap-3 border py-2 pr-3 pl-2 text-left transition-colors duration-200"
                            style={{
                              borderColor: edicion === p.id ? "#202916" : "#20291633",
                              background: edicion === p.id ? "#202916" : "transparent",
                              color: edicion === p.id ? "#FCF2D9" : "#202916",
                            }}
                          >
                            <span
                              aria-hidden="true"
                              className="h-[55px] w-11 flex-none bg-[#EFE3C4] bg-cover bg-center"
                              style={{ backgroundImage: `url(/img/${p.img}.jpg)` }}
                            />
                            <span className="grid min-w-0 gap-1">
                              <span className="text-[10.5px] leading-[1.3] font-bold tracking-[.06em] uppercase">{p.label}</span>
                              <span className="font-display text-[19px] leading-none" style={{ color: edicion === p.id ? "#D1AF71" : "#F06A1D" }}>
                                {money(p.price)}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                      {errs.edicion && <span className="mt-2 block text-[11px] font-semibold text-[#C0392B]">{errs.edicion}</span>}
                    </div>

                    <div className="mt-[26px]">
                      <span className="mb-3 block text-[9.5px] font-bold tracking-[.22em] text-ink/60 uppercase">02 · Talla *</span>
                      <div className="flex flex-wrap gap-2">
                        {(selected?.oneSize ? ["Única"] : [...SIZES]).map((z) => (
                          <button
                            key={z}
                            type="button"
                            onClick={() => setTalla(z)}
                            aria-pressed={talla === z}
                            className="min-w-[60px] border px-4 py-3.5 text-[12.5px] font-bold tracking-[.08em] transition-colors duration-200"
                            style={{
                              borderColor: talla === z ? "#202916" : "#20291633",
                              background: talla === z ? "#202916" : "transparent",
                              color: talla === z ? "#FCF2D9" : "#202916",
                            }}
                          >
                            {z}
                          </button>
                        ))}
                      </div>
                      {errs.talla && <span className="mt-2 block text-[11px] font-semibold text-[#C0392B]">{errs.talla}</span>}
                    </div>

                    <label className="mt-7 block">
                      <span className="block font-display text-[26px] leading-none">¿Buscás otra combinación?</span>
                      <span className="my-1.5 block text-[12.5px] text-ink/60">
                        Contanos qué jersey, color o combinación tenés en mente.
                      </span>
                      <input
                        type="text"
                        value={otro}
                        onChange={(e) => setOtro(e.target.value)}
                        placeholder="Opcional"
                        className="mt-2.5 w-full border-0 border-b border-ink/25 bg-transparent py-2.5 text-[15px] font-medium outline-none"
                      />
                    </label>

                    <div className="mt-[30px] bg-ink px-[clamp(20px,3vw,30px)] py-[26px] text-cream">
                      <div className="text-[9.5px] font-bold tracking-[.24em] text-gold uppercase">Producción bajo pedido</div>
                      <p className="mt-2.5 max-w-[400px] text-[13.5px] leading-[1.7] text-cream/77">
                        Cada jersey se produce cuando lo pedís. Así se confirma:
                      </p>
                      <div className="mt-5 flex flex-wrap border-t border-cream/12">
                        <div className="flex-1 basis-[150px] pt-4.5 pr-5.5">
                          <div className="font-display text-[clamp(44px,5vw,64px)] leading-[.9] text-orange">50%</div>
                          <div className="mt-1 text-[10px] font-bold tracking-[.2em] text-cream uppercase">Para confirmar</div>
                        </div>
                        <div className="flex-1 basis-[150px] border-l border-cream/12 pt-4.5 pl-5.5">
                          <div className="font-display text-[clamp(44px,5vw,64px)] leading-[.9] text-teal">50%</div>
                          <div className="mt-1 text-[10px] font-bold tracking-[.2em] text-cream uppercase">Contra entrega</div>
                        </div>
                      </div>
                      {selected && (
                        <div className="mt-5.5 flex items-baseline justify-between gap-3.5 border-t border-cream/12 pt-4">
                          <span className="text-[10px] font-bold tracking-[.2em] text-cream/60 uppercase">Tu selección</span>
                          <span className="font-display text-[30px] leading-none">
                            {money(selected.price)} · adelanto {money(selected.price / 2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {isOrder && (
                  <div className="relative mt-9 overflow-hidden bg-orange p-[clamp(22px,3vw,34px)] text-forest [animation:riseIn_.35s_cubic-bezier(.2,.8,.2,1)_both]">
                    <div aria-hidden="true" className="pointer-events-none absolute -top-[30px] -right-[30px] font-display text-[220px] leading-none text-forest/7">
                      03
                    </div>
                    <div className="relative">
                      <div className="text-[9.5px] font-extrabold tracking-[.26em] uppercase">Paso 03 · Envío *</div>
                      <h3 className="mt-2 font-display text-[clamp(34px,4vw,52px)] leading-[.9]">¿Cómo te lo entregamos?</h3>
                      <div className="mt-5 grid gap-2.5 [grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]">
                        {DELIVERIES.map((d) => {
                          const on = envio === d.id;
                          return (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => setEnvio(d.id)}
                              aria-pressed={on}
                              className="flex flex-col items-start gap-3 border-2 px-4 py-[18px] text-left transition-[background,color,transform] duration-200 hover:-translate-y-0.5"
                              style={{
                                background: on ? "#141D10" : "#FCF2D9",
                                color: on ? "#FCF2D9" : "#141D10",
                                borderColor: on ? "#141D10" : "#FCF2D9",
                              }}
                            >
                              <span className="flex w-full items-center justify-between">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d={d.icon} />
                                </svg>
                                <span className="grid size-[18px] place-items-center rounded-full border-2 border-current">
                                  <span className="size-2 rounded-full bg-current" style={{ opacity: on ? 1 : 0 }} />
                                </span>
                              </span>
                              <span className="font-display text-[24px] leading-[.95]">{d.label}</span>
                              <span className="text-[12px] leading-[1.5] font-medium opacity-80">{d.note}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errs.envio && <span className="mt-2.5 block text-[11.5px] font-bold text-forest">{errs.envio}</span>}
                      {needsLocation && (
                        <label className="mt-5 block [animation:riseIn_.3s_ease_both]">
                          <span className="block text-[9.5px] font-extrabold tracking-[.22em] uppercase">Tu ubicación *</span>
                          <textarea
                            rows={2}
                            value={ubicacion}
                            onChange={(e) => setUbicacion(e.target.value)}
                            placeholder="Provincia, cantón, distrito y señas exactas"
                            className="mt-2 w-full resize-y border-2 bg-cream px-3.5 py-3 text-[14.5px] leading-[1.6] font-medium text-forest outline-none"
                            style={{ borderColor: errs.ubicacion ? "#141D10" : "#FCF2D9" }}
                          />
                          {errs.ubicacion && <span className="mt-1.5 block text-[11.5px] font-bold">{errs.ubicacion}</span>}
                        </label>
                      )}
                      <div className="mt-[22px] flex items-start gap-3 bg-forest px-4 py-3.5 text-cream">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F06A1D" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="mt-px flex-none">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 8v5M12 16.5v.01" />
                        </svg>
                        <p className="text-[13px] leading-[1.6] font-semibold">
                          Perezoso se pondrá en contacto con usted después de confirmar el pedido.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <label className="mt-9 block">
                  <span className="mb-2 block text-[9.5px] font-bold tracking-[.22em] text-ink/60 uppercase">Mensaje / comentarios</span>
                  <textarea
                    rows={5}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="¿Tenés alguna consulta, idea o necesitás algo diferente? Contanos."
                    className="w-full resize-y border border-ink/20 p-3.5 text-[14.5px] leading-[1.7] outline-none"
                  />
                </label>

                {hasErrors && (
                  <div role="alert" className="mt-4.5 border-l-[3px] border-[#C0392B] bg-[#C0392B]/7 px-3.5 py-3 text-[12.5px] font-semibold text-[#8E2A1E]">
                    Revisá los campos marcados antes de enviar.
                  </div>
                )}

                <div className="mt-6.5 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-3 px-[34px] py-[19px] text-[11.5px] font-black tracking-[.2em] text-cream uppercase transition-colors duration-[220ms] hover:bg-orange hover:text-forest"
                    style={{ background: loading ? "#3A472C" : "#202916" }}
                  >
                    {loading && <span className="block size-3.25 animate-spin rounded-full border-2 border-cream/33 border-t-cream" />}
                    {loading ? "Enviando…" : "Enviar solicitud"}
                  </button>
                  <span className="text-[12px] text-ink/60">
                    O escribinos directo por{" "}
                    <a href={waPlain} target="_blank" rel="noopener" className="border-b border-orange text-ink">
                      WhatsApp
                    </a>
                  </span>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* MAPA */}
        <section className="relative bg-ink text-cream">
          <div className="grid [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
            <div className="flex flex-col justify-between gap-[34px] px-[clamp(18px,3vw,48px)] py-[clamp(38px,5vw,68px)]">
              <div>
                <div className="mb-4 text-[9.5px] font-bold tracking-[.26em] text-orange uppercase">Dónde estamos</div>
                <h2 className="font-display text-[clamp(48px,6.4vw,104px)] leading-[.84]">
                  San Rafael
                  <br />
                  <span className="text-gold">Heredia</span>
                  <br />
                  Costa Rica
                </h2>
                <p className="mt-4.5 max-w-[340px] text-[13.5px] leading-[1.75] text-cream/65">
                  Coordinamos entregas y encuentros por WhatsApp. Envíos a todo el país.
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-[clamp(20px,3vw,40px)] border-t border-cream/12 pt-[22px]">
                  <a href={waPlain} target="_blank" rel="noopener" className="text-cream">
                    <span className="block text-[9px] font-bold tracking-[.24em] text-cream/50 uppercase">WhatsApp</span>
                    <span className="block font-display text-[26px] leading-[1.1]">+506 8312-7667</span>
                  </a>
                  <a href="mailto:theperezosocompanycr@gmail.com" className="text-cream">
                    <span className="block text-[9px] font-bold tracking-[.24em] text-cream/50 uppercase">Email</span>
                    <span className="mt-1.5 block max-w-[220px] text-[13.5px] leading-[1.5] break-all">theperezosocompanycr@gmail.com</span>
                  </a>
                  <a href="https://instagram.com/perezoso.506" target="_blank" rel="noopener" className="text-cream">
                    <span className="block text-[9px] font-bold tracking-[.24em] text-cream/50 uppercase">Instagram</span>
                    <span className="block font-display text-[26px] leading-[1.1]">@perezoso.506</span>
                  </a>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=San+Rafael%2C+Heredia%2C+Costa+Rica"
                  target="_blank"
                  rel="noopener"
                  className="mt-[26px] inline-flex items-center gap-2.5 bg-orange px-7 py-4 text-[11px] font-black tracking-[.2em] text-forest uppercase"
                >
                  Abrir en Google Maps <span className="text-[14px]">→</span>
                </a>
              </div>
            </div>
            <div className="relative min-h-[clamp(320px,38vw,520px)] border-l border-cream/12">
              <iframe
                title="Mapa de San Rafael de Heredia, Costa Rica"
                src="https://www.google.com/maps?q=San%20Rafael,%20Heredia,%20Costa%20Rica&z=14&output=embed"
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(.5)_contrast(1.05)_sepia(.18)]"
              />
              <div className="pointer-events-none absolute bottom-5 left-5 bg-ink px-[18px] py-3 text-[10px] font-bold tracking-[.22em] uppercase">
                San Rafael · Heredia
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-footer px-[clamp(18px,3vw,48px)] pt-[clamp(44px,5vw,64px)] text-cream">
        <div className="flex flex-wrap justify-between gap-[clamp(26px,5vw,64px)] pb-[clamp(34px,4vw,52px)]">
          <div className="min-w-[220px] flex-1 basis-[240px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/isotype-cream.png" alt="Isotipo Perezoso" className="mb-5 w-[110px] opacity-85" />
            <p className="max-w-[280px] text-[13.5px] leading-[1.85] text-cream/80">
              Marca deportiva 100% costarricense. Bikewear funcional con actitud streetwear.
            </p>
          </div>
          <div className="flex-[0_1_160px]">
            <div className="mb-4 text-[9.5px] font-semibold tracking-[.24em] text-orange uppercase">Navegación</div>
            <div className="grid gap-[11px] text-[13px] font-medium">
              <Link href="/" className="text-cream/90 hover:text-cream">Home</Link>
              <Link href="/nosotros" className="text-cream/90 hover:text-cream">Nosotros</Link>
              <Link href="/marketplace" className="text-cream/90 hover:text-cream">Marketplace</Link>
              <Link href="/galeria" className="text-cream/90 hover:text-cream">Galería</Link>
              <a href="#top" className="text-cream/90 hover:text-cream">Contacto</a>
            </div>
          </div>
          <div className="flex-[0_1_220px]">
            <div className="mb-4 text-[9.5px] font-semibold tracking-[.24em] text-orange uppercase">Contacto</div>
            <div className="grid gap-[11px] text-[13px] leading-[1.6] text-cream/90">
              <a href="mailto:theperezosocompanycr@gmail.com" className="text-cream/90 break-all hover:text-cream">
                theperezosocompanycr@gmail.com
              </a>
              <a href={waPlain} target="_blank" rel="noopener" className="text-cream/90 hover:text-cream">
                +506 8312-7667
              </a>
              <a href="https://instagram.com/perezoso.506" target="_blank" rel="noopener" className="text-cream/90 hover:text-cream">
                @perezoso.506
              </a>
              <span>San Rafael de Heredia, Costa Rica</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3.5 border-t border-cream/10 py-[18px] text-[11px] font-medium tracking-[.14em] text-cream/65 uppercase">
          <span>© 2026 Perezoso &amp; CO. Todos los derechos reservados.</span>
          <span>Ni lentos ni perezosos.</span>
        </div>
      </footer>

      <InkMobileMenu open={menu} onClose={() => setMenu(false)} active="Contacto" waPlain={waPlain} />
    </div>
  );
}
