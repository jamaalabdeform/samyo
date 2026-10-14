/**
 * Réglages transverses du site : URL, indexation, SEO par défaut, drapeaux.
 */
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://samyo.stipway.com").replace(/\/$/, ""),
  /**
   * Indexation par les moteurs : désactivée par défaut (adresse de
   * prévisualisation samyo.stipway.com). Mettre NEXT_PUBLIC_INDEXABLE=1 une fois
   * le site servi sur son domaine définitif.
   */
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "1",
  locale: "fr_FR",
  lang: "fr",

  seo: {
    titleTemplate: "%s · SAMYO Déménagement",
    defaultTitle: "Déménagement Montreuil & Île-de-France, partout en France · SAMYO",
    description:
      "Déménageur basé à Montreuil (93) : déménagement et transport de meubles à Paris, en Île-de-France et partout en France. Calculez votre volume en ligne et recevez un devis clair, vérifié par un conseiller.",
  },

  /** Libellés des CTA — centralisés pour tests A/B futurs */
  cta: {
    primary: "Estimer mon déménagement",
    secondary: "Être rappelé",
    mobile: "Mon devis",
    advisor: "Parler à un conseiller",
  },

  flags: {
    /**
     * Affiche un repère discret sur les emplacements média non encore produits
     * (utile en revue interne, à désactiver pour la présentation client).
     */
    showAssetSlotLabels: false,
  },
} as const;

export const routes = {
  home: "/",
  quote: "/devis",
  legal: "/mentions-legales",
  privacy: "/confidentialite",
  admin: "/espace-pro",
  city: (slug: string) => `/demenagement-${slug}`,
} as const;
