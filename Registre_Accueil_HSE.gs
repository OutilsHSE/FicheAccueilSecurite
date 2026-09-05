/*****************************************************************
 *  ACCUEIL HSE CDES — REGISTRE + ENVOI AU SERVICE HSE
 *
 *  ⚠️ CE FICHIER NE DÉFINIT PAS doPost : il est fait pour être AJOUTÉ
 *     au projet Apps Script qui gère déjà les fiches de formation,
 *     sans entrer en conflit avec le doPost existant.
 *
 *  INSTALLATION (2 minutes)
 *  1. Ouvrir le projet Apps Script des fiches de formation
 *     (celui dont l'URL /exec est déjà utilisée par vos outils)
 *  2. « + » à côté de Fichiers → Script → nommer « Accueil HSE »
 *     → coller tout ce fichier
 *  3. Ouvrir votre fichier Code.gs et ajouter CES DEUX LIGNES
 *     tout au début de la fonction doPost, juste après le JSON.parse :
 *
 *         if (p.action === 'accueil-hse')  return enregistrerAccueilHSE_(p);
 *         if (p.action === 'mail-accueil') return mailAccueilHSE_(p);
 *
 *     (« p » est la variable qui contient les données reçues ;
 *      si elle porte un autre nom chez vous, utilisez ce nom-là.)
 *  4. Déployer → Gérer les déploiements → ✏️ → Version : Nouvelle
 *     → Déployer.  ⚠️ L'URL /exec ne change pas : rien à modifier
 *     dans config.js.
 *
 *  Si vous préférez un projet séparé, ajoutez simplement ce doPost :
 *      function doPost(e) {
 *        var p = JSON.parse(e.postData.contents);
 *        if (p.action === 'accueil-hse')  return enregistrerAccueilHSE_(p);
 *        if (p.action === 'mail-accueil') return mailAccueilHSE_(p);
 *        return reponseAccueil_({ ok: false, error: 'Action inconnue' });
 *      }
 *  ...et reportez la nouvelle URL /exec dans config.js.
 *****************************************************************/

/* Classeur cible : « Registre Fiches Formation CDES » */
var ACC_ID_CLASSEUR = '1XIeV7sAdiaCEvCLYckiIVRa2eG1Gc3s9Kkozz8Bzbu8';

var ACC_ONGLET_ACCUEILS   = 'Accueils HSE';
var ACC_ONGLET_FORMATIONS = 'Formations à prévoir';
var ACC_ONGLET_ANOMALIES  = 'Anomalies accueil';

var ACC_COLONNES_ACCUEILS = [
  'Enregistré le', 'Date accueil', 'Lieu', 'Animateur HSE',
  'Nom', 'Prénom', 'Statut', 'Agence CDES', 'Entreprise / intérim',
  'Date entrée', 'Poste de travail', 'Activités',
  'Visite médicale', 'Date visite',
  'Formations autorisées', 'Preuves manquantes',
  'EPI manquants', 'Équipements manquants',
  'Postes risques', 'Fiches risque vues', 'RETEX vus',
  'Référent chantier', 'Consignes vues', 'Vigiminute',
  'Parcours sécurité', 'Score quizz',
  'Engagements', 'Signature responsable', 'Signature collaborateur',
  'Anomalies', 'dont majeures', 'Envoyé au HSE', 'Version', 'Clé',
  /* Contenu des 6 pages, découpé en tranches : c'est ce qui permet de
     rouvrir une fiche depuis l'application (bouton « Reprendre une fiche »).
     Colonnes techniques, masquées automatiquement. */
  'Reprise 1', 'Reprise 2', 'Reprise 3', 'Reprise 4', 'Reprise 5', 'Reprise 6'
];

var ACC_TRANCHE  = 45000;   /* une cellule accepte 50 000 caractères */
var ACC_TRANCHES = 6;

/* Numéros de colonne (1 = A) calculés d'après les libellés : ajouter une
   colonne ne casse plus la recherche par clé ni la date d'envoi. */
