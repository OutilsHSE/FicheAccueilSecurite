/* =========================================================
   PDF COMPLET DE LA FICHE (pièce jointe du mail au service HSE)
   Le même document que « Exporter la fiche (PDF) » : en-tête,
   les 6 pages et le diplôme, mis en page avec les règles
   d'impression (print-pdf.css).
   Bibliothèques embarquées dans lib/ — aucun CDN, le réseau CDES
   en filtre certains.
   ========================================================= */

/* A4 à 96 dpi, marges de 8 mm comme @page */
const PDF_A4_MM = { l: 210, h: 297 };
const PDF_MARGE_MM = 8;
const PDF_LARGEUR_PX = 780;          // largeur de rendu du document
const PDF_QUALITE = 0.75;            // JPEG (09/10/2026 : 0.86 → 0.75, −40 % de poids, texte toujours net)
const PDF_ECHELLE = 1.6;             // rendu html2canvas (09/10/2026 : 2 → 1.6, ≈ 150 dpi, rendu plus rapide)
const PDF_DELAI_IMAGE_MS = 2500;     // au-delà, une vignette externe est remplacée par sa légende

function pdfDisponible() {
  return !!(window.html2canvas && window.jspdf && window.jspdf.jsPDF);
}

/* Attend le chargement des images (ou abandonne au bout de 4 s : une
   vignette Drive injoignable ne doit pas bloquer l'envoi) */
function attendreImages(racine, delaiMax) {
  const images = [...racine.querySelectorAll('img')].filter(i => i.src && !i.complete);
  if (!images.length) return Promise.resolve();
  return Promise.race([
    Promise.all(images.map(i => new Promise(ok => {
      i.addEventListener('load', ok, { once: true });
      i.addEventListener('error', ok, { once: true });
    }))),
    new Promise(ok => setTimeout(ok, delaiMax || 4000))
  ]);
}

/* Les images d'un autre domaine (vignettes Google Drive) « salissent » le
   canvas et empêchent la génération. On les rapatrie en données locales
   quand c'est possible, sinon on les remplace par leur légende. */
async function neutraliserImagesExternes(racine) {
  /* 09/10/2026 — avant, chaque vignette était rapatriée l'une APRÈS l'autre, sans
     limite de temps : avec 20 à 30 vignettes Drive (qui refusent souvent le partage
     inter-sites), l'envoi attendait 20 à 60 s pour finir par les remplacer par leur
     légende. Désormais : toutes EN PARALLÈLE, 2,5 s maximum chacune. */
  const images = [...racine.querySelectorAll('img')].filter(img => {
    const src = img.getAttribute('src') || '';
    if (!src || src.indexOf('data:') === 0) return false;
    let absolu; try { absolu = new URL(src, location.href); } catch (e) { absolu = null; }
    return !(absolu && absolu.origin === location.origin);   // même site : sans risque
  });
  await Promise.all(images.map(async img => {
    const src = img.getAttribute('src');
    let remplacee = false;
    const ctrl = ('AbortController' in window) ? new AbortController() : null;
    const minuteur = ctrl ? setTimeout(() => ctrl.abort(), PDF_DELAI_IMAGE_MS) : null;
    try {
      const rep = await fetch(src, { mode: 'cors', credentials: 'omit', signal: ctrl ? ctrl.signal : undefined });
      if (rep.ok) {
        const blob = await rep.blob();
        img.src = await new Promise((ok, ko) => {
          const l = new FileReader();
          l.onload = () => ok(l.result);
          l.onerror = ko;
          l.readAsDataURL(blob);
        });
        remplacee = true;
      }
    } catch (e) { /* domaine qui refuse le partage, ou trop lent : on retire l'image */ }
    if (minuteur) clearTimeout(minuteur);
    if (!remplacee) {
      const legende = document.createElement('span');
      legende.className = 'pdf-image-absente';
      legende.textContent = img.getAttribute('alt') || 'document consultable dans l\'application';
      img.replaceWith(legende);
    }
  }));
}

