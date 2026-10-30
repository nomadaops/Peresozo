export const WA_NUMBER = "50683127667";
export const EMAIL = "theperezosocompanycr@gmail.com";
export const IG = "perezoso.506";

export const TOPICS = ["Consulta general", "Quiero hacer un pedido", "Información sobre un producto", "Colaboraciones", "Otro"] as const;
export type Topic = (typeof TOPICS)[number];

export const DELIVERIES = [
  {
    id: "uber",
    label: "Yo coordino un Uber Flash",
    note: "Vos pedís el Uber Flash y lo recoge en nuestra ubicación.",
    loc: true,
    icon: "M3 13h11l2-4h3l2 4v4h-2M3 13v4h2M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM9 17h6",
  },
  {
    id: "recoger",
    label: "Quiero recogerlo personalmente",
    note: "Coordinamos día y hora en San Rafael de Heredia.",
    loc: false,
    icon: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  },
  {
    id: "correo",
    label: "Quiero que me llegue por correo",
    note: "Envío por Correos de Costa Rica a todo el país.",
    loc: true,
    icon: "M3 7l9 6 9-6M3 7v10h18V7M3 7h18",
  },
] as const;

export const PRODUCTS: { id: string; label: string; price: number; img: string; oneSize?: boolean }[] = [
  { id: "nbd-rainbow-ls", label: "NBD Rainbow Long Sleeve", price: 25000, img: "p-nbd-rainbow-1" },
  { id: "nbd-blackgold-ls", label: "NBD Black/Gold Long Sleeve", price: 25000, img: "p-nbd-blackgold-1" },
  { id: "nbd-burgundy-ls", label: "NBD Burgundy Long Sleeve", price: 25000, img: "p-nbd-burgundy-3" },
  { id: "nbd-green-ls", label: "NBD Green Long Sleeve", price: 25000, img: "p-nbd-green-1" },
  { id: "nbd-rainbow-ss", label: "NBD Rainbow Short Sleeve", price: 22000, img: "p-nbd-rainbow-ss-1" },
  { id: "nbd-blackgold-ss", label: "NBD Black/Gold Short Sleeve", price: 22000, img: "p-nbd-blackgold-ss-1" },
  { id: "nbd-burgundy-ss", label: "NBD Burgundy Short Sleeve", price: 22000, img: "p-nbd-burgundy-ss-1" },
  { id: "nbd-green-ss", label: "NBD Green Short Sleeve", price: 22000, img: "p-pack-1" },
  { id: "sleeveless", label: "Sleeveless", price: 24500, img: "p-sleeveless-1" },
  { id: "signature-white", label: "Signature Tee White", price: 22500, img: "p-signature-white-1" },
  { id: "signature-black", label: "Signature Tee Black", price: 22500, img: "p-signature-black-1" },
  { id: "nbd-snapback", label: "NBD Snapback", price: 23500, img: "p-nbd-snapback-1", oneSize: true },
];

export const SIZES = ["S", "M", "L", "XL", "XXL", "Otra"] as const;

export type Channel = {
  label: string;
  value: string;
  note: string;
  tint: string;
  target: "_blank" | "_self";
  href: string;
  path: string;
};

export function channels(): Channel[] {
  return [
    {
      label: "WhatsApp",
      value: "+506 8312-7667",
      note: "Respuesta en menos de 24 h",
      tint: "#25D366",
      target: "_blank",
      href: "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent("Hola Perezoso, quisiera recibir más información."),
      path: "M21 15.5v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 2.7 2 2 0 0 1 3.1.5h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L7.1 8.3a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2Z",
    },
    {
      label: "Correo",
      value: EMAIL,
      note: "Para pedidos con detalle o facturas",
      tint: "#F06A1D",
      target: "_self",
      href: "mailto:" + EMAIL,
      path: "M3 5h18v14H3V5Zm0 1 9 7 9-7",
    },
    {
      label: "Instagram",
      value: "@" + IG,
      note: "Drops, campañas y riders",
      tint: "#08ACC3",
      target: "_blank",
      href: "https://instagram.com/" + IG,
      path: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM17.5 6.4v.01",
    },
    {
      label: "Ubicación",
      value: "San Rafael de Heredia",
      note: "Costa Rica · entregas coordinadas",
      tint: "#D1AF71",
      target: "_blank",
      href: "https://www.google.com/maps/search/?api=1&query=San+Rafael%2C+Heredia%2C+Costa+Rica",
      path: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
    },
  ];
}

export function money(n: number): string {
  return "₡" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
