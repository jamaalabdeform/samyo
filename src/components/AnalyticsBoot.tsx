"use client";

import Script from "next/script";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { captureAttribution } from "@/lib/analytics";
import { ConsentBanner, useConsent } from "@/components/Consent";

/**
 * Mesure d'audience :
 * - Vercel Web Analytics : toujours actif, sans cookie (à activer dans Vercel → Analytics) ;
 * - Google Analytics 4 (NEXT_PUBLIC_GA_ID) et/ou GTM (NEXT_PUBLIC_GTM_ID) :
 *   chargés uniquement après acceptation du bandeau de consentement.
 * Capture aussi l'attribution marketing (UTM, gclid…) jointe aux demandes.
 */
export function AnalyticsBoot() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const consent = useConsent();
  useEffect(() => captureAttribution(), []);

  return (
    <>
      <Analytics />
      <ConsentBanner />
      {consent === "granted" && ga && (
        <>
          <Script id="ga4-src" src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {consent === "granted" && gtm && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
        </Script>
      )}
    </>
  );
}
