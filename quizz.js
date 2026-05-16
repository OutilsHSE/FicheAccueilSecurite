let currentQuestionIndex = 0;
let score = 0;

const themeEl = document.getElementById("theme");
const situationEl = document.getElementById("situation");
const enonceEl = document.getElementById("enonce");
const imageEl = document.getElementById("image-question");
const propositionsEl = document.getElementById("propositions");
const explicationEl = document.getElementById("explication");
const btnValider = document.getElementById("valider");
const btnSuivant = document.getElementById("suivant");
const quizContainer = document.getElementById("quiz-container");

// === Charger une question ===
function chargerQuestion() {
  const question = quizzData[0].questions[currentQuestionIndex];
  // --- Nettoyage des anciens marqueurs / zones / états ---
const imageDroite = document.getElementById("image-question-droite");
const imageGrande = document.getElementById("image-question-grande");
const imageClickContainer = document.getElementById("image-click-container");

// Supprime tous les anciens marqueurs et zones correctes
document.querySelectorAll(".click-marker, .zone-correcte").forEach(el => el.remove());

// Réinitialise les attributs dataset pour les clics
if (imageGrande) {
  imageGrande.dataset.clicks = 0;
  imageGrande.onclick = null;
}
  propositionsEl.innerHTML = "";
  explicationEl.innerHTML = "";
  btnValider.disabled = false;
  btnSuivant.style.display = "none";

  themeEl.textContent = `Thème : ${question.theme}`;
  situationEl.textContent = `Situation ${question.numero}`;
  enonceEl.textContent = `${question.enonce}`;
  // Réinitialisation
  imageDroite.style.display = "none";
  imageGrande.style.display = "none";
  imageClickContainer.style.display = "none";

  // --- Type imageClick ---
  if (question.type === "imageClick") {
    propositionsEl.innerHTML = ""; // pas de réponses texte
    imageClickContainer.style.display = "block";
    imageGrande.src = question.image;
    imageGrande.style.display = "block";
    imageGrande.style.cursor = "crosshair";
    imageGrande.onclick = function (event) {
      handleImageClick(event, question);
    };
  }
  // --- Type classique ---
  else {
    imageDroite.style.display = question.image ? "block" : "none";
    if (question.image) {
      imageDroite.src = question.image;
    }

    question.propositions?.forEach((prop, i) => {
      const input = document.createElement("input");
      input.type = question.type === "qcm" ? "checkbox" : "radio";
      input.name = "reponse";
      input.id = `rep-${i}`;
      input.value = i;

      const label = document.createElement("label");
      label.htmlFor = input.id;
      label.textContent = prop.texte;

      const div = document.createElement("div");
      div.classList.add("proposition");
      div.appendChild(input);
      div.appendChild(label);
      propositionsEl.appendChild(div);
    });
  }
   updateProgress(); 
}

// === Validation classique (vrai/faux ou qcm) ===
function validerReponse() {
  const question = quizzData[0].questions[currentQuestionIndex];
  const inputs = propositionsEl.querySelectorAll("input");
  let correct = true;

  inputs.forEach((input, i) => {
    const isChecked = input.checked;
    const isCorrect = question.propositions[i].correct;

    if (isChecked && isCorrect) {
      input.parentElement.style.background = "#c8f7c5";
    } else if (isChecked && !isCorrect) {
      input.parentElement.style.background = "#f7c5c5";
      correct = false;
    } else if (!isChecked && isCorrect && question.type === "qcm") {
      correct = false;
    }
  });

  if (correct) score += question.points;

  afficherExplication(question);
  btnValider.disabled = true;
  btnSuivant.style.display = "inline-block";
}

