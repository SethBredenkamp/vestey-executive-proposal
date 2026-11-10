import React, { useState } from 'react';
import {
  ShieldAlert,
  Sliders,
  CheckCircle2,
  FileUp,
  PackagePlus,
  Users,
  Database,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Download,
  Eye,
  Settings,
  X,
  Edit3,
  Bell,
  Globe,
  FileText,
  Laptop,
  Layers,
  Zap,
  TrendingUp,
  Clock,
  Coins
} from 'lucide-react';
import {
  COMMAND_CENTER_GBP,
  COMMAND_CENTER_ZAR,
  BASE_BUILD_GBP,
  formatGBP,
  formatZAR
} from '../data/proposalData';

interface CommandCenterSimulatorProps {
  onPrevPage: () => void;
  onNextPage: () => void;
  commandCenterEnabled: boolean;
  onToggleCommandCenter: (enabled: boolean) => void;
}

type ActiveTab = 'products' | 'catalogues' | 'leads' | 'announcements' | 'permissions';
type ActiveModal = 'none' | 'editProduct' | 'addSku' | 'uploadPdf' | 'viewLead' | 'announcement';

export const CommandCenterSimulator: React.FC<CommandCenterSimulatorProps> = ({
  onPrevPage,
  onNextPage,
  commandCenterEnabled,
  onToggleCommandCenter
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('products');
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  // Live editable products in state
  const [mockProducts, setMockProducts] = useState([
    {
      id: '1',
      title: 'Breaded & Roasted Chicken Popcorn (5-9g)',
      category: 'Cooked Chicken',
      pack: '10 x 1 kg (10 kg carton)',
      shelfLife: '12 Months',
      status: 'Active',
      origin: 'EU Approved Plant (PRC)',
      languages: '11 Languages (EN, DK, SE, FR, PL...)'
    },
    {
      id: '2',
      title: 'Cresswell Mozzarella Block (Frozen 2.3kg)',
      category: 'Cresswell Dairy',
      pack: '4 x 2.3 kg (9.2 kg carton)',
      shelfLife: '12 Months',
      status: 'Active',
      origin: 'European Origin',
      languages: 'Commercial Foodservice'
    },
    {
      id: '3',
      title: 'Sunnydale 1/4" Shoestring Fries (7x7mm)',
      category: 'Sunnydale Farms',
      pack: '4 x 2.5 kg (10 kg carton)',
      shelfLife: '18 Months',
      status: 'Active',
      origin: 'Selected European Potatoes',
      languages: 'Bilingual Foodservice Master'
    },
    {
      id: '4',
      title: 'Whole Roasted Chicken Breasts (110-130g)',
      category: 'Cooked Chicken',
      pack: '2 x 2.5 kg (5 kg carton)',
      shelfLife: '12 Months',
      status: 'Active',
      origin: 'Halal Certified Facility',
      languages: 'Retail Pouch & Foodservice'
    }
  ]);

  const [mockBrochures, setMockBrochures] = useState([
    {
      name: 'Cresswell_Dairy_Catalogue_2025.pdf',
      size: '9.2 MB',
      updated: '2025/2026 Edition',
      status: 'Published',
      fileUrl: '/catalogues/cresswell-dairy-catalogue-2025.pdf'
    },
    {
      name: 'Signature_Gourmet_Chicken_Brochure.pdf',
      size: '9.5 MB',
      updated: 'Print Specification',
      status: 'Published',
      fileUrl: '/catalogues/cresswell-chicken-brochure.pdf'
    },
    {
      name: 'Sunnydale_Farms_Potato_Flyer.pdf',
      size: '4.6 MB',
      updated: 'International Edition',
      status: 'Published',
      fileUrl: '/catalogues/sunnydale-farms-potato-flyer.pdf'
    }
  ]);

  const [mockLeads] = useState([
    {
      id: 'rfq-101',
      buyer: 'EuroFood Distribution GmbH',
      contact: 'Hans Weber (Procurement Director)',
      location: 'Hamburg, Germany',
      products: 'Mozzarella Blocks (2.3kg) & Roasted Chicken Strips',
      volume: '2x 40ft FCL Reefer Containers per Quarter',
      date: 'Today, 08:42 GMT',
      status: 'Unread • High Priority'
    },
    {
      id: 'rfq-102',
      buyer: 'Iberia Gastronomia SA',
      contact: 'Sofia Mendez (Category Buyer)',
      location: 'Lisbon, Portugal',
      products: 'Sunnydale Shoestring Fries & Chicken Popcorn',
      volume: 'Sample Pallet for Supermarket Evaluation',
      date: 'Yesterday, 14:15 GMT',
      status: 'Dispatched to Surrey Desk'
    }
  ]);

  const [announcementText, setAnnouncementText] = useState(
    'Visit Vestey Foods International at SIAL Paris 2026 • Stand 5A-E120'
  );
  const [announcementActive, setAnnouncementActive] = useState(true);

  // Form states for modals
  const [editTitle, setEditTitle] = useState('');
  const [editPack, setEditPack] = useState('');
  const [editShelfLife, setEditShelfLife] = useState('');
  const [editStatus, setEditStatus] = useState('Active');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const openEditModal = (product: any) => {
    setSelectedProduct(product);
    setEditTitle(product.title);
    setEditPack(product.pack);
    setEditShelfLife(product.shelfLife);
    setEditStatus(product.status);
    setActiveModal('editProduct');
  };

  const handleSaveProductEdit = () => {
    if (!selectedProduct) return;
    setMockProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...p,
              title: editTitle.trim() || p.title,
              pack: editPack.trim() || p.pack,
              shelfLife: editShelfLife.trim() || p.shelfLife,
              status: editStatus
            }
          : p
      )
    );
    setActiveModal('none');
    showToast(`Updated "${editTitle || selectedProduct.title}" on live storefront.`);
  };

  const handleToggleProductStatus = (id: string) => {
    setMockProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Active' ? 'Draft' : 'Active' } : p
      )
    );
    showToast('Product status updated instantly across storefront.');
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 w-full overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-400 bg-ck-surface2 px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Chapter Eyebrow Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <span className="ck-eyebrow">Chapter 04 • Custom Client Backend</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Custom Code Kings Command Center (+{formatGBP(COMMAND_CENTER_GBP)})
          </h2>
          <p className="text-xs sm:text-sm text-ck-fg2 mt-1">
            Give the Vestey team total sovereignty to manage products, pack weights, catalogues, and wholesale leads on their own.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrevPage}
            className="rounded-full border border-[var(--line-2)] bg-ck-surface px-4 py-2 text-xs text-ck-fg hover:border-emerald-400"
          >
            ← Catalogue
          </button>
          <button
            type="button"
            onClick={onNextPage}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-emerald-950 hover:bg-emerald-300"
          >
            Roadmap & SOW →
          </button>
        </div>
      </div>

      {/* =========================================================================
          SALES ENGINEERING: ROI & FINANCIAL CASE FOR THE COMMAND CENTER
          ========================================================================= */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-ck-surface to-ck-surface2 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Executive Sales Engineering • The Business Case</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Why We Strongly Recommend Adding The Custom Command Center
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              In international food wholesale, specifications change constantly: seasonal minimum order quantities, Halal certificate renewals, new carton pack sizes, and updated PDF brochures. 
              Without a custom backend, you must email a developer for every tiny text change and wait days for an invoice. With our Command Center, your marketing or sales staff update specs in 15 seconds.
            </p>
          </div>

          {/* Scope Toggle Widget */}
          <div className="rounded-2xl border border-white/10 bg-ck-bg p-5 lg:w-84 shrink-0 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase text-zinc-400 font-semibold">Scope Status</span>
              <span
                className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                  commandCenterEnabled
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {commandCenterEnabled ? '✓ ACTIVE IN QUOTE' : '○ OPTIONAL ADD-ON'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-zinc-300 font-medium">One-Time Addition</span>
                <span className="font-mono text-lg font-bold text-emerald-400">
                  +{formatGBP(COMMAND_CENTER_GBP)} <span className="text-xs text-zinc-400 font-normal">GBP</span>
                </span>
              </div>
              <div className="text-[10.5px] font-mono text-zinc-500 text-right">
                (R25,000 ZAR base • No ongoing monthly fees)
              </div>
            </div>

            <button
              type="button"
              onClick={() => onToggleCommandCenter(!commandCenterEnabled)}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg ${
                commandCenterEnabled
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25'
              }`}
            >
              {commandCenterEnabled ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Command Center Included in Quote</span>
                </>
              ) : (
                <>
                  <PackagePlus className="h-4 w-4" />
                  <span>+ Include Command Center in Quote</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Traditional Agency Retainer Trap */}
          <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-5 space-y-3">
            <div className="flex items-center gap-2 text-red-400">
              <Coins className="h-4 w-4" />
              <h4 className="font-bold text-sm text-white">Traditional Agency Approach (Dependency Model)</h4>
            </div>
            <ul className="space-y-2 text-xs text-zinc-400 leading-normal">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>Monthly Retainers:</strong> £300 to £600/month just to keep developers on call for brochure swaps.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>Turnaround Delays:</strong> Waiting 3–5 business days for simple carton weight edits or typos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span><strong>WordPress Bloat:</strong> 35+ fragile plugins that break on PHP updates and expose security vulnerabilities.</span>
              </li>
              <li className="flex items-start gap-2 font-mono text-[11px] text-red-300 pt-1">
                <span>Estimated 2-Year Cost: £7,200+ in ongoing maintenance</span>
              </li>
            </ul>
          </div>

          {/* Code Kings Custom Command Center */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Zap className="h-4 w-4" />
              <h4 className="font-bold text-sm text-white">Code Kings Command Center (Total Sovereignty)</h4>
            </div>
            <ul className="space-y-2 text-xs text-zinc-300 leading-normal">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Zero Monthly Retainers:</strong> One-off investment of +£1,150. You own it forever with 0 subscription fees.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>15-Second Edits:</strong> Vestey staff update specs, add new SKUs, or replace PDFs with instant edge deployment.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Bespoke Foodservice Architecture:</strong> Built specifically around Cooked Chicken, Dairy, and Potato specifications.</span>
              </li>
              <li className="flex items-start gap-2 font-mono text-[11px] text-emerald-300 pt-1">
                <span>Return On Investment: Pays for itself within the first 3 catalog updates</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE CONSOLE SIMULATOR: MAC OS SHELL WITH SIDEPANEL & MODALS
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-mono text-xs uppercase text-emerald-400 font-bold tracking-wider">
              Interactive Prototype Sandbox
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Experience the Command Center Interface (Live Test Below)
            </h3>
          </div>
          <span className="font-mono text-xs text-zinc-400">
            Click any button, edit a SKU, or launch a sidepanel modal
          </span>
        </div>

        {/* Mac OS Styled Dashboard Console */}
        <div className="rounded-2xl border border-white/15 bg-ck-bg shadow-2xl overflow-hidden flex flex-col">
          {/* Top Window Chrome Bar */}
          <div className="bg-ck-surface2 px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs text-zinc-400 font-semibold hidden sm:inline">
                vestey-command-center.codekings.dev • Protected Admin Portal
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-[10.5px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SSL Secured • Surrey Desk</span>
              </span>
            </div>
          </div>

          {/* Main Console Split: Sidepanel (Left) + Active Work Area (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
            {/* ==============================================================
                LEFT SIDEPANEL: MODAL LAUNCHERS & NAVIGATION
                ============================================================== */}
            <aside className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 bg-ck-surface p-4 sm:p-5 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Brand Header inside sidepanel */}
                <div className="border-b border-white/5 pb-4">
                  <div className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    VESTEY FOODS UK • ADMIN
                  </div>
                  <h4 className="text-base font-bold text-white mt-0.5">Control Center Navigation</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Select a section or click an operational modal below to test.
                  </p>
                </div>

                {/* Primary Section Tabs */}
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block px-2 pb-1">
                    Management Views
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveTab('products')}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition ${
                      activeTab === 'products'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <PackagePlus className="h-4 w-4 text-emerald-400" />
                      <span>Products & Spec Sheets</span>
                    </div>
                    <span className="rounded bg-black/40 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                      {mockProducts.length} SKUs
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('catalogues')}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition ${
                      activeTab === 'catalogues'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileUp className="h-4 w-4 text-cyan-400" />
                      <span>PDF Brochure Manager</span>
                    </div>
                    <span className="rounded bg-black/40 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                      3 Files
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('leads')}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition ${
                      activeTab === 'leads'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="h-4 w-4 text-amber-400" />
                      <span>Trade Inquiries (RFQs)</span>
                    </div>
                    <span className="rounded bg-amber-500/20 text-amber-300 px-2 py-0.5 font-mono text-[10px] font-bold">
                      2 New
                    </span>
                  </button>
                </div>

                {/* SIDE PANEL MODAL LAUNCHERS SECTION (Requested by User) */}
                <div className="rounded-xl border border-white/10 bg-ck-bg p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-emerald-400 font-bold">
                      Interactive Modals Palette
                    </span>
                    <span className="font-mono text-[9px] text-zinc-500">Click to Open</span>
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-snug">
                    Launch actual self-service modals to test real-time workflow:
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProduct(mockProducts[0]);
                        setEditTitle(mockProducts[0].title);
                        setEditPack(mockProducts[0].pack);
                        setEditShelfLife(mockProducts[0].shelfLife);
                        setEditStatus(mockProducts[0].status);
                        setActiveModal('editProduct');
                      }}
                      className="w-full flex items-center justify-between rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-2 text-[11.5px] text-zinc-200 transition border border-white/5"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Edit3 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">Edit Product Spec Modal</span>
                      </div>
                      <ArrowRight className="h-3 w-3 text-zinc-500 shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveModal('uploadPdf')}
                      className="w-full flex items-center justify-between rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-2 text-[11.5px] text-zinc-200 transition border border-white/5"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileUp className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">Upload PDF Brochure Modal</span>
                      </div>
                      <ArrowRight className="h-3 w-3 text-zinc-500 shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLead(mockLeads[0]);
                        setActiveModal('viewLead');
                      }}
                      className="w-full flex items-center justify-between rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-2 text-[11.5px] text-zinc-200 transition border border-white/5"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Users className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">Container RFQ Detail Modal</span>
                      </div>
                      <ArrowRight className="h-3 w-3 text-zinc-500 shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveModal('announcement')}
                      className="w-full flex items-center justify-between rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-2 text-[11.5px] text-zinc-200 transition border border-white/5"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Bell className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">Storefront Notice Bar Modal</span>
                      </div>
                      <ArrowRight className="h-3 w-3 text-zinc-500 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidepanel Bottom User Badge */}
              <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-[10px]">
                    VF
                  </div>
                  <div>
                    <span className="text-white font-semibold block text-[11.5px]">Vestey Admin</span>
                    <span className="text-[10px] text-zinc-500">cresswell@vestey.com</span>
                  </div>
                </div>
                <Lock className="h-3.5 w-3.5 text-zinc-500" />
              </div>
            </aside>

            {/* ==============================================================
                RIGHT MAIN WORKSPACE VIEW
                ============================================================== */}
            <main className="lg:col-span-8 p-5 sm:p-6 space-y-5 bg-ck-bg flex flex-col justify-between">
              {/* TAB 1: Products & Specs Management */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-white">Live Product Specifications</h4>
                      <p className="text-xs text-zinc-400">
                        Changes here update the public Landing, Chicken, Dairy, and Fries pages instantaneously.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProduct(mockProducts[0]);
                        setEditTitle('');
                        setEditPack('');
                        setEditShelfLife('');
                        setActiveModal('addSku');
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-2 text-xs font-mono font-bold text-emerald-300 hover:bg-emerald-500/30 transition shadow-sm"
                    >
                      <PackagePlus className="h-3.5 w-3.5" />
                      <span>+ Add New SKU</span>
                    </button>
                  </div>

                  {/* Products Table with responsive overflow */}
                  <div className="rounded-xl border border-white/10 bg-ck-surface overflow-x-auto">
                    <table className="w-full text-left text-xs min-w-[580px]">
                      <thead className="bg-ck-surface2 border-b border-white/5 text-[10.5px] font-mono text-zinc-400 uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Product Title & Vertical</th>
                          <th className="py-2.5 px-3">Pack & Carton Weight</th>
                          <th className="py-2.5 px-3">Shelf Life</th>
                          <th className="py-2.5 px-3">Storefront Status</th>
                          <th className="py-2.5 px-3 text-right">Quick Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {mockProducts.map((p) => (
                          <tr key={p.id} className="hover:bg-white/[0.02] transition">
                            <td className="py-3 px-3">
                              <span className="font-semibold text-white block text-xs">{p.title}</span>
                              <span className="font-mono text-[10px] text-emerald-400">{p.category}</span>
                            </td>
                            <td className="py-3 px-3 text-zinc-300 font-mono text-[11px]">{p.pack}</td>
                            <td className="py-3 px-3 text-zinc-400 font-mono text-[11px]">{p.shelfLife}</td>
                            <td className="py-3 px-3">
                              <button
                                type="button"
                                onClick={() => handleToggleProductStatus(p.id)}
                                className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded transition ${
                                  p.status === 'Active'
                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                                }`}
                                title="Click to toggle between Active & Draft"
                              >
                                {p.status} (Click to toggle)
                              </button>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => openEditModal(p)}
                                className="inline-flex items-center gap-1 rounded bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition"
                              >
                                <Edit3 className="h-3 w-3 text-emerald-400" />
                                <span>Edit Spec</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: PDF Brochures Manager */}
              {activeTab === 'catalogues' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-white">Live PDF Brochure Manager</h4>
                      <p className="text-xs text-zinc-400">
                        Upload new seasonal brochures or replace existing files with zero developer support.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveModal('uploadPdf')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-2 text-xs font-mono font-bold text-emerald-300 hover:bg-emerald-500/30 transition shadow-sm"
                    >
                      <FileUp className="h-3.5 w-3.5" />
                      <span>Upload New PDF</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {mockBrochures.map((b, idx) => (
                      <div key={idx} className="rounded-xl border border-white/10 bg-ck-surface p-4 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase">{b.status}</span>
                            <span className="font-mono text-[10px] text-zinc-500">{b.size}</span>
                          </div>
                          <h5 className="text-xs font-bold text-white truncate" title={b.name}>{b.name}</h5>
                          <div className="text-[11px] text-zinc-400 font-mono">Edition: {b.updated}</div>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-white/5">
                          <a
                            href={b.fileUrl}
                            download={b.name}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-1.5 px-2.5 rounded bg-emerald-500/10 text-[11px] text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 font-mono text-center flex items-center justify-center gap-1.5 transition font-semibold"
                          >
                            <Download className="h-3 w-3" />
                            <span>Download Current</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => setActiveModal('uploadPdf')}
                            className="w-full py-1 px-2 rounded bg-white/5 text-[10.5px] text-zinc-400 hover:text-white transition font-mono"
                          >
                            Replace File
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Wholesale Leads Inbound */}
              {activeTab === 'leads' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-white">Inbound Wholesale Trade Inquiries</h4>
                      <p className="text-xs text-zinc-400">
                        Inquiries from European distributors submitted via the Global RFQ page route here and email Surrey desks.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => showToast('Exporting trade inquiries to CSV format...')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/10 px-3.5 py-2 text-xs font-mono font-semibold text-white hover:bg-white/20 transition"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export CSV to Sales</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {mockLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          setActiveModal('viewLead');
                        }}
                        className="rounded-xl border border-white/10 bg-ck-surface p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs cursor-pointer hover:border-emerald-500/40 transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{lead.buyer}</span>
                            <span className="font-mono text-[10px] text-emerald-400 rounded bg-emerald-500/10 px-2 py-0.5 font-semibold">
                              {lead.location}
                            </span>
                          </div>
                          <p className="text-zinc-300 text-xs">
                            <strong className="text-zinc-400">Demand:</strong> {lead.products}
                          </p>
                          <p className="font-mono text-[11px] text-emerald-300">
                            Volume: {lead.volume}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-mono text-[11px] text-zinc-400 block">{lead.date}</span>
                          <span className="inline-block mt-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                            Click to View Full RFQ
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Feature Pill Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Password Protected & Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Instant Global Edge Cache Invalidation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Full Mobile Phone Administration</span>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* =========================================================================
          INTERACTIVE MODALS (Popups for Sidepanel Action triggers)
          ========================================================================= */}

      {/* MODAL 1: Edit Product Specification */}
      {activeModal === 'editProduct' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-emerald-500/40 bg-ck-surface p-5 sm:p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="h-4 w-4 text-emerald-400" />
                <h4 className="font-bold text-white text-base">Edit Product Specification</h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-zinc-400 font-mono text-[11px] uppercase mb-1">
                  Product Commercial Name
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-ck-bg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-mono text-[11px] uppercase mb-1">
                    Pack & Master Carton
                  </label>
                  <input
                    type="text"
                    value={editPack}
                    onChange={(e) => setEditPack(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-ck-bg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-mono text-[11px] uppercase mb-1">
                    Shelf Life Duration
                  </label>
                  <input
                    type="text"
                    value={editShelfLife}
                    onChange={(e) => setEditShelfLife(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-ck-bg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-mono text-[11px] uppercase mb-1">
                  Storefront Publication Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-ck-bg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="Active">Active (Visible to Global Wholesale Buyers)</option>
                  <option value="Draft">Draft (Hidden from Public Storefront)</option>
                </select>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-end gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="px-4 py-2 rounded-xl border border-white/10 text-zinc-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProductEdit}
                className="px-5 py-2 rounded-xl bg-emerald-400 font-bold text-slate-950 hover:bg-emerald-300 transition"
              >
                Save Changes to Live Site
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add New SKU Modal */}
      {activeModal === 'addSku' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-emerald-500/40 bg-ck-surface p-5 sm:p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <PackagePlus className="h-4 w-4 text-emerald-400" />
                <h4 className="font-bold text-white text-base">Add New Product SKU</h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-zinc-400 font-mono text-[11px] uppercase mb-1">
                  Product Category Vertical
                </label>
                <select className="w-full rounded-xl border border-white/10 bg-ck-bg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400">
                  <option>Cooked Chicken (Cresswell Signature Gourmet)</option>
                  <option>Dairy Farm (Mozzarella, Cheddar, Dutch Wheels, Butter)</option>
                  <option>Sunnydale Farms (Fries, Wedges, Potato Specialties)</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 font-mono text-[11px] uppercase mb-1">
                  New Product Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Garlic & Herb Cooked Chicken Breast Skewers"
                  className="w-full rounded-xl border border-white/10 bg-ck-bg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-mono text-[11px] uppercase mb-1">
                    Pack / Carton Spec
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10 x 1 kg (10 kg carton)"
                    className="w-full rounded-xl border border-white/10 bg-ck-bg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-mono text-[11px] uppercase mb-1">
                    Shelf Life
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 12 Months at -18°C"
                    className="w-full rounded-xl border border-white/10 bg-ck-bg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-end gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="px-4 py-2 rounded-xl border border-white/10 text-zinc-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal('none');
                  showToast('New SKU published to live staging directory.');
                }}
                className="px-5 py-2 rounded-xl bg-emerald-400 font-bold text-slate-950 hover:bg-emerald-300 transition"
              >
                Publish New SKU
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Upload PDF Brochure Modal */}
      {activeModal === 'uploadPdf' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/40 bg-ck-surface p-5 sm:p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <FileUp className="h-4 w-4 text-cyan-400" />
                <h4 className="font-bold text-white text-base">Replace Downloadable PDF Brochure</h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-mono text-[11px] uppercase mb-1">
                  Target Brochure To Replace
                </label>
                <select className="w-full rounded-xl border border-white/10 bg-ck-bg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400">
                  <option>Cresswell Dairy Catalogue 2025/2026 Edition</option>
                  <option>Signature Gourmet Cooked Chicken Brochure</option>
                  <option>Sunnydale Farms Potato Products Flyer</option>
                </select>
              </div>

              {/* Drag and Drop Box */}
              <div
                onClick={() => showToast('Simulating PDF replacement...')}
                className="rounded-2xl border-2 border-dashed border-white/20 bg-ck-bg p-8 text-center space-y-2 cursor-pointer hover:border-cyan-400/60 hover:bg-white/[0.02] transition"
              >
                <FileUp className="h-8 w-8 text-cyan-400 mx-auto" />
                <span className="font-semibold text-white block text-sm">
                  Drag & Drop New PDF File Here
                </span>
                <span className="text-[11px] text-zinc-400 block font-mono">
                  Supports up to 50 MB print-ready files (.pdf)
                </span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-end gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="px-4 py-2 rounded-xl border border-white/10 text-zinc-300 hover:text-white"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal('none');
                  showToast('PDF successfully replaced. Public download button updated.');
                }}
                className="px-5 py-2 rounded-xl bg-cyan-400 font-bold text-slate-950 hover:bg-cyan-300 transition"
              >
                Confirm Replacement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Container RFQ Detail Modal */}
      {activeModal === 'viewLead' && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-amber-500/40 bg-ck-surface p-5 sm:p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-400" />
                <h4 className="font-bold text-white text-base">Wholesale RFQ Inquiry Details</h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="rounded-xl bg-ck-bg p-3.5 space-y-1.5 border border-white/5">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-zinc-500">Buyer Company:</span>
                  <span className="text-white font-bold">{selectedLead.buyer}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-zinc-500">Contact Person:</span>
                  <span className="text-zinc-300">{selectedLead.contact}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-zinc-500">Destination Port:</span>
                  <span className="text-emerald-400 font-bold">{selectedLead.location}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-zinc-500">Target Product:</span>
                  <span className="text-white">{selectedLead.products}</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-zinc-500">Container Volume:</span>
                  <span className="text-cyan-400 font-bold">{selectedLead.volume}</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                Inquiries are automatically archived here and simultaneously dispatched to Vestey Surrey trade desk (cresswell@vestey.com / sunnydale@vestey.com).
              </p>
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-end gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="px-4 py-2 rounded-xl border border-white/10 text-zinc-300 hover:text-white"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal('none');
                  showToast('Re-forwarded RFQ specification to Vestey Surrey trade desk.');
                }}
                className="px-5 py-2 rounded-xl bg-amber-400 font-bold text-slate-950 hover:bg-amber-300 transition"
              >
                Forward to Surrey Desk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Storefront Notice Bar Modal */}
      {activeModal === 'announcement' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-emerald-500/40 bg-ck-surface p-5 sm:p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-emerald-400" />
                <h4 className="font-bold text-white text-base">Storefront Announcement Bar</h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <p className="text-zinc-300 text-xs">
                Display an urgent global notice across the top of all 5 website pages (e.g. food exhibition booth details, holiday logistics cutoff dates, or new product launches).
              </p>

              <div>
                <label className="block text-zinc-400 font-mono text-[11px] uppercase mb-1">
                  Announcement Copy
                </label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-ck-bg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={announcementActive}
                  onChange={(e) => setAnnouncementActive(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-600 bg-ck-bg text-emerald-500 focus:ring-emerald-400"
                />
                <span className="text-xs text-white font-medium">Display Announcement Bar Live on Storefront</span>
              </label>
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-end gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setActiveModal('none')}
                className="px-4 py-2 rounded-xl border border-white/10 text-zinc-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal('none');
                  showToast('Announcement bar updated across all 5 public pages.');
                }}
                className="px-5 py-2 rounded-xl bg-emerald-400 font-bold text-slate-950 hover:bg-emerald-300 transition"
              >
                Save Announcement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          CLOSING CALL TO ACTION: LOCK IN THE COMMAND CENTER
          ========================================================================= */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-ck-surface to-ck-surface2 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 max-w-xl">
          <span className="font-mono text-xs uppercase text-emerald-400 font-bold tracking-wider">
            Commercial Recommendation
          </span>
          <h4 className="text-xl font-bold text-white">
            Ready to give Vestey Foods complete digital independence?
          </h4>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Lock in the Command Center now for +{formatGBP(COMMAND_CENTER_GBP)} GBP ({formatZAR(COMMAND_CENTER_ZAR)} ZAR). 
            Total investment with Command Center: <strong>{formatGBP(BASE_BUILD_GBP + COMMAND_CENTER_GBP)} GBP</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          {!commandCenterEnabled ? (
            <button
              type="button"
              onClick={() => {
                onToggleCommandCenter(true);
                showToast('Command Center added to digital scope! Total is now £2,750 GBP.');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3.5 text-xs font-extrabold text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/25 active:scale-[0.99]"
            >
              <Check className="h-4 w-4" />
              <span>Lock In Command Center (+{formatGBP(COMMAND_CENTER_GBP)})</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/50 bg-emerald-500/20 px-5 py-3 text-xs font-bold text-emerald-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Command Center Locked In ({formatGBP(BASE_BUILD_GBP + COMMAND_CENTER_GBP)} GBP Total)</span>
            </div>
          )}

          <button
            type="button"
            onClick={onNextPage}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-ck-bg px-4 py-3.5 text-xs font-medium text-white hover:border-emerald-400/40 transition"
          >
            <span>Proceed to Roadmap & SOW</span>
            <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
