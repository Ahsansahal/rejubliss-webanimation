export interface BenefitBlock {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  relatedServiceSlug: string;
}

export interface IndustrySector {
  id: string;
  title: string;
  experienceType: "verified-client" | "studio-showcase" | "service-application";
  experienceLabel: string;
  description: string;
  applicationNote: string;
  image: string;
  imageAlt: string;
  relatedServiceSlugs: string[];
  projectSlugs: string[];
}

export interface ProcessStepItem {
  number: string;
  title: string;
  phaseTag: string;
  description: string;
  approvalGate: string;
  outputs: string[];
  image: string;
  imageAlt: string;
}

export interface WhyChooseStrength {
  id: string;
  title: string;
  description: string;
  proofReference: string;
  iconName:
    | "Compass"
    | "Box"
    | "Cpu"
    | "Eye"
    | "Users"
    | "Layers";
}

export interface ClientTestimonial {
  id: string;
  quote: string;
  author: string;
  initials: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  projectContext: string;
  projectSlug?: string;
}

export interface FaqItem {
  id: string;
  category: "Pricing & Timeline" | "Production & Files" | "Capabilities";
  question: string;
  answer: string;
}

export const STUDIO_STATS = [
  {
    value: "09",
    label: "Specialist Studios",
    detail: "3D, CGI, motion, character & WebGL",
  },
  {
    value: "18",
    label: "Published Studies",
    detail: "10 client suites & 8 R&D showcases",
  },
  {
    value: "115+",
    label: "Delivered Visuals",
    detail: "Packaging, London OOH, print & motion",
  },
  {
    value: "4K",
    label: "Master Pipeline",
    detail: "Broadcast, 300 DPI OOH & 60fps WebGL",
  },
] as const;

export const BENEFIT_BLOCKS: BenefitBlock[] = [
  {
    id: "product-visualization",
    number: "01",
    title: "Product Visualization",
    subtitle: "Showcase products through realistic CGI and 3D animation.",
    description:
      "Present hardware contours, packaging finishes, and multi-flavour SKU ranges in crisp studio detail—even before physical prototypes or print runs are finalized.",
    image: "/images/portfolio/g-natural-botanicals/01-essential-oil-splash.png",
    imageAlt:
      "Photorealistic botanical essential oil bottle with dynamic liquid splash CGI for G Natural Skincare",
    highlights: [
      "Consistent lighting across full SKU ranges",
      "Macro surface, glass & condensation realism",
      "Ready for e-commerce, print & OOH billboards",
    ],
    relatedServiceSlug: "product-visualization",
  },
  {
    id: "visual-storytelling",
    number: "02",
    title: "Visual Storytelling",
    subtitle: "Explain complex ideas through engaging visual communication.",
    description:
      "Distill technical mechanisms, multi-step workflows, and brand narratives into clear, well-paced 2D and 3D motion stories that audiences understand effortlessly.",
    image: "/images/character_animation.jpg",
    imageAlt:
      "Expressive 3D character animation frame with cinematic studio lighting",
    highlights: [
      "Structured narrative & storyboard clarity",
      "Expressive 2D & 3D character or diagram motion",
      "Designed for sound-on and captioned playback",
    ],
    relatedServiceSlug: "character-animation",
  },
  {
    id: "brand-engagement",
    number: "03",
    title: "Brand Engagement",
    subtitle: "Create memorable advertising and campaign experiences.",
    description:
      "Unify out-of-home billboards, retail editorials, and social video campaigns under a single distinctive visual direction that stands apart in crowded markets.",
    image: "/images/portfolio/scoopy-ice-cream/01-escalator-ooh.png",
    imageAlt:
      "Yeah! Scoopy 3D ice cream tub campaign wrapped across a mall escalator",
    highlights: [
      "Cohesive OOH, retail & social campaign suites",
      "Distinctive art direction tailored to your brand",
      "Multi-aspect-ratio masters from a single pipeline",
    ],
    relatedServiceSlug: "cgi-rendering",
  },
  {
    id: "interactive-experiences",
    number: "04",
    title: "Interactive Experiences",
    subtitle: "Improve digital engagement through interactive 3D and WebGL.",
    description:
      "Invite visitors to rotate, customize, and explore products directly inside fast, responsive Next.js websites powered by real-time Three.js and GLSL shaders.",
    image: "/images/hero_laptop.jpg",
    imageAlt:
      "Nexora interactive WebGL digital experience displayed on a modern laptop",
    highlights: [
      "Browser-native 360° 3D exploration",
      "60fps GPU-tuned shaders & responsive UI",
      "Built-in mobile & reduced-motion support",
    ],
    relatedServiceSlug: "interactive-webgl",
  },
];

