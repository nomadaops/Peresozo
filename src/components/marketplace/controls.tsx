"use client";

import { useMarket, type Sort } from "./marketplace-provider";

export function MarketControls() {
  const { categories, cat, setCat, query, setQuery, sort, setSort, filtered, searchRef } = useMarket();
  const cats = ["Todos", ...categories];
  const resultLabel = filtered.length === 1 ? "1 producto" : filtered.length + " productos";

  return (
    <section className="sticky top-[78px] z-40 border-y border-ink/15 bg-cream">
      <div className="flex flex-wrap items-center gap-[clamp(10px,1.6vw,20px)] px-[clamp(18px,3vw,48px)] py-3">
        <div className="flex flex-wrap gap-1.5">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className="border border-ink/20 px-4 py-2.5 text-[10.5px] font-bold tracking-[.16em] uppercase transition-colors hover:border-ink"
              style={{ background: cat === c ? "#202916" : "transparent", color: cat === c ? "#FCF2D9" : "#202916" }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2.5">
          <label className="flex items-center gap-2 border border-ink/20 bg-cream px-3 py-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#20291699" strokeWidth="1.8" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5 21 21" />
            </svg>
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar producto"
              aria-label="Buscar producto"
              className="w-[clamp(120px,14vw,180px)] border-0 bg-transparent text-[12px] font-medium text-ink outline-none"
            />
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Ordenar"
            className="border border-ink/20 bg-cream px-3 py-[9px] text-[10.5px] font-bold tracking-[.14em] text-ink uppercase"
          >
            <option value="destacados">Destacados</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre">Nombre A—Z</option>
          </select>
          <span className="text-[10.5px] font-semibold tracking-[.16em] text-ink/60 uppercase">{resultLabel}</span>
        </div>
      </div>
    </section>
  );
}
