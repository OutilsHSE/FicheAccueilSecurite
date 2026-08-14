/* =========================================================
   ENVOI DE LA FICHE VERS LE REGISTRE GOOGLE SHEET
   Déclenché à l'export PDF (page Signatures).
   ========================================================= */

/* Petit bandeau d'état en bas de page */
function etatRegistre(texte, couleur) {
  let el = document.getElementById("etat-registre");
  if (!el) {
    el = document.createElement("div");
    el.id = "etat-registre";
    el.className = "etat-registre no-print";
    document.body.appendChild(el);
  }
  el.textContent = texte;
  el.style.borderColor = couleur || "var(--gris-bord)";
  el.classList.add("visible");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("visible"), 8000);
}

/* Clé unique du collaborateur (nom_prenom, sans accent) */
function cleCollaborateur(f) {
  const norm = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const k = [norm(f.nom), norm(f.prenom)].filter(Boolean).join("_");
  return k || "";
}

async function envoyerAuRegistre(manuel) {
  const url = (typeof CONFIG_ACCUEIL !== "undefined" && CONFIG_ACCUEIL.apiUrl) || "";
  if (!url) {
    if (manuel) etatRegistre("⚙️ Aucune URL Apps Script configurée (config.js) — enregistrement désactivé", "#F4A03A");
    return { ok: false, raison: "non-configure" };
  }

  const f = collecterFiche();
  const cle = cleCollaborateur(f);
  if (!cle) {
    etatRegistre("👤 Renseignez le nom et le prénom du collaborateur (étape 1) avant d'enregistrer", "#E63946");
    return { ok: false, raison: "sans-nom" };
  }

  const anomalies = detecterAnomalies(f);
  const payload = {
    action: "accueil-hse",
    ficheId: (typeof CONFIG_ACCUEIL !== "undefined" && CONFIG_ACCUEIL.ficheId) || "accueil-hse",
    version: (typeof CONFIG_ACCUEIL !== "undefined" && CONFIG_ACCUEIL.version) || "",
    key: cle,
    fiche: f,
    anomalies: anomalies,
    formations: formationsAProgrammer(f),
    envoyeLe: new Date().toISOString()
  };

  etatRegistre("⏳ Enregistrement dans le registre CDES…", "#F4A03A");

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // évite le préflight CORS
      body: JSON.stringify(payload)
    });
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || "réponse invalide");

    try { localStorage.setItem("registreEmpreinte", empreinteFiche(f, anomalies)); } catch (e) { console.warn(e); }

    const nb = anomalies.length;
    etatRegistre(
      nb ? `💾 Fiche enregistrée — ${nb} point(s) à régulariser` : "💾 Fiche enregistrée dans le registre CDES",
      nb ? "#F4A03A" : "#2DC653"
    );
    return { ok: true, anomalies: nb };

  } catch (err) {
    console.error(err);
    etatRegistre("⚠️ Enregistrement impossible (" + err.message + ") — le PDF reste disponible", "#E63946");
    return { ok: false, raison: err.message };
  }
}

/* =========================================================
   RÉCAPITULATIF DES ANOMALIES (affiché avant l'export)
   ========================================================= */
function afficherAnomalies() {
  const f = collecterFiche();
  const anomalies = detecterAnomalies(f);
  const zone = document.getElementById("bloc-anomalies");
  if (!zone) return anomalies;

  if (!anomalies.length) {
    zone.className = "ano-box ano-ok";
    zone.innerHTML = `<span class="ano-ico">✅</span>
      <div><span class="bold">Fiche complète</span> — tous les points de l'accueil sont renseignés.</div>`;
    return anomalies;
  }

  const majeures = anomalies.filter(a => a.gravite === "Majeure");
  zone.className = "ano-box " + (majeures.length ? "ano-ko" : "ano-warn");
  zone.innerHTML = `<span class="ano-ico">${majeures.length ? "⛔" : "⚠️"}</span>
    <div>
      <div class="bold">${anomalies.length} point(s) à régulariser${majeures.length ? ` — dont ${majeures.length} majeur(s)` : ""}</div>
      <ul class="ano-liste">
        ${anomalies.map(a => `<li><span class="ano-grav ${a.gravite === "Majeure" ? "g-maj" : "g-min"}">${a.gravite}</span>
          <span class="bold">${a.sujet} :</span> ${a.detail}</li>`).join("")}
      </ul>
    </div>`;
  return anomalies;
}

