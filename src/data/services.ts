export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceIndustryFit {
  sector: string;
  useCase: string;
}

export interface StudioService {
  slug: string;
  title: string;
  shortTitle: string;
  h1Heading: string;
  badge: string;
  iconName:
    | "Box"
    | "Sparkles"
    | "Layers"
    | "Activity"
    | "Film"
    | "Building2"
    | "Monitor"
    | "Globe";
  heroImage: string;
  secondaryImage: string;
  summary: string;
  directDefinition: string;
  whatWeCreate: string;
  businessNeed: string;
  idealClients: string;
  problemsSolved: string[];
  whatIsIncluded: string[];
  deliverables: string[];
  applications: string[];
  industriesServed: ServiceIndustryFit[];
  processHighlights: { step: string; detail: string }[];
  whyChoosePoints: { title: string; description: string }[];
  faqs: ServiceFaqItem[];
  toolsAndPipeline: string[];
  relatedProjectSlugs: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  tagline: string;
  serviceSlug: string;
  inquiryServiceValue: string;
  image: string;
  whatIsIncluded: string[];
  deliverables: string[];
  applications: string[];
}

export interface SolutionGroup {
  id: "3d-cgi" | "motion-storytelling" | "digital-experiences";
  label: string;
  eyebrow: string;
  description: string;
  solutions: SolutionItem[];
}

