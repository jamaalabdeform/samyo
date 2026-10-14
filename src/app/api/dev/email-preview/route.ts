import { NextResponse } from "next/server";
import { emptyDraft } from "@/features/quote/types";
import { totalVolume } from "@/features/inventory/volume";
import { callbackEmail, quoteEmail } from "@/lib/leadEmail";

/**
 * Aperçu de l'e-mail de demande (développement / staging uniquement).
 * /api/dev/email-preview            → devis d'exemple (HTML)
 * /api/dev/email-preview?kind=callback
 * /api/dev/email-preview?format=text
 * Désactivé en production, sauf si ENABLE_EMAIL_PREVIEW=1.
 */
export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production" && process.env.ENABLE_EMAIL_PREVIEW !== "1") {
    return new NextResponse("Not found", { status: 404 });
  }
  const url = new URL(req.url);
  let mail;
  if (url.searchParams.get("kind") === "callback") {
    mail = callbackEmail("SM-EXEMPLE", { firstName: "Camille", phone: "06 12 34 56 78", slot: "soir" });
  } else {
    const d = emptyDraft();
    d.from.city = "Montreuil";
    d.to.city = "Lyon";
    d.housing = "t3";
    d.rooms = [
      { key: "salon-1", roomId: "salon", label: "Salon" },
      { key: "chambre-1", roomId: "chambre", label: "Chambre" },
    ];
    d.inventory = { "salon-1": { "canape-3": 1, "table-basse": 1, cartons: 12 }, "chambre-1": { "lit-2": 1, "armoire-3": 1, cartons: 8 } };
    d.specials = { "piano-droit": 1 };
    d.origin = { ...d.origin, address: "Adresse d'exemple", city: "Montreuil", floor: 3, elevator: "oui", elevatorFits: "nsp", carryDistance: "10-30", parking: "non" };
    d.destination = { ...d.destination, city: "Lyon", floor: 1, elevator: "non", carryDistance: "lt10", parking: "oui" };
    d.date = { value: "2026-11-21", flexible: true };
    d.options = ["demontage", "remontage"];
    d.contact = { firstName: "Camille", lastName: "Exemple", phone: "06 12 34 56 78", email: "camille@example.com", message: "Accès par la cour.", consent: true };
    mail = quoteEmail("SM-EXEMPLE", d, totalVolume(d), ["Stationnement à vérifier (départ)"]);
  }
  if (url.searchParams.get("format") === "text") return new NextResponse(`Objet : ${mail.subject}\n\n${mail.text}`, { headers: { "content-type": "text/plain; charset=utf-8" } });
  return new NextResponse(mail.html, { headers: { "content-type": "text/html; charset=utf-8" } });
}
