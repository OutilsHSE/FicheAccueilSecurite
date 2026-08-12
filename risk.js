renderChrome(4);

/* =========================================================
   SCÈNES DE TRAVAIL — les risques sont fléchés sur le visuel
   x / y : position du repère sur l'image, en % (0-100)
   Le libellé doit correspondre exactement à un risque du poste
   (postesData) pour récupérer automatiquement le lien de la fiche.
   ========================================================= */
const SCENES = {
  conducteurs_tp: {
    img: "img/scenes/conducteur_engins_ponton.jpg",
    titre: "Curage depuis un ponton",
    points: [
      { r: "Circulation en engins TP",              x: 45, y: 30 },
      { r: "Coactivité Engins Piétons",             x: 55, y: 48 },
      { r: "Port des EPI",                          x: 64, y: 40 },
      { r: "Risque de chute à l’eau et noyade",     x: 20, y: 78 },
      { r: "Opérations de levage mécanique",        x: 40, y: 48 },
      { r: "Produits chimiques",                    x: 69, y: 56 },
      { r: "Protection de l’environnement",         x: 14, y: 60 },
      { r: "Manutention manuelle",                  x: 50, y: 57 },
      { r: "Ordre et propreté sur le chantier",     x: 57, y: 63 },
      { r: "Risques de chute de plain-pied",        x: 81, y: 72 },
      { r: "Risque routier",                        x: 13, y: 17 },
      { r: "Risque électrique",                     x: 87, y: 36 },
      { r: "Intervention mécanique",                x: 46, y: 72 }
    ]
  },

  chauffeur_pl: {
    img: "img/scenes/chauffeur_pl.jpg",
    titre: "Déchargement d'une pelle et levage à la grue auxiliaire",
    points: [
      { r: "Coactivité Engins Piétons",             x: 7,  y: 55 },
      { r: "Circulation en engins TP",              x: 35, y: 45 },
      { r: "Port des EPI",                          x: 6,  y: 48 },
      { r: "Réfléchir avant d’agir",                x: 2,  y: 72 },
      { r: "Risques de chute de plain-pied",        x: 30, y: 68 },
      { r: "Manutention manuelle",                  x: 39, y: 66 },
      { r: "Risques de chute de hauteur",           x: 37, y: 46 },
      { r: "Opérations de levage mécanique",        x: 76, y: 42 },
      { r: "Risque routier",                        x: 90, y: 53 },
      { r: "Risque de chute à l’eau et noyade",     x: 85, y: 60 },
      { r: "Protection de l’environnement",         x: 47, y: 57 },
      { r: "Ordre et propreté sur le chantier",     x: 66, y: 55 }
    ]
  },

  intervenant_bathy_topo: {
    img: "img/scenes/bathymetrie.jpg",
    titre: "Mise à l'eau et levés bathymétriques",
    points: [
      { r: "Port des EPI",                          x: 45, y: 42 },
      { r: "Risque de chute à l’eau et noyade",     x: 62, y: 66 },
      { r: "Manutention manuelle",                  x: 30, y: 60 },
      { r: "Risque routier",                        x: 10, y: 40 },
      { r: "Protection de l’environnement",         x: 74, y: 55 },
      { r: "Coactivité Engins Piétons",             x: 45, y: 72 },
      { r: "Opérations de levage mécanique",        x: 25, y: 55 },
      { r: "Réfléchir avant d’agir",                x: 48, y: 50 },
      { r: "Ordre et propreté sur le chantier",     x: 20, y: 30 }
    ]
  },

  marinier: {
    img: "img/scenes/marinier.jpg",
    titre: "Chargement d'une barge",
    points: [
      { r: "Coactivité Engins Piétons",             x: 73, y: 40 },
      { r: "Port des EPI",                          x: 74, y: 46 },
      { r: "Risque de chute à l’eau et noyade",     x: 12, y: 55 },
      { r: "Opérations de levage mécanique",        x: 50, y: 32 },
      { r: "Manutention manuelle",                  x: 77, y: 57 },
      { r: "Protection de l’environnement",         x: 60, y: 47 },
      { r: "Risques de chute de plain-pied",        x: 76, y: 70 },
      { r: "Risques de chute de hauteur / échelle", x: 66, y: 44 },
      { r: "Réfléchir avant d’agir",                x: 31, y: 50 },
      { r: "Ordre et propreté sur le chantier",     x: 38, y: 63 },
      { r: "Produits chimiques",                    x: 86, y: 72 },
      { r: "Risque électrique",                     x: 78, y: 87 },
      { r: "Intervention mécanique",                x: 23, y: 70 }
    ]
  },

  mecanicien: {
    img: "img/scenes/mecanicien.jpg",
    titre: "Changement d'un vérin hydraulique",
    points: [
      { r: "Coactivité Engins Piétons",             x: 17, y: 43 },
      { r: "Port des EPI Atelier",                  x: 56, y: 19 },
      { r: "Opérations de levage mécanique",        x: 42, y: 60 },
      { r: "Intervention mécanique",                x: 68, y: 40 },
      { r: "Protection de l’environnement",         x: 58, y: 78 },
      { r: "Produits chimiques",                    x: 57, y: 63 },
      { r: "Réfléchir avant d’agir",                x: 69, y: 68 },
      { r: "Manutention manuelle",                  x: 75, y: 55 },
      { r: "Ordre et propreté sur le chantier",     x: 30, y: 88 },
      { r: "Risques de chute de plain-pied",        x: 45, y: 92 },
      { r: "Risque de chute à l’eau et noyade",     x: 4,  y: 33 },
      { r: "Risque électrique",                     x: 89, y: 45 },
      { r: "Risque routier",                        x: 66, y: 47 },
      { r: "Risque de chute de hauteur",            x: 51, y: 42 }
    ]
  },

  soudeur: {
    img: "img/scenes/soudeur.jpg",
    titre: "Réparation d'un caisson par soudure",
    points: [
      { r: "Port des EPI Atelier",                  x: 37, y: 33 },
      { r: "Intervention mécanique",                x: 42, y: 47 },
      { r: "Risque électrique",                     x: 4,  y: 66 },
      { r: "Réfléchir avant d’agir",                x: 12, y: 57 },
      { r: "Produits chimiques",                    x: 68, y: 73 },
      { r: "Protection de l’environnement",         x: 64, y: 84 },
      { r: "Opérations de levage mécanique",        x: 23, y: 22 },
      { r: "Manutention manuelle",                  x: 55, y: 45 },
      { r: "Ordre et propreté sur le chantier",     x: 25, y: 88 },
      { r: "Risques de chute de plain-pied",        x: 45, y: 90 },
      { r: "Risque de chute à l’eau et noyade",     x: 64, y: 50 },
      { r: "Coactivité Engins Piétons",             x: 78, y: 43 },
      { r: "Risque routier",                        x: 94, y: 45 },
      { r: "Risque de chute de hauteur",            x: 67, y: 28 }
    ]
  },

  operateurs_polyvalents: {
    img: "img/scenes/operateur_polyvalent.jpg",
    titre: "Plantation d'hélophytes en berge",
    points: [
      { r: "Port des EPI",                          x: 47, y: 27 },
      { r: "Risque de chute à l’eau et noyade",     x: 88, y: 55 },
      { r: "Manutention manuelle",                  x: 48, y: 52 },
      { r: "Risques de chute de plain-pied",        x: 35, y: 85 },
      { r: "Protection de l’environnement",         x: 70, y: 78 },
      { r: "Réfléchir avant d’agir",                x: 21, y: 45 },
      { r: "Ordre et propreté sur le chantier",     x: 34, y: 72 },
      { r: "Coactivité Engins Piétons",             x: 19, y: 40 },
      { r: "Opérations de levage mécanique",        x: 36, y: 20 },
      { r: "Produits chimiques",                    x: 61, y: 46 },
      { r: "Risque routier",                        x: 7,  y: 33 }
    ]
  }
};

