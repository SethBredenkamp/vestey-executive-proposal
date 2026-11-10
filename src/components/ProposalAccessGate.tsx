import React, { useState, useEffect, useRef } from 'react';
import { Lock, KeyRound, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { CoBrandedLockup } from './CoBrandedLockup';

interface ProposalAccessGateProps {
  onUnlock: () => void;
}

const VALID_PASSWORDS = [
  'vestey2026',
  'vestey',
  'vesteyfoods',
  'cresswell',
  'sunnydale',
  'codekings2026',
  'vestey@codekings2026!!'
];

export const ProposalAccessGate: React.FC<ProposalAccessGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    const rawInput = password.trim();
    const cleanInput = rawInput.toLowerCase();

    if (!rawInput) {
      setError(true);
      setErrorMessage('Please enter the client access password.');
      setIsSubmitting(false);
      return;
    }

    if (
      VALID_PASSWORDS.includes(cleanInput) ||
      rawInput === 'Vestey@CodeKings2026!!' ||
      rawInput === 'Vestey2026!'
    ) {
      try {
        sessionStorage.setItem('vestey_proposal_authenticated', 'true');
        localStorage.setItem('vestey_proposal_authenticated', 'true');
      } catch {
        /* storage in private browsing */
      }
      onUnlock();
    } else {
      setError(true);
      setErrorMessage('Incorrect password. Please enter the password provided by Seth.');
      setIsSubmitting(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center bg-ck-bg text-ck-fg px-4 py-12 ck-hairline-grid selection:bg-emerald-500/25 selection:text-emerald-200">
      {/* Soft Ambient Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.03),transparent_50%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Co-Branded Top Header */}
        <div className="flex justify-center mb-8">
          <CoBrandedLockup size="md" />
        </div>

        {/* Lock Card */}
        <div className="ck-card p-6 sm:p-8 border border-white/10 bg-ck-surface/90 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

          <div className="text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Lock className="h-6 w-6" />
            </div>

            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">
              Confidential Client Proposal
            </p>
            <h1 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
              Vestey Foods International
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-ck-fg2">
              Private Digital Scope & Architecture Proposal prepared by{' '}
              <strong className="text-white">Code Kings</strong> for{' '}
              <strong className="text-emerald-400">Vestey Foods International Ltd</strong> (Cresswell & Sunnydale Farms).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="access-password"
                className="block font-mono text-[11px] uppercase tracking-wider text-ck-fg2 mb-2 font-medium"
              >
                Enter Access Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-ck-fg2">
                  <KeyRound className="h-4 w-4" />
                </div>
                <input
                  ref={inputRef}
                  id="access-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Enter password..."
                  className={`w-full rounded-xl border bg-ck-bg2/90 pl-10 pr-10 py-2.5 text-sm text-ck-fg placeholder-zinc-500 focus:outline-none transition ${
                    error
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-white/10 focus:border-emerald-500/80'
                  }`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-ck-fg2 hover:text-ck-fg transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {error && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/20 active:scale-[0.99]"
            >
              <span>Unlock Executive Proposal</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 border-t border-white/5 pt-4 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>256-Bit Encrypted Staging</span>
            </span>
            <span>Surrey, UK Desk</span>
          </div>
        </div>

        <p className="mt-6 text-center text-[11.5px] text-zinc-400">
          Need your access password? Contact Seth Bredenkamp at Code Kings.
        </p>
      </div>
    </div>
  );
};
