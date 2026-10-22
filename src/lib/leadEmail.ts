import { company } from "@/config/company";
import { housingById, roomById, specialItemById } from "@/data/furnitureCatalog";
import { formulas, quoteOptions } from "@/data/services";
import { carryDistanceLabels, yesNoUnknownLabels, type Access, type QuoteDraft } from "@/features/quote/types";
import { formatDate, formatFloor, formatNumber1 } from "@/lib/format";

/**
 * E-mails envoyés à chaque demande :
 *  - à SAMYO (LEAD_EMAIL_TO ou company.leadInbox) : outil de travail principal en V1
 *    (traitement manuel par e-mail et WhatsApp, pas de CRM) ;
 *  - au client : récapitulatif de sa demande et référence (pas de prix : le devis
 *    chiffré est établi et envoyé par SAMYO).
 *
 * Envoi via l'API Resend (https://resend.com). Variables d'environnement :
 *   RESEND_API_KEY   clé API (sans elle, rien n'est envoyé)
 *   LEAD_EMAIL_TO    destinataire(s), séparés par des virgules
 *                    (par défaut : company.leadInbox)
 *   LEAD_EMAIL_FROM  expéditeur sur un domaine VÉRIFIÉ dans Resend, ex.
 *                    "SAMYO Déménagement <devis@samyo-demenagement.com>".
 *                    Sans domaine vérifié (onboarding@resend.dev), Resend ne
 *                    livre qu'à l'adresse du compte Resend : le client ne reçoit rien.
 * En développement sans clé, l'e-mail est affiché dans la console.
 * Aperçu : /api/dev/email-preview (hors production).
 */

export interface LeadEmail {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

export function leadRecipients() {
  return (process.env.LEAD_EMAIL_TO?.trim() || company.leadInbox)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** E-mail interne à SAMYO */
export function sendLeadEmail(mail: LeadEmail) {
  return sendEmail(leadRecipients(), mail);
}

/** Envoi via l'API Resend. Renvoie false (sans erreur) si aucune clé n'est configurée. */
export async function sendEmail(to: string[], mail: LeadEmail) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn(`[email] RESEND_API_KEY absente : e-mail « ${mail.subject} » non envoyé à ${to.join(", ")}`);
    if (process.env.NODE_ENV !== "production") console.info(mail.text);
    return false;
  }
  // RESEND_API_URL : uniquement pour les tests (serveur factice)
  const res = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_EMAIL_FROM || "SAMYO Déménagement <onboarding@resend.dev>",
      to,
      reply_to: mail.replyTo || undefined,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
  return true;
}

/* ───────────────────────── Mise en forme ───────────────────────── */

/** Numéro français → format international pour wa.me (06… → 336…) */
export function toWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.startsWith("0") && digits.length === 10) return `33${digits.slice(1)}`;
  return digits;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

type Row = [label: string, value: string];
interface Section {
  title: string;
  rows: Row[];
  tone?: "alert";
}

interface Actions {
  phone: string;
  email?: string;
  firstName: string;
  reference: string;
}

function actionLinks(a: Actions) {
  const links = [
    { label: "Appeler", href: `tel:${a.phone.replace(/[^\d+]/g, "")}` },
    {
      label: "WhatsApp",
      href: `https://wa.me/${toWhatsAppNumber(a.phone)}?text=${encodeURIComponent(`Bonjour ${a.firstName}, ici ${company.name} au sujet de votre demande ${a.reference}.`)}`,
    },
  ];
  if (a.email) links.push({ label: "Répondre par e-mail", href: `mailto:${a.email}?subject=${encodeURIComponent(`Votre déménagement — ${a.reference}`)}` });
  return links;
}