function colAccueil_(libelle) {
  return ACC_COLONNES_ACCUEILS.indexOf(libelle) + 1;
}

var ACC_COLONNES_FORMATIONS = [
  'Enregistré le', 'Date accueil', 'Nom', 'Prénom', 'Agence CDES',
  'Poste de travail', 'Formation à programmer', 'Origine', 'Clé'
];

var ACC_COLONNES_ANOMALIES = [
  'Enregistré le', 'Date accueil', 'Nom', 'Prénom', 'Agence CDES',
  'Gravité', 'Sujet', 'Détail', 'Clé'
];

/* ═════════════════ 1. ENREGISTREMENT DANS LE REGISTRE ═════════════════ */

function enregistrerAccueilHSE_(p) {
  /* Trois usages passent par la même action « accueil-hse », pour ne rien
     avoir à ajouter au doPost du projet : enregistrer (défaut), lister les
     fiches reprenables, et recharger une fiche. */
  if (p.mode === 'liste')   return listerAccueilsHSE_();
  if (p.mode === 'charger') return chargerAccueilHSE_(p);

  var f = p.fiche || {};
  var anomalies = p.anomalies || [];
  var formations = p.formations || [];
  var cle = p.key || '';
  var maintenant = new Date();
  var majeures = 0;
  for (var i = 0; i < anomalies.length; i++) {
    if (anomalies[i].gravite === 'Majeure') majeures++;
  }

  var classeur = SpreadsheetApp.openById(ACC_ID_CLASSEUR);
  var fa = ongletAccueil_(classeur, ACC_ONGLET_ACCUEILS, ACC_COLONNES_ACCUEILS);

  /* On conserve la date d'envoi au HSE si elle existe déjà */
  var ligneExistante = trouverLigneAccueil_(fa, colAccueil_('Clé'), cle);
  var envoiHSE = '';
  if (ligneExistante > 0) {
    envoiHSE = fa.getRange(ligneExistante, colAccueil_('Envoyé au HSE')).getValue();
  }
  if (p.marquerEnvoi) envoiHSE = maintenant;

  var ligne = [
    maintenant,
    f.dateAccueil || '',
    f.lieu || '',
    f.animateur || '',
    f.nom || '',
    f.prenom || '',
    f.statut || '',
    f.agenceCdes || '',
    f.agenceInterim || '',
    f.dateEntree || '',
    f.posteTravail || '',
    f.activites || '',
    f.visiteRealisee ? 'Réalisée' : (f.visitePlanifiee ? 'Planifiée' : '⚠️ Non renseignée'),
    f.dateMedicale || '',
    (f.formationsAutorisees || []).join('\n'),
    (f.formationsSansPreuve || []).join('\n'),
    (f.epiManquants || []).join('\n'),
    (f.equipementsManquants || []).join('\n'),
    (f.postesRisques || []).join(' / '),
    (f.risquesVus || 0) + ' / ' + (f.risquesTotal || 0),
    (f.retexVus || 0) + ' / ' + (f.retexTotal || 0),
    (f.referent || '') + (f.referentFonction ? ' (' + f.referentFonction + ')' : ''),
    (f.consignesVues || 0) + ' / ' + (f.consignesTotal || 0),
    (f.vigiminuteVus || 0) + ' / ' + (f.vigiminuteTotal || 0),
    [f.quizzKromi ? 'Kromi' : '', f.quizzDemat ? 'Quizz fiche' : ''].filter(String).join(' + ') || '⚠️ Aucun',
    (f.quizzScore != null ? f.quizzScore + ' %' : ''),
    (f.engagements || 0) + ' / ' + (f.engagementsTotal || 0),
    f.signatureResponsable ? '✅' : '⚠️ Manquante',
    f.signatureCollaborateur ? '✅' : '⚠️ Manquante',
    anomalies.length,
    majeures,
    envoiHSE,
    p.version || '',
    cle
  ];

  /* Contenu des pages, pour pouvoir rouvrir la fiche plus tard */
  var reprise = ['', '', '', '', '', ''];
  if (p.brouillons) {
    var json = JSON.stringify(p.brouillons);
    if (json.length <= ACC_TRANCHE * ACC_TRANCHES) {
      for (var t = 0; t < ACC_TRANCHES; t++) {
        reprise[t] = json.substring(t * ACC_TRANCHE, (t + 1) * ACC_TRANCHE);
      }
    }
    /* trop volumineux : on n'écrase pas une reprise déjà enregistrée */
    else if (ligneExistante > 0) {
      reprise = fa.getRange(ligneExistante, colAccueil_('Reprise 1'),
                            1, ACC_TRANCHES).getValues()[0];
    }
  } else if (ligneExistante > 0) {
    reprise = fa.getRange(ligneExistante, colAccueil_('Reprise 1'),
                          1, ACC_TRANCHES).getValues()[0];
  }
  ligne = ligne.concat(reprise);

  if (ligneExistante > 0) fa.getRange(ligneExistante, 1, 1, ligne.length).setValues([ligne]);
  else fa.appendRow(ligne);

  var ff = ongletAccueil_(classeur, ACC_ONGLET_FORMATIONS, ACC_COLONNES_FORMATIONS);
  supprimerLignesAccueil_(ff, ACC_COLONNES_FORMATIONS.length, cle);
  formations.forEach(function (x) {
    ff.appendRow([maintenant, f.dateAccueil || '', f.nom || '', f.prenom || '',
                  f.agenceCdes || '', f.posteTravail || '',
                  x.formation || '', x.origine || '', cle]);
  });

  var fan = ongletAccueil_(classeur, ACC_ONGLET_ANOMALIES, ACC_COLONNES_ANOMALIES);
  supprimerLignesAccueil_(fan, ACC_COLONNES_ANOMALIES.length, cle);
  anomalies.forEach(function (a) {
    fan.appendRow([maintenant, f.dateAccueil || '', f.nom || '', f.prenom || '',
                   f.agenceCdes || '', a.gravite || '', a.sujet || '', a.detail || '', cle]);
  });

  return reponseAccueil_({ ok: true, anomalies: anomalies.length, majeures: majeures });
}

