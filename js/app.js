const KEY = "cart-thanksgiving-rustique";
const WISH_KEY = "cart-thanksgiving-wishlist";
const FREE = 60;
const CODE = "MERCI15";

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const eur = n => n.toFixed(2).replace(".", ",") + " €";

// LocalStorage Helper
const ls = {
  get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
  del: k => { try { localStorage.removeItem(k); } catch (e) {} }
};

// Cart Logic
const cart = () => JSON.parse(ls.get(KEY) || "[]");
const wish = () => JSON.parse(ls.get(WISH_KEY) || "[]");
const prod = id => PRODUCTS.find(p => p.id == id);

const save = c => { ls.set(KEY, JSON.stringify(c)); badge(); };
const saveWish = w => { ls.set(WISH_KEY, JSON.stringify(w)); badge(); };

const count = () => cart().reduce((n, l) => n + l.q, 0);
const sub = () => cart().reduce((t, l) => t + l.q * (prod(l.id) ? prod(l.id).p : 0), 0);
const isWish = id => wish().includes(+id);

const toggleWish = id => {
  let w = wish();
  if (w.includes(+id)) {
    w = w.filter(x => x != id);
    toast("Retiré de vos favoris.");
  } else {
    w.push(+id);
    toast("Ajouté à vos favoris !");
  }
  saveWish(w);
  if (document.body.dataset.page === "catalogue") {
    if (window.drawCatalogue) window.drawCatalogue();
  }
  document.querySelectorAll(`.wish-btn[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle("active", isWish(id));
    btn.innerHTML = isWish(id) ? SVG_HEART_FULL : SVG_HEART_EMPTY;
  });
};

const badge = () => {
  const b = $("#cnt");
  if (b) b.textContent = count();
  const w = $("#cnt-wish");
  if (w) w.textContent = wish().length;
};

// SVG icon library
const SVG_HEART_FULL = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#c0392b" stroke="#c0392b" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const SVG_HEART_EMPTY = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const SVG_LEAF = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`;
const SVG_CHECK = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
const SVG_TRUCK = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`;
const SVG_REFRESH = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`;
const SVG_LOCK = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
const SVG_GIFT = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`;
const SVG_EYE = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const SVG_STAR = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const SVG_SPARKLE = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`;
const SVG_BOOK = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
const SVG_CLOCK = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const SVG_SUN = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const SVG_MAIL = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
const SVG_INSTAGRAM = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`;
const SVG_PINTEREST = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>`;
const SVG_FACEBOOK = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`;
const SVG_FIRE = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 0-3 3-3 7 0 1.5.5 2.5 1.5 3.5C9 14 8 16 8 18c0 2.2 1.8 4 4 4s4-1.8 4-4c0-2-1-4-2.5-5.5C14.5 11.5 15 10.5 15 9c0-4-3-7-3-7z"/></svg>`;
const SVG_PACKAGE = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`;
const SVG_CALENDAR = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
const SVG_ZAP = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
const SVG_SHIELD = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
const SVG_MAP_PIN = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

function toast(m) {
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `<span class="toast-icon">${SVG_LEAF}</span> <span>${m}</span>`;
  document.body.append(t);
  setTimeout(() => t.remove(), 2600);
}

function add(id, q = 1) {
  const c = cart(), l = c.find(x => x.id == id);
  l ? l.q += q : c.push({ id: +id, q });
  save(c);
  openDr();
  toast("Article ajouté au panier !");
}

function setq(id, d) {
  let c = cart();
  const l = c.find(x => x.id == id);
  if (l) {
    l.q += d;
    if (l.q < 1) c = c.filter(x => x.id != id);
  }
  save(c);
  if (window.redrawCart) window.redrawCart();
  if (document.getElementById("dr") && document.getElementById("dr").classList.contains("on")) openDr();
}

// Product Cards Rendering
const im = p => `<img src="${p.img ? encodeURI(p.img) : ('img/p' + p.id + '.jpg?v=5')}" alt="${p.n}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 400 400\\' width=\\'400\\' height=\\'400\\'><rect width=\\'400\\' height=\\'400\\' fill=\\'%23F5ECE0\\'/><text x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-size=\\'80\\'>${encodeURIComponent(p.e)}</text></svg>';">`;

const card = p => `
<article class="card">
  <button class="wish-btn ${isWish(p.id) ? 'active' : ''}" data-id="${p.id}" onclick="event.preventDefault();event.stopPropagation();toggleWish(${p.id})" aria-label="Ajouter aux favoris">
    ${isWish(p.id) ? SVG_HEART_FULL : SVG_HEART_EMPTY}
  </button>
  <a class="ph" href="produit.html?id=${p.id}" aria-label="${p.n}">
    ${im(p)}
    ${p.b ? `<i class="bd">${p.b}</i>` : ""}
    <button class="quick-btn" onclick="event.preventDefault();event.stopPropagation();openQuickView(${p.id})">${SVG_EYE} Aperçu rapide</button>
  </a>
  <div class="ci">
    <small>${p.c}</small>
    <h3><a href="produit.html?id=${p.id}">${p.n}</a></h3>
    <div class="pr">
      <b>${eur(p.p)}</b>
      ${p.o ? `<s>${eur(p.o)}</s>` : ""}
    </div>
    <div class="st">${SVG_STAR} ${p.r} · ${p.s < 6 ? "<span style='color:var(--primary);font-weight:700'>● Plus que " + p.s + " en stock</span>" : "En stock"}</div>
    <button class="btn" onclick="add(${p.id})">Ajouter au panier</button>
  </div>
</article>`;

// Quick View Modal
function openQuickView(id) {
  const p = prod(id);
  if (!p) return;
  const existing = $("#qv-modal");
  if (existing) existing.remove();

  const mo = document.createElement("div");
  mo.id = "qv-modal";
  mo.className = "mo";
  mo.innerHTML = `
    <div role="dialog" aria-label="Aperçu du produit" style="max-width: 680px; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; text-align: left; position:relative;">
      <button class="close-btn" style="position: absolute; top: 16px; right: 20px; z-index:10;" onclick="this.closest('.mo').remove()">✕</button>
      <div style="position:relative; aspect-ratio:1; border-radius:16px; overflow:hidden; background:#f5ece0;">
        ${im(p)}
        ${p.b ? `<i class="bd">${p.b}</i>` : ""}
      </div>
      <div style="display:flex; flex-direction:column; gap:10px;">
        <small style="text-transform:uppercase; font-weight:700; color:var(--primary);">${p.c}</small>
        <h2 style="font-size:1.6rem; margin:0;">${p.n}</h2>
        <div style="color:var(--olive); font-weight:600;">${SVG_STAR} ${p.r} / 5 · ${p.s < 6 ? "<span style='color:var(--primary);font-weight:700'>● Plus que " + p.s + " en stock</span>" : "En stock"}</div>
        <div class="pr" style="margin:6px 0;">
          <b style="font-size:1.6rem;">${eur(p.p)}</b>
          ${p.o ? `<s>${eur(p.o)}</s>` : ""}
        </div>
        <p style="font-size:0.95rem; color:var(--text); line-height:1.5;">${p.d}</p>
        <div style="display:flex; gap:12px; margin-top:auto; align-items:center;">
          <button class="btn big" style="flex:1;" onclick="add(${p.id}); this.closest('.mo').remove();">Ajouter au panier</button>
          <a class="btn ghost" href="produit.html?id=${p.id}">Fiche complète</a>
        </div>
      </div>
    </div>
  `;
  document.body.append(mo);
}

const M = h => { $("#m").innerHTML = h; };
const qs = k => new URLSearchParams(location.search).get(k);

// Header HTML
$("#hdr").innerHTML = `
<div class="top">✦ Thanksgiving 2026 · Dans <b id="t"></b> · Livraison offerte dès ${FREE} € avec le code <b>${CODE}</b></div>
<header class="nav">
  <div class="wrap bar">
    <a class="logo" href="index.html">✦ Maison Récolte</a>
    <nav aria-label="Navigation principale">
      <a href="index.html" class="${document.body.dataset.page === 'home' ? 'active' : ''}">Accueil</a>
      <a href="catalogue.html" class="${document.body.dataset.page === 'catalogue' ? 'active' : ''}">La Boutique</a>
      <a href="apropos.html" class="${document.body.dataset.page === 'apropos' ? 'active' : ''}">Notre Histoire</a>
      <a href="livraison.html" class="${document.body.dataset.page === 'livraison' ? 'active' : ''}">Livraison</a>
    </nav>
    <div class="nav-actions">
      <a class="wish-header-btn" href="catalogue.html?wish=1" title="Voir mes favoris">${SVG_HEART_FULL} <span id="cnt-wish">0</span></a>
      <a class="cartl" href="panier.html">Panier (<span id="cnt">0</span>)</a>
    </div>
  </div>
</header>`;

// Footer HTML
$("#ftr").innerHTML = `
<footer>
  <div class="footer-perks">
    <div class="wrap footer-perks-grid">
      <div class="perk-item">
        <span class="perk-icon">${SVG_TRUCK}</span>
        <div>
          <b>Livraison Express 24/48h</b>
          <p>Garantie avant Thanksgiving</p>
        </div>
      </div>
      <div class="perk-item">
        <span class="perk-icon">${SVG_LEAF}</span>
        <div>
          <b>Matières Nobles</b>
          <p>Lin lavé, grès &amp; fonte</p>
        </div>
      </div>
      <div class="perk-item">
        <span class="perk-icon">${SVG_REFRESH}</span>
        <div>
          <b>Retours Offerts</b>
          <p>30 jours pour changer d'avis</p>
        </div>
      </div>
      <div class="perk-item">
        <span class="perk-icon">${SVG_LOCK}</span>
        <div>
          <b>Paiement 100% Sécurisé</b>
          <p>Chiffrement SSL 256-bit</p>
        </div>
      </div>
    </div>
  </div>

  <div class="wrap footer-main">
    <div class="footer-col brand-col">
      <a class="logo" href="index.html">✦ Maison Récolte</a>
      <p class="brand-desc">Maison d'art de la table et douceur de recevoir. Pièces authentiques sélectionnées pour les grandes fêtes d'automne et les repas inoubliables.</p>
      <div class="footer-social">
        <a href="#" aria-label="Instagram">${SVG_INSTAGRAM} <span>Instagram</span></a>
        <a href="#" aria-label="Pinterest">${SVG_PINTEREST} <span>Pinterest</span></a>
        <a href="#" aria-label="Facebook">${SVG_FACEBOOK} <span>Facebook</span></a>
      </div>
    </div>

    <div class="footer-col">
      <h3>La Collection</h3>
      ${CATS.map(c => `<a href="catalogue.html?c=${encodeURIComponent(c)}"><span class="arrow">➔</span> ${c}</a>`).join("")}
      <a href="catalogue.html?wish=1"><span class="arrow">→</span> Mes Favoris ${SVG_HEART_FULL}</a>
    </div>

    <div class="footer-col">
      <h3>L'Expérience</h3>
      <a href="apropos.html"><span class="arrow">➔</span> Notre Histoire &amp; Artisans</a>
      <a href="index.html#guide"><span class="arrow">➔</span> Le Guide Récolte</a>
      <a href="index.html#vedettes"><span class="arrow">➔</span> Coups de Cœur</a>
      <a href="livraison.html#faq"><span class="arrow">➔</span> FAQ &amp; Conseils</a>
    </div>

    <div class="footer-col">
      <h3>Assistance &amp; Contact</h3>
      <a href="livraison.html"><span class="arrow">➔</span> Suivi de commande</a>
      <a href="livraison.html"><span class="arrow">➔</span> Politique de retour</a>
      <a href="mailto:contact@maisonrecolte.fr" class="contact-email">${SVG_MAIL} contact@maisonrecolte.fr</a>
      <p class="hours-info">Service client ouvert du Lundi au Samedi de 9h à 19h.</p>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="wrap footer-bottom-flex">
      <p class="copy">© 2026 Maison Récolte · Tous droits réservés. Boutique de démonstration Thanksgiving.</p>
      <div class="payment-badges">
        <span>VISA</span>
        <span>MC</span>
        <span>Apple Pay</span>
        <span>PayPal</span>
        <span>${SVG_LOCK} SSL 256</span>
      </div>
    </div>
  </div>
</footer>`;

// Thanksgiving Timer
const tick = () => {
  const d = Math.max(0, new Date("2026-11-26T00:00:00") - Date.now());
  const f = (x, y) => Math.floor(d / x) % y;
  const timerElem = $("#t");
  if (timerElem) timerElem.textContent = `${Math.floor(d / 864e5)}j ${f(36e5, 24)}h ${f(6e4, 60)}m ${f(1e3, 60)}s`;
};
tick();
setInterval(tick, 1e3);

// Page Renderers
const pages = {
  home() {
    M(`
    <section class="hero">
      <div class="wrap">
        <div class="hp">
          <p class="kick">${SVG_LEAF} Édition Thanksgiving 2026</p>
          <h1>Merci d'être <em>à notre table.</em></h1>
          <p>Art de la table en grès &amp; lin lavé, cocottes en fonte et pièces parfumées pour les repas d'automne inoubliables. Profitez de -15% avec le code <b>${CODE}</b>.</p>
          <div class="hero-actions">
            <a class="btn big" href="catalogue.html">Découvrir la collection</a>
            <a class="btn ghost big" href="#guide">Le Guide de la Tablée</a>
          </div>
          <p class="pf">★★★★★ <b>4.8/5</b> · Plus de 2 300 foyers équipés pour les fêtes</p>
        </div>
      </div>
    </section>

    <div class="mq" aria-hidden="true">
      <div>
        ${"<span>Livraison offerte dès 60 €</span><span>✦</span><span>Code MERCI15 : -15%</span><span>◆</span><span>Expédié sous 48h</span><span>✦</span>".repeat(4)}
      </div>
    </div>

    <section class="wrap trust">
      <div>${SVG_TRUCK} Livraison offerte dès ${FREE} €</div>
      <div>${SVG_REFRESH} Retours gratuits 30 jours</div>
      <div>${SVG_LOCK} Paiement 100% sécurisé</div>
      <div>${SVG_CHECK} Garanti livré avant Thanksgiving</div>
    </section>

    <section class="wrap">
      <h2>Nos Univers d'Automne</h2>
      <div class="cat-grid">
        ${CATEGORIES_DATA.map(c => `
          <a class="cat-card" href="catalogue.html?c=${encodeURIComponent(c.name)}">
            <img src="${c.img}" alt="${c.name}" loading="lazy">
            <div class="cat-card-content">
              <div class="cat-card-title"><span>${c.icon}</span> ${c.name}</div>
              <div class="cat-card-desc">${c.desc}</div>
            </div>
          </a>
        `).join("")}
      </div>
    </section>

    <section class="wrap">
      <div class="flash">
        <div>
          <p class="kick">${SVG_FIRE} Vente Flash de Saison</p>
          <h2 style="margin-bottom:8px">Cocotte en fonte rouille 4.2L</h2>
          <p><b style="color:var(--primary);font-size:1.5rem">89,00 €</b> <s style="color:var(--muted)">119,00 €</s> · Économisez 30,00 €</p>
          <div class="ship"><i style="width:82%"></i></div>
          <small>82% des pièces réservées · Plus que 4 exemplaires en stock</small>
        </div>
        <a class="btn big" href="produit.html?id=4">Profiter de l'offre</a>
      </div>
    </section>

    <section class="wrap" id="vedettes">
      <h2>Incontournables de la Récolte</h2>
      <div class="grid">
        ${PRODUCTS.slice(0, 8).map(card).join("")}
      </div>
    </section>

    <section class="wrap" id="kit">
      <div class="kit">
        <div>
          <p class="kick">${SVG_SPARKLE} Le Set Complet</p>
          <h2 style="margin-bottom:8px">Le Pack « Grande Tablée »</h2>
          <p>Nappe en lin terracotta, chemin de table en jute et set de 6 assiettes en grès. Tout le nécessaire pour dresser d'un coup la table de fête. Bénéficiez de <b>-15% supplémentaires</b> avec le code <b>${CODE}</b>.</p>
        </div>
        <button class="btn big" onclick="[1,2,3].forEach(i=>add(i))">Ajouter les 3 pièces au panier</button>
      </div>
    </section>

    <section class="wrap" id="guide">
      <div class="guide-sec">
        <p class="kick">${SVG_BOOK} Conseil Récolte</p>
        <h2>Le Guide Récolte : Réussir sa Tablée de Fête</h2>
        <div class="guide-grid">
          <div class="guide-card">
            <h3>◈ Recette : Dinde Rôtie au Cidre</h3>
            <ul>
              <li><span>Dinde fermière :</span> <span>4.5 kg</span></li>
              <li><span>Beurre aux herbes &amp; ail :</span> <span>150 g</span></li>
              <li><span>Cidre brut d'automne :</span> <span>50 cl</span></li>
              <li><span>Temps de cuisson :</span> <span>3h30 à 165°C</span></li>
            </ul>
          </div>
          <div class="guide-card">
            <h3>${SVG_CLOCK} Chronogramme J-1 et Jour J</h3>
            <ul>
              <li><span>Veille :</span> <span>Mariner la dinde &amp; repasser le lin</span></li>
              <li><span>10h00 :</span> <span>Enfourner la cocotte en fonte</span></li>
              <li><span>13h00 :</span> <span>Dresser les assiettes en grès</span></li>
              <li><span>14h00 :</span> <span>Allumer les bougies aux épices</span></li>
            </ul>
          </div>
          <div class="guide-card">
            <h3>${SVG_SUN} Astuces Décoration</h3>
            <ul>
              <li><span>Centre de table :</span> <span>Chemin de jute &amp; mini citrouilles</span></li>
              <li><span>Serviettes :</span> <span>Pliage souple &amp; bâton de cannelle</span></li>
              <li><span>Lumière :</span> <span>Bougies ambrées tamisées</span></li>
              <li><span>Ambiance :</span> <span>Musique feutrée d'automne</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="wrap">
      <h2>Avis de nos hôtes &amp; convives</h2>
      <div class="tg">
        <div class="tm">
          ★★★★★
          <p>« La nappe en lin et les assiettes en grès ont transformé notre table. Tout le monde nous a fait des compliments ! »</p>
          <b>Camille R. · Lyon</b>
        </div>
        <div class="tm">
          ★★★★★
          <p>« La cocotte en fonte rouille est d'une qualité exceptionnelle. La cuisson de la dinde était tendre et dorée. »</p>
          <b>Thomas B. · Nantes</b>
        </div>
        <div class="tm">
          ★★★★★
          <p>« Le coffret Hôte parfait offert à ma belle-mère a fait sensation. Emballage soigné et envoi rapide. »</p>
          <b>Inès M. · Bordeaux</b>
        </div>
      </div>
    </section>

    <section class="wrap" style="text-align:center;">
      <div style="background:#FFF8EC; border:1px solid var(--line); border-radius:24px; padding:40px 24px; max-width:680px; margin:auto;">
        <h2>Recevez nos inspirations de tablée</h2>
        <p style="margin-bottom:18px; color:var(--muted);">Inscrivez-vous pour recevoir nos recettes de saison et profitez de -10% immédiats.</p>
        <form class="news" onsubmit="event.preventDefault(); toast('Code promo secret : MERCI10 appliqué !'); this.reset();">
          <input type="email" required placeholder="Votre adresse e-mail" aria-label="E-mail">
          <button class="btn">S'inscrire &amp; Recevoir le code</button>
        </form>
      </div>
    </section>
    `);
  },

  apropos() {
    M(`
    <div class="wrap pg">
      <p class="kick">Notre Histoire</p>
      <h1>Une table, des sourires, un merci.</h1>
      
      <div style="aspect-ratio: 16/9; border-radius: 20px; overflow: hidden; margin: 24px 0; box-shadow: var(--shadow-md);">
        <img src="img/about_hero.jpg" alt="Art de la table d'automne" style="width:100%; height:100%; object-fit:cover;">
      </div>

      <p style="font-size:1.15rem; line-height:1.7;">
        Maison Récolte est née d'une passion partagée pour les repas généreux et les tables vivantes. Nous croyons que la magie de Thanksgiving et des réunions d'automne réside dans ces moments d'authenticité où l'on prend le temps de savourer et de remercier ceux qui nous entourent.
      </p>

      <div class="vals">
        <div>
          <span class="val-icon">${SVG_LEAF}</span>
          <h3>Matières Nobles</h3>
          <p>Lin lavé, grès naturel émaillé, fonte et jute. Des matériaux sains et durables conçus pour traverser les générations.</p>
        </div>
        <div>
          <span class="val-icon">${SVG_SPARKLE}</span>
          <h3>Artisans d'Exception</h3>
          <p>Nous collaborons en direct avec des ateliers passionnés privilégiant le travail fait main et les séries limitées.</p>
        </div>
        <div>
          <span class="val-icon">${SVG_TRUCK}</span>
          <h3>Expédition Garantie</h3>
          <p>Toutes nos commandes passées avant le 20 novembre sont emballées avec soin et livrées avant le jour J.</p>
        </div>
      </div>

      <h2>Notre Promesse Satisfait ou Remboursé</h2>
      <p>Si une création ne convient pas parfaitement à votre table, vous disposez de 30 jours pour nous la retourner gratuitement. Nous nous occupons du reste sans poser de questions.</p>
      
      <div style="margin-top:32px; text-align:center;">
        <a class="btn big" href="catalogue.html">Découvrir toute la boutique</a>
      </div>
    </div>
    `);
  },

  livraison() {
    M(`
    <div class="wrap pg livraison-page">
      <div class="delivery-hero">
        <p class="kick">${SVG_TRUCK} Expédition &amp; Sérénité</p>
        <h1>Expédié avec soin, livré avant le repas.</h1>
        <p class="delivery-intro">Nous apportons une attention toute particulière à l'emballage ultra-sécurisé de nos céramiques et verrerie pour vous garantir une table d'exception sans la moindre casse.</p>
      </div>

      <div class="thanks-notice">
        <div class="thanks-notice-icon">
          ${SVG_CALENDAR}
        </div>
        <div class="thanks-notice-content">
          <div class="thanks-notice-badge">Rappel Repas de Thanksgiving</div>
          <p>Commandez avant le <b>20 novembre à minuit</b> pour garantir la réception de vos colis à temps pour la fête du 26 novembre.</p>
        </div>
      </div>

      <div class="delivery-section-header">
        <h2>Nos Modes de Livraison</h2>
        <p>Choisissez la formule adaptée à votre calendrier de préparatifs.</p>
      </div>

      <div class="table-wrap">
        <table class="tb">
          <thead>
            <tr>
              <th>Mode d'expédition</th>
              <th>Délai estimé</th>
              <th>Suivi &amp; Service</th>
              <th>Tarif</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="shipping-method">
                  <div class="shipping-icon colissimo">${SVG_TRUCK}</div>
                  <div>
                    <strong class="shipping-name">Colissimo Standard</strong>
                    <span class="shipping-sub">Livraison à domicile</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="delay-badge">${SVG_CLOCK} 3 à 5 jours ouvrés</span>
              </td>
              <td>
                <span class="service-tag">${SVG_CHECK} Suivi SMS &amp; Mail</span>
              </td>
              <td>
                <div class="price-block">
                  <span class="price-val">4,90 €</span>
                  <span class="badge-free">Offert dès ${FREE} €</span>
                </div>
              </td>
            </tr>
            <tr class="featured-row">
              <td>
                <div class="shipping-method">
                  <div class="shipping-icon chronopost">${SVG_ZAP}</div>
                  <div>
                    <strong class="shipping-name">Chronopost Express <span class="tag-express">Populaire</span></strong>
                    <span class="shipping-sub">Livraison 24h prioritaire</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="delay-badge express">${SVG_CLOCK} 24 à 48h garanti</span>
              </td>
              <td>
                <span class="service-tag">${SVG_CHECK} Remise en main propre</span>
              </td>
              <td>
                <div class="price-block">
                  <span class="price-val highlight">9,90 €</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="shipping-method">
                  <div class="shipping-icon relais">${SVG_MAP_PIN}</div>
                  <div>
                    <strong class="shipping-name">Point Relais Colissimo</strong>
                    <span class="shipping-sub">En commerce de proximité</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="delay-badge">${SVG_CLOCK} 3 à 4 jours ouvrés</span>
              </td>
              <td>
                <span class="service-tag">${SVG_CHECK} +7 000 points relais</span>
              </td>
              <td>
                <div class="price-block">
                  <span class="price-val">3,90 €</span>
                  <span class="badge-free">Offert dès ${FREE} €</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="delivery-guarantees">
        <div class="guarantee-card">
          <div class="g-icon">${SVG_SHIELD}</div>
          <h3>Emballage Anti-casse 100%</h3>
          <p>Carton renforcé double-cannelure, calages écologiques et alvéoles sur-mesure pour céramique.</p>
        </div>
        <div class="guarantee-card">
          <div class="g-icon">${SVG_REFRESH}</div>
          <h3>Retours sous 30 Jours</h3>
          <p>Changement d'avis ? Retournez gratuitement tout article non utilisé pour un échange ou remboursement.</p>
        </div>
        <div class="guarantee-card">
          <div class="g-icon">${SVG_LOCK}</div>
          <h3>Paiement &amp; Suivi Sécurisés</h3>
          <p>Un numéro de suivi en direct vous est envoyé par e-mail dès la prise en charge par le transporteur.</p>
        </div>
      </div>

      <div class="faq-section">
        <h2 id="faq">Questions Fréquentes</h2>
        <div class="faq-list">
          <details class="faq-card">
            <summary>
              <span>Puis-je effectuer un retour facilement ?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-content">
              <p>Absolument ! Vous bénéficiez de 30 jours à compter de la réception pour nous retourner tout article non utilisé dans son emballage d'origine. Contactez-nous pour obtenir votre étiquette de retour.</p>
            </div>
          </details>

          <details class="faq-card">
            <summary>
              <span>Comment utiliser le code promotionnel MERCI15 ?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-content">
              <p>Saisissez le code <strong>MERCI15</strong> dans la case "Code promo" lors de l'étape de confirmation de votre panier pour bénéficier de 15% de réduction immédiate.</p>
            </div>
          </details>

          <details class="faq-card">
            <summary>
              <span>Que faire si une pièce arrive endommagée ?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-content">
              <p>Nos emballages protègent 99,8% de nos pièces. Si un accident survient, contactez notre service client avec une photo de l'article casse et nous vous en expédierons un nouveau sous 24h sans frais.</p>
            </div>
          </details>

          <details class="faq-card">
            <summary>
              <span>Les articles résistent-ils au lave-vaisselle et au four ?</span>
              <span class="faq-icon">+</span>
            </summary>
            <div class="faq-content">
              <p>Nos assiettes en grès et plats en céramique sont émaillés à haute température. Ils passent sans problème au lave-vaisselle, au micro-ondes et au four traditionnel.</p>
            </div>
          </details>
        </div>
      </div>
    </div>
    `);
  },

  catalogue() {
    let c = qs("c") || "Tout";
    let q = "";
    let sort = "default";
    let onlyWish = qs("wish") === "1";

    window.drawCatalogue = () => {
      let list = PRODUCTS.filter(p => {
        const matchCat = (c === "Tout" || p.c === c);
        const matchQuery = p.n.toLowerCase().includes(q) || p.d.toLowerCase().includes(q);
        const matchWish = !onlyWish || isWish(p.id);
        return matchCat && matchQuery && matchWish;
      });

      if (sort === "price-asc") list.sort((a, b) => a.p - b.p);
      else if (sort === "price-desc") list.sort((a, b) => b.p - a.p);
      else if (sort === "rating") list.sort((a, b) => b.r - a.r);

      const grid = $("#g");
      const countElem = $("#prod-count");
      if (countElem) countElem.textContent = `${list.length} produit${list.length > 1 ? 's' : ''}`;

      if (grid) {
        grid.innerHTML = list.length
          ? list.map(card).join("")
          : `<div style="grid-column:1/-1; text-align:center; padding:60px 20px;">
              <h3>Aucun produit trouvé</h3>
              <p style="color:var(--muted); margin-top:8px;">Essayez de modifier votre recherche ou vos filtres.</p>
             </div>`;
      }

      document.querySelectorAll(".filters button").forEach(b => {
        if (b.dataset.wish) {
          b.classList.toggle("on", onlyWish);
        } else {
          b.classList.toggle("on", !onlyWish && b.dataset.c === c);
        }
      });
    };

    M(`
    <div class="wrap" style="margin-top:36px">
      <h1 style="font-size:2.4rem">La Boutique Thanksgiving</h1>
      <p style="color:var(--muted); margin-bottom:20px;">Découvrez nos créations sélectionnées pour la saison récolte 2026.</p>

      <div class="tools">
        <div class="filters">
          ${["Tout", ...CATS].map(x => `<button data-c="${x}">${x}</button>`).join("")}
          <button data-wish="1">${SVG_HEART_FULL} Mes Favoris</button>
        </div>
        
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <input id="q" type="search" placeholder="Rechercher une pièce..." aria-label="Rechercher">
          <select id="sort" class="sort-select">
            <option value="default">Tri : Nouveautés</option>
            <option value="price-asc">Prix : croissant</option>
            <option value="price-desc">Prix : décroissant</option>
            <option value="rating">Meilleures notes ★</option>
          </select>
        </div>
      </div>

      <div style="margin-bottom:16px; font-weight:600; color:var(--muted);" id="prod-count"></div>

      <div class="grid" id="g"></div>
    </div>
    `);

    document.querySelectorAll(".filters button").forEach(b => {
      b.onclick = () => {
        if (b.dataset.wish) {
          onlyWish = !onlyWish;
        } else {
          onlyWish = false;
          c = b.dataset.c;
        }
        window.drawCatalogue();
      };
    });

    $("#q").oninput = e => {
      q = e.target.value.toLowerCase();
      window.drawCatalogue();
    };

    $("#sort").onchange = e => {
      sort = e.target.value;
      window.drawCatalogue();
    };

    window.drawCatalogue();
  },

  produit() {
    const p = prod(qs("id"));
    if (!p) {
      return M(`
        <div class="wrap empty">
          <h1>Produit introuvable</h1>
          <p>Cette création n'est plus disponible ou a été déplacée.</p>
          <a class="btn big" href="catalogue.html">Retour à la boutique</a>
        </div>
      `);
    }

    document.title = p.n + " | Maison Récolte";
    let n = 1;

    M(`
    <div class="wrap">
      <p style="margin-top:24px"><small><a href="catalogue.html">Boutique</a> / <a href="catalogue.html?c=${encodeURIComponent(p.c)}">${p.c}</a> / ${p.n}</small></p>
      
      <div class="det">
        <div class="ph" style="position:relative; aspect-ratio:1; border-radius:20px; overflow:hidden; box-shadow:var(--shadow-md);">
          <button class="wish-btn ${isWish(p.id) ? 'active' : ''}" data-id="${p.id}" onclick="event.preventDefault();toggleWish(${p.id})">
            ${isWish(p.id) ? SVG_HEART_FULL : SVG_HEART_EMPTY}
          </button>
          ${im(p)}
          ${p.b ? `<i class="bd">${p.b}</i>` : ""}
        </div>

        <div style="display:flex; flex-direction:column; gap:12px;">
          <small style="text-transform:uppercase; font-weight:700; color:var(--primary);">${p.c}</small>
          <h1 style="font-size:2.2rem">${p.n}</h1>
          
          <div style="display:flex; gap:12px; align-items:center;">
            <span class="st" style="font-size:0.95rem;">${SVG_STAR} ${p.r} / 5</span>
            <span style="color:var(--muted);">·</span>
            <span style="color:var(--olive); font-weight:600;">${p.s < 6 ? "<span style='color:var(--primary)'>● Plus que " + p.s + " pièces disponibles</span>" : "En stock expédié sous 24h"}</span>
          </div>

          <div class="pr big-pr" style="margin:8px 0">
            <b>${eur(p.p)}</b>
            ${p.o ? `<s>${eur(p.o)}</s>` : ""}
          </div>

          <p style="font-size:1.05rem; color:var(--text); line-height:1.6;">${p.d}</p>

          <details style="margin:12px 0;">
            <summary>Matières, dimensions &amp; entretien</summary>
            <p style="padding-top:8px;">Fabriqué selon des méthodes artisanales. Chaque pièce possède d'infimes variations d'émaillage ou de tissage qui font son charme unique. Nettoyage et entretien faciles.</p>
          </details>

          <ul style="margin-bottom:16px; color:var(--muted); font-size:0.92rem; display:flex; flex-direction:column; gap:6px;">
            <li>${SVG_TRUCK} Livraison offerte dès ${FREE} € d'achats</li>
            <li>${SVG_REFRESH} Retours sous 30 jours sans justification</li>
            <li>${SVG_PACKAGE} Emballage sécurisé anti-casse garanti</li>
          </ul>

          <div class="buy">
            <div class="qty">
              <button aria-label="Moins" id="mn">−</button>
              <span id="n">1</span>
              <button aria-label="Plus" id="pl">+</button>
            </div>
            <button class="btn big" id="ad" style="flex:1;">Ajouter au panier</button>
          </div>
        </div>
      </div>

      <section style="margin-top:60px;">
        <h2>Vous aimerez aussi pour votre table</h2>
        <div class="grid">
          ${PRODUCTS.filter(x => x.id !== p.id && x.c === p.c).slice(0, 4).map(card).join("")}
        </div>
      </section>
    </div>
    `);

    $("#mn").onclick = () => { n = Math.max(1, n - 1); $("#n").textContent = n; };
    $("#pl").onclick = () => { n = Math.min(p.s, n + 1); $("#n").textContent = n; };
    $("#ad").onclick = () => add(p.id, n);
  },

  panier() {
    window.redrawCart = () => {
      const c = cart();
      const s = sub();
      const hasCode = ls.get(KEY + "-code") === CODE;
      const d = hasCode ? s * 0.15 : 0;
      const t = s - d;
      const sh = !c.length || t >= FREE ? 0 : 4.9;

      if (!c.length) {
        return M(`
          <div class="wrap empty">
            <h1>Votre panier est vide</h1>
            <p>Un repas de fête se prépare : découvrez notre collection d'automne.</p>
            <a class="btn big" href="catalogue.html">Voir toute la boutique</a>
          </div>
        `);
      }

      M(`
      <div class="wrap" style="margin-top:36px">
        <h1 style="font-size:2.4rem">Votre Panier de Fête</h1>
        <div class="split">
          <div>
            ${c.map(l => {
              const p = prod(l.id);
              if (!p) return "";
              return `
                <div class="line">
                  <div class="mini">${im(p)}</div>
                  <div>
                    <b>${p.n}</b><br>
                    <small>${eur(p.p)} l'unité</small>
                  </div>
                  <div class="qty">
                    <button aria-label="Moins" onclick="setq(${p.id}, -1)">−</button>
                    <span>${l.q}</span>
                    <button aria-label="Plus" onclick="setq(${p.id}, 1)">+</button>
                  </div>
                  <b>${eur(p.p * l.q)}</b>
                </div>
              `;
            }).join("")}
          </div>

          <aside class="sum">
            <h3>Récapitulatif</h3>
            <small style="display:block; margin:8px 0;">
              ${t >= FREE ? SVG_CHECK + " Félicitations, livraison offerte !" : "Plus que " + eur(FREE - t) + " pour bénéficier de la livraison offerte"}
            </small>
            <div class="ship"><i style="width:${Math.min(100, (t / FREE) * 100)}%"></i></div>

            <p><span>Sous-total</span><span>${eur(s)}</span></p>
            ${d ? `<p style="color:var(--primary);"><span>Code ${CODE} (-15%)</span><span>-${eur(d)}</span></p>` : ""}
            <p><span>Frais de livraison</span><span>${sh ? eur(sh) : "Offerts"}</span></p>
            <p style="font-size:1.2rem; font-weight:800; border-top:1px solid var(--line); padding-top:10px; margin-top:10px;">
              <span>Total</span><span>${eur(t + sh)}</span>
            </p>

            <form class="news" style="margin-top:16px;" onsubmit="event.preventDefault(); promo(this.c.value);">
              <input name="c" placeholder="Code promo" aria-label="Code promo" style="min-width:0; flex:1;" value="${hasCode ? CODE : ''}">
              <button class="btn ghost">Appliquer</button>
            </form>

            <button class="btn big" onclick="checkout()" style="width:100%; margin-top:16px;">Finaliser ma commande</button>
          </aside>
        </div>
      </div>
      `);
    };

    window.redrawCart();
  }
};

function promo(v) {
  if (v.trim().toUpperCase() === CODE) {
    ls.set(KEY + "-code", CODE);
    toast("Code MERCI15 appliqué : -15% de réduction !");
  } else if (v.trim().toUpperCase() === "MERCI10") {
    ls.set(KEY + "-code", CODE);
    toast("Code MERCI10 appliqué !");
  } else {
    toast("Code promotionnel non valide.");
  }
  if (window.redrawCart) window.redrawCart();
}

function checkout() {
  ls.del(KEY);
  ls.del(KEY + "-code");
  badge();
  M(`
  <div class="wrap empty">
    <h1>Merci pour votre commande ! ✦</h1>
    <p>Votre commande de démonstration a bien été enregistrée. Nous vous souhaitons un merveilleux Thanksgiving et de très belles fêtes.</p>
    <a class="btn big" href="index.html">Retour à l'accueil</a>
  </div>
  `);
}

// Side Drawer (Mini-cart)
const dr = document.createElement("aside");
dr.id = "dr";
dr.setAttribute("aria-label", "Mini-panier");
document.body.append(dr);

function openDr() {
  const c = cart();
  const s = sub();
  const hasCode = ls.get(KEY + "-code") === CODE;
  const d = hasCode ? s * 0.15 : 0;
  const t = s - d;

  dr.innerHTML = `
    <div class="dh">
      <h3>Mon Panier</h3>
      <button class="close-btn" aria-label="Fermer" onclick="closeDr()">✕</button>
    </div>
    <small>${t >= FREE ? SVG_CHECK + " Livraison offerte !" : "Plus que " + eur(FREE - t) + " pour la livraison offerte"}</small>
    <div class="ship"><i style="width:${Math.min(100, (t / FREE) * 100)}%"></i></div>
    
    <div style="flex:1; overflow-y:auto;">
      ${c.map(l => {
        const p = prod(l.id);
        if (!p) return "";
        return `
          <div class="dl">
            ${im(p)}
            <div>
              <b>${p.n}</b><br>
              <small>${l.q} × ${eur(p.p)}</small>
            </div>
            <b>${eur(p.p * l.q)}</b>
          </div>
        `;
      }).join("")}
    </div>

    <div style="border-top:1px solid var(--line); padding-top:14px; margin-top:14px;">
      <p class="dt"><b>Total</b><b>${eur(t)}</b></p>
      <a class="btn big" href="panier.html">Voir le panier &amp; Commander</a>
      <a class="btn ghost" href="#" onclick="closeDr(); return false;" style="margin-top:8px;">Continuer mes achats</a>
    </div>
  `;
  dr.classList.add("on");
}

const closeDr = () => dr.classList.remove("on");

// Welcome Popup
setTimeout(() => {
  if (ls.get("pop") || document.body.dataset.page === "panier") return;
  ls.set("pop", "1");
  const o = document.createElement("div");
  o.className = "mo";
  o.innerHTML = `
    <div role="dialog" aria-label="Offre de bienvenue" style="position:relative;">
      <button class="close-btn" style="position: absolute; top: 16px; right: 20px;" onclick="this.closest('.mo').remove()">✕</button>
      <h2>Offre de Bienvenue ${SVG_SPARKLE}</h2>
      <p>Bénéficiez de -15% sur votre première commande avec le code promotionnel <b>${CODE}</b>.</p>
      <form class="news" onsubmit="event.preventDefault(); this.closest('.mo').remove(); promo('${CODE}');">
        <input type="email" required placeholder="Votre adresse e-mail" aria-label="E-mail">
        <button class="btn">Obtenir mon code</button>
      </form>
      <p style="margin-top:16px;">
        <a href="#" onclick="this.closest('.mo').remove(); return false;"><small style="color:var(--muted)">Continuer sans réduction</small></a>
      </p>
    </div>
  `;
  document.body.append(o);
}, 10000);

// Initialize Current Page
if (pages[document.body.dataset.page]) {
  pages[document.body.dataset.page]();
}

// Reveal animations
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }), { threshold: 0.08 });
  
  document.querySelectorAll('section.wrap').forEach(s => {
    s.classList.add('rv');
    io.observe(s);
  });
}

badge();
