/* =========================================================
   COLLECTE DES DONNÉES DE LA FICHE + DÉTECTION DES ANOMALIES
   Relit les 6 pages enregistrées dans le navigateur et en tire
   une structure exploitable pour le registre Google Sheet.
   ========================================================= */

/* Reconstruit le document d'une page à partir du brouillon */
function pageDoc(n) {
  const html = localStorage.getItem("page" + n + "Content");
  if (!html) return null;
  return new DOMParser().parseFromString(html, "text/html");
}

const val = (doc, sel) => (doc && doc.querySelector(sel) ? (doc.querySelector(sel).getAttribute("value") || "").trim() : "");
const coche = (doc, sel) => !!(doc && doc.querySelector(sel) && doc.querySelector(sel).hasAttribute("checked"));

/* Valeur d'une liste déroulante enregistrée */
function selectVal(doc, sel) {
  if (!doc) return "";
  const s = doc.querySelector(sel);
  if (!s) return "";
  const opt = s.querySelector("option[selected]");
  return opt ? (opt.textContent || "").trim() : "";
}

/* Texte d'une zone de saisie enregistrée */
function textareaVal(doc, sel) {
  if (!doc) return "";
  const t = doc.querySelector(sel);
  return t ? (t.textContent || "").trim() : "";
}

