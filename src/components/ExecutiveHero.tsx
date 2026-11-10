import React from 'react';
import {
  ArrowRight,
  FileDown,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Globe2,
  UtensilsCrossed,
  Milk,
  Flame,
  Building2,
  Clock,
  Layers,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { TiltCard } from './TiltCard';
import {
  BASE_BUILD_GBP,
  BASE_BUILD_ZAR,
  COMMAND_CENTER_GBP,
  COMMAND_CENTER_ZAR,
  formatGBP,
  formatZAR,
  getTimelineBadge,
  CLIENT_INFO,
  STAGING_URL
} from '../data/proposalData';

interface ExecutiveHeroProps {
  onNextPage: () => void;
  onJumpToSign: () => void;
  onDownloadPdf: () => void;
  isExecuted: boolean;
  commandCenterEnabled: boolean;
  onToggleCommandCenter: (enabled: boolean) => void;
}

export const ExecutiveHero: React.FC<ExecutiveHeroProps> = ({
  onNextPage,
  onJumpToSign,
  onDownloadPdf,
  isExecuted,
  commandCenterEnabled,
  onToggleCommandCenter
}) => {
  const totalGBP = BASE_BUILD_GBP + (commandCenterEnabled ? COMMAND_CENTER_GBP : 0);
  const totalZAR = BASE_BUILD_ZAR + (commandCenterEnabled ? COMMAND_CENTER_ZAR : 0);

  return (
    <section className="relative overflow-hidden pt-6 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top Executive Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="ck-eyebrow">Executive Digital Scope & Commercial Proposal</span>
            <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-emerald-400" />
            <span className="hidden sm:inline font-mono text-[11px] text-ck-fg3">
              Vestey Foods International Ltd (Since 1897)
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-ck-fg2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {getTimelineBadge(commandCenterEnabled)}
            </span>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vision & Scope Summary (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
                <Building2 className="h-3.5 w-3.5" />
                <span>Prepared for Vestey Foods International • Coulsdon, Surrey, UK</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                A Unified Digital Flagship for{' '}
                <span className="ck-brand-text">Cresswell & Sunnydale Farms</span>
              </h1>

              <p className="text-sm sm:text-base text-ck-fg2 leading-relaxed pt-1">
                From the client brief:{' '}
                <em className="text-emerald-300 font-medium">
                  "We would like a landing page showcasing the premium product lines of all three products then with a separate page for each of the different products (cooked chicken, dairy and fries) and then a contact us page."
                </em>
              </p>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Code Kings has designed this exact 5-page digital architecture. We transform your three dense, high-grade printed product catalogues into a unified, lightning-fast digital storefront engineered to convert European foodservice distributors, commercial caterers, and supermarket retail buyers.
              </p>
            </div>

            {/* 3 Brand Pillars Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="rounded-xl border border-[var(--line)] bg-ck-surface p-3.5 space-y-2 hover:border-emerald-500/40 transition">
                <div className="flex items-center gap-2 text-emerald-400">
                  <UtensilsCrossed className="h-4 w-4" />
                  <span className="font-semibold text-xs text-white">Cooked Chicken</span>
                </div>
                <p className="text-[11.5px] text-ck-fg2 leading-snug">
                  8 Signature Gourmet lines, deep-frozen specs, EU-approved facility & 11 packaging languages.
                </p>
              </div>

              <div className="rounded-xl border border-[var(--line)] bg-ck-surface p-3.5 space-y-2 hover:border-cyan-500/40 transition">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Milk className="h-4 w-4" />
                  <span className="font-semibold text-xs text-white">Cresswell Dairy</span>
                </div>
                <p className="text-[11.5px] text-ck-fg2 leading-snug">
                  Foodservice blocks, Dutch wheels, Italian Grana Padano, retail slices & heavy butter blocks.
                </p>
              </div>

              <div className="rounded-xl border border-[var(--line)] bg-ck-surface p-3.5 space-y-2 hover:border-amber-500/40 transition">
                <div className="flex items-center gap-2 text-amber-400">
                  <Flame className="h-4 w-4" />
                  <span className="font-semibold text-xs text-white">Sunnydale Fries</span>
                </div>
                <p className="text-[11.5px] text-ck-fg2 leading-snug">
                  1/4" & 3/8" fries, sweet potato, breakfast hash brown patties & specialty shapes for retail.
                </p>
              </div>
            </div>

            {/* The 5 Deliverable Pages Overview Bar */}
            <div className="rounded-2xl border border-white/10 bg-ck-surface2 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Deliverable Blueprint: The 5 Requested Pages
                </span>
                <span className="font-mono text-zinc-400 text-[11px]">Turnkey Next.js & Tailwind</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono text-[11px]">
                <div className="rounded-lg bg-ck-bg p-2 border border-white/5">
                  <span className="text-emerald-400 font-bold block">PAGE 1</span>
                  <span className="text-white font-medium">Landing Home</span>
                  <span className="text-[9.5px] text-zinc-500 block">Tri-Brand Showcase</span>
                </div>
                <div className="rounded-lg bg-ck-bg p-2 border border-white/5">
                  <span className="text-emerald-400 font-bold block">PAGE 2</span>
                  <span className="text-white font-medium">Cooked Chicken</span>
                  <span className="text-[9.5px] text-zinc-500 block">8 Gourmet SKUs</span>
                </div>
                <div className="rounded-lg bg-ck-bg p-2 border border-white/5">
                  <span className="text-emerald-400 font-bold block">PAGE 3</span>
                  <span className="text-white font-medium">Dairy Farm</span>
                  <span className="text-[9.5px] text-zinc-500 block">Foodservice & Retail</span>
                </div>
                <div className="rounded-lg bg-ck-bg p-2 border border-white/5">
                  <span className="text-emerald-400 font-bold block">PAGE 4</span>
                  <span className="text-white font-medium">Fries & Potato</span>
                  <span className="text-[9.5px] text-zinc-500 block">Cuts & Specialties</span>
                </div>
                <div className="rounded-lg bg-ck-bg p-2 border border-white/5">
                  <span className="text-emerald-400 font-bold block">PAGE 5</span>
                  <span className="text-white font-medium">Contact Us</span>
                  <span className="text-[9.5px] text-zinc-500 block">Global Trade RFQ</span>
                </div>
              </div>
            </div>

            {/* Action CTA Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onJumpToSign}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3.5 text-sm font-semibold text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
              >
                <span>Review & Accept Proposal ({formatGBP(totalGBP)})</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onNextPage}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--line-2)] bg-ck-surface px-4 py-3 text-sm font-medium text-white hover:border-emerald-500/50 hover:bg-ck-surface2 transition"
              >
                <Layers className="h-4 w-4 text-emerald-400" />
                <span>Explore 5-Page Architecture</span>
              </button>

              <button
                type="button"
                onClick={onDownloadPdf}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-ck-surface px-3.5 py-3 text-xs font-mono text-ck-fg2 hover:text-white transition"
                title="Download Clean 4-Page Boardroom PDF"
              >
                <FileDown className="h-4 w-4 text-emerald-400" />
                <span>Export PDF Dossier</span>
              </button>
            </div>
          </div>

          {/* Right Column: Pricing Matrix & Interactive Command Center Toggle (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <TiltCard className="rounded-2xl border border-white/10 bg-gradient-to-b from-ck-surface to-ck-surface2 p-5 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-emerald-400 font-semibold">
                    Commercial Investment Matrix
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">Summary of Costs</h3>
                </div>
                <div className="text-right">
                  <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-400">
                    GBP (£)
                  </span>
                </div>
              </div>

              {/* Line Items */}
              <div className="mt-4 space-y-3">
                {/* Core Build Line Item */}
                <div className="rounded-xl border border-white/5 bg-ck-bg p-3.5 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span className="text-xs font-bold text-white">5-Page Product Catalogue Website</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 pl-5 leading-tight">
                      Landing Page + Chicken + Dairy + Fries + Contact Us Page. High-speed, responsive, SEO-ready.
                    </p>
                    <div className="pl-5 font-mono text-[10px] text-zinc-500">
                      Base quote: {formatZAR(BASE_BUILD_ZAR)} ZAR
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-sm font-bold text-white">{formatGBP(BASE_BUILD_GBP)}</span>
                    <span className="block font-mono text-[10px] text-zinc-500">Included</span>
                  </div>
                </div>

                {/* Custom Command Center Optional Add-on Line Item */}
                <div
                  className={`rounded-xl border transition p-3.5 cursor-pointer ${
                    commandCenterEnabled
                      ? 'border-emerald-500/50 bg-emerald-500/5'
                      : 'border-white/10 bg-ck-bg/70 hover:border-white/20'
                  }`}
                  onClick={() => onToggleCommandCenter(!commandCenterEnabled)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={commandCenterEnabled}
                          onChange={(e) => onToggleCommandCenter(e.target.checked)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 rounded border-zinc-600 bg-ck-bg text-emerald-500 focus:ring-emerald-400"
                        />
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Custom Command Center</span>
                          <span className="rounded bg-emerald-400/20 px-1.5 py-0.2 font-mono text-[9px] text-emerald-300">
                            OPTIONAL ADD-ON
                          </span>
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 pl-6 leading-tight">
                        Self-service admin portal allowing Vestey staff to manage products, adjust specs, pack weights, replace PDF catalogues, and view inbound inquiries without code.
                      </p>
                      <div className="pl-6 font-mono text-[10px] text-zinc-500">
                        Add-on quote: {formatZAR(COMMAND_CENTER_ZAR)} ZAR
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-sm font-bold text-emerald-400">
                        +{formatGBP(COMMAND_CENTER_GBP)}
                      </span>
                      <span className="block font-mono text-[10px] text-zinc-400">
                        {commandCenterEnabled ? 'Active' : 'Click to Add'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="mt-5 border-t border-white/10 pt-4 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-white">Total Project Investment</span>
                    <span className="block text-[11px] text-zinc-400">
                      {commandCenterEnabled ? 'Core 5 Pages + Custom Command Center' : 'Core 5 Pages Build'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                      {formatGBP(totalGBP)} <span className="text-xs text-zinc-400 font-normal">GBP</span>
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500">
                      Equiv. {formatZAR(totalZAR)} ZAR
                    </div>
                  </div>
                </div>

                {/* Single 100% Upfront Investment & Turnkey Sprint Cards */}
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                  <div className="rounded-lg bg-ck-bg p-2.5 border border-white/5">
                    <span className="text-[10px] uppercase text-zinc-400 block font-semibold">100% Upfront</span>
                    <span className="text-sm font-bold text-white">{formatGBP(totalGBP)}</span>
                    <span className="text-[9.5px] text-emerald-400 block">Due Upon Authorization</span>
                  </div>
                  <div className="rounded-lg bg-ck-bg p-2.5 border border-white/5">
                    <span className="text-[10px] uppercase text-zinc-400 block font-semibold">Sprint Delivery</span>
                    <span className="text-sm font-bold text-white">{commandCenterEnabled ? '3-4 Weeks' : '2-3 Weeks'}</span>
                    <span className="text-[9.5px] text-zinc-400 block">Staging Preview Launch</span>
                  </div>
                </div>

                {/* Fast Note on Currency & Staging */}
                <p className="text-[10.5px] text-zinc-400 leading-normal pt-1">
                  * Pricing is converted from South African Rand (ZAR) base rates ({formatZAR(BASE_BUILD_ZAR)} core + {formatZAR(COMMAND_CENTER_ZAR)} backend) to British Pounds (GBP) at ~21.8 ZAR/GBP, rounded for executive clarity.
                </p>
              </div>
            </TiltCard>

            {/* Vestey Credentials Strip */}
            <div className="rounded-xl border border-[var(--line)] bg-ck-surface p-3 text-xs text-ck-fg2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-emerald-400" />
                <span>Global Reach: 100+ Countries Worldwide</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400">UK Registered Desk</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
