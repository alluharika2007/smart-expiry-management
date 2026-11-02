import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Tag, 
  ShieldAlert, 
  Barcode, 
  Store,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function Hero({ onRequestDemo }) {
  const [quickActionDone, setQuickActionDone] = useState(false);

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50">
      {/* Decorative backdrop glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-brand-100/40 via-emerald-50/30 to-amber-100/20 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 shadow-sm text-xs font-medium text-emerald-800 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold text-emerald-900">Retail Tech Innovation</span>
            <span className="text-emerald-400">•</span>
            <span>Built for Tier-2 & Tier-3 Supermarkets</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        </div>

        {/* Hero Copy */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-navy-950 tracking-tight leading-[1.15] mb-6">
            Never Miss an <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
              Expiry Date
            </span>{' '}
            Again.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            SmartExpiry helps supermarkets monitor product expiry dates, identify at-risk inventory, and take timely action through intelligent alerts and smart discount recommendations.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollToSection('#solution')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-base text-slate-800 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Our Solution</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>

            <button
              onClick={onRequestDemo}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-base text-white bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-700 hover:to-emerald-700 shadow-lg shadow-brand-600/25 hover:shadow-xl hover:shadow-brand-600/35 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request a Demo</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              <span>Zero Expensive Hardware Needed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              <span>Standard Barcode & POS Compatible</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              <span>Actionable WhatsApp & Dashboard Alerts</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Dashboard Mockup Preview */}
        <div className="relative max-w-5xl mx-auto">
          {/* Subtle Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-teal-500 rounded-3xl blur-xl opacity-20 -z-10" />

          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden">
            
            {/* Mockup Browser/App Window Header */}
            <div className="bg-slate-900 text-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="ml-3 hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-md text-[11px] text-slate-300 font-mono">
                  <Store className="w-3 h-3 text-brand-400" />
                  <span>SmartExpiry Live Central • Shiva Supermarket (Branch #01)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync Active
                </span>
                <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  Demo Preview
                </span>
              </div>
            </div>

            {/* Dashboard Mockup Body */}
            <div className="p-4 sm:p-6 lg:p-8 bg-slate-50/60">
              
              {/* Mini KPI Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
                
                <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Monitored SKUs</span>
                    <Barcode className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-navy-900">1,240</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <span>94.8% Fresh Inventory</span>
                  </div>
                </div>

                <div className="bg-amber-50/70 p-3.5 sm:p-4 rounded-xl border border-amber-200 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-amber-800 mb-1">
                    <span className="font-semibold">Expiring Soon (≤7d)</span>
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-amber-950">14 Batches</div>
                  <div className="text-[11px] text-amber-700 font-medium mt-1">
                    Requires Discounting
                  </div>
                </div>

                <div className="bg-rose-50/70 p-3.5 sm:p-4 rounded-xl border border-rose-200 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-rose-800 mb-1">
                    <span className="font-semibold">Expired Items</span>
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-rose-950">2 Batches</div>
                  <div className="text-[11px] text-rose-700 font-medium mt-1">
                    Immediate Pull Out
                  </div>
                </div>

                <div className="bg-emerald-50/70 p-3.5 sm:p-4 rounded-xl border border-emerald-200 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-emerald-800 mb-1">
                    <span className="font-semibold">Inventory Saved</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-emerald-950">₹32,450</div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1">
                    via Timely Markdown
                  </div>
                </div>

              </div>

              {/* Sample At-Risk Products Showcase */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    <h2 className="text-xs sm:text-sm font-bold text-navy-900">
                      High-Priority Expiry Watchlist (Demo Snapshot)
                    </h2>
                  </div>
                  <a
                    href="#dashboard"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#dashboard');
                    }}
                    className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1 hover:underline"
                  >
                    <span>Open Full Interactive Table</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="divide-y divide-slate-100">
                  
                  {/* Row 1 - High Risk */}
                  <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                        1d
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-navy-900">
                            Britannia 100% Whole Wheat Bread (400g)
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
                            Expires Tomorrow
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap gap-x-3 gap-y-1">
                          <span>Batch: BAT-2026-091</span>
                          <span>Stock: 18 units</span>
                          <span>Rack: Front Bread Row</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pl-12 sm:pl-0">
                      <div className="text-right">
                        <span className="text-xs font-semibold text-coral-600 bg-coral-50 px-2.5 py-1 rounded-md border border-coral-200 inline-flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          AI Rec: 50% Off
                        </span>
                      </div>
                      <button
                        onClick={() => setQuickActionDone(true)}
                        disabled={quickActionDone}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                          quickActionDone
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                            : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'
                        }`}
                      >
                        {quickActionDone ? '✓ Markdown Applied' : 'Apply Discount'}
                      </button>
                    </div>
                  </div>

                  {/* Row 2 - Medium Risk */}
                  <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                        2d
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-navy-900">
                            Amul Taaza Homogenised Milk (1L Pouch)
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                            Expiring in 2 Days
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap gap-x-3 gap-y-1">
                          <span>Batch: BAT-2026-084</span>
                          <span>Stock: 24 units</span>
                          <span>Chiller Bay 1</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pl-12 sm:pl-0">
                      <div className="text-right">
                        <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-200 inline-flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          AI Rec: 35% Off
                        </span>
                      </div>
                      <a
                        href="#dashboard"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection('#dashboard');
                        }}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        View Details
                      </a>
                    </div>
                  </div>

                  {/* Row 3 - Expired Alert */}
                  <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-rose-50/30">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                        EXP
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-navy-900 line-through text-slate-500">
                            Mother Dairy Malai Paneer (200g)
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                            Expired Yesterday
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 flex flex-wrap gap-x-3 gap-y-1">
                          <span>Batch: BAT-2026-072</span>
                          <span>Stock: 8 units</span>
                          <span className="text-rose-600 font-medium">POS Sale Blocked</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pl-12 sm:pl-0">
                      <span className="text-xs font-semibold text-rose-700 bg-white px-2.5 py-1 rounded border border-rose-200">
                        Shelf Pull Required
                      </span>
                      <button
                        onClick={() => alert("Simulated action: 8 units marked for Vendor Credit / Return Note.")}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-sm"
                      >
                        Clear from Shelf
                      </button>
                    </div>
                  </div>

                </div>

                {/* Dashboard Footer Banner */}
                <div className="p-3 bg-slate-100/70 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Real-time expiry calculation anchor: Nov 2026</span>
                  </div>
                  <div className="font-medium text-brand-700">
                    Interactive prototype • Scroll down to try live filter & add features ↓
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
