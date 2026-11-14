"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Box,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  FileUp,
  Film,
  Globe,
  Layers,
  Loader2,
  Lock,
  Package,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  INQUIRY_MODAL_OPEN_EVENT,
  triggerProjectInquiry,
  type InquirySelectDetail,
} from "@/lib/inquiry-events";
import { trackStudioEvent } from "@/lib/analytics";

interface DisciplineOption {
  value: string;
  code: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const DISCIPLINE_CARDS: readonly DisciplineOption[] = [
  {
    value: "3D Animation & CGI",
    code: "01",
    title: "3D Animation & CGI",
    subtitle: "4K launch films, cutaways & raytraced key visuals",
    icon: Box,
  },
  {
    value: "Product Visualization",
    code: "02",
    title: "Product Visualization",
    subtitle: "300 DPI packaging suites, hardware & e-commerce CGI",
    icon: Package,
  },
  {
    value: "Motion Graphics & Animation",
    code: "03",
    title: "Motion Graphics & VFX",
    subtitle: "Kinetic brand systems, broadcast stings & fluid FX",
    icon: Film,
  },
  {
    value: "Character & Explainer Animation",
    code: "04",
    title: "Character & Explainer 3D",
    subtitle: "Narrative SaaS, fintech & rigged character storytelling",
    icon: Users,
  },
  {
    value: "Website Design & Interactive WebGL",
    code: "05",
    title: "Interactive WebGL & Web",
    subtitle: "Three.js configurators, 60fps shaders & bespoke sites",
    icon: Globe,
  },
  {
    value: "Architectural Visualization",
    code: "06",
    title: "Architectural CGI",
    subtitle: "Photorealistic retail flagships, interiors & London OOH",
    icon: Building2,
  },
] as const;

const FULL_LAUNCH_OPTION: DisciplineOption = {
  value: "Multiple Services / Full Launch Scope",
  code: "07",
  title: "Full Multi-Channel Campaign Launch",
  subtitle:
    "End-to-end 3D animation, 300 DPI print/OOH renders, social cutdowns & interactive web",
  icon: Layers,
};

const BUDGET_OPTIONS = [
  {
    value: "Need Scope Guidance / Custom Proposal",
    label: "Custom Scope Proposal",
    hint: "Recommended · Itemised quote",
  },
  {
    value: "Under £3,000",
    label: "Under £3,000",
    hint: "Focused stills or short asset",
  },
  {
    value: "£3,000 – £7,500",
    label: "£3,000 – £7,500",
    hint: "Product CGI or motion piece",
  },
  {
    value: "£7,500 – £15,000",
    label: "£7,500 – £15,000",
    hint: " Hero film or multi-SKU suite",
  },
  {
    value: "£15,000 – £30,000",
    label: "£15,000 – £30,000",
    hint: "Campaign or WebGL platform",
  },
  {
    value: "£30,000+",
    label: "£30,000+",
    hint: "Flagship multi-channel ecosystem",
  },
] as const;

const TIMELINE_OPTIONS = [
  { value: "Urgent (Under 2 Weeks)", label: "Urgent (< 2 Weeks)" },
  { value: "2 – 4 Weeks", label: "2 – 4 Weeks" },
  { value: "1 – 2 Months", label: "1 – 2 Months" },
  { value: "2 – 3+ Months", label: "2 – 3+ Months" },
  { value: "Flexible / Planning Stage", label: "Flexible / Planning" },
] as const;

const BRIEF_PROMPT_CHIPS = [
  "4K Product Launch Film",
  "300 DPI Packaging & OOH Stills",
  "16:9 + 9:16 Social Cutdowns",
  "Interactive 3D / WebGL Experience",
  "CAD / 3D Modelling Needed",
] as const;

const STEP_META = [
  { step: 1, code: "01", label: "Discipline" },
  { step: 2, code: "02", label: "Scope & Timing" },
  { step: 3, code: "03", label: "Project Brief" },
  { step: 4, code: "04", label: "Your Details" },
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

function normalizeDiscipline(incoming?: string): string {
  if (!incoming) return "3D Animation & CGI";
  const lower = incoming.trim().toLowerCase();
  if (
    lower.includes("webgl") ||
    lower.includes("website") ||
    lower.includes("three")
  ) {
    return "Website Design & Interactive WebGL";
  }
  if (lower.includes("product")) {
    return "Product Visualization";
  }
  if (lower.includes("motion")) {
    return "Motion Graphics & Animation";
  }
  if (lower.includes("explainer") || lower.includes("character")) {
    return "Character & Explainer Animation";
  }
  if (lower.includes("architect")) {
    return "Architectural Visualization";
  }
  if (lower.includes("multiple") || lower.includes("full launch")) {
    return "Multiple Services / Full Launch Scope";
  }
  return "3D Animation & CGI";
}

export interface InquiryTriggerButtonProps {
  service?: string;
  contextNote?: string;
  href?: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

export function InquiryTriggerButton({
  service,
  contextNote,
  href = "/#contact",
  className = "",
  ariaLabel,
  children,
}: InquiryTriggerButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.preventDefault();
        triggerProjectInquiry(
          service || contextNote ? { service, contextNote } : undefined
        );
      }}
      className={className}
    >
      {children}
    </a>
  );
}

