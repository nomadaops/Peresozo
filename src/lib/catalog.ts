import type { GalleryItem, InventoryItem } from "./types";

export const WA_NUMBER = "50683127667";

export const GALLERY: GalleryItem[] = [
  { img: "/img/hero-v5.jpg", alt: "Rider de MTB saltando en la selva", caption: "Enduro · selva" },
  { img: "/img/rail-bmx.jpg", alt: "Rider de BMX bajando una baranda en San Jose", caption: "BMX · San Jose" },
  { img: "/img/river-reflection.jpg", alt: "Rider reflejado en el río", caption: "Río · reflejo" },
  { img: "/img/detail-logo.jpg", alt: "Detalle del logotipo bordado", caption: "Detalle · bordado" },
  { img: "/img/jump-canopy.jpg", alt: "Salto entre el dosel de la selva", caption: "Dosel · salto" },
  { img: "/img/cap-trio.jpg", alt: "Gorras Perezoso", caption: "Gorras" },
];

export const VALUES = [
  {
    k: "estilo",
    n: "Estilo",
    sub: "Detalles que hacen la diferencia",
    body: "Prendas versátiles con un estilo único, dentro y fuera de la bici.",
    accent: "#FCF2D9",
  },
  {
    k: "comodidad",
    n: "Comodidad",
    sub: "Hecho para el trópico",
    body: "Materiales agradables al movimiento, para el clima tropical y cualquier ocasión.",
    accent: "#FCF2D9",
  },
  {
    k: "estilo-de-vida",
    n: "Dentro y fuera del deporte",
    sub: "Más allá del bikelife",
    body: "Del trail a la oficina, de la calle al fin de semana. Prendas pensadas para cualquier estilo de vida, no solo para la bici.",
    accent: "#FCF2D9",
  },
  {
    k: "determinacion",
    n: "Determinación",
    sub: "El límite es un reto, no un final",
    body: "Intentamos lo imposible todas las veces necesarias. Enfrentamos el camino difícil.",
    accent: "#F06A1D",
  },
] as const;

export const FAQ_CATS = ["Todas", "Pedidos", "Pagos", "Prendas", "Contacto"] as const;

export type FaqItem = {
  cat: Exclude<(typeof FAQ_CATS)[number], "Todas">;
  q: string;
  a: string;
  facts?: { v: string; k: string }[];
};

export const FAQ: FaqItem[] = [
  {
    cat: "Pedidos",
    q: "¿Cómo hago un pedido?",
    a: "Agregá tus prendas al carrito y elegí entre finalizar por WhatsApp o completar el formulario de pedido con tu nombre, dirección y teléfono. Te contactamos para coordinar el pago y la entrega.",
  },
  {
    cat: "Pedidos",
    q: "¿Los jerseys están en stock?",
    a: "Los jerseys Dry-Fit se producen bajo pedido. Para confirmarlo se paga la mitad por adelantado y la otra mitad al momento de la entrega.",
    facts: [
      { v: "50%", k: "Para confirmar" },
      { v: "50%", k: "Contra entrega" },
    ],
  },
  {
    cat: "Pagos",
    q: "¿Puedo apartar un producto?",
    a: "Sí. Con el sistema de apartado pagás una parte y tenés tiempo para retirar y cancelar el resto. Aplica solo para productos en stock.",
    facts: [
      { v: "15%", k: "Para apartar" },
      { v: "45 días", k: "Para retirar" },
    ],
  },
  {
    cat: "Prendas",
    q: "¿Qué ediciones de jersey hay?",
    a: "El Jersey Dry-Fit viene en cuatro ediciones: Rainbow, Black/Gold, Burgundy y Green. Cada una en manga corta o manga larga.",
    facts: [
      { v: "₡22.000", k: "Manga corta" },
      { v: "₡25.000", k: "Manga larga" },
    ],
  },
  {
    cat: "Prendas",
    q: "¿Qué tallas manejan?",
    a: "S, M, L, XL y XXL. Si necesitás otra talla, indicalo en el formulario de contacto o escribinos y lo revisamos.",
  },
  {
    cat: "Prendas",
    q: "¿Puedo pedir otra combinación?",
    a: "Sí. En el formulario de contacto hay un espacio para contarnos qué jersey, color o combinación tenés en mente.",
  },
  {
    cat: "Contacto",
    q: "¿Dónde están ubicados?",
    a: "Somos una marca 100% costarricense, con base en San Rafael de Heredia.",
  },
  {
    cat: "Contacto",
    q: "¿Cómo los contacto?",
    a: "Por WhatsApp al +506 8312-7667, por correo a theperezosocompanycr@gmail.com o en Instagram como @perezoso.506. Respondemos en menos de 24 horas.",
  },
];

export const REVIEWS = [
  { name: "Ney Badilla", product: "NBD Rainbow Long Sleeve", when: "Hace 1 semana", rating: 5, text: "El jersey aguanta lluvia, barro y sol en la misma rodada. Se seca rapidísimo y el corte queda muy bien." },
  { name: "Jose Solano", product: "NBD Snapback", when: "Hace 2 semanas", rating: 5, text: "El bordado está demasiado bien hecho. La uso todos los días, en la bici y fuera de ella." },
  { name: "Anthony Calderon", product: "NBD Green Short Sleeve", when: "Hace 3 semanas", rating: 5, text: "Lo pedí bajo pedido y me mantuvieron al tanto todo el tiempo por WhatsApp. Llegó tal cual lo esperaba." },
  { name: "Denis Garcia", product: "NBD Burgundy Short Sleeve", when: "Hace 1 mes", rating: 5, text: "Excelente calidad para el precio. Se nota que lo diseñan personas que de verdad ruedan." },
  { name: "Julián Fernández", product: "NBD Rainbow Short Sleeve", when: "Hace 1 mes", rating: 5, text: "La manga larga es perfecta para el trail en la mañana. Cómodo, liviano y con mucho estilo." },
  { name: "Victor Villalba", product: "Signature Tee White", when: "Hace 2 meses", rating: 5, text: "Buena tela y buen corte. Me gusta que sea una marca tica con identidad propia." },
  { name: "Bernardo Solano", product: "NBD Black/Gold Long Sleeve", when: "Hace 2 meses", rating: 5, text: "Aparté con el 15% y lo retiré con calma. Muy buena atención de principio a fin." },
  { name: "Fernando Anchía", product: "NBD Green Short Sleeve", when: "Hace 3 meses", rating: 5, text: "Ya es mi segundo jersey. Resiste las caídas y los lavados sin perder color." },
];

export const INVENTORY: InventoryItem[] = [
  { name: "Sleeveless", category: "Jerseys", price: 24500, stock: 9, img: "/img/p-sleeveless-1.jpg" },
  { name: "NBD Black/Gold Long Sleeve", category: "Jerseys", price: 25000, stock: 4, img: "/img/p-nbd-blackgold-1.jpg" },
  { name: "NBD Burgundy Short Sleeve", category: "Jerseys", price: 22000, stock: 22, img: "/img/p-nbd-burgundy-ss-1.jpg" },
  { name: "NBD Black/Gold Short Sleeve", category: "Jerseys", price: 22000, stock: 0, img: "/img/p-nbd-blackgold-ss-1.jpg" },
  { name: "NBD Green Short Sleeve", category: "Jerseys", price: 22000, stock: 6, img: "/img/p-pack-1.jpg" },
];

export function money(n: number): string {
  return "₡" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
