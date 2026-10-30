"use client";

import { money } from "@/lib/catalog";
import type { ManualOrder } from "@/lib/types";

export function NotificationsBell({
  open,
  setOpen,
  manual,
  seen,
  markAllSeen,
  onOpenOrder,
}: {
  open: boolean;
  setOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  manual: ManualOrder[];
  seen: string[];
  markAllSeen: () => void;
  onOpenOrder: (id: string) => void;
}) {
  const unread = manual.filter((o) => !seen.includes(o.id));
  const hasUnread = unread.length > 0;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notificaciones"
        className="relative grid size-11 place-items-center border border-ink/15"
        style={{ background: open ? "#20291612" : "transparent" }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#202916" strokeWidth="1.8" aria-hidden="true">
          <path d="M6 10a6 6 0 0 1 12 0v4l2 3H4l2-3v-4Z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
        {hasUnread && (
          <span className="absolute top-1.5 right-1.5 grid size-4 place-items-center rounded-full bg-orange text-[9px] font-extrabold text-cream">
            {unread.length}
          </span>
        )}
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} className="fixed inset-0 z-30" />
          <div className="absolute top-full right-0 z-40 mt-1.5 w-80 border border-ink/20 bg-cream shadow-[0_12px_30px_rgba(20,24,16,.15)]">
            <div className="flex items-center justify-between border-b border-ink/15 px-3.5 py-3">
              <span className="text-[10px] font-bold tracking-[.14em] uppercase">Notificaciones</span>
              {hasUnread && (
                <button type="button" onClick={markAllSeen} className="text-[9.5px] font-semibold tracking-[.1em] text-orange uppercase">
                  Marcar leídas
                </button>
              )}
            </div>
            {manual.length === 0 && (
              <div className="px-3.5 py-[22px] text-[12px] font-medium text-ink/60">Sin pedidos nuevos.</div>
            )}
            <div className="max-h-[280px] overflow-y-auto">
              {manual.slice(0, 8).map((o) => {
                const unreadOne = !seen.includes(o.id);
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => onOpenOrder(o.id)}
                    className="block w-full border-b border-ink/8 px-3.5 py-3 text-left"
                    style={{ background: unreadOne ? "#F06A1D0f" : "transparent" }}
                  >
                    <div className="flex items-center gap-1.5 text-[12px] font-bold">
                      {unreadOne && <span className="size-1.5 rounded-full bg-orange" />}
                      Nuevo pedido de {o.customer || "Cliente"}
                    </div>
                    <div className="mt-0.5 text-[11px] text-ink/60">
                      {o.items} · {money(o.total)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