/* Construit le PDF et le renvoie en base64 (sans l'en-tête data:) */
async function genererPdfFiche(avancement) {
  if (!pdfDisponible()) throw new Error("bibliothèque PDF absente (dossier lib/)");

  if (typeof savePageContent === "function") {
    try { savePageContent(); } catch (e) { console.warn(e); }
  }

  const hote = document.createElement('div');
  hote.id = 'pdf-rendu';
  hote.style.cssText = 'position:fixed; left:-20000px; top:0; z-index:-1; background:#fff; padding:0; margin:0;';
  hote.style.setProperty('width', PDF_LARGEUR_PX + 'px', 'important');

  hote.appendChild(construireAssemblage());
  const diplome = construireDiplome();
  if (diplome) { diplome.style.display = 'block'; hote.appendChild(diplome); }

  document.body.appendChild(hote);
  /* les vignettes sont « lazy » dans la page : hors écran, elles ne se chargeraient
     jamais et l'attente irait au bout de ses 4 s pour rien */
  hote.querySelectorAll('img[loading="lazy"]').forEach(img => { img.loading = 'eager'; });

  try {
    await attendreImages(hote);
    await neutraliserImagesExternes(hote);
    await attendreImages(hote, 2000);

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const largeurUtileMm = PDF_A4_MM.l - 2 * PDF_MARGE_MM;
    const hauteurUtileMm = PDF_A4_MM.h - 2 * PDF_MARGE_MM;

    /* Un bloc = une page du document imprimé. L'en-tête accompagne la
       première page, comme à l'impression. */
    const assemblage = hote.querySelector('#print-assembly');
    const entete = assemblage.querySelector('.print-doc-header');
    const blocs = [...assemblage.querySelectorAll('.page-section')];
    if (diplome) blocs.push(diplome);

    let premiere = true;
    for (let i = 0; i < blocs.length; i++) {
      if (avancement) avancement(i + 1, blocs.length);

      let cible = blocs[i];
      /* première page : en-tête + contenu rendus ensemble */
      let enveloppe = null;
      if (premiere && entete) {
        enveloppe = document.createElement('div');
        enveloppe.style.setProperty('width', PDF_LARGEUR_PX + 'px', 'important');
        enveloppe.appendChild(entete.cloneNode(true));
        enveloppe.appendChild(cible.cloneNode(true));
        hote.appendChild(enveloppe);
        cible = enveloppe;
      }

      const toile = await html2canvas(cible, {
        scale: PDF_ECHELLE,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: PDF_LARGEUR_PX,
        width: PDF_LARGEUR_PX
      });
      if (enveloppe) enveloppe.remove();

      /* hauteur d'une page A4, exprimée en pixels de cette image */
      const pxParMm = toile.width / largeurUtileMm;
      const pageHautePx = Math.floor(hauteurUtileMm * pxParMm);

      /* Un bloc à peine trop grand est réduit pour tenir sur une page,
         plutôt que de déborder de deux centimètres sur la suivante
         (c'est l'équivalent du « Ajuster à la page » de l'impression). */
      if (toile.height > pageHautePx && toile.height <= pageHautePx * 1.3) {
        const facteur = pageHautePx / toile.height;
        if (!premiere) pdf.addPage();
        premiere = false;
        pdf.addImage(toile.toDataURL('image/jpeg', PDF_QUALITE), 'JPEG',
                     PDF_MARGE_MM, PDF_MARGE_MM,
                     largeurUtileMm * facteur, hauteurUtileMm, undefined, 'FAST');
        continue;
      }

      let y = 0;

      while (y < toile.height) {
        const hautePx = Math.min(pageHautePx, toile.height - y);
        const tranche = document.createElement('canvas');
        tranche.width = toile.width;
        tranche.height = hautePx;
        const ctx = tranche.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, tranche.width, tranche.height);
        ctx.drawImage(toile, 0, y, toile.width, hautePx, 0, 0, toile.width, hautePx);

        if (!premiere) pdf.addPage();
        premiere = false;

        pdf.addImage(tranche.toDataURL('image/jpeg', PDF_QUALITE), 'JPEG',
                     PDF_MARGE_MM, PDF_MARGE_MM,
                     largeurUtileMm, hautePx / pxParMm, undefined, 'FAST');
        y += hautePx;
      }
    }

    const donnees = pdf.output('datauristring');
    return donnees.substring(donnees.indexOf(',') + 1);
  } finally {
    hote.remove();
  }
}

/* Téléchargement direct — utile pour vérifier la pièce jointe */
async function telechargerPdfFiche() {
  const base64 = await genererPdfFiche();
  const octets = atob(base64);
  const tableau = new Uint8Array(octets.length);
  for (let i = 0; i < octets.length; i++) tableau[i] = octets.charCodeAt(i);
  const lien = document.createElement('a');
  lien.href = URL.createObjectURL(new Blob([tableau], { type: 'application/pdf' }));
  lien.download = nomFichierFiche() + '.pdf';
  lien.click();
  setTimeout(() => URL.revokeObjectURL(lien.href), 4000);
}
