import portfolioData from "./portfolio.json";

export type PortfolioCategory =
  | "All"
  | "3D, CGI & Packaging"
  | "Brand & Campaign Creative"
  | "Web Design & WebGL"
  | "Motion & Character";

export interface CaseStudyDetail {
  industry: string;
  projectTypeLabel: "Client Case Study" | "Studio Capability Showcase";
  overview: string;
  challenge: string;
  creativeDirection: string;
  productionApproach: string;
  finalOutput: string;
  verifiedOutcome?: string;
}

export interface EnrichedProject {
  id: string;
  slug: string;
  num: string;
  title: string;
  fullTitle: string;
  subtitle: string;
  client: string;
  genre: string;
  portfolioCategory: Exclude<PortfolioCategory, "All">;
  badge: string;
  badgeColor: string;
  rating: number;
  reviewsCount: number;
  impactMetric: string;
  tags: string[];
  image: string;
  gallery: string[];
  synopsis: string;
  deliverables: string[];
  relatedServiceSlugs: string[];
  isFlagshipCaseStudy: boolean;
  caseStudy: CaseStudyDetail;
}

interface RawPortfolioEntry {
  slug: string;
  title: string;
  client: string;
  genre: string;
  category?: string;
  featuredFilter?: "web" | "3d" | "2d" | "graphic" | "motion";
  badge?: string;
  rating?: number;
  reviewsCount?: number;
  impactMetric?: string;
  tags?: string[];
  image: string;
  gallery?: string[];
  metaDescription?: string;
  scope?: string[];
}

const CASE_STUDY_DETAILS: Record<
  string,
  CaseStudyDetail & {
    portfolioCategory: Exclude<PortfolioCategory, "All">;
    relatedServiceSlugs: string[];
    isFlagshipCaseStudy?: boolean;
  }
