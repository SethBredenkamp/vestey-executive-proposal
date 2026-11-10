import {
  BASE_BUILD_GBP,
  BASE_BUILD_ZAR,
  COMMAND_CENTER_GBP,
  COMMAND_CENTER_ZAR,
  BANKING_DETAILS,
  CLIENT_INFO,
  STAGING_URL,
  formatGBP,
  formatZAR,
  ROADMAP_MILESTONES,
  SOW_ASSUMPTIONS,
  SOW_EXCLUSIONS
} from '../data/proposalData';

export interface PdfProposalOptions {
  isExecuted: boolean;
  executedAt: string | null;
  clientName: string;
  clientTitle: string;
  clientEmail: string;
  commandCenterEnabled: boolean;
}

export async function generateProposalPdf(options: PdfProposalOptions): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 612pt
  const pageHeight = doc.internal.pageSize.getHeight(); // 792pt
  const margin = 36;
  const contentWidth = pageWidth - margin * 2; // 540pt
  let y = 0;

  const totalGBP = BASE_BUILD_GBP + (options.commandCenterEnabled ? COMMAND_CENTER_GBP : 0);
  const totalZAR = BASE_BUILD_ZAR + (options.commandCenterEnabled ? COMMAND_CENTER_ZAR : 0);
  const depositGBP = Math.round(totalGBP / 2);
  const finalGBP = totalGBP - depositGBP;

  const resolvedClientName = options.clientName?.trim() || 'Vestey Foods Representative';
  const resolvedClientTitle = options.clientTitle?.trim() || 'Commercial Director';
  const resolvedClientEmail = options.clientEmail?.trim() || CLIENT_INFO.generalEmail;

  const drawHeaderBanner = (pageTitle: string, pageNum: string) => {
    // Obsidian Header Bar
    doc.setFillColor(9, 11, 15);
    doc.rect(0, 0, pageWidth, 68, 'F');

    // Emerald Bottom Accent Rule
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 68, pageWidth, 2.5, 'F');

    // Line 1 (y = 23): Provider Name (Left) + Document Status (Right)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(52, 211, 153);
    doc.text('CODE KINGS DIGITAL AGENCY', margin, 23);

    doc.setFontSize(8.5);
    doc.text(
      options.isExecuted
        ? 'STATUS: COUNTERSIGNED CONTRACT'
        : `MASTER COMMERCIAL SCOPE (${formatGBP(totalGBP)} GBP)`,
      pageWidth - margin,
      23,
      { align: 'right' }
    );

    // Line 2 (y = 39): Client Name (Left) + Page & Staging (Right)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(244, 244, 245);
    doc.text('CLIENT: VESTEY FOODS INTERNATIONAL LTD (CRESSWELL & SUNNYDALE)', margin, 39);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(161, 161, 170);
    doc.text(`Page ${pageNum} of 4   |   Staging: vestey-staging.vercel.app`, pageWidth - margin, 39, {
      align: 'right'
    });

    // Line 3 (y = 54): Section Title (Left) + Date / Office (Right)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(161, 161, 170);
    doc.text(pageTitle, margin, 54);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(52, 211, 153);
    doc.text('EST. 1897 • SURREY, UK DESK', pageWidth - margin, 54, { align: 'right' });

    y = 90;
  };

  const drawFooter = () => {
    doc.setDrawColor(212, 212, 216);
    doc.setLineWidth(0.75);
    doc.line(margin, pageHeight - 34, pageWidth - margin, pageHeight - 34);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(100, 116, 139);
    doc.text(
      'Code Kings (Seth Bredenkamp, Lead Dev & Megan Bredenkamp, Managing Director) • Prepared for Vestey Foods International Ltd',
      margin,
      pageHeight - 20
    );
    doc.text(
      'Coulsdon, Surrey, UK • vestey-staging.vercel.app',
      pageWidth - margin,
      pageHeight - 20,
      { align: 'right' }
    );
  };

  // =========================================================================
  // PAGE 1: EXECUTIVE BRIEFING, FINANCIALS & MASTER SCOPE LEDGER
  // =========================================================================
  drawHeaderBanner('Executive Briefing & Master Investment Summary', '1');

  // Executive Briefing Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 86, 5, 5, 'FD');

  // Left Emerald Accent Bar
  doc.setFillColor(16, 185, 129);
  doc.roundedRect(margin, y, 4, 86, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Unified Digital Platform: Cresswell & Sunnydale Farms', margin + 14, y + 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const letter = doc.splitTextToSize(
    'This agreement outlines the turnkey engineering scope for Vestey Foods International Ltd. As requested in the client brief, Code Kings will build a unified, high-converting digital storefront featuring a flagship Tri-Brand Landing Page showcasing all three premium lines, followed by three dedicated catalogue pages for Cooked Chicken (8 Signature Gourmet SKUs), Cresswell Dairy Farm (Foodservice blocks & retail cheeses), and Sunnydale Farms (Shoestring fries & specialty shapes), alongside a Global Trade RFQ Contact Us page. ' +
      (options.commandCenterEnabled
        ? 'This proposal also includes the optional Custom Code Kings Command Center, granting your internal team total self-service control over products, pack specs, and downloadable brochures with zero monthly CMS plugin fees.'
        : 'Development takes place on private staging prior to final DNS cutover.'),
    contentWidth - 26
  );
  letter.forEach((line: string, idx: number) => {
    doc.text(line, margin + 14, y + 36 + idx * 12);
  });

  y += 98;

  // 3 Financial Metric Cards in GBP
  const metricCardWidth = (contentWidth - 16) / 3;
  const metricH = 68;
  const metrics = [
    {
      label: 'TOTAL AGREEMENT INVESTMENT',
      val: `${formatGBP(totalGBP)} GBP`,
      sub: options.commandCenterEnabled ? '5 Core Pages + Command Center' : 'Core 5-Page Platform Build',
      tag: `EQUIV. ${formatZAR(totalZAR)} ZAR`
    },
    {
      label: '50% INITIAL RETAINER',
      val: `${formatGBP(depositGBP)} GBP`,
      sub: 'Due Upon Execution',
      tag: 'INITIATES WEEK 1 SETUP'
    },
    {
      label: '50% FINAL MILESTONE',
      val: `${formatGBP(finalGBP)} GBP`,
      sub: 'Due Upon Staging Approval',
      tag: 'PRIOR TO LIVE DNS CUTOVER'
    }
  ];

  metrics.forEach((m, i) => {
    const mx = margin + i * (metricCardWidth + 8);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(mx, y, metricCardWidth, metricH, 5, 5, 'FD');

    // Header strip inside card
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(mx, y, metricCardWidth, 18, 5, 5, 'F');
    doc.rect(mx, y + 13, metricCardWidth, 5, 'F');
    doc.setDrawColor(187, 247, 208);
    doc.line(mx, y + 18, mx + metricCardWidth, y + 18);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(4, 120, 87);
    doc.text(m.label, mx + 10, y + 12.5);

    doc.setFontSize(13.5);
    doc.setTextColor(15, 23, 42);
    doc.text(m.val, mx + 10, y + 38);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.4);
    doc.setTextColor(71, 85, 105);
    doc.text(m.sub, mx + 10, y + 50);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.6);
    doc.setTextColor(4, 120, 87);
    doc.text(m.tag, mx + 10, y + 61);
  });

  y += metricH + 20;

  // Master Scope Ledger Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(`Itemized Master Scope Ledger (${formatGBP(totalGBP)} Total GBP)`, margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Converted from ZAR Base Rates • Rounded for Readability', pageWidth - margin, y, {
    align: 'right'
  });
  y += 10;

  // Table Header
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 24, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(52, 211, 153);
  doc.text('DELIVERABLE / SCOPE ITEM', margin + 10, y + 15.5);
  doc.text('KEY BUSINESS & ARCHITECTURAL OUTCOME', margin + 195, y + 15.5);
  doc.text('INVESTMENT', pageWidth - margin - 10, y + 15.5, { align: 'right' });
  y += 24;

  const scopeRows = [
    {
      title: '01. Tri-Brand Landing Page (/)',
      outcome: 'Flagship homepage uniting Cooked Chicken, Cresswell Dairy, and Sunnydale Fries under the Vestey 1897 heritage.',
      cost: '£450 GBP'
    },
    {
      title: '02. Cooked Chicken Page (/chicken)',
      outcome: 'Dedicated catalogue for 8 Signature Gourmet SKUs, deep-frozen specs, 11 packaging languages, Halal & EU plant stamps.',
      cost: '£350 GBP'
    },
    {
      title: '03. Cresswell Dairy Page (/dairy)',
      outcome: 'Foodservice blocks, Dutch wheels, Italian hard cheese, retail portion wedges, natural slices & commercial bulk butter.',
      cost: '£450 GBP'
    },
    {
      title: '04. Sunnydale Fries Page (/fries)',
      outcome: 'Shoestring & straight-cut fries, sweet potato, breakfast hash brown patties & specialty shapes with coated/uncoated toggles.',
      cost: '£350 GBP'
    },
    {
      title: '05. Contact Us & Global RFQ (/contact)',
      outcome: 'Streamlined B2B wholesale inquiry portal routing buyers directly to Vestey Surrey trade desk with anti-spam security.',
      cost: 'Included'
    },
    {
      title: '06. Custom Code Kings Command Center',
      outcome: options.commandCenterEnabled
        ? 'Client portal allowing Vestey staff to manage products, adjust specs, and replace PDF brochures without a developer.'
        : '[Optional Add-On: Not selected - Available for +£1,150 GBP / R25,000 ZAR]',
      cost: options.commandCenterEnabled ? `+${formatGBP(COMMAND_CENTER_GBP)} GBP` : 'Optional'
    }
  ];

  scopeRows.forEach((row, idx) => {
    const rowH = 38;
    const isCc = idx === 5;
    doc.setFillColor(
      isCc && options.commandCenterEnabled
        ? 240
        : idx % 2 === 0
        ? 255
        : 248,
      isCc && options.commandCenterEnabled
        ? 253
        : idx % 2 === 0
        ? 255
        : 250,
      isCc && options.commandCenterEnabled
        ? 244
        : idx % 2 === 0
        ? 255
        : 252
    );
    doc.rect(margin, y, contentWidth, rowH, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y + rowH, pageWidth - margin, y + rowH);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(isCc && !options.commandCenterEnabled ? 100 : 15, 23, 42);
    doc.text(row.title, margin + 10, y + 22);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    doc.setTextColor(isCc && !options.commandCenterEnabled ? 120 : 51, 65, 85);
    const descLines = doc.splitTextToSize(row.outcome, 260);
    doc.text(descLines, margin + 195, y + 16);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(isCc && options.commandCenterEnabled ? 4 : 15, isCc && options.commandCenterEnabled ? 120 : 23, 42);
    doc.text(row.cost, pageWidth - margin - 10, y + 22, { align: 'right' });

    y += rowH;
  });

  drawFooter();

  // =========================================================================
  // PAGE 2: ARCHITECTURAL SPECIFICATION & PRODUCT VERTICALS
  // =========================================================================
  doc.addPage();
  drawHeaderBanner('Architectural Breakdown: 5 Pages & Product Verticals', '2');

  const pageModules = [
    {
      title: 'Flagship Tri-Brand Landing Page (/)',
      details: [
        'Celebrates Vestey Foods International 130-year family-owned heritage (Since 1897) and presence in 100+ countries.',
        'Interactive tri-brand selector allowing buyers to jump directly into Cooked Chicken, Dairy Farm, or Potato solutions.',
        'Download center providing instant 1-click access to print brochures (Dairy Catalogue, Chicken Brochure, Sunnydale Flyer).',
        'Optimized for rapid page load (<90ms edge response) across desktop, tablet, and mobile browsers.'
      ]
    },
    {
      title: 'Cresswell Signature Gourmet Cooked Chicken (/cooked-chicken)',
      details: [
        'Comprehensive 8-SKU directory: Popcorn (5-9g), Innerfillet (40-50g), Skewers (100g), Strips (12mm), Slices (5mm), Dices (12mm), and Whole Roasted Breasts (110-130g).',
        'Dual-view photography presenting plated dish concepts alongside retail pouches and 10 kg master cartons.',
        'Key compliance data: Produced in PRC in an EU-approved factory, Halal certified, and packed in 11-language retail pouches (EN, DK, SE, FR, PL, LT, LV, EE, SK, CZ, RO).'
      ]
    },
    {
      title: 'Cresswell Dairy Farm Catalogue (/dairy)',
      details: [
        'Organized into Foodservice and Retail lines with an instant category filter.',
        'Foodservice: Mozzarella blocks (2.3kg) & shreds (2kg), Danish White/Blue, Italian Grana Padano & hard cheeses, Dutch wheels & Edam balls, Cheddar, and 9-month shelf-life Cheese Alternatives.',
        'Retail lines: 160g natural cheese slices (Edam, Gouda, Emmental, Swiss, Cheddar), 200g portion wedges, and processed sandwich slices.',
        'Butter lines: 15kg/25kg bulk boxes, 10g single-serve cups, and salted/unsalted foil portions (EU and South Africa origins).'
      ]
    },
    {
      title: 'Sunnydale Farms Fries & Potato Solutions (/fries)',
      details: [
        'Cut thickness matrix: 1/4" Shoestring (7x7mm), 3/8" Straight Cut (9x9mm), 12/12" Thick Cut, and Coated Sweet Potato.',
        'Specialty and breakfast shapes: Oval patties, Triangles, Balls, Oliver, Rounds, Tater Tots, Skin-on Wedges, Criss Cross, and Smiley faces.',
        'Packaging display showing Sunnydale Farms retail bags alongside Cresswell commercial boxes.'
      ]
    },
    {
      title: 'Global Trade RFQ Portal & Optional Command Center',
      details: [
        'RFQ form enabling buyers to specify product lines, volume (FCL container, pallet, samples), and delivery destinations.',
        'Automated dispatch to Vestey Surrey trade desk (cresswell@vestey.com / sunnydale@vestey.com) with anti-spam security.',
        'Optional Command Center: Enables non-technical Vestey staff to update products, pack specs, and replace PDF brochures independently.'
      ]
    }
  ];

  pageModules.forEach((mod) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, 98, 4, 4, 'FD');

    doc.setFillColor(16, 185, 129);
    doc.roundedRect(margin, y, 3.5, 98, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(mod.title, margin + 12, y + 17);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    doc.setTextColor(51, 65, 85);
    mod.details.forEach((d, idx) => {
      doc.text(`•  ${d}`, margin + 12, y + 33 + idx * 15, { maxWidth: contentWidth - 24 });
    });

    y += 106;
  });

  drawFooter();

  // =========================================================================
  // PAGE 3: ROADMAP, TERMS & ASSUMPTIONS
  // =========================================================================
  doc.addPage();
  drawHeaderBanner('Turnkey Delivery Timeline & SOW Terms', '3');

  // 4 Roadmap Phases
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('3-4 Week Turnkey Rollout Plan', margin, y);
  y += 12;

  ROADMAP_MILESTONES.forEach((phase) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, 74, 4, 4, 'FD');

    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, y, 95, 74, 4, 4, 'F');
    doc.setDrawColor(187, 247, 208);
    doc.line(margin + 95, y, margin + 95, y + 74);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(4, 120, 87);
    doc.text(phase.step, margin + 10, y + 22);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(71, 85, 105);
    doc.text(phase.timeline, margin + 10, y + 36);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(phase.title, margin + 108, y + 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    doc.setTextColor(51, 65, 85);
    phase.deliverables.slice(0, 3).forEach((del, idx) => {
      doc.text(`•  ${del}`, margin + 108, y + 35 + idx * 12, { maxWidth: contentWidth - 120 });
    });

    y += 82;
  });

  y += 8;

  // Assumptions & Exclusions 2-Col
  const colW = (contentWidth - 14) / 2;
  const colH = 140;

  // Left Col: Assumptions
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, colW, colH, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(4, 120, 87);
  doc.text('PROJECT ASSUMPTIONS & STANDARDS', margin + 10, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(51, 65, 85);
  SOW_ASSUMPTIONS.slice(0, 5).forEach((a, idx) => {
    doc.text(`0${idx + 1}. ${a}`, margin + 10, y + 34 + idx * 21, { maxWidth: colW - 20 });
  });

  // Right Col: Exclusions
  const rx = margin + colW + 14;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(rx, y, colW, colH, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('EXCLUSIONS & BOUNDARIES', rx + 10, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(51, 65, 85);
  SOW_EXCLUSIONS.forEach((e, idx) => {
    doc.text(`•  ${e}`, rx + 10, y + 34 + idx * 24, { maxWidth: colW - 20 });
  });

  drawFooter();

  // =========================================================================
  // PAGE 4: COMMERCIAL ACCEPTANCE, SIGNATORIES & PAYMENT
  // =========================================================================
  doc.addPage();
  drawHeaderBanner('Commercial Acceptance & Tri-Signatory Execution', '4');

  // Payment Options Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 90, 4, 4, 'FD');

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, y, contentWidth, 20, 4, 4, 'F');
  doc.rect(margin, y + 16, contentWidth, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(52, 211, 153);
  doc.text('COMMERCIAL WIRE & PAYMENT INSTRUCTIONS', margin + 10, y + 13.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(51, 65, 85);
  doc.text(
    `Beneficiary Name: ${BANKING_DETAILS.accountName}   |   Bank: ${BANKING_DETAILS.bankName}   |   Account No: ${BANKING_DETAILS.accountNumber}`,
    margin + 10,
    y + 36
  );
  doc.text(
    `Branch Code: ${BANKING_DETAILS.branchCode}   |   SWIFT / BIC Code: ${BANKING_DETAILS.swiftCode}   |   Payment Ref: ${BANKING_DETAILS.paymentReference}`,
    margin + 10,
    y + 52
  );
  doc.text(
    `Credit Card Gateway: Direct Paystack / Yoco online card clearing available with instant confirmation.`,
    margin + 10,
    y + 68
  );

  y += 105;

  // Tri-Signatory Execution Block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Authorized Signatories & Digital Acceptance', margin, y);
  y += 14;

  const sigColW = (contentWidth - 16) / 3;
  const sigH = 145;

  // Signatory 1: Lead Developer (Seth Bredenkamp)
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, sigColW, sigH, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(4, 120, 87);
  doc.text('AGENCY LEAD DEVELOPER', margin + 10, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(4, 120, 87);
  doc.text('Seth Bredenkamp', margin + 10, y + 60);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('Seth Bredenkamp', margin + 10, y + 90);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(71, 85, 105);
  doc.text('Principal Solutions Architect\nCode Kings Digital Agency', margin + 10, y + 104);

  // Signatory 2: Managing Director (Megan Bredenkamp)
  const mx2 = margin + sigColW + 8;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(mx2, y, sigColW, sigH, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(4, 120, 87);
  doc.text('AGENCY MANAGING DIRECTOR', mx2 + 10, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(4, 120, 87);
  doc.text('Megan Bredenkamp', mx2 + 10, y + 60);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('Megan Bredenkamp', mx2 + 10, y + 90);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(71, 85, 105);
  doc.text('Managing Director & Commercial Lead\nCode Kings Digital Agency', mx2 + 10, y + 104);

  // Signatory 3: Client Signatory (Vestey Foods)
  const mx3 = margin + (sigColW + 8) * 2;
  doc.setFillColor(options.isExecuted ? 240 : 255, options.isExecuted ? 253 : 255, options.isExecuted ? 244 : 255);
  doc.setDrawColor(options.isExecuted ? 74 : 203, options.isExecuted ? 222 : 213, options.isExecuted ? 128 : 225);
  doc.roundedRect(mx3, y, sigColW, sigH, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(4, 120, 87);
  doc.text('CLIENT SIGNATORY', mx3 + 10, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(options.isExecuted ? 4 : 100, options.isExecuted ? 120 : 116, options.isExecuted ? 87 : 139);
  doc.text(resolvedClientName, mx3 + 10, y + 60);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(resolvedClientName, mx3 + 10, y + 90);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(71, 85, 105);
  doc.text(`${resolvedClientTitle}\n${CLIENT_INFO.companyName}`, mx3 + 10, y + 104);

  y += sigH + 16;

  // Execution Seal Notice
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 42, 4, 4, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(4, 120, 87);
  doc.text(
    options.isExecuted
      ? `VERIFIED EXECUTION RECORD: CK-VESTEY-2026-EXECUTED • ${options.executedAt || 'NOVEMBER 2026'}`
      : 'PENDING CLIENT AUTHORIZATION • PHASE 1 STAGING SETUP ACTIVE UPON SIGNING',
    margin + 12,
    y + 17
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Official proposal generated by Code Kings Digital Agency for Vestey Foods International Ltd (Surrey, UK). Staging environment: vestey-staging.vercel.app`,
    margin + 12,
    y + 30
  );

  drawFooter();

  // Save the PDF
  const filename = `CodeKings-VesteyFoods-ExecutiveProposal-${totalGBP}GBP.pdf`;
  doc.save(filename);
}
