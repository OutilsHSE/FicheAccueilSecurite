renderChrome(4);

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
    conducteurs_tp: "Conducteurs d’engins TP",
    equipements_fluviaux: "Conducteurs équipements fluviaux / maritime",
    marinier: "Marinier / Conducteur de Bateaux Freycinet",
    chauffeur_pl: "Chauffeur PL / Utilisateur de grue auxiliaire",
    mecanicien: "Mécanicien",
    soudeur: "Soudeur",
    travaux_forestiers: "Travaux forestiers",
    operateurs_polyvalents: "Opérateurs polyvalents",
    intervenant_bathy_topo: "Intervenant Cellule Bathy / Topo",
    intervenant_tereos: "Intervenant TEREOS",
  };
  return map[key] || key;
}

// 🔹 Crée la grille de cartes des risques du poste
function createTable(posteKey, container) {
  const posteNom = getPosteName(posteKey);
  const poste = postesData[posteKey];
  if (!poste) return;

  const titre = document.createElement("div");
  titre.className = "poste-titre";
  titre.innerHTML = `<span class="poste-titre-ico">👷</span> ${posteNom} <span class="poste-titre-nb">${poste.risques.length} fiches de risque</span>`;
  container.appendChild(titre);

  const grille = document.createElement("div");
  grille.className = "risk-grid";

  poste.risques.forEach((risque, i) => {
    const lien = poste.liens_risques[i];
    const carte = document.createElement("label");
    carte.className = "risk-card";
    carte.innerHTML = `<input type="checkbox"><span class="risk-lbl">${risque}</span>`;
    carte.appendChild(vignetteDoc(lien));
    grille.appendChild(carte);
  });

  container.appendChild(grille);
}

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
    tete.innerHTML = `<input type="checkbox" id="retex${i}"><label class="retex-title" for="retex${i}">⚠️ ${r.titre}</label>`;
    tete.appendChild(vignetteDoc(r.lien));
    carte.appendChild(tete);

    const corps = document.createElement("div");
    corps.className = "retex-body";
    corps.innerHTML = "<ul class='no-bullet'>" + r.lecons.map(l => "<li>• " + l + "</li>").join("") + "</ul>";
    carte.appendChild(corps);

    conteneur.appendChild(carte);
  });
}

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
            <option value="conducteurs_tp">Conducteurs d'engins TP</option>
            <option value="equipements_fluviaux">Conducteurs équipements fluviaux / maritime</option>
            <option value="marinier">Marinier / Conducteur de Bateaux Freycinet</option>
            <option value="chauffeur_pl">Chauffeur PL / Utilisateur de grue auxiliaire</option>
            <option value="mecanicien">Mécanicien</option>
            <option value="soudeur">Soudeur</option>
            <option value="travaux_forestiers">Travaux forestiers</option>
            <option value="operateurs_polyvalents">Opérateurs polyvalents</option>
            <option value="intervenant_bathy_topo">Intervenant Cellule Bathy / Topo</option>
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