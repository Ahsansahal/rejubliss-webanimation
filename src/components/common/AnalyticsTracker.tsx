"use client";

import Script from "next/script";

const GTM_CONTAINER_IDS = ["GTM-5W9FRRJR", "GTM-WXPQB7DN"] as const;

/**
 * Google Tag Manager (`GTM-5W9FRRJR`, `GTM-WXPQB7DN`), `gtag` dataLayer bootstrap,
 * and optional direct GA4 measurement support (`NEXT_PUBLIC_GA_MEASUREMENT_ID`).
 */
export function AnalyticsNoscript() {
  return (
    <>
      {GTM_CONTAINER_IDS.map((id) => (
        <noscript key={id}>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${id}`}
            height="0"
            width="0"
            title={`Google Tag Manager ${id}`}
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      ))}
    </>
  );
}

export function AnalyticsTracker() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  return (
    <>
      <Script id="rejubliss-gtm-datalayer-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
        `}
      </Script>

      {GTM_CONTAINER_IDS.map((id) => (
        <Script
          key={id}
          id={`rejubliss-gtm-${id.toLowerCase()}`}
          src={`https://www.googletagmanager.com/gtm.js?id=${id}`}
          strategy="afterInteractive"
        />
      ))}

      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
            strategy="lazyOnload"
          />
          <Script id="rejubliss-ga4-config" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('config', ${JSON.stringify(gaId)}, {
                anonymize_ip: true,
                send_page_view: true
              });
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
