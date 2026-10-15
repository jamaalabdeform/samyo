import { company } from "@/config/company";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata = pageMetadata({ title: "Conditions générales d'utilisation", path: routes.terms });

/**
 * CGU du site (utilisation du site et du simulateur). Ce ne sont pas des CGV :
 * les conditions de la prestation de déménagement figurent sur le devis.
 */
export default function Cgu() {
  return (
    <LegalPage title="Conditions générales d'utilisation">
      <h2>Objet</h2>
      <p>
        Les présentes conditions encadrent l&apos;utilisation du site de {company.name}. En naviguant sur le site, vous les acceptez. L&apos;éditeur du
        site est présenté dans les <a href={routes.legal}>mentions légales</a>.
      </p>
      <h2>Services proposés</h2>
      <p>
        Le site présente les prestations de déménagement et de transport de mobilier de {company.name} et permet de préparer une demande de devis :
        estimation du volume, description des accès, demande de rappel. Ces services sont gratuits et sans engagement.
      </p>
      <h2>Estimation du volume</h2>
      <p>
        Le volume calculé par le simulateur est indicatif : il repose sur les informations que vous déclarez et sur des volumes moyens par meuble. Il ne
        constitue ni un devis ni un engagement. Le devis est établi par {company.name} après vérification de votre demande, et seules les conditions qui y
        figurent engagent les parties.
      </p>
      <h2>Exactitude des informations</h2>
      <p>
        Vous vous engagez à fournir des informations exactes (coordonnées, adresses, inventaire, accès). Des informations incomplètes peuvent conduire à
        ajuster le devis.
      </p>
      <h2>Données personnelles</h2>
      <p>
        Le traitement des informations transmises est décrit dans la <a href={routes.privacy}>politique de confidentialité</a>.
      </p>
      <h2>Propriété intellectuelle</h2>
      <p>Les textes, visuels, logo et éléments graphiques du site sont protégés. Toute reproduction sans autorisation est interdite.</p>
      <h2>Responsabilité</h2>
      <p>
        {company.name} s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées et la disponibilité du site, sans pouvoir garantir
        l&apos;absence d&apos;erreur ou d&apos;interruption. Les liens vers des services tiers (WhatsApp, par exemple) relèvent de leurs propres conditions.
      </p>
      <h2>Droit applicable</h2>
      <p>Les présentes conditions sont soumises au droit français. Pour toute question : {company.email}.</p>
    </LegalPage>
  );
}