export const STUDIO_SERVICES: StudioService[] = [
  {
    slug: "3d-animation",
    title: "3D Animation",
    shortTitle: "3D Animation",
    h1Heading: "3D Animation Studio in London for Cinematic Product & Launch Films",
    badge: "Cinematic 3D",
    iconName: "Box",
    heroImage: "/images/car_3d.jpg",
    secondaryImage: "/images/portfolio/rezilo-recovery/04-evening-recovery.jpg",
    summary:
      "Frame-by-frame cinematic 3D sequences, mechanical reveals, and product launch films engineered with physically accurate motion and studio lighting.",
    directDefinition:
      "Rejubliss produces custom 3D animation in London for product launches, hardware demonstrations, and broadcast commercials—combining CAD/3D modeling, physically based shading, Houdini simulations, and raytraced 4K rendering without the physical constraints of live-action shoots.",
    whatWeCreate:
      "Bespoke 3D commercials, exploded mechanical animations, dynamic camera choreography, and atmospheric brand worlds.",
    businessNeed:
      "Demonstrates intricate engineering, internal mechanisms, and product performance without the physical constraints of live-action shoots.",
    idealClients:
      "Automotive brands, consumer hardware innovators, wellness & MedTech teams, luxury product houses, and advertising agencies.",
    problemsSolved: [
      "Showcasing internal mechanisms, sensors, or micro-components impossible to film with a physical camera",
      "Launching flagship hardware on schedule before mass-manufactured units or tooling are finalized",
      "Maintaining identical studio lighting and brand consistency across 16:9 keynote films, 9:16 Reels, and OOH cutdowns",
      "Eliminating costly location permits, physical rigs, and reshoots when product finishes or labels change",
    ],
    whatIsIncluded: [
      "Creative treatment, visual script direction, and scene-by-scene storyboard",
      "3D modeling from scratch or engineering CAD (STEP/IGES/SolidWorks) topology clean-up",
      "Viewport camera animatic to lock timing and pacing prior to rendering",
      "PBR material shading, physics/fluid VFX simulations, and raytraced studio lighting",
      "ACES color grading, sound-sync timing polish, and two structured review rounds per stage",
    ],
    deliverables: [
      "4K UHD master animations (Apple ProRes 422 HQ & high-bitrate H.264/MP4)",
      "16:9 widescreen, 9:16 vertical & 1:1 paid-social cutdowns with safe-zone framing",
      "Clean alpha-channel product passes & 300 DPI hero still frames from key shots",
      "Storyboard, animatic & lighting styleframe sign-off packs",
    ],
    applications: [
      "Flagship product launch & unboxing films",
      "Broadcast, cinema & connected-TV commercials",
      "Trade show, exhibition & keynote LED stage visuals",
      "High-retention paid social video campaigns (YouTube, Meta, LinkedIn, TikTok)",
    ],
    industriesServed: [
      {
        sector: "Automotive & Mobility",
        useCase: "Aerodynamic studies, interior cockpit reveals, and nocturnal raytraced commercials.",
      },
      {
        sector: "Consumer Hardware & Wellness Tech",
        useCase: "Exploded internal motor/battery cutaways and ergonomic feature demonstrations.",
      },
      {
        sector: "Luxury, Watchmaking & Packaging",
        useCase: "Macro metallic, crystal, and glass choreography for global campaign launches.",
      },
      {
        sector: "Industrial & MedTech Devices",
        useCase: "Accurate clinical mechanism walkthroughs for buyer, investor, and practitioner briefings.",
      },
    ],
    processHighlights: [
      {
        step: "01. CAD & Storyboard Lock",
        detail: "We ingest your CAD or reference dimensions and lock shot framing via a grayscale camera animatic.",
      },
      {
        step: "02. Look-Dev Styleframes",
        detail: "Hero still frames establish exact surface shaders, reflections, and lighting mood before full animation.",
      },
      {
        step: "03. Motion & VFX Simulation",
        detail: "Mechanical rigging, camera motion curves, and particle/fluid simulations are reviewed in playblast passes.",
      },
      {
        step: "04. 4K Raytraced Finishing",
        detail: "Multi-pass EXR rendering, ACES color grading, and multi-ratio mastering for broadcast, web, and social.",
      },
    ],
    whyChoosePoints: [
      {
        title: "Engineering-Accurate Topology",
        description:
          "We clean and retopologize raw STEP/IGES engineering assemblies so bevels, tolerances, and ports hold up in extreme macro close-ups.",
      },
      {
        title: "Cross-Channel Asset Reuse",
        description:
          "The same master 3D scene yields your 4K launch film, 300 DPI print billboards, and compressed GLB models for web.",
      },
      {
        title: "Milestone-Gated Predictability",
        description:
          "Every commission includes explicit sign-off checkpoints at brief, styleframe, animatic, and lighting preview.",
      },
    ],
    faqs: [
      {
        question: "How long does a 30-to-60 second 3D product animation take to produce?",
        answer:
          "Most 30–60 second 3D product animations take 3 to 5 weeks from brief sign-off to final 4K delivery, depending on whether engineering CAD files are available and whether fluid or particle VFX simulations are required.",
      },
      {
        question: "Can you create a 3D animation before our physical product prototype exists?",
        answer:
          "Yes. We regularly build photorealistic 3D animations directly from industrial design CAD files (STEP, IGES, SolidWorks), technical drawings, or dimensioned sketches so your marketing campaign is ready ahead of manufacturing.",
      },
      {
        question: "What video resolutions and aspect ratios are included?",
        answer:
          "Standard scopes deliver a 4K UHD (3840×2160) 16:9 master in ProRes and H.264, alongside adapted 9:16 vertical and 1:1 or 4:5 social cutdowns framed cleanly from the original 3D cameras.",
      },
      {
        question: "Can we also extract high-resolution still renders from the 3D animation scene?",
        answer:
          "Absolutely. Once your 3D model, shaders, and studio lighting rig are built for animation, rendering companion 300 DPI print and e-commerce key visuals is fast and keeps your entire launch visually unified.",
      },
    ],
    toolsAndPipeline: [
      "Cinema 4D",
      "Octane & Redshift",
      "Unreal Engine 5",
      "Houdini VFX",
      "Blender",
    ],
    relatedProjectSlugs: [
      "velox-automotive-commercial",
      "rezilo-recovery",
      "scoopy-ice-cream",
      "lumina-character-3d",
    ],
    seoTitle: "3D Animation Studio London | Cinematic Product & CGI Films",
    seoDescription:
      "London 3D animation studio crafting bespoke 4K product launch films, mechanical cutaways, and raytraced CGI commercials for global brands.",
  },
  {
    slug: "cgi-rendering",
    title: "CGI & Photorealistic Rendering",
    shortTitle: "CGI & Rendering",
    h1Heading: "Photorealistic CGI & 3D Rendering Services for Print, OOH & Packaging",
    badge: "Photoreal CGI",
    iconName: "Sparkles",
    heroImage: "/images/portfolio/scoopy-ice-cream/02-tubs-on-ice.png",
    secondaryImage: "/images/portfolio/scoopy-ice-cream/01-escalator-ooh.png",
    summary:
      "Raytraced key visuals, tactile packaging renders, and ultra-high-resolution campaign stills indistinguishable from studio photography.",
    directDefinition:
      "Rejubliss's photorealistic CGI and 3D rendering service creates studio-grade campaign key visuals, multi-SKU packaging suites, and 300 DPI out-of-home billboard masters—delivering pixel-consistent lighting, frost, glass, and foil textures across entire product lines without physical photo shoots.",
    whatWeCreate:
      "Print-ready 3D key visuals, multi-SKU packaging renders, surface condensation/material studies, and out-of-home billboard artwork.",
    businessNeed:
      "Replaces expensive physical location shoots and prototype photography while keeping lighting and color consistent across every SKU.",
    idealClients:
      "FMCG food & beverage brands, retail packaging teams, cosmetics & fragrance houses, and OOH media advertisers.",
    problemsSolved: [
      "Photographing 10–30 flavour or colorway SKUs with identical camera angles, reflections, and label alignment",
      "Producing London Underground, bus-shelter, and mall escalator OOH print masters at 300 DPI without grain or lens distortion",
      "Capturing perishable details—ice crystals, condensation droplets, liquid splashes, or metallic embossing—with repeatable control",
      "Updating packaging artwork or regulatory copy across an entire visual library in hours rather than reshooting",
    ],
    whatIsIncluded: [
      "Art direction, lighting moodboards, and camera composition tests",
      "Precision 3D packaging modeling from dielines, jars, tubs, bottles, or cartons",
      "Micro-surface PBR shader authoring (metallic foil, matte varnish, frosted glass, condensation)",
      "ACES color-managed raytraced rendering and high-bit-depth compositing",
      "Print-ready CMYK/RGB proofing and layered handover files",
    ],
    deliverables: [
      "Ultra-high-resolution print & OOH masters (300 DPI 16-bit TIFF & PNG)",
      "Consistent multi-flavour / multi-colorway SKU render libraries",
      "Layered PSD/EXR passes with separate product, shadow & background layers",
      "E-commerce hero cutouts & art-directed lifestyle environment compositions",
    ],
    applications: [
      "London Underground, mall escalator & bus-shelter OOH wraps",
      "Pre-production packaging launches before physical print runs",
      "Retail POS displays, lightboxes & seasonal campaign key visuals",
      "Amazon A+, Shopify & D2C product detail galleries",
    ],
    industriesServed: [
      {
        sector: "Food, Beverage & QSR",
        useCase: "Frozen dessert tubs on ice, hot-beverage cups, and multi-flavour FMCG retail lines.",
      },
      {
        sector: "Beauty, Skincare & Fragrance",
        useCase: "Refractive amber/frosted glass bottles, serum droppers, and botanical ingredient scenes.",
      },
      {
        sector: "Out-of-Home & Retail Advertising",
        useCase: "Large-format billboard, escalator, and transit shelter campaigns across the UK.",
      },
      {
        sector: "Luxury Goods & Jewellery",
        useCase: "Controlled specular reflections on precious metals, gemstones, and bespoke rigid boxes.",
      },
    ],
    processHighlights: [
      {
        step: "01. Dieline & Reference Intake",
        detail: "We align your AI/PDF packaging dielines and physical finish samples onto clean 3D geometry.",
      },
      {
        step: "02. Material & Lighting Proof",
        detail: "You review shader accuracy—foil sheen, frost crystals, glass refraction—on a single hero SKU first.",
      },
      {
        step: "03. Multi-SKU Batch Rendering",
        detail: "Approved lighting and camera rigs roll out systematically across every flavour, size, or variant.",
      },
      {
        step: "04. Print & Digital Mastering",
        detail: "Final 300 DPI OOH masters and web-compressed PNG/WebP/AVIF sets are delivered with layered shadows.",
      },
    ],
    whyChoosePoints: [
      {
        title: "Proven OOH & Packaging Track Record",
        description:
          "Demonstrated across London Underground billboards for Rezilo Wellness, mall escalator wraps for Yeah! Scoopy, and packaging suites for Desi Chai London.",
      },
      {
        title: "Tactile Physical Realism",
        description:
          "Subsurface scattering, physically accurate IOR glass shaders, and procedural condensation eliminate the 'plastic CGI' look.",
      },
      {
        title: "Effortless Future Label Updates",
        description:
          "Because we preserve structured master scenes, seasonal packaging refreshes only require re-rendering the updated label pass.",
      },
    ],
    faqs: [
      {
        question: "How does CGI rendering compare to traditional product photography?",
        answer:
          "CGI gives you pixel-identical angles across dozens of SKUs, effortless label updates without reshoots, and complete control over frost, liquid splashes, and reflections—even months before physical packaging comes off the press.",
      },
      {
        question: "What resolution can you render for out-of-home billboards?",
        answer:
          "We routinely render 8K to 16K+ 16-bit masters formatted to exact media-owner specifications (including London Underground cross-track billboards, 6-sheets, and mall escalator wraps) with layered shadow and background plates.",
      },
      {
        question: "What files do you need to create photorealistic packaging CGI?",
        answer:
          "Vector packaging dielines (AI, PDF, or EPS), bottle/tub dimensions or CAD drawings, and notes on print finishes such as spot UV, embossing, matte lamination, or metallic foil.",
      },
      {
        question: "Do we receive transparent-background cutouts as well as lifestyle scenes?",
        answer:
          "Yes. Every CGI rendering package can include both art-directed campaign environments and clean alpha-channel PNG/PSD cutouts with separate natural contact shadows for your internal design team.",
      },
    ],
    toolsAndPipeline: [
      "Octane Render",
      "Physically Based Shading (PBR)",
      "Substance 3D",
      "ACES Color Pipeline",
    ],
    relatedProjectSlugs: [
      "scoopy-ice-cream",
      "desi-chai-london",
      "rezilo-recovery",
      "g-natural-botanicals",
    ],
    seoTitle: "Photorealistic CGI & 3D Rendering Services London | Rejubliss",
    seoDescription:
      "Commission photorealistic 3D CGI rendering for packaging, London OOH billboards, luxury key visuals, and multi-SKU retail campaigns.",
  },
  {
    slug: "product-visualization",
    title: "Product Visualization",
    shortTitle: "Product Visualization",
    h1Heading: "3D Product Visualization Services for E-Commerce, Hardware & Skincare",
    badge: "Product CGI",
    iconName: "Layers",
    heroImage: "/images/portfolio/rezilo-recovery/01-paddington-billboard.png",
    secondaryImage: "/images/portfolio/g-natural-botanicals/01-essential-oil-splash.png",
    summary:
      "Precision 3D product showcases, botanical and liquid splash VFX, and 360-degree hardware visuals that highlight every material detail.",
    directDefinition:
      "3D product visualization at Rejubliss transforms physical devices, footwear, cosmetics, and consumer goods into accurate digital product twins—producing hero e-commerce stills, exploded feature callouts, botanical/liquid VFX composites, and interactive 360-degree web assets.",
    whatWeCreate:
      "Dark-studio hardware renders, liquid and botanical compositing, feature callout visuals, and interactive 360° spin sets.",
    businessNeed:
      "Builds buyer confidence online and in retail by making build quality, ingredients, and product ergonomics unmistakably clear.",
    idealClients:
      "Wellness & medical device brands, skincare & botanical labels, consumer electronics, and athletic footwear brands.",
    problemsSolved: [
      "Helping online shoppers inspect industrial design, surface finishes, and ergonomics before purchasing",
      "Visualizing active ingredients, botanical extracts, or internal engineering layers alongside the physical product",
      "Creating cohesive multi-slide product detail page (PDP) and social educational carousels from one 3D twin",
      "Bridging static e-commerce imagery and real-time 360° GLTF/WebGL product viewers without rebuilding geometry",
    ],
    whatIsIncluded: [
      "3D digital twin creation from CAD files, physical samples, or photogrammetry references",
      "Custom material look-development (anodized aluminum, knit textiles, soft-touch silicone, amber glass)",
      "Studio rim-lighting setups plus optional Houdini liquid, mist, or botanical VFX styling",
      "Multi-angle PDP camera suite (hero, 3/4, macro detail, scale/in-situ, and exploded callout views)",
      "Optional low-poly PBR texture baking for Shopify, Amazon, or WebGL 3D viewers",
    ],
    deliverables: [
      "Hero dark-studio & art-directed lifestyle product stills (PNG/WebP/TIFF)",
      "Liquid, mist & botanical splash VFX composites",
      "Multi-slide educational social & PDP feature-callout carousel assets",
      "Web-ready 360° turntable image sequences & Draco-compressed GLB/GLTF 3D models",
    ],
    applications: [
      "Shopify, custom Next.js & Amazon A+ product detail pages",
      "Integrated OOH & paid-social hardware launches",
      "Retail buyer line-sheets, distributor catalogs & investor pitch decks",
      "Instagram, LinkedIn & TikTok product breakdown carousels",
    ],
    industriesServed: [
      {
        sector: "Skincare, Cosmetics & Botanicals",
        useCase: "20+ SKU dropper, jar, and spray suites paired with ingredient splash compositions.",
      },
      {
        sector: "Wellness, Fitness & MedTech Hardware",
        useCase: "Precision dark-studio hardware renders and anatomical/ergonomic benefit callouts.",
      },
      {
        sector: "Footwear, Eyewear & Apparel Accessories",
        useCase: "Macro textile weave shaders and colorway configurator asset libraries.",
      },
      {
        sector: "Consumer Electronics & Audio",
        useCase: "Port, sensor, and acoustic chamber exploded visualizations.",
      },
    ],
    processHighlights: [
      {
        step: "01. Digital Twin Modeling",
        detail: "We construct a clean, subdivision-ready 3D master asset accurate to sub-millimeter product details.",
      },
      {
        step: "02. Surface & VFX Art Direction",
        detail: "Material finishes and optional liquid, condensation, or botanical elements are approved via test frames.",
      },
      {
        step: "03. Multi-Angle PDP Suite",
        detail: "Consistent studio camera angles and exploded feature callouts are rendered across every variant.",
      },
      {
        step: "04. E-Commerce & 3D Export",
        detail: "Optimized stills, social carousels, and optional browser-ready GLB files are packaged by SKU.",
      },
    ],
    whyChoosePoints: [
      {
        title: "20+ SKU Production Scalability",
        description:
          "Proven on multi-product botanical skincare suites (G Natural) and hardware rollouts (Rezilo Wellness) with zero lighting drift.",
      },
      {
        title: "VFX + E-Commerce Under One Roof",
        description:
          "Combine clean white/dark studio packshots with Houdini liquid splashes and interactive 3D web exports in one brief.",
      },
      {
        title: "Conversion-Focused Visual Hierarchy",
        description:
          "Every render angle is planned around how buyers evaluate build quality, scale, and key differentiators on mobile PDPs.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between 3D product visualization and CGI rendering?",
        answer:
          "Product visualization focuses on building a reusable 3D digital twin of your product for e-commerce galleries, exploded feature views, SKU variants, and 360° viewers, whereas campaign CGI rendering focuses on large-format editorial key visuals and out-of-home scenes.",
      },
      {
        question: "Can one 3D product model be used for both static renders and a website 3D viewer?",
        answer:
          "Yes. We build high-resolution master geometry for 4K stills and animation, then bake PBR textures onto a lightweight Draco-compressed GLB model ready for Shopify, Three.js, or mobile AR.",
      },
      {
        question: "How do you match real-world product colors and materials?",
        answer:
          "We reference Pantone/RAL codes, physical material swatches or shipped product samples, and calibrated ACES lighting profiles so metals, plastics, fabrics, and labels match the physical item.",
      },
      {
        question: "How cost-effective is 3D visualization for multi-SKU product ranges?",
        answer:
          "Once the base container/hardware geometry and studio lighting rig are built, additional flavours, labels, or colorways cost a fraction of the initial setup—making 5-to-30 SKU launches significantly faster than studio photography.",
      },
    ],
    toolsAndPipeline: [
      "CAD / STEP Clean-up",
      "Houdini Liquid VFX",
      "Cinema 4D",
      "GLTF / PBR Optimization",
    ],
    relatedProjectSlugs: [
      "rezilo-recovery",
      "g-natural-botanicals",
      "strata-ecommerce-3d",
      "desi-chai-london",
    ],
    seoTitle: "3D Product Visualization Services | E-Commerce & Hardware CGI",
    seoDescription:
      "Elevate e-commerce PDPs and product launches with photorealistic 3D product visualization, SKU render suites, liquid VFX, and 360° models.",
  },
  {
    slug: "motion-graphics",
    title: "Motion Graphics",
    shortTitle: "Motion Graphics",
    h1Heading: "Motion Graphics Studio for Brand Systems, VFX & Campaign Video",
    badge: "Motion & VFX",
    iconName: "Activity",
    heroImage: "/images/cyan_motion.jpg",
    secondaryImage: "/images/gold_motion.jpg",
    summary:
      "Fluid procedural simulations, kinetic typography, broadcast title packages, and UI motion systems that give brands a distinct rhythm.",
    directDefinition:
      "Rejubliss is a London motion graphics studio designing 2D and 3D kinetic identity systems, procedural Houdini simulations, paid-social video toolkits, broadcast packages, and lightweight Lottie UI animations engineered for instant brand recognition.",
    whatWeCreate:
      "Broadcast identity packages, kinetic logo stings, Houdini particle/ribbon simulations, Lottie UI micro-animations, and social motion ads.",
    businessNeed:
      "Stops scroll fatigue and unifies brand recognition across video channels, digital interfaces, and live event screens.",
    idealClients:
      "Broadcast & streaming networks, SaaS & FinTech product teams, retail & consumer brands, and creative agencies.",
    problemsSolved: [
      "Standing out in muted mobile feeds within the first 2 seconds through distinctive kinetic rhythm and visual hooks",
      "Translating static brand guidelines into a repeatable motion system (logo stings, transitions, lower thirds)",
      "Visualizing abstract software, data, audio, or financial flows without generic stock footage",
      "Delivering crisp UI micro-interactions for web and mobile apps via lightweight Lottie JSON/WebM exports",
    ],
    whatIsIncluded: [
      "Motion language exploration, kinetic styleframes, and timing moodfilms",
      "Custom 2D vector choreography and 3D Cinema 4D / Houdini procedural motion",
      "Kinetic typography, UI screen compositing, and brand sonic synchronization",
      "Modular After Effects template rigging for ongoing internal team reuse",
      "Multi-aspect-ratio exports (16:9, 9:16, 4:5, 1:1) and Lottie/WebM optimization",
    ],
    deliverables: [
      "60fps 4K & Full HD broadcast and digital motion masters",
      "Kinetic logo stings, lower thirds, end-slates & transition toolkits",
      "Lightweight Lottie / JSON & alpha-channel WebM UI animations",
      "Comprehensive motion design guidelines & expression-rigged AE templates",
    ],
    applications: [
      "Brand refreshes & broadcast/podcast visual identities",
      "SaaS & FinTech product UI launch teasers",
      "High-velocity paid social performance video suites",
      "Conference keynotes, DOOH screens & exhibition motion walls",
    ],
    industriesServed: [
      {
        sector: "SaaS, AI & FinTech",
        useCase: "UI motion showcases, data-flow visualizations, and Lottie onboarding micro-animations.",
      },
      {
        sector: "Broadcast, Audio & Media",
        useCase: "60fps channel idents, title sequences, and audio-reactive procedural visuals.",
      },
      {
        sector: "Retail, QSR & Consumer Campaigns",
        useCase: "Topical social spots, seasonal sale toolkits, and DOOH retail motion screens.",
      },
      {
        sector: "Live Events & Conferences",
        useCase: "Ultra-wide LED stage loops, speaker stings, and sponsor motion packages.",
      },
    ],
    processHighlights: [
      {
        step: "01. Motion Principles & Boards",
        detail: "We define easing curves, typographic hierarchy, and hero styleframes rooted in your brand identity.",
      },
      {
        step: "02. Animatic & Rhythm Pass",
        detail: "A timed motion rough-cut locks scene transitions, copy legibility, and music/SFX beats early.",
      },
      {
        step: "03. 2D/3D Polish & VFX",
        detail: "Procedural ribbons, glass shaders, kinetic type, and UI composites are refined at 60fps.",
      },
      {
        step: "04. Toolkit & Multi-Ratio Delivery",
        detail: "Master videos, social cutdowns, and reusable templates/Lottie files are handed over cleanly.",
      },
    ],
    whyChoosePoints: [
      {
        title: "Hybrid 2D + Houdini 3D Pipeline",
        description:
          "Unlike pure 2D motion shops, we blend sharp editorial typography with bespoke 3D refractive glass, cloth, and particle simulations.",
      },
      {
        title: "Engineered for Sound-Off & Sound-On",
        description:
          "Every social and DOOH piece is paced so typographic hooks communicate clearly even when played muted in feed.",
      },
      {
        title: "Developer-Ready Web Handover",
        description:
          "Because our team builds production Next.js apps, our Lottie and WebM motion assets are profiled for zero layout shift and tiny file sizes.",
      },
    ],
    faqs: [
      {
        question: "Can you build reusable motion templates our in-house team can edit?",
        answer:
          "Yes. Alongside finished hero videos, we build organized, expression-rigged After Effects (MOGRT/AE) toolkits with clear documentation so your marketing team can swap headlines, footage, and aspect ratios internally.",
      },
      {
        question: "Do you create Lottie animations for websites and mobile apps?",
        answer:
          "Yes. We design and test vector-clean Lottie JSON and transparent WebM/HEVC motion assets tuned for React, Next.js, iOS, and Android without bloating bundle weight.",
      },
      {
        question: "How long does a motion graphics campaign or brand toolkit take?",
        answer:
          "Paid-social motion suites typically take 1.5 to 3 weeks, while full kinetic brand identity systems and broadcast packages take 3 to 5 weeks.",
      },
      {
        question: "Do you handle sound design and voiceover syncing?",
        answer:
          "Yes. We synchronize every cut and kinetic transition to licensed music beds, bespoke sound effects (SFX), and professional voiceover recordings.",
      },
    ],
    toolsAndPipeline: [
      "After Effects",
      "Houdini Procedural VFX",
      "Cinema 4D MoGraph",
      "Lottie / Bodymovin",
    ],
    relatedProjectSlugs: [
      "vortex-fluid-motion",
      "kinetic-identity-package",
      "durex-social-campaigns",
      "gul-ahmed-campaigns",
    ],
    seoTitle: "Motion Graphics Studio London | 2D/3D Motion Design & VFX",
    seoDescription:
      "London motion graphics studio creating kinetic brand identities, 3D procedural VFX, paid-social video toolkits, and Lottie UI animations.",
  },
  {
    slug: "explainer-videos",
    title: "Explainer Video Production",
    shortTitle: "Explainer Videos",
    h1Heading: "Explainer Video Production Studio for 2D, 3D & SaaS Storytelling",
    badge: "2D & 3D Explainers",
    iconName: "Film",
    heroImage: "/images/gold_motion.jpg",
    secondaryImage: "/images/portfolio/dewa-trust-campaign/02-world-art-day.png",
    summary:
      "Script-to-screen 2D, 3D, and hybrid explainer videos engineered to clarify complex software, financial, medical, and hardware products in 60–90 seconds.",
    directDefinition:
      "Rejubliss produces custom 2D, 3D, and hybrid explainer videos in London—guiding brands through messaging strategy, scriptwriting, storyboarding, bespoke illustration or 3D modeling, voiceover direction, and multi-format delivery to turn complex propositions into clear commercial stories.",
    whatWeCreate:
      "60–90 second homepage hero explainers, 3D technical mechanism walkthroughs, SaaS onboarding videos, investor pitch films, and captioned social cutdowns.",
    businessNeed:
      "Shortens sales cycles and improves landing-page comprehension by distilling intricate workflows or technical products into a concise narrative.",
    idealClients:
      "B2B SaaS & AI platforms, FinTech & enterprise software teams, MedTech & healthcare innovators, industrial hardware makers, and non-profits.",
    problemsSolved: [
      "Prospects leaving landing pages confused because a technical platform or hardware mechanism takes too much text to explain",
      "Enterprise sales teams repeating the same 20-minute architectural overview on discovery calls",
      "Generic template explainer videos that undermine the credibility of a premium B2B or healthcare brand",
      "Adapting one flagship product story for homepage playback, booth screens, LinkedIn ads, and sales decks",
    ],
    whatIsIncluded: [
      "Discovery workshop, core value-proposition distillation, and timed visual script",
      "Custom art direction styleframes (2D editorial vector, isometric 3D, photoreal CGI, or UI hybrid)",
      "Full scene-by-scene storyboard and voiced animatic for stakeholder alignment",
      "Bespoke illustration/3D asset creation, smooth motion choreography, and voiceover/SFX mix",
      "Burned-in and SRT caption packages for sound-off autoplay on web and LinkedIn",
    ],
    deliverables: [
      "60–90s Full HD / 4K master explainer video (16:9)",
      "15s & 30s hook-driven social teaser cuts (9:16, 4:5 & 1:1)",
      "Captioned & clean subtitle-free masters + SRT caption files",
      "Approved script, storyboard PDF & static diagram stills for sales decks",
    ],
    applications: [
      "Website homepage & product-page hero explainers",
      "B2B sales enablement, investor pitch & demo follow-ups",
      "Customer onboarding & clinical/patient education portals",
      "Trade show booth loops & LinkedIn/YouTube thought-leadership ads",
    ],
    industriesServed: [
      {
        sector: "B2B SaaS, Cloud & FinTech",
        useCase: "Clarifying API workflows, compliance engines, and financial platforms through sleek UI + motion storytelling.",
      },
      {
        sector: "Healthcare, Wellness & MedTech",
        useCase: "Explaining device mechanisms, recovery protocols, and patient/inclusion initiatives with clarity and warmth.",
      },
      {
        sector: "CleanTech, Manufacturing & Hardware",
        useCase: "3D cutaway explainers showing invisible industrial processes, energy flows, and sensor architecture.",
      },
      {
        sector: "Charities, Education & Public Awareness",
        useCase: "Human-centered illustrated narratives built to inspire donor and community action.",
      },
    ],
    processHighlights: [
      {
        step: "01. Script & Messaging Clarity",
        detail: "We structure your problem, solution, proof, and CTA into a tight 130–200 word narrative.",
      },
      {
        step: "02. Storyboard & Styleframes",
        detail: "Every scene's visual metaphor and bespoke brand look are signed off before animation begins.",
      },
      {
        step: "03. Voiced Animatic & Motion",
        detail: "You approve exact voiceover pacing in an animatic, followed by custom 2D/3D animation and transitions.",
      },
      {
        step: "04. Sound Design & Cutdowns",
        detail: "Final audio mix, captions, and short-form social teasers are exported for every launch channel.",
      },
    ],
    whyChoosePoints: [
      {
        title: "Zero Stock Templates",
        description:
          "Every visual metaphor, UI abstraction, character, or 3D cutaway is custom-crafted around your brand identity.",
      },
      {
        title: "2D, 3D & Real-UI Fluency",
        description:
          "Because our studio spans 2D illustration, photoreal 3D CGI, and UI design, we choose the exact medium your product needs.",
      },
      {
        title: "Structured 4-Gate Sign-Off",
        description:
          "Separate approvals at script, styleframe, storyboard/animatic, and final mix keep stakeholders aligned without surprises.",
      },
    ],
    faqs: [
      {
        question: "What is the ideal length for a B2B or product explainer video?",
        answer:
          "For homepage and landing-page conversion, 60 to 90 seconds (roughly 140–210 spoken words) is the sweet spot—long enough to frame the problem, demonstrate how your solution works, and drive action without viewer drop-off.",
      },
      {
        question: "Should we choose a 2D motion explainer or a 3D explainer video?",
        answer:
          "2D and hybrid UI motion are ideal for SaaS platforms, FinTech workflows, and abstract concepts, while 3D explainer animation excels when showing physical hardware, medical devices, or spatial engineering.",
      },
      {
        question: "Do you write the explainer script or work from ours?",
        answer:
          "Either. We can refine an existing draft from your product marketing team or write the visual script from scratch following a focused discovery briefing.",
      },
      {
        question: "How long does explainer video production take?",
        answer:
          "A custom 60–90 second 2D or hybrid explainer typically takes 3 to 4 weeks, while detailed 3D technical or character-led explainers take 4 to 6 weeks including script, storyboard, voiceover, and two feedback rounds per stage.",
      },
    ],
    toolsAndPipeline: [
      "Script & Storyboard Direction",
      "After Effects & Cinema 4D",
      "2D Vector & Isometric 3D",
      "Voiceover, SFX & Captions",
    ],
    relatedProjectSlugs: [
      "dewa-trust-campaign",
      "fintech-portal-design",
      "rezilo-recovery",
      "lumina-character-3d",
    ],
    seoTitle: "Explainer Video Production London | 2D, 3D & SaaS Explainers",
    seoDescription:
      "Commission custom 2D, 3D, and SaaS explainer videos in London. Script-to-screen storyboarding, bespoke animation, voiceover, and social cutdowns.",
  },
  {
    slug: "character-animation",
    title: "Character Animation",
    shortTitle: "Character Animation",
    h1Heading: "3D & 2D Character Animation Studio for Brand Mascots & Campaigns",
    badge: "2D & 3D Character",
    iconName: "Film",
    heroImage: "/images/character_animation.jpg",
    secondaryImage: "/images/portfolio/chatori-street-food/01-hero-pop-art.png",
    summary:
      "Expressive 3D and 2D character design, custom facial/body rigging, and narrative animation crafted to connect emotionally with audiences.",
    directDefinition:
      "Rejubliss designs, rigs, and animates original 3D and 2D characters in London—creating expressive brand mascots, facial blendshape performances, game/entertainment teasers, and illustrated campaign characters with multi-channel pose libraries.",
    whatWeCreate:
      "Stylized 3D characters, 2D illustrated storytelling, brand mascots, facial kinematics, and character-led campaign spots.",
    businessNeed:
      "Turns brand personality, cultural heritage, or educational messages into memorable, human-centered characters audiences recognize instantly.",
    idealClients:
      "Consumer food & beverage brands, entertainment & gaming studios, charities, healthcare educators, and D2C app brands.",
    problemsSolved: [
      "Building a distinctive, ownable brand mascot or character world that competitors cannot replicate with stock imagery",
      "Achieving natural facial expressions, lip-sync, and appealing body mechanics across both video and print collateral",
      "Communicating sensitive health, inclusion, or educational topics with warmth and approachability",
      "Extending a character from a hero launch film into static packaging poses, OOH posters, and social stickers",
    ],
    whatIsIncluded: [
      "Character concept exploration, silhouette studies, and colour/wardrobe sheets",
      "Orthographic turnarounds and facial expression charts for stakeholder sign-off",
      "3D sculpting, retopology, subsurface skin/fabric shading, or 2D rig construction",
      "Custom skeletal IK/FK and facial blendshape rigging for expressive acting",
      "Keyframe performance animation, lip-sync, lighting, and multi-format rendering",
    ],
    deliverables: [
      "Character concept art, orthographic turnarounds & expression sheets",
      "Production-ready rigged 3D or 2D character master assets",
      "Rendered 4K narrative shorts, social reels & campaign spots",
      "High-resolution static character pose libraries for packaging, print & web",
    ],
    applications: [
      "Brand mascot creation & episodic social series",
      "Food, hospitality & retail character-led campaigns",
      "Game, app & entertainment cinematic teasers",
      "Charity, youth & public awareness storytelling",
    ],
    industriesServed: [
      {
        sector: "Food, Beverage & Hospitality",
        useCase: "Vibrant illustrated and 3D brand characters across packaging, menus, and social reels.",
      },
      {
        sector: "Entertainment, Gaming & Apps",
        useCase: "Stylized UE5/Blender 3D heroes with expressive facial kinematics and cinematic lighting.",
      },
      {
        sector: "Non-Profit, Healthcare & Education",
        useCase: "Empathetic character narratives that demystify care pathways and community causes.",
      },
      {
        sector: "Retail & Consumer Campaigns",
        useCase: "Seasonal campaign mascots deployed across DOOH, web, and sticker packs.",
      },
    ],
    processHighlights: [
      {
        step: "01. Concept & Turnarounds",
        detail: "We sketch character silhouettes, proportions, and personality traits before locking full-color turnarounds.",
      },
      {
        step: "02. Sculpting & Rigging",
        detail: "Clean 3D topology or layered 2D artwork is rigged with intuitive facial and body controls.",
      },
      {
        step: "03. Blocking & Acting Pass",
        detail: "You review story-beat poses, lip-sync timing, and physical acting before final cloth/hair and lighting.",
      },
      {
        step: "04. Final Render & Pose Kit",
        detail: "We deliver finished animations plus high-res transparent character poses for print and digital teams.",
      },
    ],
    whyChoosePoints: [
      {
        title: "Cinematic Subsurface & Lighting Craft",
        description:
          "Demonstrated in our Lumina 3D showcase—combining nuanced eye reflections, fabric micro-detail, and atmospheric UE5/Cycles lighting.",
      },
      {
        title: "2D Pop-Art to Stylized 3D Range",
        description:
          "From bold illustrated character worlds (Chatori UK, Dewa Trust) to full 3D rigged performers.",
      },
      {
        title: "Long-Term Brand Asset Value",
        description:
          "Once rigged, your character becomes a reusable studio asset ready for future seasonal spots and social episodes.",
      },
    ],
    faqs: [
      {
        question: "Can you design an original brand mascot from scratch?",
        answer:
          "Yes. We lead the entire character development process—from personality traits and initial concept sketches through orthographic turnarounds, 3D sculpting/rigging, and launch animation.",
      },
      {
        question: "Can we use the character across print packaging and our website as well as video?",
        answer:
          "Yes. Alongside animated video masters, we render high-resolution 300 DPI static pose libraries on transparent backgrounds so your character works seamlessly across packaging, POS displays, and web pages.",
      },
      {
        question: "Do we own the commercial rights to our custom character?",
        answer:
          "Upon project completion and settlement of the agreed Statement of Work, full commercial usage rights for all agreed deliverables transfer to your brand, with optional master rig handover when scoped.",
      },
      {
        question: "How long does custom 3D character design and animation take?",
        answer:
          "Designing, sculpting, texturing, and rigging a bespoke 3D character plus animating a 15–45 second hero spot typically spans 4 to 7 weeks; 2D illustrated character animations typically take 3 to 5 weeks.",
      },
    ],
    toolsAndPipeline: [
      "Unreal Engine 5",
      "Custom Facial & IK Rigging",
      "Subsurface Scattering",
      "2D Vector & Cel Illustration",
    ],
    relatedProjectSlugs: [
      "lumina-character-3d",
      "chatori-street-food",
      "dewa-trust-campaign",
    ],
    seoTitle: "3D & 2D Character Animation Studio London | Brand Mascots",
    seoDescription:
      "Bespoke 3D and 2D character design, facial rigging, brand mascots, and narrative animation crafted by Rejubliss in London.",
  },
  {
    slug: "architectural-visualization",
    title: "Architectural Visualization",
    shortTitle: "Architectural Viz",
    h1Heading: "Architectural & Retail Environment Visualization Studio in London",
    badge: "Spatial CGI",
    iconName: "Building2",
    heroImage: "/images/portfolio/desi-chai-london/04-storefront-signage.jpg",
    secondaryImage: "/images/portfolio/scoopy-ice-cream/03-elevator-wrap.png",
    summary:
      "Photorealistic retail environments, exterior signage mockups, transit OOH placements, and interior daylighting visualizations.",
    directDefinition:
      "Rejubliss provides architectural and retail environment visualization in London—producing photorealistic storefront CGI, interior fit-out renders, illuminated signage previews, and in-situ transit/mall OOH mockups from architectural plans or elevations prior to physical build-out.",
    whatWeCreate:
      "Exterior and interior architectural renders, illuminated storefront signage previews, retail fit-out visuals, and spatial flythroughs.",
    businessNeed:
      "Allows stakeholders, landlords, franchise partners, and buyers to approve physical spaces and environmental branding before build-out.",
    idealClients:
      "Hospitality & retail chains, commercial property developers, architects, interior designers, and experiential/OOH agencies.",
    problemsSolved: [
      "Securing landlord, council planning, or franchise investor sign-off on retail storefronts and interiors before fabrication",
      "Testing illuminated fascia signage, material palettes, and menu-board visibility under realistic day and dusk lighting",
      "Pre-visualizing large-format brand takeovers across escalators, elevators, bus shelters, and Underground stations",
      "Marketing off-plan commercial or residential spaces with atmospheric photography-grade stills and walkthroughs",
    ],
    whatIsIncluded: [
      "3D spatial modeling from CAD plans, DWG elevations, SketchUp/Revit files, or site dimensions",
      "Physically accurate sun/sky daylighting and IES interior luminaire simulation",
      "PBR architectural material authoring (stone, timber, brushed brass, terrazzo, neon/LED signage)",
      "Contextual streetscape styling, foliage, and subtle human scale",
      "High-resolution perspective stills and optional smooth camera walkthroughs",
    ],
    deliverables: [
      "Photorealistic day & dusk exterior and interior perspective renders (4K–8K)",
      "Retail storefront, fascia signage & interior fit-out approval visuals",
      "In-situ London Underground, mall escalator & street-furniture OOH mockups",
      "Animated spatial walkthrough sequences & material moodboards",
    ],
    applications: [
      "Hospitality, café & retail store concept sign-offs",
      "Commercial & residential property off-plan marketing suites",
      "Landlord, mall management & planning presentation packs",
      "Experiential pop-up stores & exhibition booth pre-visualization",
    ],
    industriesServed: [
      {
        sector: "Hospitality, Cafés & Retail Rollouts",
        useCase: "Storefront signage, counter layouts, and packaging-in-space renders (proven on Desi Chai London).",
      },
      {
        sector: "Property & Real Estate Development",
        useCase: "Exterior streetscapes, lobby interiors, and off-plan buyer brochure CGI.",
      },
      {
        sector: "Experiential & OOH Media Agencies",
        useCase: "Realistic transit, escalator, elevator, and billboard takeover pre-visualizations.",
      },
      {
        sector: "Exhibition & Interior Design Practices",
        useCase: "Bespoke trade-show stands, lighting studies, and material option comparisons.",
      },
    ],
    processHighlights: [
      {
        step: "01. Plans & Elevation Intake",
        detail: "We import architectural drawings, signage vectors, and material schedules into a scaled 3D scene.",
      },
      {
        step: "02. Clay Camera Views",
        detail: "Untextured clay renders lock focal lengths, eye-level sightlines, and composition early.",
      },
      {
        step: "03. Lighting & Material Pass",
        detail: "Daylight/dusk IES lighting, signage illumination, and surface textures are refined with your team.",
      },
      {
        step: "04. High-Res Spatial Delivery",
        detail: "Print and presentation-ready stills (plus optional flythroughs) are delivered for sign-off and marketing.",
      },
    ],
    whyChoosePoints: [
      {
        title: "Brand + Spatial Cohesion",
        description:
          "Because we design packaging, signage, and CGI campaigns, your retail interior visuals integrate authentic brand touchpoints—not generic library props.",
      },
      {
        title: "Real-World UK Retail & Transit Context",
        description:
          "Proven across London high-street storefront concepts (Desi Chai London), Paddington Underground placements, and mall installations.",
      },
      {
        title: "Fast Option Iteration",
        description:
          "Compare two or three signage materials, facade colors, or lighting moods side by side before committing fabrication budget.",
      },
    ],
    faqs: [
      {
        question: "What architectural drawings do you need to start a visualization?",
        answer:
          "CAD floor plans and elevations (DWG/DXF/PDF), SketchUp/Revit/Rhino models if available, site photographs for context, and your material/signage specifications. We can also model from dimensioned hand sketches for early-stage concepts.",
      },
      {
        question: "Can you visualize retail storefronts and illuminated signage for landlord approval?",
        answer:
          "Yes. Storefront, fascia signage, and hospitality fit-out visualization is one of our core strengths—helping brands show landlords and planners exact daytime and evening street presence.",
      },
      {
        question: "How long do architectural or retail CGI renders take?",
        answer:
          "A suite of 2 to 5 retail storefront or interior stills typically takes 1.5 to 3 weeks depending on architectural complexity and custom prop requirements.",
      },
      {
        question: "Can you composite a proposed building or store into real site photography?",
        answer:
          "Yes. Using camera-matched perspective calibration and HDRI lighting data, we seamlessly integrate proposed storefronts, extensions, or OOH installations into real street photography.",
      },
    ],
    toolsAndPipeline: [
      "CAD / BIM Import",
      "Physical Sky & IES Lighting",
      "PBR Architectural Materials",
      "Camera Match Compositing",
    ],
    relatedProjectSlugs: [
      "desi-chai-london",
      "scoopy-ice-cream",
      "rezilo-recovery",
    ],
    seoTitle: "Architectural & Retail Visualization Studio London | Spatial CGI",
    seoDescription:
      "Photorealistic architectural visualization, retail storefront CGI, illuminated signage mockups, and interior rendering in London.",
  },
  {
    slug: "website-design",
    title: "Website Design",
    shortTitle: "Website Design",
    h1Heading: "Bespoke Website Design & Next.js Development Studio in London",
    badge: "UI/UX & Web",
    iconName: "Monitor",
    heroImage: "/images/ecommerce_web.jpg",
    secondaryImage: "/images/hero_mobile.jpg",
    summary:
      "Editorial brand websites, responsive e-commerce portals, and component-driven UI systems engineered for speed, clarity, and conversion.",
    directDefinition:
      "Rejubliss designs and engineers bespoke brand websites and Next.js digital platforms in London—combining Figma UI/UX systems, custom 3D/motion visuals, technical SEO, WCAG accessibility, and fast Core Web Vitals performance.",
    whatWeCreate:
      "Custom UI/UX architecture, Next.js marketing websites, interactive product showcases, and mobile-first design systems.",
    businessNeed:
      "Bridges the gap between high-craft brand visuals and measurable digital conversion across desktop, tablet, and mobile.",
    idealClients:
      "FinTech & SaaS companies, luxury & D2C e-commerce brands, creative & hardware ventures, and enterprise product teams.",
    problemsSolved: [
      "Replacing slow, cookie-cutter template sites that fail to reflect the quality of an ambitious product or brand",
      "Integrating rich 3D renders, video reels, and motion interactions without hurting mobile Largest Contentful Paint (LCP)",
      "Structuring clear service/product architecture, conversion paths, semantic HTML, and AI-search-ready schema from day one",
      "Delivering a maintainable, typed Next.js + Tailwind component library your engineering or marketing team can scale",
    ],
    whatIsIncluded: [
      "Information architecture, sitemap planning, conversion user journeys, and wireframes",
      "Bespoke Figma UI design system across desktop, tablet, and mobile breakpoints",
      "Production Next.js, React, and TypeScript frontend engineering",
      "On-page technical SEO, JSON-LD structured data, Open Graph cards, and WCAG AA accessibility QA",
      "Core Web Vitals performance profiling (LCP, INP, CLS) and Vercel/cloud deployment support",
    ],
    deliverables: [
      "Complete Figma UI/UX prototypes, style tokens & component library",
      "Production Next.js & TypeScript repository ready for deployment",
      "Responsive layouts tuned for Core Web Vitals, SEO & AI search crawlers",
      "Custom motion micro-interactions, inquiry forms & analytics/CRM wiring",
    ],
    applications: [
      "Flagship corporate, B2B & creative brand websites",
      "High-converting hardware & SaaS product launch platforms",
      "FinTech & digital wealth web portals",
      "Headless & D2C e-commerce flagship storefronts",
    ],
    industriesServed: [
      {
        sector: "FinTech, SaaS & AI Platforms",
        useCase: "High-trust editorial interfaces, interactive product tours, and conversion-focused pricing/demo flows.",
      },
      {
        sector: "Consumer Hardware & Wellness Brands",
        useCase: "Launch websites pairing photorealistic 3D product storytelling with fast mobile checkout/inquiry paths.",
      },
      {
        sector: "Luxury, Fashion & D2C Retail",
        useCase: "Art-directed lookbooks and storefronts engineered for speed and tactile visual polish.",
      },
      {
        sector: "Professional & Creative Ventures",
        useCase: "Case-study-driven portfolios with structured SEO and lead qualification.",
      },
    ],
    processHighlights: [
      {
        step: "01. Architecture & Wireframes",
        detail: "We map search intent, page hierarchy, and conversion CTAs before visual styling begins.",
      },
      {
        step: "02. Figma Design System",
        detail: "Typography, color tokens, and interactive desktop/mobile prototypes are reviewed in Figma.",
      },
      {
        step: "03. Next.js & Motion Build",
        detail: "Clean TypeScript components, custom CGI/motion assets, and responsive animations are engineered.",
      },
      {
        step: "04. CWV, SEO & Launch QA",
        detail: "Lighthouse, accessibility, schema markup, and analytics events are verified prior to go-live.",
      },
    ],
    whyChoosePoints: [
      {
        title: "In-House 3D & CGI Asset Creation",
        description:
          "Most web agencies rely on stock illustrations or client-supplied photos; we craft custom 3D hero visuals and motion tailored to your layout.",
      },
      {
        title: "Performance-First Engineering",
        description:
          "Next.js App Router, AVIF/WebP image pipelines, and code-split animations keep visual craft fast on real mobile networks.",
      },
      {
        title: "Built for Search & AI Discovery",
        description:
          "Clean heading hierarchies, crawlable SSR HTML, and factual JSON-LD schema come built into the codebase.",
      },
    ],
    faqs: [
      {
        question: "Do you only design in Figma, or do you also build the production website?",
        answer:
          "Both. You can commission a standalone Figma UI/UX design system for your internal engineers, or a turnkey end-to-end build engineered in Next.js, React, and TypeScript.",
      },
      {
        question: "How do you keep visually rich websites fast on mobile?",
        answer:
          "We combine server-rendered HTML, Next.js AVIF/WebP image optimization, lazy-loaded offscreen media, GPU-composited transforms, and code-split interactive bundles so Core Web Vitals remain green.",
      },
      {
        question: "Is technical SEO included in website design projects?",
        answer:
          "Yes. Every build includes semantic heading hierarchy, canonical URLs, XML sitemaps, Open Graph social cards, JSON-LD structured data, and accessible WCAG-compliant markup.",
      },
      {
        question: "How long does a bespoke website design and Next.js build take?",
        answer:
          "High-impact launch landing pages take 2 to 4 weeks, while multi-page flagship websites with custom 3D/motion assets typically span 5 to 8 weeks.",
      },
    ],
    toolsAndPipeline: [
      "Next.js & React",
      "TypeScript & Tailwind CSS",
      "Figma Design Systems",
      "Core Web Vitals & Technical SEO",
    ],
    relatedProjectSlugs: [
      "fintech-portal-design",
      "mobile-fintech-brand",
      "nexora-kinetic-web",
      "gul-ahmed-campaigns",
    ],
    seoTitle: "Bespoke Website Design & Next.js Studio London | Rejubliss",
    seoDescription:
      "London website design and Next.js development studio building fast, SEO-ready brand platforms integrated with custom 3D, CGI, and motion.",
  },
  {
    slug: "interactive-webgl",
    title: "Interactive WebGL Experiences",
    shortTitle: "Interactive WebGL",
    h1Heading: "Interactive WebGL & Three.js Development Studio for Real-Time 3D Web",
    badge: "Real-Time 3D",
    iconName: "Globe",
    heroImage: "/images/sneaker_3d.jpg",
    secondaryImage: "/images/hero_laptop.jpg",
    summary:
      "Browser-native real-time 3D product configurators, custom GLSL shaders, and scroll-driven spatial storytelling running smoothly at 60fps.",
    directDefinition:
      "Rejubliss engineers interactive WebGL and Three.js web experiences in London—building real-time 360-degree 3D product configurators, custom GLSL shaders, Draco-compressed GLTF pipelines, and scroll-choreographed microsites with graceful mobile and reduced-motion fallbacks.",
    whatWeCreate:
      "Interactive 360° product customizers, Three.js / React Three Fiber environments, fluid cursor shaders, and scroll-choreographed 3D scenes.",
    businessNeed:
      "Turns passive page views into tactile product exploration—letting buyers inspect materials, switch colorways, and interact in real time.",
    idealClients:
      "Footwear & fashion innovators, consumer electronics & hardware makers, automotive launches, and forward-thinking technology brands.",
    problemsSolved: [
      "Letting online buyers rotate products 360°, toggle colorways/materials, and trigger exploded views directly in the browser without plugins",
      "Converting heavy 50M-polygon CAD/Cinema 4D models into crisp <3MB Draco/KTX2 web assets that load rapidly on mobile",
      "Preventing WebGL scenes from blocking Largest Contentful Paint (LCP), draining mobile batteries, or failing accessibility checks",
      "Creating flagship launch microsites and interactive hero sections that earn organic industry shares and press coverage",
    ],
    whatIsIncluded: [
      "Interactive spatial concepting, scroll/camera choreography, and UX state design",
      "3D retopology, UV unwrapping, PBR normal/roughness baking, and Draco/KTX2 GLB compression",
      "Custom Three.js, React Three Fiber (R3F), and GLSL vertex/fragment shader engineering",
      "Adaptive GPU quality scaling, tab-visibility frame pausing, and mobile touch controls",
      "SSR HTML SEO fallback content and `prefers-reduced-motion` accessibility compliance",
    ],
    deliverables: [
      "Compressed, web-optimized GLB/GLTF & KTX2 3D asset pipelines",
      "Modular Three.js / React Three Fiber TypeScript components",
      "Bespoke GLSL shaders & GSAP scroll-synchronized camera rigs",
      "Graceful mobile fallback states, reduced-motion modes & GPU performance benchmarks",
    ],
    applications: [
      "Real-time e-commerce 3D product configurators & customizers",
      "Immersive interactive product launch microsites",
      "Spatial 3D hero sections & interactive hardware feature explorers",
      "Browser-based virtual showrooms & investor demonstrations",
    ],
    industriesServed: [
      {
        sector: "Footwear, Watchmaking & Luxury D2C",
        useCase: "Real-time colorway, stitch, strap, and material configurators (demonstrated in Strata 3D).",
      },
      {
        sector: "Consumer Electronics & Hardware",
        useCase: "Scroll-driven 3D teardown explorers and interactive port/feature hotspots.",
      },
      {
        sector: "Technology, AI & SaaS Flagships",
        useCase: "GPU-accelerated shader heroes and spatial storytelling platforms (demonstrated in Nexora).",
      },
      {
        sector: "Automotive & Mobility",
        useCase: "Browser-based trim, paint, wheel, and interior lighting customizers.",
      },
    ],
    processHighlights: [
      {
        step: "01. Asset Budget & UX Spec",
        detail: "We set strict polygon, texture-memory, and LCP budgets alongside interactive camera states.",
      },
      {
        step: "02. Retopology & PBR Baking",
        detail: "High-res studio models are baked into clean low-poly GLB assets with Draco/KTX2 compression.",
      },
      {
        step: "03. Three.js & Shader Build",
        detail: "Interactive lighting, colorway state, and scroll/pointer physics are built in React Three Fiber.",
      },
      {
        step: "04. Cross-Device GPU Profiling",
        detail: "We benchmark 60fps frame times across desktop, iOS Safari, Android Chrome, and reduced-motion modes.",
      },
    ],
    whyChoosePoints: [
      {
        title: "3D Artists + Frontend Engineers Together",
        description:
          "WebGL fails when 3D artists don't know browser GPU limits or web devs don't know shading—our team bridges both disciplines natively.",
      },
      {
        title: "Core-Web-Vitals-Safe Architecture",
        description:
          "We defer heavy WebGL initialization behind SSR hero HTML and idle callbacks so Google Search speed and indexability never suffer.",
      },
      {
        title: "Accessible by Design",
        description:
          "Keyboard controls, screen-reader descriptions, and automatic `prefers-reduced-motion` fallbacks ensure every visitor is supported.",
      },
    ],
    faqs: [
      {
        question: "What is Interactive WebGL and does it require users to install anything?",
        answer:
          "WebGL (and WebGPU) is a native web standard built into modern desktop and mobile browsers (Chrome, Safari, Edge, Firefox) that renders real-time interactive 3D graphics directly on a web page with zero app downloads or plugins.",
      },
      {
        question: "Will adding interactive 3D or WebGL slow down our website or hurt SEO?",
        answer:
          "Not when engineered properly. We render crawlable HTML and fast AVIF/WebP hero imagery first, compress 3D models with Draco/KTX2, and code-split Three.js bundles after initial paint so Core Web Vitals and search crawlers stay fast.",
      },
      {
        question: "Can an interactive 3D configurator integrate with Shopify or our existing Next.js site?",
        answer:
          "Yes. We deliver self-contained React/Three.js modules or embeddable WebGL viewers that synchronize directly with Shopify variant IDs, cart APIs, or your existing frontend state.",
      },
      {
        question: "How do interactive WebGL experiences behave on older phones?",
        answer:
          "We detect device pixel ratio, pointer type, GPU tier, and `prefers-reduced-motion` settings—automatically scaling shader resolution or serving crisp pre-rendered 3D stills on low-power devices.",
      },
    ],
    toolsAndPipeline: [
      "Three.js & React Three Fiber",
      "Custom GLSL Shaders",
      "Draco / KTX2 Compression",
      "60fps GPU Profiling",
    ],
    relatedProjectSlugs: [
      "nexora-kinetic-web",
      "strata-ecommerce-3d",
      "vortex-fluid-motion",
    ],
    seoTitle: "Interactive WebGL & Three.js Studio London | 3D Web Configurators",
    seoDescription:
      "Commission fast, 60fps interactive WebGL experiences, Three.js 3D product configurators, and custom GLSL websites from Rejubliss in London.",
  },
];