/* =========================================================
   ENREGISTREMENT AUTOMATIQUE
   Dès que la fiche est signée (nom + les deux signatures),
   elle part dans le registre sans attendre l'export PDF.
   Un envoi n'est refait que si le contenu a changé.
   ========================================================= */

/* Empreinte du contenu : évite les envois inutiles */
function empreinteFiche(f, anomalies) {
  const brut = JSON.stringify([f, anomalies.length]);
  let h = 0;
  for (let i = 0; i < brut.length; i++) {
    h = ((h << 5) - h + brut.charCodeAt(i)) | 0;
  }
  return String(h);
}

/* Conditions minimales pour un enregistrement automatique */
function ficheSignee(f) {
  return !!(f.nom && f.prenom && f.signatureResponsable && f.signatureCollaborateur);
}

let _autoTimer = null;

/* Programme un enregistrement automatique (anti-rafale) */
function planifierAutoEnregistrement(delai) {
  clearTimeout(_autoTimer);
  _autoTimer = setTimeout(autoEnregistrer, delai || 2500);
}

async function autoEnregistrer() {
  const url = (typeof CONFIG_ACCUEIL !== "undefined" && CONFIG_ACCUEIL.apiUrl) || "";
  if (!url) return;

  // On travaille sur le brouillon à jour
  if (typeof savePageContent === "function") {
    try { savePageContent(); } catch (e) { return; }
  }

  const f = collecterFiche();
  if (!ficheSignee(f)) return;

  const anomalies = detecterAnomalies(f);
  const empreinte = empreinteFiche(f, anomalies);
  if (localStorage.getItem("registreEmpreinte") === empreinte) return; // déjà enregistré

  await envoyerAuRegistre(false);
}

/* Envoi à l'export PDF : on saute si le contenu est déjà enregistré */
async function enregistrerSiNecessaire() {
  const url = (typeof CONFIG_ACCUEIL !== "undefined" && CONFIG_ACCUEIL.apiUrl) || "";
  if (!url) return;
  const f = collecterFiche();
  if (!f.nom || !f.prenom) return;
  const empreinte = empreinteFiche(f, detecterAnomalies(f));
  if (localStorage.getItem("registreEmpreinte") === empreinte) return; // rien de neuf
  await envoyerAuRegistre(false);
}

/* Dernier filet : au moment de quitter la page, envoi non bloquant */
function envoiDeSecours() {
  const url = (typeof CONFIG_ACCUEIL !== "undefined" && CONFIG_ACCUEIL.apiUrl) || "";
  if (!url || !navigator.sendBeacon) return;

  if (typeof savePageContent === "function") {
    try { savePageContent(); } catch (e) { return; }
  }

  const f = collecterFiche();
  if (!ficheSignee(f)) return;

  const anomalies = detecterAnomalies(f);
  const empreinte = empreinteFiche(f, anomalies);
  if (localStorage.getItem("registreEmpreinte") === empreinte) return;

  const cle = cleCollaborateur(f);
  if (!cle) return;

  const payload = {
    action: "accueil-hse",
    ficheId: (typeof CONFIG_ACCUEIL !== "undefined" && CONFIG_ACCUEIL.ficheId) || "accueil-hse",
    version: (typeof CONFIG_ACCUEIL !== "undefined" && CONFIG_ACCUEIL.version) || "",
    key: cle,
    fiche: f,
    anomalies: anomalies,
    formations: formationsAProgrammer(f),
    envoyeLe: new Date().toISOString()
  };

  const ok = navigator.sendBeacon(url, new Blob([JSON.stringify(payload)], { type: "text/plain;charset=utf-8" }));
  if (ok) localStorage.setItem("registreEmpreinte", empreinte);
}

/* Surveillance de la page Signatures */
function activerAutoEnregistrement() {
  const page = document.getElementById("page6");
  if (!page) return;

  // Saisies et cases à cocher
  page.addEventListener("change", () => planifierAutoEnregistrement());
  page.addEventListener("input", () => planifierAutoEnregistrement(4000));

  // Fin d'un tracé de signature (le canvas n'émet pas d'événement change)
  ["mouseup", "touchend"].forEach(evt =>
    page.addEventListener(evt, (e) => {
      if (e.target && e.target.tagName === "CANVAS") planifierAutoEnregistrement(1500);
    })
  );

  // Sortie de page
  window.addEventListener("pagehide", envoiDeSecours);

  // Fiche déjà complète à l'ouverture (retour sur la page)
  planifierAutoEnregistrement(3000);
}
