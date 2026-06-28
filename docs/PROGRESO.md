# La Pañalera — Progreso del proyecto

Catálogo web para tienda de artículos de bebé (Mendoza). Mobile-first, contacto por WhatsApp.

## Estructura de archivos
```
sitio/
├── index.html          ← home (hero + categorías + confianza)
├── productos.html      ← catálogo (todos / filtrado por rubro con ?rubro=)
├── css/styles.css      ← TODO el diseño. Variables de color en :root (arriba del todo)
├── js/main.js          ← config + carga de planilla + carrito + render
├── assets/             ← logo, hero, íconos de rubros (icons/)
└── docs/               ← PROGRESO.md + mockups de referencia
```

## Cómo editar lo más común

**Cambiar el número de WhatsApp:** `js/main.js` → `const WHATSAPP = "5492612512059";`

**Agregar / cambiar productos:** se editan en la **planilla de Google** (NO en el código).
Hoja PRODUCTOS, columnas A-ID, B-NOMBRE, C-RUBRO, D-PRECIO. El sitio la lee sola.
El RUBRO tiene que ser uno de: PAÑALES, ALIMENTACION, ACCESORIOS, HIGIENE, ROPA, JUGUETES
(no importan mayúsculas ni acentos). La URL de la planilla está en `js/main.js` (`SHEET_CSV`).

**Cambiar colores:** `css/styles.css` → bloque `:root` (acento coral = `--accent`).

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

## Estado actual (2026-06-28)
- [x] Productos en **página aparte** (`productos.html`). "Ver productos" abre todos;
      tocar una categoría abre solo ese rubro (`productos.html?rubro=panales`).
- [x] Productos cargados desde la **planilla de Google** (hoja PRODUCTOS) en vivo.
- [x] Filtro por rubro con chips arriba de la grilla.
- [x] Barra inferior: Favoritos→**WhatsApp**, Mi cuenta→**Instagram**.

## Pendientes
- [ ] Agregar **columna de imagen** a la planilla y mostrar la foto del producto
      (hoy se ve un ícono placeholder porque la planilla no trae foto).
- [ ] Más productos reales en la planilla.

## Notas de diseño
- **Íconos de rubros:** imágenes reales del cliente en `assets/icons/` (recortadas de
  `iconos.jpeg` con PIL, fondo transparente). Los 6 usan los íconos de la imagen del
  cliente, incluido **Accesorios = cochecito** (`cochecito.png`, tal cual su imagen).
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
- Logo e íconos de rubros = imágenes reales del cliente.
- **Productos desde Google Sheets publicada como CSV** (CMS sin backend). El sitio
  hace `fetch` del CSV y arma las cards; agregar productos = editar la planilla.
- Carrito client-side (localStorage): junta el pedido y se cierra por WhatsApp.
- Sitio multi-página: `index.html` (home) + `productos.html` (catálogo con ?rubro=).
