"use client";

import Script from "next/script";

/**
 * Optional, zero-LCP-impact Google Analytics 4 integration.
 * Renders nothing unless `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured,
 * and loads with `strategy="lazyOnload"` so Core Web Vitals remain unaffected.
 */
export function AnalyticsTracker() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
        strategy="lazyOnload"
      />
      <Script id="rejubliss-ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(gaId)}, {
            anonymize_ip: true,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
