/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  IDENTITÉ ENTREPRISE — SAMYO Déménagement
 * ─────────────────────────────────────────────────────────────────────────────
 *  Source unique : header, footer, contact, WhatsApp, e-mails, schema.org et
 *  pages légales lisent ce fichier. Informations reçues du client le
 *  14/10/2026 (voir docs/CLIENT-HANDOVER.md).
 *
 *  Règle : une valeur inconnue vaut `null` et n'est PAS affichée. Ne jamais
 *  inventer SIRET, RCS, TVA, assurance, horaires, zones, chiffres ou avis.
 *  SIREN : confirmé par le client le 14/10/2026 (identifiant de l'entreprise
 *  individuelle de Chafi Ouchari, inchangé ; seul le nom commercial devient
 *  SAMYO). SIREN, EI et APE 4942Z reconfirmés ; SIRET de l'établissement à ajouter.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const env = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

interface Hours {
  display: string;
  short: string;
  schema: Array<{ days: string[]; opens: string; closes: string }>;
}

export const company = {
  name: "SAMYO Déménagement",
  shortName: "SAMYO",
  /** Graphie utilisée dans le logo */
  wordmark: "SAMYO",
  descriptor: "Déménagement & Transport",
  tagline: "De A à B, sans détour.",
  baseline: "Déménagement et transport de mobilier en Île-de-France et partout en France.",

  /** Zone d'intervention confirmée par le client le 14/10/2026 */
  serviceArea: {
    display: "Principalement en Île-de-France, et partout en France",
    short: "Île-de-France · toute la France",
  },

  /** Interlocuteur (affiché uniquement dans les mentions légales) */
  contactPerson: { firstName: "Chafi", lastName: "Ouchari" },

  address: {
    street: "17 place Général de Gaulle",
    /** Code postal non transmis par le client : laissé vide plutôt que deviné */
    postalCode: null as string | null,
    city: "Montreuil",
    country: "France",
    countryCode: "FR",
  },

  phone: {
    display: "07 44 63 02 06",
    e164: "+33744630206",
  },

  /** WhatsApp : même numéro que le téléphone (voir src/lib/whatsapp.ts) */
  whatsapp: {
    e164: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) ?? "+33744630206",
  },

  /**
   * E-mail public affiché sur le site (demande du client du 14/10/2026).
   * ⚠ La boîte (ou une redirection vers leadInbox) doit exister sur le
   * domaine avant la mise en ligne. Remplaçable via NEXT_PUBLIC_CONTACT_EMAIL.
   */
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "contact@samyo-demenagement.fr",

  /**
   * Boîte de réception réelle des demandes du site (non affichée), utilisée
   * si LEAD_EMAIL_TO n'est pas défini.
   */
  leadInbox: "oucharichafi@gmail.com",

  /** Horaires non communiqués : rien n'est affiché tant que c'est `null` */
  hours: null as Hours | null,

  /** Réseaux sociaux : renseigner les URL quand le client les fournit */
  social: {
    instagram: "",
    facebook: "",
    googleBusiness: "",
  },

  /**
   * Mentions légales : `null` = non confirmé, donc masqué sur le site.
   * À compléter avec un extrait d'immatriculation / avis de situation SIRENE
   * récent (voir docs/CLIENT-HANDOVER.md).
   */
  legal: {
    legalName: "Chafi Ouchari, entrepreneur individuel (EI)" as string | null,
    legalForm: "micro-entreprise" as string | null,
    siren: "519 804 330" as string | null,
    /** Code APE 4942Z : services de déménagement */
    ape: "4942Z" as string | null,
    /** SIRET = SIREN + NIC de l'établissement actuel : à confirmer (avis de situation SIRENE) */
    siret: null as string | null,
    rcs: null as string | null,
    vat: null as string | null,
    transportRegistry: null as string | null,
    insurance: null as string | null,
    publisher: "Chafi Ouchari",
    host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com)",
  },

  /** true tant que des informations légales restent à confirmer (SIREN confirmé le 14/10/2026) */
  provisional: false,
};

export type Company = typeof company;

export const telHref = `tel:${company.phone.e164}`;
export const mailHref = `mailto:${company.email}`;
export const addressLine = [company.address.street, [company.address.postalCode, company.address.city].filter(Boolean).join(" ")].join(", ");
