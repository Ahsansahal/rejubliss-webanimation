"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/common/Header";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { V2ExpandingBookShowcase } from "@/components/home/V2ExpandingBookShowcase";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CtaAndTestimonial } from "@/components/home/CtaAndTestimonial";
import { Footer } from "@/components/common/Footer";

// Dynamic import with SSR disabled for Three.js canvas to avoid hydration mismatches
const DynamicAmbientCanvas = dynamic(
  () =>
    import("@/components/webgl/AmbientRibbonCanvas").then(
      (mod) => mod.AmbientRibbonCanvas
    ),
  { ssr: false }
);

// Dynamic import with SSR disabled for Framer Flowing Cursor fluid simulation
const DynamicFlowingCursor = dynamic(
  () =>
    import("@/components/common/FlowingCursor").then(
      (mod) => mod.FlowingCursor
    ),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col relative selection:bg-[#00e5ff]/25 selection:text-[#071527]">
      {/* Framer Real WebGL Fluid Simulation Flowing Cursor */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        <DynamicFlowingCursor />
      </div>

      {/* Background WebGL subtle crystalline cyan & sapphire dust particles */}
      <DynamicAmbientCanvas />

      {/* Header with Topbar & Main Nav */}
      <Header />

      {/* Hero Section (Section 1) */}
      <Hero />

      {/* Services Section (Section 2) */}
      <ServicesSection />

      {/* Interactive Accordion Portfolio Showcase (Section 3) */}
      <V2ExpandingBookShowcase />

      {/* Featured Work Showcase with Interactive Filter Pills (Section 4) */}
      <FeaturedWork />

      {/* Process Section */}
      <ProcessSection />

      {/* Dual Banner: CTA & Testimonial */}
      <CtaAndTestimonial />

      {/* Rich Footer */}
      <Footer />
    </main>
  );
}
