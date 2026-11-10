export interface ProductItem {
  id: string;
  name: string;
  category: 'chicken' | 'dairy' | 'fries';
  subCategory?: string;
  image: string;
  packWeight: string;
  quantity: string;
  cartonWeight: string;
  origin: string;
  shelfLife: string;
  storage: string;
  description: string;
  features: string[];
}

export interface ScopeDeliverable {
  id: string;
  number: string;
  title: string;
  pageOrComponent: string;
  tagline: string;
  category: 'core' | 'optional_command_center';
  costGBP: number;
  costZAREquiv: number;
  highlightIcon: string;
  summary: string;
  deliverables: string[];
  businessValue: string;
}

export interface RoadmapMilestone {
  step: string;
  timeline: string;
  title: string;
  badge: string;
  focus: string;
  deliverables: string[];
  deliverableReviewGate: string;
}

// Financial Constants
export const BASE_BUILD_GBP = 1600;
export const BASE_BUILD_ZAR = 35000;
export const COMMAND_CENTER_GBP = 1150;
export const COMMAND_CENTER_ZAR = 25000;

// Dynamic Payment URLs (Provided by user)
export const PAYMENT_URL_BASE_35K = 'https://pay.yoco.com/r/nQEkBB';
export const PAYMENT_URL_FULL_60K = 'https://pay.yoco.com/r/lwaqvz';

export const getPaymentUrl = (commandCenterEnabled: boolean): string =>
  commandCenterEnabled ? PAYMENT_URL_FULL_60K : PAYMENT_URL_BASE_35K;

export const STAGING_URL = 'https://vestey-staging.codekings.dev';
export const LIVE_DOMAIN = 'vestey.codekings.dev';

export const BANKING_DETAILS = {
  accountName: 'Code Kings',
  bankName: 'Capitec Bank',
  accountNumber: '1321139754',
  branchCode: '470010',
  swiftCode: 'CABLZAJJ',
  paymentReference: 'VESTEY - Vestey Foods International'
};

export const formatGBP = (amount: number): string =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
  }).format(amount);

export const formatZAR = (amount: number): string =>
  new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0
  }).format(amount);

// Client Meta
export const CLIENT_INFO = {
  companyName: 'Vestey Foods International Ltd',
  heritage: 'Family-owned British global food supplier dating back to 1897',
  presence: 'Operating across Europe, Asia, and the Americas in 100+ countries',
  ukAddress: '29 Ullswater Crescent, Coulsdon, Surrey, CR5 2HR, United Kingdom',
  ukPhone: '+44 (0)20 8668 9344',
  generalEmail: 'vestey@vestey.com',
  chickenEmail: 'cresswell@vestey.com',
  potatoEmail: 'sunnydale@vestey.com',
  dairyEmail: 'dairy@vestey.com',
  websites: ['vesteyfoodsint.com', 'cresswell.uk.com', 'sunnydale-farms.com']
};

// Executive Roles (Updated per user instruction)
export const EXECUTIVE_ROLES = {
  seth: {
    name: 'Seth Bredenkamp',
    title: 'Founder - Lead Developer',
    roleLabel: 'Code Kings Lead Solutions Architect & Engineer'
  },
  megan: {
    name: 'Megan Bredenkamp',
    title: 'VP Operations',
    roleLabel: 'Code Kings Operational Lead & Commercial Partner'
  }
};

// Timeline helpers
export const getTimelineBadge = (commandCenterEnabled: boolean): string =>
  commandCenterEnabled ? 'Turnkey 3-4 Week Delivery' : 'Turnkey 2-3 Week Delivery';

export const getTimelineDescription = (commandCenterEnabled: boolean): string =>
  commandCenterEnabled
    ? '3-4 Week Milestone Rollout with Command Center Handover'
    : '2-3 Week Streamlined Fast-Track Launch';