export const INDUSTRY_SECTORS: IndustrySector[] = [
  {
    id: "luxury-consumer",
    title: "Luxury & Consumer Products",
    experienceType: "verified-client",
    experienceLabel: "Proven Client Portfolio",
    description:
      "From specialty London cafés and frozen desserts to global QSR and consumer health brands, we craft tactile 3D packaging renders, OOH transit wraps, and culturally sharp campaign worlds.",
    applicationNote:
      "Backed by published multi-asset client work for Desi Chai London, Yeah! Scoopy Ice Cream, Nando's, Chatori UK, and Durex.",
    image: "/images/portfolio/desi-chai-london/01-coffee-cup-mockup.jpg",
    imageAlt: "Desi Chai London 3D takeaway cup and brand packaging mockup",
    relatedServiceSlugs: [
      "cgi-rendering",
      "product-visualization",
      "motion-graphics",
    ],
    projectSlugs: [
      "desi-chai-london",
      "scoopy-ice-cream",
      "nandos-peri-peri",
      "durex-social-campaigns",
    ],
  },
  {
    id: "fashion-beauty",
    title: "Fashion & Beauty",
    experienceType: "verified-client",
    experienceLabel: "Proven Client Portfolio",
    description:
      "We help skincare houses, fine jewellers, footwear labels, and textile retailers showcase material luxury—from dynamic essential-oil splash VFX to selective-gold bridal editorials and 3D footwear configurators.",
    applicationNote:
      "Backed by client campaigns for Gul Ahmed, Lure Fine Jewellery, and G Natural Skincare, plus our Strata 3D footwear configurator.",
    image: "/images/portfolio/lure-luxury-jewellery/01-bridal-editorial.png",
    imageAlt: "Lure Fine Jewellery monochrome bridal editorial with 24K gold highlights",
    relatedServiceSlugs: [
      "product-visualization",
      "cgi-rendering",
      "interactive-webgl",
    ],
    projectSlugs: [
      "lure-luxury-jewellery",
      "g-natural-botanicals",
      "gul-ahmed-campaigns",
      "strata-ecommerce-3d",
    ],
  },
  {
    id: "healthcare-medtech",
    title: "Healthcare, Wellness & MedTech",
    experienceType: "verified-client",
    experienceLabel: "Client Experience & MedTech Application",
    description:
      "Precision 3D hardware visualization and clear visual storytelling for wellness devices, recovery technology, and health/inclusion awareness—adaptable to medical device demonstrations and clinical explainers.",
    applicationNote:
      "Demonstrated in our 360° London Underground hardware launch for Rezilo Wellness and awareness suite for Dewa Trust; directly applicable to medical technology teams.",
    image: "/images/portfolio/rezilo-recovery/01-paddington-billboard.png",
    imageAlt: "Rezilo Wellness 3D muscle-recovery device on a Paddington Underground billboard",
    relatedServiceSlugs: [
      "product-visualization",
      "3d-animation",
      "character-animation",
    ],
    projectSlugs: ["rezilo-recovery", "dewa-trust-campaign"],
  },
  {
    id: "technology-software",
    title: "Technology, FinTech & Software",
    experienceType: "studio-showcase",
    experienceLabel: "Studio Showcase & Digital Capability",
    description:
      "High-performance Next.js marketing platforms, interactive WebGL product environments, mobile hardware mockups, and UI motion systems built to clarify sophisticated digital products.",
    applicationNote:
      "Demonstrated across our Nexora WebGL platform, Horizon Wealth portal, Zenith Pay mobile showcase, and Vortex procedural motion studies.",
    image: "/images/ecommerce_web.jpg",
    imageAlt: "Horizon Wealth responsive fintech and e-commerce web interface",
    relatedServiceSlugs: [
      "website-design",
      "interactive-webgl",
      "motion-graphics",
    ],
    projectSlugs: [
      "nexora-kinetic-web",
      "fintech-portal-design",
      "mobile-fintech-brand",
      "vortex-fluid-motion",
    ],
  },
  {
    id: "automotive",
    title: "Automotive",
    experienceType: "studio-showcase",
    experienceLabel: "Studio CGI Capability",
    description:
      "CAD/NURBS surface preparation, active aerodynamic rigging, carbon-fiber and metallic paint shaders, and raytraced studio or night-street commercial sequences.",
    applicationNote:
      "Demonstrated through our Velox Hypercar 4K raytraced studio commercial showcase for vehicle launches, EV components, and mobility concepts.",
    image: "/images/car_3d.jpg",
    imageAlt: "Velox Hypercar 4K raytraced 3D automotive render",
    relatedServiceSlugs: [
      "3d-animation",
      "cgi-rendering",
      "interactive-webgl",
    ],
    projectSlugs: ["velox-automotive-commercial"],
  },
  {
    id: "architecture-real-estate",
    title: "Architecture & Real Estate",
    experienceType: "service-application",
    experienceLabel: "Spatial CGI & Applied Capability",
    description:
      "Photorealistic storefront signage, retail interior concepts, transit/mall environmental wraps, and off-plan exterior/interior visualization for property and hospitality spaces.",
    applicationNote:
      "Applied in retail signage & transit OOH visualizations for Desi Chai London and Yeah! Scoopy, and available for architectural developments and interior fit-outs.",
    image: "/images/portfolio/desi-chai-london/04-storefront-signage.jpg",
    imageAlt: "Desi Chai London illuminated storefront architectural signage visualization",
    relatedServiceSlugs: [
      "architectural-visualization",
      "cgi-rendering",
      "interactive-webgl",
    ],
    projectSlugs: ["desi-chai-london", "scoopy-ice-cream"],
  },
  {
    id: "industrial-manufacturing",
    title: "Industrial & Manufacturing",
    experienceType: "service-application",
    experienceLabel: "Potential Service Application",
    description:
      "Turn engineering STEP/CAD assemblies and complex industrial machinery into clean exploded-view animations, cutaway renders, and trade-show product demonstrations.",
    applicationNote:
      "Service application leveraging Rejubliss's hard-surface CAD surfacing, PBR material accuracy, and mechanical rigging pipeline.",
    image: "/images/portfolio/rezilo-recovery/04-evening-recovery.jpg",
    imageAlt: "Precision dark-studio hard-surface 3D hardware visualization",
    relatedServiceSlugs: [
      "3d-animation",
      "product-visualization",
      "cgi-rendering",
    ],
    projectSlugs: ["rezilo-recovery", "velox-automotive-commercial"],
  },
];

