import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { AmbientBackgrounds } from "@/components/common/AmbientBackgrounds";
import { Hero } from "@/components/home/Hero";
import { StudioStatsBar } from "@/components/home/StudioStatsBar";
import { ServicesSection } from "@/components/home/ServicesSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { FlagshipReleasesSection } from "@/components/home/FlagshipReleasesSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FaqSection } from "@/components/home/FaqSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { ProjectInquirySection } from "@/components/home/ProjectInquirySection";
import { STUDIO_SERVICES } from "@/data/services";
import { STUDIO_FAQS } from "@/data/homepage";

export const metadata: Metadata = {
  title: {
    absolute:
      "Rejubliss | London 3D Animation, Photorealistic CGI, Motion & WebGL Studio",
  },
  description:
    "Rejubliss is a London creative studio crafting 4K 3D product animation, photorealistic packaging & OOH CGI, explainer videos, motion graphics, and interactive Three.js WebGL websites.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://rejubliss.co.uk",
    siteName: "Rejubliss 3D Animation Studios",
    title:
      "Rejubliss | London 3D Animation, Photorealistic CGI, Motion & WebGL Studio",
    description:
      "Commission bespoke 3D product animation, 300 DPI packaging & OOH CGI, explainer videos, motion design, and interactive WebGL experiences from our London studio.",
  },
};

export default function HomePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://rejubliss.co.uk/#organization",
      name: "Rejubliss 3D Animation Studios",
      alternateName: "Rejubliss",
      url: "https://rejubliss.co.uk",
      logo: {
        "@type": "ImageObject",
        url: "https://rejubliss.co.uk/images/logo.png",
        width: 933,
        height: 247,
      },
      image:
        "https://rejubliss.co.uk/images/portfolio/rezilo-recovery/01-paddington-billboard.png",
      email: "info@rejubliss.co.uk",
      telephone: "+44-20-8123-4567",
      address: {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressCountry: "GB",
      },
      areaServed: [
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Place", name: "Worldwide" },
      ],
      sameAs: [
        "https://www.instagram.com/rejubliss/",
        "https://www.linkedin.com/company/rejubliss/",
        "https://www.youtube.com/@rejubliss",
        "https://uk.pinterest.com/rejubliss/",
      ],
      knowsAbout: [
        "3D Animation",
        "Photorealistic CGI Rendering",
        "3D Product Visualization",
        "Motion Graphics",
        "Explainer Video Production",
        "Character Animation",
        "Architectural Visualization",
        "Website Design",
        "Interactive WebGL & Three.js Development",
      ],
      description:
        "London creative studio specializing in 3D animation, photorealistic CGI, product visualization, explainer videos, motion graphics, character animation, architectural visualization, website design, and interactive WebGL experiences.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Creative 3D, CGI, Motion & WebGL Services",
        itemListElement: STUDIO_SERVICES.map((srv) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: srv.title,
            description: srv.directDefinition,
            url: `https://rejubliss.co.uk/services/${srv.slug}`,
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://rejubliss.co.uk/#website",
      url: "https://rejubliss.co.uk",
      name: "Rejubliss 3D Animation Studios",
      inLanguage: "en-GB",
      publisher: {
        "@id": "https://rejubliss.co.uk/#organization",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://rejubliss.co.uk/#webpage",
      url: "https://rejubliss.co.uk",
      name: "Rejubliss | London 3D Animation, Photorealistic CGI, Motion & WebGL Studio",
      isPartOf: {
        "@id": "https://rejubliss.co.uk/#website",
      },
      about: {
        "@id": "https://rejubliss.co.uk/#organization",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: STUDIO_FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary flex flex-col relative selection:bg-accent-primary selection:text-black transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      {/* Deferred WebGL Fluid Cursor & Subtle Ambient Dust (respects mobile & prefers-reduced-motion) */}
      <AmbientBackgrounds />

      {/* Fixed Crystalline Header with Mega-Menu, Live Search & Theme Switcher */}
      <Header />

      {/* Hero — Cinematic 5:7 Split Layout with Unobstructed 3D Focal Stage */}
      <Hero />

      {/* Studio Foundation Strip — Verified Pipeline Figures & Client Commissions */}
      <StudioStatsBar />

      {/* 01. Creative Capabilities — Six Consolidated Disciplines & Sticky Showcase */}
      <ServicesSection />

      {/* 02. Commercial Advantage — Beyond Visuals Split */}
      <BenefitsSection />

      {/* 03. Flagship Releases — Interactive Multi-Asset Campaign Case Study Deck */}
      <FlagshipReleasesSection />

      {/* 04. Featured Work — Non-Overlapping Cross-Discipline Bento Showcase */}
      <PortfolioSection />

      {/* 05. Sector Applications — Industries We Serve */}
      <IndustriesSection />

      {/* 06. Production Workflow — Six Connected Stages With Sign-Off Gates */}
      <ProcessSection />

      {/* 07. Common Questions — Essential Production & Rights Answers */}
      <FaqSection />

      {/* 08. Client Endorsements & Studio Standards — Positioned Directly Before Final CTA */}
      <TestimonialsSection />

      {/* 09. Final CTA & Prominent Commission Brief Zone */}
      <FinalCtaSection aboveBriefForm />
      <ProjectInquirySection />

      <Footer />
    </main>
  );
}
