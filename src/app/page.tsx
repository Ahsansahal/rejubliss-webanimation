"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/common/Header";
import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] flex flex-col relative selection:bg-[#cba145]/20 selection:text-[#0a2920]">
      {/* Background WebGL subtle golden dust particles */}
      <DynamicAmbientCanvas />

      {/* Header with Topbar & Main Nav */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <ServicesSection />

      {/* Featured Work Showcase with Interactive Filter Pills */}
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