export const PRODUCTION_PROCESS_STEPS: ProcessStepItem[] = [
  {
    number: "01",
    title: "Discovery & Brief",
    phaseTag: "Alignment",
    description:
      "We review your product, target audience, distribution channels, existing CAD/brand assets, and commercial goals to establish a clear scope, schedule, and deliverable list.",
    approvalGate: "Approved project brief, scope & milestone schedule",
    outputs: [
      "Creative & technical brief review",
      "Channel & aspect-ratio specification",
      "Itemised production timeline",
    ],
    image: "/images/portfolio/desi-chai-london/09-brand-voice-type.jpg",
    imageAlt: "Brand strategy and typographic planning board",
  },
  {
    number: "02",
    title: "Concept & Creative Direction",
    phaseTag: "Visual Vision",
    description:
      "Our directors define the visual language—crafting lighting moodboards, material studies, motion references, and key styleframes tailored to your brand identity.",
    approvalGate: "Creative direction & styleframe sign-off",
    outputs: [
      "Visual treatment & lighting references",
      "Color, surface & typography direction",
      "Look-development hero styleframe",
    ],
    image: "/images/portfolio/desi-chai-london/10-color-palette.jpg",
    imageAlt: "Color palette and creative direction system",
  },
  {
    number: "03",
    title: "Storyboard & Design",
    phaseTag: "Blueprint",
    description:
      "Before full production begins, we map out scene-by-scene storyboards, camera animatics, 3D geometry/wireframes, or interactive Figma UI prototypes so pacing and framing are locked early.",
    approvalGate: "Storyboard, animatic & 3D model/UI layout sign-off",
    outputs: [
      "Scene-by-scene storyboard or UI wireframes",
      "3D clay/geometry & camera timing preview",
      "Asset & copy placement check",
    ],
    image: "/images/portfolio/rezilo-recovery/02-social-ui-ecosystem.png",
    imageAlt: "Structured multi-screen visual layout and design architecture",
  },
  {
    number: "04",
    title: "Production & Animation",
    phaseTag: "Execution",
    description:
      "Our specialists execute high-detail 3D surfacing, rigging, fluid/particle VFX, raytraced lighting, motion choreography, or React/Three.js WebGL development.",
    approvalGate: "Work-in-progress lighting & motion preview",
    outputs: [
      "PBR texturing, shading & VFX simulation",
      "Character/camera animation or WebGL build",
      "Sound-synced motion & shader polish",
    ],
    image: "/images/cyan_motion.jpg",
    imageAlt: "3D fluid ribbon simulation and studio lighting execution",
  },
  {
    number: "05",
    title: "Review & Refinement",
    phaseTag: "Polish",
    description:
      "We share structured review links, gather consolidated team feedback, and implement agreed refinements across timing, materials, color grading, or responsive interactions.",
    approvalGate: "Final master sign-off prior to full-res export",
    outputs: [
      "Collaborative frame-accurate review rounds",
      "Color grading & audio/motion fine-tuning",
      "Cross-device & QA verification",
    ],
    image: "/images/portfolio/scoopy-ice-cream/02-tubs-on-ice.png",
    imageAlt: "Refined photorealistic 3D packaging render with ice and condensation detail",
  },
  {
    number: "06",
    title: "Final Delivery",
    phaseTag: "Handover",
    description:
      "You receive organized, production-ready masters formatted for every agreed channel—4K ProRes/MP4 films, 300 DPI OOH/print renders, social cutdowns, or deployed web code.",
    approvalGate: "Complete multi-format asset package delivered",
    outputs: [
      "4K / print / social aspect-ratio masters",
      "Optimized WebGL / Next.js deployment",
      "Commercial usage handover & archive",
    ],
    image: "/images/portfolio/rezilo-recovery/01-paddington-billboard.png",
    imageAlt: "Final delivered 3D campaign live on a London Underground billboard",
  },
];

