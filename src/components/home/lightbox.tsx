"use client";

import { useSite } from "@/components/site-provider";

export function Lightbox() {
  const { lightbox, lightboxAlt, closeLightbox } = useSite();
  if (!lightbox) return null;

  return (
    <div
      onClick={closeLightbox}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-[#0a0d06]/95 p-[clamp(16px,4vw,60px)] [animation:fade_.2s_ease_both]"
    >
      <div
        role="img"
        aria-label={lightboxAlt}
        className="h-full w-full bg-center bg-no-repeat [animation:riseIn_.3s_ease_both] [background-size:contain]"
        style={{ backgroundImage: `url(${lightbox})` }}
      />
      <button
        type="button"
        onClick={closeLightbox}
        aria-label="Cerrar"
        className="absolute top-5 right-6 text-[30px] leading-none text-cream"
      >
        ×
      </button>
    </div>
  );
}
