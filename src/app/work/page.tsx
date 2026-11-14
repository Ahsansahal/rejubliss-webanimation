import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { InquiryTriggerButton } from "@/components/common/ProjectInquiryModal";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { ALL_PORTFOLIO_PROJECTS } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | 3D, CGI, Brand & WebGL Work",
  description:
    "Browse 18 Rejubliss portfolio productions and client case studies across 3D packaging CGI, London OOH billboards, skincare VFX, motion design, and interactive WebGL.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    type: "website",
    url: "https://rejubliss.co.uk/work",
    title: "Portfolio & Case Studies | Rejubliss 3D, CGI, Motion & WebGL",
    description:
      "Explore 18 client commissions and technical showcases with transparent breakdowns of challenge, creative direction, pipeline, and deliverables.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Case Studies | Rejubliss London",
    description:
      "Browse 18 Rejubliss 3D animation, photorealistic CGI, packaging, and interactive WebGL productions.",
  },
};

export default function WorkIndexPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://rejubliss.co.uk/work#webpage",
      url: "https://rejubliss.co.uk/work",
      name: "Rejubliss Portfolio & Case Studies",
      description:
        "Selected 3D animation, photorealistic CGI, brand campaign, and WebGL case studies by Rejubliss 3D Animation Studios.",
      isPartOf: {
        "@id": "https://rejubliss.co.uk/#website",
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: ALL_PORTFOLIO_PROJECTS.length,
        itemListElement: ALL_PORTFOLIO_PROJECTS.map((proj, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: proj.fullTitle,
          url: `https://rejubliss.co.uk/work/${proj.slug}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rejubliss.co.uk",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Work & Case Studies",
          item: "https://rejubliss.co.uk/work",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary flex flex-col selection:bg-accent-primary selection:text-black transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header />

      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 bg-bg-primary border-b border-border-subtle overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 45% at 84% 18%, rgba(229, 55, 38, 0.14), transparent 70%)",
          }}
        />
        <div className="relative z-10 w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted mb-6"
          >
            <Link href="/" className="hover:text-accent-primary transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-accent-primary">Work &amp; Case Studies</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="editorial-eyebrow block mb-3">
                01 · Portfolio &amp; Case Studies
              </span>
              <h1 className="font-display text-[clamp(2rem,5vw,4.25rem)] font-extrabold uppercase text-text-heading leading-[0.98] tracking-[-0.04em] mb-4">
                Selected Client Commissions &amp;{" "}
                <span className="text-accent-primary">Studio Showcases</span>
              </h1>
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
                Explore multi-asset client deliveries and technical R&amp;D reels
                with transparent breakdowns of challenge, creative direction,
                production pipeline, and final deliverables.
              </p>
            </div>

            <InquiryTriggerButton className="btn-primary-cta inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full text-xs shrink-0 w-fit group cursor-pointer">
              <span>Start Your Project</span>
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </InquiryTriggerButton>
          </div>
        </div>
      </section>

      <PortfolioSection showAllByDefault />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}
