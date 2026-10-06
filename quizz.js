let currentQuestionIndex = 0;
let score = 0;

/* Seuil de validation du parcours sécurité, en pourcentage.
   Défini dans config.js (seuilQuizz) pour que la fiche et le quizz
   appliquent forcément la même règle. */
const SEUIL_REUSSITE =
  (typeof CONFIG_ACCUEIL !== "undefined" && CONFIG_ACCUEIL.seuilQuizz) || 70;

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
  imageGrande.dataset.trouvees = "[]";
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
/* BARÈME
   Vrai/faux : tout ou rien (1 point).
   QCM : notation au prorata. Une question à 7 propositions ne peut pas
   coûter ses 4 points entiers parce qu'une case a été oubliée — c'est ce
   qui faisait échouer des parcours pourtant maîtrisés (10 QCM = 30 des
   37 points du quizz, tout ou rien).
   Points = points × (bonnes cochées − cases cochées à tort) / bonnes attendues,
   jamais négatif. Cocher tout ne rapporte donc rien de plus. */
let detailScore = [];

function pointsQuestion(question, inputs) {
  const props = question.propositions || [];
  const attendues = props.filter(p => p.correct).length;

  if (question.type !== "qcm") {
    let juste = true;
    inputs.forEach((input, i) => {
      if (input.checked !== !!props[i].correct) juste = false;
    });
    return juste ? question.points : 0;
  }

  let trouvees = 0, fausses = 0;
  inputs.forEach((input, i) => {
    if (input.checked && props[i].correct) trouvees++;
    else if (input.checked && !props[i].correct) fausses++;
  });
  if (!attendues) return 0;
  const net = Math.max(0, trouvees - fausses);
  return Math.round(question.points * net / attendues);
}

