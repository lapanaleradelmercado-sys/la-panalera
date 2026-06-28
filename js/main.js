/* =========================================================
   LA PAÑALERA — Lógica del sitio
   Config editable arriba. Los productos se cargan desde la
   planilla de Google (hoja PRODUCTOS: ID, NOMBRE, RUBRO, PRECIO).
   ========================================================= */

/* --------- CONFIGURACIÓN ---------- */
// WhatsApp: código país + número, sin "+", sin espacios.
const WHATSAPP = "5492612512059";

// Instagram
const INSTAGRAM = "https://www.instagram.com/lapanaleradelmercado";

// Planilla de productos (Google Sheet publicada como CSV)
const SHEET_CSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAL5Y6DSQSj4pkLiUHlOWjr4lhX_ZgSaWo_L7S_wPUQ3rn55R-1EwCs35n_dkj2ZCBBTTfeVA35cjB/pub?output=csv";

/* --------- ÍCONOS DE RUBROS (imágenes reales del cliente) ---------- */
const catImg = (file) => `<img class="cat__img" src="assets/icons/${file}.png" alt="" />`;
const ICONS = {
  panales:      catImg("panales"),
  alimentacion: catImg("alimentacion"),
  accesorios:   catImg("cochecito"),
  higiene:      catImg("higiene"),
  ropa:         catImg("ropa"),
  juguetes:     catImg("juguetes"),
};

/* --------- CATEGORÍAS ---------- */
const CATEGORIES = [
  { id: "panales",      name: "Pañales" },
  { id: "alimentacion", name: "Alimentación" },
  { id: "accesorios",   name: "Accesorios" },
  { id: "higiene",      name: "Higiene" },
  { id: "ropa",         name: "Ropa" },
  { id: "juguetes",     name: "Juguetes" },
];

/* --------- PRODUCTOS (se llenan desde la planilla) ---------- */
let PRODUCTS = [];

/* --------- ÍCONOS varios ---------- */
const PLACEHOLDER_ICON = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="10" width="36" height="28" rx="4"/><circle cx="17" cy="20" r="3"/><path d="M6 32l9-8 7 6 8-9 12 11"/></svg>';
const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9-9a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c-1 4-7 9-7 9z"/></svg>';
const CART_ADD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M13 8v5M10.5 10.5h5" opacity=".9"/></svg>';
const TRASH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/></svg>';

/* --------- HELPERS ---------- */
const $ = (sel) => document.querySelector(sel);
const formatPrice = (n) => "$" + Number(n).toLocaleString("es-AR");
const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
// normaliza para comparar rubros (minúsculas, sin acentos): "PAÑALES" -> "panales"
const norm = (s) =>
  (s || "").toString().trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const catName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || id;
// "PAÑALES PAMPERS" -> "Pañales Pampers" (minúscula con inicial de cada palabra en mayúscula)
const titleCase = (s) =>
  (s || "").toString().toLowerCase().replace(/(^|\s)([a-záéíóúñü])/gi,
    (_, sep, ch) => sep + ch.toUpperCase());

/* =========================================================
   CARGA DE PRODUCTOS DESDE LA PLANILLA
   ========================================================= */
function parseCSV(text) {
  const rows = [];
  let field = "", row = [], inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
      else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c !== "\r") field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

async function loadProducts() {
  try {
    const res = await fetch(SHEET_CSV);
    const text = await res.text();
    const rows = parseCSV(text).filter((r) => r.some((c) => c.trim() !== ""));
    rows.shift(); // saca la fila de encabezados
    PRODUCTS = rows
      .map((r) => {
        const cat = norm(r[2]);
        return {
          id: (r[0] || "").trim(),
          name: titleCase((r[1] || "").trim()),
          cat,
          catName: catName(cat),
          price: Number(String(r[3] || "").replace(/[^\d]/g, "")) || 0,
        };
      })
      .filter((p) => p.name);
    return PRODUCTS;
  } catch (e) {
    console.error("No se pudo cargar la planilla:", e);
    PRODUCTS = [];
    return [];
  }
}

