"use client";

import { useMarket } from "./marketplace-provider";

export function MarketToast() {
  const { toast } = useMarket();
  if (!toast) return null;

  return (
    <div className="fixed bottom-[26px] left-1/2 z-[95] -translate-x-1/2 bg-ink px-[22px] py-3.5 text-[10.5px] font-extrabold tracking-[.2em] text-cream uppercase [animation:riseIn_.25s_ease_both]">
      {toast}
    </div>
  );
}
