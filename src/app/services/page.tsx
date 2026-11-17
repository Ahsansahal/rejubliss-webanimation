import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { InquiryTriggerButton } from "@/components/common/ProjectInquiryModal";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { STUDIO_SERVICES, SOLUTION_GROUPS } from "@/data/services";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "3D Animation, CGI, Motion & WebGL Services | Rejubliss",
  },
  description:
    "Explore Rejubliss's 9 creative services in London: 3D animation, photorealistic CGI, product visualization, explainer films, motion, and WebGL.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/services`,
    title:
      "Creative 3D, CGI, Motion, Explainer & WebGL Services | Rejubliss London",
    description:
      "Nine specialist studio capabilities scoped around clear commercial deliverables, milestone approvals, and multi-channel assets.",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D, CGI, Motion, Explainer & WebGL Services | Rejubliss",
    description:
      "Explore Rejubliss's 9 specialist creative disciplines in London—from 4K 3D product animation and 300 DPI packaging CGI to real-time Three.js WebGL.",
  },
};

export default function ServicesIndexPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/services#webpage`,
      url: `${SITE_URL}/services`,
      name: "Rejubliss Creative 3D, CGI, Motion & WebGL Services",
      description:
        "Overview of Rejubliss 3D Animation Studios' 9 specialist creative capabilities and commissionable deliverables.",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#organization`,
      },
      mainEntity: {
        "@type": "ItemList",
        name: "Rejubliss Creative Services",
        numberOfItems: STUDIO_SERVICES.length,
        itemListElement: STUDIO_SERVICES.map((srv, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: srv.title,
          description: srv.summary,
          url: `${SITE_URL}/services/${srv.slug}`,
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
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${SITE_URL}/services`,
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

      {/* Editorial Hero Header */}
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-18 bg-bg-primary border-b border-border-subtle overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 45% at 84% 18%, rgba(229, 55, 38, 0.12), transparent 70%)",
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
            <span className="text-accent-primary">Services</span>
          </nav>

          <div className="max-w-4xl">
            <span className="editorial-eyebrow block mb-3">
              01 · Studio Capabilities &amp; Deliverables
            </span>
            <h1 className="font-display text-[clamp(2rem,5vw,4.25rem)] font-extrabold uppercase text-text-heading leading-[0.98] tracking-[-0.04em] mb-5">
              Nine Specialist Disciplines{" "}
              <span className="text-accent-primary">Under One Creative Roof</span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              From photorealistic packaging CGI, 4K 3D product animation, and
              script-to-screen explainer videos to real-time Three.js WebGL
              platforms, every Rejubliss commission in London and worldwide is
              scoped around clear deliverables and milestone sign-offs.
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <InquiryTriggerButton className="btn-primary-cta inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full text-xs group cursor-pointer">
                <span>Start Your Project</span>
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </InquiryTriggerButton>
              <Link
                href="/work"
                className="btn-secondary-surface inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs"
              >
                <span>Explore Client Case Studies</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All 9 Service Cards */}
      <section className="py-18 sm:py-24 bg-bg-primary">
        <div className="w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {STUDIO_SERVICES.map((srv, idx) => (
              <article
                key={srv.slug}
                className="group rounded-[22px] bg-bg-card border border-border-subtle hover:border-accent-primary/50 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all overflow-hidden grid grid-cols-1 sm:grid-cols-12"
              >
                <Link
                  href={`/services/${srv.slug}`}
                  className="sm:col-span-5 relative min-h-[230px] bg-[#050507] block overflow-hidden border-b sm:border-b-0 sm:border-r border-border-subtle"
                >
                  <Image
                    src={srv.heroImage}
                    alt={`${srv.title} showcase by Rejubliss`}
                    fill
                    preload={idx < 2}
                    sizes="(max-width: 640px) 95vw, 35vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f5f4ef]">
                    {srv.badge}
                  </span>
                </Link>

                <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="editorial-index text-xs">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[-0.025em] text-text-heading mb-2">
                      <Link
                        href={`/services/${srv.slug}`}
                        className="hover:text-accent-primary transition-colors"
                      >
                        {srv.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      {srv.summary}
                    </p>
                    <ul className="space-y-1.5 mb-5">
                      {srv.deliverables.slice(0, 3).map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-xs text-text-muted"
                        >
                          <CheckCircle2
                            size={13}
                            className="text-accent-primary shrink-0 mt-0.5"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3.5 border-t border-border-subtle flex items-center justify-between gap-3">
                    <Link
                      href={`/services/${srv.slug}`}
                      className="inline-flex items-center gap-1.5 font-display text-[11px] uppercase tracking-[0.08em] font-bold text-accent-primary hover:text-accent-highlight transition-colors"
                    >
                      <span>Explore {srv.shortTitle}</span>
                      <ArrowUpRight size={13} />
                    </Link>
                    <InquiryTriggerButton
                      service={srv.title}
                      href={`/?service=${encodeURIComponent(srv.title)}#contact`}
                      className="text-xs font-semibold text-text-muted hover:text-text-heading transition-colors cursor-pointer"
                    >
                      Request Quote
                    </InquiryTriggerButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Commissionable Solutions Summary */}
      <section className="py-18 sm:py-22 bg-bg-secondary border-t border-b border-border-subtle">
        <div className="w-[97%] max-w-[97%] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="mb-10">
            <span className="editorial-eyebrow block mb-2.5">
              02 · Production Suites
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-text-heading">
              Commissionable Solutions by{" "}
              <span className="text-accent-primary">Production Group</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOLUTION_GROUPS.map((group, idx) => (
              <div
                key={group.id}
                className="rounded-[22px] bg-bg-card border border-border-subtle p-6 sm:p-7 shadow-[var(--shadow-card)]"
              >
                <span className="editorial-eyebrow text-[11px]">
                  0{idx + 1} · {group.eyebrow}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-text-heading mt-2 mb-2">
                  {group.label}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-5">
                  {group.description}
                </p>
                <ul className="space-y-2">
                  {group.solutions.map((sol) => (
                    <li
                      key={sol.id}
                      className="flex items-center justify-between gap-2 text-xs font-semibold text-text-heading py-2 border-t border-border-subtle"
                    >
                      <span>{sol.title}</span>
                      <Link
                        href={`/services/${sol.serviceSlug}`}
                        className="text-accent-primary hover:text-accent-highlight shrink-0"
                      >
                        Guide →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection />
      <Footer />
    </main>
  );
}
