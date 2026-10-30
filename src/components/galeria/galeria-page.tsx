"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CartLink, EventosPill, HamburgerButton, InkNav } from "@/components/shared/ink-nav";
import { InkMobileMenu } from "@/components/shared/ink-mobile-menu";
import { useViewportWidth } from "@/lib/use-viewport";

type Series = { title: string; tag: string; kicker: string; cover: string; dek: string; photos: string[] };

const SERIES: Series[] = [
  {
    title: "No Bad Days",
    tag: "Ediciones",
    kicker: "2026 · Segunda edición",
    cover: "p-nbd-burgundy-ss-1",
    dek: "La segunda edición de Perezoso, en el trail, en la pista y entre la selva.",
    photos: [
      "p-nbd-burgundy-ss-1", "p-nbd-blackgold-1", "p-nbd-burgundy-ss-2", "p-nbd-green-1", "p-nbd-rainbow-ss-1", "p-nbd-blackgold-2",
      "p-nbd-green-2", "p-nbd-rainbow-1", "p-nbd-burgundy-ss-3", "p-nbd-blackgold-3", "p-nbd-rainbow-ss-2", "p-nbd-green-3",
      "p-nbd-blackgold-ss-1", "p-nbd-rainbow-2",
    ],
  },
  {
    title: "En la selva",
    tag: "Sesiones",
    kicker: "Sesión",
    cover: "jump-canopy",
    dek: "Saltos, bambú y río: una tarde rodando bajo los árboles.",
    photos: ["jump-canopy", "bamboo-rider", "river-reflection", "mk-hero-rider", "portrait-jersey", "squat-jungle", "contacto-hero-v2"],
  },
  {
    title: "Our previous drop",
    tag: "Ediciones",
    kicker: "2025 · Primera edición",
    cover: "g-mi-11",
    dek: "La primera colección de la marca.",
    photos: ["g-mi-11", "g-mi-9", "g-mi-8", "g-mi-7", "g-mi-13", "g-mi-12", "g-mi-10", "g-mi-3", "g-mi-4", "g-mi-5", "g-mi-2", "g-mi-1", "g-mi-6"],
  },
  {
    title: "En la calle",
    tag: "Sesiones",
    kicker: "Sesión",
    cover: "church-bmx",
    dek: "BMX, barandas y ciudad.",
    photos: ["church-bmx", "street-bmx", "rail-bmx", "trail-red", "p-signature-black-1", "p-signature-black-3", "p-signature-white-3"],
  },
  {
    title: "Estudio",
    tag: "Producto",
    kicker: "Producto",
    cover: "p-nbd-snapback-2",
    dek: "Las prendas de cerca.",
    photos: ["p-nbd-snapback-1", "p-nbd-snapback-2", "p-signature-white-1", "p-nbd-snapback-3", "p-signature-black-2", "detail-logo", "p-nbd-snapback-4", "p-sleeveless-1"],
  },
];

const TABS = ["Todas", "Ediciones", "Sesiones", "Producto"];
const DUR = 5000;
const TICK = 60;
const url = (n: string) => `url(/img/${n}.jpg)`;

type Viewer = { s: number | null; i: number; t: number; playing: boolean };

function stepViewer(v: Viewer, d: number, auto?: boolean): Viewer {
  if (v.s === null) return v;
  const n = SERIES[v.s].photos.length;
  const ni = v.i + d;
  if (ni < 0) return { ...v, i: 0, t: 0 };
  if (ni >= n) {
    if (v.s + 1 < SERIES.length) return { ...v, s: v.s + 1, i: 0, t: 0 };
    if (auto) return { ...v, t: DUR, playing: false };
    return { s: null, i: 0, t: 0, playing: true };
  }
  return { ...v, i: ni, t: 0 };
}

