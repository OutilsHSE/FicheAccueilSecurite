/*****************************************************************
 *  REGISTRE — FICHE D'ACCUEIL HSE CDES
 *  Écrit dans le classeur « Registre Fiches Formation CDES »
 *  trois onglets créés automatiquement au premier envoi :
 *    • Accueils HSE          — une ligne par accueil réalisé
 *    • Formations à prévoir  — une ligne par formation à programmer
 *    • Anomalies accueil     — une ligne par point à régulariser
 *
 *  DÉPLOIEMENT
 *  1. script.google.com → Nouveau projet → coller ce fichier
 *  2. Déployer → Nouveau déploiement → type « Application Web »
 *       Exécuter en tant que : Moi
 *       Qui a accès : Tout le monde
 *  3. Copier l'URL /exec et la coller dans config.js (apiUrl)
 *
 *  Si vous préférez fusionner ce code dans le script existant des
 *  fiches de formation, copiez uniquement les fonctions
 *  enregistrerAccueilHSE_ et ses utilitaires, puis ajoutez au début
 *  de votre doPost :
 *      if (p.action === 'accueil-hse') return enregistrerAccueilHSE_(p);
 *****************************************************************/

/* Classeur cible : « Registre Fiches Formation CDES » */
var ID_CLASSEUR = '1XIeV7sAdiaCEvCLYckiIVRa2eG1Gc3s9Kkozz8Bzbu8';

var ONGLET_ACCUEILS   = 'Accueils HSE';
var ONGLET_FORMATIONS = 'Formations à prévoir';
var ONGLET_ANOMALIES  = 'Anomalies accueil';

var COLONNES_ACCUEILS = [
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
  'Anomalies', 'dont majeures', 'Version', 'Clé'
];

var COLONNES_FORMATIONS = [
  'Enregistré le', 'Date accueil', 'Nom', 'Prénom', 'Agence CDES',
  'Poste de travail', 'Formation à programmer', 'Origine', 'Clé'
];

var COLONNES_ANOMALIES = [
  'Enregistré le', 'Date accueil', 'Nom', 'Prénom', 'Agence CDES',
  'Gravité', 'Sujet', 'Détail', 'Clé'
];

/* ─────────────────────────── Point d'entrée ─────────────────────────── */