/* =========================================================
   RENDER: categorías (grilla del home + footer)
   ========================================================= */
function renderCategories() {
  const grid = $("#catsGrid");
  if (grid) {
    grid.innerHTML = CATEGORIES.map(
      (c) => `
      <a href="productos.html?rubro=${c.id}" class="cat">
        <span class="cat__ico">${ICONS[c.id]}</span>
        <span class="cat__body">
          <span class="cat__name">${c.name}</span>
          <span class="cat__link">Ver todo
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </span>
      </a>`
    ).join("");
  }

  const fc = $("#footerCats");
  if (fc) {
    fc.innerHTML = CATEGORIES.map(
      (c) => `<li><a href="productos.html?rubro=${c.id}">${c.name}</a></li>`
    ).join("");
  }
}

/* =========================================================
   RENDER: productos (página productos.html)
   ========================================================= */
// control de carrito dentro de la card: "Agregar" o (− cantidad +) + subtotal + tacho
function cardControl(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return "";
  const q = Cart.qtyOf(id);
  if (q <= 0) return `<button class="card__cta" data-add="${id}">${CART_ADD} Agregar</button>`;
  return `
    <div class="card__cartrow">
      <div class="stepper">
        <button data-dec="${id}" aria-label="Quitar uno">−</button>
        <span>${q}</span>
        <button data-inc="${id}" aria-label="Agregar uno">+</button>
      </div>
      <button class="card__del" data-del="${id}" aria-label="Eliminar del carrito">${TRASH}</button>
    </div>
    <div class="card__subtotal">Subtotal: <strong>${formatPrice(q * p.price)}</strong></div>`;
}

function productCard(p) {
  return `
    <article class="card" data-id="${p.id}">
      <div class="card__media">
        <button class="card__fav" aria-label="Agregar a favoritos">${HEART}</button>
        ${PLACEHOLDER_ICON}
      </div>
      <div class="card__body">
        <span class="card__cat">${p.catName}</span>
        <h3 class="card__name">${p.name}</h3>
        <span class="card__price">${formatPrice(p.price)}</span>
        <div class="card__control">${cardControl(p.id)}</div>
      </div>
    </article>`;
}

// actualiza el control de cada card visible según el estado del carrito
function syncCards() {
  document.querySelectorAll(".card[data-id]").forEach((card) => {
    const ctrl = card.querySelector(".card__control");
    if (ctrl) ctrl.innerHTML = cardControl(card.dataset.id);
  });
}

let currentRubro = null;

function renderProducts(filterCat, query) {
  const grid = $("#productsGrid");
  if (!grid) return;
  let list = filterCat ? PRODUCTS.filter((p) => p.cat === filterCat) : PRODUCTS;
  const q = norm(query);
  if (q) list = list.filter((p) => norm(p.name).includes(q));

  const sub = $("#productsSub");
  if (sub) sub.textContent = list.length === 1 ? "1 producto" : `${list.length} productos`;

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty-msg">No se encontraron productos.<br>Probá con otro nombre o escribinos por WhatsApp 😊</p>`;
    return;
  }
  grid.innerHTML = list.map(productCard).join("");
}

function setupProductsPage(activeCat) {
  currentRubro = activeCat || null;
  const title = $("#productsTitle");
  if (title) title.textContent = activeCat ? catName(activeCat) : "Todos los productos";

  const search = $("#productSearch");
  if (search) {
    search.addEventListener("input", () => renderProducts(currentRubro, search.value));
  }
}

/* =========================================================
   RENDER: franja de confianza
   ========================================================= */
const TRUST = [
  { ico: '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z"/><path d="m9 12 2 2 4-4"/></svg>', txt: "Productos confiables" },
  { ico: '<svg viewBox="0 0 24 24"><path d="M3 7h11v8H3z"/><path d="M14 10h4l3 3v2h-7z"/><circle cx="7" cy="17" r="1.6"/><circle cx="17.5" cy="17" r="1.6"/></svg>', txt: "Envíos a todo el país" },
  { ico: '<svg viewBox="0 0 24 24"><path d="M5 18v-6a7 7 0 0 1 14 0v6"/><rect x="3" y="15" width="4" height="6" rx="1.5"/><rect x="17" y="15" width="4" height="6" rx="1.5"/></svg>', txt: "Atención personalizada" },
  { ico: '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>', txt: "Compra 100% segura" },
];
function renderTrust() {
  const row = $("#trustRow");
  if (row)
    row.innerHTML = TRUST.map(
      (t) => `<li class="trust__item"><span class="trust__ico">${t.ico}</span><span class="trust__txt">${t.txt}</span></li>`
    ).join("");
}

