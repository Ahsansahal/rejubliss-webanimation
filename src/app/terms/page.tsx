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
    <main className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header />

      <article className="pt-32 pb-20 sm:pt-36 w-[97%] max-w-4xl mx-auto px-4 sm:px-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-text-muted mb-4"
        >
          <Link href="/" className="hover:text-accent-primary transition-colors">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-accent-primary">Terms &amp; Conditions</span>
        </nav>

        <span className="text-xs font-bold uppercase tracking-widest text-accent-primary">
          Studio Governance
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-text-heading mt-2 mb-3">
          Terms &amp; Conditions
        </h1>
        <p className="text-sm text-text-muted mb-10">
          Last updated: 2026 • Rejubliss 3D Animation Studios, London, United
          Kingdom
        </p>

        <div className="space-y-8 text-sm sm:text-base text-text-secondary leading-relaxed bg-bg-card border border-border-subtle rounded-3xl p-6 sm:p-10 shadow-[var(--shadow-card)]">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-text-heading">
              1. Custom Project Proposals &amp; Statements of Work
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

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-text-heading">
              2. Milestone Approvals &amp; Revisions
            </h2>
            <p>
              Our six-step production workflow incorporates structured approval
              gates (brief, styleframes, storyboard/animatic, and WIP lighting
              / build review). Standard scopes include two consolidated feedback
              rounds per stage so projects remain on schedule prior to final
              high-resolution rendering or production deployment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-text-heading">
              3. Intellectual Property &amp; Portfolio Display
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

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-text-heading">
              4. Studio Enquiries
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