export const SOLUTION_GROUPS: SolutionGroup[] = [
  {
    id: "3d-cgi",
    label: "3D & CGI",
    eyebrow: "Photorealistic Assets & Spatial Craft",
    description:
      "Commission studio-grade 3D animations, multi-SKU packaging stills, hardware cutaways, architectural environments, and rigged characters built for multi-channel deployment.",
    solutions: [
      {
        id: "sol-product-animation",
        title: "Product Animation",
        tagline: "Dynamic 3D reveal films & exploded engineering sequences",
        serviceSlug: "3d-animation",
        inquiryServiceValue: "3D Animation",
        image: "/images/car_3d.jpg",
        whatIsIncluded: [
          "Creative treatment, storyboard & camera animatic",
          "3D modeling or CAD clean-up, PBR texturing & studio lighting",
          "Keyframe/physics animation, color grading & review rounds",
        ],
        deliverables: [
          "4K UHD master film (16:9) + 9:16 & 1:1 social cutdowns",
          "High-resolution hero frame stills for thumbnails & press",
        ],
        applications: [
          "Flagship hardware & automotive launches",
          "Crowdfunding, keynote & paid-video campaigns",
        ],
      },
      {
        id: "sol-product-visualization",
        title: "Product Visualization",
        tagline: "Tactile studio renders, SKU libraries & liquid/botanical VFX",
        serviceSlug: "product-visualization",
        inquiryServiceValue: "Product Visualization",
        image: "/images/portfolio/g-natural-botanicals/01-essential-oil-splash.png",
        whatIsIncluded: [
          "Material & label shader matching across full SKU ranges",
          "Dark-studio, podium, or botanical/liquid VFX scene styling",
          "Multi-angle camera setups & high-res retouching",
        ],
        deliverables: [
          "E-commerce & PDP image suites (PNG/WebP/TIFF)",
          "Transparent cutout passes & carousel compositions",
        ],
        applications: [
          "D2C product pages & Amazon A+ galleries",
          "Pre-manufacturing sales & distributor catalogs",
        ],
      },
      {
        id: "sol-photorealistic-cgi",
        title: "Photorealistic CGI",
        tagline: "Large-format print & out-of-home campaign key visuals",
        serviceSlug: "cgi-rendering",
        inquiryServiceValue: "CGI & Photorealistic Rendering",
        image: "/images/portfolio/scoopy-ice-cream/01-escalator-ooh.png",
        whatIsIncluded: [
          "Art direction & environmental lighting design",
          "Micro-surface detailing (condensation, embossing, metallic foil)",
          "Print-profile color management & OOH layout adaptation",
        ],
        deliverables: [
          "300 DPI large-format masters for OOH & print",
          "Layered compositing files for regional localization",
        ],
        applications: [
          "Underground billboards, bus shelters & mall wraps",
          "Luxury print editorials & retail lightboxes",
        ],
      },
      {
        id: "sol-architectural-viz",
        title: "Architectural Visualization",
        tagline: "Retail storefronts, interior concepts & spatial branding",
        serviceSlug: "architectural-visualization",
        inquiryServiceValue: "Architectural Visualization",
        image: "/images/portfolio/desi-chai-london/04-storefront-signage.jpg",
        whatIsIncluded: [
          "3D spatial modeling from architectural plans or elevations",
          "Illuminated signage, material palette & daylighting simulation",
          "Contextual streetscape or interior styling",
        ],
        deliverables: [
          "High-resolution exterior & interior perspective renders",
          "Optional animated camera walkthrough sequences",
        ],
        applications: [
          "Storefront & hospitality concept sign-offs",
          "Property marketing & tenant presentation packs",
        ],
      },
      {
        id: "sol-character-animation",
        title: "Character Animation",
        tagline: "Rigged 3D & illustrated 2D characters with personality",
        serviceSlug: "character-animation",
        inquiryServiceValue: "Character Animation",
        image: "/images/character_animation.jpg",
        whatIsIncluded: [
          "Character silhouette, turnaround & expression design",
          "Skeletal & facial rigging, shading & scene layout",
          "Expressive performance animation & compositing",
        ],
        deliverables: [
          "Rendered narrative video masters & social loops",
          "High-res character pose toolkit for brand collateral",
        ],
        applications: [
          "Brand mascots & episodic social storytelling",
          "Entertainment teasers & educational campaigns",
        ],
      },
    ],
  },
  {
    id: "motion-storytelling",
    label: "Motion & Storytelling",
    eyebrow: "Narrative Clarity & Campaign Momentum",
    description:
      "Turn intricate products, services, and seasonal promotions into clear, high-retention visual stories engineered for broadcast, social, and web.",
    solutions: [
      {
        id: "sol-motion-graphics",
        title: "Motion Graphics",
        tagline: "Kinetic identity systems, broadcast packages & UI motion",
        serviceSlug: "motion-graphics",
        inquiryServiceValue: "Motion Graphics",
        image: "/images/cyan_motion.jpg",
        whatIsIncluded: [
          "Motion language exploration & kinetic typography boards",
          "2D/3D procedural motion & transitions",
          "Sound-synced timing & modular template rigging",
        ],
        deliverables: [
          "60fps video masters, logo stings & lower thirds",
          "Web-native Lottie / MP4 / WebM UI motion assets",
        ],
        applications: [
          "Broadcast & streaming channel packages",
          "Product UI reveals & brand refresh rollouts",
        ],
      },
      {
        id: "sol-explainer-animations",
        title: "Explainer Video Production",
        tagline: "Clear 2D & 3D visual narratives that simplify complex offers",
        serviceSlug: "explainer-videos",
        inquiryServiceValue: "Explainer Animations",
        image: "/images/gold_motion.jpg",
        whatIsIncluded: [
          "Messaging structure, visual script & scene-by-scene storyboard",
          "Custom 2D illustration, 3D diagrams, or hybrid motion",
          "Pacing polish, captions & sound design integration",
        ],
        deliverables: [
          "60–90s Full HD / 4K explainer film + short teaser cuts",
          "Subtitled versions for muted social & booth playback",
        ],
        applications: [
          "Homepage hero explainers & SaaS onboarding",
          "Enterprise sales enablement & investor demos",
        ],
      },
      {
        id: "sol-advertising-videos",
        title: "Advertising Videos",
        tagline: "Thumb-stopping commercial spots built for paid & OOH channels",
        serviceSlug: "3d-animation",
        inquiryServiceValue: "Advertising Videos",
        image: "/images/portfolio/rezilo-recovery/03-bus-shelter-ooh.png",
        whatIsIncluded: [
          "Hook-driven concepting & platform-specific art direction",
          "3D CGI, motion compositing & bold typographic framing",
          "Multi-ratio safe-zone adaptation",
        ],
        deliverables: [
          "15s, 30s & 6s bumper ad masters across 16:9, 4:5 & 9:16",
          "Companion static key visuals for retargeting",
        ],
        applications: [
          "Meta, YouTube, TikTok & LinkedIn paid campaigns",
          "Digital out-of-home (DOOH) retail screens",
        ],
      },
      {
        id: "sol-brand-films",
        title: "Brand Films",
        tagline: "Atmospheric anthem pieces that elevate brand perception",
        serviceSlug: "3d-animation",
        inquiryServiceValue: "Brand Films",
        image: "/images/portfolio/lure-luxury-jewellery/01-bridal-editorial.png",
        whatIsIncluded: [
          "Creative direction, moodfilm & visual worldbuilding",
          "Editorial art direction, CGI environments & typography",
          "Cinematic color grading & finishing",
        ],
        deliverables: [
          "4K master brand anthem film",
          "Editorial stills & press launch visual kit",
        ],
        applications: [
          "Rebrands, flagship exhibitions & trunk shows",
          "About-page & keynote opening films",
        ],
      },
      {
        id: "sol-campaign-visuals",
        title: "Creative Campaign Visuals",
        tagline: "Cohesive multi-asset social, retail & seasonal suites",
        serviceSlug: "cgi-rendering",
        inquiryServiceValue: "Creative Campaign Visuals",
        image: "/images/portfolio/gul-ahmed-campaigns/01-flat-40-editorial.jpg",
        whatIsIncluded: [
          "Campaign visual identity, conceptual copy framing & layouts",
          "Product compositing, retouching & illustration",
          "Multi-channel rollout formatting (stories, carousels, print)",
        ],
        deliverables: [
          "Complete 10–20+ piece campaign asset suite",
          "Organized channel-ready exports for marketing teams",
        ],
        applications: [
          "Seasonal retail sales & cultural moments",
          "Integrated social media & in-store promotions",
        ],
      },
    ],
  },
  {
    id: "digital-experiences",
    label: "Digital Experiences",
    eyebrow: "Interactive Web, 3D & Conversion Architecture",
    description:
      "Combine editorial UI design with real-time WebGL and modern Next.js engineering so your website reflects the same craft as your product.",
    solutions: [
      {
        id: "sol-website-design",
        title: "Website Design",
        tagline: "High-converting editorial websites & responsive design systems",
        serviceSlug: "website-design",
        inquiryServiceValue: "Website Design",
        image: "/images/ecommerce_web.jpg",
        whatIsIncluded: [
          "Information architecture, conversion journey & wireframes",
          "Bespoke Figma UI design system (desktop, tablet & mobile)",
          "Next.js / React frontend build, SEO & accessibility QA",
        ],
        deliverables: [
          "Production-ready Next.js codebase & Vercel/cloud deployment",
          "Documented component library & responsive UI kit",
        ],
        applications: [
          "B2B & creative studio flagship websites",
          "FinTech, SaaS & D2C brand storefronts",
        ],
      },
      {
        id: "sol-interactive-webgl",
        title: "Interactive WebGL",
        tagline: "Real-time 360° configurators & custom shader interactions",
        serviceSlug: "interactive-webgl",
        inquiryServiceValue: "Interactive WebGL Experiences",
        image: "/images/sneaker_3d.jpg",
        whatIsIncluded: [
          "Low-poly retopology, PBR baking & Draco/GLTF compression",
          "Three.js / React Three Fiber interactive camera & state logic",
          "Custom GLSL shaders, lighting & mobile GPU optimization",
        ],
        deliverables: [
          "Embeddable React/WebGL module + optimized 3D scene bundle",
          "Graceful fallback & reduced-motion states",
        ],
        applications: [
          "Interactive footwear, watch & hardware customizers",
          "Hands-on technical feature explorers",
        ],
      },
      {
        id: "sol-3d-web-experiences",
        title: "3D Website Experiences",
        tagline: "Scroll-choreographed microsites for unforgettable launches",
        serviceSlug: "interactive-webgl",
        inquiryServiceValue: "Interactive WebGL Experiences",
        image: "/images/hero_laptop.jpg",
        whatIsIncluded: [
          "Spatial narrative direction & scroll-timeline choreography",
          "Integrated 3D scene transitions, typography & UI overlays",
          "Cross-device performance tuning & analytics/form wiring",
        ],
        deliverables: [
          "Turnkey immersive launch microsite or flagship homepage",
          "Optimized 3D, image & motion asset pipeline",
        ],
        applications: [
          "Signature product unveilings & digital showrooms",
          "Award-targeted brand experience platforms",
        ],
      },
    ],
  },
];

