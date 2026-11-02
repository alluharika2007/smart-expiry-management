import React from 'react';
import { 
  Clock, 
  AlertOctagon, 
  EyeOff, 
  Trash2, 
  XCircle, 
  CheckCircle2, 
  TrendingDown, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      title: 'Manual Checking Takes Hours',
      description: 'Store attendants must manually inspect each shelf, read tiny printed batch stamps, and record dates on clipboards or spreadsheets. In busy stores, this is often skipped or rushed.',
      impact: 'Up to 15-20 staff hours lost every week on tedious manual checks.',
      badge: 'Operational Bottleneck',
      color: 'amber'
    },
    {
      icon: AlertOctagon,
      title: 'Customer Dissatisfaction & Fines',
      description: 'Accidentally selling an expired dairy carton or moldy bread permanently shatters customer trust, leads to heated arguments at the billing counter, and risks food safety inspection penalties.',
      impact: 'Damages local store reputation in close-knit Tier-2 & Tier-3 communities.',
      badge: 'Brand & Safety Risk',
      color: 'rose'
    },
    {
      icon: EyeOff,
      title: 'Near-Expiry Items Go Unnoticed',
      description: 'Products approaching their last 3-5 days get pushed behind newly arrived stock. Without proactive visibility, items remain full-price on back shelves until they expire completely.',
      impact: '100% loss on items that could easily have been sold at a 25-30% discount.',
      badge: 'Missed Revenue',
      color: 'orange'
    },
    {
      icon: Trash2,
      title: 'Excess Inventory & Food Waste',
      description: 'Without data-driven visibility into batch expiration cycles, supermarket managers re-order fresh cartons while older stock quietly spoils in storage or chillers.',
      impact: 'Direct write-off losses that eat directly into fragile retail profit margins.',
      badge: 'Dead Stock & Waste',
      color: 'red'
    }
  ];

  return (
    <section id="problem" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 uppercase tracking-wider mb-4">
            <AlertOctagon className="w-3.5 h-3.5" />
            The Problem We Solve
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950 tracking-tight leading-tight">
            Managing Expiry Dates in Retail Shouldn't Be a Costly Guessing Game
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Small and medium-sized supermarkets in Tier-2 and Tier-3 cities handle thousands of fast-moving consumer goods daily. Traditional paper-and-memory tracking breaks down rapidly.
          </p>
        </div>

        {/* 4 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {problems.map((prob, index) => {
            const Icon = prob.icon;
            return (
              <div
                key={index}
                className="group p-6 sm:p-8 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      {prob.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-rose-700 transition-colors">
                    {prob.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-5">
                    {prob.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-100/50 p-3 rounded-lg">
                  <TrendingDown className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{prob.impact}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contrast Table: Traditional Manual vs SmartExpiry */}
        <div className="bg-gradient-to-br from-slate-900 to-navy-950 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white shadow-xl overflow-hidden relative">
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                Operational Transformation
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold mt-2">
                Why Traditional Supermarkets Struggle vs. The SmartExpiry Advantage
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Old Traditional Method */}
              <div className="bg-slate-800/60 rounded-xl p-5 sm:p-6 border border-slate-700/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-4 text-rose-400 font-bold text-base">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span>The Traditional Supermarket Reality</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>Staff manually checks thousands of physical packages during slow hours.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>Expired goods discoverable only when an unhappy customer points it out.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>Discounts are applied arbitrarily without margin or shelf-life logic.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>High dump and write-off rate at the end of each monthly cycle.</span>
                  </li>
                </ul>
              </div>

              {/* SmartExpiry Method */}
              <div className="bg-brand-950/40 rounded-xl p-5 sm:p-6 border border-brand-500/40 backdrop-blur-sm shadow-inner">
                <div className="flex items-center gap-2 mb-4 text-brand-400 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>With SmartExpiry Management</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <span className="text-brand-400 font-bold">✓</span>
                    <span>Barcode entry records batch and expiry in seconds during inwarding.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-brand-400 font-bold">✓</span>
                    <span>Proactive morning dashboard highlights products 7, 3, and 1 days before expiry.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-brand-400 font-bold">✓</span>
                    <span>AI-assisted discount recommendations suggest timely 20%-50% markdowns.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-brand-400 font-bold">✓</span>
                    <span>Expired items automatically locked from POS billing, protecting store reputation.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
