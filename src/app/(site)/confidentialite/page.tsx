import { company } from "@/config/company";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata = pageMetadata({ title: "Politique de confidentialité", path: "/confidentialite", noindex: company.provisional });

export default function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité">
      <p>Cette page explique ce que deviennent les informations que vous transmettez à {company.name} depuis ce site.</p>
      <h2>Données collectées</h2>
      <p>
        Lorsque vous demandez un devis ou un rappel : inventaire du déménagement, adresses et conditions d&apos;accès, date souhaitée, options, ainsi que
        vos nom, prénom, téléphone et e-mail.
      </p>
      <h2>Utilisation</h2>
      <p>
        Ces informations servent uniquement à établir votre devis, à vous recontacter à ce sujet et à organiser votre déménagement. Elles ne sont ni
        revendues, ni utilisées pour de la prospection sans votre accord.
      </p>
      <h2>Transmission</h2>
      <p>
        Votre demande est envoyée par e-mail à {company.name}. Si vous choisissez de nous écrire sur WhatsApp, l&apos;échange se déroule sur ce service,
        selon ses propres conditions.
      </p>
      <h2>Durée de conservation</h2>
      <p>Les informations sont conservées le temps nécessaire au traitement de votre demande et au suivi de votre déménagement.</p>
      <h2>Vos droits</h2>
      <p>
        Vous pouvez accéder à vos données, les rectifier ou demander leur suppression en écrivant à {company.email}. Vous pouvez également introduire une
        réclamation auprès de la CNIL.
      </p>
      <h2>Mesure d&apos;audience</h2>
      <p>Ce site n&apos;utilise pas de traceur publicitaire. Si un outil de mesure est ajouté, votre accord vous sera demandé au préalable.</p>
    </LegalPage>
  );
}
