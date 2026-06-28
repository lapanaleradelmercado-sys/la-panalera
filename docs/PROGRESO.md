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
- Hoja **PRODUCTOS** (gid 0): A-ID, B-NOMBRE, C-RUBRO, D-PRECIO.
- Hoja **info** (gid 247689217): A-ID, B-NOMBRE, C-IMAGEN (link de la foto).
El RUBRO tiene que ser uno de: PAÑALES, ALIMENTACION, ACCESORIOS, HIGIENE, ROPA, JUGUETES
(no importan mayúsculas ni acentos). Las dos hojas se unen por **ID**. URLs en `js/main.js`.

**Fotos (IMPORTANTE):** la columna IMAGEN puede ser un link de Google Drive
(`.../file/d/ID/view`). El sitio lo convierte solo a imagen directa, PERO el archivo de
Drive tiene que estar compartido como **"Cualquiera con el enlace"**, si no Google no la
muestra (pide login). Si una foto falla, la card muestra un ícono placeholder.

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
- [x] Productos en **página aparte** (`productos.html`) desde la **planilla de Google**.
      "Ver productos" abre todos; categoría abre `productos.html?rubro=panales`.
- [x] Barra inferior: Favoritos→**WhatsApp**, Mi cuenta→**Instagram**.
- [x] Buscador: el de arriba quedó como **botón lupa** (mobile reemplaza al carrito, que
      está en la barra inferior). En `productos.html` hay una **barra de búsqueda grande**
      que filtra por nombre en vivo. (Antes el buscador era decorativo y no andaba.)
- [x] Se sacaron los **chips de categorías** de productos.html (se navega por el menú/URL).
- [x] Se sacó el **botón verde flotante** de WhatsApp (ya está en la barra inferior).
- [x] Nombres de productos en **Title Case** (`titleCase` en main.js).
- [x] Cards con **contador +/−, subtotal y tacho** (controlan el carrito desde la card;
      sincroniza con el panel del carrito en ambos sentidos).
- [x] Fotos de productos desde la hoja **info** (link de Drive → imagen). Falta hacer
      públicos los archivos en Drive para que se vean.

## Ajustes 2026-06-28 (noche 6)
- [x] Hero mobile: la canasta se muestra **ENTERA** (`object-fit: contain`, sin recortar
      ningún objeto), a la derecha del texto, sin quedar debajo. Fundido crema MUY sutil
      a la izquierda (scrim) en la transición hacia el texto.
- [x] Sacado el **resaltado azul al tocar** botones/links en mobile
      (`-webkit-tap-highlight-color: transparent`).

## Ajustes 2026-06-28 (noche 5)
- [x] Hero mobile: la canasta más **alta y a la derecha** (la foto llena la columna con
      `object-fit: cover`, col 52%). Su borde izquierdo toca el texto pero no se mete debajo.
- [x] Badge "TODO LO QUE TU BEBÉ NECESITA" en **un solo renglón** (`white-space: nowrap`).
- [x] **Rayitas de categorías corregidas**: verticales CORTAS y centradas (pseudo-elemento,
      NO tocan la horizontal), línea horizontal entre filas aparte. Igual que el mockup.
      Las de la franja de confianza también más cortitas/sutiles.

## Ajustes 2026-06-28 (noche 4)
- [x] **Logo sticker**: `assets/logo-sticker.png` (borde blanco die-cut, generado con PIL)
      + `filter: drop-shadow` para efecto relieve. Se usa en header y footer (el favicon
      sigue con `logo.png`).
- [x] **Hero mobile** en 2 columnas: texto a la izquierda y la **canasta más chica a la
      derecha** (recorte `assets/hero-basket.jpeg`, `object-fit: contain`). Desktop sigue
      con `hero.jpeg` full-bleed.
- [x] Badge y botón del hero **más chicos** (menos espacio vacío); bajada del hero más oscura.
- [x] **Rayitas** con **bordes explícitos** (antes era el truco del gap de 1px que se veía
      borroso/no conectaba en el celu). Ahora conectan vertical+horizontal. Color `--divider`.

## Ajustes 2026-06-28 (noche 3)
- [x] Hero como el mockup: **compacto**, canasta **a la derecha** del texto (no abajo).
      Mobile y desktop usan `hero.jpeg` (la ancha) con `cover`; en mobile `object-position`
      a la derecha (95%) y texto a la izquierda con scrim crema. `hero-mobile.jpeg` ya no se usa.
- [x] **Rayitas rosas** (`--divider: #f3d2cb`) separando las **categorías** (grid con líneas,
      solo mobile; en desktop son cards sueltas) y los items de la **franja de confianza**
      (divisores verticales, mobile y desktop). Igual que el mockup.

## Ajustes 2026-06-28 (noche 2)
- [x] Botón "Ver productos" en **un solo renglón** (`white-space: nowrap`), menos alto.
- [x] **Sin blur** en el hero (se sacó el backdrop-filter).
- [x] **Imágenes del hero por dispositivo** (`<picture>`): desktop usa `hero.jpeg` (apaisada,
      ex "hero 1", `cover`, canasta a la derecha); mobile usa `hero-mobile.jpeg` (vertical,
      ex "hero 2", `object-fit: contain` con fondo `#fcf3ee` = crema de la foto). Así la
      canasta queda ENTERA y el texto va arriba, sin quedar debajo de las letras.
- [x] **Footer celeste pastel** (`--sky-pastel: #d6eef9`, texto navy) y los iconos de
      WhatsApp/Instagram movidos a la columna **Contacto** (antes estaban sueltos arriba).

## Ajustes 2026-06-28 (noche)
- [x] Fotos de productos **funcionando** (cliente hizo públicos los archivos de Drive).
- [x] **Iconos del cliente** (iconos 1 y 2, gris/coral) en `assets/icons/`: barra inferior
      (home/cats/wa/ig/cart), barra de anuncios (truck/card), franja de confianza
      (escudo/truck/soporte/card) y sociales del header. Botón "Finalizar por WhatsApp"
      del carrito usa `wa-white.png`.
- [x] Botón "Ver productos" más bajo y menos alto (pegado abajo del hero).
- [x] Imagen del hero mobile más abierta (se ven los productos en la canasta) + **blur**
      detrás del texto (backdrop-filter en `.hero__scrim`) para que se lea bien.

## Ajustes 2026-06-28 (tarde)
- [x] Saqué el **corazón** de las cards y el **cartel "agregado"** al sumar al carrito.
- [x] **Lightbox**: tocás la foto de un producto y se ve grande; tocás de nuevo (o Esc) y cierra.
- [x] **Logo más grande** (se leen mejor las letras) sin agrandar el header (márgenes negativos).
- [x] **"Ofertas"** se oculta si no hay productos en oferta. Para marcar ofertas: agregar
      una columna **OFERTA** en la hoja *info* (poné `si`/`x`/`1` en los que estén en oferta).
      El código ya la lee (`isOferta` en main.js); aparece el menú "Ofertas" solo.
- [x] **Hero mobile más compacto** (texto/botón más chicos, menos alto) para que la imagen
      entre mejor atrás, igual que el mockup.

## Pendientes
- [ ] **Hacer públicos los archivos de fotos en Google Drive** ("Cualquiera con el enlace").
      El código de imágenes ya está listo; sin esto las fotos no cargan (Google pide login).
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
