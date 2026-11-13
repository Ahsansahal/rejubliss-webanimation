import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { STUDIO_SERVICES, SOLUTION_GROUPS } from "@/data/services";

export const metadata: Metadata = {
  title: "3D Animation, CGI, Motion, Explainer & WebGL Services",
  description:
    "Explore Rejubliss's 9 specialist creative services in London—3D animation, photorealistic CGI rendering, product visualization, motion graphics, explainer videos, character animation, architectural visualization, website design, and interactive WebGL.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: "https://rejubliss.co.uk/services",
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
      "@id": "https://rejubliss.co.uk/services#webpage",
      url: "https://rejubliss.co.uk/services",
      name: "Rejubliss Creative 3D, CGI, Motion & WebGL Services",
      description:
        "Overview of Rejubliss 3D Animation Studios' 9 specialist creative capabilities and commissionable deliverables.",
      isPartOf: {
        "@id": "https://rejubliss.co.uk/#website",
      },
      about: {
        "@id": "https://rejubliss.co.uk/#organization",
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
          url: `https://rejubliss.co.uk/services/${srv.slug}`,
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

      {/* Hero Header */}
      <section className="pt-28 pb-14 sm:pt-36 sm:pb-18 bg-bg-secondary border-b border-border-subtle">
        <div className="w-[97%] max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-6">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-text-muted mb-5"
          >
            <Link href="/" className="hover:text-accent-primary transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-accent-primary">Services</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-accent-soft border border-border-accent text-xs font-bold uppercase tracking-widest text-accent-primary mb-4">
              <Sparkles size={13} className="text-accent-interactive" />
              <span>Studio Capabilities &amp; Deliverables</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-bold text-text-heading leading-tight tracking-tight mb-4">
              Nine Specialist Disciplines Under{" "}
              <span className="hero-gradient-text italic font-normal">
                One Creative Roof
              </span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-7">
              From photorealistic packaging CGI, 4K 3D product animation, and
              script-to-screen explainer videos to real-time Three.js WebGL
              platforms, every Rejubliss commission in London and worldwide is
              scoped around clear deliverables and milestone sign-offs.
            </p>
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href="/#contact"
                className="btn-primary-cta inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
              >
                <span>Start Your Project</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/work"
                className="btn-secondary-surface inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
              >
                <span>Explore Client Case Studies</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All 9 Service Cards */}
      <section className="py-18 sm:py-22 bg-bg-primary">
        <div className="w-[97%] max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {STUDIO_SERVICES.map((srv, idx) => (
              <article
                key={srv.slug}
                className="rounded-3xl bg-bg-card border border-border-subtle hover:border-border-accent shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all overflow-hidden grid grid-cols-1 sm:grid-cols-12"
              >
                <Link
                  href={`/services/${srv.slug}`}
                  className="sm:col-span-5 relative min-h-[220px] bg-bg-subtle block"
                >
                  <Image
                    src={srv.heroImage}
                    alt={`${srv.title} showcase by Rejubliss`}
                    fill
                    preload={idx < 2}
                    sizes="(max-width: 640px) 95vw, 35vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-bg-card/92 backdrop-blur-md border border-border-accent text-[10.5px] font-bold uppercase tracking-wider text-accent-primary">
                    {srv.badge}
                  </span>
                </Link>

                <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-text-heading mb-2">
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
                            className="text-accent-interactive shrink-0 mt-0.5"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-border-subtle flex items-center justify-between gap-3">
                    <Link
                      href={`/services/${srv.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-primary hover:text-accent-interactive"
                    >
                      <span>Explore {srv.shortTitle} Guide</span>
                      <ArrowRight size={13} />
                    </Link>
                    <Link
                      href={`/?service=${encodeURIComponent(srv.title)}#contact`}
                      className="text-xs font-semibold text-text-muted hover:text-accent-primary"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Commissionable Solutions Summary */}
      <section className="py-16 bg-bg-secondary border-t border-b border-border-subtle">
        <div className="w-[97%] max-w-[1850px] mx-auto px-2 sm:px-4 lg:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text-heading mb-8">
            Commissionable Solutions by Production Group
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOLUTION_GROUPS.map((group) => (
              <div
                key={group.id}
                className="rounded-2xl bg-bg-card border border-border-subtle p-6 shadow-[var(--shadow-card)]"
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-accent-primary">
                  {group.eyebrow}
                </span>
                <h3 className="font-serif text-xl font-bold text-text-heading mt-1 mb-2">
                  {group.label}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  {group.description}
                </p>
                <ul className="space-y-2">
                  {group.solutions.map((sol) => (
                    <li
                      key={sol.id}
                      className="flex items-center justify-between text-xs font-semibold text-text-heading py-1.5 border-t border-border-subtle/70"
                    >
                      <span>{sol.title}</span>
                      <Link
                        href={`/services/${sol.serviceSlug}`}
                        className="text-accent-primary hover:text-accent-interactive"
                      >
                        {sol.title} Guide →
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