/* ═════════════ 1 bis. REPRISE D'UNE FICHE ENREGISTRÉE ═════════════ */

/* Liste des fiches reprenables, la plus récente d'abord */
function listerAccueilsHSE_() {
  var classeur = SpreadsheetApp.openById(ACC_ID_CLASSEUR);
  var fa = ongletAccueil_(classeur, ACC_ONGLET_ACCUEILS, ACC_COLONNES_ACCUEILS);
  var n = fa.getLastRow();
  if (n < 2) return reponseAccueil_({ ok: true, fiches: [] });

  var vals = fa.getRange(2, 1, n - 1, ACC_COLONNES_ACCUEILS.length).getValues();
  var iCle = ACC_COLONNES_ACCUEILS.indexOf('Clé');
  var fiches = [];
  for (var r = 0; r < vals.length; r++) {
    var l = vals[r];
    if (!l[iCle]) continue;
    fiches.push({
      cle: String(l[iCle]),
      nom: l[4], prenom: l[5], agence: l[7], poste: l[10],
      date: formaterDate_(l[0]),
      quand: (l[0] instanceof Date) ? l[0].getTime() : 0
    });
  }
  fiches.sort(function (a, b) { return b.quand - a.quand; });
  return reponseAccueil_({ ok: true, fiches: fiches });
}

