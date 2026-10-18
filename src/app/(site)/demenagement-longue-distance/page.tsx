import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";

export const metadata = pageMetadata({
  title: "Déménagement longue distance depuis l'Île-de-France",
  description:
    "Déménagement de Paris et de l'Île-de-France vers toute la France (et l'inverse) : inventaire en ligne, devis vérifié, un seul interlocuteur du chargement à la livraison.",
  path: routes.longDistance,
});

export default function LongueDistance() {
  return (
    <ServicePage
      c={{
        path: routes.longDistance,
        name: "Déménagement longue distance",
        eyebrow: "Partout en France",
        title: (
          <>
            De l&apos;Île-de-France <em className="text-marine-700">à toute la France.</em>
          </>
        ),
        intro:
          "Mutation, retour en région, nouvelle vie au soleil : SAMYO organise votre déménagement depuis Paris et l'Île-de-France vers toute la France, ou d'une région vers l'Île-de-France, avec un seul interlocuteur du devis à la livraison.",
        cta: { label: "Estimer mon déménagement", href: routes.quote },
        whatsapp: "estimate",
        media: "truck",
        examplesTitle: "Ce qui change sur un long trajet.",
        examples: [
          "Un inventaire précis : le volume détermine le véhicule et l'organisation du trajet.",
          "Un chargement calé et sanglé pour plusieurs heures de route.",
          "Des accès vérifiés aux deux adresses : étages, ascenseurs, stationnement au départ et à l'arrivée.",
          "Une date de livraison convenue avec vous dès le devis.",
          "Un interlocuteur joignable pendant tout le trajet.",
        ],
        stepsTitle: "Votre déménagement longue distance, étape par étape.",
        steps: [
          { title: "Inventaire en ligne", text: "Pièce par pièce, le volume se calcule pendant que vous avancez. Indiquez les deux adresses et leurs accès." },
          { title: "Devis vérifié", text: "Un conseiller relit votre demande, précise avec vous les points sensibles et vous adresse un devis détaillé." },
          { title: "Chargement, route, livraison", text: "Protection du mobilier, chargement calé, livraison et mise en place dans les pièces indiquées." },
        ],
        faq: [
          {
            q: "Vous déménagez vers toutes les régions ?",
            a: "Oui, nous intervenons partout en France au départ ou à destination de l'Île-de-France, ainsi que d'une région à l'autre. Indiquez vos villes dans le calculateur.",
          },
          {
            q: "Combien de temps à l'avance réserver un déménagement longue distance ?",
            a: "Le plus tôt possible, surtout en fin de mois et en été. Si vos dates sont souples, indiquez-le : cela aide à trouver le meilleur créneau.",
          },
          {
            q: "Comment est calculé le prix d'un déménagement longue distance ?",
            a: "Principalement selon le volume, la distance, les accès aux deux adresses, la formule et les options choisies. C'est pourquoi le devis est établi après vérification de votre inventaire.",
          },
        ],
      }}
    />
  );
}
