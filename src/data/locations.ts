/**
 * Zones d'intervention & pages SEO locales.
 *
 * Aucune zone n'est encore confirmée par le client : la liste est vide, donc
 * aucune page locale n'est générée et la section « Zones » n'est pas affichée.
 *
 * Pour publier une ville : ajouter une entrée `published: true` avec un
 * contenu réellement spécifique (accès, stationnement, quartiers). Les URLs
 * publiques suivent le format /demenagement-{slug}.
 */

export interface Location {
  slug: string;
  name: string;
  postalCode: string;
  published: boolean;
  content?: {
    intro: string;
    access: string[];
    neighbourhoods: string[];
    note: string;
  };
}

export const locations: Location[] = [];

export const publishedLocations = locations.filter((l) => l.published && l.content);
export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug);
