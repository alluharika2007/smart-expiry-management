import React from 'react';
import { 
  ScanBarcode, 
  Database, 
  Cpu, 
  BellRing, 
  Percent, 
  CheckSquare,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function SolutionWorkflow() {
  const steps = [
    {
      step: '01',
      icon: ScanBarcode,
      title: 'Enter or Scan Products',
      subtitle: 'Inwarding & Stock Receipt',
      description: 'As supplier crates arrive at the store loading bay or counter, products are scanned with regular USB/wireless handheld barcode scanners or entered via the quick batch inwarding form.',
      highlight: 'Works with standard EAN-13 barcodes'
    },
    {
      step: '02',
      icon: Database,
      title: 'Record Batch & Expiry Dates',
      subtitle: 'Automated Ledger Creation',
      description: 'The system links each barcode with its specific batch code, manufacturing timestamp, and shelf-expiry date, creating a digital FIFO (First-In, First-Out) shelf-life log.',
      highlight: 'Zero redundant paper registers'
    },
    {
      step: '03',
      icon: Cpu,
      title: 'Continuous Expiry Tracking',
      subtitle: 'Intelligent Shelf Monitoring',
      description: 'SmartExpiry continuously calculates remaining shelf life across all inventory categories, categorizing items into Safe (>15d), Attention (8-14d), Expiring Soon (≤7d), and Expired.',
      highlight: 'Daily automated recalculations'
    },
    {
      step: '04',
      icon: BellRing,
      title: 'Staff Receive Action Alerts',
      subtitle: 'Daily Morning Dispatch',
      description: 'Before the store doors open, floor supervisors receive prioritized visual alerts and printable shelf-pull lists indicating exactly which racks and aisles contain at-risk items.',
      highlight: 'Actionable aisle & rack locations'
    },
    {
      step: '05',
      icon: Percent,
      title: 'Smart Discount Recommendations',
      subtitle: 'AI-Assisted Markdown Logic',
      description: 'Instead of blind guessing, the system suggests tiered markdowns (e.g., 20% at 7 days, 35% at 3 days, 50% at 1 day) tailored to product velocity and category shelf sensitivity.',
      highlight: 'Dynamic price-markdown curve'
    },
    {
      step: '06',
      icon: CheckSquare,
      title: 'Staff Review & Take Action',
      subtitle: 'Closure & Zero-Waste Disposal',
      description: 'Staff relocates discounted items to front clearance bins, logs vendor credit return notes for expired items, or flags surplus safe items for local food charity donation.',
      highlight: 'Complete 1-click audit trail'
    }
  ];

  return (
    <section id="solution" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-100/80 border border-brand-200 text-xs font-semibold text-brand-800 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Our Systematic Solution
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950 tracking-tight leading-tight">
            How SmartExpiry Works: From Delivery Dock to Shelf Action
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            A cohesive 6-stage workflow engineered specifically for fast-paced retail operations with zero technical friction.
          </p>
        </div>

        {/* 6 Step Visual Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Step Number Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="font-display font-black text-3xl text-slate-200 group-hover:text-brand-300 transition-colors">
                    {st.step}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <span className="text-[11px] font-semibold text-brand-700 tracking-wider uppercase">
                    {st.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-navy-900 mt-1 mb-2.5">
                    {st.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {st.description}
                  </p>
                </div>

                {/* Bottom Highlight Pill */}
                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50/70 px-3 py-1.5 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{st.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Workflow Callout with Barcode Scan Image */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-lg flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
            <img 
              src="/images/barcode_scan.jpg" 
              alt="Handheld barcode scanner scanning dairy product on supermarket shelf" 
              className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent flex items-end p-5">
              <div className="text-white">
                <span className="text-xs font-semibold bg-brand-600 px-2 py-0.5 rounded text-white inline-block mb-1">
                  Inwarding Simulation
                </span>
                <p className="text-sm font-medium text-slate-200">
                  Standard barcode scan identifies batch & expiry in under 2 seconds.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              Zero Shelf Blindspots
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy-950 leading-snug mb-4">
              Designed for Easy Adoption by Tier-2 & Tier-3 Supermarket Staff
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Our system avoids complicated ERP interfaces. Store floor associates only need to know how to scan a product and view a color-coded morning checklist: 
              <strong className="text-navy-900 font-semibold"> Green for Safe, Orange for Discounting, Red for Pull-Out.</strong>
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-display text-brand-700">5 Mins</span>
                <span className="text-xs text-slate-500">Staff Training Required</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-display text-navy-900">100%</span>
                <span className="text-xs text-slate-500">Standard Barcode Compatibility</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