/* --------- MENÚ MOBILE (drawer) ---------- */
function setupDrawer() {
  const drawer = $("#drawer");
  if (!drawer) return;
  const open = () => { drawer.hidden = false; document.body.style.overflow = "hidden"; };
  const close = () => { drawer.hidden = true; document.body.style.overflow = ""; };
  $("#drawerNav").innerHTML = $("#nav").innerHTML;
  $("#menuBtn").addEventListener("click", open);
  $("#drawerClose").addEventListener("click", close);
  $("#drawerBackdrop").addEventListener("click", close);
  $("#drawerNav").addEventListener("click", (e) => { if (e.target.closest("a")) close(); });
}

/* --------- LINKS DE WHATSAPP / INSTAGRAM fijos ---------- */
function setupLinks() {
  const general = waLink("¡Hola La Pañalera! Quería hacerles una consulta 😊");
  ["#waFloat", "#footerWa", "#topbarWa", "#footerWaIcon", "#navWa"].forEach((sel) => {
    const el = $(sel);
    if (el) el.href = general;
  });
  ["#navIg", "#footerIg", "#footerIgIcon", "#topbarIg"].forEach((sel) => {
    const el = $(sel);
    if (el) el.href = INSTAGRAM;
  });
}

/* --------- AVISO FLOTANTE (toast) ---------- */
let toastTimer;
function showToast(text) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = text;
  el.hidden = false;
  el.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove("is-on");
    setTimeout(() => (el.hidden = true), 250);
  }, 1900);
}

/* =========================================================
   CARRITO — guarda en localStorage. Ítem: { id, name, cat, price, qty }
   ========================================================= */
