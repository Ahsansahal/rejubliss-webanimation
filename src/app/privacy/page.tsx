import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Rejubliss 3D Animation Studios collects, protects, and processes project inquiry details, CAD/brief attachments, and UK GDPR data rights.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    url: "https://rejubliss.co.uk/privacy",
    title: "Privacy Policy | Rejubliss 3D Animation Studios",
    description:
      "UK GDPR data protection, confidential brief handling, and mutual NDA commitments at Rejubliss.",
  },
};

export default function PrivacyPolicyPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://rejubliss.co.uk/privacy#webpage",
      url: "https://rejubliss.co.uk/privacy",
      name: "Privacy Policy | Rejubliss 3D Animation Studios",
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
          name: "Privacy Policy",
          item: "https://rejubliss.co.uk/privacy",
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
          <span className="text-accent-primary">Privacy Policy</span>
        </nav>

        <span className="text-xs font-bold uppercase tracking-widest text-accent-primary">
          Legal &amp; Data Protection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-text-heading mt-2 mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-text-muted mb-10">
          Last updated: 2026 • Rejubliss 3D Animation Studios, London, United
          Kingdom
        </p>

        <div className="space-y-8 text-sm sm:text-base text-text-secondary leading-relaxed bg-bg-card border border-border-subtle rounded-3xl p-6 sm:p-10 shadow-[var(--shadow-card)]">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-text-heading">
              1. Information We Collect
            </h2>
            <p>
              When you submit a project inquiry or subscribe to studio updates on
              rejubliss.co.uk, we collect only the details you choose to share:
              your name, business email address, company/brand name, project
              scope preferences (service, estimated budget range, target
              timeline), project description, and any optional reference links
              or brief attachments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-text-heading">
              2. How We Use Your Project Brief &amp; Files
            </h2>
            <p>
              We use your submitted information strictly to evaluate your
              project brief, prepare a tailored creative and technical proposal,
              respond to your questions, or—where separately opted in—send
              occasional studio reel updates. Unreleased product CAD files,
              packaging dielines, and campaign concepts shared via our inquiry
              form are treated as confidential studio correspondence and are
              never sold or shared with third-party marketers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-text-heading">
              3. Mutual NDAs &amp; Security
            </h2>
            <p>
              For sensitive hardware, packaging, or pre-launch campaigns, we are
              happy to execute a mutual Non-Disclosure Agreement (NDA) before
              you transmit proprietary CAD assemblies or scripts. Technical
              anti-spam checks (including temporary IP rate-limiting) are
              applied solely to protect our inquiry endpoints from automated
              abuse.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-text-heading">
              4. Your UK GDPR Rights &amp; Contact
            </h2>
            <p>
              Under UK data protection law, you may request access to,
              correction of, or deletion of any personal contact details we
              hold. To exercise these rights or ask a privacy question, email{" "}
              <a
                href="mailto:info@rejubliss.co.uk"
                className="text-accent-primary font-semibold underline"
              >
                info@rejubliss.co.uk
              </a>{" "}
              or return to our{" "}
              <Link
                href="/#contact"
                className="text-accent-primary font-semibold underline"
              >
                Project Inquiry Form
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
