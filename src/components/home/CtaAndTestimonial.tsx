"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    id: "emily-carter",
    quote:
      "Rejubliss transformed our vision into a beautiful website and animation. Their creativity, professionalism, and attention to detail are outstanding!",
    author: "Emily Carter",
    role: "Marketing Director, Nexora",
    avatar: "/images/emily_carter.jpg",
    rating: 5,
  },
  {
    id: "marcus-vance",
    quote:
      "The 3D product animations exceeded all our expectations. Our customer conversion rate increased by 42% after launching the new visual experience.",
    author: "Marcus Vance",
    role: "VP of Product, Avelon",
    avatar: "/images/emily_carter.jpg",
    rating: 5,
  },
];

export function CtaAndTestimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="contact" className="py-16 bg-bg-primary transition-colors duration-300">
      <div className="max-w-[97%] w-[97%] mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Card: Crystalline Brand CTA Banner with 3D Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[image:var(--bg-spotlight)] rounded-3xl overflow-hidden relative border border-border-accent shadow-[var(--shadow-card-hover)] flex flex-col sm:flex-row items-center min-h-[340px]"
          >
            {/* 3D Crystalline Ribbon visual on the left */}
            <div className="relative w-full sm:w-[45%] h-56 sm:h-full min-h-[280px]">
              <Image
                src="/images/cyan_ribbon_cta.jpg"
                alt="3D Crystalline Cyan Ribbon Motion"
                fill
                sizes="(max-width: 640px) 100vw, 360px"
                className="object-cover object-left"
              />
              {/* Theme-aware seamless edge blend */}
              <div className="hidden sm:block absolute inset-0 bg-[image:var(--cta-ribbon-fade)]" />
              <div className="sm:hidden absolute inset-0 bg-[image:var(--cta-ribbon-fade-mobile)]" />
            </div>

            {/* Content on the right */}
            <div className="relative z-10 p-8 sm:p-10 flex-1 flex flex-col justify-center">
              <span className="text-[11px] font-bold tracking-widest uppercase text-accent-primary mb-2 block">
                Let&apos;s Work Together
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-text-heading leading-tight mb-3">
                Ready to Build Something Amazing?
              </h2>

              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
                Let&apos;s turn your vision into groundbreaking 3D animation and interactive digital experiences.
              </p>

              <div>
                <Link
                  href="mailto:info@rejubliss.co.uk"
                  className="btn-primary-cta inline-flex items-center gap-2.5 font-bold px-6 py-3 rounded-full text-sm group"
                >
                  <span>Start Your Project</span>
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Card: Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 bg-bg-card rounded-3xl p-8 sm:p-10 border border-border-subtle shadow-[var(--shadow-card)] flex flex-col justify-between"
          >
            <div>
              {/* Quote Mark Icon */}
              <div className="w-10 h-10 rounded-full bg-bg-accent-soft border border-border-accent text-accent-primary flex items-center justify-center mb-6">
                <Quote size={18} className="fill-current" />
              </div>

              {/* Testimonial Quote */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTestimonial.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="font-serif text-lg sm:text-[19px] text-text-heading leading-relaxed mb-8 italic"
                >
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Author details & Rating */}
            <div className="flex items-center justify-between pt-6 border-t border-border-subtle flex-wrap gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border-subtle">
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.author}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[15px] text-text-heading">
                    {currentTestimonial.author}
                  </h4>
                  <span className="text-[12px] text-text-muted">
                    {currentTestimonial.role}
                  </span>
                </div>
              </div>

              {/* Stars & Navigation Arrows */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 text-accent-interactive">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-accent-interactive text-accent-interactive" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mt-1">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="w-7 h-7 rounded-full border border-border-subtle bg-bg-card flex items-center justify-center text-text-secondary hover:bg-bg-subtle hover:text-accent-primary hover:border-border-accent transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="w-7 h-7 rounded-full border border-border-subtle bg-bg-card flex items-center justify-center text-text-secondary hover:bg-bg-subtle hover:text-accent-primary hover:border-border-accent transition-colors cursor-pointer"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
