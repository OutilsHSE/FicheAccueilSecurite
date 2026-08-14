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
