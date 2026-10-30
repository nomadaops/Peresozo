import type { CartLine, ManualOrder, OrderStatus } from "./types";

const CART_KEY = "pz_cart_v1";
const ORDERS_KEY = "pz_manual_orders";
const SEEN_KEY = "pz_seen_orders";

export const STATUS_LIST: OrderStatus[] = [
  "Pago pendiente",
  "Pagado",
  "En producción",
  "Entrega pendiente",
  "Enviado",
  "Entregado",
  "Cancelado",
];

export const STATUS_STYLES: Record<OrderStatus, { bg: string; fg: string }> = {
  "Pago pendiente": { bg: "#20291614", fg: "#20291699" },
  Pagado: { bg: "#08ACC322", fg: "#08ACC3" },
  "En producción": { bg: "#D1AF7130", fg: "#8a6d34" },
  "Entrega pendiente": { bg: "#F06A1D22", fg: "#F06A1D" },
  Enviado: { bg: "#20291612", fg: "#202916" },
  Entregado: { bg: "#20291612", fg: "#202916" },
  Cancelado: { bg: "#20291614", fg: "#20291699" },
};

export function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartLine[]) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    /* ignore */
  }
}

export function loadManualOrders(): ManualOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveManualOrders(orders: ManualOrder[]) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    /* ignore */
  }
}

export function addManualOrder(order: ManualOrder) {
  const list = loadManualOrders();
  list.unshift(order);
  saveManualOrders(list);
}

export function loadSeen(): string[] {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSeen(ids: string[]) {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}
