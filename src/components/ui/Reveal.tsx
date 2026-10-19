"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Apparition douce au scroll — une seule fois, faible amplitude.
 *
 * Le contenu est rendu VISIBLE côté serveur : il s'affiche immédiatement, même
 * avant le chargement du JavaScript (meilleur LCP sur mobile). Une fois le
 * script chargé, seuls les éléments encore sous la ligne de flottaison sont
 * masqués puis révélés quand ils entrent à l'écran. Rien n'est animé si
 * l'utilisateur préfère réduire les animations.
 */
export function Reveal({
  delay = 0,
  as = "div",
  className,
  style,
  children,
}: {
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // déjà visible au chargement : on n'y touche pas (pas de clignotement)
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.dataset.reveal = "hidden";
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.reveal = "shown";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // même rendu quel que soit l'élément (div, li, section, article)
  const Tag = as as "div";
  return (
    <Tag ref={ref} className={className} style={delay ? ({ ...style, "--reveal-delay": `${delay}s` } as CSSProperties) : style}>
      {children}
    </Tag>
  );
}