/* Contenu complet d'une fiche, pour la rouvrir dans l'application */
function chargerAccueilHSE_(p) {
  var cle = p.key || '';
  if (!cle) return reponseAccueil_({ ok: false, error: 'clé manquante' });

  var classeur = SpreadsheetApp.openById(ACC_ID_CLASSEUR);
  var fa = ongletAccueil_(classeur, ACC_ONGLET_ACCUEILS, ACC_COLONNES_ACCUEILS);
  var ligne = trouverLigneAccueil_(fa, colAccueil_('Clé'), cle);
  if (ligne < 1) return reponseAccueil_({ ok: false, error: 'fiche introuvable' });

  var l = fa.getRange(ligne, 1, 1, ACC_COLONNES_ACCUEILS.length).getValues()[0];
  var tranches = l.slice(colAccueil_('Reprise 1') - 1).join('');
  if (!tranches) {
    return reponseAccueil_({ ok: false,
      error: 'cette fiche a été enregistrée avant la mise en place de la reprise' });
  }

  var brouillons;
  try { brouillons = JSON.parse(tranches); }
  catch (e) { return reponseAccueil_({ ok: false, error: 'contenu illisible : ' + e }); }

  return reponseAccueil_({
    ok: true,
    brouillons: brouillons,
    nom: ((l[5] || '') + ' ' + (l[4] || '')).trim(),
    poste: l[10] || '',
    activites: l[11] || ''
  });
}

/* ═════════════════ 2. ENVOI DE LA FICHE AU SERVICE HSE ═════════════════ */

function mailAccueilHSE_(p) {
  var f = p.fiche || {};
  var dest = p.destinataire;
  if (!dest) return reponseAccueil_({ ok: false, error: 'Destinataire manquant' });

  /* On enregistre d'abord la fiche (et on marque la date d'envoi) */
  p.marquerEnvoi = true;
  enregistrerAccueilHSE_(p);

  var qui = ((f.prenom || '') + ' ' + (f.nom || '')).trim() || 'Collaborateur';
  var sujet = 'Accueil HSE — ' + qui + (f.dateAccueil ? ' — ' + formaterDate_(f.dateAccueil) : '');

  var html = corpsMailAccueil_(p);

  var options = { htmlBody: html, name: 'Fiche d\'accueil HSE CDES' };

  /* Signatures jointes en image dans le corps du message */
  var images = {};
  var sigs = p.signatures || {};
  if (sigs.responsable)   images.sigResp   = blobSignature_(sigs.responsable, 'signature-responsable.png');
  if (sigs.collaborateur) images.sigCollab = blobSignature_(sigs.collaborateur, 'signature-collaborateur.png');
  if (Object.keys(images).length) options.inlineImages = images;

  /* Version PDF de la fiche, en pièce jointe */
  try {
    var pdf = Utilities.newBlob(html, MimeType.HTML, 'fiche.html').getAs(MimeType.PDF);
    pdf.setName(nomFichierAccueil_(f) + '.pdf');
    options.attachments = [pdf];
  } catch (err) {
    /* Si la conversion échoue, le mail part quand même */
  }

  MailApp.sendEmail(dest, sujet, texteBrutAccueil_(p), options);

  return reponseAccueil_({ ok: true, destinataire: dest });
}

