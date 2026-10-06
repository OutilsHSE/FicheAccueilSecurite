/* =========================================================
   UI COMMUNE — Accueil HSE CDES
   En-tête, fil d'étapes, navigation, cases exclusives,
   visionneuse de documents et pièces jointes
   ========================================================= */

/* Version du formulaire : si le navigateur contient un brouillon
   enregistré avec une ANCIENNE version des pages, on le purge pour
   éviter de restaurer l'ancienne mise en page. À incrémenter à chaque
   évolution de la structure des pages. */
const FICHE_VERSION = "v5-2026-08";
(function () {
  try {
    if (localStorage.getItem("ficheAccueilVersion") !== FICHE_VERSION) {
      ["page1Content", "page2Content", "page3Content", "page4Content",
       "page5Content", "page6Content", "Nom", "quizzResultat", "activiteCollaborateur", "posteTravail", "registreEmpreinte"].forEach(k => localStorage.removeItem(k));
      localStorage.setItem("ficheAccueilVersion", FICHE_VERSION);
    }
  } catch (e) { console.warn(e); }
})();

/* Démarrage : dès que le HTML est prêt, sans attendre images et scripts
   externes (un CDN filtré par le réseau bloquait l'initialisation). */
function auDemarrage(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
}

/* Écriture d'un brouillon dans le navigateur. L'espace est limité
   (~5 Mo) : si les pièces jointes le saturent, on prévient clairement
   au lieu d'échouer en silence et de perdre la saisie. */
function sauverLocal(cle, valeur) {
  try {
    localStorage.setItem(cle, valeur);
    return true;
  } catch (e) {
    console.warn(e);
    if (!sauverLocal.deja) {
      sauverLocal.deja = true;
      alert("La mémoire du navigateur est saturée : la fiche n'a pas pu être "
        + "enregistrée.\n\nSupprimez quelques pièces jointes (page Autorisations) "
        + "puis réessayez, ou exportez la fiche en PDF tout de suite pour ne rien perdre.");
    }
    return false;
  }
}

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

/* Sources possibles pour l'aperçu d'un document Drive.
   On les essaie dans l'ordre : Google renvoie parfois une erreur sur
   l'une et pas sur l'autre selon le type de fichier et le partage. */
function driveThumbs(url, largeur) {
  const id = driveId(url);
  if (!id) return [];
  const w = largeur || 300;
  return [
    `https://lh3.googleusercontent.com/d/${id}=w${w}`,
    `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`,
    `https://drive.google.com/thumbnail?authuser=0&sz=w${w}&id=${id}`
  ];
}

/* Enchaîne les sources d'aperçu, puis l'icône générique en dernier recours */
function chaineApercu(img, sources, secours) {
  let i = 0;
  img.onerror = function () {
    i++;
    if (i < sources.length) {
      this.src = sources[i];
    } else {
      this.onerror = null;
      this.classList.add("apercu-indispo");
      if (secours) this.src = secours;
    }
  };
  img.src = sources.length ? sources[0] : secours;
}

/* Crée une vignette de document : aperçu du document + zoom au clic */
function vignetteDoc(lienDrive, classe) {
  const img = document.createElement("img");
  img.className = classe || "doc-vignette";
  img.alt = "Fiche de risque";
  img.loading = "lazy";
  img.referrerPolicy = "no-referrer";
  img.setAttribute("data-lien", lienDrive);
  chaineApercu(img, driveThumbs(lienDrive, 300), "img/doc.png");
  return img;
}

/* Visionneuse plein écran : aperçu réel du document (iframe Drive),
   avec l'image en secours si l'aperçu est bloqué */
