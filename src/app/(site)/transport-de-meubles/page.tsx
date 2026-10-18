import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ServicePage } from "@/components/ServicePage";

export const metadata = pageMetadata({
  title: "Transport de meubles à Paris et en Île-de-France",
  description:
    "Transport de meubles depuis Montreuil : canapé, armoire, électroménager, meuble acheté d'occasion. Paris, Île-de-France et toute la France. Demande en ligne en quelques minutes.",
  path: routes.furniture,
});

export default function TransportDeMeubles() {
  return (
    <ServicePage
      c={{
        path: routes.furniture,
        name: "Transport de meubles",
        eyebrow: "Transport de meubles",
        title: (
          <>
            Quelques meubles à déplacer ? <em className="text-marine-700">Pas besoin d&apos;un déménagement complet.</em>
          </>
        ),
        intro:
          "Un canapé acheté d'occasion, une armoire à livrer, un frigo à monter au 4e : SAMYO transporte vos meubles en Île-de-France et partout en France, avec le même soin qu'un déménagement.",
        cta: { label: "Décrire mon transport", href: `${routes.quote}?besoin=transport` },
        whatsapp: "transport",
        media: "carry",
        examplesTitle: "Ce que nous transportons le plus souvent.",
        examples: [
          "Un canapé ou un fauteuil acheté sur une plateforme d'occasion, de l'adresse du vendeur jusque chez vous.",
          "Une armoire, une commode, un lit ou un buffet entre deux logements.",
          "De l'électroménager : réfrigérateur, lave-linge, cuisinière.",
          "Quelques cartons et meubles pour un étudiant, une colocation ou un départ en résidence.",
          "Du mobilier de bureau ou de boutique, sur un créneau qui gêne le moins votre activité.",
        ],
        stepsTitle: "Un transport organisé en trois étapes.",
        steps: [
          { title: "Décrivez les objets", text: "Adresse d'enlèvement, adresse de livraison, objets à transporter, étages et accès : quelques minutes en ligne." },
          { title: "Recevez la proposition", text: "Un conseiller vérifie votre demande et vous rappelle si un point mérite d'être précisé." },
          { title: "On s'occupe du reste", text: "Protection sous couvertures, sanglage dans le camion, livraison dans la pièce indiquée." },
        ],
        faq: [
          {
            q: "Vous transportez un seul meuble ?",
            a: "Oui. Le parcours « transport d'objets » du calculateur est fait pour ça : un seul canapé, une armoire ou quelques objets, sans inventaire complet de logement.",
          },
          {
            q: "Pouvez-vous récupérer un meuble chez un particulier ?",
            a: "Oui : indiquez l'adresse du vendeur comme adresse de départ. Pensez à vérifier avec lui l'étage, l'ascenseur et les dimensions du meuble.",
          },
          {
            q: "Les meubles sont-ils protégés pendant le transport ?",
            a: "Oui : couvertures et housses, sanglage dans le camion, et démontage si nécessaire pour les grands meubles.",
          },
        ],
      }}
    />
  );
}
