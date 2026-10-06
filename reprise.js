/* =========================================================
   REPRISE D'UNE FICHE DÉJÀ ENREGISTRÉE
   Le registre Google Sheet conserve, avec chaque accueil, le
   contenu des 6 pages. On peut donc rouvrir une fiche depuis
   n'importe quel poste, la compléter et la renvoyer.
   ========================================================= */

const CLES_BROUILLONS = ["page1Content", "page2Content", "page3Content",
                         "page4Content", "page5Content", "page6Content"];

/* Les pièces jointes (photos et PDF) pèsent trop lourd pour une cellule
   de tableur : on les retire de ce qui part au registre. Les signatures,
   elles, sont légères et indispensables — elles restent. */
function allegerBrouillon(html) {
  if (!html) return "";
  var doc;
  try { doc = new DOMParser().parseFromString(html, "text/html"); }
  catch (e) { return html; }

  // les vignettes de pièces jointes sont retirées en entier (pas de cadre vide)
  var retirees = 0;
  doc.querySelectorAll(".photo-thumb").forEach(function (v) { v.remove(); retirees++; });

  if (retirees) {
    // on garde une trace visible pour l'utilisateur qui reprend la fiche
    doc.querySelectorAll(".photo-container, [id$='-container']").forEach(function (z) {
      if (z.querySelector(".pj-note")) return;
      var note = doc.createElement("div");
      note.className = "pj-note";
      note.textContent = "📎 Pièces jointes non reprises depuis le registre — à rattacher si nécessaire.";
      z.appendChild(note);
    });
  }

  var racine = doc.body.firstElementChild;
  return racine ? racine.outerHTML : html;
}

/* Le registre stocke le contenu dans 6 cellules de 45 000 caractères */
const REPRISE_TAILLE_MAX = 6 * 45000;

function brouillonsPourRegistre() {
  const o = {};
  CLES_BROUILLONS.forEach(k => {
    let v = "";
    try { v = localStorage.getItem(k) || ""; } catch (e) {}
    o[k] = allegerBrouillon(v);
  });
  const taille = JSON.stringify(o).length;
  if (taille > REPRISE_TAILLE_MAX) {
    console.warn("Fiche trop volumineuse pour la reprise : " + taille + " caractères");
    if (typeof etatRegistre === "function") {
      etatRegistre("ℹ️ Fiche enregistrée, mais trop volumineuse pour être rouverte depuis le registre "
        + "(" + Math.round(taille / 1024) + " Ko). Allégez les textes libres si besoin.", "#F4A03A");
    }
  }
  return o;
}

/* Appel générique au registre (même action que l'enregistrement : aucune
   ligne supplémentaire à ajouter dans le doPost du projet Apps Script) */
async function appelRegistre(mode, extra) {
  const url = (typeof CONFIG_ACCUEIL !== "undefined" && CONFIG_ACCUEIL.apiUrl) || "";
  if (!url) throw new Error("Aucune URL Apps Script dans config.js");
  const corps = Object.assign({
    action: "accueil-hse",
    mode: mode,
    ficheId: (typeof CONFIG_ACCUEIL !== "undefined" && CONFIG_ACCUEIL.ficheId) || "accueil-hse"
  }, extra || {});
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(corps)
  });
  return await r.json();
}

/* ---------- Fenêtre de reprise ---------- */
function ouvrirReprise() {
  let boite = document.getElementById("reprise-boite");
  if (!boite) {
    boite = document.createElement("div");
    boite.id = "reprise-boite";
    boite.className = "reprise-fond no-print";
    boite.innerHTML = `
      <div class="reprise-cadre">
        <div class="reprise-tete">
          <div>
            <div class="reprise-titre">Reprendre une fiche d'accueil</div>
            <div class="reprise-sous">Fiches enregistrées dans le registre CDES</div>
          </div>
          <button class="reprise-fermer" type="button" onclick="fermerReprise()">✕</button>
        </div>
        <input id="reprise-recherche" class="reprise-recherche" type="search"
               placeholder="Rechercher un nom, un prénom, une agence…" oninput="filtrerReprise()">
        <div id="reprise-liste" class="reprise-liste"><div class="reprise-vide">⏳ Lecture du registre…</div></div>
      </div>`;
    document.body.appendChild(boite);
  }
  boite.classList.add("visible");
  chargerListeReprise();
}

