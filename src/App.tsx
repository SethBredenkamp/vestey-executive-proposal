import React, { useState, useEffect } from 'react';
import { ExecutiveHero } from './components/ExecutiveHero';
import { ArchitectureOverview } from './components/ArchitectureOverview';
import { CatalogueExplorer } from './components/CatalogueExplorer';
import { CommandCenterSimulator } from './components/CommandCenterSimulator';
import { RoadmapAndSowAccordion } from './components/RoadmapAndSowAccordion';
import { DigitalExecutionGate } from './components/DigitalExecutionGate';
import { CoBrandedLockup } from './components/CoBrandedLockup';
import { ProposalAccessGate } from './components/ProposalAccessGate';
import {
  BASE_BUILD_GBP,
  COMMAND_CENTER_GBP,
  formatGBP,
  STAGING_URL,
  CLIENT_INFO
} from './data/proposalData';
import { generateProposalPdf } from './utils/generateProposalPdf';
import {
  FileDown,
  FileSignature,
  ShieldCheck,
  Sun,
  Moon,
  Command,
  X,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Lock
} from 'lucide-react';

export type PageStepId = 'thesis' | 'architecture' | 'catalog' | 'command' | 'roadmap' | 'execute';

interface PageStep {
  id: PageStepId;
  num: string;
  label: string;
  shortLabel: string;
  description: string;
}

export const PAGE_STEPS: PageStep[] = [
  {
    id: 'thesis',
    num: '01',
    label: '01. Executive Overview',
    shortLabel: 'Overview',
    description: 'Vestey Heritage, Tri-Brand Strategy & Commercial Summary'
  },
  {
    id: 'architecture',
    num: '02',
    label: '02. 5 Deliverables',
    shortLabel: '5 Pages',
    description: 'Landing Page, Chicken, Dairy, Fries, and Contact Page Scope'
  },
  {
    id: 'catalog',
    num: '03',
    label: '03. Catalogue Engine',
    shortLabel: 'Catalogue',
    description: 'Interactive Product Directory with Extracted Specs & Imagery'
  },
  {
    id: 'command',
    num: '04',
    label: '04. Command Center',
    shortLabel: 'Backend (+£1,150)',
    description: 'Optional Self-Service Portal to Manage Products & PDF Flyers'
  },
  {
    id: 'roadmap',
    num: '05',
    label: '05. Delivery Plan & SOW',
    shortLabel: 'Timeline',
    description: '3-4 Week Rollout on Staging, Review Gates & Terms'
  },
  {
    id: 'execute',
    num: '06',
    label: '06. Commercial Quote & Sign',
    shortLabel: 'Accept & Sign',
    description: 'Itemized GBP Schedule, Wire Instructions & E-Signature'
  }
];

