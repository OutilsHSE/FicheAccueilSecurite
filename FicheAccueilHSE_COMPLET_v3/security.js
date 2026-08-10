renderChrome(3);

/* =========================================================
   SCHÉMA EPI INTERACTIF (façon fiche faucardage)
   side : L/R (colonne de la puce), top : position verticale (%),
   ax/ay : point d'ancrage de la flèche sur le personnage (%)
   ========================================================= */
const EPI_ITEMS = [
  { ico: "⛑️", lbl: "Casque avec visière de protection",  side: "L", top: 0,  ax: 47, ay: 8 },
  { ico: "🎧", lbl: "Protection contre le bruit (casque, bouchons moulés)", side: "R", top: 0,  ax: 56, ay: 12 },
  { ico: "🛟", lbl: "Gilet de sauvetage", side: "L", top: 24, ax: 45, ay: 28 },
  { ico: "🦺", lbl: "Vêtements de travail haute visibilité", side: "R", top: 24, ax: 61, ay: 40 },
  { ico: "🧤", lbl: "Gants de protection étanches (manutention, produits chimiques)", side: "L", top: 48, ax: 38, ay: 60 },
  { ico: "🧥", lbl: "Vêtements de pluie", side: "R", top: 48, ax: 62, ay: 52 },
  { ico: "👢", lbl: "Bottes de sécurité", side: "L", top: 74, ax: 44, ay: 93 },
  { ico: "👟", lbl: "Chaussures de sécurité montantes", side: "R", top: 74, ax: 56, ay: 93 }
];

const EQUIPEMENTS_HSE = [
  { ico: "🩹", lbl: "Trousse de secours" },
  { ico: "🌉", lbl: "Passerelle de chantier" },
  { ico: "🔦", lbl: "Lampe frontale" },
  { ico: "🛢️", lbl: "Bac de rétention souple" },
  { ico: "📦", lbl: "Caisse de stockage des DIS" }
];

function triHtml(groupe) {
  return `<span class="tri">
    <label class="t-oui"><input type="checkbox" class="tri-oui" data-exclusive="${groupe}"> Oui</label>
    <label class="t-non"><input type="checkbox" class="tri-non" data-exclusive="${groupe}"> Non</label>
    <label class="t-nn"><input type="checkbox" class="tri-nn" data-exclusive="${groupe}"> N.N.</label>
  </span>`;
}

/* Construit le schéma EPI (uniquement si non restauré) */
function construireEpi() {
  const fig = document.getElementById("epi-fig");
  const svg = document.getElementById("epi-lines");
  if (!fig || fig.querySelector(".epi-chip")) return;

  EPI_ITEMS.forEach((e, i) => {
    const chip = document.createElement("div");
    chip.className = "epi-chip " + (e.side === "L" ? "cl" : "cr");
    chip.style.top = e.top + "%";
    chip.id = "chip-epi" + i;
    chip.innerHTML = `
      <div class="epi-chip-top">
        <span class="epi-chip-ico">${e.ico}</span>
        <span class="epi-chip-lbl">${e.lbl}</span>
      </div>
      ${triHtml("epi" + i)}`;
    fig.appendChild(chip);

    const startX = e.side === "L" ? 28 : 72;
    const startY = e.top + 7;
    svg.innerHTML += `<line id="el${i}" x1="${startX}" y1="${startY}" x2="${e.ax}" y2="${e.ay}"/><circle id="ec${i}" cx="${e.ax}" cy="${e.ay}" r="1.1"/>`;
  });
}

/* Construit la liste des équipements HSE (uniquement si non restaurée) */
function construireEquipements() {
  const conteneur = document.getElementById("equipements-hse");
  if (!conteneur || conteneur.children.length > 0) return;
  conteneur.innerHTML = EQUIPEMENTS_HSE.map((e, i) => `
    <div class="equip-row">
      <span class="equip-ico">${e.ico}</span>
      <span class="equip-lbl">${e.lbl}</span>
      ${triHtml("hse" + i)}
    </div>`).join("");
}

/* Met à jour les couleurs des chips et des flèches selon l'état */
function majEpi() {
  EPI_ITEMS.forEach((_, i) => {
    const chip = document.getElementById("chip-epi" + i);
    const ligne = document.getElementById("el" + i);
    const point = document.getElementById("ec" + i);
    if (!chip) return;

    const oui = chip.querySelector(".tri-oui")?.checked;
    const non = chip.querySelector(".tri-non")?.checked;
    const nn = chip.querySelector(".tri-nn")?.checked;

    chip.classList.toggle("ok", !!oui);
    chip.classList.toggle("ko", !!non);
    chip.classList.toggle("na", !!nn);

    if (ligne) {
      ligne.classList.toggle("ok", !!oui);
      ligne.classList.toggle("ko", !!non);
      ligne.classList.toggle("na", !!nn);
    }
    if (point) {
      point.classList.toggle("ok", !!oui);
      point.classList.toggle("ko", !!non);
      point.classList.toggle("na", !!nn);
    }
  });
}

/* Délégation : tout changement de tri-état EPI met à jour le visuel
   (setTimeout : laisse la règle d'exclusivité s'appliquer d'abord) */
document.addEventListener("change", (e) => {
  if (e.target.closest && e.target.closest(".epi-chip")) {
    setTimeout(majEpi, 0);
  }
});

/* =========================================================
   SAUVEGARDE / RESTAURATION
   ========================================================= */
function savePageContent() {
    const page = document.querySelector('#page3');
    const inputs = page.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            if (input.checked) {
                input.setAttribute('checked', 'checked');
            } else {
                input.removeAttribute('checked');
            }
        } else if (input.tagName.toLowerCase() === 'textarea') {
            input.textContent = input.value;
        } else {
            input.setAttribute('value', input.value);
        }
    });
    localStorage.setItem('page3Content', document.querySelector('#page3').outerHTML);
}

function loadPageContent() {
    const savedContent = localStorage.getItem('page3Content');
    if (savedContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(savedContent, 'text/html');
        const newPage = doc.querySelector('#page3');
        if (newPage) {
            document.querySelector('#page3').innerHTML = newPage.innerHTML;
            return true;
        }
    }
    return false;
}

function redirectToAutorisationPage() {
    savePageContent();
    window.location.href = 'risk.html';
}

window.onload = function () {
    loadPageContent();
    construireEpi();
    construireEquipements();
    majEpi();
}

window.onbeforeunload = function () {
    savePageContent();
}
