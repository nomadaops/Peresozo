export type GalleryItem = {
  img: string;
  alt: string;
  caption: string;
};

export type CartLine = {
  key: string;
  id: string;
  size: string;
  qty: number;
};

export type OrderStatus =
  | "Pago pendiente"
  | "Pagado"
  | "En producción"
  | "Entrega pendiente"
  | "Enviado"
  | "Entregado"
  | "Cancelado";

export type ManualOrder = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: string;
  total: number;
  date: string;
  status: OrderStatus;
};

export type InventoryItem = {
  name: string;
  category: string;
  price: number;
  stock: number;
  img: string;
};
