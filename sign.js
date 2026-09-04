renderChrome(6);

/* =========================================================
   RÉSULTAT DU QUIZZ (rempli automatiquement après le quizz
   de la fiche dématérialisée)
   ========================================================= */
function lireQuizzResultat() {
  try { return JSON.parse(localStorage.getItem('quizzResultat')); } catch (e) { return null; }
}

function majQuizzResultat() {
  const zone = document.getElementById('quizz-resultat');
  if (!zone) return;
  const r = lireQuizzResultat();
  if (!r) { zone.style.display = 'none'; return; }

  zone.style.display = 'flex';
  zone.classList.toggle('reussi', r.reussite);
  zone.classList.toggle('echec', !r.reussite);
  zone.innerHTML = `
    <span style="font-size:1.3rem;">${r.reussite ? '🏆' : '❌'}</span>
    <span class="qr-score" style="color:${r.reussite ? 'var(--vert-fonce)' : 'var(--rouge)'};">${r.pourcentage}%</span>
    <span>${r.reussite
      ? `<span class="bold">Parcours sécurité validé</span> le ${r.date} — score ${r.score} / ${r.total} points. Le diplôme sera annexé à l'export PDF.`
      : `Parcours <span class="bold">non validé</span> le ${r.date} (score ${r.score} / ${r.total}). Revoir les consignes puis relancer le quizz.`}</span>`;

  // Coche automatiquement « quizz de la fiche dématérialisée »
  if (r.reussite) {
    const demat = document.getElementById('quizz-demat');
    if (demat && !demat.checked) demat.checked = true;
  }
}

/* Le quizz s'ouvre dans un autre onglet : on rafraîchit au retour */
window.addEventListener('focus', majQuizzResultat);
document.addEventListener('visibilitychange', () => { if (!document.hidden) majQuizzResultat(); });

/* =========================================================
   DIPLÔME (annexé à l'export PDF)
   ========================================================= */
function construireDiplome() {
  const r = lireQuizzResultat();
  if (!r || !r.reussite) return null;

  const nom = (localStorage.getItem('Nom') || 'Le collaborateur').trim();
  const d = document.createElement('div');
  d.className = 'diplome';
  d.id = 'diplome-print';
  d.innerHTML = `
    <img class="dp-logo" src="img/CDES_Logo.png" alt="CDES">
    <div class="dp-titre">Diplôme du parcours sécurité</div>
    <div class="dp-sous">Accueil HSE des nouveaux arrivants — CDES</div>
    <img class="dp-laurier" src="img/laurier.png" alt="">
    <div class="dp-nom">${nom}</div>
    <div class="dp-texte">a suivi l'accueil sécurité des nouveaux arrivants et validé avec succès
      le parcours sécurité numérique CDES : règles qui sauvent, équipements de protection individuelle,
      risques professionnels et consignes de sécurité sur les chantiers.</div>
    <div class="dp-score">Score obtenu : ${r.pourcentage} % (${r.score} / ${r.total} points)</div>
    <div class="dp-date">Fait le ${r.date} — Curages Dragages et Systèmes</div>`;
  return d;
}

/* ===== Canvas de signature =====
   Écriture au doigt, au stylet ou à la souris. On utilise les « pointer
   events » quand le navigateur les gère (ils couvrent les trois d'un coup
   et fonctionnent même si le doigt sort du cadre), avec repli sur
   souris + tactile pour les navigateurs plus anciens.
   Les coordonnées sont remises à l'échelle du canvas : sans cela, un
   redimensionnement de la fenêtre décalait le tracé, voire l'envoyait
   hors du cadre visible. */
function setupCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || canvas._brancheSignature) return;
  /* Marqueur posé sur l'objet JavaScript, JAMAIS en attribut HTML : un
     attribut serait recopié dans le brouillon enregistré, et à la visite
     suivante le cadre serait considéré comme déjà branché — donc muet. */
  canvas._brancheSignature = true;

  /* Posé en style direct, sans dépendre de la feuille de style (qui peut
     être servie en cache par le navigateur) : sans touch-action « none »,
     un écran tactile interprète le geste comme un défilement de page et
     le trait n'est jamais dessiné — le cadre paraît bloqué. */
  canvas.style.touchAction = 'none';
  canvas.style.cursor = 'crosshair';

  const ctx = canvas.getContext('2d');

  function dimensionner() {
    const l = Math.round(canvas.clientWidth) || 300;
    const h = Math.round(canvas.clientHeight) || 180;
    if (canvas.width === l && canvas.height === h) return;
    // on conserve le tracé existant pendant le redimensionnement
    let copie = null;
    try { if (canvas.width && canvas.height) copie = canvas.toDataURL('image/png'); } catch (e) {}
    canvas.width = l;
    canvas.height = h;
    if (copie) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, l, h);
      img.src = copie;
    }
  }
  dimensionner();
  window.addEventListener('resize', dimensionner);

  let dessine = false;

  function point(e) {
    const r = canvas.getBoundingClientRect();
    const cx = (e.touches && e.touches.length) ? e.touches[0].clientX : e.clientX;
    const cy = (e.touches && e.touches.length) ? e.touches[0].clientY : e.clientY;
    return {
      x: (cx - r.left) * (canvas.width / (r.width || 1)),
      y: (cy - r.top) * (canvas.height / (r.height || 1))
    };
  }

  function debut(e) {
    // en mode clic, seul l'événement « click » démarre le trait :
    // sinon l'appui puis le clic s'annulaient l'un l'autre
    if (canvas._modeClic && e.type !== 'click') return;
    dessine = true;
    const p = point(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    // un simple appui doit laisser un point visible
    ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#000';
    ctx.lineTo(p.x + 0.1, p.y + 0.1);
    ctx.stroke();
    if (e.pointerId !== undefined && canvas.setPointerCapture) {
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
    }
    if (e.cancelable) e.preventDefault();
  }

  function trace(e) {
    if (!dessine) return;
    const p = point(e);
    ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#000';
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    if (e.cancelable) e.preventDefault();
  }

  function fin(e) {
    if (!dessine) return;
    if (canvas._modeClic) return;   // en mode clic, seul un nouveau clic arrête le trait
    dessine = false;
    ctx.beginPath();
    if (e && e.cancelable) e.preventDefault();
  }

  /* Mode clic : sur un pavé tactile, maintenir le bouton enfoncé tout en
     déplaçant le doigt est très difficile — beaucoup de pavés relâchent le
     clic dès que le second doigt bouge, et rien ne se dessine. Dans ce mode,
     un clic démarre le trait, un second clic le termine. */
  canvas.addEventListener('click', function (e) {
    if (!canvas._modeClic) return;
    if (dessine) { dessine = false; ctx.beginPath(); }
    else { debut(e); }
  });

  // en mode clic, le trait suit le curseur sans qu'aucun bouton soit enfoncé
  canvas.addEventListener('mousemove', function (e) {
    if (canvas._modeClic && dessine) trace(e);
  });

  if (window.PointerEvent) {
    /* Le déplacement et le relâchement sont écoutés sur la fenêtre : si le
       doigt ou le stylet sort du cadre, le trait s'arrête proprement au lieu
       de rester « collé ». On n'écoute PAS pointerleave, qui interrompait le
       tracé dès la prise de capture du pointeur. */
    canvas.addEventListener('pointerdown', debut);
    window.addEventListener('pointermove', trace);
    window.addEventListener('pointerup', fin);
    window.addEventListener('pointercancel', fin);
  } else {
    canvas.addEventListener('mousedown', debut);
    window.addEventListener('mousemove', trace);
    window.addEventListener('mouseup', fin);
    canvas.addEventListener('touchstart', debut);
    canvas.addEventListener('touchmove', trace);
    window.addEventListener('touchend', fin);
    window.addEventListener('touchcancel', fin);
  }
}

/* Bouton « Mode clic » de chaque cadre de signature */
function basculerModeClic(canvasId, bouton) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  canvas._modeClic = !canvas._modeClic;
  if (bouton) {
    bouton.textContent = canvas._modeClic ? '🖐️ Mode clic activé' : '🖐️ Mode clic';
    bouton.classList.toggle('btn-vert', canvas._modeClic);
  }
  canvas.style.cursor = canvas._modeClic ? 'crosshair' : 'crosshair';
}

function clearCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* ===== Sauvegarde / restauration de la page 6 ===== */
function savePageContent() {
  const page = document.querySelector('#page6');
  if (!page) return;
  const inputs = page.querySelectorAll('input, textarea, select, canvas');
  inputs.forEach(input => {
    if (input.type === 'checkbox' || input.type === 'radio') {
      input.checked ? input.setAttribute('checked', 'checked') : input.removeAttribute('checked');
    } else if (input.tagName.toLowerCase() === 'textarea') {
      input.textContent = input.value;
    } else if (input.tagName.toLowerCase() === 'canvas') {
      input.setAttribute('data-image', input.toDataURL('image/png'));
      // Trace réellement dessinée ? (contrôle des pixels, fiable même
      // pour un canvas vide dont l'image encodée reste volumineuse)
      let signe = false;
      try {
        const d = input.getContext('2d').getImageData(0, 0, input.width, input.height).data;
        for (let i = 3; i < d.length; i += 4) { if (d[i] !== 0) { signe = true; break; } }
      } catch (e) { console.warn(e); }
      input.setAttribute('data-signe', signe ? '1' : '0');
    } else {
      input.setAttribute('value', input.value);
    }
  });
  sauverLocal('page6Content', page.outerHTML);
}

function loadPageContent() {
  const savedContent = localStorage.getItem('page6Content');
  if (!savedContent) return false;

  const page = document.querySelector('#page6');
  const parser = new DOMParser();
  const doc = parser.parseFromString(savedContent, 'text/html');
  const savedPage = doc.querySelector('#page6');
  if (!savedPage) return false;

  page.innerHTML = savedPage.innerHTML;

  // Redessiner les signatures sauvegardées.
  // On ne touche PAS à canvas.width ici : le faire remettrait le cadre à
  // zéro et effacerait un tracé en cours si l'image arrivait en retard.
  page.querySelectorAll('canvas[data-image]').forEach(canvas => {
    const url = canvas.getAttribute('data-image');
    if (!url || canvas.getAttribute('data-signe') === '0') return;
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext('2d');
      if (!canvas.width) { canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = url;
  });
  return true;
}

/* ===== Export / impression de la fiche complète ===== */

/* Image figée d'un canvas, pour l'impression. On ne remplace JAMAIS le
   canvas d'origine : il doit rester utilisable après l'export (avant, un
   clic sur « Exporter » transformait définitivement les cadres de
   signature en images et il devenait impossible de signer). */
function imageDepuisCanvas(canvas) {
  const img = document.createElement('img');
  try { img.src = canvas.toDataURL('image/png'); } catch (e) { console.warn(e); }
  img.style.border = '1px solid #000';
  img.style.width = canvas.style.width || '100%';
  img.style.height = canvas.style.height || 'auto';
  img.className = canvas.className;
  return img;
}

/* Dans une COPIE de page, remplace chaque canvas par son image.
   `origine` fournit les tracés réels (le clone d'un canvas est vide). */
function figerCanvas(copie, origine) {
  copie.querySelectorAll('canvas').forEach((c) => {
    const source = (origine && c.id) ? origine.querySelector('#' + c.id) : null;
    let img;
    if (source && source.tagName.toLowerCase() === 'canvas') {
      img = imageDepuisCanvas(source);
    } else {
      // page restaurée depuis un brouillon : le tracé est dans data-image
      img = document.createElement('img');
      img.src = c.getAttribute('data-image') || '';
      img.style.border = '1px solid #000';
      img.style.width = '100%';
      img.className = c.className;
    }
    c.replaceWith(img);
  });
}

function printAllPages() {
  savePageContent();

  // Enregistrement dans le registre CDES (n'empêche jamais l'export)
  try {
    if (typeof enregistrerSiNecessaire === "function") enregistrerSiNecessaire();
    if (typeof afficherAnomalies === "function") afficherAnomalies();
  } catch (e) { console.warn(e); }

  const brouillons = ['page1Content', 'page2Content', 'page3Content', 'page4Content', 'page5Content']
    .map(k => localStorage.getItem(k));

  const finalContainer = document.createElement('div');
  finalContainer.id = 'print-assembly';

  // En-tête de document (1re page uniquement)
  const nomComplet = (localStorage.getItem('Nom') || '').trim();
  const dateAccueil = document.getElementById('visite-date-reponsable')?.value || '';
  finalContainer.innerHTML = `
    <div class="print-doc-header">
      <img src="img/CDES_Logo.png" alt="CDES">
      <div>
        <div class="pdh-titre">Accueil HSE des nouveaux arrivants</div>
        <div class="pdh-sous">${nomComplet ? 'Collaborateur : ' + nomComplet : ''}${dateAccueil ? ' — Accueil du ' + dateAccueil.split('-').reverse().join('/') : ''}</div>
      </div>
    </div>`;

  brouillons.forEach((contenu) => {
    if (!contenu) return;
    const bloc = document.createElement('div');
    bloc.className = 'page-section page-break';
    bloc.innerHTML = contenu;
    figerCanvas(bloc, null);
    finalContainer.appendChild(bloc);
  });

  // Page 6 : on imprime une COPIE, l'originale reste intacte et signable
  const page6 = document.querySelector('#page6');
  if (page6) {
    const bloc = document.createElement('div');
    bloc.className = 'page-section page-break';
    bloc.appendChild(page6.cloneNode(true));
    figerCanvas(bloc, page6);
    bloc.querySelectorAll('#page6').forEach(el => el.removeAttribute('id'));
    finalContainer.appendChild(bloc);
  }

  document.body.insertBefore(finalContainer, document.body.firstChild);
  // pendant l'impression, on masque la page vivante : seule la copie sort
  document.body.classList.add('en-impression');

  // Diplôme annexé en fin de document (si quizz validé)
  const diplome = construireDiplome();
  if (diplome) document.body.appendChild(diplome);

  // Nom de fichier explicite : AAAA-MM-JJ-Accueil HSE-Nom Prénom
  const nom = nomComplet;
  const date = document.getElementById('visite-date-reponsable')?.value
    || new Date().toISOString().slice(0, 10);
  const ancienTitre = document.title;
  document.title = `${date}-Accueil HSE${nom ? '-' + nom : ''}`;

  window.scrollTo(0, 0);

  const nettoyer = function () {
    const assembly = document.getElementById('print-assembly');
    if (assembly) assembly.remove();
    const dip = document.getElementById('diplome-print');
    if (dip) dip.remove();
    document.body.classList.remove('en-impression');
    document.title = ancienTitre;
  };

  setTimeout(() => {
    try { window.print(); } catch (e) { console.warn(e); }
    setTimeout(nettoyer, 800);
  }, 500);
}

/* ===== Réparation d'une fiche abîmée par un ancien export =====
   Les versions précédentes remplaçaient les canvas par des images au
   moment de l'export, et le brouillon enregistré gardait ces images :
   la fiche devenait définitivement impossible à signer. On remet ici de
   vrais canvas en récupérant le tracé déjà présent. */
function reparerSignatures() {
  const page = document.querySelector('#page6');
  if (!page) return 0;
  const images = page.querySelectorAll('img.signature-canvas');
  let repares = 0;
  images.forEach((img) => {
    const canvas = document.createElement('canvas');
    canvas.className = 'signature-canvas';
    if (img.id) canvas.id = img.id;
    const trace = img.getAttribute('src');
    img.replaceWith(canvas);
    repares++;
    if (trace && trace.indexOf('data:image') === 0) {
      const ancienne = new Image();
      ancienne.onload = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        canvas.getContext('2d').drawImage(ancienne, 0, 0, canvas.width, canvas.height);
      };
      ancienne.src = trace;
    }
  });
  return repares;
}

/* Branche les deux cadres. Idempotent : on peut l'appeler autant de fois
   que nécessaire, seuls les cadres non encore branchés sont traités. */
function brancherLesCadres() {
  try { setupCanvas('drawingCanvasPageSign1'); } catch (e) { console.warn(e); }
  try { setupCanvas('drawingCanvasPageSign2'); } catch (e) { console.warn(e); }
}

auDemarrage(function () {
  /* Chaque étape est isolée : si l'une échoue (brouillon illisible, mémoire
     saturée…), le branchement des signatures a lieu quand même. C'est LUI
     qui ne doit jamais sauter. */
  let restaure = false;
  try { restaure = loadPageContent(); } catch (e) { console.warn('brouillon illisible', e); }
  try { if (reparerSignatures()) console.log('Cadres de signature rétablis'); } catch (e) { console.warn(e); }

  brancherLesCadres();

  /* Filet de sécurité : si quoi que ce soit remplace le contenu de la page
     (restauration tardive, script tiers…), les nouveaux cadres sont
     rebranchés automatiquement. */
  const page6 = document.getElementById('page6');
  if (page6 && window.MutationObserver) {
    new MutationObserver(() => brancherLesCadres()).observe(page6, { childList: true, subtree: true });
  }
  setTimeout(brancherLesCadres, 1200);

  if (!restaure) {
    try {
      document.getElementById('visite-date-reponsable').valueAsDate = new Date();
      document.getElementById('visite-date-collaborateur').valueAsDate = new Date();
    } catch (e) { console.warn(e); }
  }

  majQuizzResultat();
  if (typeof afficherAnomalies === "function") afficherAnomalies();
  if (typeof activerAutoEnregistrement === "function") activerAutoEnregistrement();
});

window.onbeforeunload = function () {
  savePageContent();
}

function openLink(lien) {
  const newWindow = window.open(lien, '_blank');
  if (newWindow) {
    newWindow.focus();
  } else {
    alert('Veuillez autoriser les pop-ups pour ce site.');
  }
}

function redirectToQuizz() {
  savePageContent();
  window.open("quizz.html", 'blank');
}
