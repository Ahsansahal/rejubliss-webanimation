import { trackStudioEvent } from "@/lib/analytics";

export const INQUIRY_SELECT_EVENT = "rejubliss:select-inquiry-service";

export interface InquirySelectDetail {
  service?: string;
  contextNote?: string;
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

  const target = document.getElementById("contact");
  if (target) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  } else {
    const dest = new URL("/", window.location.origin);
    if (detail?.service) dest.searchParams.set("service", detail.service);
    if (detail?.contextNote) dest.searchParams.set("brief", detail.contextNote);
    dest.hash = "contact";
    window.location.assign(dest.href);
  }
}
