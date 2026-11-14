import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { InquiryTriggerButton } from "@/components/common/ProjectInquiryModal";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { CaseStudyGalleryClient } from "@/components/work/CaseStudyGalleryClient";
import { CaseStudyShareBar } from "@/components/work/CaseStudyShareBar";
import {
  ALL_PORTFOLIO_PROJECTS,
  getProjectBySlug,
} from "@/data/portfolio";
import { STUDIO_SERVICES } from "@/data/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return ALL_PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {
      title: "Project Not Found | Rejubliss",
    };
  }
  return {
    title: `${project.fullTitle} | ${project.caseStudy.projectTypeLabel}`,
    description: project.synopsis,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://rejubliss.co.uk/work/${project.slug}`,
      title: `${project.fullTitle} | Rejubliss Case Study`,
      description: project.synopsis,
      images: [
        {
          url: project.image,
          alt: `${project.fullTitle} — ${project.client}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.fullTitle} | Rejubliss`,
      description: project.synopsis,
      images: [project.image],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedServices = STUDIO_SERVICES.filter((srv) =>
    project.relatedServiceSlugs.includes(srv.slug)
  );

  const otherProjects = ALL_PORTFOLIO_PROJECTS.filter(
    (p) =>
      p.slug !== project.slug &&
      p.portfolioCategory === project.portfolioCategory
  ).slice(0, 3);

  const canonicalUrl = `https://rejubliss.co.uk/work/${project.slug}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${canonicalUrl}#creativework`,
      url: canonicalUrl,
      name: project.fullTitle,
      headline: project.fullTitle,
      description: project.caseStudy.overview,
      genre: project.portfolioCategory,
      image: project.gallery.slice(0, 4).map((img, i) => ({
        "@type": "ImageObject",
        contentUrl: `https://rejubliss.co.uk${img}`,
        name: `${project.fullTitle} — Visual ${i + 1}`,
      })),
      creator: {
        "@type": "Organization",
        "@id": "https://rejubliss.co.uk/#organization",
        name: "Rejubliss 3D Animation Studios",
        url: "https://rejubliss.co.uk",
      },
      keywords: project.tags.join(", "),
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
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
          item: canonicalUrl,
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

      {/* Hero & Breadcrumb */}
      <section className="relative pt-28 sm:pt-36 pb-14 bg-bg-primary overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 45% at 85% 16%, rgba(229, 55, 38, 0.12), transparent 70%)",
          }}
        />
        <div className="relative z-10 w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border-subtle">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted"
            >
              <Link
                href="/"
                className="hover:text-accent-primary transition-colors"
              >
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href="/work"
                className="hover:text-accent-primary transition-colors"
              >
                Work
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-accent-primary truncate max-w-[220px] sm:max-w-none">
                {project.title}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-accent-primary/14 border border-accent-primary/40 text-accent-primary text-[11px] font-semibold uppercase tracking-[0.12em]">
                {project.caseStudy.projectTypeLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-bg-subtle border border-border-subtle text-text-secondary text-[11px] font-semibold uppercase tracking-[0.12em] inline-flex items-center gap-1.5">
                <Layers size={12} className="text-accent-primary" />
                <span>{project.badge}</span>
              </span>
            </div>
          </div>

          {/* Title & Metadata Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
            <div className="lg:col-span-8 space-y-4">
              <div>
                <p className="editorial-eyebrow mb-2.5">
                  {project.portfolioCategory} · {project.caseStudy.industry}
                </p>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-[50px] font-extrabold text-text-heading leading-[1.04] tracking-[-0.035em]">
                  {project.fullTitle}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl">
                  {project.caseStudy.overview}
                </p>
              </div>

              <CaseStudyShareBar
                slug={project.slug}
                title={project.fullTitle}
                imageUrl={project.image}
              />
            </div>

            <div className="lg:col-span-4 bg-bg-card rounded-[20px] border border-border-subtle p-5 sm:p-6 space-y-3 text-xs sm:text-sm shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between border-b border-border-subtle pb-2.5 gap-3">
                <span className="text-text-muted uppercase tracking-[0.14em] text-[11px] font-semibold">
                  {project.caseStudy.projectTypeLabel === "Client Case Study"
                    ? "Client"
                    : "Attribution"}
                </span>
                <span className="font-display font-bold text-text-heading text-xs sm:text-sm text-right">
                  {project.client}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border-subtle pb-2.5 gap-3">
                <span className="text-text-muted uppercase tracking-[0.14em] text-[11px] font-semibold">
                  Sector
                </span>
                <span className="font-semibold text-text-heading text-right">
                  {project.caseStudy.industry}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-text-muted uppercase tracking-[0.14em] text-[11px] font-semibold">
                  Scope Highlight
                </span>
                <span className="font-semibold text-accent-primary text-right">
                  {project.impactMetric}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Gallery Stage */}
          <CaseStudyGalleryClient
            title={project.fullTitle}
            images={project.gallery}
          />
        </div>
      </section>

      {/* Structured Case Study Narrative */}
      <section className="py-16 sm:py-22 bg-bg-secondary border-t border-b border-border-subtle">
        <div className="w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left 8 Cols: Challenge -> Direction -> Approach -> Final Output */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-bg-card rounded-[22px] border border-border-subtle p-6 sm:p-8 shadow-[var(--shadow-card)]">
              <span className="editorial-eyebrow text-[11px] block mb-2">
                01 · Project Challenge
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.025em] text-text-heading mb-3">
                The Brief &amp; Problem to Solve
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {project.caseStudy.challenge}
              </p>
            </div>

            <div className="bg-bg-card rounded-[22px] border border-border-subtle p-6 sm:p-8 shadow-[var(--shadow-card)]">
              <span className="editorial-eyebrow text-[11px] block mb-2">
                02 · Creative Direction
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.025em] text-text-heading mb-3">
                Visual Language &amp; Art Direction
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {project.caseStudy.creativeDirection}
              </p>
            </div>

            <div className="bg-bg-card rounded-[22px] border border-border-subtle p-6 sm:p-8 shadow-[var(--shadow-card)]">
              <span className="editorial-eyebrow text-[11px] block mb-2">
                03 · Production Approach
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.025em] text-text-heading mb-3">
                Execution &amp; Technical Pipeline
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {project.caseStudy.productionApproach}
              </p>
            </div>

            <div className="bg-bg-card rounded-[22px] border border-border-subtle p-6 sm:p-8 shadow-[var(--shadow-card)]">
              <span className="editorial-eyebrow text-[11px] block mb-2">
                04 · Final Output
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.025em] text-text-heading mb-3">
                Delivered Production Assets
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {project.caseStudy.finalOutput}
              </p>
              {project.caseStudy.verifiedOutcome ? (
                <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-accent-primary/14 border border-accent-primary/40 text-xs font-semibold text-accent-primary">
                  <Layers size={13} />
                  <span>{project.caseStudy.verifiedOutcome}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Right 4 Cols: Deliverables, Capabilities & Commission CTA */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-bg-card rounded-[22px] border border-border-subtle p-6 sm:p-7 shadow-[var(--shadow-card)]">
              <h2 className="editorial-eyebrow text-[11px] mb-4">
                Deliverables &amp; Scope
              </h2>
              <ul className="space-y-2.5">
                {project.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-text-heading bg-bg-subtle border border-border-subtle rounded-xl px-3.5 py-2.5"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-accent-primary shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-5 border-t border-border-subtle">
                <h3 className="editorial-eyebrow text-[10.5px] mb-2.5">
                  Technologies &amp; Craft
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-bg-subtle text-text-secondary border border-border-subtle"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {relatedServices.length > 0 ? (
                <div className="mt-5 pt-5 border-t border-border-subtle">
                  <h3 className="editorial-eyebrow text-[10.5px] mb-2.5">
                    Related Capabilities
                  </h3>
                  <div className="flex flex-col gap-2">
                    {relatedServices.map((srv) => (
                      <Link
                        key={srv.slug}
                        href={`/services/${srv.slug}`}
                        className="flex items-center justify-between font-display text-xs font-bold text-text-heading hover:text-accent-primary transition-colors py-1"
                      >
                        <span>{srv.title}</span>
                        <ArrowUpRight size={13} className="text-accent-primary" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Commission Similar Project Card */}
            <div className="bg-bg-card text-text-heading rounded-[22px] p-6 sm:p-7 border border-accent-primary/35 space-y-4 shadow-[var(--shadow-card)]">
              <div className="inline-flex items-center gap-1.5 editorial-eyebrow text-[11px]">
                <Sparkles size={13} />
                <span>Start a Similar Brief</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.025em] leading-snug">
                Planning a project like {project.title}?
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Share your goals and target channels with our London directors
                for a tailored scope and timeline proposal.
              </p>
              <InquiryTriggerButton
                service={relatedServices[0]?.title || "3D Animation & CGI"}
                contextNote={`Interested in a scope similar to ${project.title} (${project.client}).`}
                href={`/?service=${encodeURIComponent(
                  relatedServices[0]?.title || "3D Animation"
                )}#contact`}
                className="btn-primary-cta w-full py-3.5 px-5 rounded-full text-xs inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Custom Quote</span>
                <ArrowUpRight size={15} />
              </InquiryTriggerButton>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Case Studies */}
      {otherProjects.length > 0 ? (
        <section className="py-18 bg-bg-primary">
          <div className="w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-9">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-text-heading">
                More in{" "}
                <span className="text-accent-primary">
                  {project.portfolioCategory}
                </span>
              </h2>
              <div className="flex items-center gap-5">
                <Link
                  href="/#portfolio"
                  className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-[0.08em] font-bold text-text-secondary hover:text-accent-primary transition-colors"
                >
                  <ArrowLeft size={13} />
                  <span>Homepage Showcase</span>
                </Link>
                <Link
                  href="/work"
                  className="font-display text-xs uppercase tracking-[0.08em] font-bold text-accent-primary hover:text-accent-highlight inline-flex items-center gap-1"
                >
                  <span>All 18 Case Studies</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherProjects.map((item) => (
                <Link
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  className="group bg-bg-card rounded-[20px] border border-border-subtle hover:border-accent-primary/50 overflow-hidden transition-all shadow-[var(--shadow-card)]"
                >
                  <div className="relative aspect-[16/10] w-full bg-[#050507] overflow-hidden border-b border-border-subtle">
                    <Image
                      src={item.image}
                      alt={`${item.fullTitle} — ${item.client}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="editorial-eyebrow text-[10.5px] block mb-1">
                      {item.client}
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-bold tracking-[-0.02em] text-text-heading group-hover:text-accent-primary transition-colors">
                      {item.fullTitle}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCtaSection />
      <Footer />
    </main>
  );
}
