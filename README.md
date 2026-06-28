# La Pañalera 🍼

Sitio **catálogo** de artículos para bebé (Mendoza, Argentina). El cliente navega
los productos y **finaliza la compra por WhatsApp**. Mobile-first, hecho con HTML +
CSS + JavaScript vanilla (sin frameworks, sin build).

## Estructura
```
.
├── index.html        # única página (home)
├── css/styles.css    # todo el diseño; variables de color en :root
├── js/main.js        # datos editables (WhatsApp, categorías, productos) + carrito
├── assets/           # logo
└── docs/             # progreso del proyecto y mockups de referencia
```

## Cómo editar lo más común
- **WhatsApp:** `js/main.js` → `const WHATSAPP = "..."` (cód. país + número, sin "+").
- **Productos:** `js/main.js` → lista `PRODUCTS`. Cada item: `{ name, cat, price, tag }`.
- **Colores:** `css/styles.css` → bloque `:root`.

## Carrito
El carrito funciona del lado del cliente (guardado en `localStorage`) y arma un pedido
que se envía por WhatsApp al tocar "Finalizar pedido".

## Verlo localmente
Abrí `index.html` con doble clic, o serví la carpeta:
```bash
python3 -m http.server 8000
```

## Deploy (GitHub Pages)
Settings → Pages → Branch: `main` → carpeta `/ (root)` → Save.
