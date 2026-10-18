import Link from "next/link";
import { Check } from "lucide-react";
import { company } from "@/config/company";
import { routes, site } from "@/config/site";
import { publishedLocations } from "@/data/locations";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MediaSlot } from "@/components/MediaSlot";
import type { MediaId } from "@/config/media";
import { WhatsAppIcon, WhatsAppLink } from "@/components/WhatsAppLink";
import type { WhatsAppContext } from "@/lib/whatsapp";
import { breadcrumbJsonLd } from "@/lib/seo";
import { HowItWorks } from "@/sections/HowItWorks";
import { FinalCta } from "@/sections/FinalCta";

export interface ServicePageContent {
  path: string;
  name: string;
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  cta: { label: string; href: string };
  whatsapp: WhatsAppContext;
  media: MediaId;
  examplesTitle: string;
  examples: string[];
  stepsTitle: string;
  steps: Array<{ title: string; text: string }>;
  faq: Array<{ q: string; a: string }>;
}

/** Page service SEO : contenu factuel, CTA vers le calculateur avec le bon parcours. */
export function ServicePage({ c }: { c: ServicePageContent }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: c.name,
          serviceType: c.name,
          description: c.intro,
          provider: { "@id": `${site.url}/#organization` },
          areaServed: [
            { "@type": "AdministrativeArea", name: "Île-de-France" },
            { "@type": "Country", name: "France" },
          ],
          url: `${site.url}${c.path}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: c.name, path: c.path }])} />

      <section className="pt-[var(--header-h)]">
        <div className="container-page grid gap-12 pb-20 pt-12 md:pt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <nav aria-label="Fil d'Ariane" className="text-xs text-stone-600">
              <ol className="flex gap-2">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page">{c.name}</li>
              </ol>
            </nav>
            <p className="eyebrow mt-8 flex items-center gap-3 text-stone-600">
              <span aria-hidden className="h-1 w-10 rounded-full bg-pistache-400" />
              {c.eyebrow}
            </p>
            <h1 className="font-display mt-6 text-5xl text-ink">{c.title}</h1>
            <p className="mt-7 max-w-xl text-lg text-stone-600">{c.intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={c.cta.href} arrow>
                {c.cta.label}
              </ButtonLink>
              <WhatsAppLink
                context={c.whatsapp}
                location={`service-${c.path}`}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-paper px-5 text-sm font-medium text-ink shadow-[var(--shadow-hairline)] hover:text-marine-700"
              >
                <WhatsAppIcon />
                WhatsApp
              </WhatsAppLink>
            </div>
            <p className="mt-6 text-sm text-stone-600">
              Ou par téléphone :{" "}
              <a href={`tel:${company.phone.e164}`} className="num font-medium text-ink hover:text-marine-700">
                {company.phone.display}
              </a>
            </p>
          </div>
          <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
            <MediaSlot id={c.media} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] rounded-[var(--radius-lg)]" />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="exemples" className="bg-paper py-section">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <h2 id="exemples" className="font-display text-4xl lg:col-span-5">
            {c.examplesTitle}
          </h2>
          <ul className="space-y-5 lg:col-span-6 lg:col-start-7">
            {c.examples.map((e) => (
              <li key={e} className="flex gap-4 text-[1.0625rem]">
                <Check className="mt-1 size-5 shrink-0 text-pistache-700" strokeWidth={2} aria-hidden />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="etapes" className="py-section">
        <div className="container-page">
          <h2 id="etapes" className="font-display max-w-2xl text-4xl">
            {c.stepsTitle}
          </h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-lg)] bg-ink/8 shadow-[var(--shadow-hairline)] md:grid-cols-3">
            {c.steps.map((s, i) => (
              <li key={s.title} className="border-t-4 border-pistache-400 bg-paper p-8">
                <span className="font-display num text-3xl text-marine-700">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="faq-service" className="bg-paper py-section">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <h2 id="faq-service" className="font-display text-4xl lg:col-span-5">
            Questions fréquentes
          </h2>
          <dl className="space-y-8 lg:col-span-6 lg:col-start-7">
            {c.faq.map((f) => (
              <div key={f.q}>
                <dt className="text-lg font-semibold text-ink">{f.q}</dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-stone-600">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="container-page mt-16">
          <p className="eyebrow text-stone-600">Nos villes en Île-de-France</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {publishedLocations.map((l) => (
              <li key={l.slug}>
                <Link href={routes.city(l.slug)} className="inline-flex rounded-full bg-ivory px-4 py-2 text-sm text-ink hover:text-marine-700">
                  Déménagement {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HowItWorks />
      <FinalCta />
    </>
  );
}
