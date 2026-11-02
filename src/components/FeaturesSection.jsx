import React from 'react';
import { 
  Clock, 
  ScanLine, 
  BellRing, 
  BrainCircuit, 
  LayoutDashboard, 
  FileSpreadsheet, 
  Recycle, 
  Users, 
  CheckCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Clock,
      title: 'Smart Product Expiry Tracking',
      description: 'Continuous digital countdown for each product SKU and batch. Automatically flags items as they cross 15-day, 7-day, 3-day, and 1-day shelf life thresholds.',
      statusType: 'live',
      statusText: 'Live Interactive Feature',
      highlight: 'Continuous FIFO monitoring'
    },
    {
      icon: ScanLine,
      title: 'Barcode-Based Product Entry',
      description: 'Quickly register product identity, batch codes, and shelf dates using standard retail barcode scanners (EAN-13, GS1) or mobile camera scanners during stock receipt.',
      statusType: 'simulator',
      statusText: 'Interactive Scanner Simulator',
      highlight: 'Instant SKU lookup'
    },
    {
      icon: BellRing,
      title: 'Automated Expiry Alerts',
      description: 'Scheduled daily morning notification digest delivered to store floor supervisors via dashboard alerts and proposed SMS/WhatsApp integration before store opening.',
      statusType: 'roadmap',
      statusText: 'Dashboard Live • SMS/WhatsApp Roadmap',
      highlight: 'Zero forgotten shelf audits'
    },
    {
      icon: BrainCircuit,
      title: 'AI-Assisted Discount Recommendations',
      description: 'Dynamic pricing curve that suggests progressive markdowns (15%, 25%, 35%, 50%) based on remaining shelf life to accelerate clearance before food reaches expiry.',
      statusType: 'simulator',
      statusText: 'Interactive Strategy Tester',
      highlight: 'Data-driven margin protection'
    },
    {
      icon: LayoutDashboard,
      title: 'Inventory Monitoring Dashboard',
      description: 'Centralized command center displaying safe stock, at-risk batches, expired items, and financial value at risk with multi-category and search filtering.',
      statusType: 'live',
      statusText: 'Live Interactive Feature',
      highlight: 'Real-time category health'
    },
    {
      icon: FileSpreadsheet,
      title: 'Near-Expiry Product Reports',
      description: 'Generates structured audit logs and vendor return claim sheets for damaged or expired stock, making supplier credit settlements fast and traceable.',
      statusType: 'live',
      statusText: 'Live Export Simulation',
      highlight: 'CSV & Audit-ready format'
    },
    {
      icon: Recycle,
      title: 'Waste Reduction Support',
      description: 'Structured workflows to systematically channel edible near-expiry surpluses to local Tier-2/3 food shelters or community kitchens before spoilage occurs.',
      statusType: 'roadmap',
      statusText: 'Proposed NGO / Community Pipeline',
      highlight: 'Measurable ESG impact'
    },
    {
      icon: Users,
      title: 'Simple Staff-Friendly Interface',
      description: 'Built specifically for non-technical supermarket cashiers and stockboys. High-contrast color-coded indicators (Green, Amber, Red) require less than 5 minutes of onboarding.',
      statusType: 'live',
      statusText: 'Live Demo Interface',
      highlight: 'Regional language ready'
    }
  ];

  const getStatusBadge = (type, text) => {
    switch (type) {
      case 'live':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            {text}
          </span>
        );
      case 'simulator':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-300">
            <Sparkles className="w-3 h-3 text-blue-600" />
            {text}
          </span>
        );
      case 'roadmap':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" />
            {text}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="features" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Core Product Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950 tracking-tight leading-tight">
            Engineered for Practical Everyday Supermarket Operations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every feature is designed around real store constraints: minimal staff training, existing barcode hardware, and urgent daily inventory decisions.
          </p>

          {/* Transparent Status Legend */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="text-slate-500 font-medium">Status Legend:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
              ● Live Working Feature
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-semibold">
              ✦ Interactive Simulator
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
              ⏱ Planned Pilot / Roadmap
            </span>
          </div>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 hover:border-brand-400 hover:bg-white hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                  </div>

                  <div className="mb-3">
                    {getStatusBadge(feat.statusType, feat.statusText)}
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-brand-700 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 text-[11px] font-semibold text-slate-500 group-hover:text-brand-700 transition-colors flex items-center gap-1">
                  <span>Benefit:</span>
                  <span className="text-navy-900">{feat.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Try Live Banner */}
        <div className="mt-12 text-center bg-brand-50/70 rounded-2xl p-6 border border-brand-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-brand-950">
              Want to see these features in action right now?
            </h4>
            <p className="text-xs sm:text-sm text-brand-800">
              Explore the interactive supermarket dashboard below with live filters, barcode simulator, and discount tools.
            </p>
          </div>

          <a
            href="#dashboard"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-600/20 transition-all"
          >
            <span>Jump to Interactive Dashboard</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
