"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { WA_NUMBER, money } from "@/lib/catalog";
import { MARKET_CATALOG, type MarketProduct } from "@/lib/marketplace-data";
import { addManualOrder, loadCart, saveCart } from "@/lib/storage";
import type { CartLine } from "@/lib/types";

export type CartRow = {
  key: string;
  name: string;
  img: string;
  alt: string;
  size: string;
  qty: number;
  lineLabel: string;
  inc: () => void;
  dec: () => void;
  remove: () => void;
};

type SiteContextValue = {
  cart: CartLine[];
  lines: { key: string; id: string; size: string; qty: number; p: MarketProduct }[];
  rows: CartRow[];
  count: number;
  subtotal: number;
  subtotalLabel: string;
  hasItems: boolean;
  isEmpty: boolean;

  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  menu: boolean;
  toggleMenu: () => void;

  lightbox: string | null;
  lightboxAlt: string;
  openLightbox: (img: string, alt: string) => void;
  closeLightbox: () => void;

  adminOpen: boolean;
  openAdminLogin: () => void;
  closeAdminLogin: () => void;

  orderFormOpen: boolean;
  orderSent: boolean;
  openOrderForm: () => void;
  closeOrderForm: () => void;
  submitOrder: (name: string, address: string, phone: string) => void;

  waPlain: string;
  waCheckout: string;

  scrolled: boolean;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");
  const [adminOpen, setAdminOpen] = useState(false);
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [y, setY] = useState(0);

  useEffect(() => {
    // One-time hydration of client-only state (localStorage isn't available
    // during SSR) — this must run in an effect, not a lazy initializer, or
    // the client's first render would mismatch the server-rendered markup.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(loadCart());
    const onScroll = () => {
      const se = document.scrollingElement || document.documentElement;
      setY(window.scrollY || se.scrollTop || 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setMenu(false);
        setLightbox(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const persist = useCallback((next: CartLine[]) => {
    setCart(next);
    saveCart(next);
  }, []);

  const bump = useCallback(
    (key: string, d: number) => {
      setCart((prev) => {
        const next = prev
          .map((l) => (l.key === key ? { ...l, qty: l.qty + d } : l))
          .filter((l) => l.qty > 0);
        saveCart(next);
        return next;
      });
    },
    []
  );

  const dropLine = useCallback((key: string) => {
    setCart((prev) => {
      const next = prev.filter((l) => l.key !== key);
      saveCart(next);
      return next;
    });
  }, []);

  const lines = useMemo(
    () =>
      cart
        .map((l) => {
          const p = MARKET_CATALOG.find((c) => c.id === l.id);
          return p ? { ...l, p } : null;
        })
        .filter((l): l is { key: string; id: string; size: string; qty: number; p: MarketProduct } => l !== null),
    [cart]
  );

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.qty * l.p.price, 0);

  const rows: CartRow[] = lines.map((l) => ({
    key: l.key,
    name: l.p.name,
    img: l.p.imgs[0],
    alt: l.p.alt,
    size: l.size,
    qty: l.qty,
    lineLabel: money(l.p.price * l.qty),
    inc: () => bump(l.key, 1),
    dec: () => bump(l.key, -1),
    remove: () => dropLine(l.key),
  }));

  const waLines = lines
    .map(
      (l) =>
        "• " + l.p.name + "\n  Talla: " + l.size + "\n  Cantidad: " + l.qty + "\n  Precio: " + money(l.p.price * l.qty)
    )
    .join("\n");
  const waMsg = "Hola, quiero realizar este pedido en Perezoso:\n\n" + waLines + "\n\nTotal: " + money(subtotal);

  const submitOrder = useCallback(
    (name: string, address: string, phone: string) => {
      addManualOrder({
        id: "#" + Math.floor(1000 + Math.random() * 9000),
        customer: name,
        phone,
        address,
        items: lines.map((l) => l.p.name + " · Talla " + l.size + " × " + l.qty).join(", ") || "Sin productos en carrito",
        total: subtotal,
        date: new Date().toLocaleDateString("es-CR", { day: "2-digit", month: "short", year: "numeric" }),
        status: "Pago pendiente",
      });
      persist([]);
      setOrderSent(true);
    },
    [lines, subtotal, persist]
  );

  const value: SiteContextValue = {
    cart,
    lines,
    rows,
    count,
    subtotal,
    subtotalLabel: money(subtotal),
    hasItems: count > 0,
    isEmpty: lines.length === 0,

    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),

    menu,
    toggleMenu: () => setMenu((m) => !m),

    lightbox,
    lightboxAlt,
    openLightbox: (img, alt) => {
      setLightbox(img);
      setLightboxAlt(alt);
    },
    closeLightbox: () => setLightbox(null),

    adminOpen,
    openAdminLogin: () => setAdminOpen(true),
    closeAdminLogin: () => setAdminOpen(false),

    orderFormOpen,
    orderSent,
    openOrderForm: () => {
      setOrderFormOpen(true);
      setOrderSent(false);
    },
    closeOrderForm: () => {
      setOrderFormOpen(false);
      setCartOpen(false);
    },
    submitOrder,

    waPlain: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hola Perezoso, tengo una consulta."),
    waCheckout: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(waMsg),

    scrolled: y > 40,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
