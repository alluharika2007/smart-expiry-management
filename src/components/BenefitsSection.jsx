import React from 'react';
import { 
  Recycle, 
  Eye, 
  CalendarCheck, 
  Zap, 
  TrendingUp, 
  HeartHandshake, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Recycle,
      title: 'Reduced Product Waste',
      description: 'By identifying at-risk batches days before they expire, supermarkets can sell near-expiry items at progressive discounts or arrange supplier returns instead of discarding unopened products into the trash bin.',
      color: 'emerald'
    },
    {
      icon: Eye,
      title: 'Better Inventory Visibility',
      description: 'Supermarket managers gain instant visibility into batch aging across all store sections—from cold dairy chillers and bread racks to back-room dry storage—without having to physically dig through cartons.',
      color: 'blue'
    },
    {
      icon: CalendarCheck,
      title: 'Fewer Missed Expiry Dates',
      description: 'Automated digital countdowns remove reliance on human memory and scattered notepad logs, significantly decreasing the chance that an expired item sits on a customer-facing shelf.',
      color: 'amber'
    },
    {
      icon: Zap,
      title: 'Faster Inventory Checks',
      description: 'Store attendants no longer need to spend multiple hours manually picking up and inspecting every single package. Targeted morning alerts direct staff straight to specific aisles and racks requiring attention.',
      color: 'violet'
    },
    {
      icon: TrendingUp,
      title: 'Better-Informed Discount Decisions',
      description: 'Instead of arbitrary price slashes or waiting until the final hours, stores can follow structured discount recommendations (15%, 25%, 35%, 50%) based on remaining shelf life and product category.',
      color: 'brand'
    },
    {
      icon: HeartHandshake,
      title: 'Improved Customer Trust',
      description: 'Customers buy with total confidence, knowing that dairy, bakery, and packaged staples in your aisles are fresh and digitally monitored. Eliminates unpleasant surprises at home and protects your neighborhood reputation.',
      color: 'rose'
    }
  ];

  return (
    <section id="benefits" className="py-20 lg:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 border border-brand-200 text-xs font-semibold text-brand-800 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Tangible Store Benefits
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950 tracking-tight leading-tight">
            Built for Practical Retail Operations & Neighborhood Supermarkets
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Measurable day-to-day advantages that modernize inventory tracking without adding software complexity or slowing down cashier lines.
          </p>
        </div>

        {/* 6 Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors shadow-sm">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-brand-700 transition-colors">
                    {b.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-brand-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  <span>Immediate operational improvement</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