/* Postes couverts par une fiche de formation au poste dédiée :
   pas de scène générique dans la fiche d'accueil */
const POSTES_FICHE_DEDIEE = ["equipements_fluviaux", "travaux_forestiers", "intervenant_tereos"];

const postesData = {
  conducteurs_tp: {
    risques: [
      "Circulation en engins TP",
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Ordre et propreté sur le chantier",
      "Risque électrique",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Produits chimiques"
    ],
    liens_risques: [
        "https://drive.google.com/file/d/1qLUXU6CCyFPBT8XaOwsO7c4PyYODJOZX/view?usp=sharing",
        "https://drive.google.com/file/d/1JKU6LBprdTohn6skSbjIZmzzrz7EvT_r/view?usp=sharing",
        "https://drive.google.com/file/d/1DBPO7mfxCmkvZawg7sNMEWgXJy4PncR4/view?usp=sharing",
        "https://drive.google.com/file/d/1hu1PNgKcqQ1NAxUHwcWxN110TDRUI0KZ/view?usp=sharing",
        "https://drive.google.com/file/d/1cI-rlmi2i_2FmWz86reCvQaTHtePzVey/view?usp=sharing",
        "https://drive.google.com/file/d/1ebwKR8j60VtknFrSdI4DEBL8px6j4OVg/view?usp=sharing",
        "https://drive.google.com/file/d/11wL2sls-LP16aoPUNBUez4XetiGoXId6/view?usp=sharing",
        "https://drive.google.com/file/d/1EeGMIMXifFvLo_hdQJWGtHAsclSHt1L7/view?usp=sharing",
        "https://drive.google.com/file/d/1Y-FnuDuhVnpzgkeZkMEuR3xotL98J1Js/view?usp=sharing",
        "https://drive.google.com/file/d/1GYqgxv6KBUklmYz_1yFvjY_bJ-Y0A5JS/view?usp=sharing",
        "https://drive.google.com/file/d/1iOf0cTWyqP5RO0V1cgqeZYsO3EXHQnlp/view?usp=sharing",
        "https://drive.google.com/file/d/1uMsPMhV8T8zeBCRE2KOx1L_T9G3WPUv6/view?usp=sharing",
        "https://drive.google.com/file/d/1GrUQKpcUnmbt7W5xtJx5GzdQ_dKn4ypZ/view?usp=sharing"
    ]
  },

  equipements_fluviaux: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque électrique",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Produits chimiques"
    ],
    liens_risques: [
        "https://drive.google.com/file/d/1JKU6LBprdTohn6skSbjIZmzzrz7EvT_r/view?usp=sharing",
        "https://drive.google.com/file/d/1DBPO7mfxCmkvZawg7sNMEWgXJy4PncR4/view?usp=sharing",
        "https://drive.google.com/file/d/1hu1PNgKcqQ1NAxUHwcWxN110TDRUI0KZ/view?usp=sharing",
        "https://drive.google.com/file/d/1cI-rlmi2i_2FmWz86reCvQaTHtePzVey/view?usp=sharing",
        "https://drive.google.com/file/d/1ebwKR8j60VtknFrSdI4DEBL8px6j4OVg/view?usp=sharing",
        "https://drive.google.com/file/d/11wL2sls-LP16aoPUNBUez4XetiGoXId6/view?usp=sharing",
        "https://drive.google.com/file/d/1EeGMIMXifFvLo_hdQJWGtHAsclSHt1L7/view?usp=sharing",
        "https://drive.google.com/file/d/1UCVoKFOCAWaA06i3PAL_Cj5MaWSN7Oap/view?usp=sharing",
        "https://drive.google.com/file/d/1Y-FnuDuhVnpzgkeZkMEuR3xotL98J1Js/view?usp=sharing",
        "https://drive.google.com/file/d/1GYqgxv6KBUklmYz_1yFvjY_bJ-Y0A5JS/view?usp=sharing",
        "https://drive.google.com/file/d/1iOf0cTWyqP5RO0V1cgqeZYsO3EXHQnlp/view?usp=sharing",
        "https://drive.google.com/file/d/1uMsPMhV8T8zeBCRE2KOx1L_T9G3WPUv6/view?usp=sharing",
        "https://drive.google.com/file/d/1GrUQKpcUnmbt7W5xtJx5GzdQ_dKn4ypZ/view?usp=sharing"
    ]
  },

  marinier: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque électrique",
      "Risques de chute de plain-pied",
      "Risques de chute de hauteur / échelle",
      "Produits chimiques"
    ],
    liens_risques: [
        "https://drive.google.com/file/d/1JKU6LBprdTohn6skSbjIZmzzrz7EvT_r/view?usp=sharing",
        "https://drive.google.com/file/d/1DBPO7mfxCmkvZawg7sNMEWgXJy4PncR4/view?usp=sharing",
        "https://drive.google.com/file/d/1hu1PNgKcqQ1NAxUHwcWxN110TDRUI0KZ/view?usp=sharing",
        "https://drive.google.com/file/d/1cI-rlmi2i_2FmWz86reCvQaTHtePzVey/view?usp=sharing",
        "https://drive.google.com/file/d/1ebwKR8j60VtknFrSdI4DEBL8px6j4OVg/view?usp=sharing",
        "https://drive.google.com/file/d/11wL2sls-LP16aoPUNBUez4XetiGoXId6/view?usp=sharing",
        "https://drive.google.com/file/d/1EeGMIMXifFvLo_hdQJWGtHAsclSHt1L7/view?usp=sharing",
        "https://drive.google.com/file/d/1UCVoKFOCAWaA06i3PAL_Cj5MaWSN7Oap/view?usp=sharing",
        "https://drive.google.com/file/d/1Y-FnuDuhVnpzgkeZkMEuR3xotL98J1Js/view?usp=sharing",
        "https://drive.google.com/file/d/1GYqgxv6KBUklmYz_1yFvjY_bJ-Y0A5JS/view?usp=sharing",
        "https://drive.google.com/file/d/1iOf0cTWyqP5RO0V1cgqeZYsO3EXHQnlp/view?usp=sharing",
        "https://drive.google.com/file/d/1VE5L7Gvyn78Vemqmk1u9BmwGxbA1GY45/view?usp=sharing",
        "https://drive.google.com/file/d/1GrUQKpcUnmbt7W5xtJx5GzdQ_dKn4ypZ/view?usp=sharing"
    ]
  },

  chauffeur_pl: {
    risques: [
      "Circulation en engins TP",
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Risques de chute de hauteur",
      "Produits chimiques"
    ],
    liens_risques: [
        "https://drive.google.com/file/d/1qLUXU6CCyFPBT8XaOwsO7c4PyYODJOZX/view?usp=sharing",
        "https://drive.google.com/file/d/1JKU6LBprdTohn6skSbjIZmzzrz7EvT_r/view?usp=sharing",
        "https://drive.google.com/file/d/1DBPO7mfxCmkvZawg7sNMEWgXJy4PncR4/view?usp=sharing",
        "https://drive.google.com/file/d/1hu1PNgKcqQ1NAxUHwcWxN110TDRUI0KZ/view?usp=sharing",
        "https://drive.google.com/file/d/1ebwKR8j60VtknFrSdI4DEBL8px6j4OVg/view?usp=sharing",
        "https://drive.google.com/file/d/11wL2sls-LP16aoPUNBUez4XetiGoXId6/view?usp=sharing",
        "https://drive.google.com/file/d/1EeGMIMXifFvLo_hdQJWGtHAsclSHt1L7/view?usp=sharing",
        "https://drive.google.com/file/d/1UCVoKFOCAWaA06i3PAL_Cj5MaWSN7Oap/view?usp=sharing",
        "https://drive.google.com/file/d/1Y-FnuDuhVnpzgkeZkMEuR3xotL98J1Js/view?usp=sharing",
         "https://drive.google.com/file/d/1iOf0cTWyqP5RO0V1cgqeZYsO3EXHQnlp/view?usp=sharing",
        "https://drive.google.com/file/d/1uMsPMhV8T8zeBCRE2KOx1L_T9G3WPUv6/view?usp=sharing",
        "https://drive.google.com/file/d/1VE5L7Gvyn78Vemqmk1u9BmwGxbA1GY45/view?usp=sharing",
        "https://drive.google.com/file/d/1GrUQKpcUnmbt7W5xtJx5GzdQ_dKn4ypZ/view?usp=sharing"
    ]
  },
  mecanicien: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI Atelier",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque électrique",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Risque de chute de hauteur",
      "Produits chimiques",
    ],
    liens_risques: [
        "https://drive.google.com/file/d/1JKU6LBprdTohn6skSbjIZmzzrz7EvT_r/view?usp=sharing",
        "https://drive.google.com/file/d/1DBPO7mfxCmkvZawg7sNMEWgXJy4PncR4/view?usp=sharing",
        "https://drive.google.com/file/d/1uZZinRZaQm3OeaIgJ8Fvsv9l5eIeZ7ZK/view?usp=sharing",
        "https://drive.google.com/file/d/1cI-rlmi2i_2FmWz86reCvQaTHtePzVey/view?usp=sharing",
        "https://drive.google.com/file/d/1ebwKR8j60VtknFrSdI4DEBL8px6j4OVg/view?usp=sharing",
        "https://drive.google.com/file/d/11wL2sls-LP16aoPUNBUez4XetiGoXId6/view?usp=sharing",
        "https://drive.google.com/file/d/1EeGMIMXifFvLo_hdQJWGtHAsclSHt1L7/view?usp=sharing",
        "https://drive.google.com/file/d/1UCVoKFOCAWaA06i3PAL_Cj5MaWSN7Oap/view?usp=sharing",
        "https://drive.google.com/file/d/1Y-FnuDuhVnpzgkeZkMEuR3xotL98J1Js/view?usp=sharing",
        "https://drive.google.com/file/d/1GYqgxv6KBUklmYz_1yFvjY_bJ-Y0A5JS/view?usp=sharing",
        "https://drive.google.com/file/d/1iOf0cTWyqP5RO0V1cgqeZYsO3EXHQnlp/view?usp=sharing",
        "https://drive.google.com/file/d/1uMsPMhV8T8zeBCRE2KOx1L_T9G3WPUv6/view?usp=sharing",
        "https://drive.google.com/drive/u/0/folders/1R12LmzuZ4eiM49GgU-CM3Jz-gfEWel_O",
        "https://drive.google.com/file/d/1GrUQKpcUnmbt7W5xtJx5GzdQ_dKn4ypZ/view?usp=sharing"
    ]
  },
  soudeur: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI Atelier",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque électrique",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Risque de chute de hauteur",
      "Produits chimiques",
    ],
    liens_risques: [
        "https://drive.google.com/file/d/1JKU6LBprdTohn6skSbjIZmzzrz7EvT_r/view?usp=sharing",
        "https://drive.google.com/file/d/1DBPO7mfxCmkvZawg7sNMEWgXJy4PncR4/view?usp=sharing",
        "https://drive.google.com/file/d/1uZZinRZaQm3OeaIgJ8Fvsv9l5eIeZ7ZK/view?usp=sharing",
        "https://drive.google.com/file/d/1cI-rlmi2i_2FmWz86reCvQaTHtePzVey/view?usp=sharing",
        "https://drive.google.com/file/d/1ebwKR8j60VtknFrSdI4DEBL8px6j4OVg/view?usp=sharing",
        "https://drive.google.com/file/d/11wL2sls-LP16aoPUNBUez4XetiGoXId6/view?usp=sharing",
        "https://drive.google.com/file/d/1EeGMIMXifFvLo_hdQJWGtHAsclSHt1L7/view?usp=sharing",
        "https://drive.google.com/file/d/1UCVoKFOCAWaA06i3PAL_Cj5MaWSN7Oap/view?usp=sharing",
        "https://drive.google.com/file/d/1Y-FnuDuhVnpzgkeZkMEuR3xotL98J1Js/view?usp=sharing",
        "https://drive.google.com/file/d/1GYqgxv6KBUklmYz_1yFvjY_bJ-Y0A5JS/view?usp=sharing",
        "https://drive.google.com/file/d/1iOf0cTWyqP5RO0V1cgqeZYsO3EXHQnlp/view?usp=sharing",
        "https://drive.google.com/file/d/1uMsPMhV8T8zeBCRE2KOx1L_T9G3WPUv6/view?usp=sharing",
        "https://drive.google.com/file/d/1VE5L7Gvyn78Vemqmk1u9BmwGxbA1GY45/view?usp=sharing",
        "https://drive.google.com/file/d/1GrUQKpcUnmbt7W5xtJx5GzdQ_dKn4ypZ/view?usp=sharing"
    ]
  },
  travaux_forestiers: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risques de chute de plain-pied",
      "Risque de chute de hauteur",
      "Produits chimiques",
    ],
    liens_risques: [
        "https://drive.google.com/file/d/1JKU6LBprdTohn6skSbjIZmzzrz7EvT_r/view?usp=sharing",
        "https://drive.google.com/file/d/1DBPO7mfxCmkvZawg7sNMEWgXJy4PncR4/view?usp=sharing",
        "https://drive.google.com/file/d/1cI-rlmi2i_2FmWz86reCvQaTHtePzVey/view?usp=sharing",
        "https://drive.google.com/file/d/1ebwKR8j60VtknFrSdI4DEBL8px6j4OVg/view?usp=sharing",
        "https://drive.google.com/file/d/11wL2sls-LP16aoPUNBUez4XetiGoXId6/view?usp=sharing",
        "https://drive.google.com/file/d/1EeGMIMXifFvLo_hdQJWGtHAsclSHt1L7/view?usp=sharing",
        "https://drive.google.com/file/d/1UCVoKFOCAWaA06i3PAL_Cj5MaWSN7Oap/view?usp=sharing",
        "https://drive.google.com/file/d/1Y-FnuDuhVnpzgkeZkMEuR3xotL98J1Js/view?usp=sharing",
        "https://drive.google.com/file/d/1uMsPMhV8T8zeBCRE2KOx1L_T9G3WPUv6/view?usp=sharing",
         "https://drive.google.com/file/d/1VE5L7Gvyn78Vemqmk1u9BmwGxbA1GY45/view?usp=sharing",
        "https://drive.google.com/file/d/1GrUQKpcUnmbt7W5xtJx5GzdQ_dKn4ypZ/view?usp=sharing"
    ]
  },
    operateurs_polyvalents: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Produits chimiques"
    ], 
    liens_risques: [
        "https://drive.google.com/file/d/1JKU6LBprdTohn6skSbjIZmzzrz7EvT_r/view?usp=sharing",
        "https://drive.google.com/file/d/1DBPO7mfxCmkvZawg7sNMEWgXJy4PncR4/view?usp=sharing",
        "https://drive.google.com/file/d/1hu1PNgKcqQ1NAxUHwcWxN110TDRUI0KZ/view?usp=sharing",
        "https://drive.google.com/file/d/1cI-rlmi2i_2FmWz86reCvQaTHtePzVey/view?usp=sharing",
        "https://drive.google.com/file/d/1ebwKR8j60VtknFrSdI4DEBL8px6j4OVg/view?usp=sharing",
        "https://drive.google.com/file/d/11wL2sls-LP16aoPUNBUez4XetiGoXId6/view?usp=sharing",
        "https://drive.google.com/file/d/1EeGMIMXifFvLo_hdQJWGtHAsclSHt1L7/view?usp=sharing",
        "https://drive.google.com/file/d/1UCVoKFOCAWaA06i3PAL_Cj5MaWSN7Oap/view?usp=sharing",
        "https://drive.google.com/file/d/1Y-FnuDuhVnpzgkeZkMEuR3xotL98J1Js/view?usp=sharing",
        "https://drive.google.com/file/d/1iOf0cTWyqP5RO0V1cgqeZYsO3EXHQnlp/view?usp=sharing",
        "https://drive.google.com/file/d/1uMsPMhV8T8zeBCRE2KOx1L_T9G3WPUv6/view?usp=sharing",
        "https://drive.google.com/file/d/1GrUQKpcUnmbt7W5xtJx5GzdQ_dKn4ypZ/view?usp=sharing"
    ]
  },  
  intervenant_bathy_topo: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque routier"
    ],
    liens_risques: [
        "https://drive.google.com/file/d/1JKU6LBprdTohn6skSbjIZmzzrz7EvT_r/view?usp=sharing",
        "https://drive.google.com/file/d/1DBPO7mfxCmkvZawg7sNMEWgXJy4PncR4/view?usp=sharing",
        "https://drive.google.com/file/d/1hu1PNgKcqQ1NAxUHwcWxN110TDRUI0KZ/view?usp=sharing",
        "https://drive.google.com/file/d/1ebwKR8j60VtknFrSdI4DEBL8px6j4OVg/view?usp=sharing",
        "https://drive.google.com/file/d/11wL2sls-LP16aoPUNBUez4XetiGoXId6/view?usp=sharing",
        "https://drive.google.com/file/d/1EeGMIMXifFvLo_hdQJWGtHAsclSHt1L7/view?usp=sharing",
        "https://drive.google.com/file/d/1UCVoKFOCAWaA06i3PAL_Cj5MaWSN7Oap/view?usp=sharing",
        "https://drive.google.com/file/d/1Y-FnuDuhVnpzgkeZkMEuR3xotL98J1Js/view?usp=sharing",
        "https://drive.google.com/file/d/1iOf0cTWyqP5RO0V1cgqeZYsO3EXHQnlp/view?usp=sharing",
     ]
  },
    intervenant_tereos: {
    risques: [
      "Coactivité Engins Piétons",
      "Protection de l’environnement",
      "Port des EPI",
      "Intervention mécanique",
      "Manutention manuelle",
      "Risque de chute à l’eau et noyade",
      "Opérations de levage mécanique",
      "Réfléchir avant d’agir",
      "Ordre et propreté sur le chantier",
      "Risque électrique",
      "Risque routier",
      "Risques de chute de plain-pied",
      "Risque de chute de hauteur",
      "Produits chimiques",
    ],
    liens_risques: [
        "https://drive.google.com/file/d/1qLUXU6CCyFPBT8XaOwsO7c4PyYODJOZX/view?usp=sharing",
        "https://drive.google.com/file/d/1DBPO7mfxCmkvZawg7sNMEWgXJy4PncR4/view?usp=sharing",
        "https://drive.google.com/file/d/1hu1PNgKcqQ1NAxUHwcWxN110TDRUI0KZ/view?usp=sharing",
        "https://drive.google.com/file/d/1cI-rlmi2i_2FmWz86reCvQaTHtePzVey/view?usp=sharing",
        "https://drive.google.com/file/d/1ebwKR8j60VtknFrSdI4DEBL8px6j4OVg/view?usp=sharing",
        "https://drive.google.com/file/d/11wL2sls-LP16aoPUNBUez4XetiGoXId6/view?usp=sharing",
        "https://drive.google.com/file/d/1EeGMIMXifFvLo_hdQJWGtHAsclSHt1L7/view?usp=sharing",
        "https://drive.google.com/file/d/1UCVoKFOCAWaA06i3PAL_Cj5MaWSN7Oap/view?usp=sharing",
        "https://drive.google.com/file/d/1Y-FnuDuhVnpzgkeZkMEuR3xotL98J1Js/view?usp=sharing",
        "https://drive.google.com/file/d/1GYqgxv6KBUklmYz_1yFvjY_bJ-Y0A5JS/view?usp=sharing",
        "https://drive.google.com/file/d/1iOf0cTWyqP5RO0V1cgqeZYsO3EXHQnlp/view?usp=sharing",
        "https://drive.google.com/file/d/1uMsPMhV8T8zeBCRE2KOx1L_T9G3WPUv6/view?usp=sharing",
        "https://drive.google.com/file/d/1VE5L7Gvyn78Vemqmk1u9BmwGxbA1GY45/view?usp=sharing",
        "https://drive.google.com/file/d/1GrUQKpcUnmbt7W5xtJx5GzdQ_dKn4ypZ/view?usp=sharing"
    ]
  },
};
function getPosteName(key) {
  const map = {
    conducteurs_tp: "Conducteur d'engins TP",
    equipements_fluviaux: "Conducteur d'équipements fluviaux / faucardage",
    marinier: "Marinier / conducteur de bateau",
    chauffeur_pl: "Chauffeur PL / grue auxiliaire",
    mecanicien: "Mécanicien",
    soudeur: "Soudeur",
    travaux_forestiers: "Travaux forestiers",
    operateurs_polyvalents: "Opérateur polyvalent",
    intervenant_bathy_topo: "Intervenant bathymétrie / topographie",
    intervenant_tereos: "Intervenant TEREOS",
  };
  return map[key] || key;
}

