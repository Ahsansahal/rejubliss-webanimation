export type StudioAnalyticsEvent =
  | "inquiry_cta_clicked"
  | "project_inquiry_submitted"
  | "newsletter_subscribed"
  | "showreel_opened"
  | "case_study_shared";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetOrEvent: string | Date,
      params?: EventParams
    ) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Lightweight, zero-dependency analytics event helper.
 * Safely forwards conversion & engagement events to Google Analytics 4 (`gtag`)
 * and Google Tag Manager (`dataLayer`) when configured via environment variables.
 */
export function trackStudioEvent(
  eventName: StudioAnalyticsEvent,
  params?: EventParams
): void {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        ...params,
      });
    }
  } catch {
    // Analytics must never interrupt user flows
  }
}