function corpsMailAccueil_(p) {
  var f = p.fiche || {};
  var anomalies = p.anomalies || [];
  var formations = p.formations || [];
  var majeures = anomalies.filter(function (a) { return a.gravite === 'Majeure'; }).length;
  var sigs = p.signatures || {};

  function ligne(libelle, valeur) {
    if (valeur === '' || valeur == null) valeur = '—';
    return '<tr><td style="padding:6px 12px;border-bottom:1px solid #E4EAF2;color:#5A6B7C;width:230px">' + libelle +
           '</td><td style="padding:6px 12px;border-bottom:1px solid #E4EAF2;color:#1A2B3C"><b>' + valeur + '</b></td></tr>';
  }

  var h = '<div style="font-family:Arial,Helvetica,sans-serif;max-width:760px;color:#1A2B3C">';

  h += '<div style="background:#003A6E;color:#fff;padding:18px 22px;border-radius:8px 8px 0 0">' +
       '<div style="font-size:19px;font-weight:bold">Accueil HSE des nouveaux arrivants</div>' +
       '<div style="font-size:13px;opacity:.85;margin-top:3px">CDES — fiche transmise au service HSE</div></div>';

  h += '<div style="border:1px solid #D0DAE8;border-top:none;padding:18px 22px;border-radius:0 0 8px 8px">';

  h += '<h3 style="color:#003A6E;margin:0 0 8px">Collaborateur</h3><table style="width:100%;border-collapse:collapse;font-size:14px">';
  h += ligne('Nom et prénom', ((f.nom || '') + ' ' + (f.prenom || '')).trim());
  h += ligne('Statut', f.statut);
  h += ligne('Agence CDES', f.agenceCdes);
  if (f.agenceInterim) h += ligne('Entreprise / intérim', f.agenceInterim);
  h += ligne('Date d\'entrée', formaterDate_(f.dateEntree));
  h += ligne('Poste de travail', f.posteTravail);
  h += ligne('Activités', f.activites);
  h += '</table>';

  h += '<h3 style="color:#003A6E;margin:18px 0 8px">Accueil</h3><table style="width:100%;border-collapse:collapse;font-size:14px">';
  h += ligne('Date de l\'accueil', formaterDate_(f.dateAccueil));
  h += ligne('Lieu', f.lieu);
  h += ligne('Animateur HSE', f.animateur);
  h += ligne('Référent chantier', (f.referent || '') + (f.referentFonction ? ' (' + f.referentFonction + ')' : ''));
  h += '</table>';

  h += '<h3 style="color:#003A6E;margin:18px 0 8px">Points clés</h3><table style="width:100%;border-collapse:collapse;font-size:14px">';
  h += ligne('Aptitude médicale', (f.visiteRealisee ? 'Réalisée' : (f.visitePlanifiee ? 'Planifiée' : '⚠️ Non renseignée')) +
             (f.dateMedicale ? ' — ' + formaterDate_(f.dateMedicale) : ''));
  h += ligne('Formations autorisées', (f.formationsAutorisees || []).join('<br>'));
  if ((f.formationsSansPreuve || []).length)
    h += ligne('⚠️ Preuves manquantes', '<span style="color:#C0392B">' + f.formationsSansPreuve.join('<br>') + '</span>');
  h += ligne('EPI non fournis', (f.epiManquants || []).length ?
             '<span style="color:#C0392B">' + f.epiManquants.join(', ') + '</span>' : 'Aucun');
  h += ligne('Équipements HSE non fournis', (f.equipementsManquants || []).length ? f.equipementsManquants.join(', ') : 'Aucun');
  h += ligne('Postes de travail (risques)', (f.postesRisques || []).join(' / '));
  h += ligne('Fiches de risque présentées', (f.risquesVus || 0) + ' / ' + (f.risquesTotal || 0));
  h += ligne('Consignes présentées', (f.consignesVues || 0) + ' / ' + (f.consignesTotal || 0));
  h += ligne('Vigiminute', (f.vigiminuteVus || 0) + ' / ' + (f.vigiminuteTotal || 0));
  h += ligne('Parcours sécurité', [f.quizzKromi ? 'Kromi' : '', f.quizzDemat ? 'Quizz de la fiche' : ''].filter(String).join(' + ') || '⚠️ Aucun' +
             (f.quizzScore != null ? ' (' + f.quizzScore + ' %)' : ''));
  h += ligne('Attestation de nage', f.savoirNager ? 'Sait nager' : 'Formation natation souhaitée / non renseignée');
  h += ligne('Engagements signés', (f.engagements || 0) + ' / ' + (f.engagementsTotal || 0));
  h += '</table>';

  if (formations.length) {
    h += '<h3 style="color:#003A6E;margin:18px 0 8px">Formations à programmer</h3><ul style="font-size:14px;margin:0;padding-left:20px">';
    formations.forEach(function (x) {
      h += '<li style="margin-bottom:4px">' + x.formation + ' <span style="color:#5A6B7C">— ' + x.origine + '</span></li>';
    });
    h += '</ul>';
  }

  if (anomalies.length) {
    h += '<h3 style="color:' + (majeures ? '#C0392B' : '#B35C00') + ';margin:18px 0 8px">' +
         anomalies.length + ' point(s) à régulariser' + (majeures ? ' — dont ' + majeures + ' majeur(s)' : '') + '</h3>';
    h += '<table style="width:100%;border-collapse:collapse;font-size:13.5px">';
    anomalies.forEach(function (a) {
      var coul = a.gravite === 'Majeure' ? '#C0392B' : '#B35C00';
      h += '<tr><td style="padding:5px 10px;border-bottom:1px solid #E4EAF2;white-space:nowrap;color:' + coul + ';font-weight:bold">' +
           a.gravite + '</td><td style="padding:5px 10px;border-bottom:1px solid #E4EAF2"><b>' + a.sujet + '</b> : ' + a.detail + '</td></tr>';
    });
    h += '</table>';
  } else {
    h += '<div style="margin:18px 0;padding:12px 16px;background:#F0FBF2;border:1px solid #2DC653;border-radius:8px;font-size:14px">' +
         '✅ <b>Fiche complète</b> — tous les points de l\'accueil sont renseignés.</div>';
  }

  h += '<h3 style="color:#003A6E;margin:18px 0 8px">Signatures</h3><table style="width:100%;font-size:13px"><tr>';
  h += '<td style="width:50%;vertical-align:top"><div style="color:#5A6B7C;margin-bottom:4px">Responsable de l\'accueil</div>' +
       (sigs.responsable ? '<img src="cid:sigResp" style="max-width:250px;border:1px solid #D0DAE8;border-radius:4px">'
                         : '<span style="color:#C0392B">⚠️ Non signée</span>') + '</td>';
  h += '<td style="width:50%;vertical-align:top"><div style="color:#5A6B7C;margin-bottom:4px">Collaborateur accueilli</div>' +
       (sigs.collaborateur ? '<img src="cid:sigCollab" style="max-width:250px;border:1px solid #D0DAE8;border-radius:4px">'
                           : '<span style="color:#C0392B">⚠️ Non signée</span>') + '</td>';
  h += '</tr></table>';

  h += '<div style="margin-top:22px;padding-top:12px;border-top:1px solid #E4EAF2;font-size:12px;color:#8099B4">' +
       'Message envoyé automatiquement par la fiche d\'accueil HSE dématérialisée — ' + (p.version || '') +
       '<br>Registre : <a href="https://docs.google.com/spreadsheets/d/' + ACC_ID_CLASSEUR + '/edit">Registre Fiches Formation CDES</a></div>';

  h += '</div></div>';
  return h;
}

