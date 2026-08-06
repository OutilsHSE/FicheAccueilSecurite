/* =========================================================
   UI COMMUNE — Accueil HSE CDES
   En-tête, fil d'étapes, navigation et cases exclusives
   ========================================================= */

const ETAPES_ACCUEIL = [
  { titre: "Informations",  url: "index.html" },
  { titre: "Autorisations", url: "autorisation.html" },
  { titre: "Équipements",   url: "security.html" },
  { titre: "Risques",       url: "risk.html" },
  { titre: "Consignes",     url: "instruction.html" },
  { titre: "Signatures",    url: "sign.html" }
];

/* Navigation avec sauvegarde de la page en cours (si disponible) */
function navTo(url) {
  if (typeof savePageContent === "function") {
    try { savePageContent(); } catch (e) { console.warn(e); }
  }
  window.location.href = url;
}

/* En-tête + fil d'étapes injectés en haut de page */
function renderChrome(etapeCourante) {
  const total = ETAPES_ACCUEIL.length;

  const header = document.createElement("header");
  header.className = "app-header no-print";
  header.innerHTML = `
    <div class="header-inner">
      <div class="header-logo">
        <img src="img/CDES_Logo_blanc.png" alt="CDES">
        <div class="header-title">
          <h1>Accueil HSE des nouveaux arrivants</h1>
          <p>CDES — Parcours d'intégration sécurité</p>
        </div>
      </div>
      <div class="header-step">
        <span class="step-label">Étape</span>
        <span class="step-value">${etapeCourante} / ${total}</span>
      </div>
    </div>`;

  const stepper = document.createElement("nav");
  stepper.className = "stepper no-print";
  stepper.innerHTML = ETAPES_ACCUEIL.map((e, i) => {
    const num = i + 1;
    const etat = num === etapeCourante ? "active" : (num < etapeCourante ? "done" : "");
    const coche = num < etapeCourante ? "✓" : num;
    return `<a class="step ${etat}" onclick="navTo('${e.url}')"><span class="num">${coche}</span>${e.titre}</a>`;
  }).join("");

  document.body.insertBefore(stepper, document.body.firstChild);
  document.body.insertBefore(header, document.body.firstChild);
}

/* Cases à cocher exclusives : data-exclusive="nom-du-groupe" */
document.addEventListener("change", (e) => {
  const t = e.target;
  if (t.matches && t.matches('input[type="checkbox"][data-exclusive]') && t.checked) {
    const groupe = t.getAttribute("data-exclusive");
    document.querySelectorAll(`input[data-exclusive="${groupe}"]`).forEach(o => {
      if (o !== t) o.checked = false;
    });
  }
});
