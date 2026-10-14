import Script from "next/script";

/**
 * Widget de discussion Jawabot (assistant de SAMYO).
 * Clé publique du widget, remplaçable via NEXT_PUBLIC_JAWABOT_WIDGET_KEY ;
 * mettre la variable à "off" pour le désactiver sans toucher au code.
 * Chargé après l'affichage de la page pour ne pas ralentir le site.
 */
const key = process.env.NEXT_PUBLIC_JAWABOT_WIDGET_KEY?.trim() || "jwbw_c6pjsxmzmupg9nwdpdcyqzdr";

export function JawabotWidget() {
  if (key === "off") return null;
  return <Script id="jawabot-widget" src="https://jawabot.stipway.com/widget.js" data-key={key} strategy="afterInteractive" />;
}