function render(title: string, intro: string, actions: Actions, sections: Section[]) {
  const links = actionLinks(actions);
  const text = [
    title,
    intro,
    "",
    ...links.map((l) => `${l.label} : ${l.href}`),
    ...sections.flatMap((s) => ["", `— ${s.title.toUpperCase()} —`, ...s.rows.map(([k, v]) => `${k} : ${v}`)]),
  ].join("\n");

  const blue = "#2348C4";
  const cell = (alert: boolean) => `padding:7px ${alert ? "12px" : "0"};vertical-align:top;border-bottom:1px solid #EBEFF6`;
  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#F5F7FB;font-family:Arial,Helvetica,sans-serif;color:#101830">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F7FB;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:14px;overflow:hidden">
<tr><td style="background:${blue};color:#ffffff;padding:22px 26px">
<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:.8">${esc(company.name)} · ${esc(actions.reference)}</div>
<div style="font-size:22px;font-weight:bold;margin-top:6px">${esc(title)}</div>
<div style="font-size:15px;margin-top:6px;opacity:.9">${esc(intro)}</div>
</td></tr>
<tr><td style="padding:18px 26px 4px">
${links
  .map(
    (l, i) =>
      `<a href="${esc(l.href)}" style="display:inline-block;margin:0 8px 10px 0;padding:11px 18px;border-radius:999px;font-size:14px;font-weight:bold;text-decoration:none;${i === 0 ? `background:${blue};color:#ffffff` : `background:#F0F4FF;color:${blue}`}">${esc(l.label)}</a>`,
  )
  .join("")}
</td></tr>
${sections
  .map((s) => {
    const alert = s.tone === "alert";
    return `<tr><td style="padding:10px 26px">
<div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${alert ? "#8F5200" : "#566075"};font-weight:bold;margin:8px 0 6px">${esc(s.title)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:15px;${alert ? "background:#FFF4E0;border-radius:8px" : ""}">
${s.rows
  .map(([k, v]) =>
    k === "•"
      ? `<tr><td colspan="2" style="${cell(alert)}">• ${esc(v)}</td></tr>`
      : `<tr><td style="${cell(alert)};color:#566075;width:38%">${esc(k)}</td><td style="${cell(alert)}">${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
  )
  .join("")}
</table></td></tr>`;
  })
  .join("")}
<tr><td style="padding:18px 26px 24px;font-size:12px;color:#808A9E">Demande reçue depuis le site ${esc(company.name)}. Répondez directement à cet e-mail pour écrire au client.</td></tr>
</table></td></tr></table></body></html>`;
  return { text, html };
}

function accessRows(a: Access, fallbackCity: string): Row[] {
  const rows: Row[] = [["Adresse", [a.address, [a.postalCode, a.city || fallbackCity].filter(Boolean).join(" ")].filter(Boolean).join(", ") || fallbackCity]];
  if (a.housing) rows.push(["Logement", housingById[a.housing].label]);
  rows.push(["Étage", formatFloor(a.floor)]);
  if (a.floor && a.floor > 0) {
    rows.push(["Ascenseur", a.elevator === "oui" ? `Oui · adapté aux meubles : ${a.elevatorFits ? yesNoUnknownLabels[a.elevatorFits] : "?"}` : a.elevator === "non" ? "Non" : "?"]);
  }
  rows.push(["Portage jusqu'au camion", a.carryDistance ? carryDistanceLabels[a.carryDistance] : "?"]);
  rows.push(["Stationnement facile", a.parking ? yesNoUnknownLabels[a.parking] : "?"]);
  return rows;
}

export function quoteEmail(ref: string, d: QuoteDraft, volume: number, reviewReasons: string[]): LeadEmail {
  const c = d.contact;
  const kind = d.kind === "transport" ? "Transport d'objets" : `Déménagement${d.housing ? ` · ${housingById[d.housing].label}` : ""}`;
  const date = d.date.value ? formatDate(d.date.value, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "À convenir";

  const inventory: Row[] = [];
  for (const r of d.rooms) {
    const items = Object.entries(d.inventory[r.key] ?? {}).filter(([, n]) => n > 0);
    if (!items.length) continue;
    inventory.push([r.label, items.map(([id, n]) => `${roomById[r.roomId].items.find((i) => i.id === id)?.label ?? id} × ${n}`).join(", ")]);
  }
  const specials = Object.entries(d.specials).filter(([, n]) => n > 0);

  const sections: Section[] = [
    {
      title: "Client",
      rows: [
        ["Nom", `${c.firstName} ${c.lastName}`],
        ["Téléphone", c.phone],
        ["E-mail", c.email],
      ],
    },
    {
      title: "Projet",
      rows: [
        ["Type", kind],
        ["Trajet", `${d.from.city} → ${d.to.city}`],
        ["Date souhaitée", `${date}${d.date.flexible ? " (dates flexibles)" : ""}`],
        ["Volume estimé", `${formatNumber1(volume)} m³ (déclaratif, à vérifier)`],
        ["Formule", formulas.find((f) => f.id === d.formula)?.name ?? "Non choisie"],
        ["Options", d.options.map((o) => quoteOptions.find((x) => x.id === o)?.label ?? o).join(", ") || "Aucune"],
      ],
    },
    { title: "Départ", rows: accessRows(d.origin, d.from.city) },
    { title: "Arrivée", rows: accessRows(d.destination, d.to.city) },
  ];
  if (specials.length) {
    sections.push({ title: "Objets spécifiques — étude nécessaire", tone: "alert", rows: specials.map(([id, n]) => [specialItemById[id]?.label ?? id, `× ${n}`]) });
  }
  if (inventory.length) sections.push({ title: "Inventaire", rows: inventory });
  if (reviewReasons.length) sections.push({ title: "Points à vérifier", tone: "alert", rows: reviewReasons.map((r) => ["•", r]) });
  if (c.message) sections.push({ title: "Message du client", rows: [["Message", c.message]] });

  const title = `Demande de devis — ${d.from.city} → ${d.to.city}`;
  const intro = `${c.firstName} ${c.lastName} · ${formatNumber1(volume)} m³ · ${date}`;
  const { text, html } = render(title, intro, { phone: c.phone, email: c.email, firstName: c.firstName, reference: ref }, sections);
  return {
    subject: `Devis ${ref} — ${d.from.city} → ${d.to.city} · ${c.firstName} ${c.lastName} · ${formatNumber1(volume)} m³`,
    text,
    html,
    replyTo: c.email,
  };
}

const slotLabels: Record<string, string> = { matin: "Matin", midi: "Midi", "apres-midi": "Après-midi", soir: "Fin de journée", indifferent: "Peu importe" };

export function callbackEmail(ref: string, cb: { firstName: string; phone: string; slot: string }): LeadEmail {
  const slot = slotLabels[cb.slot] ?? cb.slot;
  const { text, html } = render(`Demande de rappel — ${cb.firstName}`, `Créneau souhaité : ${slot}`, { phone: cb.phone, firstName: cb.firstName, reference: ref }, [
    {
      title: "Client",
      rows: [
        ["Prénom", cb.firstName],
        ["Téléphone", cb.phone],
        ["Créneau", slot],
      ],
    },
  ]);
  return { subject: `Rappel ${ref} — ${cb.firstName} · ${cb.phone}`, text, html };
}

/* ───────────────────────── E-mail au client ───────────────────────── */

/**
 * Récapitulatif envoyé au client après sa demande de devis. Aucun prix : le volume
 * est indiqué comme estimation, le devis chiffré est envoyé ensuite par SAMYO.
 */
export function customerQuoteEmail(ref: string, d: QuoteDraft, volume: number): LeadEmail {
  const c = d.contact;
  const date = d.date.value ? formatDate(d.date.value, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "À convenir";
  const kind = d.kind === "transport" ? "Transport d'objets" : `Déménagement${d.housing ? ` · ${housingById[d.housing].label}` : ""}`;
  const specials = Object.entries(d.specials).filter(([, n]) => n > 0);
  const rows: Row[] = [
    ["Référence", ref],
    ["Type", kind],
    ["Trajet", `${d.from.city} → ${d.to.city}`],
    ["Date souhaitée", `${date}${d.date.flexible ? " (dates flexibles)" : ""}`],
    ["Volume estimé", `${formatNumber1(volume)} m³ (estimation à partir de votre inventaire)`],
  ];
  if (d.kind !== "transport") rows.push(["Formule", formulas.find((f) => f.id === d.formula)?.name ?? "À définir avec vous"]);
  if (d.options.length) rows.push(["Options", d.options.map((o) => quoteOptions.find((x) => x.id === o)?.label ?? o).join(", ")]);
  if (specials.length) rows.push(["Objets particuliers", specials.map(([id, n]) => `${specialItemById[id]?.label ?? id} × ${n}`).join(", ")]);

  const wa = `https://wa.me/${toWhatsAppNumber(company.whatsapp.e164)}?text=${encodeURIComponent(`Bonjour SAMYO, je viens d'envoyer ma demande de devis depuis le site. Référence : ${ref}.`)}`;
  const tel = `tel:${company.phone.e164}`;
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.samyo-demenagement.com").replace(/\/$/, "");
  const steps = [
    "Un conseiller relit votre inventaire et vos accès.",
    "Il vous contacte si un point doit être précisé.",
    "Vous recevez votre devis détaillé, poste par poste.",
  ];

  const text = [
    `Bonjour ${c.firstName},`,
    "",
    `Merci pour votre demande. Elle est bien enregistrée sous la référence ${ref}.`,
    "",
    "— VOTRE DEMANDE —",
    ...rows.map(([k, v]) => `${k} : ${v}`),
    "",
    "— LA SUITE —",
    ...steps.map((s, i) => `${i + 1}. ${s}`),
    "",
    "Le volume indiqué est une estimation : le devis définitif vous est transmis après vérification.",
    "",
    `Une question ? Répondez à cet e-mail, appelez le ${company.phone.display} ou écrivez-nous sur WhatsApp : ${wa}`,
    "",
    `${company.name} · ${company.address.street}, ${company.address.city} · ${site}`,
  ].join("\n");

  const blue = "#2348C4";
  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#F5F7FB;font-family:Arial,Helvetica,sans-serif;color:#101830">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F7FB;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden">
<tr><td style="background:${blue};padding:22px 28px;border-bottom:5px solid #93C572;color:#ffffff">
<div style="font-size:24px;font-weight:bold;letter-spacing:4px">SAMYO</div>
<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;opacity:.8;margin-top:2px">Déménagement &amp; Transport</div>
</td></tr>
<tr><td style="padding:28px 28px 8px">
<div style="font-size:22px;font-weight:bold">Merci ${esc(c.firstName)}, votre demande est bien reçue.</div>
<div style="font-size:15px;line-height:1.6;color:#566075;margin-top:10px">Référence de votre dossier : <b style="color:#101830">${esc(ref)}</b>. Voici le récapitulatif de ce que vous nous avez transmis.</div>
</td></tr>
<tr><td style="padding:12px 28px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:15px">
${rows.map(([k, v]) => `<tr><td style="padding:8px 0;border-bottom:1px solid #EBEFF6;color:#566075;width:40%;vertical-align:top">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #EBEFF6">${esc(v)}</td></tr>`).join("")}
</table></td></tr>
<tr><td style="padding:18px 28px 4px">
<div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#566075;font-weight:bold;margin-bottom:8px">La suite</div>
${steps.map((s, i) => `<div style="font-size:15px;line-height:1.6;margin:4px 0"><b style="color:${blue}">${i + 1}.</b> ${esc(s)}</div>`).join("")}
<div style="font-size:13px;line-height:1.6;color:#566075;margin-top:12px">Le volume indiqué est une estimation : le devis définitif vous est transmis après vérification.</div>
</td></tr>
<tr><td style="padding:20px 28px 8px">
<a href="${esc(wa)}" style="display:inline-block;margin:0 8px 10px 0;padding:12px 20px;border-radius:999px;background:${blue};color:#ffffff;font-size:14px;font-weight:bold;text-decoration:none">Écrire sur WhatsApp</a>
<a href="${esc(tel)}" style="display:inline-block;margin:0 8px 10px 0;padding:12px 20px;border-radius:999px;background:#F0F4FF;color:${blue};font-size:14px;font-weight:bold;text-decoration:none">Appeler le ${esc(company.phone.display)}</a>
</td></tr>
<tr><td style="padding:16px 28px 26px;font-size:12px;line-height:1.6;color:#808A9E;border-top:1px solid #EBEFF6">
Vous pouvez répondre directement à cet e-mail.<br>${esc(company.name)} · ${esc(company.address.street)}, ${esc(company.address.city)} · <a href="${esc(site)}" style="color:#808A9E">${esc(site.replace(/^https?:\/\//, ""))}</a>
</td></tr>
</table></td></tr></table></body></html>`;

  return { subject: `Votre demande de devis ${ref} — ${company.name}`, text, html, replyTo: company.email };
}
