export type MarketProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  order: number;
  imgs: string[];
  alt: string;
  sizes: string[];
  tag: string;
  desc: string;
  specs: [string, string][];
};

export const WA_NUMBER = "50683127667";

export const CAT_ORDER = ["Long Sleeve", "Short Sleeve", "Camisetas", "Accesorios"];

const JERSEY_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "Niño (3–11)"];
export const KID_SIZE = "Niño (3–11)";

export const MARKET_CATALOG: MarketProduct[] = [
  {
    id: "sleeveless",
    name: "Sleeveless",
    category: "Camisetas",
    price: 24500,
    order: 1,
    imgs: ["/img/p-sleeveless-1.jpg", "/img/p-sleeveless-2.jpg", "/img/p-sleeveless-3.jpg"],
    alt: "Sleeveless Perezoso gris lavado colgado en el bosque",
    sizes: ["S", "M", "L", "XL"],
    tag: "Nuevo",
    desc: "Jersey sin mangas en gris lavado, con logo al frente y gráfica grande en la espalda.",
    specs: [
      ["Manga", "Sin mangas"],
      ["Estampado", "Logo al frente, gráfica en la espalda"],
    ],
  },
  {
    id: "nbd-rainbow-long-sleeve",
    name: "NBD Rainbow Long Sleeve",
    category: "Long Sleeve",
    price: 25000,
    order: 2,
    imgs: ["/img/p-nbd-rainbow-1.jpg", "/img/p-nbd-rainbow-2.jpg", "/img/p-nbd-rainbow-3.jpg"],
    alt: "Rider con el jersey NBD Rainbow Long Sleeve de Perezoso",
    sizes: JERSEY_SIZES,
    tag: "",
    desc: "Sublimación full color en degradado azul a fucsia, con gráfica en mangas y torso.",
    specs: [
      ["Manga", "Larga"],
      ["Gráfica", "Sublimada full color"],
    ],
  },
  {
    id: "nbd-blackgold-long-sleeve",
    name: "NBD Black/Gold Long Sleeve",
    category: "Long Sleeve",
    price: 25000,
    order: 3,
    imgs: ["/img/p-nbd-blackgold-1.jpg", "/img/p-nbd-blackgold-2.jpg", "/img/p-nbd-blackgold-3.jpg"],
    alt: "Rider con el jersey NBD Black/Gold Long Sleeve de Perezoso",
    sizes: JERSEY_SIZES,
    tag: "",
    desc: "Jersey negro de manga larga con detalles en naranja dorado en hombros, mangas y la gráfica de la espalda.",
    specs: [
      ["Manga", "Larga"],
      ["Gráfica", "Logo al frente, gráfica grande en la espalda"],
    ],
  },
  {
    id: "tee-boxlogo-crema",
    name: "Signature Tee White",
    category: "Camisetas",
    price: 22500,
    oldPrice: 29900,
    order: 4,
    imgs: ["/img/p-signature-white-1.jpg", "/img/p-signature-white-2.jpg", "/img/p-signature-white-3.jpg"],
    alt: "Rider con la Signature Tee White de Perezoso",
    sizes: ["S", "M", "L", "XL"],
    tag: "",
    desc: "Camiseta blanca de corte holgado con box logo rojo al frente.",
    specs: [
      ["Color", "Claro"],
      ["Gráfica", "Box logo rojo"],
    ],
  },
  {
    id: "signature-tee-black",
    name: "Signature Tee Black",
    category: "Camisetas",
    price: 22500,
    oldPrice: 29900,
    order: 4.5,
    imgs: ["/img/p-signature-black-1.jpg", "/img/p-signature-black-2.jpg", "/img/p-signature-black-3.jpg"],
    alt: "Rider con la Signature Tee Black de Perezoso",
    sizes: ["S", "M", "L", "XL"],
    tag: "Nuevo",
    desc: "Camiseta negra de corte holgado con box logo rojo al frente.",
    specs: [
      ["Color", "Negro"],
      ["Gráfica", "Box logo rojo"],
    ],
  },
  {
    id: "nbd-burgundy-long-sleeve",
    name: "NBD Burgundy Long Sleeve",
    category: "Long Sleeve",
    price: 25000,
    order: 3.5,
    imgs: ["/img/p-nbd-burgundy-3.jpg"],
    alt: "Rider con el jersey NBD Burgundy Long Sleeve de Perezoso",
    sizes: JERSEY_SIZES,
    tag: "Nuevo",
    desc: "Jersey de manga larga en burgundy con franjas naranja y blanco al frente.",
    specs: [
      ["Manga", "Larga"],
      ["Gráfica", "Franjas al frente"],
    ],
  },
  {
    id: "tee-boxlogo-negra",
    name: "NBD Black/Gold Short Sleeve",
    category: "Short Sleeve",
    price: 22000,
    order: 5,
    imgs: ["/img/p-nbd-blackgold-ss-1.jpg"],
    alt: "Rider con el jersey NBD Black/Gold Short Sleeve de Perezoso",
    sizes: JERSEY_SIZES,
    tag: "",
    desc: "Jersey negro de manga corta con hombros y costados en naranja dorado, y logo naranja al frente.",
    specs: [
      ["Color", "Negro"],
      ["Gráfica", "Box logo rojo"],
    ],
  },
  {
    id: "tee-trail",
    name: "NBD Green Long Sleeve",
    category: "Long Sleeve",
    price: 25000,
    order: 6,
    imgs: ["/img/p-nbd-green-1.jpg", "/img/p-nbd-green-2.jpg", "/img/p-nbd-green-3.jpg"],
    alt: "Rider con el jersey NBD Green Long Sleeve de Perezoso",
    sizes: JERSEY_SIZES,
    tag: "",
    desc: 'Jersey de manga larga en negro y verde, con franja diagonal al frente y "No Bad Days" en la espalda.',
    specs: [
      ["Manga", "Larga"],
      ["Gráfica", 'Franja diagonal al frente, "No Bad Days" en la espalda'],
    ],
  },
  {
    id: "gorra-perezoso",
    name: "NBD Burgundy Short Sleeve",
    category: "Short Sleeve",
    price: 22000,
    order: 7,
    imgs: ["/img/p-nbd-burgundy-ss-1.jpg", "/img/p-nbd-burgundy-ss-2.jpg", "/img/p-nbd-burgundy-ss-3.jpg"],
    alt: "Rider con el jersey NBD Burgundy Short Sleeve de Perezoso",
    sizes: JERSEY_SIZES,
    tag: "",
    desc: "Jersey de manga corta en burgundy con franjas rojo, naranja y blanco al frente, y hombros en malla blanca.",
    specs: [
      ["Manga", "Corta"],
      ["Gráfica", "Franjas al frente"],
    ],
  },
  {
    id: "gorra-verde",
    name: "NBD Snapback",
    category: "Accesorios",
    price: 23500,
    order: 8,
    imgs: ["/img/p-nbd-snapback-1.jpg", "/img/p-nbd-snapback-2.jpg", "/img/p-nbd-snapback-3.jpg", "/img/p-nbd-snapback-4.jpg"],
    alt: "Gorra NBD Snapback negra de Perezoso con bordado Die Trying",
    sizes: ["Única"],
    tag: "",
    desc: "Snapback negra con detalles bordados y DTF.",
    specs: [
      ["Cierre", "Snapback"],
      ["Visera", "Plana · interior verde"],
      ["Talla", "Única ajustable"],
    ],
  },
  {
    id: "pack-sesion",
    name: "NBD Green Short Sleeve",
    category: "Short Sleeve",
    price: 22000,
    order: 9,
    imgs: ["/img/p-nbd-green-1.jpg"],
    alt: "Niño con el jersey NBD Green Short Sleeve de Perezoso",
    sizes: JERSEY_SIZES,
    tag: "",
    desc: "Jersey de manga corta en negro y verde, de la línea No Bad Days.",
    specs: [["Manga", "Corta"]],
  },
  {
    id: "kit-dos-camisetas",
    name: "NBD Rainbow Short Sleeve",
    category: "Short Sleeve",
    price: 22000,
    order: 10,
    imgs: ["/img/p-nbd-rainbow-ss-1.jpg", "/img/p-nbd-rainbow-ss-2.jpg"],
    alt: "Rider con el jersey NBD Rainbow Short Sleeve de Perezoso",
    sizes: JERSEY_SIZES,
    tag: "",
    desc: "Jersey de manga corta con degradado de azul a fucsia y la gráfica del logo con esqueletos en la espalda.",
    specs: [
      ["Manga", "Corta"],
      ["Gráfica", "Logo con esqueletos en la espalda"],
    ],
  },
];

export function marketCategories(): string[] {
  return CAT_ORDER.filter((c) => MARKET_CATALOG.some((p) => p.category === c));
}

export function normText(s: string): string {
  return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function slugText(s: string): string {
  return normText(s).replace(/[\s_]+/g, "-");
}

export function sizeLabel(p: MarketProduct): string {
  return p.sizes.includes(KID_SIZE) ? "XS–2XL · Niño 3–11 años" : p.sizes.join(" ");
}
