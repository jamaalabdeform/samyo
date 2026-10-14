import { company } from "@/config/company";

/**
 * Point d'entrée unique de la conversation WhatsApp.
 *
 * Aujourd'hui : lien « click to chat » (wa.me) vers le numéro de SAMYO, avec un
 * message prérempli selon le contexte.
 *
 * Jawabot : le bot répondra sur ce même numéro WhatsApp. Une fois branché côté
 * WhatsApp Business, rien ne change dans le site. Si Jawabot fournit plus tard
 * un lien ou un widget dédié, renseigner NEXT_PUBLIC_JAWABOT_URL : tous les
 * boutons l'utiliseront automatiquement (le message reste transmis en `text`).
 * Ne pas annoncer sur le site qu'un assistant automatique répond tant que ce
 * n'est pas le cas.
 */

export type WhatsAppContext = "general" | "estimate" | "callback" | "quote-followup" | "transport" | "question";

const messages: Record<WhatsAppContext, string> = {
  general: "Bonjour SAMYO, je souhaite être accompagné pour mon déménagement.",
  estimate: "Bonjour SAMYO, je prépare un déménagement et j'aimerais un devis.",
  callback: "Bonjour SAMYO, pouvez-vous me rappeler au sujet de mon déménagement ?",
  "quote-followup": "Bonjour SAMYO, je viens d'envoyer ma demande de devis depuis le site.",
  transport: "Bonjour SAMYO, j'ai quelques meubles à transporter et j'aimerais un devis.",
  question: "Bonjour SAMYO, j'ai une question sur mon déménagement.",
};

export interface WhatsAppOptions {
  /** Référence de la demande (SM-…), ajoutée au message */
  reference?: string;
  /** Détail ajouté en fin de message (ex. « Montreuil → Paris, 24 m³ ») */
  detail?: string;
}

export function whatsappMessage(context: WhatsAppContext = "general", opts: WhatsAppOptions = {}) {
  let text = messages[context];
  if (opts.reference) text += ` Référence : ${opts.reference}.`;
  if (opts.detail) text += ` (${opts.detail})`;
  return text;
}

/** Numéro au format attendu par wa.me : chiffres uniquement, sans « + » */
export const whatsappNumber = company.whatsapp.e164.replace(/\D/g, "");

export function whatsappHref(context: WhatsAppContext = "general", opts: WhatsAppOptions = {}) {
  const text = whatsappMessage(context, opts);
  const jawabot = process.env.NEXT_PUBLIC_JAWABOT_URL?.trim();
  if (jawabot) {
    const url = new URL(jawabot);
    url.searchParams.set("text", text);
    return url.toString();
  }
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}
