const postesData = {
  conducteurs_tp: {
    risques: [
      "Circulation en engins TP",
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Ordre et propreté sur le chantier",
      "Risque électrique",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Produits chimiques"
    ],
    formations: ["/"]
  },

  equipements_fluviaux: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque électrique",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Produits chimiques"
    ],
    formations: ["Formation Pousseurs"]
  },

  marinier: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque électrique",
      "Risques de chute de plain-pied",
      "Risques de chute de hauteur / échelle",
      "Produits chimiques"
    ],
    formations: ["/"]
  },

  chauffeur_pl: {
    risques: [
      "Circulation en engins TP",
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Risques de chute de hauteur",
      "Produits chimiques"
    ],
    formations: [
      "Évaluation des risques Chauffeurs PL",
      "Formation Grue auxiliaire"
    ]
  },
  mecanicien: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI Atelier",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque électrique",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Risque de chute de hauteur",
      "Produits chimiques",
    ],
    formations: ["Évaluation des risques Atelier"]
  },
  soudeur: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI Atelier",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque électrique",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Risque de chute de hauteur",
      "Produits chimiques",
    ],
    formations: ["Formation Soudeur","Évaluation des risques Atelier"]
  },
  travaux_forestiers: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risques de chute de plain-pied",
      "Risque de chute de hauteur",
      "Produits chimiques",
    ],
    formations: ["Formation travaux_forestiers"]
  },
    operateurs_polyvalents: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Produits chimiques"
    ],
    formations: ["/"]
  },  
  intervenant_bathy_topo: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque routier"
    ],
    formations: ["Formation Bathy/Topo"]
  },
    intervenant_tereos: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque électrique",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Risque de chute de hauteur",
      "Produits chimiques",
    ],
    formations: ["Formation TEREOS"]
  },
};

const postesContainer = document.getElementById("postes-container");
const addBtn = document.getElementById("add-poste");
let posteCount = 1;

// Fonction qui crée le tableau
function createTable(posteKey, container) {
  const data = postesData[posteKey];
  if (!data) return;

  container.innerHTML = `
    <table>
      <tr>
        <th>Poste de travail</th>
        <th>Fiches de risques</th>
        <th>Fiches de formations</th>
      </tr>
      <tr>
        <td>${getPosteName(posteKey)}</td>
        <td>${data.risques.map(r => `<label><input type="checkbox"> ${r}</label><br>`).join("")}</td>
        <td>${data.formations.map(f => `<label><input type="checkbox"> ${f}</label><br>`).join("")}</td>
      </tr>
    </table>
  `;
}

// Renvoie le nom complet du poste
function getPosteName(key) {
  const map = {
    conducteurs_tp: "Conducteurs d’engins TP",
    equipements_fluviaux: "Conducteurs équipements fluviaux / maritime",
    marinier: "Marinier / Conducteur de Bateaux Freycinet",
    chauffeur_pl: "Chauffeur PL / Utilisateur de grue auxiliaire",
    mecanicien: "Mécanicien",
    soudeur:"Soudeur",
    travaux_forestiers: "Travaux forestiers",
    operateurs_polyvalents:"Opérateurs polyvalents",
    intervenant_bathy_topo:"Intervenant Cellule Bathy / Topo",
    intervenant_tereos:"Intervenant TEREOS"
  };
  return map[key] || key;
}

// Gestion du premier select
document.querySelector(".poste-select").addEventListener("change", function () {
  const tableContainer = this.parentElement.querySelector(".table-container");
  tableContainer.innerHTML = "";
  if (this.value) createTable(this.value, tableContainer);
});

// Ajouter un nouveau sélecteur
addBtn.addEventListener("click", () => {
  if (posteCount >= 3) {
    alert("Vous pouvez ajouter jusqu’à 3 postes maximum.");
    return;
  }

  const newBlock = document.createElement("div");
  newBlock.classList.add("poste-block");
  newBlock.innerHTML = `
    <label><b>Poste de Travail :</b></label>
    <select class="poste-select">
      <option value="">-- Sélectionner un poste --</option>
      <option value="conducteurs_tp">Conducteurs d’engins TP</option>
      <option value="equipements_fluviaux">Conducteurs équipements fluviaux / maritime</option>
      <option value="marinier">Marinier / Conducteur de Bateaux Freycinet</option>
      <option value="chauffeur_pl">Chauffeur PL / Utilisateur de grue auxiliaire</option>
      <option value="mecanicien">Mécanicien</option>
      <option value="soudeur">Soudeur</option>
      <option value="travaux_forestiers">Travaux forestiers</option>
      <option value="operateurs_polyvalents">Opérateurs polyvalents</option>
      <option value="intervenant_bathy_topo">Intervenant Cellule Bathy / Topo</option>
      <option value="intervenant_tereos">Intervenant TEREOS</option>
    </select>
    <div class="table-container"></div>
  `;

  // Sélectionne le dernier bloc de poste existant
  const lastBlock = postesContainer.querySelector(".poste-block:last-of-type");

  // Insère le nouveau sélecteur juste après le précédent sélecteur, avant le tableau
  lastBlock.parentNode.insertBefore(newBlock, lastBlock.nextSibling);

  // Événement pour afficher le tableau dès qu’un poste est choisi
  newBlock.querySelector(".poste-select").addEventListener("change", function () {
    const tableContainer = this.parentElement.querySelector(".table-container");
    tableContainer.innerHTML = "";
    if (this.value) createTable(this.value, tableContainer);
  });

  posteCount++;
});

function setupCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    let painting = false;

    function startPosition(e) {
      painting = true;
      draw(e);
      e.preventDefault(); // Empêche le comportement par défaut
    }

    function endPosition(e) {
      painting = false;
      ctx.beginPath();
      e.preventDefault(); // Empêche le comportement par défaut
    }

    function draw(e) {
      if (!painting) return;
      const rect = canvas.getBoundingClientRect();
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';

      let clientX, clientY;
      if (e.touches && e.touches.length > 0) {
        // Utiliser les coordonnées du premier touch point
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        // Utiliser les coordonnées de la souris
        clientX = e.clientX;
        clientY = e.clientY;
      }

      ctx.lineTo(clientX - rect.left, clientY - rect.top);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(clientX - rect.left, clientY - rect.top);
      e.preventDefault(); // Empêche le comportement par défaut
    }

    // Ajouter des écouteurs pour les événements de souris
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mouseout', endPosition);
    canvas.addEventListener('mousemove', draw);

    // Ajouter des écouteurs pour les événements tactiles
    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('touchend', endPosition);
    canvas.addEventListener('touchcancel', endPosition);
    canvas.addEventListener('touchmove', draw);
  }

  // Initialisation
  setupCanvas('drawingCanvas1');

  // Bouton pour effacer
  function clearCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
   function savePageContent() {
        const page = document.querySelector('#page4');
        const inputs = page.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                if (input.checked) {
                    input.setAttribute('checked', 'checked');
                } else {
                    input.removeAttribute('checked');
                }
            } else {
                input.setAttribute('value', input.value);
            }
        });
        localStorage.setItem('page4Content', document.querySelector('#page4').outerHTML);
    }

    function loadPageContent() {
        // Restaurer le contenu HTML de la page avec les valeurs des champs
        const savedContent = localStorage.getItem('page4Content');
        if (savedContent) {
            document.querySelector('#page4').outerHTML = savedContent;
        }
    }

    function redirectToSignPage() {
        savePageContent();
        window.location.href = 'sign.html';
    }

    window.onload = function () {
        loadPageContent();
    }

    window.onbeforeunload = function () {
        savePageContent();
    }