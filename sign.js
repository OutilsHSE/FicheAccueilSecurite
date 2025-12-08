
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
  setupCanvas('drawingCanvasPageSign1');
  setupCanvas('drawingCanvasPageSign2');

  // Bouton pour effacer
  function clearCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function printAllPages(mode) {

  // Remplace les canvas du "source" par des <img> dans le conteneur cible
  function replaceCanvasWithImages(source, targetContainer) {
    const canvases = source.querySelectorAll('canvas');

    canvases.forEach((canvas) => {
      let dataUrl;
      try {
        // Si le canvas contient des images externes → ça peut jeter une SecurityError
        dataUrl = canvas.toDataURL('image/png');
      } catch (e) {
        console.warn('Canvas non exportable (tainted ?) :', canvas.id, e);
        return; // on saute ce canvas, on ne bloque pas toute l’impression
      }

      const img = document.createElement('img');
      img.src = dataUrl;
      img.style.border = '1px solid #000';
      img.style.width = canvas.style.width || '100%';
      img.style.height = canvas.style.height || 'auto';
      img.className = canvas.className; // garde la classe si besoin

      // Trouve le canvas correspondant dans le container cible
      const targetCanvas = targetContainer.querySelector('#' + canvas.id);
      if (targetCanvas) {
        targetCanvas.replaceWith(img);
      }
    });
  }

  // --- Récupération des pages 1 à 5 depuis le localStorage ---
  const page1Content = localStorage.getItem('page1Content');
  const page2Content = localStorage.getItem('page2Content');
  const page3Content = localStorage.getItem('page3Content');
  const page4Content = localStorage.getItem('page4Content');
  const page5Content = localStorage.getItem('page5Content');

  // --- Préparation de la page 6 en lisant les valeurs actuelles ---
  const page = document.querySelector('#page6');
  const inputs = page.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    const tag = input.tagName.toLowerCase();

    if (input.type === 'checkbox' || input.type === 'radio') {
      input.checked
        ? input.setAttribute('checked', 'checked')
        : input.removeAttribute('checked');
    } else {
      input.setAttribute('value', input.value);
    }

    if (tag === 'textarea') {
      input.textContent = input.value;
    }

    if (tag === 'select') {
      input.querySelectorAll('option').forEach(option => {
        option.selected = (option.value === input.value);
      });
    }
  });

  // On clone la page 6
  const page6Clone = page.cloneNode(true);
  // Et on ne remplace les canvas que dans le clone
  replaceCanvasWithImages(page, page6Clone);

  // --- Conteneurs temporaires pour les pages 1 à 5 ---
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

  // On remplace les canvas des pages 1 à 5 dans les conteneurs
  // en utilisant les canvas du document actuel comme source
  replaceCanvasWithImages(document.body, tempContainer1);
  replaceCanvasWithImages(document.body, tempContainer2);
  replaceCanvasWithImages(document.body, tempContainer3);
  replaceCanvasWithImages(document.body, tempContainer4);
  replaceCanvasWithImages(document.body, tempContainer5);

  // --- Assemblage final dans un conteneur hors DOM ---
  const finalContainer = document.createElement('div');
  finalContainer.style.padding = '20px'; // mise en page propre

    finalContainer.innerHTML +=
      '<div class="page-section force-break">' + tempContainer1.innerHTML + '</div>';
    finalContainer.innerHTML +=
      '<div class="page-section force-break">' + tempContainer2.innerHTML + '</div>';
    finalContainer.innerHTML +=
      '<div class="page-section force-break">' + tempContainer3.innerHTML + '</div>';

    finalContainer.innerHTML +=
      '<div class="page-section force-break">' + tempContainer4.innerHTML + '</div>';
    finalContainer.innerHTML +=
      '<div class="page-section force-break">' + tempContainer5.innerHTML + '</div>';

  finalContainer.innerHTML +=
    '<div class="page-section force-break">' + page6Clone.outerHTML + '</div>';

  const htmlToPrint = finalContainer.innerHTML;

  // --- Ouvrir la fenêtre d'impression ---
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert("Impossible d'ouvrir la fenêtre d'impression (popup bloquée ?).");
    return;
  }

  printWindow.document.open();
  printWindow.document.write('<html><head>');
  printWindow.document.write('<title>Impression</title>');
  printWindow.document.write('<link rel="stylesheet" href="global.css">');
  printWindow.document.write('</head><body>');
  printWindow.document.write(htmlToPrint);
  printWindow.document.write('</body></html>');
  printWindow.document.close();

  // Quand la nouvelle fenêtre a tout chargé : on imprime
  printWindow.onload = function () {
    // petit délai pour laisser le temps au moteur de layout (surtout mobile)
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 300);
  };
}


  window.onload = function () {
    document.getElementById('visite-date-reponsable').valueAsDate = new Date();
    document.getElementById('visite-date-collaborateur').valueAsDate = new Date();
  }
  function openLink(lien) {
    const newWindow = window.open(lien, '_blank');
    if (newWindow) {
      newWindow.focus();
    } else {
      alert('Veuillez autoriser les pop-ups pour ce site.');
    }
  }