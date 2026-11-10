import React, { useState } from 'react';
import {
  Globe2,
  UtensilsCrossed,
  Milk,
  Flame,
  MailCheck,
  ShieldAlert,
  CheckCircle2,
  Layers,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  Package,
  Cpu,
  Smartphone
} from 'lucide-react';
import { SCOPE_ITEMS, ScopeDeliverable, formatGBP, formatZAR } from '../data/proposalData';

interface ArchitectureOverviewProps {
  onPrevPage: () => void;
  onNextPage: () => void;
  commandCenterEnabled: boolean;
  onToggleCommandCenter: (enabled: boolean) => void;
}

export const ArchitectureOverview: React.FC<ArchitectureOverviewProps> = ({
  onPrevPage,
  onNextPage,
  commandCenterEnabled,
  onToggleCommandCenter
}) => {
  const [selectedId, setSelectedId] = useState<string>('landing-showcase');
  const activeItem = SCOPE_ITEMS.find((item) => item.id === selectedId) || SCOPE_ITEMS[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe2':
        return <Globe2 className="h-5 w-5" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="h-5 w-5" />;
      case 'Milk':
        return <Milk className="h-5 w-5" />;
      case 'Flame':
        return <Flame className="h-5 w-5" />;
      case 'MailCheck':
        return <MailCheck className="h-5 w-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="h-5 w-5" />;
      default:
        return <Layers className="h-5 w-5" />;
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Chapter Eyebrow Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <span className="ck-eyebrow">Chapter 02 • Page-by-Page Architectural Specification</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            The 5 Core Deliverables + Custom Command Center
          </h2>
          <p className="text-xs sm:text-sm text-ck-fg2 mt-1">
            Exact breakdown of each deliverable mapped directly to the Vestey Foods client brief.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrevPage}
            className="rounded-full border border-[var(--line-2)] bg-ck-surface px-4 py-2 text-xs text-ck-fg hover:border-emerald-400"
          >
            ← Overview
          </button>
          <button
            type="button"
            onClick={onNextPage}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-emerald-950 hover:bg-emerald-300"
          >
            Catalogue Explorer →
          </button>
        </div>
      </div>

      {/* Main Grid: Left Navigation Rail (4 Cols) + Right Detailed Dossier (8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navigation Rail */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="font-mono text-[11px] uppercase tracking-wider text-ck-fg3 px-1 mb-1">
            Select Deliverable to Inspect
          </div>

          {SCOPE_ITEMS.map((item) => {
            const isSelected = item.id === selectedId;
            const isCommandCenter = item.id === 'custom-command-center';

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left rounded-xl p-3.5 border transition flex items-start gap-3 ${
                  isSelected
                    ? 'border-emerald-400/80 bg-emerald-500/10 text-white shadow-md'
                    : 'border-[var(--line)] bg-ck-surface text-ck-fg2 hover:border-[var(--line-2)] hover:text-white'
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                    isSelected
                      ? 'border-emerald-400/50 bg-emerald-400/20 text-emerald-300'
                      : 'border-white/10 bg-ck-bg2 text-zinc-400'
                  }`}
                >
                  {getIcon(item.highlightIcon)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-emerald-400 font-bold">
                      {item.pageOrComponent.split(' — ')[0]}
                    </span>
                    {isCommandCenter ? (
                      <span className="rounded bg-amber-400/20 px-1.5 py-0.5 font-mono text-[9px] text-amber-300 font-bold">
                        OPTIONAL (+{formatGBP(item.costGBP)})
                      </span>
                    ) : (
                      <span className="font-mono text-[10.5px] text-zinc-400">
                        {item.costGBP > 0 ? formatGBP(item.costGBP) : 'Included'}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-white truncate mt-0.5">{item.title}</h4>
                  <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{item.tagline}</p>
                </div>
              </button>
            );
          })}

          {/* Quick Notice on Command Center */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 text-xs text-ck-fg2 space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Custom Command Center Status</span>
              <span
                className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                  commandCenterEnabled
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {commandCenterEnabled ? 'ACTIVE IN QUOTE' : 'OFFERED AS ADD-ON'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              The Command Center allows the Vestey team to manage products and specs autonomously (+£1,150 / R25k ZAR).
            </p>
            <button
              type="button"
              onClick={() => onToggleCommandCenter(!commandCenterEnabled)}
              className="w-full text-center py-1.5 px-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-mono text-xs font-semibold transition"
            >
              {commandCenterEnabled ? 'Remove from Digital Quote' : 'Add to Digital Quote (+£1,150)'}
            </button>
          </div>
        </div>

        {/* Detailed Dossier for Active Deliverable */}
        <div className="lg:col-span-8 rounded-2xl border border-[var(--line-2)] bg-ck-surface p-6 sm:p-7 space-y-6 shadow-xl">
          {/* Top Banner */}
          <div className="border-b border-[var(--line)] pb-5 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {activeItem.pageOrComponent}
              </span>
              <div className="flex items-center gap-2">
                <span className="rounded bg-ck-bg2 border border-white/10 px-2.5 py-1 font-mono text-xs text-white">
                  Cost: {activeItem.costGBP > 0 ? formatGBP(activeItem.costGBP) : 'Included in Base Package'}
                </span>
                {activeItem.costZAREquiv > 0 && (
                  <span className="font-mono text-[10.5px] text-zinc-500">
                    ({formatZAR(activeItem.costZAREquiv)} ZAR)
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white">{activeItem.title}</h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{activeItem.summary}</p>
          </div>

          {/* Included Deliverables Checklist */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              <FileCheck className="h-4 w-4" />
              <span>Full Technical & Creative Deliverables</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {activeItem.deliverables.map((del, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/5 bg-ck-bg p-3.5 flex items-start gap-3"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-[12.5px] text-zinc-200 leading-normal">{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Value Impact */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1.5">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-emerald-400 font-bold">
              Strategic Commercial Value
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">{activeItem.businessValue}</p>
          </div>

          {/* Bottom Footnote on Performance & Delivery */}
          <div className="border-t border-[var(--line)] pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-emerald-400" />
                <span>Next.js 15 & React 19</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Smartphone className="h-3.5 w-3.5 text-cyan-400" />
                <span>Mobile iOS & Android Optimized</span>
              </span>
            </div>

            <button
              type="button"
              onClick={onNextPage}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
            >
              <span>Test Interactive Catalogue Explorer</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