// === Gestion des questions à clic sur image ===
function handleImageClick(event, question) {
  const img = event.target;
  const rect = img.getBoundingClientRect();

  // Clic converti en % de l’image AFFICHÉE
  const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
  const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

  // Vérification dans les zones
  const isCorrect = question.bonnesZones.some(zone => {
    const dx = xPercent - zone.x;
    const dy = yPercent - zone.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= zone.rayon;
  });

  // Marqueur
  const marker = document.createElement("div");
  marker.classList.add("click-marker");
  marker.style.left = `${xPercent}%`;
  marker.style.top = `${yPercent}%`;
  img.parentElement.appendChild(marker);

  // Fin
  img.dataset.clicks = (parseInt(img.dataset.clicks) || 0) + 1;

  if (img.dataset.clicks >= question.bonnesZones.length) {
    img.onclick = null;
    img.style.cursor = "default";
    afficherZonesCorrectes(img, question.bonnesZones);
    afficherExplication(question);
    btnValider.disabled = true;
    btnSuivant.style.display = "inline-block";
  }
}


function afficherZonesCorrectes(img, zones) {
  const rect = img.getBoundingClientRect();

  zones.forEach(zone => {
    const circle = document.createElement("div");
    circle.classList.add("zone-correcte");

    const centerX = (zone.x / 100) * rect.width;
    const centerY = (zone.y / 100) * rect.height;

    // Rayon exprimé en % de la LARGEUR uniquement (donc cohérent)
    const radiusPx = (zone.rayon / 100) * rect.width;

    circle.style.width = `${radiusPx * 2}px`;
    circle.style.height = `${radiusPx * 2}px`;

    circle.style.left = `${centerX - radiusPx}px`;
    circle.style.top  = `${centerY - radiusPx}px`;

    img.parentElement.appendChild(circle);
  });
}

// === Affichage explication (liste + image à droite) ===
function afficherExplication(question) {
  const explicationTexte = question.explication.texte
    .split(/\n+/)
    .map(ligne => ligne.trim())
    .filter(ligne => ligne.length > 0);

  const explicationContainer = document.createElement("div");
  explicationContainer.classList.add("explication-flex");

  let explicationHTML = "<h3>Explications :</h3><ul>";
  explicationTexte.forEach(point => {
    explicationHTML += `<li>${point}</li>`;
  });
  explicationHTML += "</ul>";

  const explicationTexteEl = document.createElement("div");
  explicationTexteEl.classList.add("explication-texte");
  explicationTexteEl.innerHTML = explicationHTML;
  explicationContainer.appendChild(explicationTexteEl);


  if (question.explication.image) {
    const img = document.createElement("img");
    img.src = question.explication.image;
    img.classList.add("explication-image");
    explicationContainer.appendChild(img);
  }

  explicationEl.innerHTML = "";
  explicationEl.appendChild(explicationContainer);
}

// === Question suivante ===
function questionSuivante() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizzData[0].questions.length) {
    chargerQuestion();
  } else {
    afficherPageFinale();
  }
}

// === Page finale ===
function afficherPageFinale() {

  // 1. Récupération du nom
  let username = localStorage.getItem("Nom");
  if (!username) username = "Participant";

  // 2. Calcul du score
  const totalPoints = quizzData[0].questions.reduce((a, q) => a + q.points, 0);
  const pourcentage = Math.round((score / totalPoints) * 100);

  // 3. Affichage final
  quizContainer.innerHTML = `
    <div class="result-container">

      <button id="quitter">Quitter</button>
    </div>
  `;

  // 4. Bouton quitter
  document.getElementById("quitter").addEventListener("click", () => {
   window.close()
  });
}

// === Événements ===
btnValider.addEventListener("click", validerReponse);
btnSuivant.addEventListener("click", questionSuivante);

//Pour les tests
function allerAQuestion(numero) {
  const total = quizzData[0].questions.length;
  if (numero < 1 || numero > total) {
    console.warn(`Numéro de question invalide : ${numero}. Il y a ${total} questions.`);
    return;
  }

  currentQuestionIndex = numero - 1;
  chargerQuestion();
  console.log(`🔎 Passage direct à la question ${numero}`);
}
///

function updateProgress() {
  const total = quizzData[0].questions.length;
  const current = currentQuestionIndex + 1;

  const percent = (current / total) * 100;

  document.getElementById("progress-bar").style.width = percent + "%";
  document.getElementById("progress-text").textContent = `Question ${current} / ${total}`;
}

// === Démarrage ===
chargerQuestion();
