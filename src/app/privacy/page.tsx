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
          <span className="text-accent-primary">Privacy Policy</span>
        </nav>

        <span className="editorial-eyebrow block mb-2.5">
          Legal &amp; Data Protection
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-[-0.035em] text-text-heading mb-3">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm uppercase tracking-[0.14em] text-text-muted pb-8 mb-8 border-b border-white/10">
          Last updated: 2026 · Rejubliss 3D Animation Studios, London, United
          Kingdom
        </p>

        <div className="space-y-8 text-sm sm:text-base text-text-secondary leading-relaxed bg-[#0b0b0f] border border-white/10 rounded-[22px] p-6 sm:p-10 shadow-[var(--shadow-card)]">
          <section className="space-y-2.5">
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-text-heading">
              <span className="text-accent-primary mr-2">01.</span>
              Information We Collect
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

          <section className="space-y-2.5 pt-6 border-t border-white/10">
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-text-heading">
              <span className="text-accent-primary mr-2">02.</span>
              How We Use Your Project Brief &amp; Files
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

          <section className="space-y-2.5 pt-6 border-t border-white/10">
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-text-heading">
              <span className="text-accent-primary mr-2">03.</span>
              Mutual NDAs &amp; Security
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

          <section className="space-y-2.5 pt-6 border-t border-white/10">
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-text-heading">
              <span className="text-accent-primary mr-2">04.</span>
              Your UK GDPR Rights &amp; Contact
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
