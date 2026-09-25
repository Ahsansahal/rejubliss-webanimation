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
    <section className="py-16 bg-[#faf8f5]">
      <div className="max-w-[97%] w-[97%] mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Card: Dark Forest Green CTA Banner with 3D Gold Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#0a2920] rounded-3xl overflow-hidden relative border border-[#0d382c] shadow-xl flex flex-col sm:flex-row items-center min-h-[340px]"
          >
            {/* 3D Golden Ribbon visual on the left */}
            <div className="relative w-full sm:w-[45%] h-56 sm:h-full min-h-[280px]">
              <Image
                src="/images/golden_ribbon_cta.jpg"
                alt="3D Golden Ribbon Motion"
                fill
                sizes="(max-width: 640px) 100vw, 360px"
                className="object-cover object-left"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0a2920]/40 to-[#0a2920]" />
            </div>

            {/* Content on the right */}
            <div className="relative z-10 p-8 sm:p-10 flex-1 flex flex-col justify-center">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#cba145] mb-2 block">
                Let&apos;s Work Together
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-white leading-tight mb-3">
                Ready to Build Something Amazing?
              </h2>

              <p className="text-[#a1b3aa] text-sm sm:text-base leading-relaxed mb-6">
                Let&apos;s turn your ideas into stunning digital experiences.
              </p>

              <div>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2.5 bg-[#cba145] text-[#0a2920] font-bold px-6 py-3 rounded-full text-sm hover:bg-[#dfb962] hover:shadow-lg transition-all duration-200 group"
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

          {/* Right Card: Elegant White Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-[#ede8df] shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Quote Mark Icon */}
              <div className="w-10 h-10 rounded-full bg-[#faf8f5] border border-[#ede8df] text-[#cba145] flex items-center justify-center mb-6">
                <Quote size={18} className="fill-[#cba145]" />
              </div>

              {/* Testimonial Quote */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTestimonial.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="font-serif text-lg sm:text-[19px] text-[#0a2920] leading-relaxed mb-8 italic"
                >
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Author details & Rating */}
            <div className="flex items-center justify-between pt-6 border-t border-[#ede8df] flex-wrap gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#ede8df]">
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.author}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[15px] text-[#0a2920]">
                    {currentTestimonial.author}
                  </h4>
                  <span className="text-[12px] text-[#7d8c85]">
                    {currentTestimonial.role}
                  </span>
                </div>
              </div>

              {/* Stars & Navigation Arrows */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 text-[#cba145]">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#cba145]" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mt-1">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="w-7 h-7 rounded-full border border-[#ede8df] flex items-center justify-center text-[#5e6d66] hover:bg-[#faf8f5] hover:text-[#0a2920] transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="w-7 h-7 rounded-full border border-[#ede8df] flex items-center justify-center text-[#5e6d66] hover:bg-[#faf8f5] hover:text-[#0a2920] transition-colors"
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
