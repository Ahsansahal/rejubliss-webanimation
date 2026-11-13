import type { MetadataRoute } from "next";
import { STUDIO_SERVICES } from "@/data/services";
import { ALL_PORTFOLIO_PROJECTS } from "@/data/portfolio";

const BASE_URL = "https://rejubliss.co.uk";
const CONTENT_LAST_MODIFIED = "2026-11-13";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        `${BASE_URL}/images/portfolio/rezilo-recovery/01-paddington-billboard.png`,
        `${BASE_URL}/images/portfolio/scoopy-ice-cream/02-tubs-on-ice.png`,
        `${BASE_URL}/images/car_3d.jpg`,
        `${BASE_URL}/images/hero_laptop.jpg`,
      ],
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = STUDIO_SERVICES.map((srv) => ({
    url: `${BASE_URL}/services/${srv.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.85,
    images: [`${BASE_URL}${srv.heroImage}`],
  }));

  const workRoutes: MetadataRoute.Sitemap = ALL_PORTFOLIO_PROJECTS.map(
    (proj) => ({
      url: `${BASE_URL}/work/${proj.slug}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: proj.isFlagshipCaseStudy ? 0.8 : 0.7,
      images: [`${BASE_URL}${proj.image}`],
    })
  );

  return [...staticRoutes, ...serviceRoutes, ...workRoutes];
}
