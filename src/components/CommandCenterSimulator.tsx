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
  ToggleLeft,
  ToggleRight,
  Check,
  Download,
  Eye,
  Key
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

export const CommandCenterSimulator: React.FC<CommandCenterSimulatorProps> = ({
  onPrevPage,
  onNextPage,
  commandCenterEnabled,
  onToggleCommandCenter
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'catalogues' | 'leads'>('products');

  // Interactive mock states to show dev flex & utility
  const [mockProducts, setMockProducts] = useState([
    {
      id: '1',
      title: 'Breaded & Roasted Chicken Popcorn',
      category: 'Cooked Chicken',
      pack: '10 x 1 kg (10 kg carton)',
      shelfLife: '12 Months',
      status: 'Active'
    },
    {
      id: '2',
      title: 'Cresswell Mozzarella Block (Frozen)',
      category: 'Cresswell Dairy',
      pack: '4 x 2.3 kg (9.2 kg carton)',
      shelfLife: '12 Months',
      status: 'Active'
    },
    {
      id: '3',
      title: 'Sunnydale 1/4" Shoestring Fries',
      category: 'Sunnydale Farms',
      pack: 'Foodservice Master Carton',
      shelfLife: '18 Months',
      status: 'Active'
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

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-emerald-400 bg-ck-surface2 px-4 py-3 text-xs font-semibold text-white shadow-2xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Chapter Eyebrow Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <span className="ck-eyebrow">Chapter 04 • Optional Client Architecture</span>
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

      {/* Strategic Value Banner & Interactive Toggle Box */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-ck-surface to-ck-surface2 p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
              <ShieldAlert className="h-4 w-4" />
              <span>Client Autonomy & Zero WordPress Plugin Dependency</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Why We Engineered a Custom Command Center for Vestey
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Standard web agencies build sites that lock you into monthly retainers for simple text edits, or load your website with 30+ slow WordPress plugins that break every update. Our custom Command Center is lightweight, bespoke, and gives Vestey non-technical staff a clean password-protected portal to manage all 3 brand catalogues independently.
            </p>
          </div>

          {/* Interactive Toggle Card */}
          <div className="rounded-xl border border-white/10 bg-ck-bg p-5 lg:w-80 shrink-0 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase text-zinc-400 font-semibold">Scope Status</span>
              <span
                className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                  commandCenterEnabled
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {commandCenterEnabled ? 'INCLUDED' : 'NOT SELECTED'}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-zinc-300 font-medium">Add-on Cost</span>
                <span className="font-mono text-base font-bold text-emerald-400">
                  +{formatGBP(COMMAND_CENTER_GBP)} <span className="text-[10px] text-zinc-500">GBP</span>
                </span>
              </div>
              <div className="text-[10.5px] font-mono text-zinc-500 text-right">
                ({formatZAR(COMMAND_CENTER_ZAR)} ZAR base)
              </div>
            </div>

            <button
              type="button"
              onClick={() => onToggleCommandCenter(!commandCenterEnabled)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                commandCenterEnabled
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md'
                  : 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
              }`}
            >
              {commandCenterEnabled ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Command Center Active in Quote</span>
                </>
              ) : (
                <>
                  <span>+ Include in Digital Quote</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Live Interactive Command Center Interface Simulator */}
      <div className="rounded-2xl border border-[var(--line-2)] bg-ck-surface p-6 sm:p-7 space-y-6 shadow-2xl">
        {/* Mock Top Nav inside Command Center */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
            <div className="font-mono text-xs font-bold text-white flex items-center gap-2">
              <span>VESTEY COMMAND CENTER</span>
              <span className="text-zinc-500 font-normal">| Live Preview v1.0</span>
            </div>
          </div>

          {/* Sub tabs */}
          <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-ck-bg2 p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'products' ? 'bg-ck-surface text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Products & Specs ({mockProducts.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('catalogues')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'catalogues' ? 'bg-ck-surface text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              PDF Brochures ({mockBrochures.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'leads' ? 'bg-ck-surface text-white shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Trade Inquiries (2)
            </button>
          </div>
        </div>

        {/* Tab 1: Products & Specs Management */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Product Catalogue Inventory</h4>
                <p className="text-xs text-zinc-400">
                  Update packaging weights, shelf life, or toggle products live on the public site with 1 click.
                </p>
              </div>

              <button
                type="button"
                onClick={() => showToast('New product creation modal ready on live staging.')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 text-xs font-mono font-semibold text-emerald-300 hover:bg-emerald-500/30 transition"
              >
                <PackagePlus className="h-3.5 w-3.5" />
                <span>+ Add New SKU</span>
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-ck-bg overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[580px]">
                <thead className="bg-ck-surface2 border-b border-white/5 text-[10.5px] font-mono text-zinc-400 uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Product Name</th>
                    <th className="py-2.5 px-3">Vertical</th>
                    <th className="py-2.5 px-3">Pack & Carton Spec</th>
                    <th className="py-2.5 px-3">Shelf Life</th>
                    <th className="py-2.5 px-3 text-right">Status Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mockProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition">
                      <td className="py-3 px-3 font-semibold text-white">{p.title}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-emerald-400">{p.category}</td>
                      <td className="py-3 px-3 text-zinc-300">{p.pack}</td>
                      <td className="py-3 px-3 text-zinc-400">{p.shelfLife}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleProductStatus(p.id)}
                          className={`font-mono text-[10px] font-bold px-2 py-1 rounded transition ${
                            p.status === 'Active'
                              ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30'
                              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border border-zinc-600'
                          }`}
                        >
                          {p.status} (Toggle)
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: PDF Brochures Manager */}
        {activeTab === 'catalogues' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Downloadable PDF Brochures</h4>
                <p className="text-xs text-zinc-400">
                  Replace brochure files whenever new print catalogues or seasonal spec sheets are issued.
                </p>
              </div>

              <button
                type="button"
                onClick={() => showToast('File uploader ready on live staging.')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 text-xs font-mono font-semibold text-emerald-300 hover:bg-emerald-500/30 transition"
              >
                <FileUp className="h-3.5 w-3.5" />
                <span>Upload New PDF</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mockBrochures.map((b, idx) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-ck-bg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase">{b.status}</span>
                    <span className="font-mono text-[10px] text-zinc-500">{b.size}</span>
                  </div>
                  <h5 className="text-xs font-bold text-white truncate">{b.name}</h5>
                  <div className="text-[11px] text-zinc-400 font-mono">Updated: {b.updated}</div>
                  <a
                    href={b.fileUrl}
                    download={b.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 py-1.5 px-2.5 rounded bg-emerald-500/10 text-[11px] text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 font-mono text-center flex items-center justify-center gap-1.5 transition"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download Brochure</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Wholesale Leads Inbound */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Inbound Wholesale Trade Inquiries</h4>
                <p className="text-xs text-zinc-400">
                  Commercial inquiries submitted through the Contact Us RFQ page are logged here and emailed to Surrey desks.
                </p>
              </div>

              <button
                type="button"
                onClick={() => showToast('Exporting trade inquiries to CSV...')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-xs font-mono font-semibold text-white hover:bg-white/20 transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="rounded-xl border border-white/10 bg-ck-bg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">EuroFood Distribution GmbH</span>
                    <span className="font-mono text-[10px] text-emerald-400 rounded bg-emerald-500/10 px-1.5 py-0.2">
                      FCL Container
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Hamburg, Germany • Inquiring about Mozzarella Blocks (2.3kg) & Roasted Chicken Strips (12mm).
                  </p>
                </div>
                <div className="text-right font-mono text-[11px] text-zinc-500">Today, 08:42 GMT</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-ck-bg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">Iberia Gastronomia SA</span>
                    <span className="font-mono text-[10px] text-cyan-400 rounded bg-cyan-500/10 px-1.5 py-0.2">
                      Sample Request
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Lisbon, Portugal • Requesting spec samples for Sunnydale Fries & Chicken Innerfillets.
                  </p>
                </div>
                <div className="text-right font-mono text-[11px] text-zinc-500">Yesterday, 14:15 GMT</div>
              </div>
            </div>
          </div>
        )}

        {/* Feature Checkpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Zero monthly CMS subscription fees</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Encrypted admin login with role permissions</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Mobile-friendly phone management</span>
          </div>
        </div>
      </div>
    </section>
  );
};
