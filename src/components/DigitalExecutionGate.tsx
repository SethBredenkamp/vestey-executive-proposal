import React, { useState, useRef } from 'react';
import {
  BASE_BUILD_GBP,
  BASE_BUILD_ZAR,
  COMMAND_CENTER_GBP,
  COMMAND_CENTER_ZAR,
  BANKING_DETAILS,
  PAYSTACK_PAYMENT_URL,
  formatGBP,
  formatZAR,
  CLIENT_INFO,
  STAGING_URL
} from '../data/proposalData';
import { CoBrandedLockup } from './CoBrandedLockup';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Printer,
  BadgeCheck,
  CreditCard,
  AlertCircle,
  ArrowLeft,
  Landmark,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  FileDown
} from 'lucide-react';

interface DigitalExecutionGateProps {
  isExecuted: boolean;
  executedAt: string | null;
  clientName: string;
  setClientName: (v: string) => void;
  clientTitle: string;
  setClientTitle: (v: string) => void;
  clientEmail: string;
  setClientEmail: (v: string) => void;
  onExecuteContract: () => void;
  onPrintDossier: () => void;
  onPrevPage: () => void;
  commandCenterEnabled: boolean;
  onToggleCommandCenter: (enabled: boolean) => void;
}

export const DigitalExecutionGate: React.FC<DigitalExecutionGateProps> = ({
  isExecuted,
  executedAt,
  clientName,
  setClientName,
  clientTitle,
  setClientTitle,
  clientEmail,
  setClientEmail,
  onExecuteContract,
  onPrintDossier,
  onPrevPage,
  commandCenterEnabled,
  onToggleCommandCenter
}) => {
  const [ackScope, setAckScope] = useState<boolean>(true);
  const [ackPayment, setAckPayment] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const totalGBP = BASE_BUILD_GBP + (commandCenterEnabled ? COMMAND_CENTER_GBP : 0);
  const totalZAR = BASE_BUILD_ZAR + (commandCenterEnabled ? COMMAND_CENTER_ZAR : 0);
  const depositGBP = Math.round(totalGBP / 2);
  const finalGBP = totalGBP - depositGBP;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleExecute = () => {
    if (!clientName.trim()) {
      setValidationError('Please enter your full legal name to sign.');
      nameInputRef.current?.focus();
      return;
    }
    if (!ackScope || !ackPayment) {
      setValidationError('Please confirm both mandatory acknowledgment checkboxes.');
      return;
    }
    setValidationError(null);
    onExecuteContract();
  };

  return (
    <div id="digital-acceptance-gate" className="relative py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Chapter Eyebrow Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[var(--line)] pb-5">
        <div>
          <span className="ck-eyebrow">Chapter 06 • Commercial Acceptance & E-Signature</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Itemized Digital Quote & Scope Authorization
          </h2>
          <p className="text-xs sm:text-sm text-ck-fg2 mt-1">
            Sign digitally below to lock in the project scope and initiate Phase 1 staging setup.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrevPage}
            className="rounded-full border border-[var(--line-2)] bg-ck-surface px-4 py-2 text-xs text-ck-fg hover:border-emerald-400"
          >
            ← Roadmap & SOW
          </button>
          <button
            type="button"
            onClick={onPrintDossier}
            className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span>Download 4-Page PDF</span>
          </button>
        </div>
      </div>

      {/* Itemized Investment Ledger Table */}
      <div className="rounded-2xl border border-[var(--line-2)] bg-ck-surface p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-emerald-400 font-bold">
              Itemized Commercial Schedule
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">Investment Ledger in GBP (£)</h3>
          </div>
          <div className="font-mono text-xs text-zinc-400">
            Client: <span className="text-white font-semibold">Vestey Foods International Ltd</span> (UK Desk)
          </div>
        </div>

        {/* Ledger Table */}
        <div className="rounded-xl border border-white/10 bg-ck-bg overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-ck-surface2 border-b border-white/5 text-[10.5px] font-mono text-zinc-400 uppercase">
              <tr>
                <th className="py-3 px-4">Item & Deliverable Description</th>
                <th className="py-3 px-4 hidden md:table-cell">Architecture / Scope</th>
                <th className="py-3 px-4 text-right">Investment (GBP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {/* Core Deliverable Line */}
              <tr className="hover:bg-white/[0.02] transition">
                <td className="py-4 px-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      1. Core 5-Page Product Catalogue Digital Platform
                    </span>
                    <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 font-mono text-[9px] text-emerald-300 font-bold">
                      INCLUDED
                    </span>
                  </div>
                  <p className="text-zinc-400 text-xs">
                    Landing Page (Tri-Brand Showcase) + Cooked Chicken Page (8 SKUs) + Cresswell Dairy Page (Foodservice & Retail) + Sunnydale Fries Page + Contact Us / Global RFQ Page.
                  </p>
                  <div className="font-mono text-[10px] text-zinc-500">
                    Base Quote: {formatZAR(BASE_BUILD_ZAR)} ZAR • Turnkey Next.js & Tailwind setup • Private Staging
                  </div>
                </td>
                <td className="py-4 px-4 hidden md:table-cell text-zinc-300 text-xs font-mono">
                  5 Core Pages • Responsive iOS & Android • Cloudflare CDN • SEO Engine
                </td>
                <td className="py-4 px-4 text-right align-top">
                  <span className="font-mono text-base font-bold text-white">{formatGBP(BASE_BUILD_GBP)}</span>
                  <span className="block font-mono text-[10.5px] text-zinc-500">Base Deliverable</span>
                </td>
              </tr>

              {/* Optional Custom Command Center Line */}
              <tr
                className={`transition cursor-pointer ${
                  commandCenterEnabled ? 'bg-emerald-500/[0.04]' : 'hover:bg-white/[0.02]'
                }`}
                onClick={() => onToggleCommandCenter(!commandCenterEnabled)}
              >
                <td className="py-4 px-4 space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={commandCenterEnabled}
                      onChange={(e) => onToggleCommandCenter(e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 rounded border-zinc-600 bg-ck-bg text-emerald-500 focus:ring-emerald-400"
                    />
                    <span className="font-bold text-white text-sm">
                      2. Custom Code Kings Command Center (Client Portal)
                    </span>
                    <span className="rounded bg-amber-400/20 px-1.5 py-0.2 font-mono text-[9px] text-amber-300 font-bold">
                      OPTIONAL ADD-ON
                    </span>
                  </div>
                  <p className="text-zinc-400 text-xs pl-6">
                    Self-service client backend allowing Vestey internal staff to update products, edit pack/carton weights, adjust shelf life, replace downloadable PDF brochures, and review inbound wholesale trade inquiries without code.
                  </p>
                  <div className="font-mono text-[10px] text-zinc-500 pl-6">
                    Add-on Quote: {formatZAR(COMMAND_CENTER_ZAR)} ZAR • Zero monthly CMS subscriptions • Permanent ownership
                  </div>
                </td>
                <td className="py-4 px-4 hidden md:table-cell text-zinc-300 text-xs font-mono pl-6">
                  {commandCenterEnabled ? '✓ Selected in Quote' : '○ Click checkbox to include'}
                </td>
                <td className="py-4 px-4 text-right align-top">
                  <span className="font-mono text-base font-bold text-emerald-400">
                    +{formatGBP(COMMAND_CENTER_GBP)}
                  </span>
                  <span className="block font-mono text-[10.5px] text-zinc-500">
                    {commandCenterEnabled ? 'Active' : 'Optional'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Table Summary Footer */}
          <div className="bg-ck-surface2 p-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase text-zinc-400 block font-semibold">
                Total Agreement Investment
              </span>
              <span className="text-xs text-zinc-300">
                {commandCenterEnabled
                  ? 'Includes Core 5-Page Website + Custom Command Center'
                  : 'Core 5-Page Product Catalogue Platform'}
              </span>
            </div>

            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                {formatGBP(totalGBP)} <span className="text-sm font-normal text-zinc-400">GBP</span>
              </div>
              <div className="text-xs font-mono text-zinc-500">
                Equivalent to {formatZAR(totalZAR)} ZAR base
              </div>
            </div>
          </div>
        </div>

        {/* 50 / 50 Payment Schedule Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
              Phase 1 Milestone (50% Deposit)
            </span>
            <div className="text-xl font-bold text-white font-mono">{formatGBP(depositGBP)} GBP</div>
            <p className="text-[11.5px] text-zinc-400">
              Due upon contract signing to initiate asset extraction, design system, and staging environment setup.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-ck-bg p-4 space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">
              Phase 2 Milestone (50% Final Balance)
            </span>
            <div className="text-xl font-bold text-white font-mono">{formatGBP(finalGBP)} GBP</div>
            <p className="text-[11.5px] text-zinc-400">
              Due upon final staging review and approval on {STAGING_URL} prior to live domain cutover.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Instructions: Wire Transfer (EFT/SWIFT) + Card Payment Link */}
      <div className="rounded-2xl border border-[var(--line-2)] bg-ck-surface p-6 sm:p-7 shadow-xl space-y-6">
        <div className="border-b border-white/10 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Payment Options & International Wire Instructions</h3>
          </div>
          <span className="font-mono text-xs text-zinc-400">Code Kings Capitec Business Desk</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Capitec Bank Wire Details */}
          <div className="rounded-xl border border-white/10 bg-ck-bg p-4 space-y-3 font-mono text-xs">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-emerald-400 font-bold block">
              Option A: International Wire Transfer (SWIFT / EFT)
            </span>

            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-zinc-500">Beneficiary Name</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-semibold">{BANKING_DETAILS.accountName}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(BANKING_DETAILS.accountName, 'accName')}
                    className="text-zinc-500 hover:text-emerald-400"
                  >
                    {copiedKey === 'accName' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-zinc-500">Bank</span>
                <span className="text-white">{BANKING_DETAILS.bankName}</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-zinc-500">Account Number</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-semibold">{BANKING_DETAILS.accountNumber}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(BANKING_DETAILS.accountNumber, 'accNum')}
                    className="text-zinc-500 hover:text-emerald-400"
                  >
                    {copiedKey === 'accNum' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-zinc-500">Branch Code</span>
                <span className="text-white">{BANKING_DETAILS.branchCode}</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-zinc-500">SWIFT / BIC Code</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-semibold">{BANKING_DETAILS.swiftCode}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(BANKING_DETAILS.swiftCode, 'swift')}
                    className="text-zinc-500 hover:text-emerald-400"
                  >
                    {copiedKey === 'swift' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-zinc-500">Payment Reference</span>
                <span className="text-emerald-400 font-semibold">{BANKING_DETAILS.paymentReference}</span>
              </div>
            </div>
          </div>

          {/* Credit Card / Direct Link Option */}
          <div className="rounded-xl border border-white/10 bg-ck-bg p-4 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-cyan-400 font-bold block">
                Option B: Secure Card Payment Link
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                If you prefer paying by corporate debit or credit card (Visa, Mastercard, American Express), our international Paystack/Yoco payment gateway clears instantly with zero bank delays.
              </p>
            </div>

            <div className="space-y-2">
              <a
                href={PAYSTACK_PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:from-cyan-400 hover:to-blue-500 transition shadow-md"
              >
                <CreditCard className="h-4 w-4" />
                <span>Open Secure Payment Portal</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span className="text-[10.5px] text-zinc-500 text-center block font-mono">
                256-Bit SSL Encrypted • Instant Receipt
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive E-Signature Authorization Block */}
      <div className="rounded-2xl border border-[var(--line-2)] bg-ck-surface p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="border-b border-white/10 pb-4 flex items-center justify-between">
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-emerald-400 font-bold">
              Digital Contract Execution
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              Sign Scope & Authorize Staging Setup
            </h3>
          </div>
          {isExecuted && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 font-mono text-xs font-bold text-emerald-300">
              <BadgeCheck className="h-4 w-4 text-emerald-400" />
              <span>CONTRACT EXECUTED</span>
            </span>
          )}
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
              Authorized Signatory Name
            </label>
            <input
              ref={nameInputRef}
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Authorized Representative"
              disabled={isExecuted}
              className="w-full rounded-xl border border-white/10 bg-ck-bg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 disabled:opacity-70"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
              Signatory Title / Role
            </label>
            <input
              type="text"
              value={clientTitle}
              onChange={(e) => setClientTitle(e.target.value)}
              placeholder="e.g. Commercial Director"
              disabled={isExecuted}
              className="w-full rounded-xl border border-white/10 bg-ck-bg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 disabled:opacity-70"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
              Official Email
            </label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="e.g. vestey@vestey.com"
              disabled={isExecuted}
              className="w-full rounded-xl border border-white/10 bg-ck-bg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 disabled:opacity-70"
            />
          </div>
        </div>

        {/* Cursive Signature Render Preview Box */}
        <div className="rounded-xl border border-white/10 bg-ck-bg p-4 flex flex-col items-center justify-center min-h-[90px]">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
            Digital Signature Verification Preview
          </span>
          <span className="font-signature text-3xl sm:text-4xl text-emerald-400">
            {clientName.trim() || 'Vestey Foods Representative'}
          </span>
          <span className="font-mono text-[9px] text-zinc-600 mt-1">
            {CLIENT_INFO.companyName} • Surrey, UK
          </span>
        </div>

        {/* Two Mandatory Checkboxes */}
        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={ackScope}
              onChange={(e) => setAckScope(e.target.checked)}
              disabled={isExecuted}
              className="h-4 w-4 rounded border-zinc-600 bg-ck-bg text-emerald-500 focus:ring-emerald-400 mt-0.5"
            />
            <span className="text-xs text-zinc-300 leading-normal">
              I have reviewed and approve the Code Kings Master Scope of Work ({formatGBP(totalGBP)} GBP total), including the 5 core product catalogue deliverables, project assumptions, and selected command center configuration.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={ackPayment}
              onChange={(e) => setAckPayment(e.target.checked)}
              disabled={isExecuted}
              className="h-4 w-4 rounded border-zinc-600 bg-ck-bg text-emerald-500 focus:ring-emerald-400 mt-0.5"
            />
            <span className="text-xs text-zinc-300 leading-normal">
              I authorize Code Kings Digital Agency to initiate Phase 1 Staging & Architecture setup upon receipt of the 50% Initial Retainer ({formatGBP(depositGBP)} GBP), with the remaining 50% ({formatGBP(finalGBP)} GBP) due upon staging approval prior to live domain cutover.
            </span>
          </label>
        </div>

        {validationError && (
          <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Action Button or Executed Badge */}
        {!isExecuted ? (
          <button
            type="button"
            onClick={handleExecute}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 px-6 text-sm font-bold text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/25 active:scale-[0.99]"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Accept Scope & Authorize Kickoff ({formatGBP(totalGBP)} GBP)</span>
          </button>
        ) : (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
              <div>
                <span className="font-mono text-xs font-bold text-emerald-400 block">
                  AGREEMENT DIGITALLY EXECUTED • CK-VESTEY-2026-EXECUTED
                </span>
                <span className="text-xs text-zinc-300">
                  Signed by {clientName} ({clientTitle}) on {executedAt || 'November 2026'}.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onPrintDossier}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-300 transition"
            >
              <FileDown className="h-4 w-4" />
              <span>Download Signed Dossier</span>
            </button>
          </div>
        )}

        {/* Countersigned Co-Founders Block */}
        <div className="border-t border-white/10 pt-5 space-y-3">
          <div className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-400 font-bold">
            Authorized Code Kings Agency Signatories
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/5 bg-ck-bg p-3.5 flex items-center justify-between">
              <div>
                <span className="font-signature text-2xl text-emerald-400 block leading-tight">
                  Seth Bredenkamp
                </span>
                <span className="text-xs font-bold text-white">Seth Bredenkamp</span>
                <span className="font-mono text-[10px] text-zinc-500 block">Lead Solutions Architect</span>
              </div>
              <div className="text-right font-mono text-[10px] text-emerald-400">
                <span>Verified Seal</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-ck-bg p-3.5 flex items-center justify-between">
              <div>
                <span className="font-signature text-2xl text-emerald-400 block leading-tight">
                  Megan Bredenkamp
                </span>
                <span className="text-xs font-bold text-white">Megan Bredenkamp</span>
                <span className="font-mono text-[10px] text-zinc-500 block">Managing Director & Finance Partner</span>
              </div>
              <div className="text-right font-mono text-[10px] text-emerald-400">
                <span>Verified Seal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
