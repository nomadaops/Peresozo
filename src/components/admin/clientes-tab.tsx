import type { Customer } from "./admin-app";

export function ClientesTab({ customers, onOpen }: { customers: Customer[]; onOpen: (phone: string) => void }) {
  return (
    <div className="border-t border-ink/15">
      <div className="grid grid-cols-[2fr_1.4fr_1.6fr_1fr_1fr] gap-3.5 border-b border-ink/15 px-2.5 py-3 text-[9.5px] font-bold tracking-[.14em] text-ink/60 uppercase">
        <span>Cliente</span>
        <span>WhatsApp</span>
        <span>Correo</span>
        <span>Completados</span>
        <span>Última compra</span>
      </div>
      {customers.length === 0 && (
        <div className="px-2.5 py-[30px] text-[12.5px] font-medium text-ink/60">
          Todavía no hay clientes. Aparecerán cuando alguien haga un pedido desde la página principal o el
          marketplace.
        </div>
      )}
      {customers.map((c) => (
        <button
          key={c.phone}
          type="button"
          onClick={() => onOpen(c.phone)}
          className="grid w-full grid-cols-[2fr_1.4fr_1.6fr_1fr_1fr] items-center gap-3.5 border-b border-ink/8 px-2.5 py-3 text-left text-[12.5px] font-medium hover:bg-ink/6"
        >
          <span className="text-[13px] font-bold">{c.name}</span>
          <span className="text-ink/60">{c.phone}</span>
          <span className="text-ink/60 break-all">{c.address}</span>
          <span className="text-[12.5px] font-bold">{c.orders.filter((o) => o.status === "Entregado").length}</span>
          <span className="text-ink/60">{c.orders[0] ? c.orders[0].date : "—"}</span>
        </button>
      ))}
    </div>
  );
}