function texteBrutAccueil_(p) {
  var f = p.fiche || {};
  var t = 'Accueil HSE — ' + ((f.prenom || '') + ' ' + (f.nom || '')).trim() + '\n';
  t += 'Date : ' + formaterDate_(f.dateAccueil) + ' — Lieu : ' + (f.lieu || '—') + '\n';
  t += 'Poste : ' + (f.posteTravail || '—') + ' — Agence : ' + (f.agenceCdes || '—') + '\n';
  t += (p.anomalies || []).length + ' point(s) à régulariser.\n';
  t += 'Consultez ce message au format HTML pour le détail complet.';
  return t;
}

/* ═════════════════════════ Utilitaires ═════════════════════════ */

function blobSignature_(dataUrl, nom) {
  var base64 = String(dataUrl).split(',')[1];
  return Utilities.newBlob(Utilities.base64Decode(base64), 'image/png', nom);
}

function nomFichierAccueil_(f) {
  var d = f.dateAccueil || Utilities.formatDate(new Date(), 'Europe/Paris', 'yyyy-MM-dd');
  var qui = ((f.nom || '') + ' ' + (f.prenom || '')).trim() || 'sans-nom';
  return d + '-Accueil HSE-' + qui;
}

function formaterDate_(iso) {
  if (!iso) return '';
  var m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? m[3] + '/' + m[2] + '/' + m[1] : String(iso);
}

/* Les 6 colonnes de reprise contiennent le contenu des pages : illisible
   à l'œil et très large, on les masque. */
function masquerColonnesReprise_(f, nom) {
  if (nom !== ACC_ONGLET_ACCUEILS) return;
  try { f.hideColumns(colAccueil_('Reprise 1'), ACC_TRANCHES); } catch (e) {}
}

