// === Données du quiz ===
const quizzData = [
  {
    theme: "Sécurité sur chantier",
    questions: [
      {
        numero: 1,
        type: "qcm",
        enonce: `Je participe à une opération de plantation sur un chantier de génie écologique en bordure de
        canal. Il s’agit exclusivement de travaux manuels. En tenant compte du type de tâche, de
        l’environnement et des risques présents, quels EPI dois-je porter dans cette situation ?`,
        image: "images/casque.png",
        propositions: [
          { texte: "Chaussures ou bottes de sécurité", correct: true },
          { texte: "Vêtements haute visibilité", correct: true },
          { texte: "Lunettes de protection", correct: true },
          { texte: "Casque de protection", correct: true },
          { texte: "Gants de protection étanches", correct: true },
          { texte: "Harnais antichute", correct: true },
          { texte: "Gilet de sauvetage", correct: true },
        ],
        explication: {
          texte: `Je suis exposé à tous les risques. Je dois porter mes chaussures de sécurité, vêtements
            haute visibilité et gants étanches par défaut sur tous les chantiers (travail au contact de
            l’eau)

            J’ajoute le gilet de sauvetage si je travaille à proximité immédiate d’un plan d’eau.

            Le casque de protection est requis dès lors qu’il y a de la coactivité avec des engins et lors
            des opérations de levage.

            J’adapte et je rajoute des EPI complémentaires en fonction de l’activité et des risques :
            Protection auditive si je suis exposé au bruit / Montre PTI si je travail seul / Harnais si je
            travail en talus pentus / Visière s’il y a un risque de projection de particules ou fluides`,
          image: "images/explication_casque.png"
        },
        points: 4
      },
      {
        numero: 2,
        type: "vraiFaux",
        enonce: "Si j’évolue sur un équipement flottant type ponton, je porte mon gilet de sauvetage et ma ceinture de sécurité dans les engins sur l’eau.",
        image: "images/casque.png",
        propositions: [
          { texte: "Vrai", correct: false },
          { texte: "Faux", correct: true }
        ],
        explication: {
          texte: "Lorsque la pelle est sur l’eau ou à proximité, la ceinture de sécurité n'est pas portée - En cas de basculement de l'engin dans l'eau, il faut que le collaborateur puisse s'extraire ou être extrait rapidement. Pour toutes les autres situations, le port de la ceinture reste obligatoire.Le port du gilet de sauvetage y compris dans les engins est obligatoire. -En cas de malaise et de chute à l'eau, le gilet se déclenche automatiquement au contact de l'eau et m'évite la noyade",
          image: "images/explication_casque.png"
        },
        points: 1
      }
    ]
  }
];

// === Variables globales ===
let currentThemeIndex = 0;
let currentQuestionIndex = 0;
let score = 0;

// === Sélection des éléments DOM ===
const quizContainer = document.getElementById("quiz-container");
const themeTitle = document.getElementById("theme-title");
const questionTitle = document.getElementById("question-title");
const questionImage = document.getElementById("question-image");
const propositionsContainer = document.getElementById("propositions");
const validateBtn = document.getElementById("validate-btn");
const nextBtn = document.getElementById("next-btn");
const explicationContainer = document.getElementById("explication");
const scoreContainer = document.getElementById("score");

// === Affichage de la question ===
function loadQuestion() {
  const theme = quizzData[currentThemeIndex];
  const question = theme.questions[currentQuestionIndex];

  themeTitle.textContent = theme.theme;
  questionTitle.textContent = `Q${question.numero}. ${question.enonce}`;
  explicationContainer.innerHTML = "";
  validateBtn.disabled = false;
  nextBtn.style.display = "none";

  // Image de la question
  if (question.image) {
    questionImage.src = question.image;
    questionImage.style.display = "block";
  } else {
    questionImage.style.display = "none";
  }

  // Génération des propositions
  propositionsContainer.innerHTML = "";
  question.propositions.forEach((prop, index) => {
    const inputType = question.type === "qcm" ? "checkbox" : "radio";
    const input = document.createElement("input");
    input.type = inputType;
    input.name = "reponse";
    input.id = `rep-${index}`;
    input.value = index;

    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = prop.texte;

    const div = document.createElement("div");
    div.classList.add("proposition");
    div.appendChild(input);
    div.appendChild(label);

    propositionsContainer.appendChild(div);
  });
}

// === Validation de la réponse ===
function validateAnswer() {
  const theme = quizzData[currentThemeIndex];
  const question = theme.questions[currentQuestionIndex];
  const inputs = propositionsContainer.querySelectorAll("input");

  let correct = true;

  inputs.forEach((input, index) => {
    const isChecked = input.checked;
    const isCorrect = question.propositions[index].correct;

    // coloration visuelle
    if (isChecked && isCorrect) input.parentElement.style.background = "#c8f7c5";
    else if (isChecked && !isCorrect) input.parentElement.style.background = "#f7c5c5";

    // Vérification du score
    if (isChecked !== isCorrect) correct = false;
  });

  if (correct) score += question.points;

  showExplication(question);
  validateBtn.disabled = true;
  nextBtn.style.display = "inline-block";
}

// === Affichage de l'explication ===
function showExplication(question) {
  explicationContainer.innerHTML = `<p>${question.explication.texte}</p>`;
  if (question.explication.image) {
    const img = document.createElement("img");
    img.src = question.explication.image;
    explicationContainer.appendChild(img);
  }
}

// === Question suivante ===
function nextQuestion() {
  const theme = quizzData[currentThemeIndex];
  currentQuestionIndex++;

  if (currentQuestionIndex < theme.questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

// === Score final ===
function showScore() {
  quizContainer.innerHTML = `<h2>Quiz terminé 🎉</h2>
  <p>Score final : <strong>${score}</strong></p>`;
}

// === Événements ===
validateBtn.addEventListener("click", validateAnswer);
nextBtn.addEventListener("click", nextQuestion);

// === Démarrage ===
loadQuestion();