export const WHY_CHOOSE_STRENGTHS: WhyChooseStrength[] = [
  {
    id: "creative-direction",
    title: "Unified Creative Direction & Execution",
    description:
      "Brand identity, 3D CGI, motion design, and interactive web live under one roof—ensuring visual consistency from an Underground billboard to a mobile product page.",
    proofReference: "Demonstrated on Desi Chai London & Rezilo 360° rollouts",
    iconName: "Compass",
  },
  {
    id: "3d-motion-expertise",
    title: "Deep 3D, CGI & Motion Craft",
    description:
      "Specialist command of raytraced lighting, liquid and botanical VFX compositing, character rigging, and 60fps procedural motion across Cinema 4D, Octane, Houdini, and UE5.",
    proofReference: "20+ SKU botanical VFX & 5-flavour CGI packaging suites",
    iconName: "Box",
  },
  {
    id: "technical-webgl",
    title: "Real-Time Web & WebGL Engineering",
    description:
      "Unlike render-only studios, we engineer production Next.js interfaces, Three.js scenes, and custom GLSL shaders that bring 3D assets directly into fast, accessible browsers.",
    proofReference: "React 19, Next.js, Three.js & Draco GLTF pipelines",
    iconName: "Cpu",
  },
  {
    id: "attention-to-detail",
    title: "Obsessive Material & Surface Fidelity",
    description:
      "Every droplet of condensation, carbon-fiber weave, Devanagari letterform, and 24K gold reflection is art-directed to hold up at 4K broadcast and print magnification.",
    proofReference: "300 DPI OOH print & 4K HDR master standards",
    iconName: "Eye",
  },
  {
    id: "collaborative-production",
    title: "Transparent Milestone Collaboration",
    description:
      "Clear approval checkpoints at brief, styleframe, storyboard, and preview stages eliminate guesswork and keep marketing, product, and executive stakeholders aligned.",
    proofReference: "6-stage gated workflow • NDA-protected briefs",
    iconName: "Users",
  },
  {
    id: "multi-format-deliverables",
    title: "Multi-Format Campaign Efficiency",
    description:
      "Build your 3D product scene once and deploy everywhere—16:9 launch films, 9:16 Reels/TikToks, e-commerce stills, retail POS, and interactive 360° web views.",
    proofReference: "Single master pipeline -> OOH, Social, Print & Web",
    iconName: "Layers",
  },
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: "emily-carter",
    quote:
      "Rejubliss transformed our vision into a cohesive interactive web platform and 3D motion system. Their creative direction, responsiveness, and technical attention to detail stood out at every milestone.",
    author: "Emily Carter",
    initials: "EC",
    role: "Marketing Director",
    company: "Nexora",
    avatar: "/images/emily_carter.jpg",
    rating: 5,
    projectContext: "Interactive WebGL Platform & Brand Motion",
    projectSlug: "nexora-kinetic-web",
  },
  {
    id: "marcus-vance",
    quote:
      "The 3D product animations and photorealistic renders exceeded our expectations—giving our team broadcast-grade launch visuals and clear hardware storytelling well ahead of release.",
    author: "Marcus Vance",
    initials: "MV",
    role: "VP of Product",
    company: "Avelon",
    rating: 5,
    projectContext: "3D Product Visualization & Launch Film",
    projectSlug: "rezilo-recovery",
  },
];

