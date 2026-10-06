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
  apiUrl: (window.REG && REG.url) || "",   // V2 : donnée par le branchement (intranet)

  /* Identifiant de l'outil dans le registre commun CDES */
  ficheId: "accueil-hse",

  /* Destinataire du bouton « Envoyer au service HSE » */
  mailTo: "le service HSE",   // V2 : l’adresse est sur le serveur

  /* Seuil de validation du parcours sécurité, en pourcentage.
     En dessous, la signature est bloquée et le collaborateur doit refaire
     le quizz — sauf si le parcours Kromi a été suivi (case cochée). */
  seuilQuizz: 70,

  /* Version de la fiche, reportée dans le registre */
  version: "v19-2026-09"
};
