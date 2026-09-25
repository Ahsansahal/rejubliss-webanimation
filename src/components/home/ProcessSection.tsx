"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Code, Play, Rocket } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    description: "Understand your goals and audience.",
    icon: Search,
  },
  {
    number: "02",
    title: "Create",
    description: "Design concepts that inspire.",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Develop",
    description: "Build with modern technology.",
    icon: Code,
  },
  {
    number: "04",
    title: "Animate",
    description: "Bring ideas to life with motion.",
    icon: Play,
  },
  {
    number: "05",
    title: "Launch",
    description: "Optimize, deliver and support.",
    icon: Rocket,
  },
];

export function ProcessSection() {
  return (
    <section id="about" className="py-20 bg-[#f8fafc]">
      <div className="max-w-[97%] w-[97%] mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-[#00A3E0]" />
            <span className="text-[12px] font-bold tracking-widest uppercase text-[#00A3E0]">
              Our Process
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#071527] leading-tight">
            From Concept to CGI Masterpiece
          </h2>
        </div>

        {/* 5 Connected Steps */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 items-start">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === STEPS.length - 1;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative flex flex-col group"
              >
                <div className="flex items-center gap-3 mb-3">
                  {/* Step Icon in soft pill */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-[#071527] flex items-center justify-center shadow-sm group-hover:border-[#00e5ff] group-hover:text-[#00A3E0] group-hover:shadow-md group-hover:shadow-cyan-500/15 transition-all">
                    <Icon size={20} />
                  </div>

                  {/* Step Number & Title */}
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-slate-400">
                      {step.number}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#071527]">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* Step Description */}
                <p className="text-[13px] text-slate-500 leading-relaxed max-w-[200px]">
                  {step.description}
                </p>

                {/* Connector Arrow (desktop) */}
                {!isLast && (
                  <div className="hidden lg:block absolute -right-4 top-6 text-[#00A3E0]/40 pointer-events-none">
                    <svg className="w-6 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
