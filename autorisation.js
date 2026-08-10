renderChrome(2);

/* =========================================================
   ACTIVITÉS CDES — servent à filtrer les formations
   ========================================================= */
const ACTIVITES = [
  { id: "conducteur_tp",      lbl: "Conducteur d'engins TP" },
  { id: "conducteur_fluvial", lbl: "Conducteur d'équipements fluviaux / faucardage" },
  { id: "marinier",           lbl: "Marinier / conducteur de bateau" },
  { id: "chauffeur_pl",       lbl: "Chauffeur PL / grue auxiliaire" },
  { id: "mecanicien",         lbl: "Mécanicien / atelier" },
  { id: "soudeur",            lbl: "Soudeur" },
  { id: "forestier",          lbl: "Travaux forestiers" },
  { id: "polyvalent",         lbl: "Opérateur polyvalent" },
  { id: "bathy_topo",         lbl: "Intervenant bathymétrie / topographie" },
  { id: "encadrant",          lbl: "Encadrant / conducteur de travaux" }
];

/* =========================================================
   CATALOGUE DES FORMATIONS / HABILITATIONS PAR CATÉGORIE
   ico  : émoji (remplaçable par une image via le champ img)
   img  : chemin d'une image de la banque CDES (prioritaire sur ico)
   act  : activités concernées (filtre)
   ========================================================= */
const CATEGORIES_FORMATIONS = [
  {
    id: "conduite",
    ico: "🚜",
    titre: "Formations conduite d'équipements",
    sous: "CACES, permis et autorisations de conduite",
    items: [
      { ico: "🚜", lbl: "Engins compacts < 6t — Engins de chantier TP (R 482)", exi: "CACES A", act: ["conducteur_tp", "polyvalent"] },
      { ico: "🏗️", lbl: "Pelles mécaniques > 6t — Engins de chantier TP (R 482)", exi: "CACES B1", act: ["conducteur_tp"] },
      { ico: "🏗️", lbl: "Pelle à pneus — Engins de chantier TP (R 482)", exi: "CACES B1 + Expérience demandée / Tutorat", act: ["conducteur_tp"] },
      { ico: "🛥️", lbl: "Pelle amphibie — Engins de chantier TP (R 482)", exi: "CACES B1 + Expérience demandée / Tutorat", act: ["conducteur_tp", "conducteur_fluvial"] },
      { ico: "🚧", lbl: "Chargeuses — Engins de chantier TP (R 482)", exi: "CACES C1", act: ["conducteur_tp"] },
      { ico: "🚛", lbl: "Engins de transport (dumper…) — Engins de chantier TP (R 482)", exi: "CACES E", act: ["conducteur_tp", "chauffeur_pl"] },
      { ico: "🏋️", lbl: "Manitou / chariot télescopique — Engins de chantier TP (R 482)", exi: "CACES F", act: ["conducteur_tp", "polyvalent"] },
      { ico: "📦", lbl: "Chariot élévateur — Engins de manutention (R 489)", exi: "CACES catégorie 3", act: ["mecanicien", "polyvalent", "chauffeur_pl"] },
      { ico: "🪝", lbl: "Grue auxiliaire — Grue de chargement (R 490)", exi: "CACES R490", act: ["chauffeur_pl"] },
      { ico: "🚢", lbl: "Conduite de pousseurs fluviaux", exi: "Permis PC + Grille Métier Formation au poste", act: ["marinier", "conducteur_fluvial"] },
      { ico: "🚐", lbl: "Conduite de véhicule de la société", exi: "Permis B — contrôler le permis de conduire", act: ["conducteur_tp", "conducteur_fluvial", "marinier", "chauffeur_pl", "mecanicien", "soudeur", "forestier", "polyvalent", "bathy_topo", "encadrant"] }
    ]
  },
  {
    id: "particulieres",
    ico: "⚡",
    titre: "Formations particulières",
    sous: "Habilitations et formations spécifiques aux travaux à risque",
    items: [
      { ico: "🔧", lbl: "Machines / outils portatifs dangereux, travaux divers", exi: "Formation au poste + Vérification des EPI", act: ["mecanicien", "polyvalent", "soudeur", "forestier"] },
      { ico: "🌲", lbl: "Travaux forestiers (abattage, tronçonnage…)", exi: "Formation Tronçonnage + Dotation EPI spécifiques", act: ["forestier", "polyvalent"] },
      { ico: "⛓️", lbl: "Opérations de levage / élingage", exi: "Formation Élingage", act: ["conducteur_tp", "chauffeur_pl", "mecanicien", "polyvalent", "marinier"] },
      { ico: "🕳️", lbl: "Travaux à proximité de réseaux", exi: "Formation AIPR", act: ["conducteur_tp", "encadrant", "polyvalent"] },
      { ico: "⚡", lbl: "Travaux à proximité d'installations électriques", exi: "Habilitation électrique", act: ["mecanicien", "marinier", "conducteur_fluvial"] },
      { ico: "🪜", lbl: "Travaux en hauteur", exi: "Formation Travail en hauteur + Port du harnais", act: ["mecanicien", "marinier", "polyvalent", "soudeur"] },
      { ico: "🚪", lbl: "Travaux en espace confiné", exi: "CATEC", act: ["mecanicien", "polyvalent"] },
      { ico: "🔥", lbl: "Travaux par points chauds (soudure…)", exi: "Formation Métier au poste", act: ["soudeur", "mecanicien"] },
      { ico: "🌊", lbl: "Conduite d'équipements flottants (faucardage)", exi: "Formation Métier au poste", act: ["conducteur_fluvial", "marinier"] }
    ]
  },
  {
    id: "hse",
    ico: "🩺",
    titre: "Formations HSE",
    sous: "Secourisme, incendie et sécurité générale",
    items: [
      { ico: "🚑", lbl: "Sauveteur Secouriste du Travail", exi: "Formation SST en cours de validité", act: ["conducteur_tp", "conducteur_fluvial", "marinier", "chauffeur_pl", "mecanicien", "soudeur", "forestier", "polyvalent", "bathy_topo", "encadrant"] },
      { ico: "🧯", lbl: "Manipulation des extincteurs", exi: "Formation incendie / exercice pratique", act: ["conducteur_tp", "conducteur_fluvial", "marinier", "chauffeur_pl", "mecanicien", "soudeur", "forestier", "polyvalent", "bathy_topo", "encadrant"] }
    ]
  }
];

