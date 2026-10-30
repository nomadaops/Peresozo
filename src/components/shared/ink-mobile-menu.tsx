"use client";

import Link from "next/link";
import { NAV_LINKS } from "./ink-nav";

export function InkMobileMenu({
  open,
  onClose,
  active,
  waPlain,
  tone = "ink",
}: {
  open: boolean;
  onClose: () => void;
  active: string;
  waPlain?: string;
  tone?: "ink" | "forest";
}) {
  if (!open) return null;

  return (
    <div
      className={
        "fixed inset-0 z-[90] flex flex-col text-cream [animation:fade_.2s_ease_both] " +
        (tone === "ink" ? "bg-ink" : "bg-forest")
      }
    >
      <div className="flex items-center justify-between border-b border-cream/12 px-[18px] py-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/wordmark-cream.png" alt="PEREZOSO" className="h-[17px] w-auto" />
        <button type="button" onClick={onClose} aria-label="Cerrar menú" className="text-[26px] leading-none text-cream">
          ×
        </button>
      </div>
      <nav className="grid px-[18px] py-3.5 font-display">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            onClick={onClose}
            className="border-b border-cream/8 text-[52px] leading-[1.14]"
            style={{ color: l.label === active ? "#F06A1D" : "#FCF2D9" }}
          >
            {l.label}
          </Link>
        ))}
        <Link href="/inscripciones" onClick={onClose} className="text-[52px] leading-[1.14] text-orange">
          Eventos
        </Link>
      </nav>
      {waPlain && (
        <a
          href={waPlain}
          target="_blank"
          rel="noopener"
          className="mt-auto bg-orange px-5 py-5 text-center text-[12px] font-extrabold tracking-[.22em] text-forest uppercase"
        >
          Escribir por WhatsApp
        </a>
      )}
    </div>
  );
}
