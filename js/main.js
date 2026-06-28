/* =========================================================
   LA PAÑALERA — Lógica del sitio
   Todo lo editable (WhatsApp, categorías, productos) está
   acá arriba. Para agregar un producto: sumás un objeto a
   la lista PRODUCTOS. Nada más.
   ========================================================= */

/* --------- CONFIGURACIÓN ---------- */
// Número con código de país, sin "+", sin espacios ni guiones.
const WHATSAPP = "5492612512059";

/* --------- ÍCONOS DE RUBROS (imágenes reales del cliente) ---------- */
const catImg = (file) => `<img class="cat__img" src="assets/icons/${file}.png" alt="" />`;
// Accesorios: carrito de compra con el manubrio a la derecha (espejado)
const CART_RIGHT =
  '<svg class="cat__svg" viewBox="0 0 48 48" aria-hidden="true">' +
    '<g transform="translate(48,0) scale(-1,1)">' +
      '<path d="M13 16 H40 L37 30 H17 Z" fill="#fdeae0" stroke="#e8856b" stroke-width="2.6" stroke-linejoin="round"/>' +
      '<path d="M13 16 L9 9 H5" fill="none" stroke="#e8856b" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="20" cy="36" r="3" fill="#fdeae0" stroke="#e8856b" stroke-width="2.6"/>' +
      '<circle cx="33" cy="36" r="3" fill="#fdeae0" stroke="#e8856b" stroke-width="2.6"/>' +
    '</g>' +
  '</svg>';
const ICONS = {
  panales:      catImg("panales"),
  alimentacion: catImg("alimentacion"),
  accesorios:   CART_RIGHT,
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

/* --------- PRODUCTOS (placeholders de muestra) ---------- */
const PRODUCTS = [
  { name: "Pañales Ultra Suaves Talle M", cat: "Pañales",      price: 12990, tag: "Nuevo" },
  { name: "Mamadera Anticólicos 240ml",   cat: "Alimentación", price: 8500 },
  { name: "Body Algodón Pima (pack x3)",  cat: "Ropa",         price: 15900, tag: "Oferta" },
  { name: "Set de Higiene para Bebé",     cat: "Higiene",      price: 9990 },
  { name: "Móvil Musical para Cuna",      cat: "Juguetes",     price: 18900 },
  { name: "Cochecito Liviano Plegable",   cat: "Accesorios",   price: 145000, tag: "Destacado" },
  { name: "Crema Protectora x200g",       cat: "Higiene",      price: 6200 },
  { name: "Osito de Peluche Suave",       cat: "Juguetes",     price: 11500 },
];

/* --------- ÍCONO genérico para card sin foto ---------- */
const PLACEHOLDER_ICON = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="10" width="36" height="28" rx="4"/><circle cx="17" cy="20" r="3"/><path d="M6 32l9-8 7 6 8-9 12 11"/></svg>';
const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9-9a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c-1 4-7 9-7 9z"/></svg>';
const CHAT = '<svg viewBox="0 0 24 24"><path d="M21 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4.5A8 8 0 1 1 21 11.5z"/></svg>';
const CART_ADD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M13 8v5M10.5 10.5h5" opacity=".9"/></svg>';

/* --------- HELPERS ---------- */
const $ = (sel) => document.querySelector(sel);
const formatPrice = (n) => "$" + n.toLocaleString("es-AR");
const waLink = (text) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

/* --------- RENDER: categorías ---------- */
function renderCategories() {
  const grid = $("#catsGrid");
  grid.innerHTML = CATEGORIES.map(
    (c) => `
    <a href="#cat-${c.id}" class="cat" id="cat-${c.id}">
      <span class="cat__ico">${ICONS[c.id]}</span>
      <span class="cat__body">
        <span class="cat__name">${c.name}</span>
        <span class="cat__link">Ver todo
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </span>
    </a>`
  ).join("");

  // footer
  $("#footerCats").innerHTML = CATEGORIES.map(
    (c) => `<li><a href="#cat-${c.id}">${c.name}</a></li>`
  ).join("");
}

/* --------- RENDER: productos ---------- */
function renderProducts() {
  const grid = $("#productsGrid");
  grid.innerHTML = PRODUCTS.map((p, i) => `
    <article class="card">
      <div class="card__media">
        ${p.tag ? `<span class="card__tag">${p.tag}</span>` : ""}
        <button class="card__fav" aria-label="Agregar a favoritos">${HEART}</button>
        ${PLACEHOLDER_ICON}
      </div>
      <div class="card__body">
        <span class="card__cat">${p.cat}</span>
        <h3 class="card__name">${p.name}</h3>
        <span class="card__price">${formatPrice(p.price)}</span>
        <button class="card__cta" data-add="${i}">
          ${CART_ADD} Agregar
        </button>
      </div>
    </article>`
  ).join("");

  // un solo listener para toda la grilla (delegación)
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (btn) Cart.add(Number(btn.dataset.add));
  });
}

/* --------- RENDER: franja de confianza ---------- */
const TRUST = [
  { ico: '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z"/><path d="m9 12 2 2 4-4"/></svg>', txt: "Productos confiables" },
  { ico: '<svg viewBox="0 0 24 24"><path d="M3 7h11v8H3z"/><path d="M14 10h4l3 3v2h-7z"/><circle cx="7" cy="17" r="1.6"/><circle cx="17.5" cy="17" r="1.6"/></svg>', txt: "Envíos a todo el país" },
  { ico: '<svg viewBox="0 0 24 24"><path d="M5 18v-6a7 7 0 0 1 14 0v6"/><rect x="3" y="15" width="4" height="6" rx="1.5"/><rect x="17" y="15" width="4" height="6" rx="1.5"/></svg>', txt: "Atención personalizada" },
  { ico: '<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>', txt: "Compra 100% segura" },
];
function renderTrust() {
  $("#trustRow").innerHTML = TRUST.map(
    (t) => `<li class="trust__item"><span class="trust__ico">${t.ico}</span><span class="trust__txt">${t.txt}</span></li>`
  ).join("");
}

