"use client";

import { money } from "@/lib/catalog";
import { STATUS_LIST, STATUS_STYLES } from "@/lib/storage";
import type { ManualOrder, OrderStatus } from "@/lib/types";

export function PedidosTab({
  pedidosView,
  setPedidosView,
  orders,
  openOrderId,
  setOpenOrderId,
  setStatus,
}: {
  pedidosView: "activos" | "entregados";
  setPedidosView: (v: "activos" | "entregados") => void;
  orders: ManualOrder[];
  openOrderId: string | null;
  setOpenOrderId: (id: string | null) => void;
  setStatus: (id: string, status: OrderStatus) => void;
}) {
  const emptyLabel = pedidosView === "entregados" ? "Todavía no hay pedidos entregados." : "No hay pedidos activos.";

  return (
    <div>
      <div className="mb-3.5 flex items-center gap-2 text-[10px] font-bold tracking-[.12em] text-ink/60 uppercase">
        <span>Viendo:</span>
        <button
          type="button"
          onClick={() => setPedidosView("activos")}
          className="border border-ink/20 px-3 py-1.5"
          style={{
            background: pedidosView === "activos" ? "#202916" : "transparent",
            color: pedidosView === "activos" ? "#FCF2D9" : "#202916",
          }}
        >
          Activos
        </button>
        <button
          type="button"
          onClick={() => setPedidosView("entregados")}
          className="border border-ink/20 px-3 py-1.5"
          style={{
            background: pedidosView === "entregados" ? "#202916" : "transparent",
            color: pedidosView === "entregados" ? "#FCF2D9" : "#202916",
          }}
        >
          Entregados
        </button>
      </div>

      <div className="border-t border-ink/15">
        <div className="grid grid-cols-[90px_1.6fr_2fr_1fr_1fr_120px] gap-3.5 border-b border-ink/15 px-2.5 py-3 text-[9.5px] font-bold tracking-[.14em] text-ink/60 uppercase">
          <span>Pedido</span>
          <span>Cliente</span>
          <span>Productos</span>
          <span>Total</span>
          <span>Fecha</span>
          <span>Estado</span>
        </div>
        {orders.length === 0 && <div className="px-2.5 py-[30px] text-[12.5px] font-medium text-ink/60">{emptyLabel}</div>}
        {orders.map((o) => {
          const st = STATUS_STYLES[o.status] || STATUS_STYLES.Entregado;
          const isOpen = openOrderId === o.id;
          return (
            <div
              key={o.id}
              className="grid grid-cols-[90px_1.6fr_2fr_1fr_1fr_120px] items-center gap-3.5 border-b border-ink/8 px-2.5 py-3 text-[12.5px] font-medium"
            >
              <span className="text-[13px] font-bold">{o.id}</span>
              <span>{o.customer}</span>
              <span className="text-ink/60">{o.items}</span>
              <span className="text-[12.5px] font-bold">{money(o.total)}</span>
              <span className="text-ink/60">{o.date}</span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenOrderId(isOpen ? null : o.id)}
                  className="inline-flex w-fit items-center gap-1.5 px-2.5 py-[5px] text-[9.5px] font-bold tracking-[.1em] uppercase"
                  style={{ background: st.bg, color: st.fg }}
                >
                  {o.status} <span className="text-[8px]">▾</span>
                </button>
                {isOpen && (
                  <>
                    <div onClick={() => setOpenOrderId(null)} className="fixed inset-0 z-10" />
                    <div className="absolute top-full left-0 z-20 mt-1 min-w-[170px] border border-ink/20 bg-cream shadow-[0_10px_24px_rgba(20,24,16,.15)]">
                      {STATUS_LIST.map((label) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setStatus(o.id, label)}
                          className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[10.5px] font-bold tracking-[.06em] uppercase hover:bg-ink/6"
                          style={{ color: label === o.status ? "#F06A1D" : "#202916" }}
                        >
                          <span className="size-1.5 rounded-full" style={{ background: (STATUS_STYLES[label] || {}).fg || "#202916" }} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