export function App() {
  const [activePage, setActivePage] = useState<PageStepId>('thesis');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [cmdkOpen, setCmdkOpen] = useState<boolean>(false);
  const [pdfDownloading, setPdfDownloading] = useState<boolean>(false);
  const [pdfSuccessToast, setPdfSuccessToast] = useState<boolean>(false);

  // Command Center Add-on Toggle state (Default: true so the £1,150 line item is visible & toggleable)
  const [commandCenterEnabled, setCommandCenterEnabled] = useState<boolean>(true);

  // Contract execution state
  const [isExecuted, setIsExecuted] = useState<boolean>(false);
  const [executedAt, setExecutedAt] = useState<string | null>(null);
  const [clientName, setClientName] = useState<string>('Vestey Foods Representative');
  const [clientTitle, setClientTitle] = useState<string>('Commercial Director');
  const [clientEmail, setClientEmail] = useState<string>(CLIENT_INFO.generalEmail);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return (
        sessionStorage.getItem('vestey_proposal_authenticated') === 'true' ||
        localStorage.getItem('vestey_proposal_authenticated') === 'true'
      );
    } catch {
      return false;
    }
  });

  const totalGBP = BASE_BUILD_GBP + (commandCenterEnabled ? COMMAND_CENTER_GBP : 0);

  const handleLock = () => {
    try {
      sessionStorage.removeItem('vestey_proposal_authenticated');
      localStorage.removeItem('vestey_proposal_authenticated');
    } catch {
      /* ignore */
    }
    setIsAuthenticated(false);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdkOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setCmdkOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navigateToPage = (targetPage: PageStepId, scrollToGate = false) => {
    setActivePage(targetPage);
    if (scrollToGate) {
      setTimeout(() => {
        const gateEl = document.getElementById('digital-acceptance-gate');
        if (gateEl) {
          gateEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  const handleJumpToSignGate = () => {
    navigateToPage('execute', true);
  };

  const handleDownloadPdf = async () => {
    if (pdfDownloading) return;
    setPdfDownloading(true);
    try {
      await generateProposalPdf({
        isExecuted,
        executedAt,
        clientName,
        clientTitle,
        clientEmail,
        commandCenterEnabled
      });
      setPdfSuccessToast(true);
      setTimeout(() => setPdfSuccessToast(false), 4500);
    } catch (err) {
      console.error('Failed to generate proposal PDF:', err);
      alert('Could not generate PDF. Please ensure popups and downloads are allowed in your browser.');
    } finally {
      setPdfDownloading(false);
    }
  };

  const handleExecuteContract = () => {
    const now = new Date();
    const formatted = now.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
    setExecutedAt(formatted);
    setIsExecuted(true);
  };

  const currentStepIndex = PAGE_STEPS.findIndex((p) => p.id === activePage);

  if (!isAuthenticated) {
    return <ProposalAccessGate onUnlock={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-ck-bg text-ck-fg ck-hairline-grid overflow-x-hidden max-w-[100vw]">
      {/* Subtle Static Architectural Ambient Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.035),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.02),transparent_50%)] no-print"
        aria-hidden="true"
      />

      {/* PDF Download Confirmation Toast */}
      {pdfSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-400/50 bg-ck-surface2 px-4 py-3 text-xs font-semibold text-ck-fg shadow-2xl no-print">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Downloaded Official 4-Page PDF Dossier ({formatGBP(totalGBP)} GBP)</span>
        </div>
      )}

      {/* Two-Tier Sticky Executive Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-ck-bg/90 backdrop-blur-xl no-print shadow-sm">
        {/* Tier 1: Co-Branded Lockup + Live Staging Pill + Action Buttons */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-1.5 sm:gap-4 px-2 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex items-center gap-1.5 sm:gap-3.5 shrink-0">
            <CoBrandedLockup size="sm" onClick={() => navigateToPage('thesis')} />

            <a
              href={STAGING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] whitespace-nowrap shrink-0 staging-url-glow"
              title="Open Private Staging Environment"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Staging: vestey-staging.codekings.dev</span>
              <ExternalLink className="h-3 w-3 shrink-0 opacity-80" />
            </a>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setCmdkOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-ck-surface px-3 py-2 font-mono text-[11px] text-ck-fg2 hover:border-[var(--line-2)] hover:text-ck-fg transition whitespace-nowrap shrink-0"
              title="Open Quick Command Menu (Cmd+K)"
            >
              <Command className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Menu</span>
              <span className="rounded bg-ck-bg2 px-1.5 py-0.5 text-[10px] text-ck-fg3 border border-[var(--line)]">
                ⌘K
              </span>
            </button>

            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-ck-surface p-1.5 sm:px-3 sm:py-2 text-xs font-medium text-ck-fg2 hover:border-[var(--line-2)] hover:text-ck-fg transition shrink-0"
              aria-label="Toggle Light or Dark Theme"
              title="Toggle Light / Dark Theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span className="hidden sm:inline ml-1.5">Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                  <span className="hidden sm:inline ml-1.5">Dark</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleLock}
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-ck-surface p-1.5 sm:px-3 sm:py-2 text-xs font-medium text-ck-fg2 hover:border-[var(--line-2)] hover:text-ck-fg transition shrink-0"
              aria-label="Lock Proposal"
              title="Lock Proposal (Requires Access Password)"
            >
              <Lock className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span className="hidden sm:inline ml-1.5">Lock</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={pdfDownloading}
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-emerald-400/40 bg-ck-surface px-2 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-ck-fg transition hover:border-emerald-400 hover:bg-emerald-400/10 disabled:opacity-60 whitespace-nowrap shrink-0"
              title="Download Clean 4-Page PDF Agreement"
            >
              <FileDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">
                {pdfDownloading ? 'Generating...' : 'Export PDF'}
              </span>
              <span className="sm:hidden">{pdfDownloading ? 'PDF...' : 'PDF'}</span>
            </button>

            <button
              type="button"
              onClick={handleJumpToSignGate}
              className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold transition whitespace-nowrap shrink-0 ${
                isExecuted
                  ? 'border border-emerald-400 bg-emerald-500/15 text-emerald-400'
                  : 'bg-emerald-400 text-emerald-950 shadow-sm hover:bg-emerald-300'
              }`}
            >
              {isExecuted ? (
                <>
                  <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                  <span className="hidden sm:inline">Executed ({formatGBP(totalGBP)})</span>
                  <span className="sm:hidden">Signed</span>
                </>
              ) : (
                <>
                  <FileSignature className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                  <span className="hidden md:inline">Accept Scope • {formatGBP(totalGBP)}</span>
                  <span className="hidden sm:inline md:hidden">Sign • {formatGBP(totalGBP)}</span>
                  <span className="sm:hidden">Sign</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tier 2: Dedicated 6-Step Proposal Navigation Bar */}
        <div className="border-t border-[var(--line)] bg-ck-bg2/80">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <nav
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth"
              aria-label="Proposal Pages"
            >
              {PAGE_STEPS.map((step, idx) => {
                const isCurrent = step.id === activePage;
                const isPast = idx < currentStepIndex;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => navigateToPage(step.id)}
                    className={`group flex items-center justify-between gap-2.5 rounded-xl border px-3 py-2 text-left transition whitespace-nowrap shrink-0 ${
                      isCurrent
                        ? 'border-emerald-400/80 bg-emerald-400/15 text-ck-fg shadow-sm'
                        : isPast
                        ? 'border-[var(--line)] bg-ck-surface/80 text-ck-fg2 hover:border-emerald-400/40 hover:text-ck-fg'
                        : 'border-transparent bg-ck-surface/40 text-ck-fg2 hover:border-[var(--line)] hover:bg-ck-surface hover:text-ck-fg'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold transition ${
                          isCurrent
                            ? 'bg-emerald-400 text-emerald-950'
                            : isPast
                            ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/40'
                            : 'bg-ck-bg2 text-ck-fg3 border border-[var(--line)]'
                        }`}
                      >
                        {isPast ? '✓' : step.num}
                      </span>
                      <div className="min-w-0">
                        <div
                          className={`text-xs font-semibold truncate ${
                            isCurrent ? 'text-emerald-400' : 'text-ck-fg'
                          }`}
                        >
                          <span className="hidden lg:inline">{step.label.replace(/^\d+\.\s*/, '')}</span>
                          <span className="lg:hidden">{step.shortLabel}</span>
                        </div>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Screen Content */}
      <main className="relative z-10 flex-1 no-print">
        {activePage === 'thesis' && (
          <ExecutiveHero
            onNextPage={() => navigateToPage('architecture')}
            onJumpToSign={handleJumpToSignGate}
            onDownloadPdf={handleDownloadPdf}
            isExecuted={isExecuted}
            commandCenterEnabled={commandCenterEnabled}
            onToggleCommandCenter={setCommandCenterEnabled}
          />
        )}

        {activePage === 'architecture' && (
          <ArchitectureOverview
            onPrevPage={() => navigateToPage('thesis')}
            onNextPage={() => navigateToPage('catalog')}
            commandCenterEnabled={commandCenterEnabled}
            onToggleCommandCenter={setCommandCenterEnabled}
          />
        )}

        {activePage === 'catalog' && (
          <CatalogueExplorer
            onPrevPage={() => navigateToPage('architecture')}
            onNextPage={() => navigateToPage('command')}
          />
        )}

        {activePage === 'command' && (
          <CommandCenterSimulator
            onPrevPage={() => navigateToPage('catalog')}
            onNextPage={() => navigateToPage('roadmap')}
            commandCenterEnabled={commandCenterEnabled}
            onToggleCommandCenter={setCommandCenterEnabled}
          />
        )}

        {activePage === 'roadmap' && (
          <RoadmapAndSowAccordion
            onPrevPage={() => navigateToPage('command')}
            onNextPage={handleJumpToSignGate}
            commandCenterEnabled={commandCenterEnabled}
          />
        )}

        {activePage === 'execute' && (
          <DigitalExecutionGate
            isExecuted={isExecuted}
            executedAt={executedAt}
            clientName={clientName}
            setClientName={setClientName}
            clientTitle={clientTitle}
            setClientTitle={setClientTitle}
            clientEmail={clientEmail}
            setClientEmail={setClientEmail}
            onExecuteContract={handleExecuteContract}
            onPrintDossier={handleDownloadPdf}
            onPrevPage={() => navigateToPage('roadmap')}
            commandCenterEnabled={commandCenterEnabled}
            onToggleCommandCenter={setCommandCenterEnabled}
          />
        )}
      </main>

      {/* Bottom Chapter Footer Bar */}
      <footer className="relative z-10 border-t border-[var(--line)] bg-ck-bg2/90 py-5 text-xs text-ck-fg2 no-print">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-emerald-400">
                CHAPTER {PAGE_STEPS[currentStepIndex].num} OF 06
              </span>
              <span>•</span>
              <span className="text-ck-fg font-medium">
                {PAGE_STEPS[currentStepIndex].description}
              </span>
              <span className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Next.js 15 • Edge CDN • Surrey UK Desk
              </span>
            </div>

            <div className="flex items-center gap-3">
              {currentStepIndex > 0 && (
                <button
                  type="button"
                  onClick={() => navigateToPage(PAGE_STEPS[currentStepIndex - 1].id)}
                  className="rounded-full border border-[var(--line-2)] bg-ck-surface px-4 py-2 text-xs text-ck-fg hover:border-emerald-400 whitespace-nowrap"
                >
                  ← Previous
                </button>
              )}
              {currentStepIndex < PAGE_STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => navigateToPage(PAGE_STEPS[currentStepIndex + 1].id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-emerald-950 hover:bg-emerald-300 whitespace-nowrap"
                >
                  Next: {PAGE_STEPS[currentStepIndex + 1].shortLabel}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-emerald-950 hover:bg-emerald-300 whitespace-nowrap"
                >
                  <FileDown className="h-3.5 w-3.5 shrink-0" />
                  Download 4-Page PDF Proposal
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Cmd+K Quick Menu Modal */}
      {cmdkOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 pt-24 px-4 backdrop-blur-sm no-print"
          onClick={() => setCmdkOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-[var(--line-2)] bg-ck-surface p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                <Command className="h-4 w-4" />
                <span>QUICK NAVIGATION (CODE KINGS × VESTEY FOODS)</span>
              </div>
              <button
                type="button"
                onClick={() => setCmdkOpen(false)}
                className="text-ck-fg3 hover:text-ck-fg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 space-y-1">
              <div className="px-2 py-1 font-mono text-[10px] uppercase text-ck-fg3">
                Jump to Proposal Chapter
              </div>
              {PAGE_STEPS.map((step) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    navigateToPage(step.id);
                    setCmdkOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs hover:bg-ck-bg2 transition"
                >
                  <div>
                    <span className="font-semibold text-ck-fg">{step.label}</span>
                    <span className="ml-2 text-ck-fg3">{step.description}</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                </button>
              ))}
            </div>

            <div className="mt-3 border-t border-[var(--line)] pt-3 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  setCmdkOpen(false);
                  handleJumpToSignGate();
                }}
                className="rounded-lg border border-emerald-400/50 bg-emerald-400/15 px-3 py-1.5 font-mono text-[11px] font-semibold text-emerald-400"
              >
                Review & Accept Scope • {formatGBP(totalGBP)}
              </button>

              <button
                type="button"
                onClick={() => {
                  setCmdkOpen(false);
                  handleDownloadPdf();
                }}
                className="rounded-lg bg-emerald-400 px-3 py-1.5 font-semibold text-emerald-950"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
