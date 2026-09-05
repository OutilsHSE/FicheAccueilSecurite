/* =========================================================
   CONFIGURATION — Fiche d'accueil HSE CDES
   Seul fichier à modifier pour brancher la sauvegarde.
   ========================================================= */

const CONFIG_ACCUEIL = {

  /* URL de la Web App Apps Script (déploiement « Application Web »).
     ⚠️ Le script pointé doit router les actions « accueil-hse » et
     « mail-accueil » (voir Registre_Accueil_HSE.gs).
     Laisser vide pour désactiver : la fiche continue de fonctionner,
     seul l'export PDF est disponible. */
  apiUrl: "https://script.google.com/macros/s/AKfycbzgBaIkG7u-_LJ_uK-TtPWZjHfQxa3sUefOac-DoqIujsB8RE8jis1C8awgoWpvjO_vcw/exec",

  /* Identifiant de l'outil dans le registre commun CDES */
  ficheId: "accueil-hse",

  /* Destinataire du bouton « Envoyer au service HSE » */
  mailTo: "j.hervelin@cdes.eu",

  /* Version de la fiche, reportée dans le registre */
  version: "v16-2026-09"
};