/* Compteur global de repères (pour numéroter sur plusieurs postes) */
let COMPTEUR_SCENE = 0;

// 🔹 Affiche la scène de travail du poste + les risques fléchés
function createTable(posteKey, container) {
  const posteNom = getPosteName(posteKey);
  const poste = postesData[posteKey];
  if (!poste) return;

  const scene = SCENES[posteKey];
  const idScene = "sc" + (++COMPTEUR_SCENE);

  // Lien de la fiche de risque à partir de son libellé
  const lienDe = (nom) => {
    const i = poste.risques.indexOf(nom);
    return i >= 0 ? poste.liens_risques[i] : null;
  };

  const titre = document.createElement("div");
  titre.className = "poste-titre";
  titre.innerHTML = `<span class="poste-titre-ico">👷</span> ${posteNom}` +
    (scene ? ` <span class="poste-titre-scene">${scene.titre}</span>` : "") +
    ` <span class="poste-titre-nb">${poste.risques.length} fiches de risque</span>`;
  container.appendChild(titre);

  // ── Risques illustrés sur la scène ──
  const placesValides = scene ? scene.points.filter(p => lienDe(p.r)) : [];

  if (placesValides.length) {
    const bloc = document.createElement("div");
    bloc.className = "scene-bloc";

    // Image + repères numérotés
    const fig = document.createElement("div");
    fig.className = "scene-fig";
    fig.innerHTML = `<img class="scene-img" src="${scene.img}" alt="${scene.titre}">`;
    placesValides.forEach((p, i) => {
      const pt = document.createElement("button");
      pt.type = "button";
      pt.className = "scene-pt";
      pt.style.left = p.x + "%";
      pt.style.top = p.y + "%";
      pt.textContent = i + 1;
      pt.setAttribute("data-cible", idScene + "-" + i);
      pt.title = p.r;
      fig.appendChild(pt);
    });
    bloc.appendChild(fig);

    // Légende : une ligne par repère
    const legende = document.createElement("div");
    legende.className = "scene-legende";
    placesValides.forEach((p, i) => {
      const ligne = document.createElement("label");
      ligne.className = "scene-row";
      ligne.id = idScene + "-" + i;
      ligne.innerHTML = `<span class="scene-num">${i + 1}</span>
        <input type="checkbox">
        <span class="risk-lbl">${p.r}</span>`;
      ligne.appendChild(vignetteDoc(lienDe(p.r), "doc-vignette doc-vignette-mini"));
      legende.appendChild(ligne);
    });
    bloc.appendChild(legende);

    container.appendChild(bloc);
  }

  // ── Poste couvert par une fiche de formation au poste dédiée ──
  if (POSTES_FICHE_DEDIEE.includes(posteKey)) {
    const info = document.createElement("div");
    info.className = "alert alert-bleu";
    info.style.marginTop = "12px";
    info.innerHTML = `<span class="alert-ico">🎓</span>
      <span>Ce poste fait l'objet d'une <span class="bold">fiche de formation &amp; accompagnement au poste dédiée</span>,
      qui détaille les situations de travail et les risques associés. Les fiches de risque ci-dessous restent à présenter lors de l'accueil.
      <a class="no-print" href="https://outilshse.github.io/FORMATIONS-AUTORISATIONS-DE-CONDUITE/" target="_blank" style="font-weight:600;">🔗 Accéder aux fiches de formation au poste</a></span>`;
    container.appendChild(info);
  }

  // ── Risques du poste non illustrés sur la scène ──
  const illustres = placesValides.map(p => p.r);
  const autres = poste.risques.filter(r => !illustres.includes(r));

  if (autres.length) {
    const entete = document.createElement("div");
    entete.className = "famille-head";
    entete.innerHTML = `<span class="famille-ico">📌</span><span class="famille-t">${
      placesValides.length ? "Autres risques du poste" : "Risques du poste"
    }</span><span class="famille-line"></span>`;
    container.appendChild(entete);

    const liste = document.createElement("div");
    liste.className = "risk-list";
    autres.forEach(nom => {
      const ligne = document.createElement("label");
      ligne.className = "risk-row";
      ligne.innerHTML = `<input type="checkbox"><span class="risk-lbl">${nom}</span>`;
      ligne.appendChild(vignetteDoc(lienDe(nom), "doc-vignette doc-vignette-mini"));
      liste.appendChild(ligne);
    });
    container.appendChild(liste);
  }
}