export function ProjectInquiryModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [direction, setDirection] = useState<1 | -1>(1);

  const [service, setService] = useState<string>("3D Animation & CGI");
  const [budget, setBudget] = useState<string>(
    "Need Scope Guidance / Custom Proposal"
  );
  const [timeline, setTimeline] = useState<string>("2 – 4 Weeks");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [referenceUrl, setReferenceUrl] = useState<string>("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  const renderedAtRef = useRef<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    renderedAtRef.current = Date.now() - 2000;
  }, []);

  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    setIsOpen(false);
  }, [isSubmitting]);

  // Listen for global inquiry modal open event
  useEffect(() => {
    const handleOpen = (event: Event) => {
      const custom = event as CustomEvent<InquirySelectDetail>;
      const detail = custom.detail;

      if (detail?.service) {
        setService(normalizeDiscipline(detail.service));
      }
      if (detail?.contextNote) {
        setDescription((prev) =>
          prev.trim().length > 0 ? prev : `${detail.contextNote} `
        );
      }

      setReceipt(null);
      setSubmitError(null);
      setFieldErrors({});
      setDirection(1);
      setStep(1);
      setIsOpen(true);
    };

    window.addEventListener(INQUIRY_MODAL_OPEN_EVENT, handleOpen);
    return () => {
      window.removeEventListener(INQUIRY_MODAL_OPEN_EVENT, handleOpen);
    };
  }, []);

  // Lock background scroll & handle Escape key while open
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const goToStep = (next: 1 | 2 | 3 | 4) => {
    setSubmitError(null);
    setDirection(next >= step ? 1 : -1);
    setStep(next);
  };

  const toggleDeliverableTag = (tag: string) => {
    const exists = selectedTags.includes(tag);
    const nextTags = exists
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(nextTags);

    if (!exists && !description.toLowerCase().includes(tag.toLowerCase())) {
      setDescription((prev) => {
        const trimmed = prev.trim();
        return trimmed.length === 0 ? `Deliverables: ${tag}. ` : `${trimmed} • ${tag}`;
      });
      if (fieldErrors.description) {
        setFieldErrors((prev) => {
          const copy = { ...prev };
          delete copy.description;
          return copy;
        });
      }
    }
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
        attachment: "Attachment must be 10 MB or smaller.",
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

  const validateStep3 = (): boolean => {
    const errors: Record<string, string> = {};
    if (description.trim().length < 20) {
      errors.description =
        "Please include at least 20 characters describing your goals or target deliverables.";
    }
    if (referenceUrl.trim().length > 0) {
      try {
        const parsed = new URL(referenceUrl.trim());
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          errors.referenceUrl =
            "Reference link must start with https:// or http://.";
        }
      } catch {
        errors.referenceUrl =
          "Please enter a full URL (e.g. https://example.com) or leave blank.";
      }
    }
    if (attachment && attachment.size > 10 * 1024 * 1024) {
      errors.attachment = "Attachment must be 10 MB or smaller.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep4 = (): boolean => {
    const errors: Record<string, string> = {};
    if (fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name.";
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = "Please enter a valid business email address.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      goToStep(2);
      return;
    }
    if (step === 2) {
      goToStep(3);
      return;
    }
    if (step === 3) {
      if (validateStep3()) {
        goToStep(4);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (step < 4) {
      handleNext();
      return;
    }

    if (!validateStep3()) {
      goToStep(3);
      return;
    }

    if (!validateStep4()) {
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
          if (data.fieldErrors.description || data.fieldErrors.referenceUrl) {
            goToStep(3);
          }
        }
        setSubmitError(
          data.error ||
            "Unable to submit your inquiry right now. Please check your details or email info@rejubliss.co.uk."
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
        source: "multi_step_modal",
      });

      setFullName("");
      setEmail("");
      setCompany("");
      setDescription("");
      setReferenceUrl("");
      setSelectedTags([]);
      clearAttachment();
      renderedAtRef.current = Date.now() - 2000;
    } catch {
      setSubmitError(
        "A network error prevented submission. Please try again or email info@rejubliss.co.uk directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForAnotherBrief = () => {
    setReceipt(null);
    setSubmitError(null);
    setFieldErrors({});
    setStep(1);
  };

  const jumpToInlineForm = () => {
    setIsOpen(false);
    const target = document.getElementById("contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push("/#contact");
    }
  };

  const inputBaseClass =
    "w-full px-4 py-3.5 rounded-xl bg-bg-input border border-border-subtle focus:border-accent-primary text-sm text-text-heading placeholder:text-text-muted/75 outline-none transition-colors";

  const trimmedBriefLen = description.trim().length;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="project-inquiry-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={handleClose}
          className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 14 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-inquiry-modal-title"
            className="relative w-full max-w-[820px] max-h-[93dvh] bg-bg-card text-text-primary rounded-[26px] border border-border-strong shadow-[var(--shadow-card-hover)] overflow-hidden flex flex-col my-auto"
          >
            {/* Top Signature Vermilion Accent Rule */}
            <div className="h-1.5 w-full bg-accent-primary shrink-0" />

            {/* Modal Header */}
            <div className="px-5 sm:px-8 pt-5 pb-4 border-b border-border-subtle bg-bg-secondary shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                    <span className="inline-flex items-center gap-1.5 editorial-eyebrow text-[10.5px]">
                      <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse-subtle" />
                      <span>
                        {receipt
                          ? "Brief Logged · London Studio"
                          : `Step 0${step} of 04 · Guided Project Brief`}
                      </span>
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-bg-subtle border border-border-subtle text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                      <ShieldCheck size={11} className="text-accent-primary" />
                      <span>NDA Protected</span>
                    </span>
                  </div>

                  <h2
                    id="project-inquiry-modal-title"
                    className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-[-0.03em] text-text-heading leading-tight"
                  >
                    {receipt ? (
                      <>
                        Project Brief{" "}
                        <span className="text-accent-primary">Received</span>
                      </>
                    ) : (
                      <>
                        Start Your{" "}
                        <span className="text-accent-primary">Project</span>
                      </>
                    )}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close project inquiry popup"
                  className="w-10 h-10 rounded-full bg-bg-subtle hover:bg-accent-primary hover:text-black border border-border-strong hover:border-accent-primary text-text-heading flex items-center justify-center transition-all shrink-0 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Interactive 4-Step Progress Bar (Hidden on receipt view) */}
              {!receipt ? (
                <div className="mt-4 space-y-2.5">
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                    {STEP_META.map((item) => {
                      const isActive = step === item.step;
                      const isCompleted = step > item.step;
                      const isClickable = item.step < step;

                      return (
                        <button
                          key={item.step}
                          type="button"
                          disabled={!isClickable}
                          onClick={() =>
                            isClickable &&
                            goToStep(item.step as 1 | 2 | 3 | 4)
                          }
                          className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 py-2 rounded-xl border text-left transition-all ${
                            isActive
                              ? "bg-accent-primary/14 border-accent-primary text-text-heading"
                              : isCompleted
                                ? "bg-bg-card border-border-strong text-text-heading hover:border-accent-primary/60 cursor-pointer"
                                : "bg-bg-subtle/60 border-border-subtle text-text-muted cursor-default"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-display font-bold shrink-0 ${
                              isActive
                                ? "bg-accent-primary text-black"
                                : isCompleted
                                  ? "bg-accent-primary/20 text-accent-primary"
                                  : "bg-bg-subtle text-text-muted"
                            }`}
                          >
                            {isCompleted ? <Check size={11} /> : item.code}
                          </span>
                          <span className="text-[11px] sm:text-xs font-semibold truncate">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Continuous Animated Progress Line */}
                  <div className="h-1 w-full rounded-full bg-bg-subtle overflow-hidden">
                    <motion.div
                      className="h-full bg-accent-primary"
                      initial={false}
                      animate={{ width: `${(step / 4) * 100}%` }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            {/* Scrollable Body */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex-1 flex flex-col min-h-0 overflow-hidden"
            >
              {/* Honeypot field */}
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden"
              >
                <label htmlFor="modal-inquiry-website-trap">Website</label>
                <input
                  id="modal-inquiry-website-trap"
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">
                {receipt ? (
                  <motion.div
                    key="modal-receipt"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    role="status"
                    aria-live="polite"
                    className="py-4 space-y-6"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-accent-primary/15 border border-accent-primary/40 text-accent-primary flex items-center justify-center">
                      <CheckCircle2 size={28} />
                    </div>

                    <div className="space-y-2">
                      <span className="editorial-eyebrow block">
                        Confirmation Reference · {receipt.inquiryId}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.02em] text-text-heading">
                        Thank you, {receipt.fullName}. Your brief is with our
                        London directors.
                      </h3>
                      <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                        We have queued your{" "}
                        <strong className="text-text-heading">
                          {receipt.service}
                        </strong>{" "}
                        commission (target timeline:{" "}
                        <strong className="text-text-heading">
                          {receipt.timeline}
                        </strong>
                        ) and will send a structured scope &amp; milestone
                        proposal to{" "}
                        <strong className="text-text-heading">
                          {receipt.email}
                        </strong>{" "}
                        within one business day.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-bg-secondary border border-border-subtle text-xs text-text-secondary flex flex-wrap items-center justify-between gap-3">
                      <span>
                        Reference Code:{" "}
                        <strong className="font-mono text-text-heading">
                          {receipt.inquiryId}
                        </strong>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-accent-primary font-semibold">
                        <Clock size={13} />
                        <span>1-Business-Day Director Review</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="btn-primary-cta inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs cursor-pointer"
                      >
                        <span>Done &amp; Return to Studio</span>
                        <Check size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={resetForAnotherBrief}
                        className="btn-secondary-surface inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs cursor-pointer"
                      >
                        <span>Submit Another Brief</span>
                        <ArrowUpRight size={14} className="text-accent-primary" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {submitError ? (
                      <div
                        role="alert"
                        className="mb-5 p-4 rounded-xl bg-red-500/12 border border-red-500/35 text-sm text-red-500 flex items-start gap-3"
                      >
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    ) : null}

                    <AnimatePresence mode="wait" custom={direction}>
                      {/* STEP 1: DISCIPLINE SELECTION */}
                      {step === 1 ? (
                        <motion.div
                          key="step-1"
                          initial={{ opacity: 0, x: direction * 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction * -18 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-4"
                        >
                          <div>
                            <h3 className="font-display text-base sm:text-lg font-bold tracking-[-0.02em] text-text-heading">
                              Which creative capability are you commissioning?
                            </h3>
                            <p className="text-xs sm:text-sm text-text-secondary mt-1">
                              Select the primary studio discipline that best
                              fits your project.
                            </p>
                          </div>

                          <div
                            role="radiogroup"
                            aria-label="Primary creative capability"
                            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3"
                          >
                            {DISCIPLINE_CARDS.map((card) => {
                              const Icon = card.icon;
                              const selected = service === card.value;
                              return (
                                <button
                                  key={card.value}
                                  type="button"
                                  role="radio"
                                  aria-checked={selected}
                                  onClick={() => setService(card.value)}
                                  className={`group relative p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                                    selected
                                      ? "bg-accent-primary/12 border-accent-primary shadow-[var(--shadow-card)]"
                                      : "bg-bg-secondary hover:bg-bg-subtle-hover border-border-subtle hover:border-border-strong"
                                  }`}
                                >
                                  <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                      selected
                                        ? "bg-accent-primary text-black"
                                        : "bg-bg-card border border-border-subtle text-accent-primary group-hover:border-accent-primary/50"
                                    }`}
                                  >
                                    <Icon size={18} />
                                  </div>
                                  <div className="min-w-0 flex-1 pr-5">
                                    <div className="flex items-center gap-1.5">
                                      <span className="editorial-index text-[11px]">
                                        {card.code}
                                      </span>
                                      <span className="font-display text-xs sm:text-[13px] font-bold tracking-[-0.02em] text-text-heading truncate">
                                        {card.title}
                                      </span>
                                    </div>
                                    <p className="text-xs text-text-secondary leading-snug mt-1">
                                      {card.subtitle}
                                    </p>
                                  </div>
                                  <span
                                    className={`absolute top-3.5 right-3.5 w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                                      selected
                                        ? "bg-accent-primary border-accent-primary text-black"
                                        : "border-border-strong bg-transparent"
                                    }`}
                                  >
                                    {selected ? <Check size={12} /> : null}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          {/* Full Multi-Channel Option */}
                          {(() => {
                            const FullIcon = FULL_LAUNCH_OPTION.icon;
                            const selected =
                              service === FULL_LAUNCH_OPTION.value;
                            return (
                              <button
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                onClick={() =>
                                  setService(FULL_LAUNCH_OPTION.value)
                                }
                                className={`w-full relative p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                                  selected
                                    ? "bg-accent-primary/12 border-accent-primary shadow-[var(--shadow-card)]"
                                    : "bg-bg-secondary hover:bg-bg-subtle-hover border-border-subtle hover:border-border-strong"
                                }`}
                              >
                                <div
                                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                    selected
                                      ? "bg-accent-primary text-black"
                                      : "bg-bg-card border border-border-subtle text-accent-primary"
                                  }`}
                                >
                                  <FullIcon size={18} />
                                </div>
                                <div className="min-w-0 flex-1 pr-6">
                                  <div className="flex items-center gap-2">
                                    <span className="editorial-index text-[11px]">
                                      {FULL_LAUNCH_OPTION.code}
                                    </span>
                                    <span className="font-display text-xs sm:text-[13px] font-bold tracking-[-0.02em] text-text-heading">
                                      {FULL_LAUNCH_OPTION.title}
                                    </span>
                                  </div>
                                  <p className="text-xs text-text-secondary mt-0.5">
                                    {FULL_LAUNCH_OPTION.subtitle}
                                  </p>
                                </div>
                                <span
                                  className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 transition-colors ${
                                    selected
                                      ? "bg-accent-primary border-accent-primary text-black"
                                      : "border-border-strong bg-transparent"
                                  }`}
                                >
                                  {selected ? <Check size={12} /> : null}
                                </span>
                              </button>
                            );
                          })()}
                        </motion.div>
                      ) : null}

                      {/* STEP 2: BUDGET & TIMELINE */}
                      {step === 2 ? (
                        <motion.div
                          key="step-2"
                          initial={{ opacity: 0, x: direction * 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction * -18 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-6"
                        >
                          <div className="space-y-3">
                            <div>
                              <span className="editorial-eyebrow text-[10.5px] block mb-1">
                                02A · Production Investment
                              </span>
                              <h3 className="font-display text-base sm:text-lg font-bold tracking-[-0.02em] text-text-heading">
                                Estimated budget range
                              </h3>
                            </div>

                            <div
                              role="radiogroup"
                              aria-label="Estimated budget range"
                              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                            >
                              {BUDGET_OPTIONS.map((opt) => {
                                const selected = budget === opt.value;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    role="radio"
                                    aria-checked={selected}
                                    onClick={() => setBudget(opt.value)}
                                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                      selected
                                        ? "bg-accent-primary/12 border-accent-primary"
                                        : "bg-bg-secondary hover:bg-bg-subtle-hover border-border-subtle hover:border-border-strong"
                                    }`}
                                  >
                                    <div>
                                      <div className="font-display text-xs sm:text-[13px] font-bold text-text-heading">
                                        {opt.label}
                                      </div>
                                      <div className="text-[11px] text-text-muted mt-0.5">
                                        {opt.hint}
                                      </div>
                                    </div>
                                    <span
                                      className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                                        selected
                                          ? "bg-accent-primary border-accent-primary text-black"
                                          : "border-border-strong"
                                      }`}
                                    >
                                      {selected ? <Check size={12} /> : null}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-border-subtle space-y-3">
                            <div>
                              <span className="editorial-eyebrow text-[10.5px] block mb-1">
                                02B · Delivery Schedule
                              </span>
                              <h3 className="font-display text-base sm:text-lg font-bold tracking-[-0.02em] text-text-heading">
                                Target launch or delivery timeline
                              </h3>
                            </div>

                            <div
                              role="radiogroup"
                              aria-label="Target timeline"
                              className="flex flex-wrap gap-2.5"
                            >
                              {TIMELINE_OPTIONS.map((opt) => {
                                const selected = timeline === opt.value;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    role="radio"
                                    aria-checked={selected}
                                    onClick={() => setTimeline(opt.value)}
                                    className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                                      selected
                                        ? "btn-primary-solid"
                                        : "bg-bg-secondary hover:bg-bg-subtle-hover border border-border-subtle hover:border-border-strong text-text-heading"
                                    }`}
                                  >
                                    {selected ? <Check size={13} /> : null}
                                    <span>{opt.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      ) : null}

                      {/* STEP 3: PROJECT BRIEF & OPTIONAL ASSETS */}
                      {step === 3 ? (
                        <motion.div
                          key="step-3"
                          initial={{ opacity: 0, x: direction * 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction * -18 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-5"
                        >
                          <div>
                            <h3 className="font-display text-base sm:text-lg font-bold tracking-[-0.02em] text-text-heading">
                              Tell us about your vision &amp; deliverables
                            </h3>
                            <p className="text-xs sm:text-sm text-text-secondary mt-1">
                              Tap any quick scope tags below or describe your
                              product, target channels, and creative goals.
                            </p>
                          </div>

                          {/* Quick Deliverable Tag Helpers */}
                          <div className="flex flex-wrap gap-2">
                            {BRIEF_PROMPT_CHIPS.map((chip) => {
                              const active = selectedTags.includes(chip);
                              return (
                                <button
                                  key={chip}
                                  type="button"
                                  onClick={() => toggleDeliverableTag(chip)}
                                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                                    active
                                      ? "bg-accent-primary/18 border border-accent-primary text-text-heading"
                                      : "bg-bg-secondary hover:bg-bg-subtle-hover border border-border-subtle text-text-secondary hover:text-text-heading"
                                  }`}
                                >
                                  <Sparkles
                                    size={11}
                                    className="text-accent-primary shrink-0"
                                  />
                                  <span>+ {chip}</span>
                                </button>
                              );
                            })}
                          </div>

                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <label
                                htmlFor="modal-inquiry-description"
                                className="text-xs font-semibold text-text-heading"
                              >
                                Project Summary{" "}
                                <span className="text-accent-primary">*</span>
                              </label>
                              <span
                                className={`text-[11px] font-medium ${
                                  trimmedBriefLen >= 20
                                    ? "text-accent-primary"
                                    : "text-text-muted"
                                }`}
                              >
                                {trimmedBriefLen >= 20
                                  ? "✓ Ready for review"
                                  : `${Math.max(0, 20 - trimmedBriefLen)} more chars needed`}
                              </span>
                            </div>
                            <textarea
                              id="modal-inquiry-description"
                              name="description"
                              rows={4}
                              required
                              placeholder="Describe your product or concept, target channels (web, social, OOH, broadcast), approximate asset count, and whether CAD or brand files exist..."
                              value={description}
                              onChange={(e) => {
                                setDescription(e.target.value);
                                if (
                                  fieldErrors.description &&
                                  e.target.value.trim().length >= 20
                                ) {
                                  setFieldErrors((prev) => {
                                    const copy = { ...prev };
                                    delete copy.description;
                                    return copy;
                                  });
                                }
                              }}
                              aria-invalid={Boolean(fieldErrors.description)}
                              className={`${inputBaseClass} resize-y`}
                            />
                            {fieldErrors.description ? (
                              <p className="mt-1.5 text-xs font-medium text-red-500">
                                {fieldErrors.description}
                              </p>
                            ) : null}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="modal-inquiry-referenceUrl"
                                className="block text-xs font-semibold text-text-heading mb-1.5"
                              >
                                Reference Link{" "}
                                <span className="text-text-muted font-normal">
                                  (optional)
                                </span>
                              </label>
                              <input
                                id="modal-inquiry-referenceUrl"
                                name="referenceUrl"
                                type="url"
                                placeholder="https://figma.com/... or moodboard"
                                value={referenceUrl}
                                onChange={(e) => setReferenceUrl(e.target.value)}
                                aria-invalid={Boolean(fieldErrors.referenceUrl)}
                                className={inputBaseClass}
                              />
                              {fieldErrors.referenceUrl ? (
                                <p className="mt-1 text-xs font-medium text-red-500">
                                  {fieldErrors.referenceUrl}
                                </p>
                              ) : null}
                            </div>

                            <div>
                              <label
                                htmlFor="modal-inquiry-attachment"
                                className="block text-xs font-semibold text-text-heading mb-1.5"
                              >
                                Brief / CAD Attachment{" "}
                                <span className="text-text-muted font-normal">
                                  (optional, ≤10MB)
                                </span>
                              </label>
                              <input
                                ref={fileInputRef}
                                id="modal-inquiry-attachment"
                                name="attachment"
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg,.webp,.zip,.mp4,.doc,.docx,.pptx"
                                onChange={handleFileChange}
                                className="sr-only"
                              />
                              {attachment ? (
                                <div className="flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl bg-accent-primary/14 border border-accent-primary/40 text-xs font-semibold text-text-heading">
                                  <span className="truncate">
                                    {attachment.name}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={clearAttachment}
                                    aria-label="Remove attached file"
                                    className="text-text-muted hover:text-red-500 shrink-0 cursor-pointer"
                                  >
                                    <X size={15} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-dashed border-border-strong hover:border-accent-primary bg-bg-input hover:bg-accent-primary/8 text-xs font-semibold text-text-secondary hover:text-text-heading transition-colors cursor-pointer"
                                >
                                  <FileUp
                                    size={15}
                                    className="text-accent-primary"
                                  />
                                  <span>Attach PDF, Deck, Image or ZIP</span>
                                </button>
                              )}
                              {fieldErrors.attachment ? (
                                <p className="mt-1 text-xs font-medium text-red-500">
                                  {fieldErrors.attachment}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </motion.div>
                      ) : null}

                      {/* STEP 4: CONTACT DETAILS & FINAL SUBMIT */}
                      {step === 4 ? (
                        <motion.div
                          key="step-4"
                          initial={{ opacity: 0, x: direction * 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction * -18 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-5"
                        >
                          {/* Compact Scope Recap Strip */}
                          <div className="p-4 rounded-2xl bg-bg-secondary border border-border-subtle flex flex-wrap items-center justify-between gap-3">
                            <div className="space-y-1 min-w-0">
                              <span className="editorial-eyebrow text-[10px] block">
                                Configured Production Scope
                              </span>
                              <div className="text-xs sm:text-sm font-semibold text-text-heading flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span>{service}</span>
                                <span className="text-accent-primary">·</span>
                                <span className="text-text-secondary">
                                  {budget}
                                </span>
                                <span className="text-accent-primary">·</span>
                                <span className="text-text-secondary">
                                  {timeline}
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => goToStep(1)}
                              className="text-[11px] font-display font-bold uppercase tracking-[0.08em] text-accent-primary hover:text-accent-highlight cursor-pointer shrink-0"
                            >
                              Edit Scope
                            </button>
                          </div>

                          <div>
                            <h3 className="font-display text-base sm:text-lg font-bold tracking-[-0.02em] text-text-heading">
                              Where should our directors send your proposal?
                            </h3>
                            <p className="text-xs sm:text-sm text-text-secondary mt-1">
                              Direct review from our London production team
                              within 1 business day—never automated sales
                              scripts.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="modal-inquiry-fullName"
                                className="block text-xs font-semibold text-text-heading mb-1.5"
                              >
                                Full Name{" "}
                                <span className="text-accent-primary">*</span>
                              </label>
                              <input
                                id="modal-inquiry-fullName"
                                name="fullName"
                                type="text"
                                required
                                autoComplete="name"
                                placeholder="Alex Morgan"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                aria-invalid={Boolean(fieldErrors.fullName)}
                                className={inputBaseClass}
                              />
                              {fieldErrors.fullName ? (
                                <p className="mt-1 text-xs font-medium text-red-500">
                                  {fieldErrors.fullName}
                                </p>
                              ) : null}
                            </div>

                            <div>
                              <label
                                htmlFor="modal-inquiry-email"
                                className="block text-xs font-semibold text-text-heading mb-1.5"
                              >
                                Business Email{" "}
                                <span className="text-accent-primary">*</span>
                              </label>
                              <input
                                id="modal-inquiry-email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="alex@company.co.uk"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-invalid={Boolean(fieldErrors.email)}
                                className={inputBaseClass}
                              />
                              {fieldErrors.email ? (
                                <p className="mt-1 text-xs font-medium text-red-500">
                                  {fieldErrors.email}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="modal-inquiry-company"
                              className="block text-xs font-semibold text-text-heading mb-1.5"
                            >
                              Company / Brand{" "}
                              <span className="text-text-muted font-normal">
                                (optional)
                              </span>
                            </label>
                            <input
                              id="modal-inquiry-company"
                              name="company"
                              type="text"
                              autoComplete="organization"
                              placeholder="Brand, studio, or agency name"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              className={inputBaseClass}
                            />
                          </div>

                          <p className="text-xs text-text-muted leading-relaxed flex items-start gap-2 pt-1">
                            <Lock
                              size={13}
                              className="text-accent-primary shrink-0 mt-0.5"
                            />
                            <span>
                              Strictly confidential &amp; NDA-ready. Used solely
                              to prepare your project proposal. View our{" "}
                              <Link
                                href="/privacy"
                                onClick={handleClose}
                                className="text-accent-primary hover:underline font-medium"
                              >
                                Privacy Policy
                              </Link>
                              .
                            </span>
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </>
                )}
              </div>

              {/* Sticky Modal Action Footer */}
              {!receipt ? (
                <div className="px-5 sm:px-8 py-4 border-t border-border-subtle bg-bg-secondary shrink-0 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() =>
                          goToStep((step - 1) as 1 | 2 | 3 | 4)
                        }
                        disabled={isSubmitting}
                        className="btn-secondary-surface inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs cursor-pointer disabled:opacity-60"
                      >
                        <ArrowLeft size={14} />
                        <span>Back</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={jumpToInlineForm}
                        className="text-xs font-medium text-text-muted hover:text-text-heading transition-colors cursor-pointer"
                      >
                        Prefer single-page form?
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3 ml-auto">
                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn-primary-cta inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs cursor-pointer group"
                      >
                        <span>
                          {step === 1
                            ? "Scope & Timing"
                            : step === 2
                              ? "Project Brief"
                              : "Contact Details"}
                        </span>
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs cursor-pointer disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />
                            <span>Sending Brief...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Project Brief</span>
                            <ArrowUpRight size={15} />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
