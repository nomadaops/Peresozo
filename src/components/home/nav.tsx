"use client";

import Link from "next/link";
import { useSite } from "@/components/site-provider";
import { EventosPill, NAV_LINKS } from "@/components/shared/ink-nav";

export function Nav() {
  const { scrolled, openCart, hasItems, count, toggleMenu } = useSite();

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      {scrolled ? (
        <div className="pointer-events-none absolute inset-x-3 top-3 bottom-2 rounded-[10px] border border-cream/16 bg-linear-to-b from-forest/74 to-forest/56 shadow-[inset_0_1px_0_rgba(252,242,217,.18),0_16px_40px_rgba(10,13,6,.4)] backdrop-blur-2xl [animation:dropDown_.42s_cubic-bezier(.2,.8,.2,1)_both] sm:inset-x-[clamp(12px,2vw,30px)]" />
      ) : (
        <div className="pointer-events-none absolute inset-0 border-b border-cream/10 bg-linear-to-b from-forest/34 to-forest/12 shadow-[inset_0_1px_0_rgba(252,242,217,.12)] backdrop-blur-md" />
      )}

      <div className="relative flex items-center gap-5 px-[clamp(26px,4vw,58px)] py-[22px] sm:gap-[clamp(20px,3vw,46px)]">
        <Link href="/#top" className="block flex-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/wordmark-cream.png" alt="PEREZOSO — inicio" className="h-[18px] w-auto" />
        </Link>

        <nav
          aria-label="Principal"
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-[clamp(6px,1.4vw,22px)] whitespace-nowrap text-[10.5px] font-semibold tracking-[.18em] uppercase min-[1200px]:flex"
        >
          {NAV_LINKS.map((l) =>
            l.label === "Home" ? (
              <Link key={l.label} href="/#top" className="rounded bg-orange px-[clamp(12px,1.5vw,22px)] py-2.5 text-forest">
                Home
              </Link>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className="rounded px-[clamp(12px,1.5vw,22px)] py-2.5 text-cream/85 transition-colors hover:bg-cream/14 hover:text-cream"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="ml-auto flex items-center gap-[clamp(12px,1.6vw,20px)]">
          <EventosPill hiddenOnMobile />
          <button type="button" aria-label="Buscar" className="grid size-[30px] place-items-center">
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
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Abrir menú"
            className="grid gap-1 py-1.5 pl-1.5 min-[1200px]:hidden"
          >
            <span className="block h-0.5 w-[22px] bg-cream" />
            <span className="block h-0.5 w-[22px] bg-cream" />
          </button>
        </div>
      </div>
    </header>
  );
}