/* Clic sur un repère de la scène → met en évidence la ligne correspondante */
document.addEventListener("click", (e) => {
  const pt = e.target.closest(".scene-pt");
  if (!pt) return;
  e.preventDefault();
  const ligne = document.getElementById(pt.getAttribute("data-cible"));
  if (!ligne) return;
  document.querySelectorAll(".scene-row.vise").forEach(l => l.classList.remove("vise"));
  document.querySelectorAll(".scene-pt.vise").forEach(p => p.classList.remove("vise"));
  ligne.classList.add("vise");
  pt.classList.add("vise");
  ligne.scrollIntoView({ block: "nearest", behavior: "smooth" });
});

/* Survol d'une ligne → met en évidence le repère correspondant */
document.addEventListener("mouseover", (e) => {
  const row = e.target.closest && e.target.closest(".scene-row");
  if (!row) return;
  const pt = document.querySelector(`.scene-pt[data-cible="${row.id}"]`);
  if (pt) pt.classList.add("survol");
});

document.addEventListener("mouseout", (e) => {
  const row = e.target.closest && e.target.closest(".scene-row");
  if (!row) return;
  const pt = document.querySelector(`.scene-pt[data-cible="${row.id}"]`);
  if (pt) pt.classList.remove("survol");
});

/* =========================================================
   RETEX — retours d'expérience (cartes visuelles)
   ========================================================= */
