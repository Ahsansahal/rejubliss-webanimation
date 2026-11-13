import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
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
    <main className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <Header />

      {/* Hero & Breadcrumb */}
      <section className="pt-28 sm:pt-34 pb-12 bg-bg-primary">
        <div className="w-[97%] max-w-[1600px] mx-auto px-2 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-text-muted"
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
              <span className="text-accent-primary font-bold truncate max-w-[220px] sm:max-w-none">
                {project.title}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-bg-accent-soft border border-border-accent text-accent-primary text-xs font-bold">
                {project.caseStudy.projectTypeLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-bg-subtle border border-border-subtle text-text-secondary text-xs font-semibold inline-flex items-center gap-1.5">
                <Award size={13} className="text-accent-primary" />
                <span>{project.badge}</span>
              </span>
            </div>
          </div>

          {/* Title & Metadata Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
            <div className="lg:col-span-8 space-y-4">
              <div>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-primary mb-2">
                  {project.portfolioCategory} • {project.caseStudy.industry}
                </p>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-text-heading leading-[1.1] tracking-tight">
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

            <div className="lg:col-span-4 bg-bg-card rounded-2xl border border-border-subtle card-shadow-soft p-5 space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <span className="text-text-muted font-medium">
                  {project.caseStudy.projectTypeLabel === "Client Case Study"
                    ? "Client"
                    : "Attribution"}
                </span>
                <span className="font-bold text-text-heading">
                  {project.client}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <span className="text-text-muted font-medium">Sector</span>
                <span className="font-semibold text-text-heading">
                  {project.caseStudy.industry}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-muted font-medium">
                  Scope Highlight
                </span>
                <span className="font-bold text-accent-primary">
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
      <section className="py-14 sm:py-20 bg-bg-secondary/60 border-t border-b border-border-subtle">
        <div className="w-[97%] max-w-[1600px] mx-auto px-2 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left 8 Cols: Challenge -> Direction -> Approach -> Final Output */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-bg-card rounded-3xl border border-border-subtle card-shadow-soft p-6 sm:p-8">
              <span className="text-[11px] font-bold uppercase tracking-widest text-accent-primary block mb-1.5">
                01 • Project Challenge
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-heading mb-3">
                The Brief &amp; Problem to Solve
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {project.caseStudy.challenge}
              </p>
            </div>

            <div className="bg-bg-card rounded-3xl border border-border-subtle card-shadow-soft p-6 sm:p-8">
              <span className="text-[11px] font-bold uppercase tracking-widest text-accent-primary block mb-1.5">
                02 • Creative Direction
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-heading mb-3">
                Visual Language &amp; Art Direction
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {project.caseStudy.creativeDirection}
              </p>
            </div>

            <div className="bg-bg-card rounded-3xl border border-border-subtle card-shadow-soft p-6 sm:p-8">
              <span className="text-[11px] font-bold uppercase tracking-widest text-accent-primary block mb-1.5">
                03 • Production Approach
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-heading mb-3">
                Execution &amp; Technical Pipeline
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {project.caseStudy.productionApproach}
              </p>
            </div>

            <div className="bg-bg-card rounded-3xl border border-border-subtle card-shadow-soft p-6 sm:p-8">
              <span className="text-[11px] font-bold uppercase tracking-widest text-accent-primary block mb-1.5">
                04 • Final Output
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-heading mb-3">
                Delivered Production Assets
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {project.caseStudy.finalOutput}
              </p>
              {project.caseStudy.verifiedOutcome ? (
                <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-bg-accent-soft border border-border-accent text-xs font-bold text-accent-primary">
                  <Layers size={14} />
                  <span>{project.caseStudy.verifiedOutcome}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Right 4 Cols: Deliverables, Capabilities & Commission CTA */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-bg-card rounded-3xl border border-border-subtle card-shadow-soft p-6 sm:p-7">
              <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
                Deliverables &amp; Scope
              </h2>
              <ul className="space-y-2.5">
                {project.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-text-heading bg-bg-subtle/70 border border-border-subtle rounded-xl px-3.5 py-2.5"
                  >
                    <CheckCircle2
                      size={15}
                      className="text-accent-interactive shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-5 border-t border-border-subtle">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2.5">
                  Technologies &amp; Craft
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1 rounded-full bg-bg-subtle text-text-secondary border border-border-subtle"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {relatedServices.length > 0 ? (
                <div className="mt-5 pt-5 border-t border-border-subtle">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2.5">
                    Related Capabilities
                  </h3>
                  <div className="flex flex-col gap-2">
                    {relatedServices.map((srv) => (
                      <Link
                        key={srv.slug}
                        href={`/services/${srv.slug}`}
                        className="flex items-center justify-between text-xs font-bold text-accent-primary hover:underline py-1"
                      >
                        <span>{srv.title}</span>
                        <ArrowRight size={13} />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Commission Similar Project Card */}
            <div className="bg-midnight-navy text-pearl-white rounded-3xl p-6 sm:p-7 border border-ocean-blue space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-ice-cyan">
                <Sparkles size={13} />
                <span>Start a Similar Brief</span>
              </div>
              <h2 className="font-serif text-2xl font-bold leading-snug">
                Planning a project like {project.title}?
              </h2>
              <p className="text-xs sm:text-sm text-metallic-silver/90 leading-relaxed">
                Share your goals and target channels with our London directors
                for a tailored scope and timeline proposal.
              </p>
              <Link
                href={`/?service=${encodeURIComponent(
                  relatedServices[0]?.title || "3D Animation"
                )}#contact`}
                className="btn-primary-cta w-full py-3 px-5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2"
              >
                <span>Request Custom Quote</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Case Studies */}
      {otherProjects.length > 0 ? (
        <section className="py-16 bg-bg-primary">
          <div className="w-[97%] max-w-[1600px] mx-auto px-2 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-heading">
                More in {project.portfolioCategory}
              </h2>
              <div className="flex items-center gap-5">
                <Link
                  href="/#portfolio"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-text-secondary hover:text-accent-primary"
                >
                  <ArrowLeft size={14} />
                  <span>Homepage Showcase</span>
                </Link>
                <Link
                  href="/work"
                  className="text-xs sm:text-sm font-bold text-accent-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>All 18 Case Studies</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherProjects.map((item) => (
                <Link
                  key={item.slug}
                  href={`/work/${item.slug}`}
                  className="group bg-bg-card rounded-3xl border border-border-subtle hover:border-border-accent card-shadow-soft hover:card-shadow-hover overflow-hidden transition-all"
                >
                  <div className="relative aspect-[16/10] w-full bg-bg-subtle overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`${item.fullTitle} — ${item.client}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-accent-primary block mb-1">
                      {item.client}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-text-heading group-hover:text-accent-primary transition-colors">
                      {item.fullTitle}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}