function fermerReprise() {
  const b = document.getElementById("reprise-boite");
  if (b) b.classList.remove("visible");
}

let _fichesRegistre = [];

async function chargerListeReprise() {
  const zone = document.getElementById("reprise-liste");
  zone.innerHTML = '<div class="reprise-vide">⏳ Lecture du registre…</div>';
  try {
    const rep = await appelRegistre("liste", {});
    if (!rep || !rep.ok) throw new Error((rep && rep.error) || "réponse inattendue");
    _fichesRegistre = rep.fiches || [];
    afficherListeReprise(_fichesRegistre);
  } catch (e) {
    zone.innerHTML = '<div class="reprise-vide erreur">❌ Registre injoignable — ' + e.message +
      '<br><span class="reprise-aide">Vérifiez que l\'action « accueil-hse » est bien branchée dans le projet Apps Script.</span></div>';
  }
}

function echapper(t) {
  return String(t == null ? "" : t).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* Les listes déroulantes non renseignées valent « -- Sélectionner … -- » :
   inutile de l'afficher dans la liste des fiches. */
function valeurLisible(v) {
  var t = String(v == null ? "" : v).trim();
  if (!t || t.indexOf("--") === 0 || /^s[ée]lectionner/i.test(t)) return "";
  return t;
}

function afficherListeReprise(fiches) {
  const zone = document.getElementById("reprise-liste");
  if (!fiches.length) {
    zone.innerHTML = '<div class="reprise-vide">Aucune fiche enregistrée pour le moment.</div>';
    return;
  }
  zone.innerHTML = fiches.map(f => `
    <button class="reprise-item" type="button" onclick="reprendreFiche('${echapper(f.cle)}')">
      <span class="reprise-nom">${echapper((f.nom || "").toUpperCase())} ${echapper(f.prenom)}</span>
      <span class="reprise-infos">${echapper([valeurLisible(f.agence), valeurLisible(f.poste)].filter(Boolean).join(" · ") || "—")}</span>
      <span class="reprise-date">${echapper(f.date || "")}</span>
    </button>`).join("");
}

function filtrerReprise() {
  const q = (document.getElementById("reprise-recherche").value || "")
    .toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (!q) return afficherListeReprise(_fichesRegistre);
  afficherListeReprise(_fichesRegistre.filter(f =>
    [f.nom, f.prenom, f.agence, f.poste, f.date].join(" ").toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "").indexOf(q) >= 0));
}

async function reprendreFiche(cle) {
  const zone = document.getElementById("reprise-liste");
  zone.innerHTML = '<div class="reprise-vide">⏳ Chargement de la fiche…</div>';
  try {
    const rep = await appelRegistre("charger", { key: cle });
    if (!rep || !rep.ok) throw new Error((rep && rep.error) || "fiche introuvable");
    const b = rep.brouillons || {};
    let pages = 0;
    CLES_BROUILLONS.forEach(k => {
      if (b[k]) {
        try { localStorage.setItem(k, b[k]); pages++; } catch (e) { console.warn(e); }
      } else {
        try { localStorage.removeItem(k); } catch (e) {}
      }
    });
    if (!pages) throw new Error("cette fiche a été enregistrée avant la mise en place de la reprise");
    try {
      localStorage.removeItem("registreEmpreinte");   // la fiche pourra être renvoyée
      if (rep.nom) localStorage.setItem("Nom", rep.nom);
      if (rep.poste) localStorage.setItem("posteTravail", rep.poste);
      if (rep.activites) localStorage.setItem("activiteCollaborateur", rep.activites);
    } catch (e) {}
    window.onbeforeunload = null;
    window.location.reload();
  } catch (e) {
    zone.innerHTML = '<div class="reprise-vide erreur">❌ ' + echapper(e.message) + '</div>';
  }
}
