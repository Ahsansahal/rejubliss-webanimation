"use client";

import React, { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { trackStudioEvent } from "@/lib/analytics";
import { SITE_URL } from "@/lib/site";

interface CaseStudyShareBarProps {
  slug: string;
  title: string;
  imageUrl: string;
}

export function CaseStudyShareBar({
  slug,
  title,
  imageUrl,
}: CaseStudyShareBarProps) {
  const [copied, setCopied] = useState(false);

  const canonicalUrl = `${SITE_URL}/work/${slug}`;
  const fullImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `${SITE_URL}${imageUrl}`;

  const encodedUrl = encodeURIComponent(canonicalUrl);
  const encodedTitle = encodeURIComponent(`${title} — Rejubliss Case Study`);
  const encodedMedia = encodeURIComponent(fullImageUrl);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      trackStudioEvent("case_study_shared", { slug, channel: "copy_link" });
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback ignored
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border-subtle">
      <span className="inline-flex items-center gap-1.5 editorial-eyebrow text-[10.5px] mr-1">
        <Share2 size={12} className="text-accent-primary" />
        <span>Share Case Study</span>
      </span>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-bg-card hover:bg-accent-primary/14 border border-border-subtle hover:border-accent-primary/50 text-xs font-semibold text-text-secondary hover:text-text-heading transition-colors cursor-pointer"
      >
        {copied ? (
          <>
            <Check size={12} className="text-accent-primary" />
            <span>Link Copied</span>
          </>
        ) : (
          <>
            <Link2 size={12} />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackStudioEvent("case_study_shared", { slug, channel: "linkedin" })
        }
        className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-bg-card hover:bg-accent-primary/14 border border-border-subtle hover:border-accent-primary/50 text-xs font-semibold text-text-secondary hover:text-text-heading transition-colors"
      >
        LinkedIn
      </a>

      <a
        href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedMedia}&description=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackStudioEvent("case_study_shared", { slug, channel: "pinterest" })
        }
        className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-bg-card hover:bg-accent-primary/14 border border-border-subtle hover:border-accent-primary/50 text-xs font-semibold text-text-secondary hover:text-text-heading transition-colors"
      >
        Pin Visual
      </a>
    </div>
  );
}