export function GaleriaPage() {
  const w = useViewportWidth();
  const [menu, setMenu] = useState(false);
  const [tab, setTab] = useState("Todas");
  const [hover, setHover] = useState<number | null>(null);
  const [v, setV] = useState<Viewer>({ s: null, i: 0, t: 0, playing: true });
  const [vPlaying, setVPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const cols = w >= 1100 ? 3 : w >= 640 ? 2 : 1;
  const mobile = w < 700;
  const visible = SERIES.map((se, k) => ({ se, k })).filter((x) => tab === "Todas" || x.se.tag === tab);

  const open = useCallback((s: number) => {
    videoRef.current?.pause();
    setVPlaying(false);
    setV({ s, i: 0, t: 0, playing: true });
  }, []);
  const close = useCallback(() => setV({ s: null, i: 0, t: 0, playing: true }), []);

  // autoplay timer
  useEffect(() => {
    const id = setInterval(() => {
      setV((cur) => {
        if (cur.s === null || !cur.playing) return cur;
        const t = cur.t + TICK;
        return t >= DUR ? stepViewer(cur, 1, true) : { ...cur, t };
      });
    }, TICK);
    return () => clearInterval(id);
  }, []);

  // keyboard + scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setV((cur) => {
        if (cur.s === null) {
          if (e.key === "Escape") setMenu(false);
          return cur;
        }
        if (e.key === "ArrowRight") return stepViewer(cur, 1);
        if (e.key === "ArrowLeft") return stepViewer(cur, -1);
        if (e.key === "Escape") return { s: null, i: 0, t: 0, playing: true };
        if (e.key === " ") {
          e.preventDefault();
          return { ...cur, playing: !cur.playing };
        }
        return cur;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    document.body.style.overflow = v.s !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [v.s]);

  const toggleVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.muted = true;
      el.play().catch(() => {});
      setVPlaying(true);
    } else {
      el.pause();
      setVPlaying(false);
    }
  };

  const se = v.s !== null ? SERIES[v.s] : null;

  return (
    <div className="overflow-x-hidden bg-[#0d120a] text-cream">
      <InkNav
        active="Galería"
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
        {/* HISTORIA DESTACADA */}
        <section className="relative h-[min(100vh,900px)] min-h-[560px] overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 [animation:heroZoom_2.4s_cubic-bezier(.2,.7,.2,1)_both]"
            style={{ background: "url(/img/p-nbd-burgundy-ss-1.jpg) center 35%/cover" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,18,10,.55)_0%,rgba(13,18,10,0)_30%,rgba(13,18,10,.35)_58%,#0d120a_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,18,10,.8)_0%,rgba(13,18,10,0)_60%)]" />
          <div className="absolute right-[clamp(18px,4vw,64px)] bottom-[clamp(40px,7vh,80px)] left-[clamp(18px,4vw,64px)] max-w-[980px] [animation:riseInBig_.9s_cubic-bezier(.2,.8,.2,1)_.2s_both]">
            <div className="mb-[18px] flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
              <span className="bg-orange px-2.5 py-1.5 text-[10px] font-black tracking-[.18em] text-forest uppercase">Historia destacada</span>
              <span className="text-[10.5px] font-bold tracking-[.2em] text-cream/80 uppercase">Ediciones · 2026</span>
            </div>
            <h1 className="font-display text-[clamp(70px,12vw,190px)] leading-[.8]">No Bad Days</h1>
            <p className="mt-[18px] max-w-[520px] text-[clamp(15px,1.3vw,18px)] leading-[1.6] font-medium text-cream/88">
              La segunda edición de Perezoso, en el trail, en la pista y entre la selva.
            </p>
            <div className="mt-[26px] flex flex-wrap items-center gap-x-6 gap-y-3.5">
              <button
                type="button"
                onClick={() => open(0)}
                className="inline-flex items-center gap-3 bg-cream px-7 py-[17px] text-[11px] font-black tracking-[.2em] text-forest uppercase transition-colors hover:bg-orange"
              >
                <svg width="11" height="13" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
                  <path d="M0 0l12 7-12 7z" />
                </svg>
                Ver historia
              </button>
              <span className="text-[10.5px] font-bold tracking-[.2em] text-cream/70 uppercase">{SERIES[0].photos.length} fotos</span>
            </div>
          </div>
        </section>

        {/* FILTROS */}
        <section className="sticky top-[78px] z-40 border-b border-cream/10 bg-[#0d120a]/92 backdrop-blur-[14px]">
          <div className="flex items-center gap-[clamp(14px,3vw,36px)] overflow-x-auto px-[clamp(18px,4vw,64px)] whitespace-nowrap">
            {TABS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setTab(l)}
                aria-pressed={tab === l}
                className="border-b-[3px] pt-[18px] pb-[15px] text-[11px] font-extrabold tracking-[.2em] uppercase transition-colors hover:text-cream"
                style={{ borderBottomColor: tab === l ? "#F06A1D" : "transparent", color: tab === l ? "#FCF2D9" : "#FCF2D999" }}
              >
                {l}
              </button>
            ))}
            <span className="ml-auto text-[10px] font-bold tracking-[.2em] text-cream/50 uppercase">
              {visible.length === 1 ? "1 historia" : visible.length + " historias"}
            </span>
          </div>
        </section>

        {/* HISTORIAS */}
        <section className="px-[clamp(18px,4vw,64px)] pt-[clamp(34px,4vw,56px)] pb-[clamp(60px,7vw,100px)]">
          <div className="grid gap-[clamp(14px,1.6vw,24px)] [grid-auto-flow:dense]" style={{ gridTemplateColumns: `repeat(${cols},minmax(0,1fr))` }}>
            {visible.map(({ se: c, k }, idx) => {
              const big = idx === 0 && cols > 1;
              const hov = hover === k;
              const showDek = hov || big || cols === 1;
              return (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => open(k)}
                  aria-label={"Ver historia " + c.title}
                  onMouseEnter={() => setHover(k)}
                  onMouseLeave={() => setHover(null)}
                  className="relative block overflow-hidden bg-[#1a2213] text-left text-cream"
                  style={{
                    gridColumn: big ? "span 2" : "span 1",
                    gridRow: big ? "span 2" : "span 1",
                    minHeight: big ? "clamp(420px,46vw,640px)" : "clamp(300px,26vw,360px)",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1100ms] ease-[cubic-bezier(.16,.84,.24,1)]"
                    style={{ backgroundImage: url(c.cover), transform: hov ? "scale(1.06)" : "scale(1)" }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,18,10,0)_35%,rgba(13,18,10,.92)_100%)]" />
                  <div className="absolute top-3.5 left-3.5 flex gap-2">
                    <span className="bg-[#0d120acc] px-2.5 py-1.5 text-[9.5px] font-extrabold tracking-[.18em] uppercase">{c.tag}</span>
                  </div>
                  <span className="absolute top-3.5 right-3.5 flex items-center gap-[7px] bg-[#0d120acc] px-2.5 py-1.5 text-[9.5px] font-extrabold tracking-[.14em] uppercase">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FCF2D9" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="1" />
                      <circle cx="9" cy="11" r="2" />
                      <path d="M21 16l-5-5-8 8" />
                    </svg>
                    {c.photos.length}
                  </span>
                  <div className="absolute right-[clamp(16px,2vw,26px)] bottom-[clamp(16px,2vw,26px)] left-[clamp(16px,2vw,26px)]">
                    <div className="mb-2 text-[10px] font-bold tracking-[.2em] text-orange uppercase">{c.kicker}</div>
                    <h2
                      className="font-display leading-[.9]"
                      style={{ fontSize: big ? "clamp(56px,6vw,96px)" : "clamp(36px,3.2vw,50px)" }}
                    >
                      {c.title}
                    </h2>
                    <p
                      className="mt-2.5 max-w-[480px] text-[13.5px] leading-[1.55] font-medium text-cream/80 transition-[opacity,transform] duration-[350ms]"
                      style={{ opacity: showDek ? 1 : 0, transform: showDek ? "translateY(0)" : "translateY(8px)" }}
                    >
                      {c.dek}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* VIDEO */}
        <section className="px-[clamp(18px,4vw,64px)] pb-[clamp(70px,8vw,120px)]">
          <div className="mb-[18px] flex items-center gap-3.5">
            <span className="h-0.5 w-[46px] bg-orange" />
            <span className="text-[11px] font-extrabold tracking-[.24em] uppercase">En video</span>
          </div>
          <div className="grid grid-cols-1 items-center gap-[clamp(18px,3vw,48px)] min-[900px]:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="relative aspect-video overflow-hidden bg-[#1a2213]">
              <video
                ref={videoRef}
                src="/img/hero-video.mp4"
                poster="/img/hero-v5.jpg"
                muted
                loop
                playsInline
                aria-label="Video de riders Perezoso"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {!vPlaying && (
                <button
                  type="button"
                  onClick={toggleVideo}
                  aria-label="Reproducir video"
                  className="absolute inset-0 grid place-items-center bg-[#0d120a]/35"
                >
                  <span className="grid size-[78px] place-items-center rounded-full bg-orange shadow-[0_10px_30px_rgba(0,0,0,.4)]">
                    <svg width="22" height="26" viewBox="0 0 12 14" fill="#141D10" aria-hidden="true">
                      <path d="M1 0l11 7-11 7z" />
                    </svg>
                  </span>
                </button>
              )}
              {vPlaying && (
                <button
                  type="button"
                  onClick={toggleVideo}
                  aria-label="Pausar video"
                  className="absolute right-3.5 bottom-3.5 grid size-[42px] place-items-center bg-[#0d120acc]"
                >
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="#FCF2D9" aria-hidden="true">
                    <rect x="0" y="0" width="4" height="14" />
                    <rect x="8" y="0" width="4" height="14" />
                  </svg>
                </button>
              )}
            </div>
            <div>
              <div className="mb-2.5 text-[10px] font-bold tracking-[.2em] text-orange uppercase">Sesión · Rodada</div>
              <h2 className="font-display text-[clamp(46px,5.4vw,84px)] leading-[.88]">
                Ni lentos
                <br />
                ni perezosos
              </h2>
              <p className="mt-4 max-w-[420px] text-[14.5px] leading-[1.7] font-medium text-cream/70">Desde Costa Rica. De riders, para riders.</p>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap justify-between gap-3.5 border-t border-cream/10 px-[clamp(18px,4vw,64px)] py-[18px] text-[11px] font-medium tracking-[.14em] text-cream/65 uppercase">
          <span>© 2026 Perezoso &amp; CO.</span>
          <span>Ni lentos ni perezosos.</span>
        </footer>
      </main>

      {/* VISOR DE HISTORIA */}
      {se && v.s !== null && (
        <div role="dialog" aria-label={se.title} className="fixed inset-0 z-[120] bg-[#0b0f08] [animation:fadeIn_.3s_ease_both]">
          <div
            aria-hidden="true"
            className="absolute -inset-10 bg-cover bg-center [filter:blur(40px)_brightness(.35)] [transform:scale(1.1)]"
            style={{ backgroundImage: url(se.photos[v.i]) }}
          />
          <div
            key={v.s + "-" + v.i}
            role="img"
            aria-label={se.title + ", foto " + (v.i + 1)}
            className="absolute bg-center bg-no-repeat [animation:fadeIn_.45s_ease_both,kenburns_6s_ease-out_both]"
            style={{
              inset: mobile ? 0 : "90px clamp(40px,6vw,120px) 80px",
              backgroundImage: url(se.photos[v.i]),
              backgroundSize: mobile ? "cover" : "contain",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,15,8,.7)_0%,rgba(11,15,8,0)_22%,rgba(11,15,8,0)_72%,rgba(11,15,8,.8)_100%)]" />
          <div className="absolute top-4 right-[clamp(14px,3vw,40px)] left-[clamp(14px,3vw,40px)] flex gap-1">
            {se.photos.map((_, k) => (
              <div key={k} className="h-[3px] flex-1 overflow-hidden bg-cream/25">
                <div
                  className="h-full bg-cream"
                  style={{ width: k < v.i ? "100%" : k > v.i ? "0%" : Math.min(100, (v.t / DUR) * 100).toFixed(1) + "%" }}
                />
              </div>
            ))}
          </div>
          <div className="absolute top-[34px] right-[clamp(14px,3vw,40px)] left-[clamp(14px,3vw,40px)] z-[3] flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-baseline gap-3">
              <span className="bg-orange px-2 py-[5px] text-[9.5px] font-extrabold tracking-[.18em] text-forest uppercase">{se.tag}</span>
              <span className="overflow-hidden font-display text-[clamp(22px,2.2vw,30px)] text-ellipsis whitespace-nowrap">{se.title}</span>
              <span className="text-[10px] font-bold tracking-[.2em] text-cream/70">
                {String(v.i + 1).padStart(2, "0") + " / " + String(se.photos.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setV((cur) => ({ ...cur, playing: !cur.playing }))}
                aria-label={v.playing ? "Pausar" : "Reproducir"}
                className="grid size-10 place-items-center border border-cream/30"
              >
                {v.playing ? (
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="#FCF2D9" aria-hidden="true">
                    <rect x="0" y="0" width="4" height="14" />
                    <rect x="8" y="0" width="4" height="14" />
                  </svg>
                ) : (
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="#FCF2D9" aria-hidden="true">
                    <path d="M0 0l12 7-12 7z" />
                  </svg>
                )}
              </button>
              <button type="button" onClick={close} aria-label="Cerrar" className="grid size-10 place-items-center border border-cream/30 text-[22px] leading-none">
                ×
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setV((cur) => stepViewer(cur, -1))}
            aria-label="Foto anterior"
            className="absolute top-[90px] bottom-[90px] left-0 z-[2] w-[34%] cursor-w-resize"
          />
          <button
            type="button"
            onClick={() => setV((cur) => stepViewer(cur, 1))}
            aria-label="Foto siguiente"
            className="absolute top-[90px] right-0 bottom-[90px] z-[2] w-[66%] cursor-e-resize"
          />
          <div className="absolute right-[clamp(14px,3vw,40px)] bottom-6 left-[clamp(14px,3vw,40px)] z-[3] flex items-end justify-between gap-5">
            <div className="text-[10px] font-bold tracking-[.24em] text-cream/70 uppercase">{se.kicker}</div>
            {v.s + 1 < SERIES.length && (
              <button
                type="button"
                onClick={() => setV({ s: (v.s as number) + 1, i: 0, t: 0, playing: true })}
                className="flex items-center gap-2.5 border border-cream/30 px-[18px] py-3 text-[10.5px] font-extrabold tracking-[.2em] whitespace-nowrap text-cream uppercase hover:border-orange hover:text-orange"
              >
                Siguiente: {SERIES[v.s + 1].title} →
              </button>
            )}
          </div>
        </div>
      )}

      <InkMobileMenu open={menu} onClose={() => setMenu(false)} active="Galería" tone="forest" />
    </div>
  );
}
