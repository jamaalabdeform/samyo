import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { addressLine, company } from "@/config/company";
import { routes, site } from "@/config/site";
import { locationBySlug, publishedLocations } from "@/data/locations";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RouteForm } from "@/features/quote/RouteForm";
import { breadcrumbJsonLd, organizationJsonLd, pageMetadata } from "@/lib/seo";
import { HowItWorks } from "@/sections/HowItWorks";
import { FinalCta } from "@/sections/FinalCta";

/**
 * Page locale SEO — servie à l'URL /demenagement-{ville} (rewrite dans next.config.ts).
 * Seules les villes `published` avec un contenu spécifique sont générées :
 * pas de pages dupliquées à faible valeur.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedLocations.map((l) => ({ ville: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const loc = locationBySlug(ville);
  if (!loc) return {};
  return pageMetadata({
    title: `Déménagement ${loc.name} (${loc.postalCode}) · déménageur`,
    description: `Déménageur à ${loc.name} (${loc.department}) basé à Montreuil : estimation du volume en ligne, accès et stationnement anticipés, devis clair vérifié par un conseiller. Transport de meubles et déménagement vers toute la France.`,
    path: routes.city(loc.slug),
  });
}

export default async function CityPage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const loc = locationBySlug(ville);
  if (!loc?.content || !loc.published) notFound();
  const c = loc.content;

  return (
    <>
      <JsonLd data={{ ...organizationJsonLd(), "@id": `${site.url}${routes.city(loc.slug)}#business`, areaServed: { "@type": "City", name: loc.name } }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: `Déménagement à ${loc.name}`, path: routes.city(loc.slug) }])} />

      <section className="pt-[var(--header-h)]">
        <div className="container-page grid gap-12 pb-20 pt-12 md:pt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <nav aria-label="Fil d'Ariane" className="text-xs text-stone-600">
              <ol className="flex gap-2">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page">Déménagement à {loc.name}</li>
              </ol>
            </nav>
            <h1 className="font-display mt-8 text-5xl">
              Déménager à {loc.name}, <em className="text-marine-700">sans improviser.</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-stone-600">{c.intro}</p>
            <RouteForm className="mt-10 max-w-[36rem]" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-[var(--radius-lg)] bg-paper p-8 shadow-[var(--shadow-hairline)]">
              <p className="eyebrow text-stone-600">Secteurs desservis</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c.neighbourhoods.map((n) => (
                  <li key={n} className="rounded-full bg-stone-100 px-3 py-1.5 text-sm">
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-stone-600">
                {company.name} · {addressLine}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="acces-title" className="bg-paper py-section">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <h2 id="acces-title" className="font-display text-4xl lg:col-span-5">
            Les accès à {loc.name}, anticipés dès le devis.
          </h2>
          <div className="lg:col-span-6 lg:col-start-7">
            <ul className="space-y-5">
              {c.access.map((a) => (
                <li key={a} className="flex gap-4 text-[1.0625rem]">
                  <Check className="mt-1 size-5 shrink-0 text-marine-500" strokeWidth={1.8} aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-[var(--radius-md)] border-l-4 border-pistache-400 bg-ivory p-6">
              <h3 className="font-semibold text-ink">Stationnement du camion</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone-600">{c.parking}</p>
            </div>
            <p className="mt-8 text-sm text-stone-600">{c.note}</p>
            <ButtonLink href={routes.quote + `?de=${encodeURIComponent(loc.name)}`} className="mt-10" arrow>
              {site.cta.primary}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-locale" className="py-section">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <h2 id="faq-locale" className="font-display text-4xl lg:col-span-5">
            Déménager à {loc.name} : vos questions.
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
          <p className="eyebrow text-stone-600">Nous intervenons aussi à</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {publishedLocations
              .filter((l) => l.slug !== loc.slug)
              .map((l) => (
                <li key={l.slug}>
                  <Link href={routes.city(l.slug)} className="inline-flex rounded-full bg-paper px-4 py-2 text-sm text-ink shadow-[var(--shadow-hairline)] hover:text-marine-700">
                    Déménagement {l.name}
                  </Link>
                </li>
              ))}
            <li>
              <Link href={routes.longDistance} className="inline-flex rounded-full bg-paper px-4 py-2 text-sm text-ink shadow-[var(--shadow-hairline)] hover:text-marine-700">
                Déménagement vers toute la France
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <HowItWorks />
      <FinalCta />
    </>
  );
}