const RETEX = [
  { titre: "Plaie avec un cutter", lien: "https://drive.google.com/file/d/1RinR9XTqwOF2RrQHuGz1ycztNpjcQRV5/view?usp=sharing",
    lecons: ["Utiliser un outil adapté et conforme à la tâche à réaliser.", "Adopter les bons gestes de sécurité (couper à l'opposé du corps).", "Déploiement de trousses de secours dans les cabines des engins."] },
  { titre: "Coupure aux doigts", lien: "https://drive.google.com/file/d/1Mzmb1Ukm_DR1Aw8LEJ7OrQGTczCgQ7ov/view?usp=sharing",
    lecons: ["Sécuriser le stockage et le conditionnement des charges pour éviter tout déplacement accidentel.", "Prioriser la manutention mécanique plutôt que le port manuel des charges lourdes."] },
  { titre: "Chute à l'eau", lien: "https://drive.google.com/file/d/1TLWGV-Hg636PSc5BFF80hLQvW49rUuGJ/view?usp=sharing",
    lecons: ["Prévoir des moyens de sauvetage et de remontée accessibles en cas de chute à l'eau."] },
  { titre: "Opération de déchargement", lien: "https://drive.google.com/file/d/1V-G8buGGgEuihCKV0KAzn6Uku1I5zMeU/view?usp=sharing",
    lecons: ["Ne jamais tenter de retenir une charge en mouvement avec les mains.", "Guider systématiquement les charges avec des moyens adaptés pour maîtriser le balancement.", "Éviter le travail isolé et maintenir une vigilance constante lors des opérations de levage."] },
  { titre: "Explosion d'une batterie sur un pousseur", lien: "https://drive.google.com/file/d/1RXyAaEekKIjdQEe9Nheuq59JAzjuz__D/view?usp=sharing",
    lecons: ["Respecter les procédures de branchement et de manipulation des batteries.", "Travailler dans un environnement sécurisé et adapté avant toute intervention électrique.", "Porter systématiquement les EPI adaptés (visière) contre projections et brûlures."] },
  { titre: "Entorse de la cheville", lien: "https://drive.google.com/file/d/1V09HfB-qnClD3Jvipv_2VOnahhDt76Yi/view?usp=sharing",
    lecons: ["Vérifier l'état du sol et emprunter les cheminements sécurisés avant tout déplacement.", "Monter et descendre des engins avec des accès propres et sécurisés. Respecter les 3 points d'appui.", "Porter des chaussures montantes adaptées pour limiter les risques de chute et d'entorse."] },
  { titre: "Pollution mineure", lien: "https://drive.google.com/file/d/10aPW8v_pvb2__D4rwzgK9PXza56qtoaB/view?usp=sharing",
    lecons: ["Anticiper les risques de pollution avant toute opération de maintenance.", "Mettre en place des dispositifs de rétention et des moyens anti-pollution adaptés."] }
];

