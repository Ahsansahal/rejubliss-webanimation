import type { MetadataRoute } from "next";

/**
 * Search Engine & AI Discovery Crawler Policy (SEO, AEO & GEO)
 *
 * Distinction maintained:
 * 1. Search & AI Retrieval/Citation Crawlers (Googlebot, Bingbot, Applebot,
 *    OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot,
 *    Perplexity-User) are explicitly permitted across all public pages and
 *    static assets (`/_next/static/`, `/images/`, `/llms.txt`).
 * 2. Model-Training Crawlers (`GPTBot`, `ClaudeBot`, `Google-Extended`,
 *    `Applebot-Extended`) preserve the studio's open public discovery posture
 *    while blocking private/API routes. If the studio later chooses to opt out
 *    of foundation-model training while remaining visible in AI search citations,
 *    change `allow: "/"` to `disallow: "/"` on the training-crawler block only.
 */
export default function robots(): MetadataRoute.Robots {
  const disallowedPrivatePaths = ["/api/", "/_next/data/"];

  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-Video",
          "Bingbot",
          "Applebot",
          "DuckDuckBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
        ],
        allow: "/",
        disallow: disallowedPrivatePaths,
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: disallowedPrivatePaths,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPrivatePaths,
      },
    ],
    sitemap: "https://rejubliss.co.uk/sitemap.xml",
    host: "https://rejubliss.co.uk",
  };
}
