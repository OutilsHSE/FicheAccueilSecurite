
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
function printAllPages() {
  function replaceCanvasWithImages(source, targetContainer) {
    const canvases = source.querySelectorAll('canvas');
    canvases.forEach((canvas) => {
      try {
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png'); // => marche seulement si canvas NON tainted
        img.style.border = '1px solid #000';
        img.style.width = canvas.style.width || '100%';
        img.style.height = canvas.style.height || 'auto';
        img.className = canvas.className;

        const targetCanvas = targetContainer.querySelector('#' + canvas.id);
        if (targetCanvas) {
          targetCanvas.replaceWith(img);
        }
      } catch (e) {
        console.error('Canvas tainted, impossible de convertir en image :', canvas.id, e);
      }
    });
  }

  const page1Content = localStorage.getItem('page1Content');
  const page2Content = localStorage.getItem('page2Content');
  const page3Content = localStorage.getItem('page3Content');
  const page4Content = localStorage.getItem('page4Content');
  const page5Content = localStorage.getItem('page5Content');

  // figer la page 6
  const page6 = document.querySelector('#page6');
  const inputs = page6.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    const tag = input.tagName.toLowerCase();

    if (input.type === 'checkbox' || input.type === 'radio') {
      input.checked
        ? input.setAttribute('checked', 'checked')
        : input.removeAttribute('checked');
    } else {
      input.setAttribute('value', input.value || '');
    }

    if (tag === 'textarea') input.textContent = input.value || '';

    if (tag === 'select') {
      const val = input.value;
      input.querySelectorAll('option').forEach(opt => {
        opt.selected = (opt.value === val);
      });
    }
  });

  const page6Clone = page6.cloneNode(true);

  // containers des pages 1 à 5
  const temp1 = document.createElement('div');
  const temp2 = document.createElement('div');
  const temp3 = document.createElement('div');
  const temp4 = document.createElement('div');
  const temp5 = document.createElement('div');

  if (page1Content) temp1.innerHTML = page1Content;
  if (page2Content) temp2.innerHTML = page2Content;
  if (page3Content) temp3.innerHTML = page3Content;
  if (page4Content) temp4.innerHTML = page4Content;
  if (page5Content) temp5.innerHTML = page5Content;

  // conversion canvas → img dans les containers
  replaceCanvasWithImages(document.body, temp1);
  replaceCanvasWithImages(document.body, temp2);
  replaceCanvasWithImages(document.body, temp3);
  replaceCanvasWithImages(document.body, temp4);
  replaceCanvasWithImages(document.body, temp5);
  replaceCanvasWithImages(document.body, page6Clone);

  // assemblage pour impression
  const finalContainer = document.createElement('div');
  finalContainer.style.padding = '20px';

  if (page1Content) finalContainer.innerHTML += '<div class="page-section force-break">' + temp1.innerHTML + '</div>';
  if (page2Content) finalContainer.innerHTML += '<div class="page-section force-break">' + temp2.innerHTML + '</div>';
  if (page3Content) finalContainer.innerHTML += '<div class="page-section force-break">' + temp3.innerHTML + '</div>';
  if (page4Content) finalContainer.innerHTML += '<div class="page-section force-break">' + temp4.innerHTML + '</div>';
  if (page5Content) finalContainer.innerHTML += '<div class="page-section force-break">' + temp5.innerHTML + '</div>';
  finalContainer.innerHTML += '<div class="page-section force-break">' + page6Clone.outerHTML + '</div>';

  const htmlToPrint = finalContainer.innerHTML;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert("Popup d'impression bloquée.");
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

  printWindow.onload = function () {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 1000);
  };
}