function doPost(e) {
  try {
    var p = JSON.parse(e.postData.contents);
    if (p.action === 'accueil-hse') return enregistrerAccueilHSE_(p);
    return reponse_({ ok: false, error: 'Action inconnue : ' + p.action });
  } catch (err) {
    return reponse_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  return reponse_({ ok: true, service: 'Registre Accueil HSE CDES', heure: new Date().toISOString() });
}

/* ─────────────────────────── Enregistrement ─────────────────────────── */

function enregistrerAccueilHSE_(p) {
  var f = p.fiche || {};
  var anomalies = p.anomalies || [];
  var formations = p.formations || [];
  var cle = p.key || '';
  var horodatage = new Date();
  var majeures = anomalies.filter(function (a) { return a.gravite === 'Majeure'; }).length;

  var classeur = SpreadsheetApp.openById(ID_CLASSEUR);

  /* ── Onglet « Accueils HSE » : une ligne par collaborateur, mise à jour ── */
  var fa = onglet_(classeur, ONGLET_ACCUEILS, COLONNES_ACCUEILS);
  var ligne = [
    horodatage,
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
    p.version || '',
    cle
  ];

  var l = trouverLigne_(fa, COLONNES_ACCUEILS.length, cle);
  if (l > 0) fa.getRange(l, 1, 1, ligne.length).setValues([ligne]);
  else fa.appendRow(ligne);

  /* ── Onglets détaillés : on remplace les lignes du collaborateur ── */
  var ff = onglet_(classeur, ONGLET_FORMATIONS, COLONNES_FORMATIONS);
  supprimerLignes_(ff, COLONNES_FORMATIONS.length, cle);
  formations.forEach(function (x) {
    ff.appendRow([horodatage, f.dateAccueil || '', f.nom || '', f.prenom || '',
                  f.agenceCdes || '', f.posteTravail || '',
                  x.formation || '', x.origine || '', cle]);
  });

  var fan = onglet_(classeur, ONGLET_ANOMALIES, COLONNES_ANOMALIES);
  supprimerLignes_(fan, COLONNES_ANOMALIES.length, cle);
  anomalies.forEach(function (a) {
    fan.appendRow([horodatage, f.dateAccueil || '', f.nom || '', f.prenom || '',
                   f.agenceCdes || '', a.gravite || '', a.sujet || '', a.detail || '', cle]);
  });

  return reponse_({ ok: true, anomalies: anomalies.length, majeures: majeures, formations: formations.length });
}

/* ─────────────────────────── Utilitaires ─────────────────────────── */

/* Récupère (ou crée) un onglet avec ses en-têtes mis en forme */
function onglet_(classeur, nom, colonnes) {
  var f = classeur.getSheetByName(nom);
  if (!f) {
    f = classeur.insertSheet(nom);
    f.appendRow(colonnes);
    var entete = f.getRange(1, 1, 1, colonnes.length);
    entete.setFontWeight('bold')
          .setBackground('#003A6E')
          .setFontColor('#FFFFFF')
          .setVerticalAlignment('middle')
          .setWrap(true);
    f.setFrozenRows(1);
    f.setRowHeight(1, 40);
  }
  return f;
}

/* Numéro de ligne d'un collaborateur (colonne « Clé », dernière colonne) */
function trouverLigne_(f, nbColonnes, cle) {
  if (!cle) return 0;
  var n = f.getLastRow();
  if (n < 2) return 0;
  var cles = f.getRange(2, nbColonnes, n - 1, 1).getValues();
  for (var i = 0; i < cles.length; i++) {
    if (String(cles[i][0]).trim() === cle) return i + 2;
  }
  return 0;
}

/* Supprime toutes les lignes d'un collaborateur (avant réécriture) */
function supprimerLignes_(f, nbColonnes, cle) {
  if (!cle) return;
  var n = f.getLastRow();
  if (n < 2) return;
  var cles = f.getRange(2, nbColonnes, n - 1, 1).getValues();
  for (var i = cles.length - 1; i >= 0; i--) {
    if (String(cles[i][0]).trim() === cle) f.deleteRow(i + 2);
  }
}

function reponse_(objet) {
  return ContentService.createTextOutput(JSON.stringify(objet))
    .setMimeType(ContentService.MimeType.JSON);
}

/* Test rapide depuis l'éditeur Apps Script */
function testerRegistre() {
  var r = enregistrerAccueilHSE_({
    action: 'accueil-hse', key: 'test_essai', version: 'test',
    fiche: { dateAccueil: '2026-08-14', lieu: 'Atelier Luzancy', animateur: 'Justin HERVELIN',
             nom: 'ESSAI', prenom: 'Test', statut: 'CDI', agenceCdes: 'Île-de-France',
             posteTravail: 'Mécanicien', visiteRealisee: true, dateMedicale: '2027-01-01',
             formationsAutorisees: ['CACES catégorie 3'], formationsSansPreuve: [],
             epiManquants: ['Gants de protection'], equipementsManquants: [],
             postesRisques: ['Mécanicien'], risquesVus: 14, risquesTotal: 14,
             retexVus: 7, retexTotal: 7, referent: 'Marc MARTIN',
             consignesVues: 8, consignesTotal: 8, vigiminuteVus: 3, vigiminuteTotal: 3,
             quizzDemat: true, quizzScore: 92, engagements: 2, engagementsTotal: 2,
             signatureResponsable: true, signatureCollaborateur: true },
    anomalies: [{ gravite: 'Majeure', sujet: 'EPI', detail: 'EPI non fourni : Gants de protection' }],
    formations: [{ formation: 'Recyclage SST', origine: 'Formation à prévoir (saisie)' }]
  });
  Logger.log(r.getContent());
}