function ouvrirLightbox(lienDrive) {
  let lb = document.getElementById("lightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.id = "lightbox";
    lb.className = "lightbox no-print";
    lb.innerHTML = `<span class="lb-close">&times;</span>
      <div class="lb-cadre">
        <iframe class="lb-frame" allow="autoplay" referrerpolicy="no-referrer"></iframe>
        <img class="lb-img" alt="Aperçu de la fiche de risque" referrerpolicy="no-referrer">
      </div>
      <a class="lb-open" target="_blank" rel="noopener">📄 Ouvrir dans Drive</a>`;
    lb.addEventListener("click", (e) => {
      if (e.target === lb || e.target.classList.contains("lb-close")) fermerLightbox();
    });
    document.body.appendChild(lb);
  }

  const id = driveId(lienDrive);
  const frame = lb.querySelector(".lb-frame");
  const img = lb.querySelector(".lb-img");

  // Aperçu intégré du document (rendu réel de la fiche, zoomable)
  if (id) {
    frame.style.display = "block";
    img.style.display = "none";
    frame.src = `https://drive.google.com/file/d/${id}/preview`;
  } else {
    frame.style.display = "none";
    frame.removeAttribute("src");
    img.style.display = "block";
    chaineApercu(img, driveThumbs(lienDrive, 1200), "img/doc.png");
  }

  lb.querySelector(".lb-open").href = lienDrive;
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function fermerLightbox() {
  const lb = document.getElementById("lightbox");
  if (!lb) return;
  lb.classList.remove("open");
  const frame = lb.querySelector(".lb-frame");
  if (frame) frame.removeAttribute("src"); // stoppe le chargement
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fermerLightbox();
});

/* Initialise les vignettes écrites en dur dans le HTML (pages statiques) */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img.doc-vignette[data-lien]:not([src])").forEach(img => {
    img.referrerPolicy = "no-referrer";
    chaineApercu(img, driveThumbs(img.getAttribute("data-lien"), 300), "img/doc.png");
  });
});

/* Délégation : clic sur une vignette → zoom */
document.addEventListener("click", (e) => {
  if (e.target.classList && e.target.classList.contains("doc-vignette")) {
    const lien = e.target.getAttribute("data-lien");
    if (lien) { e.preventDefault(); e.stopPropagation(); ouvrirLightbox(lien); }
  }
});

/* Réduit une photo (appareil photo de téléphone = 3 à 5 Mo) avant de la
   stocker : au-delà, le brouillon dépasse la mémoire du navigateur.
   1400 px de large et une qualité JPEG de 0,72 restent parfaitement
   lisibles pour un permis, une carte ou une attestation. */
function alleger(dataURL, retour) {
  const img = new Image();
  img.onload = function () {
    try {
      const maxi = 1400;
      const ratio = Math.min(1, maxi / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * ratio);
      c.height = Math.round(img.height * ratio);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      retour(c.toDataURL("image/jpeg", 0.72));
    } catch (e) {
      console.warn(e);
      retour(dataURL);
    }
  };
  img.onerror = function () { retour(dataURL); };
  img.src = dataURL;
}

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
    const estPdf = fichier.type === "application/pdf" || /\.pdf$/i.test(fichier.name);

    /* Un PDF ne peut pas être allégé : au-delà de 2 Mo il saturerait à lui
       seul la mémoire du navigateur et ferait perdre la fiche. */
    if (estPdf && fichier.size > 2 * 1024 * 1024) {
      alert("Le document « " + fichier.name + " » est trop lourd ("
        + Math.round(fichier.size / 1024 / 1024 * 10) / 10
        + " Mo).\n\nMerci de joindre un PDF de moins de 2 Mo, ou une photo du document.");
      return;
    }

    const lecteur = new FileReader();

    lecteur.onload = function (ev) {
      const poser = function (donnees) {
        const carte = document.createElement("div");
        carte.className = "photo-thumb";

        if (estPdf) {
          const lien = document.createElement("a");
          lien.href = donnees;
          lien.download = fichier.name;
          lien.className = "pj-pdf";
          const ico = document.createElement("span");
          ico.className = "pj-pdf-ico";
          ico.textContent = "📄";
          const nom = document.createElement("span");
          nom.className = "pj-pdf-nom";
          nom.textContent = fichier.name;   // textContent : un nom de fichier n'est pas du HTML
          lien.appendChild(ico);
          lien.appendChild(nom);
          carte.appendChild(lien);
        } else {
          const img = document.createElement("img");
          img.src = donnees;
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

      if (estPdf) poser(ev.target.result);
      else alleger(ev.target.result, poser);   // photo de téléphone = plusieurs Mo : on redimensionne
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