function ongletAccueil_(classeur, nom, colonnes) {
  var f = classeur.getSheetByName(nom);
  /* Une feuille neuve n'a que 26 colonnes : on l'élargit avant d'écrire,
     sinon l'enregistrement échoue dès que le registre dépasse la colonne Z. */
  if (f && f.getMaxColumns() < colonnes.length) {
    f.insertColumnsAfter(f.getMaxColumns(), colonnes.length - f.getMaxColumns());
  }
  if (!f) {
    f = classeur.insertSheet(nom);
    if (f.getMaxColumns() < colonnes.length) {
      f.insertColumnsAfter(f.getMaxColumns(), colonnes.length - f.getMaxColumns());
    }
    f.appendRow(colonnes);
    f.getRange(1, 1, 1, colonnes.length)
      .setFontWeight('bold').setBackground('#003A6E').setFontColor('#FFFFFF')
      .setVerticalAlignment('middle').setWrap(true);
    f.setFrozenRows(1);
    f.setRowHeight(1, 40);
    masquerColonnesReprise_(f, nom);
  } else if (f.getLastColumn() < colonnes.length) {
    /* Mise à niveau des colonnes si le registre a été créé par une version précédente */
    f.getRange(1, 1, 1, colonnes.length).setValues([colonnes])
      .setFontWeight('bold').setBackground('#003A6E').setFontColor('#FFFFFF')
      .setVerticalAlignment('middle').setWrap(true);
    masquerColonnesReprise_(f, nom);
  }
  return f;
}

function trouverLigneAccueil_(f, nbColonnes, cle) {
  if (!cle) return 0;
  var n = f.getLastRow();
  if (n < 2) return 0;
  var cles = f.getRange(2, nbColonnes, n - 1, 1).getValues();
  for (var i = 0; i < cles.length; i++) {
    if (String(cles[i][0]).trim() === cle) return i + 2;
  }
  return 0;
}

function supprimerLignesAccueil_(f, nbColonnes, cle) {
  if (!cle) return;
  var n = f.getLastRow();
  if (n < 2) return;
  var cles = f.getRange(2, nbColonnes, n - 1, 1).getValues();
  for (var i = cles.length - 1; i >= 0; i--) {
    if (String(cles[i][0]).trim() === cle) f.deleteRow(i + 2);
  }
}

function reponseAccueil_(objet) {
  return ContentService.createTextOutput(JSON.stringify(objet))
    .setMimeType(ContentService.MimeType.JSON);
}

/* Test depuis l'éditeur : écrit une ligne et envoie un mail de démonstration */
function testerAccueilHSE() {
  var p = {
    key: 'test_essai', version: 'test', destinataire: Session.getActiveUser().getEmail(),
    fiche: { dateAccueil: '2026-09-04', lieu: 'Atelier Luzancy', animateur: 'Justin HERVELIN',
             nom: 'ESSAI', prenom: 'Test', statut: 'CDI', agenceCdes: 'Île-de-France',
             posteTravail: 'Mécanicien', visiteRealisee: true, dateMedicale: '2027-01-01',
             formationsAutorisees: ['Chariot élévateur — CACES catégorie 3'], formationsSansPreuve: [],
             epiManquants: [], equipementsManquants: [], savoirNager: true,
             postesRisques: ['Mécanicien'], risquesVus: 14, risquesTotal: 14,
             referent: 'Marc MARTIN', referentFonction: 'Chef de chantier',
             consignesVues: 9, consignesTotal: 9, vigiminuteVus: 3, vigiminuteTotal: 3,
             quizzDemat: true, quizzScore: 92, engagements: 2, engagementsTotal: 2,
             signatureResponsable: true, signatureCollaborateur: true },
    anomalies: [], formations: [{ formation: 'Recyclage SST', origine: 'Formation à prévoir (saisie)' }],
    signatures: {}
  };
  Logger.log(mailAccueilHSE_(p).getContent());
}