function construireRetex() {
  const conteneur = document.getElementById("retex-container");
  if (!conteneur || conteneur.children.length > 0) return;

  RETEX.forEach((r, i) => {
    const carte = document.createElement("div");
    carte.className = "retex-card";
    const tete = document.createElement("div");
    tete.className = "retex-head";
    tete.innerHTML = `<input type="checkbox" id="retex${i}">
      <label class="retex-title" for="retex${i}">⚠️ ${r.titre}</label>
      <button type="button" class="retex-toggle no-print" title="Voir les enseignements">▼</button>`;
    tete.appendChild(vignetteDoc(r.lien, "doc-vignette doc-vignette-mini"));
    carte.appendChild(tete);

    const corps = document.createElement("div");
    corps.className = "retex-body";
    corps.innerHTML = "<ul class='no-bullet'>" + r.lecons.map(l => "<li>• " + l + "</li>").join("") + "</ul>";
    carte.appendChild(corps);

    conteneur.appendChild(carte);
  });
}

/* Ouverture / fermeture d'un RETEX (délégation) */
document.addEventListener("click", (e) => {
  if (e.target.classList && e.target.classList.contains("retex-toggle")) {
    e.target.closest(".retex-card").classList.toggle("open");
  }
});

// 🔹 Canvas signature
function setupCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

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
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

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

  // Souris
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mouseout", endPosition);
  canvas.addEventListener("mousemove", draw);

  // Tactile
  canvas.addEventListener("touchstart", startPosition);
  canvas.addEventListener("touchend", endPosition);
  canvas.addEventListener("touchcancel", endPosition);
  canvas.addEventListener("touchmove", draw);
}

function clearCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 🔹 Sauvegarde et restauration du contenu
function savePageContent() {
  const page = document.querySelector("#page4");
  if (!page) return;

  const inputs = page.querySelectorAll('input, textarea, select, canvas');

  inputs.forEach(input => {
    if (input.type === 'checkbox' || input.type === 'radio') {
      if (input.checked) {
        input.setAttribute('checked', 'checked');
      } else {
        input.removeAttribute('checked');
      }
    } else if (input.tagName.toLowerCase() === 'textarea') {
      input.textContent = input.value; // ✅ conserve la valeur interne
    } else if (input.tagName.toLowerCase() === 'canvas') {
      // ✅ Sauvegarde la signature sous forme d'image base64
      const dataURL = input.toDataURL("image/png");
      input.setAttribute('data-image', dataURL);
    } else {
      input.setAttribute('value', input.value);
    }
  });

  localStorage.setItem("page4Content", page.outerHTML);
}

function loadPageContent() {
const savedContent = localStorage.getItem("page4Content");
  if (!savedContent) return;

  const page = document.querySelector("#page4");
  if (!page) return;

  const parser = new DOMParser();
  const doc = parser.parseFromString(savedContent, "text/html");
  const savedPage = doc.querySelector("#page4");

  if (savedPage) {
    page.innerHTML = savedPage.innerHTML;

    // 🔄 Réinitialise les canvases sauvegardés
    page.querySelectorAll("canvas[data-image]").forEach(canvas => {
      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
      };
      img.src = canvas.getAttribute("data-image");
    });
  }
}

