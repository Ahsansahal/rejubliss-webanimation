"use client";

import React, { useRef, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { STUDIO_FAQS } from "@/data/homepage";
import { triggerProjectInquiry } from "@/lib/inquiry-events";
import { useGsapSectionReveal } from "@/lib/use-gsap-reveal";

export function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(STUDIO_FAQS[0].id);
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapSectionReveal(sectionRef);

  return (
    <section
      id="faq"
      ref={sectionRef}
      aria-labelledby="faq-heading"
      className="relative py-22 sm:py-28 bg-bg-primary border-b border-border-subtle"
    >
      <div className="w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
        <div
          data-gsap-reveal
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          {/* Left Column: Context + Direct Question Trigger */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
            <div>
              <span className="editorial-eyebrow block mb-3">
                07 · Common Questions
              </span>
              <h2
                id="faq-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-text-heading leading-[1.06] tracking-[-0.03em]"
              >
                Clear Answers{" "}
                <span className="text-accent-primary">Before We Begin</span>
              </h2>
              <p className="mt-3.5 text-sm sm:text-base text-text-secondary leading-relaxed">
                Practical guidance on project scoping, production timelines, CAD
                file compatibility, revision checkpoints, and commercial usage
                rights.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => triggerProjectInquiry()}
                className="btn-secondary-surface inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] cursor-pointer group"
              >
                <span>Ask About Your Scope</span>
                <ArrowUpRight
                  size={13}
                  className="text-accent-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Right Column: Accessible Hairline Accordion */}
          <div className="lg:col-span-8 border-t border-border-subtle divide-y divide-border-subtle">
            {STUDIO_FAQS.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;
              const triggerId = `faq-trigger-${faq.id}`;
              const panelId = `faq-panel-${faq.id}`;

              return (
                <div key={faq.id} className="py-1">
                  <div>
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full py-5 text-left flex items-center justify-between gap-4 cursor-pointer group"
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
                  </div>

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
