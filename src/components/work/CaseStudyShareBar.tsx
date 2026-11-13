"use client";

import React, { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { trackStudioEvent } from "@/lib/analytics";

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

  const canonicalUrl = `https://rejubliss.co.uk/work/${slug}`;
  const fullImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `https://rejubliss.co.uk${imageUrl}`;

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
    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border-subtle">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-text-muted mr-1">
        <Share2 size={12} className="text-accent-primary" />
        <span>Share Case Study</span>
      </span>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-subtle hover:bg-bg-accent-soft border border-border-subtle hover:border-border-accent text-xs font-semibold text-text-secondary hover:text-accent-primary transition-colors cursor-pointer"
      >
        {copied ? (
          <>
            <Check size={12} className="text-accent-interactive" />
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
        className="inline-flex items-center px-3 py-1.5 rounded-full bg-bg-subtle hover:bg-bg-accent-soft border border-border-subtle hover:border-border-accent text-xs font-semibold text-text-secondary hover:text-accent-primary transition-colors"
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
        className="inline-flex items-center px-3 py-1.5 rounded-full bg-bg-subtle hover:bg-bg-accent-soft border border-border-subtle hover:border-border-accent text-xs font-semibold text-text-secondary hover:text-accent-primary transition-colors"
      >
        Pin Visual
      </a>
    </div>
  );
}