// 5 Core Deliverables requested + Custom Command Center Add-on
export const SCOPE_ITEMS: ScopeDeliverable[] = [
  {
    id: 'landing-showcase',
    number: '01',
    title: 'Flagship Tri-Brand Showcase Landing Page',
    pageOrComponent: 'Page 1 — Landing Home (`/`)',
    tagline: 'High-impact flagship landing page uniting Cresswell Chicken, Cresswell Dairy & Sunnydale Farms under the storied Vestey Foods heritage.',
    category: 'core',
    costGBP: 450,
    costZAREquiv: 10000,
    highlightIcon: 'Globe2',
    summary:
      'A bespoke, fast-loading executive homepage introducing Vestey Foods International (Since 1897) with immersive brand showcases for all three product lines, interactive category quick-jump navigators, downloadable catalogue hubs, and international trade proof points.',
    deliverables: [
      'Editorial hero banner celebrating 130 years of family-owned food excellence and global distribution in 100+ countries',
      'Tri-brand interactive selector featuring visual previews of Cooked Chicken, Dairy, and Fries with smooth page routing',
      'One-click PDF download drawer for official catalogues (Dairy Catalogue, Signature Gourmet Brochure, Sunnydale Fries Flyer)',
      'Global supply-chain credibility banner: EU-approved processing plants, Halal certification, temperature-controlled logistics',
      'Mobile-first responsive layout tested across modern Apple iOS, Android, and 4K desktop displays'
    ],
    businessValue:
      'Gives retail supermarket buyers and foodservice distributors an immediate, high-credibility first impression of Vestey\'s full portfolio without feeling cluttered.'
  },
  {
    id: 'cooked-chicken-page',
    number: '02',
    title: 'Cresswell Signature Gourmet Cooked Chicken Page',
    pageOrComponent: 'Page 2 — Chicken Vertical (`/cooked-chicken`)',
    tagline: 'Dedicated product catalogue for the 8 Signature Gourmet deep-frozen cooked chicken lines for European retail and foodservice.',
    category: 'core',
    costGBP: 350,
    costZAREquiv: 7500,
    highlightIcon: 'UtensilsCrossed',
    summary:
      'Interactive culinary catalogue showcasing all 8 Signature Gourmet SKUs with dish presentation photos, retail bag mockups, carton specs, EU-approved facility credentials, and 11-language packaging details.',
    deliverables: [
      'Dedicated product cards for all 8 items: Popcorn (5-9g), Innerfillet (40-50g), Breast Skewers (100g), Strips (12mm), Innerfillets (30-50g), Slices (5mm), Dices (12mm), and Whole Roasted Breasts (110-130g)',
      'Dual-asset imagery displaying plated culinary presentations alongside retail bag mockups and outer master carton specs (10 kg)',
      'Specification drawer detailing EU-approved plant production, Halal compliance, deep-frozen storage parameters, and 11 packaging languages (EN, DK, SE, FR, PL, LT, LV, EE, SK, CZ, RO)',
      'Direct "Request Sample / Price Matrix" call-to-action button anchored to the global sales desk'
    ],
    businessValue:
      'Transforms a static 2-page print flyer into an interactive B2B buyer ordering tool that speeds up distributor procurement.'
  },
  {
    id: 'dairy-page',
    number: '03',
    title: 'Cresswell Dairy Farm Product Catalogue Page',
    pageOrComponent: 'Page 3 — Dairy Vertical (`/dairy`)',
    tagline: 'Comprehensive European cheese and butter portfolio spanning foodservice blocks, whole wheels, portions, and sliced retail packs.',
    category: 'core',
    costGBP: 450,
    costZAREquiv: 10000,
    highlightIcon: 'Milk',
    summary:
      'An exhaustive yet elegantly organized dairy showcase covering Foodservice (Mozzarella, Danish Blue/White, Grana Padano, Dutch Gouda/Edam, Cheddars, Cheese Alternatives, Butter) and Retail Lines (Natural slices, Portions, Processed slices).',
    deliverables: [
      'Interactive Foodservice vs. Retail Line tab switcher allowing commercial buyers to filter by packaging type in one click',
      'Foodservice Cheese Section: Mozzarella blocks & shreds, Danish Blue & White feta-style, Italian Grana Padano & Hard cheese, Dutch wheels & Edam balls, Cheddar white/colored, Emmental, Swiss style, and 9-month shelf-life Cheese Alternatives',
      'Retail Cheese Section: 160g natural slices (Edam, Gouda, Emmental, Swiss, Cheddar), 200g portion wedges, and 130g/200g processed sandwich slices',
      'Butter Section: 15kg/25kg bulk butter, 10g single-serve cups, and salted/unsalted foil portions (EU & South African origins)',
      'Clear origin, storage (Frozen vs. Chilled), and shelf-life metadata badges on every single SKU'
    ],
    businessValue:
      'Organizes 25+ distinct dairy products into a clear, searchable showcase so restaurant groups, hotels, and retail buyers instantly find the exact cuts and pack formats they need.'
  },
  {
    id: 'fries-page',
    number: '04',
    title: 'Sunnydale Farms Fries & Potato Products Page',
    pageOrComponent: 'Page 4 — Potato Vertical (`/fries`)',
    tagline: 'Full potato solutions showcase: Classic shoestring and straight-cut fries, sweet potato, hash brown patties, and playful specialty shapes.',
    category: 'core',
    costGBP: 350,
    costZAREquiv: 7500,
    highlightIcon: 'Flame',
    summary:
      'Rich visual product directory for Sunnydale Farms and Cresswell potato solutions, including uncoated and coated cut varieties, sweet potato fries, specialty breakfast hash browns, and playful shapes for retail and foodservice.',
    deliverables: [
      'Classic Cut Matrix: 1/4" Shoestring (7x7mm), 3/8" Straight Cut (9x9mm), 12/12" Thick Cut (12x12mm), and Coated Sweet Potato Fries with coated vs uncoated comparative toggles',
      'Breakfast & Specialty Shapes Gallery: Oval patties, Triangles, Balls, Oliver, Rounds, Tater Tots, Skin-on Wedges, Criss Cross (Waffle), and Smiley Faces',
      'Packaging display: Sunnydale Farms retail bags (French Fries, X-Tra Crispy) alongside Cresswell signature foodservice cartons',
      'Export & logistics specs: PRC factory origin, exclusive Vestey Foods International export authorization, and Surrey headquarters dispatch'
    ],
    businessValue:
      'Positions Sunnydale Farms as a full-line potato partner capable of servicing fast-food operators, hospitality dining, and retail grocers.'
  },
  {
    id: 'contact-page',
    number: '05',
    title: 'Global Trade Inquiries & Direct RFQ Contact Page',
    pageOrComponent: 'Page 5 — Contact & RFQ (`/contact`)',
    tagline: 'High-converting international wholesale contact portal routing commercial buyers directly to Vestey Foods Surrey trade desks.',
    category: 'core',
    costGBP: 0,
    costZAREquiv: 0,
    highlightIcon: 'MailCheck',
    summary:
      'Included within the base scope: A streamlined B2B trade inquiry terminal allowing commercial buyers, importers, and distributor groups to request product specs, pricing containers, and physical samples with automated email dispatch to Vestey headquarters.',
    deliverables: [
      'Interactive Request-For-Quote (RFQ) form with multi-brand checkboxes (Chicken, Dairy, Fries) and volume dropdowns (Container, Pallet, Sample pack)',
      'Verified corporate headquarters badge: 29 Ullswater Crescent, Coulsdon, Surrey, CR5 2HR, UK with click-to-call phone (+44 20 8668 9344)',
      'Direct department email routing (`cresswell@vestey.com`, `sunnydale@vestey.com`) with instant server-side anti-spam bot shield',
      'Interactive Google Maps integration highlighting Vestey Foods International European headquarters'
    ],
    businessValue:
      'Converts browsing retail and restaurant buyers into qualified high-ticket container and pallet trade inquiries directly in the sales inbox.'
  },
  {
    id: 'custom-command-center',
    number: '06',
    title: 'Code Kings Custom Command Center (Client Portal)',
    pageOrComponent: 'Optional Client Backend — (`/command-center`)',
    tagline: 'A private, self-service admin portal so the Vestey team can update products, specs, pack weights, catalogues, and review trade inquiries without needing a developer.',
    category: 'optional_command_center',
    costGBP: COMMAND_CENTER_GBP,
    costZAREquiv: COMMAND_CENTER_ZAR,
    highlightIcon: 'ShieldAlert',
    summary:
      'Optional Add-On (+£1,150 / R25,000 ZAR): A proprietary lightweight command center built specifically for Vestey Foods. Allows non-technical staff to manage product lines across Chicken, Dairy, and Fries, update carton counts or shelf life, replace PDF brochures with 1-click uploads, and view inbound wholesale leads from any browser or phone—zero monthly SaaS subscriptions.',
    deliverables: [
      'Product & SKU Management: Add, edit, or archive products across Chicken, Dairy, and Fries in seconds without touching code',
      'Packaging & Spec Editor: Quickly update pack weights, carton quantities, shelf-life months, storage conditions, and origin tags',
      '1-Click PDF Brochure Manager: Upload new product flyers and catalogues that update the public download links automatically',
      'Inbound Trade Lead Log: Real-time dashboard of submitted wholesale inquiries with CSV export for sales follow-up',
      'Multi-User Security & Fast Password Gate: Role-based access with zero recurring monthly CMS license fees (WordPress/Shopify plugin bloat eliminated)'
    ],
    businessValue:
      'Eliminates ongoing agency maintenance retainers and gives the Vestey team total sovereignty to update product lines whenever seasonal specs or catalogue print runs change.'
  }
];

