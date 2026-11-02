import React from 'react';
import { 
  Store, 
  ShoppingBag, 
  Building2, 
  MapPin, 
  CheckCircle, 
  Sparkles,
  Layers,
  Smartphone,
  Cpu
} from 'lucide-react';

export default function TargetCustomers() {
  const customerSegments = [
    {
      icon: Store,
      title: 'Local Grocery & Kirana Stores',
      subtitle: 'Modernizing Neighborhood Retail',
      scale: '1 Billing Counter • 500 - 1,500 SKUs',
      description: 'Family-run grocery and self-service kirana stores adopting barcode billing. SmartExpiry replaces manual diary records with an effortless shelf-life ledger that runs on any existing counter PC or mobile phone.',
      highlights: [
        'Zero upfront IT investment',
        'Works with single USB barcode scanner',
        'Immediate relief from expired dairy/bread losses'
      ]
    },
    {
      icon: ShoppingBag,
      title: 'Small Supermarkets',
      subtitle: 'Standalone Departmental Stores',
      scale: '2 - 4 Checkout Counters • 2,000 - 5,000 SKUs',
      description: 'Standalone supermarkets serving residential colonies. With high footfall and dozens of daily deliveries, SmartExpiry equips floor managers with morning checklists to keep high-risk dairy, frozen, and bakery racks clean.',
      highlights: [
        'Aisle and rack level location tracking',
        'Morning supervisor action checklists',
        'Staff-friendly color-coded alerts'
      ]
    },
    {
      icon: Building2,
      title: 'Medium-Sized Retail Chains',
      subtitle: 'Regional Mini-Mart Networks',
      scale: '3 - 10 Store Outlets • Tier-2 / Tier-3 Regional Hubs',
      description: 'Growing regional retail networks in emerging cities. Consolidate expiry metrics across multiple branches, maintain uniform markdown policies, and reconcile vendor credit returns efficiently.',
      highlights: [
        'Multi-store visibility for owners',
        'Standardized promotional markdown rules',
        'Exportable vendor return audit sheets'
      ]
    }
  ];

  const tier2Advantages = [
    {
      title: 'Works with Standard Indian Packaging',
      desc: 'Seamlessly accommodates standard EAN-13 barcodes from major Indian FMCG brands (Amul, Britannia, ITC, Mother Dairy, Tata, Haldiram).'
    },
    {
      title: 'Low Hardware Barrier',
      desc: 'No dedicated proprietary terminals needed. Operates smoothly on existing desktop POS computers, tablets, or store staff smartphones.'
    },
    {
      title: 'Minimal Training Required',
      desc: 'Clear visual status (Green = Safe, Amber = Discount, Red = Pull Out) ensures store attendants can operate with total autonomy in minutes.'
    },
    {
      title: 'Tailored for Indian Distributor Cycles',
      desc: 'Supports short return-window policies common among local dairy, bread, and beverage distributors in regional trading centers.'
    }
  ];

  return (
    <section id="target-customers" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-800 uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            Target Retail Segments
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950 tracking-tight leading-tight">
            Tailor-Made for Supermarkets & Grocery Stores in Tier-2 & Tier-3 Cities
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            While enterprise software is built for multinational hypermarkets with dedicated IT teams, SmartExpiry is built from the ground up for agile neighborhood retail in India.
          </p>
        </div>

        {/* 3 Customer Segments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {customerSegments.map((seg, idx) => {
            const Icon = seg.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-400 hover:bg-white transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors shadow-sm">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {seg.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 mb-1">
                    {seg.title}
                  </h3>
                  <div className="text-xs font-semibold text-brand-700 mb-4">
                    {seg.scale}
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {seg.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 space-y-2">
                  {seg.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tier-2 & Tier-3 City Readiness Deep Dive */}
        <div className="bg-gradient-to-br from-brand-950 to-navy-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                Ground Reality Fit
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold mt-2 text-white">
                Why Tier-2 & Tier-3 Supermarkets Love Our Approach
              </h3>
              <p className="text-slate-300 text-sm mt-2">
                In cities like Surat, Indore, Nagpur, Coimbatore, Lucknow, and Vijayawada, retail margins depend on quick stock turnover. Here is how our architecture aligns with ground realities:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tier2Advantages.map((adv, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold text-sm mb-3">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">
                    {adv.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
