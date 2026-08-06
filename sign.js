renderChrome(6);

/* ===== Canvas de signature ===== */
function setupCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let painting = false;

  function startPosition(e) {
    painting = true;
    draw(e);
    e.preventDefault();
  }

  function endPosition(e) {
    painting = false;
    ctx.beginPath();
    e.preventDefault();
  }

  function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    e.preventDefault();
  }

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mouseout', endPosition);
  canvas.addEventListener('mousemove', draw);

  canvas.addEventListener('touchstart', startPosition);
  canvas.addEventListener('touchend', endPosition);
  canvas.addEventListener('touchcancel', endPosition);
  canvas.addEventListener('touchmove', draw);
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
    } else {
      input.setAttribute('value', input.value);
    }
  });
  localStorage.setItem('page6Content', page.outerHTML);
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

  // Redessiner les signatures sauvegardées
  page.querySelectorAll('canvas[data-image]').forEach(canvas => {
    const url = canvas.getAttribute('data-image');
    if (!url) return;
    const img = new Image();
    img.onload = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = url;
  });
  return true;
}

/* ===== Export / impression de la fiche complète ===== */
function printAllPages() {
  function replaceCanvasWithImages(source, targetContainer) {
    const canvases = source.querySelectorAll('canvas');
    canvases.forEach((canvas) => {
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/png');
      img.style.border = '1px solid #000';
      img.style.width = canvas.style.width || '100%';
      img.style.height = canvas.style.height || 'auto';
      img.className = canvas.className;

      const targetCanvas = targetContainer.querySelector(`#${canvas.id}`);
      if (targetCanvas) {
        targetCanvas.replaceWith(img);
      }
    });
  }

  savePageContent();

  const page1Content = localStorage.getItem('page1Content');
  const page2Content = localStorage.getItem('page2Content');
  const page3Content = localStorage.getItem('page3Content');
  const page4Content = localStorage.getItem('page4Content');
  const page5Content = localStorage.getItem('page5Content');

  const tempContainer1 = document.createElement('div');
  const tempContainer2 = document.createElement('div');
  const tempContainer3 = document.createElement('div');
  const tempContainer4 = document.createElement('div');
  const tempContainer5 = document.createElement('div');

  if (page1Content) tempContainer1.innerHTML = page1Content;
  if (page2Content) tempContainer2.innerHTML = page2Content;
  if (page3Content) tempContainer3.innerHTML = page3Content;
  if (page4Content) tempContainer4.innerHTML = page4Content;
  if (page5Content) tempContainer5.innerHTML = page5Content;

  replaceCanvasWithImages(document.body, document.body);
  replaceCanvasWithImages(document.body, tempContainer1);
  replaceCanvasWithImages(document.body, tempContainer2);
  replaceCanvasWithImages(document.body, tempContainer3);
  replaceCanvasWithImages(document.body, tempContainer4);
  replaceCanvasWithImages(document.body, tempContainer5);

  // Assemblage final
  const finalContainer = document.createElement('div');
  finalContainer.id = 'print-assembly';

  // En-tête de document (1re page uniquement)
  const nomComplet = (localStorage.getItem('Nom') || '').trim();
  const dateAccueil = document.getElementById('visite-date-reponsable')?.value || '';
  finalContainer.innerHTML += `
    <div class="print-doc-header">
      <img src="img/CDES_Logo.png" alt="CDES">
      <div>
        <div class="pdh-titre">Accueil HSE des nouveaux arrivants</div>
        <div class="pdh-sous">${nomComplet ? 'Collaborateur : ' + nomComplet : ''}${dateAccueil ? ' — Accueil du ' + dateAccueil.split('-').reverse().join('/') : ''}</div>
      </div>
    </div>`;

  if (page1Content) finalContainer.innerHTML += '<div class="page-section page-break">' + tempContainer1.innerHTML + '</div>';
  if (page2Content) finalContainer.innerHTML += '<div class="page-section page-break">' + tempContainer2.innerHTML + '</div>';
  if (page3Content) finalContainer.innerHTML += '<div class="page-section page-break">' + tempContainer3.innerHTML + '</div>';
  if (page4Content) finalContainer.innerHTML += '<div class="page-section page-break">' + tempContainer4.innerHTML + '</div>';
  if (page5Content) finalContainer.innerHTML += '<div class="page-section page-break">' + tempContainer5.innerHTML + '</div>';

  document.body.insertBefore(finalContainer, document.body.firstChild);

  // Nom de fichier explicite : AAAA-MM-JJ-Accueil HSE-Nom Prénom
  const nom = (localStorage.getItem('Nom') || '').trim();
  const date = document.getElementById('visite-date-reponsable')?.value
    || new Date().toISOString().slice(0, 10);
  const ancienTitre = document.title;
  document.title = `${date}-Accueil HSE${nom ? '-' + nom : ''}`;

  window.scrollTo(0, 0);

  setTimeout(() => {
    window.print();
    // Nettoyage après impression : retirer l'assemblage temporaire
    setTimeout(() => {
      const assembly = document.getElementById('print-assembly');
      if (assembly) assembly.remove();
      document.title = ancienTitre;
    }, 500);
  }, 500);
}

window.onload = function () {
  const restaure = loadPageContent();

  setupCanvas('drawingCanvasPageSign1');
  setupCanvas('drawingCanvasPageSign2');

  if (!restaure) {
    document.getElementById('visite-date-reponsable').valueAsDate = new Date();
    document.getElementById('visite-date-collaborateur').valueAsDate = new Date();
  }
}

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
