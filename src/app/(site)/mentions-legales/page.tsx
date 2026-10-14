import { addressLine, company } from "@/config/company";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata = pageMetadata({ title: "Mentions légales", path: "/mentions-legales", noindex: company.provisional });

/** Les champs non confirmés (null dans company.ts) ne sont pas affichés. */
export default function MentionsLegales() {
  const l = company.legal;
  const ids = [
    l.legalName && l.legalForm ? `${l.legalName} — ${l.legalForm}` : l.legalName,
    l.siret ? `SIRET : ${l.siret}` : l.siren && `SIREN : ${l.siren}`,
    l.ape && `Code APE : ${l.ape}`,
    l.rcs && `RCS : ${l.rcs}`,
    l.vat && `TVA intracommunautaire : ${l.vat}`,
    l.transportRegistry,
  ].filter(Boolean);
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        {company.name}
        <br />
        {addressLine}
        <br />
        Téléphone : {company.phone.display} · E-mail : {company.email}
        {ids.map((line) => (
          <span key={line as string}>
            <br />
            {line}
          </span>
        ))}
      </p>
      <h2>Directeur de la publication</h2>
      <p>{l.publisher}</p>
      <h2>Hébergement</h2>
      <p>{l.host}</p>
      {l.insurance && (
        <>
          <h2>Assurance</h2>
          <p>{l.insurance}</p>
        </>
      )}
      <h2>Propriété intellectuelle</h2>
      <p>L&apos;ensemble des contenus de ce site (textes, visuels, logo) est protégé. Toute reproduction sans autorisation est interdite.</p>
    </LegalPage>
  );
}