/* Icône : image de la banque CDES si fournie, sinon émoji */
function iconeHtml(item, classe) {
  return item.img
    ? `<img class="${classe}-img" src="${item.img}" alt="">`
    : `<span class="${classe}">${item.ico}</span>`;
}

/* Remplit la liste déroulante des activités */
function construireActivites() {
  const sel = document.getElementById("activite-filtre");
  if (!sel || sel.options.length > 1) return;
  ACTIVITES.forEach(a => {
    const o = document.createElement("option");
    o.value = a.id;
    o.textContent = a.lbl;
    sel.appendChild(o);
  });
}

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
        ${cat.items.map((item) => `
          <div class="formation-row" data-act="${item.act.join(" ")}">
            ${iconeHtml(item, "formation-ico")}
            <div class="formation-lbl"><span class="bold">${item.lbl}</span><br><span class="exigence">${item.exi}</span></div>
            <div class="formation-toggles">
              <label class="tgl"><input type="checkbox" class="fx-aut" data-cat="${cat.id}"> Tâche autorisée CDES</label>
              <label class="tgl tgl-vert"><input type="checkbox" class="fx-preuve" data-cat="${cat.id}"> Preuve de formation valide</label>
            </div>
          </div>`).join("")}
        <div class="cat-vide" id="vide-${cat.id}">Aucune formation de cette catégorie pour l'activité sélectionnée.</div>
      </div>
    </div>`).join("");
}

/* Filtre les formations selon l'activité choisie */
function filtrerFormations() {
  const sel = document.getElementById("activite-filtre");
  const voirTout = document.getElementById("voir-tout");
  if (!sel) return;

  const activite = sel.value;
  const tout = !activite || (voirTout && voirTout.checked);

  CATEGORIES_FORMATIONS.forEach(cat => {
    const carte = document.getElementById("cat-" + cat.id);
    if (!carte) return;
    let visibles = 0;

    carte.querySelectorAll(".formation-row").forEach(ligne => {
      const concerne = tout || (ligne.getAttribute("data-act") || "").split(" ").includes(activite);
      // Une formation déjà cochée reste toujours visible
      const cochee = !!ligne.querySelector(".fx-aut:checked, .fx-preuve:checked");
      const afficher = concerne || cochee;
      ligne.style.display = afficher ? "" : "none";
      ligne.classList.toggle("hors-activite", !concerne && cochee);
      if (afficher) visibles++;
    });

    const vide = document.getElementById("vide-" + cat.id);
    if (vide) vide.style.display = visibles === 0 ? "" : "none";

    // On ouvre les catégories qui ont du contenu, on ferme les vides
    if (voirTout && voirTout.checked) carte.classList.add("open");
    else if (activite) carte.classList.toggle("open", visibles > 0);
  });

  majCompteurs();
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

/* Délégation : accordéons */
document.addEventListener("click", (e) => {
  const head = e.target.closest("[data-accordeon]");
  if (head) {
    document.getElementById(head.getAttribute("data-accordeon")).classList.toggle("open");
  }
});

document.addEventListener("change", (e) => {
  if (e.target.id === "activite-filtre" || e.target.id === "voir-tout") filtrerFormations();
  else if (e.target.classList && e.target.classList.contains("fx-aut")) majCompteurs();
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
        } else if (input.tagName.toLowerCase() === 'select') {
            input.querySelectorAll('option').forEach(opt => {
                if (opt.value === input.value) {
                    opt.setAttribute('selected', 'selected');
                } else {
                    opt.removeAttribute('selected');
                }
            });
        } else if (input.tagName.toLowerCase() === 'canvas') {
            input.setAttribute('data-image', input.toDataURL("image/png"));
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
    construireActivites();
    construireFormations();

    // Pré-sélection de l'activité d'après la page 1 (si renseignée)
    const sel = document.getElementById('activite-filtre');
    if (sel && !sel.value) {
        const activitePage1 = (localStorage.getItem('activiteCollaborateur') || '').toLowerCase();
        const trouve = ACTIVITES.find(a => activitePage1 && a.lbl.toLowerCase().includes(activitePage1));
        if (trouve) sel.value = trouve.id;
    }

    filtrerFormations();
}

window.onbeforeunload = function () {
    savePageContent();
}