function collecterFiche() {
  const p1 = pageDoc(1), p2 = pageDoc(2), p3 = pageDoc(3),
        p4 = pageDoc(4), p5 = pageDoc(5), p6 = pageDoc(6);

  const f = {
    // ── Page 1 : accueil et collaborateur ──
    dateAccueil: val(p1, "#visite-date"),
    lieu:        val(p1, "#lieu"),
    animateur:   val(p1, "#responsable"),
    nom:         val(p1, "#nom"),
    prenom:      val(p1, "#prenom"),
    statut:      selectVal(p1, "#statut"),
    dateEntree:  val(p1, "#date-entree"),
    agenceCdes:  selectVal(p1, "#agence-cdes"),
    agenceInterim: val(p1, "#agence"),
    posteTravail: selectVal(p1, "#poste-travail"),
    activites:   val(p1, "#activites"),

    // ── Page 2 : aptitude médicale et formations ──
    visitePlanifiee: coche(p2, "#visite-planifiee"),
    visiteRealisee:  coche(p2, "#visite-realisee"),
    dateMedicale:    val(p2, "#date-medicale"),
    formationsAutorisees: [],
    formationsSansPreuve: [],
    autresFormations: textareaVal(p2, "textarea[name='formation-autres']"),
    formationsAPrevoir: textareaVal(p2, "#formation-prevue"),
    reglesAcquittees: 0,
    reglesTotal: 0,

    // ── Page 3 : équipements ──
    epiManquants: [],
    epiFournis: 0,
    equipementsManquants: [],
    autresEquipements: textareaVal(p3, ".other-equipments-textarea"),

    // ── Page 4 : risques ──
    postesRisques: [],
    risquesVus: 0,
    risquesTotal: 0,
    retexVus: 0,
    retexTotal: 0,

    // ── Page 5 : consignes ──
    referent:  val(p5, "#referent-chantier"),
    referentFonction: val(p5, "#referent-fonction"),
    consignesVues: 0,
    consignesTotal: 0,
    vigiminuteVus: 0,
    vigiminuteTotal: 0,
    ficheFormationVue: false,
    ficheFormationNonConcerne: false,

    // ── Page 6 : validation et signatures ──
    quizzKromi: coche(p6, "#quizz-kromi"),
    quizzDemat: coche(p6, "#quizz-demat"),
    savoirNager: false,
    engagements: 0,
    engagementsTotal: 0,
    dateSignatureResponsable: val(p6, "#visite-date-reponsable"),
    dateSignatureCollaborateur: val(p6, "#visite-date-collaborateur"),
    signatureResponsable: false,
    signatureCollaborateur: false
  };

  // Formations autorisées / preuve manquante
  if (p2) {
    p2.querySelectorAll(".formation-row").forEach(row => {
      const aut = row.querySelector(".fx-aut");
      const preuve = row.querySelector(".fx-preuve");
      if (!aut || !aut.hasAttribute("checked")) return;
      const lbl = row.querySelector(".formation-lbl .bold");
      const exi = row.querySelector(".formation-lbl .exigence");
      const nom = (lbl ? lbl.textContent.trim() : "") + (exi ? " — " + exi.textContent.trim() : "");
      f.formationsAutorisees.push(nom);
      if (!preuve || !preuve.hasAttribute("checked")) f.formationsSansPreuve.push(nom);
    });

    const acquits = p2.querySelectorAll(".rbanner .rack input");
    f.reglesTotal = acquits.length;
    acquits.forEach(i => { if (i.hasAttribute("checked")) f.reglesAcquittees++; });
  }

  // EPI et équipements HSE (tri-état Oui / Non / N.N.)
  if (p3) {
    p3.querySelectorAll(".epi-chip").forEach(chip => {
      const lbl = chip.querySelector(".epi-chip-lbl");
      const nom = lbl ? lbl.textContent.trim() : "EPI";
      if (chip.querySelector(".tri-non[checked]")) f.epiManquants.push(nom);
      else if (chip.querySelector(".tri-oui[checked]")) f.epiFournis++;
    });
    p3.querySelectorAll(".equip-row").forEach(row => {
      const lbl = row.querySelector(".equip-lbl");
      const nom = lbl ? lbl.textContent.trim() : "Équipement";
      if (row.querySelector(".tri-non[checked]")) f.equipementsManquants.push(nom);
    });
  }

  // Risques et RETEX
  if (p4) {
    p4.querySelectorAll(".poste-titre").forEach(t => {
      const txt = t.childNodes[1] ? t.childNodes[1].textContent.trim() : t.textContent.trim();
      if (txt) f.postesRisques.push(txt.split("  ")[0].trim());
    });
    const risques = p4.querySelectorAll(".scene-row input[type='checkbox'], .risk-row input[type='checkbox']");
    f.risquesTotal = risques.length;
    risques.forEach(i => { if (i.hasAttribute("checked")) f.risquesVus++; });

    const retex = p4.querySelectorAll(".retex-head input[type='checkbox']");
    f.retexTotal = retex.length;
    retex.forEach(i => { if (i.hasAttribute("checked")) f.retexVus++; });
  }

  // Consignes, Vigiminute, fiches de formation au poste
  if (p5) {
    const vus = p5.querySelectorAll(".consigne-row .vu-ack input");
    f.consignesTotal = vus.length;
    vus.forEach(i => { if (i.hasAttribute("checked")) f.consignesVues++; });

    const vigi = p5.querySelectorAll(".vigi-row input");
    f.vigiminuteTotal = vigi.length;
    vigi.forEach(i => { if (i.hasAttribute("checked")) f.vigiminuteVus++; });

    const groupe = p5.querySelector(".vu-groupe");
    if (groupe) {
      const cases = groupe.querySelectorAll("input");
      f.ficheFormationVue = cases[0] && cases[0].hasAttribute("checked");
      f.ficheFormationNonConcerne = cases[1] && cases[1].hasAttribute("checked");
    }
  }

  // Attestation de nage, engagements, signatures
  if (p6) {
    const nage = p6.querySelectorAll(".pill-group [data-exclusive='nage']");
    f.savoirNager = nage[0] && nage[0].hasAttribute("checked");

    const eng = p6.querySelectorAll(".engagement input");
    f.engagementsTotal = eng.length;
    eng.forEach(i => { if (i.hasAttribute("checked")) f.engagements++; });

    const sig = (id) => {
      const c = p6.querySelector("#" + id);
      return !!(c && c.getAttribute("data-signe") === "1");
    };
    f.signatureResponsable = sig("drawingCanvasPageSign1");
    f.signatureCollaborateur = sig("drawingCanvasPageSign2");
  }

  // Résultat du quizz
  try {
    const q = JSON.parse(localStorage.getItem("quizzResultat"));
    if (q) { f.quizzScore = q.pourcentage; f.quizzReussi = q.reussite; f.quizzDate = q.date; }
  } catch (e) { /* pas de quizz */ }

  return f;
}

/* =========================================================
   ANOMALIES — ce qui manque pour que la fiche soit complète
   ========================================================= */