const Cart = {
  KEY: "lp_cart",
  items: [],

  load() {
    try { this.items = JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch { this.items = []; }
  },
  save() { localStorage.setItem(this.KEY, JSON.stringify(this.items)); },

  add(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    const found = this.items.find((it) => it.id === id);
    if (found) found.qty++;
    else this.items.push({ id: p.id, name: p.name, cat: p.catName, price: p.price, qty: 1 });
    this.save();
    this.render();
    this.pulse();
    showToast(`"${p.name}" agregado al carrito`);
  },
  setQty(id, qty) {
    const it = this.items.find((x) => x.id === id);
    if (!it) return;
    it.qty = qty;
    if (it.qty <= 0) this.items = this.items.filter((x) => x.id !== id);
    this.save();
    this.render();
  },
  clear() { this.items = []; this.save(); this.render(); },

  count() { return this.items.reduce((s, it) => s + it.qty, 0); },
  total() { return this.items.reduce((s, it) => s + it.price * it.qty, 0); },
  qtyOf(id) { const it = this.items.find((x) => x.id === id); return it ? it.qty : 0; },

  pulse() {
    const b = $("#cartBtn");
    if (!b) return;
    b.classList.remove("pulse");
    void b.offsetWidth;
    b.classList.add("pulse");
  },

  render() {
    const n = this.count();
    ["#cartCount", "#cartCountNav"].forEach((sel) => {
      const el = $(sel);
      if (!el) return;
      el.textContent = n;
      el.hidden = n === 0;
    });

    const body = $("#cartBody");
    const foot = $("#cartFoot");
    if (!body) return;
    if (this.items.length === 0) {
      body.innerHTML = `
        <div class="cart__empty">
          <span class="cart__empty-ico">${CART_ADD}</span>
          <p>Tu carrito está vacío.</p>
          <span>Sumá productos y los consultás todos juntos por WhatsApp.</span>
        </div>`;
      if (foot) foot.style.display = "none";
    } else {
      if (foot) foot.style.display = "";
      body.innerHTML = this.items.map((it) => `
        <div class="cart-item">
          <div class="cart-item__info">
            <span class="cart-item__cat">${it.cat}</span>
            <span class="cart-item__name">${it.name}</span>
            <span class="cart-item__price">${formatPrice(it.price)}</span>
          </div>
          <div class="cart-item__right">
            <div class="stepper">
              <button data-dec="${it.id}" aria-label="Quitar uno">−</button>
              <span>${it.qty}</span>
              <button data-inc="${it.id}" aria-label="Agregar uno">+</button>
            </div>
            <button class="cart-item__del" data-del="${it.id}" aria-label="Eliminar">${TRASH}</button>
          </div>
        </div>`
      ).join("");
      $("#cartTotal").textContent = formatPrice(this.total());
      $("#cartCheckout").href = this.waMessage();
    }
    syncCards();
  },

  waMessage() {
    let txt = "¡Hola La Pañalera! Quiero hacer este pedido:\n\n";
    this.items.forEach((it) => {
      txt += `• ${it.qty}x ${it.name} — ${formatPrice(it.price * it.qty)}\n`;
    });
    txt += `\nTotal: ${formatPrice(this.total())}\n\n¿Me confirman disponibilidad y cómo seguimos? 😊`;
    return waLink(txt);
  },

  open() { $("#cart").hidden = false; document.body.style.overflow = "hidden"; },
  close() { $("#cart").hidden = true; document.body.style.overflow = ""; },

  init() {
    this.load();
    this.render();
    const on = (sel, ev, fn) => { const el = $(sel); if (el) el.addEventListener(ev, fn); };
    on("#cartBtn", "click", () => this.open());
    on("#cartBtnNav", "click", (e) => { e.preventDefault(); this.open(); });
    on("#cartClose", "click", () => this.close());
    on("#cartBackdrop", "click", () => this.close());
    on("#cartClear", "click", () => this.clear());
    on("#cartBody", "click", (e) => {
      const inc = e.target.closest("[data-inc]");
      const dec = e.target.closest("[data-dec]");
      const del = e.target.closest("[data-del]");
      if (inc) this.setQty(inc.dataset.inc, this.qtyOf(inc.dataset.inc) + 1);
      if (dec) this.setQty(dec.dataset.dec, this.qtyOf(dec.dataset.dec) - 1);
      if (del) this.setQty(del.dataset.del, 0);
    });
  },
};

/* --------- BOTÓN LUPA del header ---------- */
function setupSearchButton() {
  const btn = $("#searchBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const inp = $("#productSearch");
    if (inp) { inp.focus(); inp.scrollIntoView({ behavior: "smooth", block: "center" }); }
    else location.href = "productos.html";
  });
}

/* --------- INIT ---------- */
document.addEventListener("DOMContentLoaded", async () => {
  renderCategories();
  renderTrust();
  setupDrawer();
  setupLinks();
  setupSearchButton();
  Cart.init();
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();

  // Página de productos
  const grid = $("#productsGrid");
  if (grid) {
    grid.innerHTML = `<p class="empty-msg">Cargando productos…</p>`;
    const rubro = norm(new URLSearchParams(location.search).get("rubro") || "");
    setupProductsPage(rubro || null);
    await loadProducts();
    renderProducts(currentRubro, "");

    // clicks en las cards: agregar / +/− / eliminar (delegación)
    grid.addEventListener("click", (e) => {
      const add = e.target.closest("[data-add]");
      const inc = e.target.closest("[data-inc]");
      const dec = e.target.closest("[data-dec]");
      const del = e.target.closest("[data-del]");
      if (add) Cart.add(add.dataset.add);
      else if (inc) Cart.setQty(inc.dataset.inc, Cart.qtyOf(inc.dataset.inc) + 1);
      else if (dec) Cart.setQty(dec.dataset.dec, Cart.qtyOf(dec.dataset.dec) - 1);
      else if (del) Cart.setQty(del.dataset.del, 0);
    });
  }
});
