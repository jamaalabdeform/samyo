import { MediaSlot } from "@/components/MediaSlot";
import type { MediaId } from "@/config/media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/format";

/**
 * « Sur le terrain » : photos réelles fournies par le client (plaques floutées).
 * Légendes volontairement neutres : on ne revendique ni flotte ni chiffres.
 */
const frames: Array<{ id: MediaId; label: string; caption: string; col: string; media: string }> = [
  { id: "front", label: "Partir", caption: "Un interlocuteur unique, du premier appel à la livraison.", col: "lg:col-span-5", media: "aspect-[4/5]" },
  { id: "carry", label: "Charger", caption: "Les couvertures de protection sont prêtes avant le chargement.", col: "lg:col-span-7", media: "aspect-[4/3] lg:aspect-auto lg:flex-1" },
  { id: "truck", label: "Transporter", caption: "Des moyens adaptés à votre volume et à votre déménagement.", col: "lg:col-span-12", media: "aspect-[4/3] sm:aspect-[21/9]" },
];

export function Gallery() {
  return (
    <section aria-labelledby="galerie-title" className="py-section">
      <div className="container-page">
        <SectionHeading id="galerie-title" index="07" eyebrow="Sur le terrain" title="Chaque chose à sa place." />
        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {frames.map((f, i) => (
            <Reveal as="article" key={f.id} delay={(i % 2) * 0.08} className={cn("flex flex-col", f.col)}>
              <MediaSlot id={f.id} sizes={f.col.includes("12") ? "(min-width: 1024px) 80rem, 100vw" : "(min-width: 1024px) 50vw, 100vw"} className={cn("w-full rounded-[var(--radius-lg)]", f.media)} />
              <p className="mt-4 flex gap-4 text-sm">
                <span className="eyebrow w-20 shrink-0 pt-[3px] text-marine-700">{f.label}</span>
                <span className="text-stone-600">{f.caption}</span>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