> = {
  "desi-chai-london": {
    industry: "Food, Beverage & Hospitality",
    projectTypeLabel: "Client Case Study",
    portfolioCategory: "3D, CGI & Packaging",
    isFlagshipCaseStudy: true,
    relatedServiceSlugs: [
      "cgi-rendering",
      "product-visualization",
      "architectural-visualization",
    ],
    overview:
      "Desi Chai London commissioned Rejubliss to develop a complete visual identity, 3D packaging ecosystem, and physical storefront signage system celebrating authentic South Asian street-chai culture in a refined London retail setting.",
    challenge:
      "Stand out in London's competitive specialty café landscape with an unmistakable cultural identity that translates cleanly across hot-beverage cups, maska bun food sleeves, kraft takeaway bags, barista collateral, and illuminated exterior signage.",
    creativeDirection:
      "Paired a bespoke Devanagari-inspired geometric wordmark with warm spiced terracotta, saffron, and deep teal accents—anchored by tactile 3D packaging renders and ornamental heritage pattern work.",
    productionApproach:
      "Built custom typographic guidelines and color systems alongside photorealistic 3D cup, sleeve, and kraft-bag mockups, plus perspective architectural signage renders to preview street-level visibility prior to print and fabrication.",
    finalOutput:
      "An integrated 11-piece brand, packaging CGI, and storefront signage suite ready for print production and café rollout.",
    verifiedOutcome: "11-Piece Brand, 3D Packaging & Storefront Suite Delivered",
  },
  "scoopy-ice-cream": {
    industry: "FMCG & Frozen Desserts",
    projectTypeLabel: "Client Case Study",
    portfolioCategory: "3D, CGI & Packaging",
    isFlagshipCaseStudy: true,
    relatedServiceSlugs: [
      "cgi-rendering",
      "product-visualization",
      "architectural-visualization",
    ],
    overview:
      "For Yeah! Scoopy Ice Cream, Rejubliss produced photorealistic 3D tub packaging visualizations and high-visibility mall out-of-home wraps spanning five signature flavours.",
    challenge:
      "Ice cream photography melts under studio lights and struggles to maintain consistent frost, condensation, and scoop textures across five distinct flavour SKUs and giant vertical elevator/escalator formats.",
    creativeDirection:
      "Crafted vibrant, appetite-led 3D scenes pairing ice-bed condensation physics and fresh fruit/ingredient styling with playful flavour-coded colour worlds.",
    productionApproach:
      "Modeled the complete 5-SKU tub range in 3D with physically based frost and water-droplet shaders, then composited ultra-high-resolution renders into mall escalator balustrades, lift doors, and wide campaign key visuals.",
    finalOutput:
      "11 high-resolution 3D product, lifestyle editorial, and mall OOH wrap masters across five flavours.",
    verifiedOutcome: "5 Flavour SKUs + Mall Escalator & Lift OOH Rollout",
  },
  "rezilo-recovery": {
    industry: "Wellness & Consumer Hardware",
    projectTypeLabel: "Client Case Study",
    portfolioCategory: "3D, CGI & Packaging",
    isFlagshipCaseStudy: true,
    relatedServiceSlugs: [
      "product-visualization",
      "3d-animation",
      "cgi-rendering",
    ],
    overview:
      "Rejubliss partnered with Rezilo Wellness to execute a 360-degree visual launch for its portable muscle-recovery hardware across London Underground billboards, bus shelters, and social channels.",
    challenge:
      "Introduce a new physical recovery device with premium hardware authority across large-format London commuter sites (including Paddington Underground) while keeping social content cohesive across Instagram, Facebook, and TikTok.",
    creativeDirection:
      "Adopted a sleek dark-studio industrial aesthetic with rim-lit cyan accents that highlight ergonomic contours, matte anodized textures, and evening recovery routines.",
    productionApproach:
      "Created studio-lit 3D hardware product CGI, wordmark lockups in light and deep-blue variants, environmental OOH placements for Underground and bus-shelter specs, and a unified multi-platform social UI feed system.",
    finalOutput:
      "11-asset integrated hardware CGI, London OOH billboard, and social launch ecosystem.",
    verifiedOutcome: "360° London Underground OOH & Multi-Channel Social Launch",
  },
  "g-natural-botanicals": {
    industry: "Beauty, Skincare & Botanicals",
    projectTypeLabel: "Client Case Study",
    portfolioCategory: "3D, CGI & Packaging",
    isFlagshipCaseStudy: true,
    relatedServiceSlugs: ["product-visualization", "cgi-rendering"],
    overview:
      "A 20-asset product visualization and educational carousel campaign for G Natural Skincare's pure essential oil collection.",
    challenge:
      "Communicate botanical purity, ingredient potency, and multi-oil differentiation digitally without repetitive flat bottle photography.",
    creativeDirection:
      "Combined luminous golden oil-splash VFX and fresh botanical ingredient framing (citrus peel, herbs, droplets) with clean editorial skincare typography.",
    productionApproach:
      "Composited dynamic liquid oil splashes, glass refraction highlights, and botanical props around each dropper bottle SKU, paired with seamless 4-part educational Instagram carousels.",
    finalOutput:
      "20 coordinated SKU hero visuals and multi-slide social carousels.",
    verifiedOutcome: "20+ SKU Product VFX & Seamless Carousel Visuals",
  },
  "gul-ahmed-campaigns": {
    industry: "Fashion, Textiles & Enterprise Retail",
    projectTypeLabel: "Client Case Study",
    portfolioCategory: "Brand & Campaign Creative",
    isFlagshipCaseStudy: true,
    relatedServiceSlugs: ["website-design", "motion-graphics"],
    overview:
      "Digital retail key visuals, e-commerce promotional banners, and vertical story suites produced for enterprise textile and fashion retailer Gul Ahmed.",
    challenge:
      "Deliver high-clarity promotional creatives across diverse seasonal verticals—fashion clearances, year-end home textiles, kids' winter collections, and flash countdown sales—under rapid retail timelines.",
    creativeDirection:
      "Balanced editorial fashion and home photography with bold conversion hierarchy, urgent sale badges, and clean mobile-first story framing.",
    productionApproach:
      "Designed modular campaign layouts optimized simultaneously for web hero placements, paid social feeds, and 9:16 vertical stories.",
    finalOutput:
      "9-piece seasonal retail and e-commerce campaign creative suite.",
    verifiedOutcome: "Multi-Category Retail & E-Commerce Campaign Suite",
  },
  "lure-luxury-jewellery": {
    industry: "Luxury Bridal & Fine Jewellery",
    projectTypeLabel: "Client Case Study",
    portfolioCategory: "Brand & Campaign Creative",
    isFlagshipCaseStudy: true,
    relatedServiceSlugs: ["cgi-rendering", "product-visualization"],
    overview:
      "Refined luxury bridal and exhibition campaign series crafted for Lure Fine Jewellery across seasonal showcases and private trunk exhibitions.",
    challenge:
      "Draw immediate visual focus to intricate 24K gold filigree and gemstone settings in crowded social feeds while preserving a timeless haute-joaillerie atmosphere.",
    creativeDirection:
      "Developed a signature monochrome editorial portrait aesthetic contrasted with selective warm 24K gold and gemstone color isolation.",
    productionApproach:
      "Executed precision selective-color retouching, serif exhibition typography, bridal lookbook compositions, Mother's Day tributes, and cohesive Instagram grid curation.",
    finalOutput:
      "9 luxury editorial campaign visuals and exhibition invitation assets.",
    verifiedOutcome: "9-Piece Bridal Editorial & Eid Exhibition Suite",
  },
  "chatori-street-food": {
    industry: "Hospitality & Casual Dining",
    projectTypeLabel: "Client Case Study",
    portfolioCategory: "Brand & Campaign Creative",
    isFlagshipCaseStudy: false,
    relatedServiceSlugs: ["character-animation", "motion-graphics"],
    overview:
      "Vibrant Indian pop-art brand world, custom comic illustrations, and full restaurant print menu architecture for Chatori UK.",
    challenge:
      "Break away from generic restaurant templates with a bold, youth-friendly visual personality across dine-in menus and social posters.",
    creativeDirection:
      "Fused halftone comic-book portraiture and electric magenta/saffron palettes with witty Desi wordplay ('Naan Sense', pani-puri pop-art).",
    productionApproach:
      "Created custom brush logotypes, halftone character illustrations, structured multi-category print menus, and shareable campaign posters.",
    finalOutput:
      "12-piece brand world, character pop-art, and restaurant menu suite.",
    verifiedOutcome: "12-Piece Brand Identity, Print Menu & Poster Suite",
  },
  "nandos-peri-peri": {
    industry: "Global QSR & Hospitality",
    projectTypeLabel: "Client Case Study",
    portfolioCategory: "Brand & Campaign Creative",
    isFlagshipCaseStudy: false,
    relatedServiceSlugs: ["motion-graphics", "product-visualization"],
    overview:
      "Culturally resonant social creatives and flame-grilled platter visuals blending pop-culture concepts with signature PERi-PERi typography.",
    challenge:
      "Keep social food marketing fresh, witty, and immediately recognizable while spotlighting core platter combinations and heat levels.",
    creativeDirection:
      "Paired high-contrast food styling and textured hand-crafted display type with playful topical hooks.",
    productionApproach:
      "Composed hero platter posters, sauce lineup graphics, and social concept ads tailored for high organic shareability.",
    finalOutput: "4-piece cultural social and menu creative series.",
  },
  "durex-social-campaigns": {
    industry: "Consumer Health & FMCG",
    projectTypeLabel: "Client Case Study",
    portfolioCategory: "Brand & Campaign Creative",
    isFlagshipCaseStudy: false,
    relatedServiceSlugs: ["motion-graphics", "cgi-rendering"],
    overview:
      "Conceptual minimalist social ads and neon topical spots crafted around clever visual metaphors for #PlaySafe digital channels.",
    challenge:
      "Communicate product benefits and seasonal calendar moments (such as New Year campaigns) through smart, tasteful visual wit.",
    creativeDirection:
      "Minimalist dark-blue nocturnal atmospheres illuminated by neon glow typography and single-object visual metaphors.",
    productionApproach:
      "Designed custom neon tube lettering treatments, studio object composites, and concise copy-driven social ad frames.",
    finalOutput: "6-piece conceptual social advertising series.",
  },
  "dewa-trust-campaign": {
    industry: "Non-Profit, Education & Social Impact",
    projectTypeLabel: "Client Case Study",
    portfolioCategory: "Brand & Campaign Creative",
    isFlagshipCaseStudy: false,
    relatedServiceSlugs: [
      "explainer-videos",
      "character-animation",
      "website-design",
    ],
    overview:
      "Uplifting 'Born to Stand Out' awareness and fundraising visual system celebrating student creativity, inclusion, and empowerment for Dewa Trust.",
    challenge:
      "Build an approachable, dignified, and energetic visual language spanning World Art Day showcases and monthly donor awareness posts.",
    creativeDirection:
      "Warm sunshine-yellow brush-stroke frames and hand-drawn celebratory doodles spotlighting student stories and artwork.",
    productionApproach:
      "Developed modular banner templates, custom hand-drawn iconography, and a 13-piece social storytelling suite.",
    finalOutput: "13-piece social impact and awareness visual suite.",
    verifiedOutcome: "13-Piece Inclusion & Awareness Campaign Suite",
  },
  "velox-automotive-commercial": {
    industry: "Automotive & Mobility",
    projectTypeLabel: "Studio Capability Showcase",
    portfolioCategory: "3D, CGI & Packaging",
    isFlagshipCaseStudy: false,
    relatedServiceSlugs: ["3d-animation", "cgi-rendering"],
    overview:
      "Cinematic 3D automotive commercial showcase demonstrating Rejubliss's hard-surface NURBS surfacing, rigging, and wet-asphalt raytraced lighting pipeline.",
    challenge:
      "Achieve photorealistic carbon-fiber weave reflections, active aerodynamic rigging, and nocturnal city reflections at 4K broadcast resolution.",
    creativeDirection:
      "High-contrast nocturnal cyberpunk-inspired street lighting with crisp cyan/sapphire rim reflections across sculpted bodywork.",
    productionApproach:
      "CAD/NURBS surface preparation, wheel and active-aero rigging, HDRI night environment building, and Octane raytraced rendering.",
    finalOutput: "4K HDR raytraced automotive commercial showcase.",
  },
  "nexora-kinetic-web": {
    industry: "Technology & SaaS",
    projectTypeLabel: "Studio Capability Showcase",
    portfolioCategory: "Web Design & WebGL",
    isFlagshipCaseStudy: true,
    relatedServiceSlugs: ["interactive-webgl", "website-design"],
    overview:
      "Interactive Next.js and Three.js WebGL platform combining real-time particle physics, custom GLSL shaders, and editorial UI choreography.",
    challenge:
      "Deliver an immersive 3D browser experience without sacrificing Core Web Vitals, accessibility, or mobile responsiveness.",
    creativeDirection:
      "Crystalline cyan particle ribbons suspended in an airy editorial grid with tactile glassmorphic controls.",
    productionApproach:
      "Engineered deterministic React Three Fiber particle geometries, GPU-accelerated shaders, and code-split dynamic canvas loading.",
    finalOutput:
      "Responsive Next.js + Three.js interactive web platform across desktop and tablet.",
  },
  "lumina-character-3d": {
    industry: "Entertainment & Narrative Media",
    projectTypeLabel: "Studio Capability Showcase",
    portfolioCategory: "Motion & Character",
    isFlagshipCaseStudy: false,
    relatedServiceSlugs: ["character-animation", "3d-animation"],
    overview:
      "Expressive 3D character production showcase blending stylized facial kinematics, subsurface skin shading, and volumetric Unreal Engine 5 lighting.",
    challenge:
      "Convey nuanced emotion and tactile fabric/skin realism suitable for brand mascots, narrative shorts, and game teasers.",
    creativeDirection:
      "Warm rim-lit cinematic portrait framing with expressive eye rigs and atmospheric depth of field.",
    productionApproach:
      "Custom character modeling, facial blendshape rigging, subsurface scattering shader setup, and real-time UE5 rendering.",
    finalOutput: "Rigged 3D character asset and cinematic render sequence.",
  },
  "vortex-fluid-motion": {
    industry: "Audio, Media & Technology",
    projectTypeLabel: "Studio Capability Showcase",
    portfolioCategory: "Motion & Character",
    isFlagshipCaseStudy: false,
    relatedServiceSlugs: ["motion-graphics", "3d-animation"],
    overview:
      "Procedural Houdini fluid and crystalline ribbon motion showcase synchronized to spatial audio frequencies.",
    challenge:
      "Translate invisible sound waves and brand energy into sculptural, looping 60fps 3D motion graphics.",
    creativeDirection:
      "Translucent liquid-glass cyan ribbons flowing through clean studio space with refractive caustics.",
    productionApproach:
      "Houdini particle advection and ribbon meshing rendered with physically accurate glass refraction for web and broadcast loops.",
    finalOutput: "Seamless 60fps procedural fluid motion visuals.",
  },
  "strata-ecommerce-3d": {
    industry: "Footwear & D2C E-Commerce",
    projectTypeLabel: "Studio Capability Showcase",
    portfolioCategory: "3D, CGI & Packaging",
    isFlagshipCaseStudy: true,
    relatedServiceSlugs: ["interactive-webgl", "product-visualization"],
    overview:
      "Real-time 360-degree 3D footwear visualization and WebGL configurator showcase highlighting knit weaves, sole cushioning, and colorway switching.",
    challenge:
      "Preserve macro textile fidelity inside a lightweight browser-ready GLTF asset that loads rapidly on mobile and desktop.",
    creativeDirection:
      "Floating studio sneaker presentation with crisp contact shadows and interactive material inspection angles.",
    productionApproach:
      "High-to-low-poly normal map baking, Draco GLTF compression, and real-time PBR lighting setup.",
    finalOutput: "WebGL-ready 3D product configurator & studio render pack.",
  },
  "fintech-portal-design": {
    industry: "FinTech & Financial Services",
    projectTypeLabel: "Studio Capability Showcase",
    portfolioCategory: "Web Design & WebGL",
    isFlagshipCaseStudy: false,
    relatedServiceSlugs: ["website-design"],
    overview:
      "High-clarity digital wealth and commerce web architecture combining structured data visualization with refined micro-interactions.",
    challenge:
      "Make dense portfolio metrics and multi-step financial workflows feel effortless, trustworthy, and responsive.",
    creativeDirection:
      "Clean light-mode modular interface with disciplined typographic hierarchy and purposeful Framer Motion transitions.",
    productionApproach:
      "Component-based UI design system, accessible chart layouts, and responsive breakpoint engineering.",
    finalOutput: "Design system and responsive web portal interface.",
  },
  "kinetic-identity-package": {
    industry: "Broadcast & Streaming Media",
    projectTypeLabel: "Studio Capability Showcase",
    portfolioCategory: "Motion & Character",
    isFlagshipCaseStudy: false,
    relatedServiceSlugs: ["motion-graphics"],
    overview:
      "Comprehensive broadcast motion identity system featuring 3D ribbon transitions, kinetic title stings, lower thirds, and Lottie assets.",
    challenge:
      "Create a flexible motion toolkit that scales across 4K broadcast intros, live stream overlays, and digital social bumpers.",
    creativeDirection:
      "Sculptural metallic-gold and sapphire ribbon sweeps paired with razor-sharp broadcast typography.",
    productionApproach:
      "Cinema 4D 3D title renders combined with expression-rigged After Effects templates and exported Lottie JSON animations.",
    finalOutput: "60fps broadcast motion package & motion style guide.",
  },
  "mobile-fintech-brand": {
    industry: "Mobile FinTech & Consumer Apps",
    projectTypeLabel: "Studio Capability Showcase",
    portfolioCategory: "Web Design & WebGL",
    isFlagshipCaseStudy: false,
    relatedServiceSlugs: ["website-design", "product-visualization"],
    overview:
      "Mobile-first product showcase pairing 3D smartphone device renders with tactile payment and biometric UI flows.",
    challenge:
      "Present mobile app security and instant tap-to-pay speed convincingly across product landing pages and App Store previews.",
    creativeDirection:
      "Sleek angled 3D hardware mockups framing high-contrast mobile UI cards.",
    productionApproach:
      "Mobile UX prototyping, 3D device rendering, and interactive product walkthrough sequences.",
    finalOutput: "Mobile UX system, 3D device renders & launch preview assets.",
  },
};

