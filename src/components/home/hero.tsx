"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const muteHero = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = true;
      v.volume = 0;
      v.defaultMuted = true;
      v.loop = true;
      v.onended = () => {
        v.currentTime = 0;
        v.play().catch(() => {});
      };
      const pr = v.play();
      if (pr && pr.catch) pr.catch(() => {});
    };
    const t1 = setTimeout(muteHero, 0);
    const t2 = setTimeout(muteHero, 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative h-[min(92vh,860px)] min-h-[560px] overflow-hidden [scroll-margin-top:86px]"
    >
      <video
        ref={videoRef}
        src="/img/hero-video.mp4"
        poster="/img/hero-v5.jpg"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-label="Rider Perezoso en movimiento"
        className="absolute -inset-[6%] h-[112%] w-[112%] object-cover [object-position:58%_42%] [filter:saturate(1.08)] [transform:translateZ(0)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,29,16,.9)_0%,rgba(20,29,16,.62)_26%,rgba(20,29,16,.14)_52%,rgba(20,29,16,0)_66%)]" />

      <div className="pointer-events-none absolute bottom-[118px] left-[clamp(18px,3vw,48px)] max-w-[1040px]">
        <h1 className="font-display text-[clamp(58px,11.5vw,176px)] leading-[.8] text-cream">
          Ni lentos
          <br />
          ni perezosos<span className="text-orange">.</span>
        </h1>
        <p className="mt-[22px] max-w-[420px] text-[clamp(12.5px,1vw,14px)] leading-[1.7] text-cream/70">
          Desde Costa Rica. De riders, para riders.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-stretch border-t border-cream/12">
        <div className="flex min-w-0 flex-1 basis-[260px] items-center overflow-hidden px-[26px] py-3.5">
          <div className="inline-flex animate-[tick_34s_linear_infinite] gap-[26px] whitespace-nowrap text-[11.5px] font-medium tracking-[.14em] text-cream/60 uppercase">
            <span className="inline-flex gap-[26px]">
              Bikewear funcional<span className="text-orange">✦</span>Actitud streetwear
              <span className="text-orange">✦</span>Bikelife<span className="text-orange">✦</span>
              Hecho en Costa Rica<span className="text-orange">✦</span>Para todos tus terrenos
              <span className="text-orange">✦</span>
            </span>
            <span className="inline-flex gap-[26px]">
              Bikewear funcional<span className="text-orange">✦</span>Actitud streetwear
              <span className="text-orange">✦</span>Bikelife<span className="text-orange">✦</span>
              Hecho en Costa Rica<span className="text-orange">✦</span>Para todos tus terrenos
              <span className="text-orange">✦</span>
            </span>
          </div>
        </div>
        <Link
          href="/marketplace"
          className="flex items-center gap-3.5 bg-orange px-[clamp(22px,3vw,40px)] py-5 text-[12px] font-extrabold tracking-[.2em] text-forest uppercase"
        >
          Ver marketplace <span className="text-[15px]">→</span>
        </Link>
      </div>
    </section>
  );
}
