import React from 'react';
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Clock,
  Layers,
  ChevronDown
} from 'lucide-react';
import {
  ROADMAP_MILESTONES,
  SOW_ASSUMPTIONS,
  SOW_EXCLUSIONS,
  STAGING_URL
} from '../data/proposalData';

interface RoadmapAndSowAccordionProps {
  onPrevPage: () => void;
  onNextPage: () => void;
  commandCenterEnabled: boolean;
}

export const RoadmapAndSowAccordion: React.FC<RoadmapAndSowAccordionProps> = ({
  onPrevPage,
  onNextPage,
  commandCenterEnabled
}) => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Chapter Eyebrow Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <span className="ck-eyebrow">Chapter 05 • Delivery Timeline & SOW Agreement</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Turnkey Delivery Plan & Terms of Engagement
          </h2>
          <p className="text-xs sm:text-sm text-ck-fg2 mt-1">
            Structured 3-4 week milestone rollout on private staging with zero disruption to existing business.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrevPage}
            className="rounded-full border border-[var(--line-2)] bg-ck-surface px-4 py-2 text-xs text-ck-fg hover:border-emerald-400"
          >
            ← Command Center
          </button>
          <button
            type="button"
            onClick={onNextPage}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-emerald-950 hover:bg-emerald-300"
          >
            Accept & Sign →
          </button>
        </div>
      </div>

      {/* 4-Phase Delivery Roadmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROADMAP_MILESTONES.map((phase, idx) => {
          const isPhase4 = idx === 3;
          if (isPhase4 && !commandCenterEnabled) {
            // If command center not enabled, show as optional add-on stage
          }

          return (
            <div
              key={idx}
              className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 transition ${
                isPhase4 && !commandCenterEnabled
                  ? 'border-white/5 bg-ck-surface/50 opacity-60'
                  : 'border-[var(--line)] bg-ck-surface hover:border-emerald-500/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="font-mono text-xs font-bold text-emerald-400">{phase.step}</span>
                  <span className="font-mono text-[11px] text-zinc-400">{phase.timeline}</span>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block">
                    {phase.badge}
                  </span>
                  <h4 className="text-sm font-bold text-white leading-snug">{phase.title}</h4>
                </div>

                <p className="text-[11.5px] text-zinc-400 leading-relaxed">{phase.focus}</p>

                <div className="space-y-1.5 pt-1">
                  {phase.deliverables.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-[11px] text-zinc-300">
                      <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 font-mono text-[10px] text-emerald-300/80">
                <span className="text-zinc-500 block">REVIEW GATE</span>
                <span>{phase.deliverableReviewGate}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assumptions & Exclusions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* Assumptions */}
        <div className="rounded-2xl border border-[var(--line)] bg-ck-surface p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="text-base font-bold text-white">Project Assumptions & Standards</h3>
          </div>

          <div className="space-y-2.5">
            {SOW_ASSUMPTIONS.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-normal">
                <span className="text-emerald-400 font-mono font-bold mt-0.5">0{idx + 1}.</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions */}
        <div className="rounded-2xl border border-[var(--line)] bg-ck-surface p-6 space-y-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <AlertCircle className="h-5 w-5" />
            <h3 className="text-base font-bold text-white">Explicit Exclusions & Boundaries</h3>
          </div>

          <div className="space-y-2.5">
            {SOW_EXCLUSIONS.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-normal">
                <span className="text-zinc-500 font-mono font-bold mt-0.5">0{idx + 1}.</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/5 bg-ck-bg p-3.5 mt-4 text-xs text-zinc-400 space-y-1">
            <span className="font-semibold text-white block">Staging Environment Assurance</span>
            <p className="text-[11px] text-zinc-400">
              All development will take place on private staging ({STAGING_URL}). The current websites remain untouched until Vestey reviews and signs off on the completed build.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