// Curated sample products for interactive prototype demonstration
export const SAMPLE_PRODUCTS: ProductItem[] = [
  // Chicken
  {
    id: 'ch-popcorn',
    name: 'Breaded & Roasted Chicken Popcorn',
    category: 'chicken',
    subCategory: 'Signature Gourmet',
    image: '/products/chicken-breaded-and-roasted-chicken-popcorn.jpg',
    packWeight: '1,000 g (1 kg)',
    quantity: '10 x 1 kg bags',
    cartonWeight: '10 kg net',
    origin: 'PRC (EU Approved Plant)',
    shelfLife: '12 Months',
    storage: 'Deep Frozen (-18°C)',
    description: 'Crispy bite-sized 5-9g chicken pieces roasted and breaded for fast foodservice preparation.',
    features: ['5-9g pieces', 'Halal certified', '11 languages on bag', 'Carton weight 10kg']
  },
  {
    id: 'ch-innerfillet',
    name: 'Breaded & Fried Chicken Innerfillet',
    category: 'chicken',
    subCategory: 'Signature Gourmet',
    image: '/products/chicken-breaded-and-fried-chicken-innerfillet.jpg',
    packWeight: '2,500 g (2.5 kg)',
    quantity: '4 x 2.5 kg bags',
    cartonWeight: '10 kg net',
    origin: 'PRC (EU Approved Plant)',
    shelfLife: '12 Months',
    storage: 'Deep Frozen (-18°C)',
    description: 'Tender whole muscle 40-50g innerfillets, coated in golden seasoned crumb.',
    features: ['40-50g per fillet', 'Pre-fried & cooked', 'EU approved facility', '11 languages']
  },
  {
    id: 'ch-skewer',
    name: 'Steamed & Fried Chicken Breast on Skewer',
    category: 'chicken',
    subCategory: 'Signature Gourmet',
    image: '/products/chicken-steamed-fried-pieces-of-chicken-breast-on-a-skewer.jpg',
    packWeight: '2,500 g (2.5 kg)',
    quantity: '4 x 2.5 kg bags',
    cartonWeight: '10 kg net',
    origin: 'PRC (EU Approved Plant)',
    shelfLife: '12 Months',
    storage: 'Deep Frozen (-18°C)',
    description: '100g generous marinated skewers with succulent char marks for hotel banquets and grill bars.',
    features: ['100g skewer', 'Steamed then grilled', 'Halal certified', 'Deep frozen']
  },
  {
    id: 'ch-strips',
    name: 'Roasted Chicken Breast in Strips (12mm)',
    category: 'chicken',
    subCategory: 'Signature Gourmet',
    image: '/products/chicken-roasted-chicken-breast-in-strips.jpg',
    packWeight: '2,500 g (2.5 kg)',
    quantity: '4 x 2.5 kg bags',
    cartonWeight: '10 kg net',
    origin: 'PRC (EU Approved Plant)',
    shelfLife: '12 Months',
    storage: 'Deep Frozen (-18°C)',
    description: 'Evenly cut 12mm strips of pure roasted chicken breast. Ideal for wraps, Caesar salads, and pizzas.',
    features: ['12mm uniform cut', '100% breast meat', 'Zero wastage', 'Ready to heat/serve']
  },

  // Dairy
  {
    id: 'da-mozzarella-block',
    name: 'Cresswell Mozzarella Block',
    category: 'dairy',
    subCategory: 'Foodservice Cheese',
    image: '/products/dairy-p4-mozzarella-block.jpg',
    packWeight: 'Approx. 2.3 kg block',
    quantity: '4 x 2.3 kg',
    cartonWeight: 'Approx. 9.2 kg net',
    origin: 'European Union (EU)',
    shelfLife: '12 Months',
    storage: 'Frozen',
    description: 'Premium melt performance mozzarella loaf engineered for wood-fired and deck pizza ovens.',
    features: ['Exceptional stretch', 'Low burning point', 'Frozen for 12mo freshness', 'EU origin']
  },
  {
    id: 'da-gouda-wheel',
    name: 'Dutch Gouda Wheel',
    category: 'dairy',
    subCategory: 'Foodservice Cheese',
    image: '/products/dairy-p7-gouda-wheel.jpg',
    packWeight: 'Approx. 4.5 kg wheel',
    quantity: '1 x 4.5 kg',
    cartonWeight: '4.5 kg net',
    origin: 'Holland',
    shelfLife: '12 Months',
    storage: 'Chilled (4°C - 8°C)',
    description: 'Traditional waxed round Gouda wheel with smooth texture and rich buttery flavor.',
    features: ['Authentic Holland Gouda', 'Waxed protective coating', 'Ideal for deli counters', 'Chilled']
  },
  {
    id: 'da-grana-padano',
    name: 'Italian Grana Padano Wedge',
    category: 'dairy',
    subCategory: 'Foodservice Cheese',
    image: '/products/dairy-p6-grana-padano.jpg',
    packWeight: 'Approx. 4.8 kg wedge',
    quantity: '4 x 4.8 kg',
    cartonWeight: 'Approx. 19.2 kg net',
    origin: 'Italy',
    shelfLife: '12 Months',
    storage: 'Chilled (4°C - 8°C)',
    description: 'Aged Italian hard cheese wedge with crystalline texture and nutty savory notes.',
    features: ['DOP certified Italian origin', 'Aged to perfection', 'Foodservice size', 'Chilled']
  },
  {
    id: 'da-butter-bulk',
    name: 'Cresswell Pure Butter Bulk Block',
    category: 'dairy',
    subCategory: 'Butter Lines',
    image: '/products/dairy-p13-butter-bulk.jpg',
    packWeight: '15 kg or 25 kg box',
    quantity: '1 x 15 kg / 1 x 25 kg',
    cartonWeight: '15 kg or 25 kg net',
    origin: 'EU & South Africa',
    shelfLife: '12 Months',
    storage: 'Frozen (-18°C)',
    description: 'Heavy commercial butter block for industrial bakery, pastry laminating, and commercial kitchen production.',
    features: ['82% butterfat', 'Salted & Unsalted', 'Heavy bakery box', 'Frozen storage']
  },

  // Fries
  {
    id: 'fr-shoestring',
    name: 'Sunnydale Farms 1/4" Shoestring Fries (7x7mm)',
    category: 'fries',
    subCategory: 'Classic Fries',
    image: '/products/fries-uncoated-1-4-shoestring-fries-7-7mm.jpg',
    packWeight: 'Retail & Foodservice',
    quantity: 'Standard carton formats',
    cartonWeight: 'Carton formats',
    origin: 'PRC (Exported by Vestey UK)',
    shelfLife: '18 Months',
    storage: 'Frozen (-18°C)',
    description: 'Fast-cooking, high-yield classic 7x7mm cut fries available in both uncoated and extra-crispy coated varieties.',
    features: ['7x7mm shoestring cut', 'Uncoated & Coated options', 'High potato solids', 'Extra golden crisp']
  },
  {
    id: 'fr-sweet-potato',
    name: 'Coated Sweet Potato Fries',
    category: 'fries',
    subCategory: 'Specialty Fries',
    image: '/products/fries-coated-sweet-potato.jpg',
    packWeight: 'Foodservice bag',
    quantity: 'Standard carton',
    cartonWeight: 'Carton formats',
    origin: 'PRC (Exported by Vestey UK)',
    shelfLife: '18 Months',
    storage: 'Frozen (-18°C)',
    description: 'Vibrant orange sweet potato spears with a delicate crispy batter that holds crispness under warming lamps.',
    features: ['Light batter coating', 'Naturally sweet flavor', 'Holds heat & crunch', 'Frozen']
  },
  {
    id: 'fr-tater-tots',
    name: 'Sunnydale Farms Tater Tots',
    category: 'fries',
    subCategory: 'Specialty Shapes',
    image: '/products/fries-tater-tots.jpg',
    packWeight: 'Foodservice bag',
    quantity: 'Standard carton',
    cartonWeight: 'Carton formats',
    origin: 'PRC (Exported by Vestey UK)',
    shelfLife: '18 Months',
    storage: 'Frozen (-18°C)',
    description: 'Grated potato cylinders par-fried to golden perfection. Beloved in school foodservice, pubs, and brunch spots.',
    features: ['Cylindrical bite-sized', 'Grated seasoned potato', 'High heat retention', 'Versatile side']
  },
  {
    id: 'fr-wedges',
    name: 'Skin-on Seasoned Potato Wedges',
    category: 'fries',
    subCategory: 'Specialty Shapes',
    image: '/products/fries-skin-on-wedges.jpg',
    packWeight: 'Foodservice bag',
    quantity: 'Standard carton',
    cartonWeight: 'Carton formats',
    origin: 'PRC (Exported by Vestey UK)',
    shelfLife: '18 Months',
    storage: 'Frozen (-18°C)',
    description: 'Chunky rustic potato wedges with skin on, lightly seasoned with paprika and herbs.',
    features: ['Rustic skin-on cut', 'Paprika herb blend', 'Fluffy potato center', 'Steakhouse favorite']
  }
];

