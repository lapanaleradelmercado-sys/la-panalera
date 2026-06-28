# La Pañalera — Progreso del proyecto

Catálogo web para tienda de artículos de bebé (Mendoza). Mobile-first, contacto por WhatsApp.

## Estructura de archivos
```
sitio/
├── index.html          ← única página (la home)
├── css/styles.css      ← TODO el diseño. Variables de color en :root (arriba del todo)
├── js/main.js          ← datos editables (WhatsApp, categorías, productos) + lógica
├── assets/logo.jpeg    ← logo original del cliente (respaldo)
└── docs/
    ├── PROGRESO.md      ← este archivo
    ├── ref-mobile.jpeg  ← mockup de referencia (mobile)
    └── ref-desktop.jpeg ← mockup de referencia (desktop)
```

## Cómo editar lo más común

**Cambiar el número de WhatsApp:**
`js/main.js` → arriba de todo → `const WHATSAPP = "5492612512059";`
(código país + área + número, sin "+", sin espacios ni guiones).

**Agregar / cambiar un producto:**
`js/main.js` → lista `PRODUCTS`. Cada producto es:
`{ name: "Nombre", cat: "Categoría", price: 12990, tag: "Oferta" }`
(`tag` es opcional). El precio se formatea solo a "$12.990".

**Cambiar colores:**
`css/styles.css` → bloque `:root` (acento coral = `--accent`, azul marca = `--brand`).

## Estado actual (2026-06-27)
- [x] Home completa replicando los mockups, mobile + desktop.
- [x] Header responsive (hamburguesa+buscador en mobile / nav completa en desktop).
- [x] **Logo real** del cliente (PNG con fondo transparente).
- [x] Hero con ilustración SVG temporal (canasta + osito).
- [x] Categorías (6), productos de muestra (precios ficticios), confianza, footer.
- [x] **Número de WhatsApp real** conectado.
- [x] **Carrito funcional**: agregar, +/−, eliminar, total, guardado en localStorage,
      checkout que arma el pedido y lo manda por WhatsApp. Badges + toast.
- [x] Bottom-nav mobile + WhatsApp flotante.
- [x] Verificado en navegador a 390px y 1440px.
- [x] **Subido a GitHub** y publicado en GitHub Pages.

## Online
- Repo: https://github.com/lapanaleradelmercado-sys/la-panalera
- Sitio en vivo: https://lapanaleradelmercado-sys.github.io/la-panalera/

## Pendientes
- [ ] Cargar **catálogo real** de productos (con fotos y precios reales).

## Notas de diseño
- **Íconos de rubros:** imágenes reales del cliente en `assets/icons/` (recortadas de
  `iconos.jpeg` con PIL, fondo transparente). Mapa: panales, alimentacion, higiene, ropa,
  juguetes. **Accesorios** NO usa el cochecito: usa un **carrito de compra con el manubrio
  a la derecha** (SVG espejado, en `js/main.js` const `CART_RIGHT`).
- **Íconos sociales:** `assets/icons/whatsapp.png` e `instagram.png` se usan en el **footer**
  (sobre el navy lucen bien). En la barra superior se dejaron íconos de línea coral porque
  los de durazno se lavaban sobre el fondo durazno.
- **Hero:** foto real `assets/hero.jpeg` (desktop, full-bleed de fondo + scrim crema a la
  izquierda con el texto encima). En **mobile** la foto también va **detrás** (full-bleed)
  usando un recorte `assets/hero-mobile.jpeg` (recortado del lado derecho, sin cortar el
  osito). El chupete puede quedar un poco tapado por el texto (aceptado por el cliente).
- Instagram conectado (footer): https://www.instagram.com/lapanaleradelmercado
- Sin email en la página (a pedido del cliente).

## GitHub (token)
- El token se guarda FUERA del repo en `~/Desktop/La Pañalera/.gh_token` (no se versiona).
  El cliente pidió NO borrarlo: vamos a trabajar varios días.

## Decisiones
- HTML/CSS/JS vanilla, sin frameworks (fácil de mantener).
- Íconos SVG de línea, no emojis. Logo = imagen real del cliente (no SVG recreado).
- Datos de productos/categorías en arrays JS (placeholder hasta tener base de datos).
- Carrito client-side (sin backend): junta el pedido y se cierra por WhatsApp.
