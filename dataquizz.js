// === Données du quiz ===
const quizzData = [
  {
    questions: [
      {
        theme: "Règles qui sauvent",
        numero: 1,
        type: "qcm",
        enonce: `Je participe à une opération de plantation sur un chantier de génie écologique en bordure de
        canal. Il s’agit exclusivement de travaux manuels. En tenant compte du type de tâche, de
        l’environnement et des risques présents, quels EPI dois-je porter dans cette situation ?`,
        image: "img/quizz/question1.png",
        propositions: [
          { texte: "Chaussures ou bottes de sécurité", correct: true },
          { texte: "Vêtements haute visibilité", correct: true },
          { texte: "Lunettes de protection", correct: true },
          { texte: "Casque de protection", correct: true },
          { texte: "Gants de protection étanches", correct: true },
          { texte: "Harnais antichute", correct: true },
          { texte: "Gilet de sauvetage", correct: true },
        ],
        explication: {
          texte: `Je suis exposé à tous les risques. Je dois porter mes chaussures de sécurité, vêtements haute visibilité et gants étanches par défaut sur tous les chantiers (travail au contact de l’eau)

            J’ajoute le gilet de sauvetage si je travaille à proximité immédiate d’un plan d’eau.

            Le casque de protection est requis dès lors qu’il y a de la coactivité avec des engins et lors des opérations de levage.

            J’adapte et je rajoute des EPI complémentaires en fonction de l’activité et des risques : Protection auditive si je suis exposé au bruit / Montre PTI si je travail seul / Harnais si je travail en talus pentus / Visière s’il y a un risque de projection de particules ou fluides`,
          image: "img/quizz/explication1.png"
        },
        points: 4
      },
      {
        theme: "Règles qui sauvent",
        numero: 2,
        type: "vraiFaux",
        enonce: "Si j’évolue sur un équipement flottant type ponton, je porte mon gilet de sauvetage et ma ceinture de sécurité dans les engins sur l’eau.",
        image: "img/quizz/question2.png",
        propositions: [
          { texte: "Vrai", correct: false },
          { texte: "Faux", correct: true }
        ],
        explication: {
          texte: `Lorsque la pelle est sur l’eau ou à proximité, la ceinture de sécurité n'est pas portée - En cas de basculement de l'engin dans l'eau, il faut que le collaborateur puisse s'extraire ou être extrait rapidement. Pour toutes les autres situations, le port de la ceinture reste obligatoire.
          Le port du gilet de sauvetage y compris dans les engins est obligatoire. -En cas de malaise et de chute à l'eau, le gilet se déclenche automatiquement au contact de l'eau et m'évite la noyade`,
          image: ""
        },
        points: 1
      },
      {
        theme: "Règles qui sauvent",
        numero: 3,
        type: "vraiFaux",
        enonce: "Dans cette situation de travail, je porte mon gilet haute visibilité et je suisen sécurité dans le champ de visibilité du pelleur :",
        image: "img/quizz/question3.png",
        propositions: [
          { texte: "Vrai", correct: false },
          { texte: "Faux", correct: true }
        ],
        explication: {
          texte: `De manière générale, il est interdit de se positionner à proximité d'un engin ou équipement en mouvement. Il faut respecter une distance de sécurité et se signaler au conducteur pour qu'il arrête son engin. De plus, le collaborateur est situé dans un angle mort de l’engin, à droite du bras de pelle.`,
          image: "img/quizz/explication3.png",
        },
        points: 1
      },
      {
        theme: "Règles qui sauvent",
        numero: 4,
        type: "qcm",
        enonce: `Lors des opérations de levage et d’élingage :`,
        image: "img/quizz/question4.png",
        propositions: [
          { texte: "Je contrôle l’état de mes chaînes, de mes crochets, manilles, des points d’ancrage sur l’équipement à manutentionner", correct: true },
          { texte: "Les accessoires de levage sont soumis à des Vérifications Générales Périodiques tous les 2 ans", correct: true },
          { texte: "Ma chaîne de levage doit être équipée d’une plaque d’identification avec le n° de série, la date du dernier contrôle réglementaire, la Charge Minimale d’Utilisation (CMU).", correct: true },
          { texte: "J’utilise obligatoirement une corde pour le guidage de la charge, car il y a risque de pendillement et de collision lors du levage et la manutention", correct: true },
          { texte: "L’angle d’élingage avec une chaîne 2 ou 4 brins, ne doit pas dépasser 90°. Au-delà, la capacité de levage de mes chaînes est largement limitée.", correct: true },
        ],
        explication: {
          texte: `Avant chaque opération d’élingage, je dois contrôler l’état de mes accessoires de levage (chaînes, crochets, manille…). Ces équipements sont soumis à Vérifications Générales Périodiques tous les ans. Une chaîne conforme dispose d’une plaque d’identification avec le n° de série, la Charge MAXIMALE d’Utilisation et la date de fabrication. Un témoin visuel coloré (bague jaune) atteste que l’équipement est contrôlé.

                  Le balancement de la charge lors du levage doit être obligatoirement géré avec une corde de guidage

                  Je respecte un angle maximum de 90° pour éviter un dépassement de la CMU`,
                  image: "img/quizz/explication4.png",
        },
        points: 3
      },
      {
        theme: "Documents de chantier",
        numero: 5,
        type: "qcm",
        enonce: `Quand j’arrive sur un nouveau chantier, j’ai l’obligation de prendre connaissance des risques et de signer :`,
        image: "img/quizz/question5.png",
        propositions: [
          { texte: "Le Plan de Prévention du chantier", correct: true },
          { texte: "Le Plan Particulier de la Sécurité et de Protection de la Santé (PPSPS) pour les chantiers importants avec de la coactivité entre plusieurs entreprises", correct: true },
          { texte: "Le Plan de Gestion des Risques Interentreprises (PGRI) pour les chantiers importants et avec de la coactivité entre plusieurs entreprises", correct: true },
          { texte: "Je peux signer les documents en format papier ou en version électronique sur l’application CDES, c’est autorisé", correct: true },
        ],
        explication: {
          texte: `Tous les chantiers CDES sont soumis à la rédaction d’un Plan de Prévention ou PPSPS si coactivité sur le site. Tous les intervenants doivent prendre connaissance des risques et moyens de prévention renseignés et signés le document. Le PGRI n’existe pas sur un chantier de TP.
          La signature des documents peut être manuscrite ou numérique sur l’application CDES.`,
          image: "",
        },
        points: 3
      },
      {
        theme: "Contrôles obligatoires",
        numero: 6,
        type: "vraiFaux",
        enonce: "Il n’existe que des Vérifications Générales Périodiques (VGP) sur les engins TP :",
        image: "img/quizz/question6.png",
        propositions: [
          { texte: "Vrai", correct: false },
          { texte: "Faux", correct: true }
        ],
        explication: {
          texte: `Il y a des VGP pour tous les équipements à risque selon une fréquence définie dans la réglementation. Les extincteurs, mon gilet de sauvetage, les accessoires de levage sont soumis à VGP (tous les 6 mois pour les équipements qui réalisent du levage)`,
          image: ""
        },
        points: 1
      },
      {
        theme: "Formation/Habilitation",
        numero: 7,
        type: "vraiFaux",
        enonce: "Avec mon autorisation de conduite ci-contre, je peux conduire des pelles mécaniques sur les chantiers CDES",
        image: "img/quizz/question7.png",
        propositions: [
          { texte: "Vrai", correct: false },
          { texte: "Faux", correct: true }
        ],
        explication: {
          texte: `Je dispose bien du CACES B1 qui me permet de conduire des pelles mécaniques > 6t. Cependant, mon autorisation de conduite n’est pas valable car ma visite médicale est dépassée et elle n’a pas été signée par mon employeur (autorisation de conduite = formation à la conduite + présentation des risques + aptitude médicale valide)`,
          image: "",
        },
        points: 1
      },
      {
        theme: "Bonnes pratiques sécurité",
        numero: 8,
        type: "qcm",
        enonce: `Je dois descendre de mon engin pour donner un coup de main à mon collègue au sol.
                  Quelles sont les bonnes pratiques à appliquer ?`,
        image: "img/quizz/question8.png",
        propositions: [
          { texte: "Je respecte la règle des 3 points d’appui", correct: true },
          { texte: "Je respecte la règle des 4 points d’appui", correct: false },
          { texte: "Je peux sauter de la cabine si la hauteur n’est pas très importante", correct: false },
          { texte: "Je descends dos à la cabine pour voir mon environnement de travail quand je descends", correct: false },
          { texte: "Je descends face à la cabine, marche après marche", correct: true },
          { texte: "Je positionne ma cabine dans l’axe des marches-pied pour descendre en sécurité", correct: true },
          { texte: "Je prends le temps de vérifier visuellement si les marches sont recouvertes de boues", correct: true },
       
        ],
        explication: {
          texte: `L'utilisation des 3 points d'appui supprime la perte d'équilibre et le risque de chute en arrière du collaborateur. Il s’agit de l’alternance entre les deux pieds en appui et une main en prise, puis les deux mains en prise et un pied en appui.
          Je descends face à la cabine, marche par marche, en tenant la main courante et en regardant où je mets les pieds.
          Je positionne ma cabine pour descendre en être dans l’axe des marches-pieds et je vérifie qu’ils ne sont pas recouverts de boues avant de descendre.`,
          image: "img/quizz/explication8.png"
        },
        points: 4
      },
      {
        theme: "Bonnes pratiques sécurité",
        numero: 9,
        type: "qcm",
        enonce: `Pour prévenir le risque incendie :`,
        image: "img/quizz/question9.png",
        propositions: [
          { texte: "Tous les engins sont équipés d’un extincteur accessible dans la cabine", correct: true },
          { texte: "Nos extincteurs sont prévus pour agir seulement sur un départ de feu dans les premières minutes", correct: true },
          { texte: "Tous les collaborateurs sont autorisés à utiliser un extincteur", correct: true },
          { texte: "Il est de ma responsabilité de vérifier la date de contrôle de l’extincteur qui ne doit pas dépasser 1an", correct: true },
        ],
        explication: {
          texte: `Dans la cabine de mon engin, il doit y avoir un extincteur accessible et contrôlé depuis moins d’un 1 an. Lorsque je fais le tour de ma machine, je vérifie sa présence et sa conformité. Je dois signaler à ma hiérarchie tout manquement.
            Il n’y a pas d’habilitation spécifique requise pour utiliser un extincteur. Mais je dois agir uniquement sur un départ de feu localisé et qui ne présente pas de danger pour moi, et après avoir quitté la cabine.`,
          image: ""
        },
        points: 4
      },              
      {
        theme: "Bonnes pratiques sécurité",
        numero: 10,
        type: "vraiFaux",
        enonce: "Je réalise une opération de meulage ou de soudure dans le cadre d’une opération de maintenance sur un ponton. Je porte mon gilet haute visibilité pour me rendre visible car je suis sur un chantier CDES.",
        image: "img/quizz/question10.png",
        propositions: [
          { texte: "Vrai", correct: false },
          { texte: "Faux", correct: true }
        ],
        explication: {
          texte: `Faux : Le gilet HV est inflammable - et il est dangereux de le porter lorsque l'on réalise des interventions par points chauds (soudure, meulage, oxycoupage..)`,
          image: ""
        },
        points: 1
      },  
      {
        theme: "Remontées situations dangereuses",
        numero: 11,
        type: "qcm",
        enonce: `Nous avons réalisé une Vigiminute sur le chantier et nous avons constaté une situation dangereuse :`,
        image: "img/quizz/question11.png",
        propositions: [
          { texte: "Je peux noter l’événement dans le formulaire de la Vigiminute", correct: true },
          { texte: "La Vigiminute est un outil qui permet seulement de faire des analyses de risques", correct: false },
          { texte: "Je peux prendre en photo la situation dangereuse concernée", correct: true },
          { texte: "Si le risque est important, je contacte immédiatement mon conducteur de travaux et le Responsable HSE.", correct: true },
          { texte: "Je réalise ma Vigiminute et remonte les situations dangereuses une fois par semaine", correct: true },
          { texte: "Je dois toujours passer par le chef d’équipe du chantier pour faire remonter une situation dangereuse", correct: false },
                          
        ],
        explication: {
          texte: `La Vigiminute est un outil d’évaluation des risques et de remontées des situations dangereuses, presqu’accidents, points d’amélioration, bonnes pratiques.
          Je peux prendre en photo une situation dangereuse et l’ajouter au formulaire pour la partager.
          La Vigiminute peut-être réalisée plusieurs fois par semaine lorsque des risques nouveaux ou des points à remonter sont constatés.`,
          image: ""
        },
        points: 3
      },              
      {
        theme: "Environnement- Gestion des dechets",
        numero: 12,
        type: "vraiFaux",
        enonce: "Les absorbants souillés, les filtres à huiles, les flexibles hydrauliques usagés,les cartouches de graisses vides sont considérés comme des Déchets Souillés non Dangereux.",
        image: "img/quizz/question12.png",
        propositions: [
          { texte: "Vrai", correct: false },
          { texte: "Faux", correct: true }
        ],
        explication: {
          texte: `Les Déchets Souillés sont des Déchets Dangereux potentiellement contaminés par des substances dangereuses et polluantes. Ils doivent être stockés séparément dans des contenants de couleur ROUGE et ramenés au dépôt.)`,
          image: "img/quizz/explication12.png",
        },
        points: 1
      },
 {
       theme: "Environnement- Gestion des pollutions",
        numero: 13,
        type: "qcm",
        enonce: `Un flexible d’huile éclate sur le sol et cause une pollution au niveau du canal à proximité :`,
        image: "img/quizz/question13.png",
        propositions: [
          { texte: "Je stoppe la fuite ou je confine l’huile résiduelle dans un contenant étanche / Je traite le déversement au sol avec de la poudre absorbante / Je confine la zone polluée sur le canal avec mon barrage absorbant / Je signale l’événement à mon N°1", correct: false },
          { texte: "Je stoppe la fuite ou je confine l’huile résiduelle dans un contenant étanche / Je confine la zone polluée sur le canal avec mon barrage absorbant / Je traite le déversement au sol avec de la poudre absorbante / Je signale l’événement à mon N°1", correct: true },
          { texte: "Je signale l’événement à mon N°1 / Je stoppe la fuite ou je confine l’huile résiduelle dans un contenant étanche / Je confine la zone polluée sur le canal avec mon barrage absorbant / Je traite le déversement au sol avec de la poudre absorbante", correct: false },                
        ],
        explication: {
          texte: `En priorité, j’agis sur l’origine de la pollution pour stopper à la source. Ensuite je confine et je traite la pollution selon la sensibilité du milieu (le milieu aquatique étant le plus sensible). Enfin, je préviens le N+1 et le Responsable HSE et je procède à la réparation technique.`,
          image: ""
        },
        points: 1
      },                                              
 {
        theme: "Environnement- Gestion des produits chimiques",
        numero: 14,
        type: "qcm",
        enonce: `Je constate la présence de bidons de produits chimiques sur mon chantier, comme présenté sur l’image ci-contre :`,
        image: "img/quizz/question14.png",
        propositions: [
          { texte: "La couleur m’indique qu’il s’agit de GNR.", correct: true },
          { texte: "Je peux stocker ponctuellement les bidons au sol dans le cadre d’un remplissage en carburant de ma machine", correct: false },
          { texte: "Je porte mes gants de protection nitriles et la visière de mon casque pour utiliser ce produit chimique.", correct: true },
          { texte: "Je ne peux pas connaître les risques de ce produit chimique", correct: true },
          { texte: "En cas d’accident, pour tous les produits chimiques de l’entreprise, il existe des Fiche de Données Sécurité simplifiées pour connaître la conduite à tenir", correct: true },                          
        ],
        explication: {
          texte: `Le stockage en question des bidons n’est pas conforme. Dans tous les cas et peu importe l’usage, les produits chimiques ne doivent pas être stockés en extérieur sur le chantier, sans bac de rétention spécifique.
          Il n’y a pas d’étiquetage sur les bidons pour connaître le nom du produit et ses dangers. La couleur n’est pas méthode d’identification fiable. Je dois donc porter mes EPI (gants et visière) en conséquence.
          Tous les produits disposent d’une FDS qui est la carte d’identité du produit, et qui fournit les règles de réaction en cas d’événement accidentel (intoxication, incendie, pollution)`,
          image: ""
        },
        points: 3
      },
            {
        theme: "Substances psychoactives",      
        numero: 15,
        type: "vraiFaux",
        enonce: "La prise de médicament n’a pas d’impacts sur mes comportements en chantier.",
        image: "img/quizz/question15.png",
        propositions: [
          { texte: "Vrai", correct: false },
          { texte: "Faux", correct: true }
        ],
        explication: {
          texte: `Au même titre que l’alcool ou la drogue, les médicaments peuvent altérer mes capacités physiques sur les chantiers en particulier lors de la conduite d’engins. Je signalise la prise de médicaments pour bénéficier d’aménagements de poste. De plus, la prise de substances psychoactives ou d’alcools peuvent générer des interactions explosives avec les médicaments.`,
          image: "img/quizz/explication15.png"
        },
        points: 1
      },
 {
        theme: "Situation d'urgence/accidentologie",  
        numero: 16,
        type: "qcm",
        enonce: `Je me tords la cheville jeudi matin sur le chantier. Je peux marcher mais la douleur persiste. Que dois-je faire ?`,
        image: "img/quizz/question16.png",
        propositions: [
          { texte: "Je vais laisser passer le weekend pour constater l’évolution et j’appellerai le Responsable HSE lundi à mon retour.", correct: false },
          { texte: "Je vais voir mon médecin et je le dirai plus tard à l’entreprise en fonction du diagnostique", correct: false },
          { texte: "Dans le doute, je vais demander à mon collègue de m’emmener aux Urgences pour consulter", correct: false },                
          { texte: "Je demande l’avais d’un médecin via le SAMU", correct: true },
          { texte: "Dans tous les cas, je préviens mon conducteur de travaux qui en informera aussitôt le Responsable HSE", correct: true },                
         ],
        explication: {
          texte: `J’alerte dans les 48h maximum mon employeur (conducteur de travaux et Responsable HSE) en cas d’accident de travail même bénin (24h pour les intérimaires). Les accidents bénins sont renseignés dans un registre spécifique pour procéder à des déclarations ultérieures.
            Si je ne suis pas apte à conduire, je ne prends pas mon véhicule professionnel et je ne fais pas transporté par un collègue. Je demande un avis médical au médecin du SAMU qui me conseillera sur la solution de transport vers le service de santé le plus adapté.`,
          image: ""
        },
        points: 2
      },                                              
      {
        theme: "Situation d'urgence/accidentologie",  
        numero: 17,
        type: "qcm",
        enonce: `Une personne tombe à l’eau depuis un pousseur fluvial motorisé. Quelles sont les règles de réaction à appliquer ?`,
        image: "img/quizz/question17.png",
        propositions: [
          { texte: "Je fais marche arrière pour revenir rapidement vers elle", correct: true },
          { texte: "Je lance une bouée avec une ligne de vie et je peux utiliser la barque pour récupérer la victime", correct: false },
          { texte: "Je contacte les secours (15 ou VHF selon la zone)", correct: true },
          { texte: "Je garde un contact visuel constant avec la personne à l’eau", correct: true },
          { texte: "Dans tous les cas, la barque, les échelles souples, les gilets de sauvetage et les bouées sont des Equipements de Protection Collectives pour prévenir les risques de noyade.", correct: true },                          
        ],
        explication: {
          texte: `En cas de chute à l’eau d’un collaborateur, j’utilise les dispositifs de secours à disposition pour récupérer la victime (échelle de sauvetage, barque, bouée avec ligne de vie). Selon l’état de la victime, j’alerte les secours en contact le n°15 par téléphone ou un canal  d’urgence spécifique avec une VHF selon la zone
          Je coupe le moteur si je suis à proximité de la victime. Je ne fais aucune manœuvre avec un équipement motorisé au risque de la percuter. Je garde toujours un contact visuel sur la personne à l’eau
          Le gilet de sauvetage n’est pas considéré comme un Equipement de Protection Collectif dans la dernière affirmation. Il s’agit d’un EPI.`,
          image: "img/quizz/explication17.png"
        },
        points: 3
      },
      {
        theme: "Chasse aux risques / bonnes pratiques : ",
        numero: 18,
        type: "imageClick",
        enonce: "Clique sur les zones de danger ou bonnes pratiques présentes sur cette image.",
        image: "img/quizz/question18.png",
        bonnesZones: [
          { x: 10, y: 60, rayon: 4 },
          { x: 15, y: 70, rayon: 7 },
        ],
        explication: {
          texte: `Proximité dangereuse des collaborateurs lors du chargement de la benne étanche​
                  Défaut de port des EPI : Port du casque de protection`,
          image: ""
        },
        points: 2
      },  
      {
        theme: "Chasse aux risques / bonnes pratiques : ",
        numero: 19,
        type: "imageClick",
        enonce: "Clique sur les zones de danger ou bonnes pratiques présentes sur cette image.",
        image: "img/quizz/question19.png",
        bonnesZones: [
          { x: 20, y: 74.1, rayon: 9 },   // SUPER grande zone opérateur gauche
          { x: 53.6, y: 68.7, rayon: 7.5 },  // opérateur centre
          { x: 72.2, y: 68.7, rayon: 6 }     // chaîne rouillée
        ],
        explication: {
          texte: `Port des EPI par les intervenants : casque lors des opérations de levage, vêtements HV, gilet de sauvetage par rapport à la proximité avec le plan d’eau ​
                  Respect de la distance de sécurité avec la charge levée par le conducteur de la grue auxiliaire​
                  Gestion du balancement de la charge avec une corde guidage par le deuxième collaborateur​
                  Chaîne de levage contrôlée : bague jaune qui atteste que l’équipement tes contrôlé `,
          image: ""
        },
        points: 4
      },
      {
        theme: "Chasse aux risques / bonnes pratiques : ",
        numero: 20,
        type: "imageClick",
        enonce: "Clique sur les zones de danger ou bonnes pratiques présentes sur cette image.",
        image: "img/quizz/question20.png",
        bonnesZones: [
          { x: 68, y: 17.0, rayon: 10 },   // câbles électriques
          { x: 70, y: 40, rayon: 12 },   // opérateur sur l’échelle
          { x: 99.5, y: 53.7, rayon: 10 }    // conducteur en cabine
        ],
        explication: {
          texte: `Travail sur échelle toléré dans cette situation car opération ponctuelle et nécessité d’accès mais l’équipement n’est attaché et pas de système de crochets. ​
                  Positionnement du collaborateur sous une ligne électrique : risque d’électrocution​
                  Non respect de la RQS n°1 : on peut supposer que la pelle est en fonctionnement pendant l’intervention car conducteur présent dans la cabine.`,
          image: ""
          },                
        points: 3
      },
            {
        theme: "Chasse aux risques / bonnes pratiques : ",
        numero: 21,
        type: "imageClick",
        enonce: "Clique sur les zones de danger ou bonnes pratiques présentes sur cette image.",
        image: "img/quizz/question21.png",
        bonnesZones: [
          { x: 20.1, y: 43.5, rayon: 5 },   // opérateurs gauche
          { x: 42.9, y: 60.5, rayon: 7 },   // grande zone centrale
          { x: 95.1, y: 85.0, rayon: 18 }    // panneau bleu à droite
        ],
        explication: {
          texte: `Port des EPI par les intervenants : casque de protection lors des opérations de déchargement, vêtements haute visibilité, gilet de sauvetage​
          Balisage des éléments dangereux / balisage de la voirie (chemin de halage) pour supprimer la coactivité avec les usagers / mise en place des panneaux de signalisation en amont de la zone de travaux`,
          image: ""
        },                
        points: 2
      }   
    ]
  }
];