// Dynamic Roadmap Milestones function
export const getRoadmapMilestones = (commandCenterEnabled: boolean): RoadmapMilestone[] => {
  const baseMilestones: RoadmapMilestone[] = [
    {
      step: 'Phase 01',
      timeline: 'Week 1',
      title: 'Brand Styling, Information Architecture & Catalogue Extraction',
      badge: 'STAGE 1: FOUNDATION',
      focus: 'Structuring all 3 brand identities (Cresswell Chicken, Cresswell Dairy, Sunnydale Farms) under Vestey Foods UK.',
      deliverables: [
        'Digital asset extraction and high-resolution optimization of all 3 catalogues (Chicken, Dairy, Fries)',
        'Brand palette definition honoring Vestey heritage deep green, Cresswell royal gold/navy, and Sunnydale warm amber',
        'Information architecture map of the 5 requested pages (Landing, Chicken, Dairy, Fries, Contact)',
        'Private Vercel staging deployment initialization on `vestey-staging.codekings.dev`'
      ],
      deliverableReviewGate: 'Interactive staging prototype shared for executive review.'
    },
    {
      step: 'Phase 02',
      timeline: 'Week 2',
      title: 'Product Verticals Build & Interactive Specification Catalogues',
      badge: 'STAGE 2: PAGES & CATALOGUES',
      focus: 'Building out the Cooked Chicken, Dairy, and Fries pages with full pack/carton spec tables.',
      deliverables: [
        'Complete 8-item Signature Gourmet Cooked Chicken showcase with pack, carton, and 11-language bag breakdown',
        'Full Cresswell Dairy Farm directory with Foodservice vs Retail line filtering, cheese families, and butter blocks',
        'Sunnydale Farms Potato directory with cut thickness selector, specialty shapes gallery, and coated/uncoated toggles',
        'High-speed instant search and category quick-filter pills across all product verticals'
      ],
      deliverableReviewGate: 'Full product directory review with live filtering on staging.'
    },
    {
      step: 'Phase 03',
      timeline: 'Week 3',
      title: commandCenterEnabled
        ? 'Global Trade RFQ Portal, Responsive QA & Catalogue Downloads'
        : 'Global Trade RFQ Portal, Responsive QA & Live DNS Launch',
      badge: commandCenterEnabled ? 'STAGE 3: TRADE & LAUNCH PREP' : 'STAGE 3: FINAL QA & CUTOVER',
      focus: 'Integrating the Contact Us & RFQ system, PDF download center, and cross-device testing.',
      deliverables: [
        'Global Trade RFQ contact portal with multi-product selection and automated dispatch to Vestey Surrey trade desk',
        'Direct PDF catalogue download manager serving print-quality brochures without third-party popups',
        'Cross-device mobile QA across iOS Safari, Android Chrome, tablet, and 4K desktop screens',
        commandCenterEnabled
          ? 'Security review, SSL configuration, and preparation for Command Center handover'
          : 'Final client sign-off, live DNS cutover, and production domain verification'
      ],
      deliverableReviewGate: commandCenterEnabled
        ? 'Staging review before final Command Center deployment.'
        : 'Final staging sign-off and official live launch.'
    }
  ];

  if (commandCenterEnabled) {
    baseMilestones.push({
      step: 'Phase 04',
      timeline: 'Week 4',
      title: 'Custom Command Center Deployment & Handover Training',
      badge: 'STAGE 4: CLIENT PORTAL & LAUNCH',
      focus: 'Deploying the private self-service client portal (+£1,150) and final live cutover.',
      deliverables: [
        'Self-service visual dashboard for Vestey team to add/edit products, specs, and pack weights',
        'PDF brochure upload manager allowing instant replacement of downloadable catalogues',
        'Inbound trade inquiry review table with 1-click CSV export for the sales team',
        'Plain-English video walkthrough, admin credential handover, and live DNS cutover'
      ],
      deliverableReviewGate: 'Admin credential handover and guided live demonstration session.'
    });
  }

  return baseMilestones;
};

export const SOW_ASSUMPTIONS = [
  'All high-resolution product photography, copy, and certifications provided in the PDF catalogues will be utilized for the digital build.',
  'Vestey Foods will provide domain registrar / DNS access to connect the production URL upon staging approval.',
  'Hosting is deployed on enterprise-grade Vercel Edge infrastructure with global CDN caching and 99.99% uptime guarantee.',
  'The digital quote is presented in British Pounds Sterling (GBP), converted from base South African Rand (ZAR) quotes at approximately 21.8 ZAR/GBP and rounded for executive presentation.',
  'Due to the compact size and accelerated delivery schedule of this build, engagement is authorized via a single 100% upfront project investment upon signing, locking in the delivery sprint.'
];

export const SOW_EXCLUSIONS = [
  'Third-party commercial payment processing fees (if Vestey ever opts to take live credit card payments on-site).',
  'On-site photo shoots (all imagery is extracted from existing high-res Vestey printed catalogues).',
  'Translation of custom copy into non-English languages beyond the packaging certifications already present in the brief.'
];
