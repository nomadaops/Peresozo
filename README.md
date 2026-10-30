# Peresozo

Sitio web de **Perezoso** — marca deportiva costarricense (bikewear + streetwear).

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4.

## Rutas

| Ruta | Descripción |
| --- | --- |
| `/` | Home |
| `/nosotros` | Historia de la marca |
| `/marketplace` | Catálogo, detalle de producto y carrito |
| `/galeria` | Galería por historias |
| `/contacto` | Contacto y formulario de pedido |
| `/inscripciones` | Eventos y cotización para empresas |
| `/admin` | Panel administrativo (inventario, clientes, pedidos) |

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

> Pedidos, carrito y solicitudes se guardan por ahora en `localStorage` del navegador
> (`pz_cart_v1`, `pz_manual_orders`, `pz_eventos_privados`). El login del admin es un mockup.
