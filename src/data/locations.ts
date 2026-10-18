/**
 * Zones d'intervention & pages SEO locales (/demenagement-{slug}).
 *
 * Zone confirmée par le client (14/10/2026) : principalement l'Île-de-France,
 * depuis Montreuil, et toute la France. Chaque ville publiée a un contenu
 * propre (accès, stationnement, secteurs) : jamais de page dupliquée où seul
 * le nom change. Aucun chiffre, délai ou tarif inventé : les démarches de
 * stationnement sont décrites sans délai précis, à confirmer auprès de la mairie.
 *
 * Ajouter une ville : une entrée `published: true` avec un contenu spécifique.
 * Elle entre automatiquement dans le sitemap, le maillage et schema.org.
 */

export interface Location {
  slug: string;
  name: string;
  /** Code postal principal, ou département pour Paris */
  postalCode: string;
  department: string;
  published: boolean;
  content?: {
    intro: string;
    access: string[];
    /** Secteurs et quartiers couverts (noms usuels) */
    neighbourhoods: string[];
    parking: string;
    faq: Array<{ q: string; a: string }>;
    note: string;
  };
}

const parkingMairie = (ville: string) =>
  `À ${ville}, l'emplacement réservé devant l'immeuble se demande auprès de la mairie (service voirie ou police municipale), plusieurs jours avant la date. Indiquez-nous si le stationnement est difficile : nous vous expliquons la démarche et en tenons compte dans le devis.`;

