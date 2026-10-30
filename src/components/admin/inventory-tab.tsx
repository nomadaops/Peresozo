import { INVENTORY, money } from "@/lib/catalog";

export function InventoryTab() {
  return (
    <div className="border-t border-ink/15">
      <div className="grid grid-cols-[56px_2fr_1fr_1fr_1fr_90px] gap-3.5 border-b border-ink/15 px-2.5 py-3 text-[9.5px] font-bold tracking-[.14em] text-ink/60 uppercase">
        <span />
        <span>Producto</span>
        <span>Categoría</span>
        <span>Precio</span>
        <span>Stock</span>
        <span />
      </div>
      {INVENTORY.map((p) => {
        const stockColor = p.stock === 0 ? "#c0392b" : p.stock < 6 ? "#F06A1D" : "#2e7d32";
        return (
          <div
            key={p.name}
            className="grid grid-cols-[56px_2fr_1fr_1fr_1fr_90px] items-center gap-3.5 border-b border-ink/8 px-2.5 py-2.5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt="" className="h-14 w-11 bg-[#EFE3C4] object-cover" />
            <span className="text-[13px] font-bold">{p.name}</span>
            <span className="text-[12px] font-medium text-ink/60">{p.category}</span>
            <span className="text-[12.5px] font-bold">{money(p.price)}</span>
            <span className="flex items-center gap-1.5 text-[12px] font-semibold">
              <span className="size-1.5 rounded-full" style={{ background: stockColor }} />
              {p.stock} u.
            </span>
            <button type="button" className="border border-ink/20 px-2.5 py-2 text-[10px] font-bold tracking-[.1em] uppercase">
              Editar
            </button>
          </div>
        );
      })}
    </div>
  );
}
