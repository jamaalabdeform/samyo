import { Mail, MapPin, Phone, PhoneCall } from "lucide-react";
import { addressLine, company, mailHref, telHref } from "@/config/company";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon, WhatsAppLink } from "@/components/WhatsAppLink";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contactez ${company.name} : téléphone ${company.phone.display}, WhatsApp, e-mail. Déménagement et transport de meubles en Île-de-France et partout en France.`,
  path: routes.contact,
});

const card = "flex flex-col rounded-[var(--radius-lg)] border-t-4 border-pistache-400 bg-paper p-7 shadow-[var(--shadow-hairline)] transition-shadow hover:shadow-[var(--shadow-lift)]";
const icon = "size-5 text-marine-700";

export default function Contact() {
  return (
    <div className="container-page pb-section pt-[calc(var(--header-h)+4rem)]">
      <Reveal className="max-w-3xl">
        <p className="eyebrow flex items-center gap-3 text-stone-600">
          <span aria-hidden className="h-1 w-10 rounded-full bg-pistache-400" />
          Contact
        </p>
        <h1 className="font-display mt-6 text-5xl text-ink">Parlons de votre déménagement.</h1>
        <p className="mt-6 max-w-[34rem] text-lg text-stone-600">
          Par téléphone, sur WhatsApp ou par e-mail : choisissez ce qui vous arrange. Pour un devis, le plus rapide reste d&apos;estimer votre volume en
          ligne.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <a href={telHref} className={card}>
            <Phone className={icon} strokeWidth={1.6} aria-hidden />
            <span className="mt-6 text-sm text-stone-600">Téléphone</span>
            <span className="num mt-1 text-lg font-semibold text-ink">{company.phone.display}</span>
          </a>
        </Reveal>
        <Reveal delay={0.05}>
          <WhatsAppLink location="contact-page" className={card}>
            <WhatsAppIcon className={icon} />
            <span className="mt-6 text-sm text-stone-600">WhatsApp</span>
            <span className="mt-1 text-lg font-semibold text-ink">Écrire un message</span>
          </WhatsAppLink>
        </Reveal>
        <Reveal delay={0.1}>
          <a href={mailHref} className={card}>
            <Mail className={icon} strokeWidth={1.6} aria-hidden />
            <span className="mt-6 text-sm text-stone-600">E-mail</span>
            <span className="mt-1 text-[0.9375rem] font-semibold text-ink [overflow-wrap:anywhere]">{company.email.replace("@", "@\u200b")}</span>
          </a>
        </Reveal>
        <Reveal delay={0.15}>
          <div className={card}>
            <MapPin className={icon} strokeWidth={1.6} aria-hidden />
            <span className="mt-6 text-sm text-stone-600">Adresse</span>
            <span className="mt-1 text-lg font-semibold text-ink">{addressLine}</span>
            <span className="mt-2 text-sm text-stone-600">{company.serviceArea.display}</span>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-14 flex flex-col gap-6 rounded-[var(--radius-lg)] bg-marine-700 p-8 text-paper sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div>
          <p className="font-display text-2xl">Vous préférez être rappelé ?</p>
          <p className="mt-2 text-paper/75">Laissez votre numéro et le créneau qui vous convient.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`${routes.quote}?rappel=1`} variant="inverse">
            <PhoneCall className="size-4" strokeWidth={1.8} aria-hidden />
            Être rappelé
          </ButtonLink>
          <ButtonLink href={routes.quote} variant="inverse-ghost" arrow>
            Estimer mon déménagement
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
