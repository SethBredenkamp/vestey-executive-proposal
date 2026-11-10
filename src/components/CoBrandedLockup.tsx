import React from 'react';
import { Award } from 'lucide-react';

interface CoBrandedLockupProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function CodeKingsLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 sm:gap-2.5 ${className}`}>
      <span className="crown w-5 sm:w-7 shrink-0" aria-hidden="true" />
      <span className="text-[12px] sm:text-[0.95rem] font-semibold tracking-wider whitespace-nowrap uppercase text-ck-fg print-text-dark">
        Code<span className="text-emerald-400"> Kings</span>
      </span>
    </span>
  );
}

export const CoBrandedLockup: React.FC<CoBrandedLockupProps> = ({ size = 'sm', onClick }) => {
  const isMedium = size === 'md';
  const isLarge = size === 'lg';

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 ${
        onClick ? 'cursor-pointer group' : ''
      }`}
    >
      {/* Official Code Kings Logo */}
      <CodeKingsLogo className={isLarge ? 'scale-110 origin-left' : isMedium ? 'scale-105 origin-left' : ''} />

      {/* Partnership Divider */}
      <span className="font-mono text-[9px] sm:text-xs font-bold text-ck-fg3 select-none">×</span>

      {/* Vestey Foods International Lockup */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-[var(--line-2)] bg-ck-surface2 px-2 py-0.5 sm:px-3 sm:py-1.5 print-card">
        <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
        </div>
        <div className="text-left">
          <span
            className={`block font-semibold tracking-tight text-ck-fg print-text-dark whitespace-nowrap ${
              isLarge ? 'text-sm sm:text-base' : isMedium ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-[11.5px]'
            }`}
          >
            <span className="hidden min-[420px]:inline">Vestey Foods International</span>
            <span className="min-[420px]:hidden">Vestey Foods</span>
          </span>
          <span className="hidden sm:block font-mono text-[9.5px] text-ck-fg2 print-subtext">
            Since 1897 • Cresswell & Sunnydale Farms
          </span>
        </div>
      </div>
    </div>
  );
};