function getBadgeColor(cat: Exclude<PortfolioCategory, "All">): string {
  switch (cat) {
    case "3D, CGI & Packaging":
      return "bg-bg-accent-soft text-accent-primary border-border-accent";
    case "Web Design & WebGL":
      return "bg-bg-subtle text-accent-interactive border-border-strong";
    case "Motion & Character":
      return "bg-bg-accent-soft text-accent-highlight border-border-accent";
    case "Brand & Campaign Creative":
    default:
      return "bg-bg-subtle text-text-heading border-border-subtle";
  }
}

export const ALL_PORTFOLIO_PROJECTS: EnrichedProject[] = (
  portfolioData as RawPortfolioEntry[]
).map((p, idx) => {
  const detail = CASE_STUDY_DETAILS[p.slug];
  const portfolioCategory: Exclude<PortfolioCategory, "All"> =
    detail?.portfolioCategory || "Brand & Campaign Creative";

  let title = p.title;
  let subtitle = p.genre;
  if (p.title.includes(":")) {
    const parts = p.title.split(":");
    title = parts[0].trim();
    subtitle = parts.slice(1).join(":").trim();
  }

  const gallery = p.gallery && p.gallery.length > 0 ? p.gallery : [p.image];

  return {
    id: p.slug,
    slug: p.slug,
    num: String(idx + 1).padStart(2, "0"),
    title,
    fullTitle: p.title,
    subtitle,
    client: p.client,
    genre: p.genre,
    portfolioCategory,
    badge: p.badge || "Featured Project",
    badgeColor: getBadgeColor(portfolioCategory),
    rating: p.rating || 4.9,
    reviewsCount: p.reviewsCount || 200,
    impactMetric: p.impactMetric || `${gallery.length} Production Assets`,
    tags: p.tags || ["3D CGI", "Art Direction", "Multi-Format"],
    image: p.image,
    gallery,
    synopsis: p.metaDescription || p.title,
    deliverables: p.scope || [
      "Creative Direction",
      "3D & Visual Production",
      "Multi-Channel Delivery",
    ],
    relatedServiceSlugs: detail?.relatedServiceSlugs || ["3d-animation"],
    isFlagshipCaseStudy: Boolean(detail?.isFlagshipCaseStudy),
    caseStudy: detail || {
      industry: "Brand & Digital",
      projectTypeLabel: "Client Case Study",
      overview: p.metaDescription || p.title,
      challenge:
        "Create distinctive, production-ready visual assets tailored to multi-channel brand communication.",
      creativeDirection:
        "Refined studio lighting, bold typographic hierarchy, and cohesive colour direction.",
      productionApproach:
        "End-to-end concepting, visual execution, review refinement, and multi-format export.",
      finalOutput: "Complete multi-channel creative asset suite.",
    },
  };
});

export function getProjectBySlug(slug: string): EnrichedProject | undefined {
  return ALL_PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsBySlugs(slugs: string[]): EnrichedProject[] {
  const slugSet = new Set(slugs);
  return ALL_PORTFOLIO_PROJECTS.filter((p) => slugSet.has(p.slug));
}
