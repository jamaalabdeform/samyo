import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/config/company";
import { routes } from "@/config/site";
import { publishedLocations } from "@/data/locations";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Zones d'intervention : maillage interne vers les pages villes et services (SEO local). */
export function Zones() {
  return (
    <section id="zones" aria-labelledby="zones-title" className="py-section">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="zones-title" index="08" eyebrow="Zones d'intervention" title="Depuis Montreuil, partout où vous allez." />
          <p className="mt-6 max-w-md text-lg text-stone-600">{company.serviceArea.display}.</p>
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7">
          <ul className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] bg-ink/8 shadow-[var(--shadow-hairline)] sm:grid-cols-2">
            {publishedLocations.map((l) => (
              <li key={l.slug}>
                <Link href={routes.city(l.slug)} className="group flex items-center justify-between gap-4 bg-paper px-6 py-5 transition-colors hover:bg-marine-50">
                  <span>
                    <span className="block font-semibold text-ink">Déménagement {l.name}</span>
                    <span className="text-sm text-stone-600">{l.department}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-marine-700 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} aria-hidden />
                </Link>
              </li>
            ))}
            <li className="sm:col-span-2">
              <Link href={routes.longDistance} className="group flex items-center justify-between gap-4 border-t-4 border-pistache-400 bg-paper px-6 py-5 transition-colors hover:bg-marine-50">
                <span>
                  <span className="block font-semibold text-ink">Déménagement longue distance</span>
                  <span className="text-sm text-stone-600">De l&apos;Île-de-France vers toute la France</span>
                </span>
                <ArrowUpRight className="size-4 text-marine-700" strokeWidth={1.8} aria-hidden />
              </Link>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
