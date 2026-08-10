renderChrome(2);

/* =========================================================
   CATALOGUE DES FORMATIONS / HABILITATIONS PAR CATÉGORIE
   ========================================================= */
const CATEGORIES_FORMATIONS = [
  {
    id: "conduite",
    ico: "🚜",
    titre: "Formations conduite d'équipements",
    sous: "CACES, permis et autorisations de conduite",
    items: [
      { lbl: "Engins compacts < 6t — Engins de chantier TP (R 482)", exi: "CACES A" },
      { lbl: "Pelles mécaniques > 6t — Engins de chantier TP (R 482)", exi: "CACES B1" },
      { lbl: "Pelle à pneus — Engins de chantier TP (R 482)", exi: "CACES B1 + Expérience demandée / Tutorat" },
      { lbl: "Pelle amphibie — Engins de chantier TP (R 482)", exi: "CACES B1 + Expérience demandée / Tutorat" },
      { lbl: "Chargeuses — Engins de chantier TP (R 482)", exi: "CACES C1" },
      { lbl: "Engins de transport (dumper…) — Engins de chantier TP (R 482)", exi: "CACES E" },
      { lbl: "Manitou — Engins de chantier TP (R 482)", exi: "CACES F" },
      { lbl: "Chariot élévateur — Engins logistique (R 489)", exi: "CACES B3" },
      { lbl: "Grue auxiliaire — Grue de chargement (R 490)", exi: "CACES R490" },
      { lbl: "Conduite de pousseurs fluviaux", exi: "Permis PC + Grille Métier Formation au poste" },
      { lbl: "Conduite de véhicule de la société", exi: "Permis B — contrôler le permis de conduire" }
    ]
  },
  {
    id: "particulieres",
    ico: "⚡",
    titre: "Formations particulières",
    sous: "Habilitations et formations spécifiques aux travaux à risque",
    items: [
      { lbl: "Machines / outils portatifs dangereux, travaux divers", exi: "Formation au poste + Vérification des EPI" },
      { lbl: "Travaux forestiers (abattage, tronçonnage…)", exi: "Formation Tronçonnage + Dotation EPI spécifiques" },
      { lbl: "Opérations de levage / élingage", exi: "Formation Élingage" },
      { lbl: "Travaux à proximité de réseaux", exi: "Formation AIPR" },
      { lbl: "Travaux à proximité d'installations électriques", exi: "Habilitation électrique" },
      { lbl: "Travaux en hauteur", exi: "Formation Travail en hauteur + Port du harnais" },
      { lbl: "Travaux en espace confiné", exi: "CATEC" },
      { lbl: "Travaux par points chauds (soudure…)", exi: "Formation Métier au poste" },
      { lbl: "Conduite d'équipements flottants (faucardage)", exi: "Formation Métier au poste" }
    ]
  },
  {
    id: "hse",
    ico: "🩺",
    titre: "Formations HSE",
    sous: "Secourisme, incendie et sécurité générale",
    items: [
      { lbl: "Sauveteur Secouriste du Travail", exi: "Formation SST en cours de validité" },
      { lbl: "Manipulation des extincteurs", exi: "Formation incendie / exercice pratique" }
    ]
  }
];

/* Construit les catégories déroulantes (uniquement si non restaurées) */
function construireFormations() {
  const conteneur = document.getElementById("formations-container");
  if (!conteneur || conteneur.children.length > 0) return;

  conteneur.innerHTML = CATEGORIES_FORMATIONS.map((cat, ci) => `
    <div class="cat-card ${ci === 0 ? "open" : ""}" id="cat-${cat.id}">
      <div class="cat-head" data-accordeon="cat-${cat.id}">
        <span class="cat-ico">${cat.ico}</span>
        <div class="cat-tt">
          <div class="cat-t">${cat.titre}</div>
          <div class="cat-s">${cat.sous}</div>
        </div>
        <span class="cat-count" id="count-${cat.id}">0 / ${cat.items.length}</span>
        <span class="cat-chev">▼</span>
      </div>
      <div class="cat-body">
        ${cat.items.map((item, i) => `
          <div class="formation-row">
            <div class="formation-lbl"><span class="bold">${item.lbl}</span><br><span class="exigence">${item.exi}</span></div>
            <div class="formation-toggles">
              <label class="tgl"><input type="checkbox" class="fx-aut" data-cat="${cat.id}"> Tâche autorisée CDES</label>
              <label class="tgl tgl-vert"><input type="checkbox" class="fx-preuve" data-cat="${cat.id}"> Preuve de formation valide</label>
            </div>
          </div>`).join("")}
      </div>
    </div>`).join("");
}

/* Compteur « x / n autorisées » par catégorie */
function majCompteurs() {
  CATEGORIES_FORMATIONS.forEach(cat => {
    const badge = document.getElementById("count-" + cat.id);
    if (!badge) return;
    const coches = document.querySelectorAll(`.fx-aut[data-cat="${cat.id}"]:checked`).length;
    badge.textContent = `${coches} / ${cat.items.length}`;
    badge.classList.toggle("on", coches > 0);
  });
}

/* Délégation : accordéons + compteurs (résiste à la restauration) */
document.addEventListener("click", (e) => {
  const head = e.target.closest("[data-accordeon]");
  if (head) {
    document.getElementById(head.getAttribute("data-accordeon")).classList.toggle("open");
  }
});

document.addEventListener("change", (e) => {
  if (e.target.classList && e.target.classList.contains("fx-aut")) majCompteurs();
});

/* =========================================================
   SAUVEGARDE / RESTAURATION
   ========================================================= */
function savePageContent() {
    const page = document.querySelector('#page2');
    const inputs = page.querySelectorAll('input, textarea, select, canvas');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.checked) {
                input.setAttribute('checked', 'checked');
            } else {
                input.removeAttribute('checked');
            }
        } else if (input.tagName.toLowerCase() === 'textarea') {
            input.textContent = input.value;
        } else if (input.tagName.toLowerCase() === 'canvas') {
            const dataURL = input.toDataURL("image/png");
            input.setAttribute('data-image', dataURL);
        } else {
            input.setAttribute('value', input.value);
        }
    });
    localStorage.setItem('page2Content', document.querySelector('#page2').outerHTML);
}

function loadPageContent() {
    const savedContent = localStorage.getItem('page2Content');
    if (savedContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(savedContent, 'text/html');
        const newPage = doc.querySelector('#page2');
        if (newPage) {
            document.querySelector('#page2').innerHTML = newPage.innerHTML;
            return true;
        }
    }
    return false;
}

function redirectToAutorisationPage() {
    savePageContent();
    window.location.href = 'security.html';
}

window.onload = function () {
    loadPageContent();
    construireFormations();
    majCompteurs();
}

window.onbeforeunload = function () {
    savePageContent();
}
