import { trackStudioEvent } from "@/lib/analytics";

export const INQUIRY_SELECT_EVENT = "rejubliss:select-inquiry-service";
export const INQUIRY_MODAL_OPEN_EVENT = "rejubliss:open-inquiry-modal";

export interface InquirySelectDetail {
  service?: string;
  contextNote?: string;
  scrollOnly?: boolean;
}

export function triggerProjectInquiry(detail?: InquirySelectDetail) {
  if (typeof window === "undefined") return;

  trackStudioEvent("inquiry_cta_clicked", {
    service: detail?.service || "General Studio Inquiry",
    source_path: window.location.pathname,
  });

  if (detail) {
    window.dispatchEvent(
      new CustomEvent<InquirySelectDetail>(INQUIRY_SELECT_EVENT, { detail })
    );
  }

  if (detail?.scrollOnly) {
    const target = document.getElementById("contact");
    if (target) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      return;
    }
  }

  window.dispatchEvent(
    new CustomEvent<InquirySelectDetail>(INQUIRY_MODAL_OPEN_EVENT, {
      detail: detail || {},
    })
  );
}
