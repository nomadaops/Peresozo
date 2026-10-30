"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { INVENTORY, money } from "@/lib/catalog";
import { loadManualOrders, loadSeen, saveSeen, STATUS_LIST, STATUS_STYLES } from "@/lib/storage";
import type { ManualOrder, OrderStatus } from "@/lib/types";
import { NotificationsBell } from "./notifications-bell";
import { InventoryTab } from "./inventory-tab";
import { ClientesTab } from "./clientes-tab";
import { PedidosTab } from "./pedidos-tab";
import { CustomerModal } from "./customer-modal";

type Tab = "inventario" | "clientes" | "pedidos";

export type Customer = {
  name: string;
  phone: string;
  address: string;
  orders: ManualOrder[];
};

const TAB_DEFS: { key: Tab; label: string }[] = [
  { key: "inventario", label: "Inventario" },
  { key: "clientes", label: "Clientes" },
  { key: "pedidos", label: "Pedidos" },
];

export function AdminApp() {
  const [tab, setTab] = useState<Tab>("inventario");
  const [orders, setOrders] = useState<ManualOrder[]>([]);
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);
  const [pedidosView, setPedidosView] = useState<"activos" | "entregados">("activos");
  const [notifOpen, setNotifOpen] = useState(false);
  const [seen, setSeen] = useState<string[]>([]);
  const [customerPhone, setCustomerPhone] = useState<string | null>(null);

  useEffect(() => {
    // One-time hydration of client-only state (localStorage isn't available
    // during SSR) — this must run in an effect, not a lazy initializer, or
    // the client's first render would mismatch the server-rendered markup.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(loadManualOrders());
    setSeen(loadSeen());
    const poll = setInterval(() => {
      setOrders((prev) => {
        const fresh = loadManualOrders();
        return fresh.length !== prev.length ? fresh : prev;
      });
    }, 1500);
    return () => clearInterval(poll);
  }, []);

  const markSeen = (id: string) => {
    setSeen((s) => {
      const next = s.includes(id) ? s : s.concat(id);
      saveSeen(next);
      return next;
    });
  };
  const markAllSeen = (ids: string[]) => {
    saveSeen(ids);
    setSeen(ids);
  };

  const setStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setOpenOrderId(null);
    if (status === "Entregado") setPedidosView("entregados");
    else setPedidosView((v) => (v === "entregados" ? "activos" : v));
  };

  const manual = orders.filter((o) => o.phone);
  const byPhone = useMemo(() => {
    const map: Record<string, Customer> = {};
    manual.forEach((o) => {
      if (!map[o.phone]) map[o.phone] = { name: o.customer, phone: o.phone, address: o.address, orders: [] };
      map[o.phone].orders.push(o);
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);
  const customerList = Object.values(byPhone).sort((a, b) => b.orders.length - a.orders.length);

  const doneCount = orders.filter((o) => o.status === "Entregado").length;
  const activeCount = orders.length - doneCount;

  const stats = useMemo(() => {
    const plain = { border: "#20291626", bg: "transparent", labelColor: "#20291699", valueColor: "#202916" };
    if (tab === "inventario") {
      return [
        { ...plain, label: "Productos", value: INVENTORY.length },
        { ...plain, label: "Sin stock", value: INVENTORY.filter((p) => p.stock === 0).length },
        { ...plain, label: "Unidades", value: INVENTORY.reduce((n, p) => n + p.stock, 0) },
      ];
    }
    if (tab === "clientes") {
      return [
        { ...plain, label: "Clientes", value: customerList.length },
        { ...plain, label: "Pedidos completados", value: doneCount },
      ];
    }
    return [
      { ...plain, label: "Activos", value: activeCount },
      { ...plain, label: "Por entregar", value: orders.filter((o) => o.status === "Entrega pendiente").length },
      {
        border: "#F06A1D",
        bg: pedidosView === "entregados" ? "#F06A1D" : "#F06A1D14",
        labelColor: pedidosView === "entregados" ? "#FCF2D9cc" : "#F06A1D",
        valueColor: pedidosView === "entregados" ? "#FCF2D9" : "#F06A1D",
        label: "Entregados",
        value: doneCount,
        onClick: () => setPedidosView("entregados"),
      },
    ];
  }, [tab, customerList.length, doneCount, activeCount, orders, pedidosView]);

  const activeLabel = TAB_DEFS.find((t) => t.key === tab)!.label;
  const visibleOrders = orders.filter((o) => (pedidosView === "entregados" ? o.status === "Entregado" : o.status !== "Entregado"));
  const customerDetail = customerPhone ? byPhone[customerPhone] : null;

  return (
    <div className="flex min-h-screen bg-cream text-ink">
      <aside className="flex min-h-screen w-[230px] flex-none flex-col bg-ink text-cream">
        <div className="border-b border-cream/12 px-[22px] py-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/wordmark-cream.png" alt="PEREZOSO" className="mb-1.5 h-4 w-auto" />
          <div className="text-[9px] font-semibold tracking-[.22em] text-orange uppercase">Panel administrativo</div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {TAB_DEFS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className="flex items-center gap-3 border-l-[3px] px-3.5 py-3.5 text-left text-[11px] font-bold tracking-[.1em] uppercase"
              style={{
                background: tab === t.key ? "#FCF2D912" : "transparent",
                color: tab === t.key ? "#FCF2D9" : "#FCF2D9aa",
                borderLeftColor: tab === t.key ? "#F06A1D" : "transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <Link
          href="/"
          className="border-t border-cream/12 px-[22px] py-[18px] text-[10.5px] font-bold tracking-[.16em] text-cream/73 uppercase"
        >
          ← Volver al sitio
        </Link>
      </aside>

      <main className="min-w-0 flex-1 px-[clamp(20px,3vw,44px)] pt-8 pb-[60px]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-[44px] leading-none">{activeLabel}</h1>
          <div className="flex items-start gap-2.5">
            <NotificationsBell
              open={notifOpen}
              setOpen={setNotifOpen}
              manual={manual}
              seen={seen}
              markAllSeen={() => markAllSeen(manual.map((o) => o.id))}
              onOpenOrder={(id) => {
                markSeen(id);
                setTab("pedidos");
                setPedidosView("activos");
                setNotifOpen(false);
              }}
            />
            {stats.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={s.onClick}
                className="min-w-[110px] px-[18px] py-3 text-left"
                style={{ border: "1px solid " + s.border, background: s.bg }}
              >
                <div className="text-[9px] font-semibold tracking-[.16em] uppercase" style={{ color: s.labelColor }}>
                  {s.label}
                </div>
                <div className="mt-0.5 font-display text-[28px] leading-[1.1]" style={{ color: s.valueColor }}>
                  {s.value}
                </div>
              </button>
            ))}
          </div>
        </div>

        {tab === "inventario" && <InventoryTab />}
        {tab === "clientes" && <ClientesTab customers={customerList} onOpen={(phone) => setCustomerPhone(phone)} />}
        {tab === "pedidos" && (
          <PedidosTab
            pedidosView={pedidosView}
            setPedidosView={setPedidosView}
            orders={visibleOrders}
            openOrderId={openOrderId}
            setOpenOrderId={setOpenOrderId}
            setStatus={setStatus}
          />
        )}
      </main>

      {customerDetail && <CustomerModal customer={customerDetail} onClose={() => setCustomerPhone(null)} />}
    </div>
  );
}

export { STATUS_LIST, STATUS_STYLES, money };
