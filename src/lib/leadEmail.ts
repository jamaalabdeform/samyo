import { company } from "@/config/company";
import { housingById, roomById, specialItemById } from "@/data/furnitureCatalog";
import { formulas, quoteOptions } from "@/data/services";
import { carryDistanceLabels, yesNoUnknownLabels, type Access, type QuoteDraft } from "@/features/quote/types";
import { formatDate, formatFloor, formatNumber1 } from "@/lib/format";

/**
 * E-mail de demande envoyé à SAMYO : c'est l'outil de travail principal en V1
 * (traitement manuel par e-mail et WhatsApp, pas de CRM).
 *
 * Envoi via l'API Resend (https://resend.com). Variables d'environnement :
 *   RESEND_API_KEY   clé API (sans elle, rien n'est envoyé)
 *   LEAD_EMAIL_TO    destinataire(s), séparés par des virgules
 *                    (par défaut : l'e-mail de company.ts)
 *   LEAD_EMAIL_FROM  expéditeur sur un domaine vérifié dans Resend
 *                    (par défaut onboarding@resend.dev, réservé aux tests :
 *                    Resend ne livre alors qu'à l'adresse du compte Resend)
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
  return (process.env.LEAD_EMAIL_TO?.trim() || company.email)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function sendLeadEmail(mail: LeadEmail) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[lead-email] RESEND_API_KEY absent : e-mail non envoyé.\nÀ : ${leadRecipients().join(", ")}\nObjet : ${mail.subject}\n\n${mail.text}`);
    }
    return false;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_EMAIL_FROM || "SAMYO devis <onboarding@resend.dev>",
      to: leadRecipients(),
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
