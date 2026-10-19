"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { routes } from "@/config/site";
import { cn } from "@/lib/format";

/**
 * Consentement aux cookies de mesure d'audience (Google Analytics / GTM).
 * Le bandeau n'existe que si l'un de ces outils est configuré. La mesure
 * Vercel Analytics, sans cookie, ne demande pas de consentement.
 */
const KEY = "samyo:consent";
const OPEN_EVENT = "samyo:open-consent";
const CHANGE_EVENT = "samyo:consent-change";
export type ConsentValue = "granted" | "denied" | null;

export const consentNeeded = Boolean(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GTM_ID);

function read(): ConsentValue {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function write(v: Exclude<ConsentValue, null>) {
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* navigation privée : le choix vaut pour la session */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useConsent(): ConsentValue {
  return useSyncExternalStore(subscribe, read, () => null);
}

const noop = () => () => {};

export function ConsentBanner() {
  const consent = useConsent();
  // vrai uniquement côté navigateur (évite un bandeau rendu côté serveur)
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    if (!consentNeeded) return;
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const open = reopened || (hydrated && consent === null);

  // Le widget Jawabot couvrirait les boutons du bandeau : masqué tant que le bandeau est ouvert
  useEffect(() => {
    const on = consentNeeded && open;
    document.documentElement.classList.toggle("consent-open", on);
    return () => document.documentElement.classList.remove("consent-open");
  }, [open]);
  if (!consentNeeded || !open) return null;
  const choose = (v: "granted" | "denied") => {
    write(v);
    setReopened(false);
  };

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookies de mesure d'audience" className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:left-5 sm:max-w-md">
      <div className="rounded-[var(--radius-lg)] border-t-4 border-pistache-400 bg-paper p-6 shadow-[var(--shadow-float)]">
        <p className="font-semibold text-ink">Mesure d&apos;audience</p>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Avec votre accord, nous utilisons Google Analytics pour compter les visites et améliorer le site. Aucune publicité.{" "}
          <Link href={routes.privacy} className="text-marine-700 underline underline-offset-4">
            En savoir plus
          </Link>
        </p>
        <div className="mt-5 flex gap-3">
          <button type="button" onClick={() => choose("denied")} className={btn("secondary")}>
            Refuser
          </button>
          <button type="button" onClick={() => choose("granted")} className={btn("primary")}>
            Accepter
          </button>
        </div>
        {consent && <p className="mt-3 text-xs text-stone-600">Choix actuel : {consent === "granted" ? "accepté" : "refusé"}</p>}
      </div>
    </div>
  );
}

const btn = (v: "primary" | "secondary") =>
  cn(
    "inline-flex h-11 flex-1 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors",
    v === "primary" ? "bg-marine-700 text-paper hover:bg-marine-900" : "bg-stone-100 text-ink hover:bg-stone-200",
  );

/** Lien « Gestion des cookies » du pied de page (masqué si aucun outil n'est configuré) */
export function CookieSettingsLink({ className }: { className?: string }) {
  if (!consentNeeded) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      Gestion des cookies
    </button>
  );
}
