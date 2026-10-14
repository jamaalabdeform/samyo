"use client";

import type { ComponentProps, ReactNode } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/format";
import { whatsappHref, type WhatsAppContext, type WhatsAppOptions } from "@/lib/whatsapp";

/** Logo WhatsApp simplifié, au trait, pour rester dans le registre d'icônes du site */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-4", className)} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M4.2 19.8l1.1-3.9A8.2 8.2 0 1 1 8.4 19l-4.2.8Z" />
      <path
        d="M9.2 8.6c.2-.4.5-.5.8-.5h.4c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .5-.1.6l-.4.5c-.1.1-.1.3 0 .5.5.9 1.2 1.6 2.1 2.1.2.1.4.1.5 0l.5-.5c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.4c0 .3-.2.6-.5.8-.6.4-1.4.5-2.1.3-2.1-.7-3.8-2.3-4.6-4.4-.3-.7-.2-1.5.3-2.2Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

/**
 * Lien WhatsApp contextualisé (ouvre wa.me dans un nouvel onglet).
 * Tous les points d'entrée du site passent par ce composant.
 */
export function WhatsAppLink({
  context = "general",
  reference,
  detail,
  location,
  children,
  className,
  ...props
}: {
  context?: WhatsAppContext;
  location: string;
  children: ReactNode;
} & WhatsAppOptions &
  Omit<ComponentProps<"a">, "href" | "children">) {
  return (
    <a
      href={whatsappHref(context, { reference, detail })}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location, context })}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
