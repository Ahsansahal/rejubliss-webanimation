import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Website usage terms, Statement of Work governance, milestone approvals, and commercial usage rights for Rejubliss 3D Animation Studios.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    type: "website",
    url: "https://rejubliss.co.uk/terms",
    title: "Terms & Conditions | Rejubliss 3D Animation Studios",
    description:
      "Statement of Work governance, milestone revision structure, and intellectual property terms for Rejubliss commissions.",
  },
};

export default function TermsPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://rejubliss.co.uk/terms#webpage",
      url: "https://rejubliss.co.uk/terms",
      name: "Terms & Conditions | Rejubliss 3D Animation Studios",
      isPartOf: { "@id": "https://rejubliss.co.uk/#website" },
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
          name: "Terms & Conditions",
          item: "https://rejubliss.co.uk/terms",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary flex flex-col selection:bg-accent-primary selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header />

      <article className="pt-30 pb-22 sm:pt-36 max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-12">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted mb-5"
        >
          <Link href="/" className="hover:text-accent-primary transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-accent-primary">Terms &amp; Conditions</span>
        </nav>

        <span className="editorial-eyebrow block mb-2.5">
          Studio Governance
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-[-0.035em] text-text-heading mb-3">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs sm:text-sm uppercase tracking-[0.14em] text-text-muted pb-8 mb-8 border-b border-white/10">
          Last updated: 2026 · Rejubliss 3D Animation Studios, London, United
          Kingdom
        </p>

        <div className="space-y-8 text-sm sm:text-base text-text-secondary leading-relaxed bg-[#0b0b0f] border border-white/10 rounded-[22px] p-6 sm:p-10 shadow-[var(--shadow-card)]">
          <section className="space-y-2.5">
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-text-heading">
              <span className="text-accent-primary mr-2">01.</span>
              Custom Project Proposals &amp; Statements of Work
            </h2>
            <p>
              All 3D animation, CGI visualization, motion design, website
              design, and WebGL commissions are governed by a written Statement
              of Work (SOW) detailing agreed deliverables, aspect ratios,
              milestone schedules, revision rounds, and fee stages. Information
              on this website serves as an overview of capabilities and does not
              constitute a binding fixed-price offer.
            </p>
          </section>

          <section className="space-y-2.5 pt-6 border-t border-white/10">
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-text-heading">
              <span className="text-accent-primary mr-2">02.</span>
              Milestone Approvals &amp; Revisions
            </h2>
            <p>
              Our six-step production workflow incorporates structured approval
              gates (brief, styleframes, storyboard/animatic, and WIP lighting
              / build review). Standard scopes include two consolidated feedback
              rounds per stage so projects remain on schedule prior to final
              high-resolution rendering or production deployment.
            </p>
          </section>

          <section className="space-y-2.5 pt-6 border-t border-white/10">
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-text-heading">
              <span className="text-accent-primary mr-2">03.</span>
              Intellectual Property &amp; Portfolio Display
            </h2>
            <p>
              All artwork, renders, animations, and code showcased on
              rejubliss.co.uk remain the intellectual property of Rejubliss 3D
              Animation Studios or our respective commissioning clients. Upon
              full settlement of an agreed SOW, clients receive the commercial
              usage rights specified in their contract, with optional raw
              working scene handovers available when scoped.
            </p>
          </section>

          <section className="space-y-2.5 pt-6 border-t border-white/10">
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-text-heading">
              <span className="text-accent-primary mr-2">04.</span>
              Studio Enquiries
            </h2>
            <p>
              For contract, licensing, or production questions, contact{" "}
              <a
                href="mailto:info@rejubliss.co.uk"
                className="text-accent-primary font-semibold underline"
              >
                info@rejubliss.co.uk
              </a>{" "}
              or{" "}
              <Link
                href="/#contact"
                className="text-accent-primary font-semibold underline"
              >
                request a custom proposal
              </Link>
              .
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
