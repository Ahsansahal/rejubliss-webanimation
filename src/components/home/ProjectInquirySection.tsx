"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileUp,
  Loader2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { STUDIO_FAQS } from "@/data/homepage";
import {
  INQUIRY_SELECT_EVENT,
  type InquirySelectDetail,
} from "@/lib/inquiry-events";
import { trackStudioEvent } from "@/lib/analytics";
import { useGsapSectionReveal } from "@/lib/use-gsap-reveal";

const SERVICE_OPTIONS = [
  "3D Animation & CGI",
  "Product Visualization",
  "Motion Graphics & Animation",
  "Explainer Video Production",
  "Character & Explainer Animation",
  "Architectural Visualization",
  "Website Design & Interactive WebGL",
  "3D Animation",
  "CGI & Photorealistic Rendering",
  "Motion Graphics",
  "Character Animation",
  "Website Design",
  "Interactive WebGL Experiences",
  "Multiple Services / Full Launch Scope",
] as const;

const BUDGET_OPTIONS = [
  "Need Scope Guidance / Custom Proposal",
  "Under £3,000",
  "£3,000 – £7,500",
  "£7,500 – £15,000",
  "£15,000 – £30,000",
  "£30,000+",
] as const;

const TIMELINE_OPTIONS = [
  "2 – 4 Weeks",
  "Urgent (Under 2 Weeks)",
  "1 – 2 Months",
  "2 – 3+ Months",
  "Flexible / Planning Stage",
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface SubmissionReceipt {
  inquiryId: string;
  submittedAt: string;
  fullName: string;
  email: string;
  service: string;
  timeline: string;
}

export function ProjectInquirySection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState<string>("3D Animation & CGI");
  const [budget, setBudget] = useState<string>(
    "Need Scope Guidance / Custom Proposal"
  );
  const [timeline, setTimeline] = useState<string>("2 – 4 Weeks");
  const [description, setDescription] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(STUDIO_FAQS[0].id);

  const renderedAtRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionReveal(sectionRef);

  useEffect(() => {
    renderedAtRef.current = Date.now();

    const handleSelectService = (event: Event) => {
      const custom = event as CustomEvent<InquirySelectDetail>;
      if (custom.detail?.service) {
        const incoming = custom.detail.service;
        const match = SERVICE_OPTIONS.find(
          (opt) => opt.toLowerCase() === incoming.toLowerCase()
        );
        setService(match || SERVICE_OPTIONS[0]);
        setReceipt(null);
      }
      if (custom.detail?.contextNote) {
        const note = custom.detail.contextNote;
        setDescription((prev) =>
          prev.trim().length > 0 ? prev : `${note} `
        );
      }
    };

    window.addEventListener(INQUIRY_SELECT_EVENT, handleSelectService);

    let timerId: number | undefined;
    if (typeof window !== "undefined" && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const qService = params.get("service") || undefined;
      const qBrief = params.get("brief") || undefined;
      if (qService || qBrief) {
        timerId = window.setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent<InquirySelectDetail>(INQUIRY_SELECT_EVENT, {
              detail: { service: qService, contextNote: qBrief },
            })
          );
        }, 0);
      }
    }

    return () => {
      if (timerId !== undefined) window.clearTimeout(timerId);
      window.removeEventListener(INQUIRY_SELECT_EVENT, handleSelectService);
    };
  }, []);

  const validateClient = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name.";
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = "Please enter a valid business email address.";
    }
    if (!service) {
      errors.service = "Please choose the primary service you are exploring.";
    }
    if (!budget) {
      errors.budget = "Please select a budget range or custom proposal.";
    }
    if (!timeline) {
      errors.timeline = "Please select your preferred project timeline.";
    }
    if (description.trim().length < 20) {
      errors.description =
        "Please include at least 20 characters describing your goals or deliverables.";
    }
    if (referenceUrl.trim().length > 0) {
      try {
        const parsed = new URL(referenceUrl.trim());
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          errors.referenceUrl =
            "Reference link should start with https:// or http://.";
        }
      } catch {
        errors.referenceUrl =
          "Please enter a complete URL (e.g. https://example.com) or leave blank.";
      }
    }
    if (attachment && attachment.size > 10 * 1024 * 1024) {
      errors.attachment = "File attachment must be 10 MB or smaller.";
    }
    return errors;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (!selected) {
      setAttachment(null);
      return;
    }
    if (selected.size > 10 * 1024 * 1024) {
      setFieldErrors((prev) => ({
        ...prev,
        attachment: "Attachment exceeds the 10 MB limit.",
      }));
      e.target.value = "";
      return;
    }
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.attachment;
      return next;
    });
    setAttachment(selected);
  };

  const clearAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const errors = validateClient();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      formData.append("company", company.trim());
      formData.append("service", service);
      formData.append("budget", budget);
      formData.append("timeline", timeline);
      formData.append("description", description.trim());
      formData.append("referenceUrl", referenceUrl.trim());
      formData.append("website_url", honeypot);
      formData.append("formRenderedAt", String(renderedAtRef.current));
      if (attachment) {
        formData.append("attachment", attachment);
      }

      const res = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.fieldErrors && typeof data.fieldErrors === "object") {
          setFieldErrors(data.fieldErrors);
        }
        setSubmitError(
          data.error ||
            "Unable to submit your inquiry right now. Please review your details or email info@rejubliss.co.uk."
        );
        return;
      }

      setReceipt({
        inquiryId: data.inquiryId,
        submittedAt: data.submittedAt,
        fullName: fullName.trim(),
        email: email.trim(),
        service,
        timeline,
      });

      trackStudioEvent("project_inquiry_submitted", {
        service,
        timeline,
        budget,
      });

      setFullName("");
      setEmail("");
      setCompany("");
      setDescription("");
      setReferenceUrl("");
      clearAttachment();
      renderedAtRef.current = Date.now();
    } catch {
      setSubmitError(
        "A network error prevented submission. Please try again or email info@rejubliss.co.uk directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClass =
    "w-full px-4 py-3.5 rounded-xl bg-[#050507] border border-white/12 focus:border-accent-primary text-sm text-text-heading placeholder:text-text-muted/70 outline-none transition-colors";

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="inquiry-heading"
      className="relative py-22 sm:py-28 bg-bg-primary overflow-hidden"
    >
      <div id="quote" className="absolute -top-24" aria-hidden="true" />

      <div className="max-w-[1480px] w-full mx-auto px-4 sm:px-6 md:px-12">
        {/* Monumental Editorial Contact Header */}
        <div data-gsap-reveal className="pb-8 sm:pb-10 mb-10 sm:mb-12 border-b border-white/10">
          <span className="editorial-eyebrow block mb-3">
            07 · Project Inquiry
          </span>
          <h2
            id="inquiry-heading"
            className="font-display text-[clamp(2rem,5.2vw,4.5rem)] font-extrabold uppercase text-text-heading leading-[0.98] tracking-[-0.04em]"
          >
            Let&apos;s Work Together
          </h2>
        </div>

        {/* Part A: Project Inquiry & Brief Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Concise Studio Brief Guidance & Direct Channels */}
          <div data-gsap-reveal className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.03em] leading-[1.1] text-text-heading">
                Have a Brief in Mind?{" "}
                <span className="text-accent-primary block mt-1">
                  Let&apos;s Scope It Together.
                </span>
              </h3>
              <p className="mt-4 text-sm sm:text-base text-text-secondary leading-relaxed">
                Tell us what you are launching, visualizing, or building. A
                creative director will review your brief and reply with a clear
                production approach, timeline, and custom proposal.
              </p>
            </div>

            {/* Clean Unboxed Commitments */}
            <ul className="border-t border-white/10 divide-y divide-white/10 text-xs sm:text-sm text-text-secondary">
              <li className="py-4 flex items-start gap-3.5">
                <Clock
                  size={17}
                  className="text-accent-primary shrink-0 mt-0.5"
                />
                <span>
                  <strong className="text-text-heading">
                    1-Business-Day Director Review:
                  </strong>{" "}
                  Direct reply from our London production leads—never automated
                  sales scripts.
                </span>
              </li>
              <li className="py-4 flex items-start gap-3.5">
                <Sparkles
                  size={17}
                  className="text-accent-primary shrink-0 mt-0.5"
                />
                <span>
                  <strong className="text-text-heading">
                    Itemised Scope &amp; Deliverables:
                  </strong>{" "}
                  Clear visual direction, milestone checkpoints, and aspect-ratio
                  specifications.
                </span>
              </li>
              <li className="py-4 flex items-start gap-3.5">
                <ShieldCheck
                  size={17}
                  className="text-accent-primary shrink-0 mt-0.5"
                />
                <span>
                  <strong className="text-text-heading">
                    Confidential &amp; NDA Ready:
                  </strong>{" "}
                  Unreleased hardware, CAD assemblies, and campaign decks remain
                  strictly protected.
                </span>
              </li>
            </ul>

            {/* Direct Studio Contact Card */}
            <div className="p-5 sm:p-6 rounded-[20px] bg-[#0b0b0f] text-text-heading border border-white/10 space-y-3">
              <span className="editorial-eyebrow text-[11px] block">
                Direct Studio Desk · London, UK
              </span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-0.5">
                <a
                  href="mailto:info@rejubliss.co.uk"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-text-heading hover:text-accent-primary transition-colors"
                >
                  <Mail size={15} className="text-accent-primary shrink-0" />
                  <span>info@rejubliss.co.uk</span>
                </a>
                <a
                  href="tel:+442081234567"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-text-heading hover:text-accent-primary transition-colors"
                >
                  <Phone size={15} className="text-accent-primary shrink-0" />
                  <span>+44 20 8123 4567</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Structured 3-Group Project Brief Form */}
          <div data-gsap-reveal className="lg:col-span-7">
            <div className="bg-[#0b0b0f] rounded-[22px] border border-white/10 shadow-[var(--shadow-card-hover)] p-6 sm:p-8 lg:p-10">
              {receipt ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="py-6 space-y-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent-primary/14 border border-accent-primary/40 text-accent-primary flex items-center justify-center">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <span className="editorial-eyebrow block mb-1.5">
                      Inquiry Received · Reference {receipt.inquiryId}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.02em] text-text-heading mb-2">
                      Thank you, {receipt.fullName}. Your brief is with our
                      studio team.
                    </h3>
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                      We have logged your{" "}
                      <strong className="text-text-heading">
                        {receipt.service}
                      </strong>{" "}
                      inquiry (target timeline:{" "}
                      <strong className="text-text-heading">
                        {receipt.timeline}
                      </strong>
                      ) and will reply to{" "}
                      <strong className="text-text-heading">
                        {receipt.email}
                      </strong>{" "}
                      within one business day.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#050507] border border-white/10 text-xs text-text-secondary flex flex-wrap items-center justify-between gap-2">
                    <span>
                      Reference Code:{" "}
                      <strong className="font-mono text-text-heading">
                        {receipt.inquiryId}
                      </strong>
                    </span>
                    <span>London Studio Queue · Confidential</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setReceipt(null)}
                    className="btn-secondary-surface inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs cursor-pointer"
                  >
                    <span>Submit Another Project Brief</span>
                    <ArrowUpRight size={14} className="text-accent-primary" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  {/* Honeypot field for automated bot protection */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden"
                  >
                    <label htmlFor="inquiry-website-trap">Website</label>
                    <input
                      id="inquiry-website-trap"
                      type="text"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {submitError ? (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-red-500/12 border border-red-500/35 text-sm text-red-300 flex items-start gap-3"
                    >
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  ) : null}

                  {/* Group 01: Contact Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 editorial-eyebrow text-[11px]">
                      <span className="editorial-index text-xs">01</span>
                      <span>·</span>
                      <span>Your Details</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="inquiry-fullName"
                          className="block text-xs font-semibold text-text-heading mb-1.5"
                        >
                          Full Name{" "}
                          <span className="text-accent-primary">*</span>
                        </label>
                        <input
                          id="inquiry-fullName"
                          name="fullName"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Alex Morgan"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          aria-invalid={Boolean(fieldErrors.fullName)}
                          aria-describedby={
                            fieldErrors.fullName ? "err-fullName" : undefined
                          }
                          className={inputBaseClass}
                        />
                        {fieldErrors.fullName ? (
                          <p
                            id="err-fullName"
                            className="mt-1 text-xs font-medium text-red-400"
                          >
                            {fieldErrors.fullName}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label
                          htmlFor="inquiry-email"
                          className="block text-xs font-semibold text-text-heading mb-1.5"
                        >
                          Business Email{" "}
                          <span className="text-accent-primary">*</span>
                        </label>
                        <input
                          id="inquiry-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="alex@company.co.uk"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          aria-invalid={Boolean(fieldErrors.email)}
                          aria-describedby={
                            fieldErrors.email ? "err-email" : undefined
                          }
                          className={inputBaseClass}
                        />
                        {fieldErrors.email ? (
                          <p
                            id="err-email"
                            className="mt-1 text-xs font-medium text-red-400"
                          >
                            {fieldErrors.email}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label
                          htmlFor="inquiry-company"
                          className="block text-xs font-semibold text-text-heading mb-1.5"
                        >
                          Company / Brand
                        </label>
                        <input
                          id="inquiry-company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="Brand or agency"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className={inputBaseClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Group 02: Scope & Timing */}
                  <div className="pt-5 border-t border-white/10 space-y-4">
                    <div className="flex items-center gap-2 editorial-eyebrow text-[11px]">
                      <span className="editorial-index text-xs">02</span>
                      <span>·</span>
                      <span>Scope &amp; Timing</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="inquiry-service"
                          className="block text-xs font-semibold text-text-heading mb-1.5"
                        >
                          Primary Capability{" "}
                          <span className="text-accent-primary">*</span>
                        </label>
                        <select
                          id="inquiry-service"
                          name="service"
                          required
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          aria-invalid={Boolean(fieldErrors.service)}
                          className={inputBaseClass}
                        >
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.service ? (
                          <p className="mt-1 text-xs font-medium text-red-400">
                            {fieldErrors.service}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label
                          htmlFor="inquiry-budget"
                          className="block text-xs font-semibold text-text-heading mb-1.5"
                        >
                          Estimated Budget{" "}
                          <span className="text-accent-primary">*</span>
                        </label>
                        <select
                          id="inquiry-budget"
                          name="budget"
                          required
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className={inputBaseClass}
                        >
                          {BUDGET_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="inquiry-timeline"
                          className="block text-xs font-semibold text-text-heading mb-1.5"
                        >
                          Target Timeline{" "}
                          <span className="text-accent-primary">*</span>
                        </label>
                        <select
                          id="inquiry-timeline"
                          name="timeline"
                          required
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          className={inputBaseClass}
                        >
                          {TIMELINE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Group 03: Project Brief & Optional Reference */}
                  <div className="pt-5 border-t border-white/10 space-y-4">
                    <div className="flex items-center gap-2 editorial-eyebrow text-[11px]">
                      <span className="editorial-index text-xs">03</span>
                      <span>·</span>
                      <span>Project Brief &amp; Optional Assets</span>
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-description"
                        className="block text-xs font-semibold text-text-heading mb-1.5"
                      >
                        Project Summary{" "}
                        <span className="text-accent-primary">*</span>
                      </label>
                      <textarea
                        id="inquiry-description"
                        name="description"
                        rows={4}
                        required
                        placeholder="Describe your product or concept, target channels (web, social, OOH, broadcast), approximate asset count, and any existing CAD/brand files..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        aria-invalid={Boolean(fieldErrors.description)}
                        aria-describedby={
                          fieldErrors.description
                            ? "err-description"
                            : undefined
                        }
                        className={`${inputBaseClass} resize-y`}
                      />
                      {fieldErrors.description ? (
                        <p
                          id="err-description"
                          className="mt-1 text-xs font-medium text-red-400"
                        >
                          {fieldErrors.description}
                        </p>
                      ) : null}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="inquiry-referenceUrl"
                          className="block text-xs font-semibold text-text-heading mb-1.5"
                        >
                          Reference Link{" "}
                          <span className="text-text-muted font-normal">
                            (optional)
                          </span>
                        </label>
                        <input
                          id="inquiry-referenceUrl"
                          name="referenceUrl"
                          type="url"
                          placeholder="https://figma.com/... or moodboard"
                          value={referenceUrl}
                          onChange={(e) => setReferenceUrl(e.target.value)}
                          aria-invalid={Boolean(fieldErrors.referenceUrl)}
                          className={inputBaseClass}
                        />
                        {fieldErrors.referenceUrl ? (
                          <p className="mt-1 text-xs font-medium text-red-400">
                            {fieldErrors.referenceUrl}
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label
                          htmlFor="inquiry-attachment"
                          className="block text-xs font-semibold text-text-heading mb-1.5"
                        >
                          Brief / CAD Attachment{" "}
                          <span className="text-text-muted font-normal">
                            (optional, ≤10MB)
                          </span>
                        </label>
                        <input
                          ref={fileInputRef}
                          id="inquiry-attachment"
                          name="attachment"
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg,.webp,.zip,.mp4,.doc,.docx,.pptx"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                        {attachment ? (
                          <div className="flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl bg-accent-primary/14 border border-accent-primary/40 text-xs font-semibold text-text-heading">
                            <span className="truncate">{attachment.name}</span>
                            <button
                              type="button"
                              onClick={clearAttachment}
                              aria-label="Remove attached file"
                              className="p-0.5 rounded-full hover:bg-white/10 text-text-muted hover:text-text-heading cursor-pointer shrink-0"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="inquiry-attachment"
                            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#050507] hover:bg-white/[0.04] border border-dashed border-white/20 hover:border-accent-primary text-xs font-semibold text-text-secondary cursor-pointer transition-colors"
                          >
                            <FileUp size={15} className="text-accent-primary" />
                            <span>Attach PDF, Deck, Image or ZIP</span>
                          </label>
                        )}
                        {fieldErrors.attachment ? (
                          <p className="mt-1 text-xs font-medium text-red-400">
                            {fieldErrors.attachment}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Inquiry Submit Bar */}
                  <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-text-muted leading-relaxed flex items-start gap-1.5 max-w-sm">
                      <Lock
                        size={13}
                        className="text-accent-primary shrink-0 mt-0.5"
                      />
                      <span>
                        Used solely to respond to your brief. View our{" "}
                        <Link
                          href="/privacy"
                          className="text-accent-primary font-semibold hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary-cta inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs disabled:opacity-65 cursor-pointer shrink-0 group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          <span>Sending Brief...</span>
                        </>
                      ) : (
                        <>
                          <span>Start Your Project</span>
                          <ArrowUpRight
                            size={15}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Part B: Concise Essential FAQs (Integrated Cleanly Below Inquiry) */}
        <div
          id="faq"
          data-gsap-reveal
          className="mt-20 sm:mt-24 pt-16 sm:pt-20 border-t border-white/10 scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          <div className="lg:col-span-4 space-y-3">
            <span className="editorial-eyebrow block">
              08 · Common Questions
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[36px] font-bold text-text-heading leading-[1.08] tracking-[-0.03em]">
              Clear Answers{" "}
              <span className="text-accent-primary">Before We Begin</span>
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Practical guidance on project scoping, production timelines, CAD
              file compatibility, revisions, and commercial rights.
            </p>
          </div>

          <div className="lg:col-span-8 border-t border-white/10 divide-y divide-white/10">
            {STUDIO_FAQS.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;
              const triggerId = `faq-trigger-${faq.id}`;
              const panelId = `faq-panel-${faq.id}`;

              return (
                <div key={faq.id} className="py-1">
                  <h3>
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="editorial-index shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-sm sm:text-base font-bold tracking-[-0.015em] text-text-heading group-hover:text-accent-primary transition-colors">
                          {faq.question}
                        </span>
                      </span>

                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-text-muted transition-transform duration-200 ${
                          isOpen
                            ? "rotate-180 text-accent-primary"
                            : "group-hover:text-accent-primary"
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={
                      isOpen ? "pb-5 pl-8 sm:pl-9 pr-4" : "sr-only"
                    }
                  >
                    <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
