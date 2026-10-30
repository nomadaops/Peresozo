"use client";

import { EventosPill, HamburgerButton, InkNav } from "@/components/shared/ink-nav";
import { useMarket } from "./marketplace-provider";

export function MarketNav() {
  const { openCart, hasItems, count, toggleMenu, searchRef } = useMarket();

  return (
    <InkNav
      active="Marketplace"
      right={
        <>
          <EventosPill />
          <button
            type="button"
            onClick={() => searchRef.current?.focus()}
            aria-label="Buscar"
            className="grid size-[30px] place-items-center"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#FCF2D9" strokeWidth="1.6" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5 21 21" />
            </svg>
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative grid size-[30px] place-items-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FCF2D9" strokeWidth="1.6" aria-hidden="true">
              <path d="M4 7h16l-1.4 14H5.4L4 7Z" />
              <path d="M8.5 7V5a3.5 3.5 0 0 1 7 0v2" />
            </svg>
            {hasItems && (
              <span className="absolute -top-px -right-[3px] min-w-[14px] bg-orange px-1 text-center text-[9px] font-extrabold text-forest">
                {count}
              </span>
            )}
          </button>
          <HamburgerButton onClick={toggleMenu} />
        </>
      }
    />
  );
}