export interface ConsolidatedServiceCategory {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  deliverables: string[];
  image: string;
  secondaryImage: string;
  imageCaption: string;
  primarySlug: string;
  secondaryLink?: { label: string; slug: string };
}

export const HOMEPAGE_CREATIVE_SERVICES: ConsolidatedServiceCategory[] = [
  {
    id: "3d-animation-cgi",
    number: "01",
    title: "3D Animation & CGI",
    eyebrow: "Cinematic Films & Photoreal Key Visuals",
    description:
      "Physically accurate 3D launch films, mechanical cutaways, and raytraced campaign key visuals engineered for broadcast, out-of-home billboards, and flagship product reveals.",
    deliverables: [
      "4K Product & Launch Films",
      "300 DPI Print & OOH CGI",
      "Fluid & Botanical VFX",
      "Multi-Ratio Ad Cutdowns",
    ],
    image: "/images/portfolio/rezilo-recovery/01-paddington-billboard.png",
    secondaryImage: "/images/car_3d.jpg",
    imageCaption: "Rezilo Wellness — 3D CGI & Paddington Underground OOH",
    primarySlug: "3d-animation",
    secondaryLink: { label: "Photorealistic CGI", slug: "cgi-rendering" },
  },
  {
    id: "product-visualization",
    number: "02",
    title: "Product Visualization",
    eyebrow: "Multi-SKU Packaging & Hardware Renders",
    description:
      "Studio-grade 3D product twins, tactile packaging mockups, and exploded hardware views that replace costly prototype shoots and unify e-commerce and retail launches.",
    deliverables: [
      "Multi-SKU Packaging Suites",
      "Macro Surface & Glass Studies",
      "Exploded Assembly Views",
      "360° Turntable Spins",
    ],
    image: "/images/portfolio/scoopy-ice-cream/02-tubs-on-ice.png",
    secondaryImage:
      "/images/portfolio/g-natural-botanicals/01-essential-oil-splash.png",
    imageCaption: "Yeah! Scoopy — 5-SKU 3D Packaging & Frost Physics",
    primarySlug: "product-visualization",
  },
  {
    id: "motion-graphics",
    number: "03",
    title: "Motion Graphics & Animation",
    eyebrow: "Brand Films, Campaign Video & Kinetic Systems",
    description:
      "High-energy 2D/3D motion design, kinetic typography, and modular campaign toolkits crafted to stop the scroll across digital advertising, live keynotes, and broadcast.",
    deliverables: [
      "Paid-Social Video Suites",
      "Brand & Anthem Films",
      "Kinetic Identity Toolkits",
      "Lottie UI Micro-Motion",
    ],
    image: "/images/cyan_motion.jpg",
    secondaryImage: "/images/gold_motion.jpg",
    imageCaption: "Vortex & Kinetic Identity — 60fps Procedural Motion",
    primarySlug: "motion-graphics",
  },
  {
    id: "character-explainer",
    number: "04",
    title: "Character & Explainer Animation",
    eyebrow: "Narrative Storytelling & Complex Product Clarity",
    description:
      "Expressive 3D and 2D character animation paired with script-to-screen explainer video production—turning intricate software, medical, or consumer concepts into memorable stories.",
    deliverables: [
      "Custom Character Design & Rigging",
      "2D & 3D Explainer Videos",
      "Storyboard & Voiceover Sync",
      "Campaign Mascot Reels",
    ],
    image: "/images/character_animation.jpg",
    secondaryImage: "/images/portfolio/dewa-trust-campaign/02-world-art-day.png",
    imageCaption: "Lumina — Expressive 3D Character Rigging & Lighting",
    primarySlug: "character-animation",
    secondaryLink: {
      label: "Explainer Video Production",
      slug: "explainer-videos",
    },
  },
  {
    id: "architectural-visualization",
    number: "05",
    title: "Architectural Visualization",
    eyebrow: "Retail Storefronts, Interiors & Transit Environments",
    description:
      "Atmospheric spatial CGI for retail concepts, illuminated storefront signage, mall/escalator wraps, and off-plan architectural exteriors before fabrication or build-out.",
    deliverables: [
      "Storefront & Retail Fit-Out CGI",
      "Mall & Transit OOH Pre-Vis",
      "Exterior & Interior Stills",
      "Spatial Flythroughs",
    ],
    image: "/images/portfolio/desi-chai-london/04-storefront-signage.jpg",
    secondaryImage: "/images/portfolio/scoopy-ice-cream/01-escalator-ooh.png",
    imageCaption: "Desi Chai London — Storefront & Retail Signage CGI",
    primarySlug: "architectural-visualization",
  },
  {
    id: "web-interactive-webgl",
    number: "06",
    title: "Website Design & Interactive WebGL",
    eyebrow: "Next.js Platforms, 3D Configurators & GLSL Shaders",
    description:
      "Conversion-focused website design and real-time browser 3D experiences built on Next.js and Three.js—inviting visitors to rotate, customize, and explore products live.",
    deliverables: [
      "Bespoke Next.js Websites",
      "3D Product Configurators",
      "Scroll-Driven WebGL Scenes",
      "Responsive Design Systems",
    ],
    image: "/images/hero_laptop.jpg",
    secondaryImage: "/images/sneaker_3d.jpg",
    imageCaption: "Nexora & Strata — Real-Time WebGL & Flagship Web",
    primarySlug: "interactive-webgl",
    secondaryLink: { label: "Website Design", slug: "website-design" },
  },
];

export function getServiceBySlug(slug: string): StudioService | undefined {
  return STUDIO_SERVICES.find((s) => s.slug === slug);
}
