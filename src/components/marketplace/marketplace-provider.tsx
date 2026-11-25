"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CAT_ORDER,
  MARKET_CATALOG,
  WA_NUMBER,
  marketCategories,
  normText,
  slugText,
  type MarketProduct,
} from "@/lib/marketplace-data";
import { money } from "@/lib/catalog";
import { loadCart, saveCart } from "@/lib/storage";
import type { CartLine } from "@/lib/types";

export type MarketRow = {
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

export type Sort = "destacados" | "precio-asc" | "precio-desc" | "nombre";

type MarketContextValue = {
  cart: CartLine[];
  lines: { key: string; id: string; size: string; qty: number; p: MarketProduct }[];
  rows: MarketRow[];
  count: number;
  subtotal: number;
  subtotalLabel: string;
  hasItems: boolean;
  cartEmpty: boolean;
  add: (p: MarketProduct, size: string, qty: number) => void;

  view: "grid" | "detail";
  pid: string | null;
  detailProduct: MarketProduct | null;
  gi: number;
  setGi: (i: number) => void;
  size: string | null;
  setSize: (s: string) => void;
  qty: number;
  setQty: (fn: (q: number) => number) => void;
  openDetail: (id: string, fromHash?: boolean) => void;
  backToGrid: () => void;

  cat: string;
  setCat: (c: string) => void;
  query: string;
  setQuery: (q: string) => void;
  sort: Sort;
  setSort: (s: Sort) => void;
  categories: string[];
  filtered: MarketProduct[];
  clearFilters: () => void;

  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  menu: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;

  toast: string;

  orderFormOpen: boolean;
  orderSent: boolean;
  openOrderForm: () => void;
  closeOrderForm: () => void;
  submitOrder: (name: string, email: string, address: string, phone: string) => Promise<boolean>;

  waPlain: string;
  waCheckout: string;

  searchRef: React.RefObject<HTMLInputElement | null>;
};

const MarketContext = createContext<MarketContextValue | null>(null);

function normalizeHash(h: string) {
  return decodeURIComponent((h || "").replace("#", ""));
}

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [view, setView] = useState<"grid" | "detail">("grid");
  const [pid, setPid] = useState<string | null>(null);
  const [gi, setGi] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [cat, setCat] = useState("Todos");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("destacados");
  const [cartOpen, setCartOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const categories = useMemo(() => marketCategories(), []);

  const openDetail = useCallback(
    (id: string, fromHash?: boolean) => {
      const p = MARKET_CATALOG.find((x) => x.id === id);
      if (!p) return;
      setView("detail");
      setPid(id);
      setGi(0);
      setSize(p.sizes[0]);
      setQty(1);
      if (!fromHash) {
        try {
          history.replaceState(null, "", "#p/" + id);
        } catch {
          /* ignore */
        }
      }
      window.scrollTo(0, 0);
    },
    []
  );

  const backToGrid = useCallback(() => {
    setView("grid");
    setPid(null);
    try {
      history.replaceState(null, "", "#");
    } catch {
      /* ignore */
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // One-time hydration of client-only state (localStorage isn't available
    // during SSR) — this must run in an effect, not a lazy initializer, or
    // the client's first render would mismatch the server-rendered markup.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(loadCart());

    const syncHash = () => {
      const h = normalizeHash(window.location.hash);
      if (h.startsWith("p/")) {
        const id = h.slice(2);
        if (MARKET_CATALOG.some((p) => p.id === id)) {
          openDetail(id, true);
          return;
        }
      }
      const cats = ["Todos"].concat(categories);
      const hit = cats.find((c) => slugText(c) === slugText(h));
      setView("grid");
      setPid(null);
      setCat(hit || "Todos");
    };
    window.addEventListener("hashchange", syncHash);
    syncHash();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = useCallback((next: CartLine[]) => {
    setCart(next);
    saveCart(next);
  }, []);

  const add = useCallback((p: MarketProduct, sizeArg: string, qtyArg: number) => {
    const key = p.id + "|" + sizeArg;
    setCart((prev) => {
      const next = prev.slice();
      const i = next.findIndex((l) => l.key === key);
      if (i >= 0) next[i] = { ...next[i], qty: next[i].qty + qtyArg };
      else next.push({ key, id: p.id, size: sizeArg, qty: qtyArg });
      saveCart(next);
      return next;
    });
    setCartOpen(true);
    setToast(p.name + " agregado");
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  }, []);

  const bump = useCallback((key: string, d: number) => {
    setCart((prev) => {
      const next = prev.map((l) => (l.key === key ? { ...l, qty: l.qty + d } : l)).filter((l) => l.qty > 0);
      saveCart(next);
      return next;
    });
  }, []);

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

  const rows: MarketRow[] = lines.map((l) => ({
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
    async (name: string, email: string, address: string, phone: string) => {
      const items = lines
        .map((l) => l.p.name + " · Talla " + l.size + " × " + l.qty)
        .join(", ");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: "Quiero hacer un pedido",
            nombre: name,
            email,
            tel: phone,
            provincia: address,
            ubicacion: address,
            mensaje:
              "Pedido desde el carrito:\n" +
              lines
                .map(
                  (l) =>
                    "• " + l.p.name + "\n  Talla: " + l.size + "\n  Cantidad: " + l.qty + "\n  Precio: " + money(l.p.price * l.qty)
                )
                .join("\n") +
              "\n\nSubtotal: " + money(subtotal),
          }),
        });

        if (!res.ok) return false;
      } catch {
        return false;
      }

      persist([]);
      setOrderSent(true);
      return true;
    },
    [lines, subtotal, persist]
  );

  const filtered = useMemo(() => {
    const q = normText(query);
    let list = MARKET_CATALOG.filter(
      (p) =>
        (cat === "Todos" || p.category === cat) &&
        (!q || normText(p.name).includes(q) || normText(p.category).includes(q) || normText(p.desc).includes(q))
    );
    if (sort === "precio-asc") list = list.slice().sort((a, b) => a.price - b.price);
    else if (sort === "precio-desc") list = list.slice().sort((a, b) => b.price - a.price);
    else if (sort === "nombre") list = list.slice().sort((a, b) => a.name.localeCompare(b.name, "es"));
    else list = list.slice().sort((a, b) => CAT_ORDER.indexOf(a.category) - CAT_ORDER.indexOf(b.category) || a.order - b.order);
    return list;
  }, [cat, query, sort]);

  const detailProduct = pid ? MARKET_CATALOG.find((p) => p.id === pid) || null : null;

  const value: MarketContextValue = {
    cart,
    lines,
    rows,
    count,
    subtotal,
    subtotalLabel: money(subtotal),
    hasItems: count > 0,
    cartEmpty: lines.length === 0,
    add,

    view: view === "detail" && detailProduct ? "detail" : "grid",
    pid,
    detailProduct,
    gi,
    setGi,
    size,
    setSize,
    qty,
    setQty,
    openDetail,
    backToGrid,

    cat,
    setCat: (c) => setCat(c),
    query,
    setQuery,
    sort,
    setSort,
    categories,
    filtered,
    clearFilters: () => {
      setCat("Todos");
      setQuery("");
    },

    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),

    menu,
    toggleMenu: () => setMenu((m) => !m),
    closeMenu: () => setMenu(false),

    toast,

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

    waPlain: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hola Perezoso, tengo una consulta sobre el marketplace."),
    waCheckout: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(waMsg),

    searchRef,
  };

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  const ctx = useContext(MarketContext);
  if (!ctx) throw new Error("useMarket must be used within MarketplaceProvider");
  return ctx;
}
