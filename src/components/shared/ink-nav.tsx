"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { loadCart } from "@/lib/storage";

export const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/galeria", label: "Galería" },
  { href: "/contacto", label: "Contacto" },
];

export function EventosPill({ filled = false, hiddenOnMobile = false }: { filled?: boolean; hiddenOnMobile?: boolean }) {
  const cls =
    "items-center gap-2 px-3.5 py-2 text-[10px] font-bold tracking-[.18em] whitespace-nowrap uppercase " +
    (hiddenOnMobile ? "hidden sm:inline-flex " : "inline-flex ");
  if (filled) {
    return (
      <span className={cls + "bg-orange text-forest"}>
        <span className="size-1.5 rounded-full bg-forest" />
        Eventos
      </span>
    );
  }
  return (
    <Link
      href="/inscripciones"
      className={cls + "border border-orange text-cream transition-colors hover:bg-orange hover:text-forest"}
    >
      <span className="size-1.5 rounded-full bg-orange" />
      Eventos
    </Link>
  );
}

/** Cart icon that links to the marketplace and shows the persisted cart count. */
export function CartLink() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(loadCart().reduce((n, l) => n + (l.qty || 0), 0));
  }, []);
  return (
    <Link href="/marketplace" aria-label="Ir al marketplace" className="relative grid size-[30px] place-items-center">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FCF2D9" strokeWidth="1.6" aria-hidden="true">
        <path d="M4 7h16l-1.4 14H5.4L4 7Z" />
        <path d="M8.5 7V5a3.5 3.5 0 0 1 7 0v2" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-px -right-[3px] min-w-[14px] bg-orange px-1 text-center text-[9px] font-extrabold text-forest">
          {count}
        </span>
      )}
    </Link>
  );
}

export function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label="Abrir menú" className="grid gap-1 py-1.5 pl-1.5 min-[1200px]:hidden">
      <span className="block h-0.5 w-[22px] bg-cream" />
      <span className="block h-0.5 w-[22px] bg-cream" />
    </button>
  );
}

export function InkNav({
  active,
  right,
  tone = "ink",
}: {
  active: string;
  right: ReactNode;
  tone?: "ink" | "forest";
}) {
  const pill =
    tone === "ink"
      ? "border-cream/12 bg-linear-to-b from-[#202916eb] to-[#202916db] shadow-[0_16px_40px_rgba(20,29,16,.18)]"
      : "border-cream/16 bg-linear-to-b from-forest/86 to-forest/76 shadow-[0_16px_40px_rgba(20,29,16,.22)]";

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <div
        className={
          "pointer-events-none absolute inset-x-3 top-3 bottom-2 rounded-[10px] border backdrop-blur-2xl sm:inset-x-[clamp(12px,2vw,30px)] " +
          pill
        }
      />
      <div className="relative flex items-center gap-5 px-[clamp(26px,4vw,58px)] py-[22px] sm:gap-[clamp(20px,3vw,46px)]">
        <Link href="/" className="block flex-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/wordmark-cream.png" alt="PEREZOSO — inicio" className="h-[18px] w-auto" />
        </Link>

        <nav
          aria-label="Principal"
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-[clamp(6px,1.4vw,22px)] whitespace-nowrap text-[10.5px] font-semibold tracking-[.18em] uppercase min-[1200px]:flex"
        >
          {NAV_LINKS.map((l) =>
            l.label === active ? (
              <span key={l.label} className="rounded bg-orange px-[clamp(12px,1.5vw,22px)] py-2.5 text-forest">
                {l.label}
              </span>
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

        <div className="ml-auto flex items-center gap-[clamp(12px,1.6vw,20px)]">{right}</div>
      </div>
    </header>
  );
}
