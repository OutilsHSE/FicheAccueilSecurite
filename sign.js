
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
 async function printAllPages(mode) {

  // Convertir les canvas → images et attendre le chargement
  function replaceCanvasWithImages(source, targetContainer) {
    return new Promise(resolve => {
      const canvases = source.querySelectorAll('canvas');

      if (canvases.length === 0) return resolve();

      let done = 0;
      canvases.forEach(canvas => {
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.style.border = '1px solid #000';
        img.style.width = canvas.style.width || '100%';
        img.style.height = canvas.style.height || 'auto';
        img.className = canvas.className;

        const targetCanvas = targetContainer.querySelector(`#${canvas.id}`);
        if (targetCanvas) {
          img.onload = () => {
            targetCanvas.replaceWith(img);
            done++;
            if (done === canvases.length) resolve();
          };
        } else {
          done++;
          if (done === canvases.length) resolve();
        }
      });
    });
  }

  // Récupération des pages stockées
  const page1Content = localStorage.getItem('page1Content');
  const page2Content = localStorage.getItem('page2Content');
  const page3Content = localStorage.getItem('page3Content');
  const page4Content = localStorage.getItem('page4Content');
  const page5Content = localStorage.getItem('page5Content');

  // Page 6 : préparer inputs/select/textarea
  const page = document.querySelector('#page6');
  const inputs = page.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    if (input.type === 'checkbox' || input.type === 'radio') {
      input.checked ? input.setAttribute('checked', 'checked') : input.removeAttribute('checked');
    } else {
      input.setAttribute('value', input.value);
    }

    if (input.tagName === 'textarea') input.textContent = input.value;
    if (input.tagName === 'select') {
      input.querySelectorAll('option').forEach(opt => {
        opt.selected = opt.value === input.value;
      });
    }
  });

  // Cloner page 6
  const page6Clone = page.cloneNode(true);

  // Conteneurs temporaires pour les pages
  const containers = [page1Content, page2Content, page3Content, page4Content, page5Content].map(c => {
    const div = document.createElement('div');
    if (c) div.innerHTML = c;
    return div;
  });

  // Remplacer canvas dans toutes les pages
  for (const div of containers) {
    await replaceCanvasWithImages(document.body, div);
  }
  await replaceCanvasWithImages(document.body, page6Clone);

  // Construire le contenu imprimable
  const finalContainer = document.createElement('div');
  finalContainer.id = "print-wrapper";
  finalContainer.style.padding = "20px";

  containers.forEach(div => {
    if (div.innerHTML.trim() !== "")
      finalContainer.innerHTML += `<div class="page-section force-break">${div.innerHTML}</div>`;
  });

  finalContainer.innerHTML += `<div class="page-section force-break">${page6Clone.outerHTML}</div>`;

  // Sauvegarder la page actuelle
  const originalHTML = document.body.innerHTML;

  // Remplacer par la version imprimable
  document.body.innerHTML = finalContainer.outerHTML;

  // Laisser un petit délai pour le chargement des images
  await new Promise(res => setTimeout(res, 300));

  // Imprimer
  window.print();

  // Restaurer la page
  document.body.innerHTML = originalHTML;
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