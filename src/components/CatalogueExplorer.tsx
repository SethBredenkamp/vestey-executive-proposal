import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Milk,
  Flame,
  Search,
  Filter,
  Check,
  Package,
  Clock,
  ThermometerSnowflake,
  MapPin,
  FileText,
  Smartphone,
  Monitor,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { SAMPLE_PRODUCTS, ProductItem } from '../data/proposalData';

interface CatalogueExplorerProps {
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const CatalogueExplorer: React.FC<CatalogueExplorerProps> = ({ onPrevPage, onNextPage }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'chicken' | 'dairy' | 'fries'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(SAMPLE_PRODUCTS[0]);

  const filteredProducts = SAMPLE_PRODUCTS.filter((prod) => {
    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Chapter Eyebrow Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <span className="ck-eyebrow">Chapter 03 • Interactive Product Engine</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Live Product Directory & Catalogue Explorer
          </h2>
          <p className="text-xs sm:text-sm text-ck-fg2 mt-1">
            Test the live digital catalog engine powered by the actual product data and imagery extracted from your 3 brochures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrevPage}
            className="rounded-full border border-[var(--line-2)] bg-ck-surface px-4 py-2 text-xs text-ck-fg hover:border-emerald-400"
          >
            ← 5 Deliverables
          </button>
          <button
            type="button"
            onClick={onNextPage}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-emerald-950 hover:bg-emerald-300"
          >
            Command Center →
          </button>
        </div>
      </div>

      {/* Control Bar: Categories + Search + Viewport Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-[var(--line)] bg-ck-surface p-4 shadow-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`rounded-xl px-3.5 py-2 text-xs font-medium transition ${
              activeCategory === 'all'
                ? 'bg-white text-slate-950 font-bold shadow-sm'
                : 'bg-ck-bg2 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            All Products ({SAMPLE_PRODUCTS.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('chicken')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition ${
              activeCategory === 'chicken'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                : 'bg-ck-bg2 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <UtensilsCrossed className="h-3.5 w-3.5" />
            <span>Cooked Chicken</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('dairy')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition ${
              activeCategory === 'dairy'
                ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm'
                : 'bg-ck-bg2 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Milk className="h-3.5 w-3.5" />
            <span>Cresswell Dairy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('fries')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition ${
              activeCategory === 'fries'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'bg-ck-bg2 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Flame className="h-3.5 w-3.5" />
            <span>Sunnydale Fries</span>
          </button>
        </div>

        {/* Search and Device Mode */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chicken, mozzarella, cuts..."
              className="w-full rounded-xl border border-white/10 bg-ck-bg2 pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center rounded-xl border border-white/10 bg-ck-bg2 p-1">
            <button
              type="button"
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'desktop' ? 'bg-ck-surface text-emerald-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Desktop Viewport"
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'mobile' ? 'bg-ck-surface text-emerald-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Mobile Vertical Viewport"
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: Product Grid + Active Spec Inspector */}
      <div className={`transition-all mx-auto ${viewMode === 'mobile' ? 'max-w-md' : 'w-full'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Products Grid (8 Cols on desktop) */}
          <div className={`${viewMode === 'mobile' ? 'col-span-12' : 'lg:col-span-8'} grid grid-cols-1 sm:grid-cols-2 gap-4`}>
            {filteredProducts.map((prod) => {
              const isSelected = selectedProduct?.id === prod.id;
              const badgeColor =
                prod.category === 'chicken'
                  ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                  : prod.category === 'dairy'
                  ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
                  : 'border-amber-500/30 text-amber-400 bg-amber-500/10';

              return (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className={`rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-400/90 bg-ck-surface2 shadow-lg ring-1 ring-emerald-400/50'
                      : 'border-[var(--line)] bg-ck-surface hover:border-[var(--line-2)]'
                  }`}
                >
                  {/* Product Image Stage */}
                  <div className="relative aspect-[16/10] bg-black/40 overflow-hidden flex items-center justify-center p-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full max-w-full object-contain transition duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    <span
                      className={`absolute top-2.5 left-2.5 font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${badgeColor}`}
                    >
                      {prod.subCategory || prod.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{prod.name}</h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1">{prod.description}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-2 font-mono text-[10px]">
                      <div>
                        <span className="text-zinc-500 block">PACK WEIGHT</span>
                        <span className="text-zinc-200 font-medium truncate block">{prod.packWeight}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">STORAGE</span>
                        <span className="text-zinc-200 font-medium truncate block">{prod.storage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredProducts.length === 0 && (
              <div className="col-span-2 text-center py-12 text-zinc-500 font-mono text-xs">
                No products found matching your search.
              </div>
            )}
          </div>

          {/* Active Specification Sheet Panel (4 Cols on desktop) */}
          {selectedProduct && (
            <div className={`${viewMode === 'mobile' ? 'col-span-12' : 'lg:col-span-4'} rounded-2xl border border-[var(--line-2)] bg-ck-surface p-5 sm:p-6 space-y-5 sticky top-24`}>
              <div className="border-b border-white/10 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
                  B2B Product Specification Sheet
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedProduct.name}</h3>
                <p className="text-xs text-zinc-400 mt-1">{selectedProduct.description}</p>
              </div>

              {/* Product Photo Showcase */}
              <div className="rounded-xl bg-black/50 p-4 border border-white/5 flex items-center justify-center aspect-[16/11]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Spec Key-Value Table */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-white/5 py-1.5">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Package className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Packing Spec</span>
                  </span>
                  <span className="text-white font-medium">{selectedProduct.quantity}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/5 py-1.5">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Country of Origin</span>
                  </span>
                  <span className="text-white font-medium">{selectedProduct.origin}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/5 py-1.5">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    <span>Shelf Life</span>
                  </span>
                  <span className="text-white font-medium">{selectedProduct.shelfLife}</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/5 py-1.5">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <ThermometerSnowflake className="h-3.5 w-3.5 text-blue-400" />
                    <span>Storage Method</span>
                  </span>
                  <span className="text-white font-medium">{selectedProduct.storage}</span>
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">
                  Export Certifications & Highlights
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg bg-ck-bg2 border border-white/5 px-2 py-1 text-[11px] text-zinc-300"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Request Button */}
              <div className="pt-2">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-xs text-emerald-300 font-mono">
                  Sample B2B Spec Ready for Live Staging
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
