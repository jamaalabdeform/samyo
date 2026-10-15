import { addressLine, company } from "@/config/company";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { MediaSlot } from "@/components/MediaSlot";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon, WhatsAppLink } from "@/components/WhatsAppLink";

export const metadata = pageMetadata({
  title: "Qui sommes-nous",
  description: `${company.name}, déménageur basé à Montreuil : déménagement et transport de meubles en Île-de-France et partout en France, avec un interlocuteur unique.`,
  path: routes.about,
});

/** Contenu volontairement factuel : aucune date de création, chiffre ou label non fourni par le client. */
const values = [
  { title: "Un interlocuteur unique", text: "La personne qui étudie votre demande est celle qui vous accompagne jusqu'au jour J. Pas de standard, pas de dossier qui passe de main en main." },
  { title: "Un devis construit sur du concret", text: "Votre inventaire, vos accès, vos contraintes : le devis s'appuie sur ce que vous déménagez réellement, et chaque poste est expliqué." },
  { title: "Du soin à chaque étape", text: "Couvertures, housses, calage dans le camion : le mobilier est protégé du chargement à la livraison." },
];

export default function QuiSommesNous() {
  return (
    <div className="pb-section pt-[calc(var(--header-h)+4rem)]">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow flex items-center gap-3 text-stone-600">
            <span aria-hidden className="h-1 w-10 rounded-full bg-pistache-400" />
            Qui sommes-nous
          </p>
          <h1 className="font-display mt-6 text-5xl text-ink">
            Un déménageur de proximité, <em className="text-marine-700">basé à Montreuil.</em>
          </h1>
          <div className="mt-8 max-w-[34rem] space-y-5 text-lg text-stone-600">
            <p>
              {company.name} est une entreprise de déménagement et de transport de mobilier dirigée par {company.contactPerson.firstName}{" "}
              {company.contactPerson.lastName}. Nous intervenons principalement en Île-de-France, depuis Montreuil, et réalisons aussi des déménagements
              partout en France.
            </p>
            <p>
              Studio, appartement familial, maison ou bureaux, simple canapé à livrer : chaque demande est étudiée à partir de votre inventaire et de vos
              accès, pour un devis clair et sans surprise le jour du déménagement.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={routes.quote} arrow>
              Estimer mon déménagement
            </ButtonLink>
            <ButtonLink href={routes.contact} variant="secondary">
              Nous contacter
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
          <MediaSlot id="front" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] rounded-[var(--radius-lg)]" />
        </Reveal>
      </div>

      <div className="container-page mt-24">
        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] bg-ink/8 shadow-[var(--shadow-hairline)] md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 0.06} className="border-t-4 border-pistache-400 bg-paper p-8">
              <h2 className="text-lg font-semibold text-ink">{v.title}</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone-600">{v.text}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-stone-600">
          <span>{addressLine}</span>
          <a href={`tel:${company.phone.e164}`} className="num font-medium text-ink hover:text-marine-700">
            {company.phone.display}
          </a>
          <WhatsAppLink location="about" className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-marine-700">
            <WhatsAppIcon />
            WhatsApp
          </WhatsAppLink>
        </p>
      </div>
    </div>
  );
}
