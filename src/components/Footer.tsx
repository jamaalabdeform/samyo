import Link from "next/link";
import { CookieSettingsLink } from "./Consent";
import { company, mailHref, telHref } from "@/config/company";
import { routes, site } from "@/config/site";
import { publishedLocations } from "@/data/locations";
import { Logo } from "./Logo";
import { WhatsAppIcon, WhatsAppLink } from "./WhatsAppLink";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-[6px] border-pistache-400 bg-marine-900 text-paper">
      <div className="container-page grid gap-14 pb-10 pt-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-xs text-sm text-paper/65">{company.baseline}</p>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow text-paper/50">Contact</h2>
          <address className="mt-5 space-y-2 text-sm not-italic text-paper/85">
            <p>
              {company.address.street}
              <br />
              {[company.address.postalCode, company.address.city].filter(Boolean).join(" ")}
            </p>
            <p className="text-paper/65">{company.serviceArea.display}</p>
            <p className="pt-2">
              <a href={telHref} className="num underline-offset-4 hover:underline">
                {company.phone.display}
              </a>
              <br />
              <a href={mailHref} className="underline-offset-4 hover:underline">
                {company.email}
              </a>
            </p>
            {company.hours && <p className="pt-2 text-paper/60">{company.hours.display}</p>}
          </address>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow text-paper/50">Écrire</h2>
          <ul className="mt-5 space-y-2 text-sm text-paper/85">
            <li>
              <WhatsAppLink location="footer" className="inline-flex items-center gap-2 underline-offset-4 hover:underline">
                <WhatsAppIcon className="size-4 text-lagon-300" />
                WhatsApp
              </WhatsAppLink>
            </li>
            <li>
              <a href={mailHref} className="underline-offset-4 hover:underline">
                Par e-mail
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow text-paper/50">Demande</h2>
          <ul className="mt-5 space-y-2 text-sm text-paper/85">
            <li>
              <Link href={routes.quote} className="underline-offset-4 hover:underline">
                {site.cta.primary}
              </Link>
            </li>
            <li>
              <Link href={`${routes.quote}?rappel=1`} className="underline-offset-4 hover:underline">
                {site.cta.secondary}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page">
      <nav aria-label="Zones et services" className="border-t border-paper/10 py-6 text-sm text-paper/60">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {publishedLocations.map((l) => (
            <li key={l.slug}>
              <Link href={routes.city(l.slug)} className="hover:text-paper">
                Déménagement {l.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href={routes.furniture} className="hover:text-paper">
              Transport de meubles
            </Link>
          </li>
          <li>
            <Link href={routes.longDistance} className="hover:text-paper">
              Déménagement longue distance
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex flex-col gap-5 border-t border-paper/10 py-8 text-sm text-paper/70 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {company.name}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { href: routes.about, label: "Qui sommes-nous" },
            { href: routes.contact, label: "Contact" },
            { href: "/#questions", label: "FAQ" },
            { href: routes.legal, label: "Mentions légales" },
            { href: routes.terms, label: "CGU" },
            { href: routes.privacy, label: "Confidentialité" },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:text-paper hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <CookieSettingsLink className="underline-offset-4 hover:text-paper hover:underline" />
          </li>
        </ul>
      </div>
      </div>
    </footer>
  );
}
