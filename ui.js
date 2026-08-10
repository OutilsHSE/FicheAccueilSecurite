/* =========================================================
   UI COMMUNE — Accueil HSE CDES
   En-tête, fil d'étapes, navigation, cases exclusives,
   visionneuse de documents et pièces jointes
   ========================================================= */

/* Version du formulaire : si le navigateur contient un brouillon
   enregistré avec une ANCIENNE version des pages, on le purge pour
   éviter de restaurer l'ancienne mise en page. À incrémenter à chaque
   évolution de la structure des pages. */
const FICHE_VERSION = "v4-2026-08";
(function () {
  try {
    if (localStorage.getItem("ficheAccueilVersion") !== FICHE_VERSION) {
      ["page1Content", "page2Content", "page3Content", "page4Content",
       "page5Content", "page6Content", "Nom", "quizzResultat", "activiteCollaborateur"].forEach(k => localStorage.removeItem(k));
      localStorage.setItem("ficheAccueilVersion", FICHE_VERSION);
    }
  } catch (e) { console.warn(e); }
})();

const ETAPES_ACCUEIL = [
  { titre: "Collaborateur",  url: "index.html" },
  { titre: "Autorisations",  url: "autorisation.html" },
  { titre: "Équipements",    url: "security.html" },
  { titre: "Risques",        url: "risk.html" },
  { titre: "Consignes",      url: "instruction.html" },
  { titre: "Signatures",     url: "sign.html" }
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
        <div class="header-badge" title="Fiche d'accueil sécurité">🦺</div>
        <div class="header-title">
          <h1>Accueil HSE des nouveaux arrivants</h1>
          <span class="header-tag">⛑️ Fiche d'accueil sécurité</span>
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

/* =========================================================
   VIGNETTES GOOGLE DRIVE + VISIONNEUSE (zoom)
   ========================================================= */

/* Extrait l'identifiant d'un lien Google Drive */
function driveId(url) {
  const m = (url || "").match(/\/d\/([\w-]{20,})/);
  return m ? m[1] : null;
}

/* URL de miniature Drive (fichier partagé par lien) */
function driveThumb(url, largeur) {
  const id = driveId(url);
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w${largeur || 300}` : null;
}

/* Crée une vignette de document : aperçu + zoom au clic, icône en secours */
function vignetteDoc(lienDrive, classe) {
  const thumb = driveThumb(lienDrive, 200);
  const img = document.createElement("img");
  img.className = classe || "doc-vignette";
  img.alt = "Document";
  img.loading = "lazy";
  img.setAttribute("data-lien", lienDrive);
  img.src = thumb || "img/doc.png";
  img.onerror = function () { this.onerror = null; this.src = "img/doc.png"; };
  return img;
}

/* Visionneuse plein écran */
function ouvrirLightbox(lienDrive) {
  let lb = document.getElementById("lightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.id = "lightbox";
    lb.className = "lightbox no-print";
    lb.innerHTML = `<span class="lb-close">&times;</span><img alt="Aperçu du document"><a class="lb-open" target="_blank">📄 Ouvrir le document</a>`;
    lb.addEventListener("click", (e) => {
      if (e.target === lb || e.target.classList.contains("lb-close")) lb.classList.remove("open");
    });
    document.body.appendChild(lb);
  }
  const grand = driveThumb(lienDrive, 1200);
  const img = lb.querySelector("img");
  img.onerror = function () { this.onerror = null; this.src = "img/doc.png"; };
  img.src = grand || "img/doc.png";
  lb.querySelector(".lb-open").href = lienDrive;
  lb.classList.add("open");
}

/* Délégation : clic sur une vignette → zoom */
document.addEventListener("click", (e) => {
  if (e.target.classList && e.target.classList.contains("doc-vignette")) {
    const lien = e.target.getAttribute("data-lien");
    if (lien) { e.preventDefault(); e.stopPropagation(); ouvrirLightbox(lien); }
  }
});

/* =========================================================
   PIÈCES JOINTES (photos + PDF) — délégation d'événements
   (survit à la restauration du brouillon)
   ========================================================= */
document.addEventListener("change", (e) => {
  const t = e.target;
  if (!t.matches || !t.matches('input[type="file"].piece-jointe')) return;

  const conteneur = document.getElementById(t.getAttribute("data-cible") || "photo-container");
  if (!conteneur) return;

  Array.from(t.files).forEach((fichier) => {
    const lecteur = new FileReader();
    const estPdf = fichier.type === "application/pdf" || /\.pdf$/i.test(fichier.name);

    lecteur.onload = function (ev) {
      const carte = document.createElement("div");
      carte.className = "photo-thumb";

      if (estPdf) {
        const lien = document.createElement("a");
        lien.href = ev.target.result;
        lien.download = fichier.name;
        lien.className = "pj-pdf";
        lien.innerHTML = `<span class="pj-pdf-ico">📄</span><span class="pj-pdf-nom">${fichier.name}</span>`;
        carte.appendChild(lien);
      } else {
        const img = document.createElement("img");
        img.src = ev.target.result;
        img.alt = fichier.name;
        carte.appendChild(img);
      }

      const btn = document.createElement("button");
      btn.textContent = "✕";
      btn.className = "del-photo no-print";
      btn.type = "button";
      carte.appendChild(btn);

      conteneur.appendChild(carte);
    };

    lecteur.readAsDataURL(fichier);
  });

  t.value = "";
});

/* Délégation : suppression et zoom des pièces jointes */
document.addEventListener("click", (e) => {
  if (e.target.classList && e.target.classList.contains("del-photo")) {
    e.target.closest(".photo-thumb").remove();
  } else if (e.target.tagName === "IMG" && e.target.closest(".photo-thumb")) {
    const w = window.open("", "_blank");
    if (w) w.document.write('<img src="' + e.target.src + '" style="max-width:100%">');
  }
});
