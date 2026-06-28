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
`js/main.js` → arriba de todo → `const WHATSAPP = "5492610000000";`
(código país + área + número, sin "+", sin espacios ni guiones).

**Agregar / cambiar un producto:**
`js/main.js` → lista `PRODUCTS`. Cada producto es:
`{ name: "Nombre", cat: "Categoría", price: 12990, tag: "Oferta" }`
(`tag` es opcional). El precio se formatea solo a "$12.990".

**Cambiar colores:**
`css/styles.css` → bloque `:root` (acento coral = `--accent`, azul marca = `--brand`).

## Estado actual (2026-06-27)
- [x] Home completa replicando los mockips, mobile + desktop.
- [x] Header responsive (hamburguesa+buscador en mobile / nav completa en desktop).
- [x] Hero con ilustración SVG temporal (canasta + osito).
- [x] Categorías (6), productos de muestra (cards), franja de confianza, footer.
- [x] Bottom-nav mobile + WhatsApp flotante.
- [x] Verificado en navegador a 390px y 1440px.

## Pendientes
- [ ] Reemplazar el **número de WhatsApp** real.
- [ ] Reemplazar la **ilustración del hero** por la foto real (el cliente la pasa limpia).
- [ ] Cargar **catálogo real** de productos (con fotos).
- [ ] Links reales de Instagram y email en el footer.
- [ ] Subir a GitHub (desde el editor web).

## Decisiones
- HTML/CSS/JS vanilla, sin frameworks (fácil de mantener).
- Íconos SVG de línea, no emojis. Logo recreado en SVG para que quede nítido.
- Datos de productos/categorías en arrays JS (placeholder hasta tener base de datos).
