import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
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
    <main className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header />

      <section className="pt-28 pb-10 sm:pt-36 sm:pb-12 bg-bg-secondary border-b border-border-subtle">
        <div className="w-[97%] max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-text-muted mb-5"
          >
            <Link href="/" className="hover:text-accent-primary transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-accent-primary">Work &amp; Case Studies</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-accent-soft border border-border-accent text-xs font-bold uppercase tracking-widest text-accent-primary mb-4">
                <Sparkles size={13} className="text-accent-interactive" />
                <span>Portfolio &amp; Case Studies</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold text-text-heading leading-tight tracking-tight mb-3">
                Selected Client Commissions &amp;{" "}
                <span className="hero-gradient-text italic font-normal">
                  Studio Showcases
                </span>
              </h1>
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                Explore multi-asset client deliveries and technical R&amp;D reels
                with transparent breakdowns of challenge, creative direction,
                production pipeline, and final deliverables.
              </p>
            </div>

            <Link
              href="/#contact"
              className="btn-primary-cta inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold shrink-0 w-fit"
            >
              <span>Start Your Project</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <PortfolioSection showAllByDefault />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}
