/**
 * Canonical production origin & official company address for Rejubliss.
 * Matches Vercel's primary `200 OK` domain (`https://www.rejubliss.co.uk`,
 * where apex `rejubliss.co.uk` issues a `308 Permanent Redirect` to `www`).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.rejubliss.co.uk"
).replace(/\/+$/, "");

export const STUDIO_ADDRESS = {
  full: "18 Blythe Wood Court, Waterloo Road, Uxbridge, United Kingdom, UB8 2SP",
  streetAddress: "18 Blythe Wood Court, Waterloo Road",
  addressLocality: "Uxbridge",
  addressRegion: "Greater London",
  postalCode: "UB8 2SP",
  addressCountry: "GB",
} as const;
