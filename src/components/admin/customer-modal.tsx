import { money } from "@/lib/catalog";
import type { Customer } from "./admin-app";

export function CustomerModal({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-5">
      <div onClick={onClose} className="absolute inset-0 bg-[#0a0d06]/80" />
      <div className="relative max-h-[84vh] w-[min(480px,100%)] overflow-y-auto bg-cream p-[30px]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3.5 right-4 text-[24px] leading-none text-ink/60"
        >
          ×
        </button>
        <div className="mb-2 text-[10px] font-semibold tracking-[.22em] text-orange uppercase">Datos del pedido</div>
        <h2 className="mb-4 font-display text-[36px] leading-none">{customer.name}</h2>
        <div className="border-t border-ink/15">
          <div className="flex justify-between border-b border-ink/12 py-3">
            <span className="text-[10px] font-bold tracking-[.14em] text-ink/60 uppercase">Teléfono</span>
            <span className="text-[13px] font-semibold">{customer.phone}</span>
          </div>
          <div className="flex justify-between gap-4 border-b border-ink/12 py-3">
            <span className="text-[10px] font-bold tracking-[.14em] text-ink/60 uppercase">Dirección</span>
            <span className="text-right text-[13px] font-semibold">{customer.address}</span>
          </div>
        </div>
        <div className="mt-5 mb-2 text-[10px] font-bold tracking-[.14em] text-ink/60 uppercase">
          Pedidos ({customer.orders.length})
        </div>
        {customer.orders.map((o) => (
          <div key={o.id} className="border-b border-ink/8 py-3">
            <div className="flex justify-between text-[13px] font-bold">
              <span>{o.id}</span>
              <span>{money(o.total)}</span>
            </div>
            <div className="mt-0.5 text-[12px] font-medium text-ink/60">{o.items}</div>
            <div className="mt-0.5 text-[11px] text-ink/50">
              {o.date} · {o.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
