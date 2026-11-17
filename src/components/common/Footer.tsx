"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
} from "lucide-react";
import { trackStudioEvent } from "@/lib/analytics";
import { useTheme } from "@/components/common/ThemeProvider";
import { triggerProjectInquiry } from "@/lib/inquiry-events";
import { STUDIO_ADDRESS } from "@/lib/site";

export function Footer() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "submitting") return;

    setStatus("submitting");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          companyWebsite: honeypot,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setStatus("error");
        setFeedbackMessage(
          data?.error || "Unable to subscribe right now. Please try again."
        );
        return;
      }

      setStatus("success");
      setFeedbackMessage(
        data?.message || "Subscribed to Rejubliss studio dispatches."
      );
      trackStudioEvent("newsletter_subscribed", { source: "footer" });
      setEmail("");
    } catch {
      setStatus("error");
      setFeedbackMessage(
        "Network error while subscribing. Please try again shortly."
      );
    }
  };

  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/rejubliss/",
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/rejubliss/",
      icon: (
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      ),
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@rejubliss",
      icon: (
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      ),
    },
    {
      label: "Pinterest",
      href: "https://uk.pinterest.com/rejubliss/",
      icon: (
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      ),
    },
  ];

  return (
    <footer className="relative w-full bg-bg-primary border-t border-border-subtle overflow-hidden">
      <div className="w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16">
        {/* Top Row: Studio Dispatches Card + Structured Editorial Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 items-start">
          {/* Left (5 cols): Studio Identity & Framed Newsletter Card */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <div>
              <span className="editorial-eyebrow block mb-2.5">
                Uxbridge, United Kingdom · 3D, CGI &amp; WebGL Studio
              </span>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-md">
                Cinematic 3D animation, photorealistic CGI product
                visualization, motion storytelling, and interactive WebGL web
                experiences engineered for ambitious brands.
              </p>
            </div>

            {/* Framed Studio Dispatches / Newsletter Module */}
            <div className="w-full rounded-[22px] bg-bg-card border border-border-subtle p-5 sm:p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-2 mb-1.5">
                <Mail size={14} className="text-accent-primary shrink-0" />
                <span className="font-display text-xs sm:text-sm font-bold tracking-[-0.02em] text-text-heading">
                  Studio Dispatches &amp; 4K Reel Drops
                </span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                Quarterly case-study breakdowns, CGI look-development notes, and
                new showreel releases. Zero spam.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:p-1.5 sm:rounded-full sm:bg-bg-input sm:border sm:border-border-subtle focus-within:border-accent-primary transition-all"
              >
                {/* Honeypot field */}
                <input
                  type="text"
                  name="companyWebsite"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="sr-only"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  placeholder="Enter your business email"
                  aria-label="Email address for studio newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-full sm:rounded-none bg-bg-input sm:bg-transparent border border-border-subtle sm:border-0 px-4 py-2.5 sm:py-2 text-xs sm:text-sm text-text-primary placeholder:text-text-muted outline-none flex-1 font-medium min-w-0"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  aria-label="Subscribe"
                  className="btn-primary-cta shrink-0 px-5 py-2.5 rounded-full text-[11px] flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Saving</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>
              </form>

              {status === "success" ? (
                <div className="flex items-center gap-1.5 text-xs text-accent-primary font-semibold mt-3">
                  <CheckCircle2
                    size={13}
                    className="text-accent-primary shrink-0"
                  />
                  <span>{feedbackMessage}</span>
                </div>
              ) : null}

              {status === "error" ? (
                <div className="flex items-center gap-1.5 text-xs text-red-500 font-semibold mt-3">
                  <AlertCircle size={13} className="shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Right (7 cols): 3 Structured Editorial Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 lg:pl-8">
            {/* Column 1: Capabilities */}
            <div className="flex flex-col gap-3.5">
              <span className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-text-muted select-none">
                Capabilities
              </span>
              <div className="flex flex-col gap-2.5 text-sm">
                <Link
                  href="/services/3d-animation"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  3D Animation
                </Link>
                <Link
                  href="/services/cgi-rendering"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Photorealistic CGI
                </Link>
                <Link
                  href="/services/product-visualization"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Product Visualization
                </Link>
                <Link
                  href="/services/motion-graphics"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Motion Graphics
                </Link>
                <Link
                  href="/services/explainer-videos"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Explainer Videos
                </Link>
                <Link
                  href="/services/character-animation"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Character Animation
                </Link>
                <Link
                  href="/services/architectural-visualization"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Architectural CGI
                </Link>
                <Link
                  href="/services/website-design"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Website Design
                </Link>
                <Link
                  href="/services/interactive-webgl"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Interactive WebGL
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 text-accent-primary hover:text-accent-highlight font-semibold transition-colors pt-1"
                >
                  <span>All 9 Studios</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            {/* Column 2: Studio & Work */}
            <div className="flex flex-col gap-3.5">
              <span className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-text-muted select-none">
                Studio &amp; Work
              </span>
              <div className="flex flex-col gap-2.5 text-sm">
                <Link
                  href="/#portfolio-spotlight"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Flagship Releases
                </Link>
                <Link
                  href="/work"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  All 18 Case Studies
                </Link>
                <Link
                  href="/services"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Services &amp; Deliverables
                </Link>
                <Link
                  href="/#industries"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Industries We Serve
                </Link>
                <Link
                  href="/#process"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Six-Stage Process
                </Link>
                <Link
                  href="/#faq"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Client FAQs
                </Link>
                <Link
                  href="/#testimonials"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Client Endorsements
                </Link>
                <button
                  type="button"
                  onClick={() => triggerProjectInquiry()}
                  className="inline-flex items-center gap-1 text-accent-primary hover:text-accent-highlight font-semibold transition-colors pt-1 cursor-pointer w-fit"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>

            {/* Column 3: Connect & Legal */}
            <div className="col-span-2 sm:col-span-1 flex flex-col gap-3.5">
              <span className="font-display text-[11px] font-bold tracking-[0.12em] uppercase text-text-muted select-none">
                Connect
              </span>
              <div className="flex flex-col gap-2.5 text-sm">
                <address className="not-italic text-text-secondary leading-relaxed">
                  {STUDIO_ADDRESS.full}
                </address>
                <a
                  href="mailto:info@rejubliss.co.uk"
                  className="text-text-secondary hover:text-accent-primary transition-colors break-all"
                >
                  info@rejubliss.co.uk
                </a>
                <a
                  href="tel:+442081234567"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                  +44 20 8123 4567
                </a>
                <div className="pt-2 flex flex-col gap-2 border-t border-border-subtle mt-1">
                  <Link
                    href="/privacy"
                    className="text-text-muted hover:text-text-heading transition-colors text-xs"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-text-muted hover:text-text-heading transition-colors text-xs"
                  >
                    Terms &amp; Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hairline Divider & Monumental Signature Row */}
        <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-10 h-10 rounded-full bg-bg-card border border-border-subtle hover:bg-accent-primary hover:text-black hover:border-accent-primary text-text-secondary flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <span className="sr-only">{item.label}</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    {item.icon}
                  </svg>
                </a>
              ))}
            </div>

            <span className="text-xs text-text-muted">
              © 2026 Rejubliss 3D Animation Studios. All rights reserved.
            </span>
          </div>

          <Link
            href="/"
            aria-label="Rejubliss 3D Animation Studios — Home"
            className="inline-flex items-center group select-none shrink-0"
          >
            <Image
              src={
                theme === "light"
                  ? "/images/logo-light.png"
                  : "/images/logo.png"
              }
              alt="Rejubliss 3D Animation Studios"
              width={933}
              height={247}
              quality={82}
              sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 340px"
              className="h-14 sm:h-18 lg:h-22 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