export const locations: Location[] = [
  {
    slug: "montreuil",
    name: "Montreuil",
    postalCode: "93100",
    department: "Seine-Saint-Denis",
    published: true,
    content: {
      intro:
        "SAMYO est basé à Montreuil. Du Bas-Montreuil aux hauteurs de la ville, nous connaissons les rues étroites, les cours d'anciens ateliers et les résidences avec parking souterrain : votre déménagement est préparé avec un interlocuteur qui connaît le terrain.",
      access: [
        "Bas-Montreuil et Croix-de-Chavaux : rues étroites et anciens ateliers transformés en logements, portage parfois long jusqu'au camion.",
        "Immeubles anciens sans ascenseur ou avec cabine étroite : démontage des grands meubles prévu dès le devis.",
        "Résidences récentes avec parking souterrain : hauteur limitée, le camion reste en surface et le portage est anticipé.",
        "Rues en pente sur les hauteurs de la ville : calage renforcé du chargement.",
      ],
      neighbourhoods: ["Bas-Montreuil", "Croix-de-Chavaux", "Centre-ville / Mairie", "Villiers-Barbusse", "Solidarité-Carnot", "Ramenas", "Boissière", "Ruffins"],
      parking: parkingMairie("Montreuil"),
      faq: [
        {
          q: "Vous déménagez aussi de Montreuil vers la province ?",
          a: "Oui. Nous intervenons principalement en Île-de-France et réalisons aussi des déménagements vers toute la France, au départ ou à l'arrivée de Montreuil.",
        },
        {
          q: "Je n'ai que quelques meubles à déplacer dans Montreuil, c'est possible ?",
          a: "Oui, c'est le parcours « transport d'objets » du calculateur : un canapé, une armoire ou quelques cartons, sans passer par un déménagement complet.",
        },
      ],
      note: "Basés à Montreuil : une visite technique est plus simple à organiser pour les logements de la ville et des communes voisines.",
    },
  },
  {
    slug: "paris",
    name: "Paris",
    postalCode: "75",
    department: "Paris",
    published: true,
    content: {
      intro:
        "Immeubles haussmanniens sans ascenseur, escaliers de service, cours intérieures, circulation dense : un déménagement à Paris se prépare. Depuis Montreuil, aux portes de l'Est parisien, SAMYO organise votre départ ou votre arrivée dans tous les arrondissements.",
      access: [
        "Immeubles anciens : étages élevés sans ascenseur ou cabines très étroites, démontage et portage anticipés.",
        "Cours intérieures et portes cochères : distance de portage évaluée avant le jour J.",
        "Rues étroites et circulation dense : choix du véhicule adapté au volume et à la rue.",
        "Mobilier volumineux (canapé d'angle, armoire) : passage de la cage d'escalier vérifié avec vous dès l'inventaire.",
      ],
      neighbourhoods: ["11e", "12e", "20e", "19e", "10e", "3e et 4e", "Tous arrondissements"],
      parking:
        "À Paris, l'emplacement réservé au camion pour un déménagement se demande auprès de la Ville de Paris, plusieurs jours avant la date. Signalez-nous votre adresse : nous vous indiquons la démarche et prévoyons le portage si l'emplacement n'est pas disponible.",
      faq: [
        {
          q: "Comment déménager au 5e étage sans ascenseur à Paris ?",
          a: "Indiquez l'étage et l'absence d'ascenseur dans le calculateur : le volume, l'équipe et le démontage des grands meubles sont prévus en conséquence dans le devis.",
        },
        {
          q: "Vous faites les déménagements Paris – banlieue ?",
          a: "Oui, c'est notre quotidien : Paris vers la Seine-Saint-Denis, le Val-de-Marne ou les Hauts-de-Seine, et l'inverse, ainsi que Paris vers la province.",
        },
      ],
      note: "Pour les étages élevés sans ascenseur, signalez-le dès la demande : c'est l'information qui change le plus l'organisation du jour J.",
    },
  },
  {
    slug: "vincennes",
    name: "Vincennes",
    postalCode: "94300",
    department: "Val-de-Marne",
    published: true,
    content: {
      intro:
        "Ville voisine de Montreuil, Vincennes mêle immeubles bourgeois, petites copropriétés et maisons de ville. SAMYO prépare votre déménagement à partir de votre inventaire et des accès réels de votre adresse.",
      access: [
        "Immeubles anciens du centre-ville : escaliers étroits et ascenseurs de petite taille fréquents.",
        "Rues commerçantes très fréquentées : horaires de chargement choisis pour limiter la gêne.",
        "Maisons de ville avec jardin ou allée : portage évalué jusqu'au camion.",
      ],
      neighbourhoods: ["Centre-ville", "Château", "Bérault", "Limite Saint-Mandé", "Limite Fontenay-sous-Bois", "Limite Montreuil"],
      parking: parkingMairie("Vincennes"),
      faq: [
        {
          q: "Vincennes – Paris, c'est un petit déménagement ?",
          a: "La distance est courte, mais ce sont surtout le volume, les étages et le stationnement qui déterminent l'organisation : le calculateur permet de tout décrire en quelques minutes.",
        },
      ],
      note: "À deux pas de Montreuil : nous pouvons facilement passer voir les accès si votre logement présente une difficulté particulière.",
    },
  },
  {
    slug: "bagnolet",
    name: "Bagnolet",
    postalCode: "93170",
    department: "Seine-Saint-Denis",
    published: true,
    content: {
      intro:
        "Bagnolet, entre Paris et Montreuil, alterne grands ensembles, résidences et pavillons. SAMYO, installé juste à côté, organise votre déménagement avec un interlocuteur unique du devis au jour J.",
      access: [
        "Grands ensembles : ascenseurs à réserver auprès du gardien ou du syndic, à prévoir avant la date.",
        "Quartiers pavillonnaires : rues en pente et accès par jardin, portage évalué au devis.",
        "Proximité du périphérique : horaires de départ choisis pour éviter les heures les plus chargées.",
      ],
      neighbourhoods: ["Centre", "La Noue", "Les Coutures", "Malassis", "Gallieni", "Limite Paris 20e"],
      parking: parkingMairie("Bagnolet"),
      faq: [
        {
          q: "Faut-il réserver l'ascenseur de mon immeuble ?",
          a: "Dans beaucoup de résidences, oui : demandez au gardien ou au syndic s'il faut le réserver ou le protéger. Indiquez-le dans le calculateur, nous en tenons compte.",
        },
      ],
      note: "Commune voisine de notre base de Montreuil : intervention simple à organiser, y compris pour un petit transport de meubles.",
    },
  },
  {
    slug: "rosny-sous-bois",
    name: "Rosny-sous-Bois",
    postalCode: "93110",
    department: "Seine-Saint-Denis",
    published: true,
    content: {
      intro:
        "À Rosny-sous-Bois, entre résidences, pavillons et secteurs commerçants, chaque adresse a ses contraintes d'accès. SAMYO, basé à Montreuil tout proche, les anticipe dès votre demande de devis.",
      access: [
        "Pavillons : accès par allée ou jardin, distance jusqu'au camion évaluée au devis.",
        "Résidences avec ascenseur : réservation et protection de la cabine à prévoir avec le gardien.",
        "Secteurs commerçants très fréquentés : créneau de chargement adapté.",
      ],
      neighbourhoods: ["Centre-ville", "Bois-Perrier", "Secteur Rosny 2", "Limite Montreuil", "Limite Villemomble", "Limite Neuilly-Plaisance"],
      parking: parkingMairie("Rosny-sous-Bois"),
      faq: [
        {
          q: "Vous pouvez transporter un seul meuble acheté d'occasion ?",
          a: "Oui, avec le parcours « transport d'objets » : indiquez l'adresse d'enlèvement, celle de livraison et l'objet, nous revenons vers vous.",
        },
      ],
      note: "Rosny-sous-Bois fait partie de notre secteur de proximité autour de Montreuil.",
    },
  },
  {
    slug: "fontenay-sous-bois",
    name: "Fontenay-sous-Bois",
    postalCode: "94120",
    department: "Val-de-Marne",
    published: true,
    content: {
      intro:
        "De Val de Fontenay aux quartiers pavillonnaires, Fontenay-sous-Bois offre des accès très différents d'une rue à l'autre. SAMYO les identifie avec vous avant de vous transmettre le devis.",
      access: [
        "Quartiers pavillonnaires en pente : calage du chargement et portage adaptés.",
        "Résidences autour de Val de Fontenay : accès et horaires à vérifier avec la copropriété.",
        "Maisons avec escaliers extérieurs : démontage des grands meubles prévu si nécessaire.",
      ],
      neighbourhoods: ["Centre", "Val de Fontenay", "Les Larris", "Les Rigollots", "Limite Vincennes", "Limite Montreuil"],
      parking: parkingMairie("Fontenay-sous-Bois"),
      faq: [
        {
          q: "Vous déménagez aussi les bureaux et petits commerces ?",
          a: "Oui, décrivez votre activité et votre mobilier dans le calculateur ou appelez-nous : l'organisation est planifiée pour limiter l'interruption de votre activité.",
        },
      ],
      note: "Fontenay-sous-Bois est limitrophe de Montreuil : intervention et visite technique faciles à organiser.",
    },
  },
];

export const publishedLocations = locations.filter((l) => l.published && l.content);
export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug);