function detecterAnomalies(f) {
  const a = [];
  const add = (gravite, sujet, detail) => a.push({ gravite, sujet, detail });

  if (!f.nom || !f.prenom) add("Majeure", "Identité", "Nom ou prénom du collaborateur non renseigné");
  if (!f.dateAccueil) add("Mineure", "Informations générales", "Date de l'accueil non renseignée");
  if (!f.animateur) add("Mineure", "Informations générales", "Animateur de l'accueil non renseigné");
  if (!f.posteTravail) add("Mineure", "Collaborateur", "Poste de travail non renseigné");

  if (!f.visitePlanifiee && !f.visiteRealisee) {
    add("Majeure", "Aptitude médicale", "Aucune visite médicale renseignée (ni planifiée, ni réalisée)");
  } else if (!f.dateMedicale) {
    add("Majeure", "Aptitude médicale", "Date de visite médicale manquante");
  } else if (f.visiteRealisee && f.dateMedicale && new Date(f.dateMedicale) < new Date()) {
    add("Majeure", "Aptitude médicale", "Visite médicale échue le " + f.dateMedicale);
  }

  f.formationsSansPreuve.forEach(nom =>
    add("Majeure", "Formations", "Tâche autorisée sans preuve de formation valide : " + nom));

  if (f.reglesTotal && f.reglesAcquittees < f.reglesTotal)
    add("Majeure", "Règles majeures", (f.reglesTotal - f.reglesAcquittees) + " règle(s) sur " + f.reglesTotal + " non acquittée(s) par le collaborateur");

  f.epiManquants.forEach(nom => add("Majeure", "EPI", "EPI non fourni : " + nom));
  f.equipementsManquants.forEach(nom => add("Mineure", "Équipements HSE", "Équipement non fourni : " + nom));

  if (!f.postesRisques.length) add("Majeure", "Risques", "Aucun poste de travail sélectionné sur la page Risques");
  else if (f.risquesTotal && f.risquesVus < f.risquesTotal)
    add("Mineure", "Risques", (f.risquesTotal - f.risquesVus) + " fiche(s) de risque sur " + f.risquesTotal + " non présentée(s)");

  if (f.retexTotal && f.retexVus < f.retexTotal)
    add("Mineure", "RETEX", (f.retexTotal - f.retexVus) + " retour(s) d'expérience sur " + f.retexTotal + " non présenté(s)");

  if (!f.referent) add("Mineure", "Consignes", "Référent chantier non renseigné");
  if (f.consignesTotal && f.consignesVues < f.consignesTotal)
    add("Majeure", "Consignes", (f.consignesTotal - f.consignesVues) + " consigne(s) sur " + f.consignesTotal + " non vue(s) avec le collaborateur");
  if (f.vigiminuteTotal && f.vigiminuteVus < f.vigiminuteTotal)
    add("Mineure", "Vigiminute", (f.vigiminuteTotal - f.vigiminuteVus) + " point(s) Vigiminute sur " + f.vigiminuteTotal + " non validé(s)");
  if (!f.ficheFormationVue && !f.ficheFormationNonConcerne)
    add("Mineure", "Formation au poste", "Fiche de formation au poste ni présentée, ni marquée « non concerné »");

  if (!f.quizzKromi && !f.quizzDemat)
    add("Majeure", "Validation des connaissances", "Aucun parcours sécurité validé (ni Kromi, ni quizz de la fiche)");
  else if (f.quizzDemat && f.quizzReussi === false)
    add("Majeure", "Validation des connaissances", "Quizz non validé (" + f.quizzScore + " %)");

  if (f.engagementsTotal && f.engagements < f.engagementsTotal)
    add("Majeure", "Engagements", (f.engagementsTotal - f.engagements) + " engagement(s) sur " + f.engagementsTotal + " non coché(s)");

  if (!f.signatureResponsable) add("Majeure", "Signatures", "Signature du responsable de l'accueil manquante");
  if (!f.signatureCollaborateur) add("Majeure", "Signatures", "Signature du collaborateur manquante");

  return a;
}

/* Formations à programmer : saisie libre + preuves manquantes */
function formationsAProgrammer(f) {
  const liste = [];
  (f.formationsAPrevoir || "").split(/\r?\n/).forEach(l => {
    const t = l.trim().replace(/^[-•*]\s*/, "");
    if (t) liste.push({ formation: t, origine: "Formation à prévoir (saisie)" });
  });
  f.formationsSansPreuve.forEach(nom =>
    liste.push({ formation: nom, origine: "Preuve de formation manquante" }));
  return liste;
}