/* --------- MENÚ MOBILE (drawer) ---------- */
function setupDrawer() {
  const drawer = $("#drawer");
  const open = () => { drawer.hidden = false; document.body.style.overflow = "hidden"; };
  const close = () => { drawer.hidden = true; document.body.style.overflow = ""; };

  // copia los links de la nav al drawer
  $("#drawerNav").innerHTML = $("#nav").innerHTML;

  $("#menuBtn").addEventListener("click", open);
  $("#drawerClose").addEventListener("click", close);
  $("#drawerBackdrop").addEventListener("click", close);
  $("#drawerNav").addEventListener("click", (e) => { if (e.target.closest("a")) close(); });
}

/* --------- LINKS DE WHATSAPP fijos ---------- */
function setupWhatsApp() {
  const general = waLink("¡Hola La Pañalera! Quería hacerles una consulta 😊");
  $("#waFloat").href = general;
  $("#footerWa").href = general;
  const tw = $("#topbarWa");
  if (tw) tw.href = general;
  const fwi = $("#footerWaIcon");
  if (fwi) fwi.href = general;
}

/* --------- AVISO FLOTANTE (toast) ---------- */
let toastTimer;
function showToast(text) {
  const el = $("#toast");
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
   CARRITO
   Guarda en localStorage. Cada ítem: { i, name, cat, price, qty }
   ========================================================= */
const Cart = {
  KEY: "lp_cart",
  items: [],

  load() {
    try { this.items = JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch { this.items = []; }
  },
  save() { localStorage.setItem(this.KEY, JSON.stringify(this.items)); },

  add(index) {
    const p = PRODUCTS[index];
    if (!p) return;
    const found = this.items.find((it) => it.i === index);
    if (found) found.qty++;
    else this.items.push({ i: index, name: p.name, cat: p.cat, price: p.price, qty: 1 });
    this.save();
    this.render();
    this.pulse();
    showToast(`"${p.name}" agregado al carrito`);
  },
  setQty(index, qty) {
    const it = this.items.find((x) => x.i === index);
    if (!it) return;
    it.qty = qty;
    if (it.qty <= 0) this.items = this.items.filter((x) => x.i !== index);
    this.save();
    this.render();
  },
  clear() { this.items = []; this.save(); this.render(); },

  count() { return this.items.reduce((s, it) => s + it.qty, 0); },
  total() { return this.items.reduce((s, it) => s + it.price * it.qty, 0); },

  pulse() {
    const b = $("#cartBtn");
    if (!b) return;
    b.classList.remove("pulse");
    void b.offsetWidth; // reinicia la animación
    b.classList.add("pulse");
  },

  render() {
    // badges
    const n = this.count();
    [["#cartCount"], ["#cartCountNav"]].forEach(([sel]) => {
      const el = $(sel);
      if (!el) return;
      el.textContent = n;
      el.hidden = n === 0;
    });

    // cuerpo del panel
    const body = $("#cartBody");
    const foot = $("#cartFoot");
    if (this.items.length === 0) {
      body.innerHTML = `
        <div class="cart__empty">
          <span class="cart__empty-ico">${CART_ADD}</span>
          <p>Tu carrito está vacío.</p>
          <span>Sumá productos y los consultás todos juntos por WhatsApp.</span>
        </div>`;
      foot.style.display = "none";
    } else {
      foot.style.display = "";
      body.innerHTML = this.items.map((it) => `
        <div class="cart-item">
          <div class="cart-item__info">
            <span class="cart-item__cat">${it.cat}</span>
            <span class="cart-item__name">${it.name}</span>
            <span class="cart-item__price">${formatPrice(it.price)}</span>
          </div>
          <div class="cart-item__right">
            <div class="stepper">
              <button data-dec="${it.i}" aria-label="Quitar uno">−</button>
              <span>${it.qty}</span>
              <button data-inc="${it.i}" aria-label="Agregar uno">+</button>
            </div>
            <button class="cart-item__del" data-del="${it.i}" aria-label="Eliminar">${TRASH}</button>
          </div>
        </div>`
      ).join("");
      $("#cartTotal").textContent = formatPrice(this.total());
      $("#cartCheckout").href = this.waMessage();
    }
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

    $("#cartBtn").addEventListener("click", () => this.open());
    $("#cartBtnNav").addEventListener("click", (e) => { e.preventDefault(); this.open(); });
    $("#cartClose").addEventListener("click", () => this.close());
    $("#cartBackdrop").addEventListener("click", () => this.close());
    $("#cartClear").addEventListener("click", () => this.clear());

    // +/- y eliminar (delegación dentro del panel)
    $("#cartBody").addEventListener("click", (e) => {
      const inc = e.target.closest("[data-inc]");
      const dec = e.target.closest("[data-dec]");
      const del = e.target.closest("[data-del]");
      if (inc) { const i = Number(inc.dataset.inc); this.setQty(i, this.qtyOf(i) + 1); }
      if (dec) { const i = Number(dec.dataset.dec); this.setQty(i, this.qtyOf(i) - 1); }
      if (del) this.setQty(Number(del.dataset.del), 0);
    });
  },
  qtyOf(i) { const it = this.items.find((x) => x.i === i); return it ? it.qty : 0; },
};

const TRASH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/></svg>';

/* --------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderProducts();
  renderTrust();
  setupDrawer();
  setupWhatsApp();
  Cart.init();
  $("#year").textContent = new Date().getFullYear();
});
