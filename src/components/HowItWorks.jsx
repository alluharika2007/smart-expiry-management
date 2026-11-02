import React from 'react';
import { 
  ScanBarcode, 
  BellRing, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Smartphone,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Add or Scan Products',
      subtitle: 'Inwarding in Seconds',
      description: 'When stock arrives at your store dock or counter, simply scan the barcode using standard retail barcode scanners or our mobile scanner web app. The product name, batch code, and printed expiry date are recorded into your digital ledger.',
      icon: ScanBarcode,
      tag: 'Step 1: Digitize',
      points: [
        'Supports standard Indian FMCG packaging',
        'Works with USB handheld & Bluetooth scanners',
        'Bulk batch entry for daily dairy & bread crates'
      ]
    },
    {
      number: '2',
      title: 'Monitor Expiry Alerts',
      subtitle: 'Continuous Shelf Oversight',
      description: 'The SmartExpiry dashboard continuously tracks days remaining for every product batch. Each morning before store opening, supervisors receive a prioritized list of items reaching critical shelf-life thresholds (7, 3, or 1 day).',
      icon: BellRing,
      tag: 'Step 2: Detect',
      points: [
        'Color-coded risk indicators (Safe, Soon, Expired)',
        'Pinpoints exact aisle, chiller, or rack location',
        'Morning daily action digest for store staff'
      ]
    },
    {
      number: '3',
      title: 'Take Action Before Expiry',
      subtitle: 'Salvage Revenue & Protect Trust',
      description: 'Take timely, data-guided action before items spoil. Apply recommended 20% to 50% discount stickers, move items to front clearance tables, or coordinate return credits with suppliers for expired items.',
      icon: TrendingUp,
      tag: 'Step 3: Resolve',
      points: [
        'AI-recommended dynamic markdown percentages',
        'Lock expired products from accidental POS billing',
        'Audit logs for supplier credit settlements'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950 tracking-tight leading-tight">
            How It Works: Clean, Frictionless & Intuitive
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            No complex setup. No heavy server equipment. A three-step loop that turns chaotic expiry checking into a predictable daily routine.
          </p>
        </div>

        {/* 3 Step Visual Process Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-brand-300 via-emerald-400 to-brand-300 -z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50/70 rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-400 hover:bg-white transition-all duration-300 flex flex-col justify-between group z-10"
              >
                <div>
                  {/* Top Step Number Circle */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-500 text-white flex items-center justify-center font-display font-bold text-xl shadow-lg shadow-brand-500/25 group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-50 text-brand-800 border border-brand-200">
                      {step.tag}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-brand-700 uppercase tracking-wider block">
                    {step.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-navy-950 mt-1 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Bullet Highlights */}
                <div className="pt-4 border-t border-slate-200/80 space-y-2">
                  {step.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Diagram Summary Bar */}
        <div className="mt-14 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl sm:rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-display text-white">
                Zero Missed Expiry Commitment
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Staff spend less than 15 minutes each morning reviewing high-risk batches.
              </p>
            </div>
          </div>

          <a
            href="#dashboard"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-600/30 transition-all"
          >
            <span>Test the 3 Steps on Live Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