function validerReponse() {
  const question = quizzData[0].questions[currentQuestionIndex];
  const inputs = propositionsEl.querySelectorAll("input");

  /* Sans cette garde, une question vrai/faux laissée vide était comptée
     juste et rapportait ses points. */
  if (inputs.length && ![].some.call(inputs, i => i.checked)) {
    explicationEl.innerHTML = '<div class="quizz-alerte">Sélectionnez au moins une réponse avant de valider.</div>';
    return;
  }

  const props = question.propositions || [];
  inputs.forEach((input, i) => {
    const coche = input.checked;
    const bonne = !!props[i].correct;
    const ligne = input.parentElement;
    ligne.classList.remove("rep-juste", "rep-fausse", "rep-oubliee");
    if (coche && bonne) ligne.classList.add("rep-juste");
    else if (coche && !bonne) ligne.classList.add("rep-fausse");
    else if (!coche && bonne) ligne.classList.add("rep-oubliee");   // réponse manquée, signalée
  });

  const gagnes = pointsQuestion(question, inputs);
  score += gagnes;
  detailScore.push({
    numero: question.numero,
    theme: question.theme,
    obtenus: gagnes,
    total: question.points
  });

  afficherExplication(question, gagnes);
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

  // Vérification dans les zones : on retient LAQUELLE, pour ne pas
  // compter deux fois la même zone trouvée
  const indexZone = question.bonnesZones.findIndex(zone => {
    const dx = xPercent - zone.x;
    const dy = yPercent - zone.y;
    return Math.sqrt(dx * dx + dy * dy) <= zone.rayon;
  });

  const trouvees = JSON.parse(img.dataset.trouvees || "[]");
  const nouvelle = indexZone >= 0 && trouvees.indexOf(indexZone) === -1;
  if (nouvelle) {
    trouvees.push(indexZone);
    img.dataset.trouvees = JSON.stringify(trouvees);
  }

  // Marqueur
  const marker = document.createElement("div");
  marker.classList.add("click-marker");
  marker.classList.add(indexZone >= 0 ? "marker-juste" : "marker-faux");
  marker.style.left = `${xPercent}%`;
  marker.style.top = `${yPercent}%`;
  img.parentElement.appendChild(marker);

  // Fin
  img.dataset.clicks = (parseInt(img.dataset.clicks) || 0) + 1;

  if (img.dataset.clicks >= question.bonnesZones.length) {
    img.onclick = null;
    img.style.cursor = "default";

    // Points au prorata des zones réellement trouvées (ils n'étaient
    // jamais comptés auparavant pour ce type de question)
    const gagnes = Math.round(question.points * trouvees.length / question.bonnesZones.length);
    score += gagnes;
    detailScore.push({ numero: question.numero, theme: question.theme,
                       obtenus: gagnes, total: question.points });

    afficherZonesCorrectes(img, question.bonnesZones);
    afficherExplication(question, gagnes);
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
function afficherExplication(question, gagnes) {
  const explicationTexte = question.explication.texte
    .split(/\n+/)
    .map(ligne => ligne.trim())
    .filter(ligne => ligne.length > 0);

  const explicationContainer = document.createElement("div");
  explicationContainer.classList.add("explication-flex");

  let bandeau = "";
  if (typeof gagnes === "number") {
    const plein = gagnes === question.points;
    const zero = gagnes === 0;
    bandeau = `<div class="quizz-points ${plein ? "pts-plein" : (zero ? "pts-zero" : "pts-partiel")}">`
      + `${plein ? "✅" : (zero ? "❌" : "◐")} ${gagnes} / ${question.points} point${question.points > 1 ? "s" : ""}`
      + `${plein || zero ? "" : " — réponses manquées signalées en vert"}</div>`;
  }
  let explicationHTML = bandeau + "<h3>Explications :</h3><ul>";
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
  if (!username || !username.trim()) username = "Participant";
  // Le nom vient d'une saisie libre : on l'échappe avant de l'insérer en HTML
  username = username.replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);

  // 2. Calcul du score
  const totalPoints = quizzData[0].questions.reduce((a, q) => a + q.points, 0);
  const pourcentage = Math.min(100, Math.round((score / totalPoints) * 100));

  // 3. Enregistrement du résultat (repris sur la page Signatures + diplôme)
  const reussite = pourcentage >= SEUIL_REUSSITE;
  const dateResultat = new Date().toLocaleDateString('fr-FR');
  try {
    localStorage.setItem('quizzResultat', JSON.stringify({
      score: score,
      total: totalPoints,
      pourcentage: pourcentage,
      date: dateResultat,
      reussite: reussite,
      perdus: detailScore.filter(d => d.obtenus < d.total)
        .map(d => ({ q: d.numero, theme: d.theme, obtenus: d.obtenus, total: d.total }))
    }));
  } catch (e) { console.warn(e); }

  // 4. Récapitulatif par question (là où les points ont été perdus)
  const perdus = detailScore.filter(d => d.obtenus < d.total);
  const recap = perdus.length ? `
    <div class="recap-points">
      <div class="recap-titre">Points perdus (${perdus.reduce((a, d) => a + (d.total - d.obtenus), 0)} sur ${totalPoints})</div>
      <ul>${perdus.map(d => `<li><span class="recap-num">Q${d.numero}</span>
        <span class="recap-theme">${d.theme}</span>
        <span class="recap-pts">${d.obtenus} / ${d.total}</span></li>`).join("")}</ul>
    </div>` : '<div class="recap-points recap-parfait">🎯 Aucune erreur — toutes les questions sont acquises.</div>';

  // 5. Affichage final
  quizContainer.innerHTML = `
    <div class="result-container">
      ${reussite ? '<img src="img/laurier.png" class="laurier-img" alt="Bravo">' : ''}
      <div class="result-name">${username}</div>
      <h2>${reussite ? 'Parcours sécurité validé !' : 'Parcours à retravailler'}</h2>
      <div class="score-circle ${reussite ? '' : 'insuffisant'}">${pourcentage}%</div>
      <p class="result-detail">Score : ${score} / ${totalPoints} points — seuil de validation : ${SEUIL_REUSSITE} % (${Math.ceil(totalPoints * SEUIL_REUSSITE / 100)} points).
        Le résultat est reporté sur la page Signatures de la fiche d'accueil.</p>
      ${recap}
      ${reussite ? '<button id="imprimer-diplome">🎓 Imprimer mon diplôme</button>' : '<p class="result-detail">Revoyez les consignes avec votre animateur HSE avant de relancer le quizz.</p>'}
      <button id="quitter">Quitter</button>
    </div>
  `;

  // Diplôme imprimable depuis le quizz
  const btnDiplome = document.getElementById('imprimer-diplome');
  if (btnDiplome) {
    btnDiplome.addEventListener('click', () => {
      let dip = document.getElementById('diplome-quizz');
      if (!dip) {
        dip = document.createElement('div');
        dip.id = 'diplome-quizz';
        dip.className = 'diplome';
        dip.innerHTML = `
          <img class="dp-logo" src="img/CDES_Logo.png" alt="CDES">
          <div class="dp-titre">Diplôme du parcours sécurité</div>
          <div class="dp-sous">Accueil HSE des nouveaux arrivants — CDES</div>
          <img class="dp-laurier" src="img/laurier.png" alt="">
          <div class="dp-nom">${username}</div>
          <div class="dp-texte">a suivi l'accueil sécurité des nouveaux arrivants et validé avec succès
            le parcours sécurité numérique CDES : règles qui sauvent, équipements de protection individuelle,
            risques professionnels et consignes de sécurité sur les chantiers.</div>
          <div class="dp-score">Score obtenu : ${pourcentage} % (${score} / ${totalPoints} points)</div>
          <div class="dp-date">Fait le ${dateResultat} — Curages Dragages et Systèmes</div>`;
        document.body.appendChild(dip);
      }
      document.body.classList.add('print-diplome');
      window.print();
      setTimeout(() => document.body.classList.remove('print-diplome'), 500);
    });
  }

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