export const VERIFIED_CLIENT_BRANDS = [
  {
    name: "Gul Ahmed",
    sector: "Enterprise Retail & Fashion",
    projectSlug: "gul-ahmed-campaigns",
  },
  {
    name: "Nando's",
    sector: "Global Hospitality Creative",
    projectSlug: "nandos-peri-peri",
  },
  {
    name: "Durex (#PlaySafe)",
    sector: "Conceptual Social Campaigns",
    projectSlug: "durex-social-campaigns",
  },
  {
    name: "Rezilo Wellness",
    sector: "3D Hardware CGI & London OOH",
    projectSlug: "rezilo-recovery",
  },
  {
    name: "Desi Chai London",
    sector: "Brand Identity & 3D Packaging",
    projectSlug: "desi-chai-london",
  },
  {
    name: "Yeah! Scoopy",
    sector: "3D Packaging & Mall OOH",
    projectSlug: "scoopy-ice-cream",
  },
  {
    name: "Lure Fine Jewellery",
    sector: "Luxury Bridal Editorial",
    projectSlug: "lure-luxury-jewellery",
  },
  {
    name: "G Natural Skincare",
    sector: "Botanical Product VFX",
    projectSlug: "g-natural-botanicals",
  },
  {
    name: "Chatori UK",
    sector: "Pop-Art Brand & Print Suite",
    projectSlug: "chatori-street-food",
  },
  {
    name: "Dewa Trust",
    sector: "Social Impact Campaign",
    projectSlug: "dewa-trust-campaign",
  },
] as const;

export const STUDIO_ACCOLADES = [
  "London, UK Studio",
  "Cinema 4D · Octane · Houdini",
  "Unreal Engine 5 Pipeline",
  "Three.js & React 19 WebGL",
  "300 DPI Print & OOH Ready",
  "NDA-Protected Production",
] as const;

export const STUDIO_FAQS: FaqItem[] = [
  {
    id: "faq-cost",
    category: "Pricing & Timeline",
    question: "How much does a 3D animation or CGI project cost?",
    answer:
      "Every commission is scoped individually based on runtime, whether CAD models already exist, material/VFX complexity, and deliverable formats. Share your brief above and we will return a clear, itemised proposal within one business day.",
  },
  {
    id: "faq-timeline",
    category: "Pricing & Timeline",
    question: "How long does a typical production take?",
    answer:
      "Photorealistic product and packaging stills typically take 1–2 weeks. A 15–60 second 3D animation or motion film takes 2–4 weeks, while interactive WebGL websites and bespoke character stories span 4–8 weeks.",
  },
  {
    id: "faq-start-info",
    category: "Pricing & Timeline",
    question: "What do you need from us to start?",
    answer:
      "A brief overview of your product, target channels, launch window, and any existing CAD files, packaging dielines, or product references. If you are starting from a concept, our directors handle creative direction from scratch.",
  },
  {
    id: "faq-existing-models",
    category: "Production & Files",
    question: "Do you handle 3D modeling, or can you work from our CAD files?",
    answer:
      "Both. We ingest engineering STEP, IGES, SolidWorks, FBX, OBJ, Blender, and GLTF files—or sculpt and model products, packaging, characters, and environments entirely in-house.",
  },
  {
    id: "faq-revisions",
    category: "Production & Files",
    question: "How do approvals and revisions work?",
    answer:
      "Every stage—styleframes, storyboards/animatics, and lighting/motion previews—includes two structured feedback rounds so direction is locked cleanly before final 4K rendering or deployment.",
  },
  {
    id: "faq-ads-social",
    category: "Capabilities",
    question: "Can one 3D scene cover web, social, and out-of-home formats?",
    answer:
      "Yes. Building your product world in 3D allows us to export 16:9 launch films, 9:16 Reels/TikToks, 300 DPI billboard masters, and real-time WebGL assets from a single unified pipeline.",
  },
  {
    id: "faq-source-files",
    category: "Production & Files",
    question: "Are commercial usage rights and source files available?",
    answer:
      "Full commercial usage rights for all agreed final masters are included upon completion, and raw working project files (Cinema 4D, Blender, After Effects, GLTF) can be scoped whenever required.",
  },
];
