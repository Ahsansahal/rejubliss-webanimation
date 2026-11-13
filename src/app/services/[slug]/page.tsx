import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { STUDIO_SERVICES, getServiceBySlug } from "@/data/services";
import { getProjectsBySlugs } from "@/data/portfolio";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return STUDIO_SERVICES.map((srv) => ({
    slug: srv.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Service Not Found | Rejubliss" };
  }

  // Strip trailing "| Rejubliss" if present since root layout template appends "| Rejubliss"
  const cleanTitle = service.seoTitle.replace(/\s*\|\s*Rejubliss$/i, "");

  return {
    title: cleanTitle,
    description: service.seoDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      type: "website",
      url: `https://rejubliss.co.uk/services/${service.slug}`,
      title: service.seoTitle,
      description: service.seoDescription,
      images: [
        {
          url: service.heroImage,
          alt: `${service.title} — Rejubliss 3D Animation Studios`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.seoDescription,
      images: [service.heroImage],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = getProjectsBySlugs(service.relatedProjectSlugs);
  const otherServices = STUDIO_SERVICES.filter(
    (s) => s.slug !== service.slug
  ).slice(0, 4);

  const canonicalUrl = `https://rejubliss.co.uk/services/${service.slug}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      name: service.title,
      serviceType: service.title,
      url: canonicalUrl,
      description: service.directDefinition,
      image: `https://rejubliss.co.uk${service.heroImage}`,
      provider: {
        "@type": "ProfessionalService",
        "@id": "https://rejubliss.co.uk/#organization",
        name: "Rejubliss 3D Animation Studios",
        url: "https://rejubliss.co.uk",
        address: {
          "@type": "PostalAddress",
          addressLocality: "London",
          addressCountry: "GB",
        },
      },
      areaServed: [
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Place", name: "Worldwide" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.title} Deliverables`,
        itemListElement: service.deliverables.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item,
          },
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
          name: "Services",
          item: "https://rejubliss.co.uk/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: canonicalUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
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
    <main className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <Header />

      {/* 01. Service Hero & Direct AEO Definition */}
      <section className="pt-28 sm:pt-34 pb-16 bg-bg-primary">
        <div className="w-[97%] max-w-[1650px] mx-auto px-2 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
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
                href="/services"
                className="hover:text-accent-primary transition-colors"
              >
                Services
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-accent-primary font-bold">
                {service.title}
              </span>
            </nav>

            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-text-secondary hover:text-accent-primary transition-colors"
            >
              <ArrowLeft size={14} />
              <span>All 9 Capabilities</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-accent-soft border border-border-accent text-accent-primary text-xs font-bold uppercase tracking-wider">
                <Sparkles size={13} />
                <span>{service.badge} • London &amp; Worldwide</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[50px] font-bold text-text-heading leading-[1.1] tracking-tight">
                {service.h1Heading}
              </h1>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                {service.directDefinition}
              </p>

              {/* 3 Strategic Fit Cards */}
              <div className="grid grid-cols-1 gap-3 pt-1">
                <div className="p-4 rounded-2xl bg-bg-card border border-border-subtle card-shadow-soft">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-accent-primary block mb-1">
                    What We Create
                  </span>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {service.whatWeCreate}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-bg-card border border-border-subtle card-shadow-soft">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-accent-primary block mb-1">
                    Ideal Client Fit
                  </span>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {service.idealClients}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href={`/?service=${encodeURIComponent(
                    service.title
                  )}#contact`}
                  className="btn-primary-cta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold group"
                >
                  <span>Request a {service.shortTitle} Quote</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href="/work"
                  className="btn-secondary-surface inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold"
                >
                  <span>Explore Case Studies</span>
                </Link>
              </div>
            </div>

            {/* Visual Composition */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-bg-subtle border border-border-subtle card-shadow-hover">
                <Image
                  src={service.heroImage}
                  alt={`${service.title} production frame by Rejubliss London`}
                  fill
                  preload
                  fetchPriority="high"
                  sizes="(max-width: 1024px) 96vw, 48vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-bg-subtle border border-border-subtle">
                  <Image
                    src={service.secondaryImage}
                    alt={`${service.title} secondary studio visual`}
                    fill
                    sizes="(max-width: 640px) 96vw, 24vw"
                    className="object-cover"
                  />
                </div>
                <div className="rounded-2xl bg-midnight-navy text-pearl-white p-5 border border-ocean-blue flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ice-cyan">
                    <Wrench size={14} />
                    <span>Studio Pipeline</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 my-2">
                    {service.toolsAndPipeline.map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-ocean-blue border border-ice-cyan/25 text-pearl-white"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] text-metallic-silver/80">
                    NDA-ready • Milestone sign-offs • Multi-channel masters
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Business Problems Solved & What Is Included */}
      <section className="py-16 bg-bg-secondary/60 border-t border-b border-border-subtle">
        <div className="w-[97%] max-w-[1650px] mx-auto px-2 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-bg-card rounded-3xl border border-border-subtle card-shadow-soft p-7 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-primary mb-3">
              <Target size={15} />
              <span>Commercial Challenges Solved</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-heading mb-5">
              Problems {service.shortTitle} Solves for Your Team
            </h2>
            <ul className="space-y-3.5">
              {service.problemsSolved.map((problem) => (
                <li
                  key={problem}
                  className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                >
                  <CheckCircle2
                    size={17}
                    className="text-accent-interactive shrink-0 mt-0.5"
                  />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-bg-card rounded-3xl border border-border-subtle card-shadow-soft p-7 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-primary mb-3">
              <Layers size={15} />
              <span>End-to-End Scope</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-heading mb-5">
              What Every {service.shortTitle} Commission Includes
            </h2>
            <ul className="space-y-3.5">
              {service.whatIsIncluded.map((included) => (
                <li
                  key={included}
                  className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                >
                  <CheckCircle2
                    size={17}
                    className="text-accent-interactive shrink-0 mt-0.5"
                  />
                  <span>{included}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 03. Deliverables & Commercial Applications */}
      <section className="py-16 bg-bg-primary border-b border-border-subtle">
        <div className="w-[97%] max-w-[1650px] mx-auto px-2 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-bg-card rounded-3xl border border-border-subtle card-shadow-soft p-7 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-primary mb-3">
              <FileCheck2 size={15} />
              <span>Expected Deliverables</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-heading mb-5">
              Final Files &amp; Masters You Receive
            </h2>
            <ul className="space-y-3">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <CheckCircle2
                    size={17}
                    className="text-accent-interactive shrink-0 mt-0.5"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-bg-card rounded-3xl border border-border-subtle card-shadow-soft p-7 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-primary mb-3">
              <Sparkles size={15} />
              <span>Benefits &amp; Channels</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-heading mb-5">
              Where Brands Deploy {service.shortTitle}
            </h2>
            <ul className="space-y-3">
              {service.applications.map((app) => (
                <li
                  key={app}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <CheckCircle2
                    size={17}
                    className="text-accent-interactive shrink-0 mt-0.5"
                  />
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 04. Service Production Process & Industries Served */}
      <section className="py-16 sm:py-20 bg-bg-secondary/50 border-b border-border-subtle">
        <div className="w-[97%] max-w-[1650px] mx-auto px-2 sm:px-6 space-y-16">
          {/* Production Workflow */}
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-accent-primary block mb-1.5">
                  Milestone Workflow
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-text-heading">
                  How Our {service.shortTitle} Production Process Works
                </h2>
              </div>
              <Link
                href="/#process"
                className="text-xs sm:text-sm font-bold text-accent-primary hover:underline inline-flex items-center gap-1"
              >
                <span>See Studio 6-Stage Workflow</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {service.processHighlights.map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-2xl bg-bg-card border border-border-subtle card-shadow-soft"
                >
                  <h3 className="font-serif text-lg font-bold text-text-heading mb-2">
                    {item.step}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Industries Served + Why Choose Rejubliss */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-bg-card rounded-3xl border border-border-subtle card-shadow-soft p-7 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-primary mb-3">
                <Building2 size={15} />
                <span>Industries Served</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-heading mb-5">
                Sector Applications for {service.shortTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.industriesServed.map((ind) => (
                  <div
                    key={ind.sector}
                    className="p-4 rounded-2xl bg-bg-subtle/60 border border-border-subtle"
                  >
                    <h3 className="font-serif text-base font-bold text-text-heading mb-1">
                      {ind.sector}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {ind.useCase}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-midnight-navy text-pearl-white rounded-3xl border border-ocean-blue p-7 sm:p-8 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ice-cyan">
                <ShieldCheck size={15} />
                <span>Why Choose Rejubliss</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pearl-white">
                What Sets Our London Studio Apart
              </h2>
              <div className="divide-y divide-white/15">
                {service.whyChoosePoints.map((pt) => (
                  <div key={pt.title} className="py-3.5 first:pt-0 last:pb-0">
                    <h3 className="font-serif text-base font-bold text-ice-cyan mb-1">
                      {pt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-metallic-silver/90 leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. Related Portfolio Case Studies */}
      {relatedProjects.length > 0 ? (
        <section className="py-16 sm:py-20 bg-bg-primary border-b border-border-subtle">
          <div className="w-[97%] max-w-[1650px] mx-auto px-2 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-9">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-accent-primary block mb-1.5">
                  Applied Studio Work
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-text-heading">
                  {service.title} Portfolio &amp; Case Studies
                </h2>
              </div>
              <Link
                href="/work"
                className="text-xs sm:text-sm font-bold text-accent-primary hover:underline inline-flex items-center gap-1"
              >
                <span>View All 18 Case Studies</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProjects.map((proj) => (
                <Link
                  key={proj.slug}
                  href={`/work/${proj.slug}`}
                  className="group bg-bg-card rounded-3xl border border-border-subtle hover:border-border-accent card-shadow-soft hover:card-shadow-hover overflow-hidden flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full bg-bg-subtle overflow-hidden">
                      <Image
                        src={proj.image}
                        alt={`${proj.fullTitle} — ${proj.client}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[11px] font-bold text-accent-primary block mb-1">
                        {proj.client} • {proj.caseStudy.projectTypeLabel}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-text-heading group-hover:text-accent-primary transition-colors leading-snug mb-2">
                        {proj.fullTitle}
                      </h3>
                      <p className="text-xs text-text-secondary line-clamp-2">
                        {proj.synopsis}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-2 text-xs font-bold text-accent-primary inline-flex items-center gap-1">
                    <span>Read {proj.title} Case Study</span>
                    <ArrowRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 06. Service-Specific FAQs (Crawlable Answer-Focused HTML for SEO & AEO) */}
      <section
        aria-labelledby="service-faq-heading"
        className="py-16 sm:py-20 bg-bg-secondary/45 border-b border-border-subtle"
      >
        <div className="w-[97%] max-w-[1650px] mx-auto px-2 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-primary">
              <HelpCircle size={15} />
              <span>Service FAQs</span>
            </div>
            <h2
              id="service-faq-heading"
              className="font-serif text-2xl sm:text-4xl font-bold text-text-heading leading-tight"
            >
              Common {service.shortTitle} Questions
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Direct answers on timelines, source files, technical deliverables,
              and how we scope {service.title.toLowerCase()} briefs.
            </p>
            <Link
              href={`/?service=${encodeURIComponent(service.title)}#contact`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-primary hover:underline pt-1"
            >
              <span>Ask our directors a project-specific question</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {service.faqs.map((faq) => (
              <div
                key={faq.question}
                className="p-6 rounded-2xl bg-bg-card border border-border-subtle card-shadow-soft space-y-2.5"
              >
                <h3 className="font-serif text-lg font-bold text-text-heading leading-snug">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07. Complementary Studio Services */}
      <section className="py-14 bg-bg-primary">
        <div className="w-[97%] max-w-[1650px] mx-auto px-2 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="font-serif text-2xl font-bold text-text-heading">
              Explore Complementary Studio Services
            </h2>
            <Link
              href="/services"
              className="text-xs font-bold text-accent-primary hover:underline inline-flex items-center gap-1"
            >
              <span>View All 9 Services</span>
              <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="p-5 rounded-2xl bg-bg-card border border-border-subtle hover:border-border-accent card-shadow-soft transition-all group"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent-primary block mb-1">
                  {item.badge}
                </span>
                <h3 className="font-serif text-lg font-bold text-text-heading group-hover:text-accent-primary transition-colors mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-text-muted line-clamp-2">
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection />
      <Footer />
    </main>
  );
}