function redirectToInstructionPage() {
  savePageContent();
  window.location.href = "instruction.html";
}

// 🔹 Initialisation
document.addEventListener("DOMContentLoaded", () => {
  // Chargement localStorage
  loadPageContent();

  // RETEX (uniquement si non restaurés)
  construireRetex();

  // Poste pré-sélectionné depuis la page 1
  const premier = document.querySelector(".poste-select");
  if (premier && !premier.value) {
    const poste = localStorage.getItem("posteTravail");
    if (poste && postesData[poste]) {
      premier.value = poste;
      const bloc = premier.closest(".poste-block");
      const conteneur = bloc.querySelector(".table-container");
      conteneur.innerHTML = "";
      createTable(poste, conteneur);
    }
  }

  // Sélecteurs de poste : délégation d'événement
  // (fonctionne aussi après restauration du brouillon et pour les postes ajoutés)
  document.addEventListener("change", (e) => {
    if (e.target.classList && e.target.classList.contains("poste-select")) {
      const block = e.target.closest(".poste-block");
      const tableContainer = block.querySelector(".table-container");
      tableContainer.innerHTML = "";
      if (e.target.value) createTable(e.target.value, tableContainer);
    }
  });

  // Ajouter un poste (3 maximum)
  document.addEventListener("click", (e) => {
    if (e.target.id !== "add-poste") return;

    const postesContainer = document.getElementById("postes-container");
    if (postesContainer.querySelectorAll(".poste-block").length >= 3) {
      alert("Vous pouvez ajouter jusqu'à 3 postes maximum.");
      return;
    }

    const newBlock = document.createElement("div");
    newBlock.classList.add("poste-block");
    newBlock.innerHTML = `
      <div class="poste-select-row">
        <div class="field">
          <label>Poste de travail</label>
          <select class="poste-select">
            <option value="">-- Sélectionner un poste --</option>
            <option value="conducteurs_tp">Conducteur d'engins TP</option>
            <option value="equipements_fluviaux">Conducteur d'équipements fluviaux / faucardage</option>
            <option value="marinier">Marinier / conducteur de bateau</option>
            <option value="chauffeur_pl">Chauffeur PL / grue auxiliaire</option>
            <option value="mecanicien">Mécanicien</option>
            <option value="soudeur">Soudeur</option>
            <option value="travaux_forestiers">Travaux forestiers</option>
            <option value="operateurs_polyvalents">Opérateur polyvalent</option>
            <option value="intervenant_bathy_topo">Intervenant bathymétrie / topographie</option>
            <option value="intervenant_tereos">Intervenant TEREOS</option>
          </select>
        </div>
        <button type="button" class="btn btn-ghost del-poste no-print">✕ Retirer</button>
      </div>
      <div class="table-container"></div>
    `;

    postesContainer.appendChild(newBlock);
  });

  // Retirer un poste ajouté
  document.addEventListener("click", (e) => {
    if (e.target.classList && e.target.classList.contains("del-poste")) {
      e.target.closest(".poste-block").remove();
    }
  });
});

// Sauvegarde avant fermeture
window.onbeforeunload = savePageContent;