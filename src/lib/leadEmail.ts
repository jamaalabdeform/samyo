import { housingById, roomById, specialItemById } from "@/data/furnitureCatalog";
import { formulas, quoteOptions } from "@/data/services";
import { carryDistanceLabels, yesNoUnknownLabels, type Access, type QuoteDraft } from "@/features/quote/types";
import { formatDate, formatFloor, formatNumber1 } from "@/lib/format";

/**
 * Envoi de chaque demande par e-mail à l'entreprise, via l'API Resend
 * (https://resend.com — offre gratuite suffisante). Variables :
 *   RESEND_API_KEY  clé API
 *   LEAD_EMAIL_TO   destinataire(s), séparés par des virgules
 *   LEAD_EMAIL_FROM expéditeur sur un domaine vérifié dans Resend
 *                   (par défaut onboarding@resend.dev, pour les tests)
 * Sans configuration, rien n'est envoyé (aucune erreur côté visiteur).
 */
export async function sendLeadEmail(subject: string, text: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  if (!key || !to) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_EMAIL_FROM || "SAMYO devis <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: replyTo || undefined,
      subject,
      text,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
  return true;
}

function access(label: string, a: Access, fallbackCity: string) {
  const lift = a.floor && a.floor > 0 ? (a.elevator === "oui" ? `ascenseur (adapté : ${a.elevatorFits ? yesNoUnknownLabels[a.elevatorFits] : "?"})` : "sans ascenseur") : "";
  return [
    `${label} : ${[a.address, [a.postalCode, a.city || fallbackCity].filter(Boolean).join(" ")].filter(Boolean).join(", ")}`,
    `  ${[formatFloor(a.floor), lift, a.carryDistance ? `portage ${carryDistanceLabels[a.carryDistance]}` : "", a.parking ? `stationnement facile : ${yesNoUnknownLabels[a.parking]}` : ""].filter(Boolean).join(" · ")}`,
  ].join("\n");
}

export function quoteEmailText(ref: string, d: QuoteDraft, volume: number, reviewReasons: string[]) {
  const c = d.contact;
  const lines: string[] = [
    `Nouvelle demande de devis ${ref}`,
    "",
    `${c.firstName} ${c.lastName} — ${c.phone} — ${c.email}`,
    "",
    `Type : ${d.kind === "transport" ? "Transport d'objets" : `Déménagement${d.housing ? ` (${housingById[d.housing].label})` : ""}`}`,
    `Trajet : ${d.from.city} → ${d.to.city}`,
    `Volume estimé : ${formatNumber1(volume)} m³`,
    `Date : ${d.date.value ? formatDate(d.date.value, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "à convenir"}${d.date.flexible ? " (flexible)" : ""}`,
    `Formule : ${formulas.find((f) => f.id === d.formula)?.name ?? "à définir"}`,
    `Options : ${d.options.map((o) => quoteOptions.find((x) => x.id === o)?.label ?? o).join(", ") || "aucune"}`,
    "",
    access("Départ", d.origin, d.from.city),
    access("Arrivée", d.destination, d.to.city),
    "",
    "Inventaire :",
  ];
  for (const r of d.rooms) {
    const items = Object.entries(d.inventory[r.key] ?? {}).filter(([, n]) => n > 0);
    if (!items.length) continue;
    lines.push(`  ${r.label} : ${items.map(([id, n]) => `${roomById[r.roomId].items.find((i) => i.id === id)?.label ?? id} ×${n}`).join(", ")}`);
  }
  const specials = Object.entries(d.specials).filter(([, n]) => n > 0);
  if (specials.length) lines.push("", `Objets spécifiques (étude nécessaire) : ${specials.map(([id, n]) => `${specialItemById[id]?.label ?? id} ×${n}`).join(", ")}`);
  if (reviewReasons.length) lines.push("", "Points à vérifier :", ...reviewReasons.map((r) => `  - ${r}`));
  if (c.message) lines.push("", `Message : ${c.message}`);
  return lines.join("\n");
}
